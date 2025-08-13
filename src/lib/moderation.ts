import { and, count, eq } from 'drizzle-orm';
import { boards, db, posts } from './db';

export interface ModerationResult {
  isAllowed: boolean;
  reason?: string;
  flaggedContent?: string[];
}

export class ModerationService {
  // Basic content moderation - checks for inappropriate content
  static async moderateContent(content: string): Promise<ModerationResult> {
    const flaggedWords = [
      // Profanity
      'fuck',
      'shit',
      'damn',
      'bitch',
      'asshole',
      'bastard',
      // Hate speech indicators
      'hate',
      'kill',
      'die',
      'stupid',
      'idiot',
      'loser',
      // Spam indicators
      'click here',
      'buy now',
      'free money',
      'get rich quick',
      // Inappropriate content
      'nude',
      'sex',
      'porn',
      'xxx',
    ];

    const flaggedContent: string[] = [];
    const lowerContent = content.toLowerCase();

    for (const word of flaggedWords) {
      if (lowerContent.includes(word)) {
        flaggedContent.push(word);
      }
    }

    const repeatedPattern = /(.)\1{4,}/g;
    if (repeatedPattern.test(content)) {
      flaggedContent.push('repeated characters');
    }

    const urlPattern = /(https?:\/\/[^\s]+)/g;
    if (urlPattern.test(content)) {
      flaggedContent.push('contains links');
    }

    return {
      isAllowed: flaggedContent.length === 0,
      reason:
        flaggedContent.length > 0
          ? `Content flagged for: ${flaggedContent.join(', ')}`
          : undefined,
      flaggedContent,
    };
  }

  static async checkPostingLimits(
    boardId: string,
    userId: string
  ): Promise<ModerationResult & { postCount?: number }> {
    try {
      const [board] = await db
        .select({
          postingMode: boards.postingMode,
          maxPostsPerUser: boards.maxPostsPerUser,
          moderationEnabled: boards.moderationEnabled,
          allowAnonymous: boards.allowAnonymous,
        })
        .from(boards)
        .where(eq(boards.id, boardId));

      if (!board) {
        return {
          isAllowed: false,
          reason: 'Board not found',
        };
      }

      const [userPostCount] = await db
        .select({ count: count() })
        .from(posts)
        .where(
          and(
            eq(posts.boardId, boardId),
            eq(posts.creatorId, userId),
            eq(posts.isDeleted, false)
          )
        );

      const currentPostCount = userPostCount?.count || 0;

      if (board.postingMode === 'single' && currentPostCount >= 1) {
        return {
          isAllowed: false,
          reason: 'This board only allows one post per user',
          postCount: currentPostCount,
        };
      }

      if (board.maxPostsPerUser) {
        const maxPosts = parseInt(board.maxPostsPerUser);
        if (!isNaN(maxPosts) && currentPostCount >= maxPosts) {
          return {
            isAllowed: false,
            reason: `You have reached the maximum of ${maxPosts} posts for this board`,
            postCount: currentPostCount,
          };
        }
      }

      return {
        isAllowed: true,
        postCount: currentPostCount,
      };
    } catch (error) {
      console.error('Error checking posting limits:', error);
      return {
        isAllowed: false,
        reason: 'Unable to verify posting limits',
      };
    }
  }

  static async moderatePost(
    content: string,
    boardId: string,
    userId: string
  ): Promise<ModerationResult> {
    const limitsCheck = await this.checkPostingLimits(boardId, userId);
    if (!limitsCheck.isAllowed) {
      return limitsCheck;
    }

    const [board] = await db
      .select({ moderationEnabled: boards.moderationEnabled })
      .from(boards)
      .where(eq(boards.id, boardId));

    if (!board) {
      return {
        isAllowed: false,
        reason: 'Board not found',
      };
    }

    if (!board.moderationEnabled) {
      return { isAllowed: true };
    }

    const contentCheck = await this.moderateContent(content);
    if (!contentCheck.isAllowed) {
      return contentCheck;
    }

    return { isAllowed: true };
  }
}
