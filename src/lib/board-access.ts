import { auth } from '@clerk/nextjs/server';
import { getCurrentUser } from './auth';
import { Board } from './db';
import { BoardModel, ErrorType } from './models/board';

export interface AccessCheckResult {
  hasAccess: boolean;
  reason?: string;
  userEmail?: string;
  errorType?: ErrorType;
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
          errorType: ErrorType.NOT_SIGNED_IN,
          reason: 'Authentication required for private board',
        };
      }

      const user = await getCurrentUser();

      if (!user) {
        return {
          hasAccess: false,
          errorType: ErrorType.NOT_SIGNED_IN,
          reason: 'Email address required for private board access',
        };
      }

      const accessCheck = BoardModel.checkBoardAccess(board, user);

      return {
        hasAccess: accessCheck.hasAccess,
        reason: accessCheck.reason,
        userEmail: user.email,
        errorType: accessCheck.errorType,
      };
    } catch (error) {
      console.error('Error checking board access:', error);
      return {
        hasAccess: false,
        errorType: ErrorType.NOT_SIGNED_IN,
        reason: 'Unable to verify access permissions',
      };
    }
  }

  return {
    hasAccess: false,
    errorType: ErrorType.NOT_ACCESSIBLE,
    reason: 'Invalid board visibility setting',
  };
}
