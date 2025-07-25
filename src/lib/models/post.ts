import { and, desc, eq } from 'drizzle-orm';
import { db, posts, type NewPost, type Post } from '../db';
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
    const validatedData = createPostSchema.parse(data);

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
  }

  static async getById(id: string): Promise<Post | null> {
    const [post] = await db
      .select()
      .from(posts)
      .where(and(eq(posts.id, id), eq(posts.isDeleted, false)));
    return post || null;
  }

  static async getByBoardId(boardId: string): Promise<Post[]> {
    return await db
      .select()
      .from(posts)
      .where(and(eq(posts.boardId, boardId), eq(posts.isDeleted, false)))
      .orderBy(desc(posts.createdAt));
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

  static async delete(id: string, creatorId: string): Promise<boolean> {
    // Soft delete - set isDeleted to true
    const result = await db
      .update(posts)
      .set({ isDeleted: true, updatedAt: new Date() })
      .where(and(eq(posts.id, id), eq(posts.creatorId, creatorId)));

    return result.count > 0;
  }

  static async canEdit(postId: string, creatorId: string): Promise<boolean> {
    const post = await this.getById(postId);
    if (!post || post.creatorId !== creatorId) {
      return false;
    }

    // Check if post is within edit time limit (10 minutes)
    const now = new Date();
    const createdAt = new Date(post.createdAt);
    const timeDiff = now.getTime() - createdAt.getTime();
    const tenMinutesInMs = 10 * 60 * 1000;

    return timeDiff <= tenMinutesInMs;
  }
}
