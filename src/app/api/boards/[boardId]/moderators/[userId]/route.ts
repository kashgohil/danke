import { ModeratorModel } from '@/lib/models/moderator';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ boardId: string; userId: string }> }
) {
  try {
    const { userId: currentUserId } = await auth();
    if (!currentUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { boardId, userId } = await params;

    const success = await ModeratorModel.removeModerator(
      boardId,
      userId,
      currentUserId
    );

    if (!success) {
      return NextResponse.json(
        { error: 'Moderator not found or already removed' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error removing moderator:', error);

    if (error instanceof Error) {
      if (error.message.includes('Only board creators')) {
        return NextResponse.json(
          { error: 'Only board creators can remove moderators' },
          { status: 403 }
        );
      }
      if (error.message.includes('Board not found')) {
        return NextResponse.json({ error: 'Board not found' }, { status: 404 });
      }
    }

    return NextResponse.json(
      { error: 'Failed to remove moderator' },
      { status: 500 }
    );
  }
}
