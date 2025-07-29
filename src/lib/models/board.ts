import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { boards, db, type Board, type NewBoard } from '../db';
import { trackDbQuery } from '../performance';
import {
  createBoardSchema,
  createMultiStepBoardSchema,
  type CreateBoardSchema,
  type CreateMultiStepBoardSchema,
} from '../validations/board';

export class BoardModel {
  static async create(
    data: CreateBoardSchema,
    creatorId: string
  ): Promise<Board> {
    return trackDbQuery('board-create', async () => {
      const validatedData = createBoardSchema.parse(data);

      const viewToken = nanoid(32);
      const postToken = nanoid(32);

      // Create board with default multi-step values for backward compatibility
      const newBoard: NewBoard = {
        title: validatedData.title,
        recipientName: validatedData.recipientName,
        creatorId,
        viewToken,
        postToken,
        // Default values for new multi-step fields
        boardType: 'general',
        nameType: 'full-name',
        postingMode: 'multiple',
        moderationEnabled: false,
        allowAnonymous: true,
        maxPostsPerUser: null,
        boardVisibility: 'public',
        expirationDate: null,
        typeConfig: null,
      };

      try {
        const [board] = await db.insert(boards).values(newBoard).returning();

        if (!board) {
          throw new Error('Failed to create board - no data returned');
        }

        return board;
      } catch (dbError) {
        console.error('Database error creating board:', dbError);
        if (dbError instanceof Error && dbError.message.includes('duplicate')) {
          throw new Error(
            'duplicate: A board with this configuration already exists'
          );
        }
        throw new Error('Failed to create board due to database error');
      }
    });
  }

  static async createMultiStep(
    data: CreateMultiStepBoardSchema,
    creatorId: string
  ): Promise<Board> {
    return trackDbQuery('board-create-multi-step', async () => {
      // Validate the data again at the model level for extra safety
      const validatedData = createMultiStepBoardSchema.parse(data);

      // Generate unique tokens
      const viewToken = nanoid(32);
      const postToken = nanoid(32);

      // Validate business rules
      if (
        validatedData.postingMode === 'single' &&
        validatedData.maxPostsPerUser &&
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

      // Validate type-specific configuration
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
        nameType: validatedData.nameType,
        postingMode: validatedData.postingMode,
        moderationEnabled: validatedData.moderationEnabled ?? false,
        allowAnonymous: validatedData.allowAnonymous ?? true,
        maxPostsPerUser: validatedData.maxPostsPerUser || null,
        boardVisibility: validatedData.boardVisibility ?? 'public',
        expirationDate: validatedData.expirationDate || null,
        typeConfig: validatedData.typeConfig || null,
      };

      try {
        const [board] = await db.insert(boards).values(newBoard).returning();

        if (!board) {
          throw new Error(
            'Failed to create multi-step board - no data returned'
          );
        }

        return board;
      } catch (dbError) {
        console.error('Database error creating multi-step board:', dbError);
        if (dbError instanceof Error && dbError.message.includes('duplicate')) {
          throw new Error(
            'duplicate: A board with this configuration already exists'
          );
        }
        throw new Error(
          'Failed to create multi-step board due to database error'
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
          if (
            typeConfig.birthdayDate &&
            typeof typeConfig.birthdayDate === 'string'
          ) {
            const date = new Date(typeConfig.birthdayDate);
            if (isNaN(date.getTime())) {
              return { isValid: false, error: 'Invalid birthday date format' };
            }
          }
          break;
        case 'farewell':
          if (
            typeConfig.lastWorkingDay &&
            typeof typeConfig.lastWorkingDay === 'string'
          ) {
            const date = new Date(typeConfig.lastWorkingDay);
            if (isNaN(date.getTime())) {
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
    data: Partial<CreateBoardSchema>
  ): Promise<Board | null> {
    return trackDbQuery('board-update', async () => {
      const [board] = await db
        .update(boards)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(boards.id, id))
        .returning();

      return board || null;
    });
  }

  static async delete(id: string): Promise<boolean> {
    return trackDbQuery('board-delete', async () => {
      const result = await db.delete(boards).where(eq(boards.id, id));
      return result.count > 0;
    });
  }
}
