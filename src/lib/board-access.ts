import { auth } from "@clerk/nextjs/server";
import { getCurrentUser } from "./auth";
import { Board } from "./db";
import { BoardModel, ErrorType } from "./models/board";
import { ModeratorModel } from "./models/moderator";

export interface AccessCheckResult {
  hasAccess: boolean;
  reason?: string;
  userEmail?: string;
  errorType?: ErrorType;
  isModerator?: boolean;
  isCreator?: boolean;
}

export async function checkBoardAccess(
  board: Board,
): Promise<AccessCheckResult> {
  try {
    const { userId } = await auth();

    if (!userId) {
      const accessCheck = BoardModel.checkBoardAccess(board);
      return {
        hasAccess: accessCheck.hasAccess,
        errorType: accessCheck.errorType,
        reason: accessCheck.reason,
      };
    }

    const user = await getCurrentUser();

    if (!user) {
      const accessCheck = BoardModel.checkBoardAccess(board);

      if (accessCheck.hasAccess) {
        return { hasAccess: true };
      }

      return {
        hasAccess: false,
        errorType: accessCheck.errorType ?? ErrorType.NOT_SIGNED_IN,
        reason:
          board.boardVisibility === "private"
            ? "Email address required for private board access"
            : accessCheck.reason,
      };
    }

    const accessCheck = BoardModel.checkBoardAccess(board, user);

    const isCreator = user.id === board.creatorId;
    const isModerator = !isCreator
      ? await ModeratorModel.isModerator(board.id, user.id)
      : false;

    if ((isCreator || isModerator) && !accessCheck.hasAccess) {
      return {
        hasAccess: true,
        userEmail: user.email,
        isModerator,
        isCreator,
      };
    }

    return {
      hasAccess: accessCheck.hasAccess,
      reason: accessCheck.reason,
      userEmail: user.email,
      errorType: accessCheck.errorType,
      isModerator,
      isCreator,
    };
  } catch (error) {
    console.error("Error checking board access:", error);
    return {
      hasAccess: false,
      errorType: ErrorType.NOT_SIGNED_IN,
      reason: "Unable to verify access permissions",
    };
  }
}
