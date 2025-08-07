import { BoardModel } from '@/lib/models/board';
import { ModerationService } from '@/lib/moderation';
import { trackApiCall } from '@/lib/performance';
import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ boardId: string }> }
) {
  return trackApiCall('check-posting-permissions', async () => {
    try {
      const { userId } = await auth();

      if (!userId) {
        return NextResponse.json(
          {
            canPost: false,
            reason: 'You must be signed in to post',
          },
          { status: 401 }
        );
      }

      const { boardId } = await params;

      const board = await BoardModel.getById(boardId);
      if (!board) {
        return NextResponse.json(
          {
            canPost: false,
            reason: 'Board not found',
          },
          { status: 404 }
        );
      }

      const moderationResult = await ModerationService.checkPostingLimits(
        boardId,
        userId
      );

      return NextResponse.json({
        canPost: moderationResult.isAllowed,
        reason: moderationResult.reason,
        postingMode: board.postingMode,
        maxPosts: board.maxPostsPerUser
          ? parseInt(board.maxPostsPerUser)
          : null,
        postCount: moderationResult.postCount || 0,
        allowAnonymous: board.allowAnonymous,
      });
    } catch (error) {
      console.error('Error checking posting permissions:', error);
      return NextResponse.json(
        {
          canPost: false,
          reason: 'Unable to check posting permissions',
        },
        { status: 500 }
      );
    }
  });
}
