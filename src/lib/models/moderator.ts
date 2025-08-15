import { and, eq } from 'drizzle-orm';
import { alias } from 'drizzle-orm/pg-core';
import {
  boardModerators,
  boards,
  db,
  posts,
  users,
  type BoardModerator,
  type NewBoardModerator,
} from '../db';
import { NotificationService } from '../notifications';
import { trackDbQuery } from '../performance';

export enum ModeratorPermission {
  VIEW_PRIVATE_POSTS = 'view_private_posts',
  REQUEST_CONTENT_CHANGE = 'request_content_change',
  SCHEDULE_POST_DELETION = 'schedule_post_deletion',
  DELETE_POST = 'delete_post',
}

const addedByUser = alias(users, 'addedByUser');

export class ModeratorModel {
  static async addModerator(
    boardId: string,
    userEmail: string,
    addedBy: string
  ): Promise<BoardModerator> {
    return trackDbQuery('moderator-add', async () => {
      const [user] = await db
        .select({ id: users.id })
        .from(users)
        .where(eq(users.email, userEmail));

      if (!user) {
        throw new Error('User not found with this email address');
      }

      const [board] = await db
        .select({ creatorId: boards.creatorId })
        .from(boards)
        .where(eq(boards.id, boardId));

      if (!board) {
        throw new Error('Board not found');
      }

      if (board.creatorId !== addedBy) {
        throw new Error('Only board creators can add moderators');
      }

      const [existingModerator] = await db
        .select()
        .from(boardModerators)
        .where(
          and(
            eq(boardModerators.boardId, boardId),
            eq(boardModerators.userId, user.id)
          )
        );

      if (existingModerator) {
        throw new Error('User is already a moderator of this board');
      }

      if (user.id === board.creatorId) {
        throw new Error('Board creator cannot be added as a moderator');
      }

      const newModerator: NewBoardModerator = {
        boardId,
        userId: user.id,
        addedBy,
      };

      const [moderator] = await db
        .insert(boardModerators)
        .values(newModerator)
        .returning();

      if (!moderator) {
        throw new Error('Failed to add moderator');
      }

      return moderator;
    });
  }

  static async removeModerator(
    boardId: string,
    userId: string,
    removedBy: string
  ): Promise<boolean> {
    return trackDbQuery('moderator-remove', async () => {
      const [board] = await db
        .select({ creatorId: boards.creatorId })
        .from(boards)
        .where(eq(boards.id, boardId));

      if (!board) {
        throw new Error('Board not found');
      }

      if (board.creatorId !== removedBy) {
        throw new Error('Only board creators can remove moderators');
      }

      const result = await db
        .delete(boardModerators)
        .where(
          and(
            eq(boardModerators.boardId, boardId),
            eq(boardModerators.userId, userId)
          )
        );

      return result.count > 0;
    });
  }

  static async getBoardModerators(boardId: string): Promise<
    Array<{
      id: string;
      userId: string;
      userName: string;
      userEmail: string;
      addedAt: Date;
      addedByName: string;
    }>
  > {
    return trackDbQuery('moderator-get-board-moderators', async () => {
      return await db
        .select({
          id: boardModerators.id,
          userId: boardModerators.userId,
          userName: users.name,
          userEmail: users.email,
          addedAt: boardModerators.createdAt,
          addedByName: users.name,
        })
        .from(boardModerators)
        .innerJoin(users, eq(boardModerators.userId, users.id))
        .innerJoin(addedByUser, eq(boardModerators.addedBy, addedByUser.id))
        .where(eq(boardModerators.boardId, boardId));
    });
  }

  static async isModerator(boardId: string, userId: string): Promise<boolean> {
    return trackDbQuery('moderator-check', async () => {
      const [moderator] = await db
        .select()
        .from(boardModerators)
        .where(
          and(
            eq(boardModerators.boardId, boardId),
            eq(boardModerators.userId, userId)
          )
        );

      return !!moderator;
    });
  }

  static async isBoardCreator(
    boardId: string,
    userId: string
  ): Promise<boolean> {
    return trackDbQuery('moderator-check-creator', async () => {
      const [board] = await db
        .select({ creatorId: boards.creatorId })
        .from(boards)
        .where(eq(boards.id, boardId));

      return board?.creatorId === userId;
    });
  }

  static async hasModeratorPermissions(
    boardId: string,
    userId: string
  ): Promise<boolean> {
    const isCreator = await this.isBoardCreator(boardId, userId);
    if (isCreator) return true;

    return await this.isModerator(boardId, userId);
  }

  static async getUserModeratedBoards(userId: string): Promise<
    Array<{
      boardId: string;
      boardTitle: string;
      boardRecipientName: string;
      addedAt: Date;
    }>
  > {
    return trackDbQuery('moderator-get-user-boards', async () => {
      return await db
        .select({
          boardId: boardModerators.boardId,
          boardTitle: boards.title,
          boardRecipientName: boards.recipientName,
          addedAt: boardModerators.createdAt,
        })
        .from(boardModerators)
        .innerJoin(boards, eq(boardModerators.boardId, boards.id))
        .where(eq(boardModerators.userId, userId));
    });
  }

