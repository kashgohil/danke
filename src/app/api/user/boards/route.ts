import { db } from '@/lib/db';
import { boards, posts } from '@/lib/db/schema';
import { auth } from '@clerk/nextjs/server';
import { desc, eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userBoards = await db
      .select({
        id: boards.id,
        title: boards.title,
        recipientName: boards.recipientName,
        boardType: boards.boardType,
        createdAt: boards.createdAt,
        viewToken: boards.viewToken,
      })
      .from(boards)
      .where(eq(boards.creatorId, userId))
      .orderBy(desc(boards.createdAt));

    // Get post counts for each board
    const boardsWithCounts = await Promise.all(
      userBoards.map(async (board) => {
        const postCount = await db
          .select({ count: posts.id })
          .from(posts)
          .where(eq(posts.boardId, board.id));

        return {
          ...board,
          postCount: postCount.length,
        };
      })
    );

    return NextResponse.json(boardsWithCounts);
  } catch (error) {
    console.error('Error fetching user boards:', error);
    return NextResponse.json(
      { error: 'Failed to fetch boards' },
      { status: 500 }
    );
  }
}
