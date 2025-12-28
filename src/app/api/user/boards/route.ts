import { db } from '@/lib/db';
import { boards, posts } from '@/lib/db/schema';
import { auth } from '@clerk/nextjs/server';
import { and, desc, eq, sql } from 'drizzle-orm';
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
        moderationEnabled: boards.moderationEnabled,
        boardVisibility: boards.boardVisibility,
        postingMode: boards.postingMode,
      })
      .from(boards)
      .where(eq(boards.creatorId, userId))
      .orderBy(desc(boards.createdAt));

    // Get detailed stats for each board
    const boardsWithStats = await Promise.all(
      userBoards.map(async (board) => {
        // Total posts
        const [totalPostsResult] = await db
          .select({ count: sql<number>`cast(count(*) as int)` })
          .from(posts)
          .where(and(eq(posts.boardId, board.id), eq(posts.isDeleted, false)));

        // Approved posts
        const [approvedPostsResult] = await db
          .select({ count: sql<number>`cast(count(*) as int)` })
          .from(posts)
          .where(
            and(
              eq(posts.boardId, board.id),
              eq(posts.isDeleted, false),
              eq(posts.moderationStatus, 'approved')
            )
          );

        // Pending posts
        const [pendingPostsResult] = await db
          .select({ count: sql<number>`cast(count(*) as int)` })
          .from(posts)
          .where(
            and(
              eq(posts.boardId, board.id),
              eq(posts.isDeleted, false),
              eq(posts.moderationStatus, 'pending')
            )
          );

        // Rejected posts
        const [rejectedPostsResult] = await db
          .select({ count: sql<number>`cast(count(*) as int)` })
          .from(posts)
          .where(
            and(
              eq(posts.boardId, board.id),
              eq(posts.isDeleted, false),
              eq(posts.moderationStatus, 'rejected')
            )
          );

        // Most recent post
        const [recentPost] = await db
          .select({ createdAt: posts.createdAt })
          .from(posts)
          .where(and(eq(posts.boardId, board.id), eq(posts.isDeleted, false)))
          .orderBy(desc(posts.createdAt))
          .limit(1);

        return {
          ...board,
          stats: {
            totalPosts: totalPostsResult.count,
            approvedPosts: approvedPostsResult.count,
            pendingPosts: pendingPostsResult.count,
            rejectedPosts: rejectedPostsResult.count,
            lastPostAt: recentPost?.createdAt || null,
          },
        };
      })
    );

    return NextResponse.json(boardsWithStats);
  } catch (error) {
    console.error('Error fetching user boards:', error);
    return NextResponse.json(
      { error: 'Failed to fetch boards' },
      { status: 500 }
    );
  }
}
