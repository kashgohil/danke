import { db } from '@/lib/db';
import { boards, posts } from '@/lib/db/schema';
import { auth } from '@clerk/nextjs/server';
import { and, desc, eq, sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = Math.min(parseInt(searchParams.get('limit') || '10', 10), 50);

    if (
      !Number.isFinite(page) ||
      !Number.isFinite(limit) ||
      page < 1 ||
      limit < 1
    ) {
      return NextResponse.json(
        { error: 'Page and limit must be positive numbers' },
        { status: 400 },
      );
    }

    const offset = (page - 1) * limit;

    const [{ count: totalBoards }] = await db
      .select({ count: sql<number>`cast(count(*) as int)` })
      .from(boards)
      .where(eq(boards.creatorId, userId));

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
      .orderBy(desc(boards.createdAt))
      .limit(limit)
      .offset(offset);

    const basePostCondition = and(
      eq(boards.creatorId, userId),
      eq(posts.isDeleted, false),
    );

    const [{ count: totalPosts }] = await db
      .select({ count: sql<number>`cast(count(*) as int)` })
      .from(posts)
      .innerJoin(boards, eq(posts.boardId, boards.id))
      .where(basePostCondition);

    const [{ count: approvedPosts }] = await db
      .select({ count: sql<number>`cast(count(*) as int)` })
      .from(posts)
      .innerJoin(boards, eq(posts.boardId, boards.id))
      .where(and(basePostCondition, eq(posts.moderationStatus, 'approved')));

    const [{ count: pendingPosts }] = await db
      .select({ count: sql<number>`cast(count(*) as int)` })
      .from(posts)
      .innerJoin(boards, eq(posts.boardId, boards.id))
      .where(and(basePostCondition, eq(posts.moderationStatus, 'pending')));

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
              eq(posts.moderationStatus, 'approved'),
            ),
          );

        // Pending posts
        const [pendingPostsResult] = await db
          .select({ count: sql<number>`cast(count(*) as int)` })
          .from(posts)
          .where(
            and(
              eq(posts.boardId, board.id),
              eq(posts.isDeleted, false),
              eq(posts.moderationStatus, 'pending'),
            ),
          );

        // Rejected posts
        const [rejectedPostsResult] = await db
          .select({ count: sql<number>`cast(count(*) as int)` })
          .from(posts)
          .where(
            and(
              eq(posts.boardId, board.id),
              eq(posts.isDeleted, false),
              eq(posts.moderationStatus, 'rejected'),
            ),
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
      }),
    );

    return NextResponse.json({
      boards: boardsWithStats,
      pagination: {
        page,
        limit,
        total: totalBoards,
        totalPages: Math.ceil(totalBoards / limit),
        hasMore: page * limit < totalBoards,
      },
      stats: {
        totalBoards,
        totalPosts,
        approvedPosts,
        pendingPosts,
      },
    });
  } catch (error) {
    console.error('Error fetching user boards:', error);
    return NextResponse.json(
      { error: 'Failed to fetch boards' },
      { status: 500 },
    );
  }
}
