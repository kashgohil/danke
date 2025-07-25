import { db, users } from '@/lib/db';
import { BoardModel } from '@/lib/models/board';
import { PostModel } from '@/lib/models/post';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { viewToken: string } }
) {
  try {
    const { viewToken } = params;

    if (!viewToken) {
      return NextResponse.json(
        { error: 'View token is required' },
        { status: 400 }
      );
    }

    const board = await BoardModel.getByViewToken(viewToken);

    if (!board) {
      return NextResponse.json({ error: 'Board not found' }, { status: 404 });
    }

    const posts = await PostModel.getByBoardId(board.id);

    const postsWithCreators = await Promise.all(
      posts.map(async (post) => {
        const [creator] = await db
          .select({
            name: users.name,
            avatarUrl: users.avatarUrl,
          })
          .from(users)
          .where(eq(users.id, post.creatorId));

        return {
          id: post.id,
          content: post.content,
          mediaUrls: post.mediaUrls || [],
          createdAt: post.createdAt.toISOString(),
          creator: creator || { name: 'Unknown User', avatarUrl: null },
        };
      })
    );

    const response = {
      board: {
        id: board.id,
        title: board.title,
        recipientName: board.recipientName,
        createdAt: board.createdAt.toISOString(),
        updatedAt: board.updatedAt.toISOString(),
      },
      posts: postsWithCreators,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching board:', error);
    return NextResponse.json(
      { error: 'Failed to fetch board' },
      { status: 500 }
    );
  }
}
