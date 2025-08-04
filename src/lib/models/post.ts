import { and, desc, eq } from 'drizzle-orm';
import { boards, db, posts, type NewPost, type Post } from '../db';
import { ModerationService } from '../moderation';
import { trackDbQuery } from '../performance';
import {
  createPostSchema,
  updatePostSchema,
  type CreatePostSchema,
  type UpdatePostSchema,
} from '../validations/post';

export class PostModel {
  static async create(
    data: CreatePostSchema,
    creatorId: string,
    boardId: string
  ): Promise<Post> {
    return trackDbQuery('post-create', async () => {
      const validatedData = createPostSchema.parse(data);

      const moderationResult = await ModerationService.moderatePost(
        validatedData.content,
        boardId,
        creatorId
      );

      if (!moderationResult.isAllowed) {
        throw new Error(`moderation: ${moderationResult.reason}`);
      }

      const newPost: NewPost = {
        ...validatedData,
        creatorId,
        boardId,
      };

      const [post] = await db.insert(posts).values(newPost).returning();

      if (!post) {
        throw new Error('Failed to create post');
      }

      return post;
    });
  }

  static async getById(id: string): Promise<Post | null> {
    return trackDbQuery('post-get-by-id', async () => {
      const [post] = await db
        .select()
        .from(posts)
        .where(and(eq(posts.id, id), eq(posts.isDeleted, false)));
      return post || null;
    });
  }

  static async getByBoardId(boardId: string): Promise<Post[]> {
    return trackDbQuery('post-get-by-board', async () => {
      return await db
        .select()
        .from(posts)
        .where(and(eq(posts.boardId, boardId), eq(posts.isDeleted, false)))
        .orderBy(desc(posts.createdAt));
    });
  }

  static async update(
    id: string,
    data: UpdatePostSchema,
    creatorId: string
  ): Promise<Post | null> {
    const validatedData = updatePostSchema.parse(data);

    // Check if post exists and belongs to the creator
    const existingPost = await this.getById(id);
    if (!existingPost || existingPost.creatorId !== creatorId) {
      return null;
    }

    // Check if post is within edit time limit (10 minutes)
    const now = new Date();
    const createdAt = new Date(existingPost.createdAt);
    const timeDiff = now.getTime() - createdAt.getTime();
    const tenMinutesInMs = 10 * 60 * 1000;

    if (timeDiff > tenMinutesInMs) {
      throw new Error('Post can only be edited within 10 minutes of creation');
    }

    const [post] = await db
      .update(posts)
      .set({ ...validatedData, updatedAt: new Date() })
      .where(eq(posts.id, id))
      .returning();

    return post || null;
  }

  static async delete(id: string, userId: string): Promise<boolean> {
    const post = await this.getById(id);
    if (!post) {
      return false;
    }

    const canDelete = await this.canDelete(id, userId);
    if (!canDelete) {
      return false;
    }

    const result = await db
      .update(posts)
      .set({ isDeleted: true, updatedAt: new Date() })
      .where(eq(posts.id, id));

    return result.count > 0;
  }

  static async canDelete(postId: string, userId: string): Promise<boolean> {
    const post = await this.getById(postId);
    if (!post) {
      return false;
    }

    if (post.creatorId === userId) {
      return true;
    }

    const result = await db
      .select({ boardCreatorId: boards.creatorId })
      .from(posts)
      .innerJoin(boards, eq(posts.boardId, boards.id))
      .where(eq(posts.id, postId));

    return result.length > 0 && result[0].boardCreatorId === userId;
  }

  static async canEdit(postId: string, creatorId: string): Promise<boolean> {
    const post = await this.getById(postId);
    if (!post || post.creatorId !== creatorId) {
      return false;
    }

    const now = new Date();
    const createdAt = new Date(post.createdAt);
    const timeDiff = now.getTime() - createdAt.getTime();
    const tenMinutesInMs = 10 * 60 * 1000;

    return timeDiff <= tenMinutesInMs;
  }
}
