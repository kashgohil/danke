import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { boards, db, User, type Board, type NewBoard } from '../db';
import { trackDbQuery } from '../performance';
import {
  createMultiStepBoardSchema,
  type CreateMultiStepBoardSchema,
} from '../validations/board';

export enum ErrorType {
  NOT_SIGNED_IN = 'NOT_SIGNED_IN',
  NOT_ACCESSIBLE = 'NOT_ACCESSIBLE',
}

export class BoardModel {
  static async create(
    data: CreateMultiStepBoardSchema,
    creatorId: string
  ): Promise<Board> {
    return trackDbQuery('board-create-multi-step', async () => {
      const validatedData = createMultiStepBoardSchema.parse(data);

      // Generate unique tokens
      const viewToken = nanoid(32);
      const postToken = nanoid(32);

      // Validate business rules
      if (
        validatedData.postingMode === 'single' &&
        validatedData.maxPostsPerUser &&
        validatedData.maxPostsPerUser !== null &&
        parseInt(validatedData.maxPostsPerUser) > 1
      ) {
        throw new Error(
          'validation: Single posting mode cannot have max posts per user greater than 1'
        );
      }

      if (
        validatedData.expirationDate &&
        validatedData.expirationDate <= new Date()
      ) {
        throw new Error('validation: Expiration date must be in the future');
      }

      if (validatedData.typeConfig) {
        const typeConfigValidation = this.validateTypeConfig(
          validatedData.boardType,
          validatedData.typeConfig
        );
        if (!typeConfigValidation.isValid) {
          throw new Error(
            `validation: Invalid type configuration - ${typeConfigValidation.error}`
          );
        }
      }

      const newBoard: NewBoard = {
        title: validatedData.title,
        recipientName: validatedData.recipientName,
        creatorId,
        viewToken,
        postToken,
        boardType: validatedData.boardType,
        postingMode: validatedData.postingMode,
        moderationEnabled: validatedData.moderationEnabled ?? false,
        allowAnonymous: validatedData.allowAnonymous ?? true,
        maxPostsPerUser: validatedData.maxPostsPerUser || null,
        boardVisibility: validatedData.boardVisibility ?? 'public',
        allowedDomains: validatedData.allowedDomains || null,
        blockedDomains: validatedData.blockedDomains || null,
        allowedEmails: validatedData.allowedEmails || null,
        blockedEmails: validatedData.blockedEmails || null,
        expirationDate: validatedData.expirationDate || null,
        typeConfig: validatedData.typeConfig || null,
      };

      try {
        console.log(
          'Attempting to insert board with data:',
          JSON.stringify(newBoard, null, 2)
        );
        const [board] = await db.insert(boards).values(newBoard).returning();

        if (!board) {
          throw new Error(
            'Failed to create multi-step board - no data returned'
          );
        }

        return board;
      } catch (dbError) {
        console.error('Database error creating multi-step board:', dbError);
        console.error(
          'Board data that failed to insert:',
          JSON.stringify(newBoard, null, 2)
        );

        // Handle specific database constraint errors
        if (dbError instanceof Error) {
          if (
            dbError.message.includes('duplicate') ||
            dbError.message.includes('unique')
          ) {
            throw new Error(
              'duplicate: A board with this configuration already exists'
            );
          }
          if (
            dbError.message.includes('foreign key') ||
            dbError.message.includes('violates')
          ) {
            throw new Error(
              'validation: Invalid user ID or database constraint violation'
            );
          }
          if (
            dbError.message.includes('null value') ||
            dbError.message.includes('not-null')
          ) {
            throw new Error('validation: Missing required field in board data');
          }
        }

        throw new Error(
          `Failed to create multi-step board due to database error: ${
            dbError instanceof Error ? dbError.message : 'Unknown error'
          }`
        );
      }
    });
  }

