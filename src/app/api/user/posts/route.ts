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

    // Parse pagination parameters from URL
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

    // Get total count
    const [{ count: totalCount }] = await db
      .select({ count: sql<number>`cast(count(*) as int)` })
      .from(posts)
      .where(and(eq(posts.creatorId, userId), eq(posts.isDeleted, false)));

    // Get paginated posts
    const userPosts = await db
      .select({
        id: posts.id,
        content: posts.content,
        mediaUrls: posts.mediaUrls,
        createdAt: posts.createdAt,
        boardId: posts.boardId,
        boardTitle: boards.title,
        recipientName: boards.recipientName,
        viewToken: boards.viewToken,
        boardType: boards.boardType,
        isAnonymous: posts.isAnonymous,
        anonymousName: posts.anonymousName,
        moderationStatus: posts.moderationStatus,
      })
      .from(posts)
      .innerJoin(boards, eq(posts.boardId, boards.id))
      .where(and(eq(posts.creatorId, userId), eq(posts.isDeleted, false)))
      .orderBy(desc(posts.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json({
      posts: userPosts,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
        hasMore: page * limit < totalCount,
      },
    });
  } catch (error) {
    console.error('Error fetching user posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 },
    );
  }
}
