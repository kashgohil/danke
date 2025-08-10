import { getCurrentUser } from '@/lib/auth';
import { cache, cacheKeys, cacheTTL } from '@/lib/cache';
import { db, User, users } from '@/lib/db';
import { BoardModel } from '@/lib/models/board';
import { PostModel } from '@/lib/models/post';
import { createMultiStepBoardSchema } from '@/lib/validations/board';
import { auth } from '@clerk/nextjs/server';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ boardId: string }> }
) {
  try {
    const { boardId } = await params;

    if (!boardId) {
      return NextResponse.json(
        { error: 'Board ID is required' },
        { status: 400 }
      );
    }

    let board = await BoardModel.getById(boardId);

    if (!board) {
      board = await BoardModel.getByViewToken(boardId);
    }

    if (!board) {
      return NextResponse.json({ error: 'Board not found' }, { status: 404 });
    }

    let user: User | undefined;
    try {
      const { userId } = await auth();
      if (userId) {
        user = (await getCurrentUser()) ?? undefined;
      }
    } catch (error) {
      console.warn('Failed to get user info for board access check:', error);
    }

    const accessCheck = BoardModel.checkBoardAccess(board, user);
    if (!accessCheck.hasAccess) {
      return NextResponse.json(
        { error: accessCheck.reason || 'Access denied' },
        { status: 403 }
      );
    }

    const cacheKey = cacheKeys.board(board.viewToken);
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
      return NextResponse.json(cachedData, {
        headers: {
          'Cache-Control': 'public, s-maxage=120, stale-while-revalidate=300',
        },
      });
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
        postingMode: board.postingMode,
        moderationEnabled: board.moderationEnabled,
        maxPostsPerUser: board.maxPostsPerUser,
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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ boardId: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { boardId } = await params;
    if (!boardId) {
      return NextResponse.json(
        { error: 'Board ID is required' },
        { status: 400 }
      );
    }

    const body = await request.json();

    const validationResult = createMultiStepBoardSchema
      .partial()
      .safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Invalid board data',
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    const updatedBoard = await BoardModel.update(
      boardId,
      validationResult.data,
      userId
    );

    cache.delete(cacheKeys.board(updatedBoard.viewToken));
    cache.delete(cacheKeys.boardPosts(updatedBoard.id));

    return NextResponse.json({
      message: 'Board updated successfully',
      board: {
        id: updatedBoard.id,
        title: updatedBoard.title,
        recipientName: updatedBoard.recipientName,
        boardType: updatedBoard.boardType,
        postingMode: updatedBoard.postingMode,
        moderationEnabled: updatedBoard.moderationEnabled,
        allowAnonymous: updatedBoard.allowAnonymous,
        maxPostsPerUser: updatedBoard.maxPostsPerUser,
        boardVisibility: updatedBoard.boardVisibility,
        allowedDomains: updatedBoard.allowedDomains,
        blockedDomains: updatedBoard.blockedDomains,
        allowedEmails: updatedBoard.allowedEmails,
        blockedEmails: updatedBoard.blockedEmails,
        expirationDate: updatedBoard.expirationDate,
        typeConfig: updatedBoard.typeConfig,
        updatedAt: updatedBoard.updatedAt.toISOString(),
      },
    });
  } catch (error) {
    console.error('Error updating board:', error);

    if (error instanceof Error) {
      if (error.message.includes('validation:')) {
        return NextResponse.json(
          { error: error.message.replace('validation: ', '') },
          { status: 400 }
        );
      }
      if (error.message.includes('Unauthorized')) {
        return NextResponse.json(
          { error: 'You can only update your own boards' },
          { status: 403 }
        );
      }
      if (error.message === 'Board not found') {
        return NextResponse.json({ error: 'Board not found' }, { status: 404 });
      }
    }

    return NextResponse.json(
      { error: 'Failed to update board' },
      { status: 500 }
    );
  }
}