  private static validateTypeConfig(
    boardType: string,
    typeConfig: Record<string, unknown>
  ): { isValid: boolean; error?: string } {
    try {
      switch (boardType) {
        case 'birthday':
          if (typeConfig.birthdayDate) {
            const date = typeConfig.birthdayDate as Date;
            if (!(date instanceof Date) || isNaN(date.getTime())) {
              return {
                isValid: false,
                error: 'Invalid birthday date format',
              };
            }
          }
          break;
        case 'farewell':
          if (typeConfig.lastWorkingDay) {
            const date = typeConfig.lastWorkingDay as Date;
            if (!(date instanceof Date) || isNaN(date.getTime())) {
              return {
                isValid: false,
                error: 'Invalid last working day date format',
              };
            }
          }
          break;
        case 'appreciation':
          if (
            typeConfig.appreciationTheme &&
            !['professional', 'casual', 'celebration'].includes(
              typeConfig.appreciationTheme as string
            )
          ) {
            return { isValid: false, error: 'Invalid appreciation theme' };
          }
          break;
      }
      return { isValid: true };
    } catch (error) {
      return { isValid: false, error: 'Invalid type configuration format' };
    }
  }

  static async getById(id: string): Promise<Board | null> {
    return trackDbQuery('board-get-by-id', async () => {
      const [board] = await db.select().from(boards).where(eq(boards.id, id));
      return board || null;
    });
  }

  static async getByViewToken(viewToken: string): Promise<Board | null> {
    return trackDbQuery('board-get-by-view-token', async () => {
      const [board] = await db
        .select()
        .from(boards)
        .where(eq(boards.viewToken, viewToken));
      return board || null;
    });
  }

  static async getByPostToken(postToken: string): Promise<Board | null> {
    return trackDbQuery('board-get-by-post-token', async () => {
      const [board] = await db
        .select()
        .from(boards)
        .where(eq(boards.postToken, postToken));
      return board || null;
    });
  }

  static async getByCreatorId(creatorId: string): Promise<Board[]> {
    return trackDbQuery('board-get-by-creator', async () => {
      return await db
        .select()
        .from(boards)
        .where(eq(boards.creatorId, creatorId));
    });
  }

  static async update(
    id: string,
    data: Partial<CreateMultiStepBoardSchema>,
    creatorId: string
  ): Promise<Board> {
    return trackDbQuery('board-update', async () => {
      // First verify the board exists and user owns it
      const existingBoard = await this.getById(id);
      if (!existingBoard) {
        throw new Error('Board not found');
      }
      if (existingBoard.creatorId !== creatorId) {
        throw new Error('Unauthorized: You can only update your own boards');
      }

      const validatedData = createMultiStepBoardSchema.partial().parse(data);

      if (
        validatedData.postingMode === 'single' &&
        validatedData.maxPostsPerUser &&
        validatedData.maxPostsPerUser !== null &&
        parseInt(validatedData.maxPostsPerUser) > 1
      ) {
        throw new Error(
          'validation: Single posting mode cannot have max posts per user greater than 1'
        );
      }

      if (
        validatedData.expirationDate &&
        validatedData.expirationDate <= new Date()
      ) {
        throw new Error('validation: Expiration date must be in the future');
      }

      if (validatedData.typeConfig && validatedData.boardType) {
        const typeConfigValidation = this.validateTypeConfig(
          validatedData.boardType,
          validatedData.typeConfig
        );
        if (!typeConfigValidation.isValid) {
          throw new Error(
            `validation: Invalid type configuration - ${typeConfigValidation.error}`
          );
        }
      }

      // Prepare update data
      const updateData: Partial<NewBoard> = {};

      if (validatedData.title !== undefined)
        updateData.title = validatedData.title;
      if (validatedData.recipientName !== undefined)
        updateData.recipientName = validatedData.recipientName;
      if (validatedData.boardType !== undefined)
        updateData.boardType = validatedData.boardType;
      if (validatedData.postingMode !== undefined)
        updateData.postingMode = validatedData.postingMode;
      if (validatedData.moderationEnabled !== undefined)
        updateData.moderationEnabled = validatedData.moderationEnabled;
      if (validatedData.allowAnonymous !== undefined)
        updateData.allowAnonymous = validatedData.allowAnonymous;
      if (validatedData.maxPostsPerUser !== undefined)
        updateData.maxPostsPerUser = validatedData.maxPostsPerUser || null;
      if (validatedData.boardVisibility !== undefined)
        updateData.boardVisibility = validatedData.boardVisibility;
      if (validatedData.allowedDomains !== undefined)
        updateData.allowedDomains = validatedData.allowedDomains || null;
      if (validatedData.blockedDomains !== undefined)
        updateData.blockedDomains = validatedData.blockedDomains || null;
      if (validatedData.allowedEmails !== undefined)
        updateData.allowedEmails = validatedData.allowedEmails || null;
      if (validatedData.blockedEmails !== undefined)
        updateData.blockedEmails = validatedData.blockedEmails || null;
      if (validatedData.expirationDate !== undefined)
        updateData.expirationDate = validatedData.expirationDate || null;
      if (validatedData.typeConfig !== undefined)
        updateData.typeConfig = validatedData.typeConfig || null;

      try {
        const [updatedBoard] = await db
          .update(boards)
          .set({ ...updateData, updatedAt: new Date() })
          .where(eq(boards.id, id))
          .returning();

        if (!updatedBoard) {
          throw new Error('Failed to update board - no data returned');
        }

        return updatedBoard;
      } catch (dbError) {
        console.error('Database error updating board:', dbError);

        if (dbError instanceof Error) {
          if (
            dbError.message.includes('foreign key') ||
            dbError.message.includes('violates')
          ) {
            throw new Error(
              'validation: Invalid data or database constraint violation'
            );
          }
          if (
            dbError.message.includes('null value') ||
            dbError.message.includes('not-null')
          ) {
            throw new Error('validation: Missing required field in board data');
          }
        }

        throw new Error(
          `Failed to update board due to database error: ${
            dbError instanceof Error ? dbError.message : 'Unknown error'
          }`
        );
      }
    });
  }

