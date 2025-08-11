import { ModeratorModel } from '@/lib/models/moderator';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ boardId: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { boardId } = await params;

    const hasPermission = await ModeratorModel.hasModeratorPermissions(
      boardId,
      userId
    );

    if (!hasPermission) {
      return NextResponse.json(
        { error: 'You do not have moderation permissions for this board' },
        { status: 403 }
      );
    }

    const posts = await ModeratorModel.getPostsNeedingAttention(boardId);

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error fetching posts needing moderation:', error);
    return NextResponse.json(
      { error: 'Failed to fetch moderation data' },
      { status: 500 }
    );
  }
}
