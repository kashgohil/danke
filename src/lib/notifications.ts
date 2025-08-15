import { db } from '@/lib/db';
import type { NewNotification, Notification } from '@/lib/db/schema';
import { boards, notifications, posts } from '@/lib/db/schema';
import { and, count, desc, eq } from 'drizzle-orm';

export type NotificationType =
  | 'post_approved'
  | 'post_rejected'
  | 'post_hidden';

export interface CreateNotificationParams {
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  postId?: string;
  boardId?: string;
}

export class NotificationService {
  static async createNotification(
    params: CreateNotificationParams
  ): Promise<Notification> {
    const newNotification: NewNotification = {
      userId: params.userId,
      type: params.type,
      title: params.title,
      message: params.message,
      postId: params.postId,
      boardId: params.boardId,
      isRead: false,
    };

    const [notification] = await db
      .insert(notifications)
      .values(newNotification)
      .returning();
    return notification;
  }

  static async createModerationNotification(
    postId: string,
    moderationStatus: NotificationType,
    moderationReason?: string
  ): Promise<void> {
    const postWithBoard = await db
      .select({
        post: posts,
        board: boards,
      })
      .from(posts)
      .innerJoin(boards, eq(posts.boardId, boards.id))
      .where(eq(posts.id, postId))
      .limit(1);

    if (!postWithBoard.length) {
      throw new Error('Post not found');
    }

    const { post, board } = postWithBoard[0];

    let type: NotificationType;
    let title: string;
    let message: string;

    switch (moderationStatus) {
      case 'post_approved':
        type = 'post_approved';
        title = 'Post Approved';
        message = `Your post on "${board.title}" has been approved and is now visible.`;
        break;
      case 'post_rejected':
        type = 'post_rejected';
        title = 'Post Rejected';
        message = `Your post on "${board.title}" has been rejected${
          moderationReason ? `: ${moderationReason}` : '.'
        }`;
        break;
      case 'post_hidden':
        type = 'post_hidden';
        title = 'Post Hidden';
        message = `Your post on "${board.title}" has been hidden${
          moderationReason ? `: ${moderationReason}` : '.'
        }`;
        break;
      default:
        return;
    }

    await this.createNotification({
      userId: post.creatorId,
      type,
      title,
      message,
      postId: post.id,
      boardId: board.id,
    });
  }

  static async getUserNotifications(
    userId: string,
    limit: number = 50,
    offset: number = 0
  ): Promise<Notification[]> {
    return await db
      .select()
      .from(notifications)
      .where(eq(notifications.userId, userId))
      .orderBy(desc(notifications.createdAt))
      .limit(limit)
      .offset(offset);
  }

  static async getUnreadCount(userId: string): Promise<number> {
    const result = await db
      .select({ count: count() })
      .from(notifications)
      .where(
        and(eq(notifications.userId, userId), eq(notifications.isRead, false))
      );

    return result[0]?.count || 0;
  }

  static async markAsRead(
    notificationId: string,
    userId: string
  ): Promise<void> {
    await db
      .update(notifications)
      .set({ isRead: true, updatedAt: new Date() })
      .where(
        and(
          eq(notifications.id, notificationId),
          eq(notifications.userId, userId)
        )
      );
  }

  static async markAllAsRead(userId: string): Promise<void> {
    await db
      .update(notifications)
      .set({ isRead: true, updatedAt: new Date() })
      .where(
        and(eq(notifications.userId, userId), eq(notifications.isRead, false))
      );
  }
}