  static async requestContentChange(
    postId: string,
    moderatorId: string,
    reason: string
  ): Promise<boolean> {
    return trackDbQuery('moderator-request-change', async () => {
      const [postWithBoard] = await db
        .select({
          postId: posts.id,
          boardId: posts.boardId,
          creatorId: posts.creatorId,
        })
        .from(posts)
        .where(eq(posts.id, postId));

      if (!postWithBoard) {
        throw new Error('Post not found');
      }

      const hasPermission = await this.hasModeratorPermissions(
        postWithBoard.boardId,
        moderatorId
      );

      if (!hasPermission) {
        throw new Error('You do not have moderator permissions for this board');
      }

      const result = await db
        .update(posts)
        .set({
          moderationStatus: 'change_requested',
          moderationReason: reason,
          moderatedBy: moderatorId,
          moderatedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(posts.id, postId));

      if (result.count > 0) {
        await NotificationService.createModerationNotification(
          postId,
          'post_rejected',
          reason
        );
      }

      return result.count > 0;
    });
  }

  static async schedulePostDeletion(
    postId: string,
    moderatorId: string,
    deleteDate: Date,
    reason?: string
  ): Promise<boolean> {
    return trackDbQuery('moderator-schedule-deletion', async () => {
      const [postWithBoard] = await db
        .select({
          postId: posts.id,
          boardId: posts.boardId,
        })
        .from(posts)
        .where(eq(posts.id, postId));

      if (!postWithBoard) {
        throw new Error('Post not found');
      }

      const hasPermission = await this.hasModeratorPermissions(
        postWithBoard.boardId,
        moderatorId
      );

      if (!hasPermission) {
        throw new Error('You do not have moderator permissions for this board');
      }

      if (deleteDate <= new Date()) {
        throw new Error('Delete date must be in the future');
      }

      const result = await db
        .update(posts)
        .set({
          deleteScheduledDate: deleteDate,
          deleteScheduledBy: moderatorId,
          moderationReason: reason || 'Scheduled for deletion',
          moderatedBy: moderatorId,
          moderatedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(posts.id, postId));

      return result.count > 0;
    });
  }

  static async approvePost(
    postId: string,
    moderatorId: string
  ): Promise<boolean> {
    return trackDbQuery('moderator-approve-post', async () => {
      const [postWithBoard] = await db
        .select({
          postId: posts.id,
          boardId: posts.boardId,
        })
        .from(posts)
        .where(eq(posts.id, postId));

      if (!postWithBoard) {
        throw new Error('Post not found');
      }

      const hasPermission = await this.hasModeratorPermissions(
        postWithBoard.boardId,
        moderatorId
      );

      if (!hasPermission) {
        throw new Error('You do not have moderator permissions for this board');
      }

      const result = await db
        .update(posts)
        .set({
          moderationStatus: 'approved',
          moderatedBy: moderatorId,
          moderatedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(posts.id, postId));

      if (result.count > 0) {
        await NotificationService.createModerationNotification(
          postId,
          'post_approved'
        );
      }

      return result.count > 0;
    });
  }

  static async deletePost(
    postId: string,
    moderatorId: string,
    reason?: string
  ): Promise<boolean> {
    return trackDbQuery('moderator-delete-post', async () => {
      const [postWithBoard] = await db
        .select({
          postId: posts.id,
          boardId: posts.boardId,
        })
        .from(posts)
        .where(eq(posts.id, postId));

      if (!postWithBoard) {
        throw new Error('Post not found');
      }

      const hasPermission = await this.hasModeratorPermissions(
        postWithBoard.boardId,
        moderatorId
      );

      if (!hasPermission) {
        throw new Error('You do not have moderator permissions for this board');
      }

      const result = await db
        .update(posts)
        .set({
          isDeleted: true,
          moderationReason: reason || 'Deleted by moderator',
          moderatedBy: moderatorId,
          moderatedAt: new Date(),
          updatedAt: new Date(),
        })
        .where(eq(posts.id, postId));

      if (result.count > 0) {
        await NotificationService.createModerationNotification(
          postId,
          'post_hidden',
          reason || 'Deleted by moderator'
        );
      }

      return result.count > 0;
    });
  }

  static async getPostsNeedingAttention(boardId: string): Promise<
    Array<{
      id: string;
      content: string;
      creatorName: string;
      createdAt: Date;
      updatedAt: Date;
      moderationStatus: string;
      moderationReason: string | null;
      deleteScheduledDate: Date | null;
    }>
  > {
    return trackDbQuery('moderator-get-posts-needing-attention', async () => {
      return await db
        .select({
          id: posts.id,
          content: posts.content,
          creatorName: users.name,
          createdAt: posts.createdAt,
          updatedAt: posts.updatedAt,
          moderationStatus: posts.moderationStatus,
          moderationReason: posts.moderationReason,
          deleteScheduledDate: posts.deleteScheduledDate,
        })
        .from(posts)
        .innerJoin(users, eq(posts.creatorId, users.id))
        .where(and(eq(posts.boardId, boardId), eq(posts.isDeleted, false)));
    });
  }
}