  static async delete(id: string): Promise<boolean> {
    return trackDbQuery('board-delete', async () => {
      const result = await db.delete(boards).where(eq(boards.id, id));
      return result.count > 0;
    });
  }

  static checkBoardAccess(
    board: Board,
    user?: User
  ): { hasAccess: boolean; errorType?: ErrorType; reason?: string } {
    if (board.boardVisibility === 'public') {
      return { hasAccess: true };
    }

    if (board.boardVisibility === 'private') {
      if (!user) {
        return {
          hasAccess: false,
          errorType: ErrorType.NOT_SIGNED_IN,
          reason: 'Authentication required for private board',
        };
      }

      if (user.id === board.creatorId) {
        return {
          hasAccess: true,
        };
      }

      const emailDomain = user.email.split('@')[1]?.toLowerCase();

      if (
        board.blockedEmails &&
        board.blockedEmails.includes(user.email.toLowerCase())
      ) {
        return {
          hasAccess: false,
          errorType: ErrorType.NOT_ACCESSIBLE,
          reason: 'Your email is blocked from accessing this board',
        };
      }

      if (
        board.blockedDomains &&
        emailDomain &&
        board.blockedDomains.includes(emailDomain)
      ) {
        return {
          hasAccess: false,
          errorType: ErrorType.NOT_ACCESSIBLE,
          reason: 'Your email domain is blocked from accessing this board',
        };
      }

      if (board.allowedEmails && board.allowedEmails.length > 0) {
        if (board.allowedEmails.includes(user.email.toLowerCase())) {
          return { hasAccess: true };
        }
        return {
          hasAccess: false,
          errorType: ErrorType.NOT_ACCESSIBLE,
          reason: 'Your email is not on the allowed list for this board',
        };
      }

      if (board.allowedDomains && board.allowedDomains.length > 0) {
        if (emailDomain && board.allowedDomains.includes(emailDomain)) {
          return { hasAccess: true };
        }
        return {
          hasAccess: false,
          errorType: ErrorType.NOT_ACCESSIBLE,
          reason: 'Your email domain is not allowed to access this board',
        };
      }

      return { hasAccess: true };
    }

    return { hasAccess: false, reason: 'Invalid board visibility setting' };
  }
}
