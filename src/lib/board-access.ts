import { auth } from '@clerk/nextjs/server';
import { getCurrentUser } from './auth';
import { Board } from './db';
import { BoardModel } from './models/board';

export interface AccessCheckResult {
  hasAccess: boolean;
  reason?: string;
  userEmail?: string;
}

export async function checkBoardAccess(
  board: Board
): Promise<AccessCheckResult> {
  if (board.boardVisibility === 'public') {
    return { hasAccess: true };
  }

  if (board.boardVisibility === 'private') {
    try {
      const { userId } = await auth();

      if (!userId) {
        return {
          hasAccess: false,
          reason: 'Authentication required for private board',
        };
      }

      const user = await getCurrentUser();

      if (!user) {
        return {
          hasAccess: false,
          reason: 'Email address required for private board access',
        };
      }

      const accessCheck = BoardModel.checkBoardAccess(board, user);

      return {
        hasAccess: accessCheck.hasAccess,
        reason: accessCheck.reason,
        userEmail: user.email,
      };
    } catch (error) {
      console.error('Error checking board access:', error);
      return {
        hasAccess: false,
        reason: 'Unable to verify access permissions',
      };
    }
  }

  return {
    hasAccess: false,
    reason: 'Invalid board visibility setting',
  };
}
