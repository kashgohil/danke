import { cache, cacheKeys, cacheTTL } from '@/lib/cache';
import { db, users } from '@/lib/db';
import { BoardModel } from '@/lib/models/board';
import { PostModel } from '@/lib/models/post';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ viewToken: string }> }
) {
  try {
    const { viewToken } = await params;

    if (!viewToken) {
      return NextResponse.json(
        { error: 'View token is required' },
        { status: 400 }
      );
    }

    const cacheKey = cacheKeys.board(viewToken);
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
      return NextResponse.json(cachedData, {
        headers: {
          'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=300',
        },
      });
    }

    const board = await BoardModel.getByViewToken(viewToken);

    if (!board) {
      return NextResponse.json({ error: 'Board not found' }, { status: 404 });
    }

    const postsCacheKey = cacheKeys.boardPosts(board.id);
    let postsWithCreators = cache.get(postsCacheKey);

    if (!postsWithCreators) {
      const posts = await PostModel.getByBoardId(board.id);

      const creatorIds = [...new Set(posts.map((post) => post.creatorId))];
      const creatorMap = new Map();

      for (const creatorId of creatorIds) {
        const cachedUser = cache.get(cacheKeys.user(creatorId));
        if (cachedUser) {
          creatorMap.set(creatorId, cachedUser);
        } else {
          const [creator] = await db
            .select({
              id: users.id,
              name: users.name,
              avatarUrl: users.avatarUrl,
            })
            .from(users)
            .where(eq(users.id, creatorId));

          if (creator) {
            creatorMap.set(creatorId, creator);
            cache.set(cacheKeys.user(creatorId), creator, cacheTTL.user);
          }
        }
      }

      postsWithCreators = posts.map((post) => {
        const creator = creatorMap.get(post.creatorId);
        return {
          id: post.id,
          content: post.content,
          mediaUrls: post.mediaUrls || [],
          createdAt: post.createdAt.toISOString(),
          creator: creator || {
            id: post.creatorId,
            name: 'Unknown User',
            avatarUrl: null,
          },
        };
      });

      cache.set(postsCacheKey, postsWithCreators, cacheTTL.posts);
    }

    const response = {
      board: {
        id: board.id,
        title: board.title,
        recipientName: board.recipientName,
        creatorId: board.creatorId,
        createdAt: board.createdAt.toISOString(),
        updatedAt: board.updatedAt.toISOString(),
      },
      posts: postsWithCreators,
    };

    cache.set(cacheKey, response, cacheTTL.board);

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('Error fetching board:', error);
    return NextResponse.json(
      { error: 'Failed to fetch board' },
      { status: 500 }
    );
  }
}
