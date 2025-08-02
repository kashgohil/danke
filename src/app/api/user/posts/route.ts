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
      })
      .from(posts)
      .innerJoin(boards, eq(posts.boardId, boards.id))
      .where(eq(posts.creatorId, userId))
      .orderBy(desc(posts.createdAt));

    return NextResponse.json(userPosts);
  } catch (error) {
    console.error('Error fetching user posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
