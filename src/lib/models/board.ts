import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { boards, db, type Board, type NewBoard } from '../db';
import {
  createBoardSchema,
  type CreateBoardSchema,
} from '../validations/board';

export class BoardModel {
  static async create(
    data: CreateBoardSchema,
    creatorId: string
  ): Promise<Board> {
    const validatedData = createBoardSchema.parse(data);

    const viewToken = nanoid(32);
    const postToken = nanoid(32);

    const newBoard: NewBoard = {
      ...validatedData,
      creatorId,
      viewToken,
      postToken,
    };

    const [board] = await db.insert(boards).values(newBoard).returning();

    if (!board) {
      throw new Error('Failed to create board');
    }

    return board;
  }

  static async getById(id: string): Promise<Board | null> {
    const [board] = await db.select().from(boards).where(eq(boards.id, id));
    return board || null;
  }

  static async getByViewToken(viewToken: string): Promise<Board | null> {
    const [board] = await db
      .select()
      .from(boards)
      .where(eq(boards.viewToken, viewToken));
    return board || null;
  }

  static async getByPostToken(postToken: string): Promise<Board | null> {
    const [board] = await db
      .select()
      .from(boards)
      .where(eq(boards.postToken, postToken));
    return board || null;
  }

  static async getByCreatorId(creatorId: string): Promise<Board[]> {
    return await db
      .select()
      .from(boards)
      .where(eq(boards.creatorId, creatorId));
  }

  static async update(
    id: string,
    data: Partial<CreateBoardSchema>
  ): Promise<Board | null> {
    const [board] = await db
      .update(boards)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(boards.id, id))
      .returning();

    return board || null;
  }

  static async delete(id: string): Promise<boolean> {
    const result = await db.delete(boards).where(eq(boards.id, id));
    return result.count > 0;
  }
}
