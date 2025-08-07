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

    // Check for flagged words
    for (const word of flaggedWords) {
      if (lowerContent.includes(word)) {
        flaggedContent.push(word);
      }
    }

    // Check for excessive caps (more than 50% uppercase)
    const uppercaseCount = (content.match(/[A-Z]/g) || []).length;
    const letterCount = (content.match(/[a-zA-Z]/g) || []).length;
    const capsPercentage = letterCount > 0 ? uppercaseCount / letterCount : 0;

    if (capsPercentage > 0.5 && letterCount > 10) {
      flaggedContent.push('excessive caps');
    }

    // Check for repeated characters (spam indicator)
    const repeatedPattern = /(.)\1{4,}/g;
    if (repeatedPattern.test(content)) {
      flaggedContent.push('repeated characters');
    }

    // Check for URLs (potential spam)
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

  // Check posting limits based on board configuration
  static async checkPostingLimits(
    boardId: string,
    userId: string
  ): Promise<ModerationResult & { postCount?: number }> {
    try {
      // Get board configuration
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

      // Get user's current post count for this board
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

      // Check single posting mode
      if (board.postingMode === 'single' && currentPostCount >= 1) {
        return {
          isAllowed: false,
          reason: 'This board only allows one post per user',
          postCount: currentPostCount,
        };
      }

      // Check max posts per user limit
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

  // Comprehensive moderation check
  static async moderatePost(
    content: string,
    boardId: string,
    userId: string
  ): Promise<ModerationResult> {
    // Check posting limits first
    const limitsCheck = await this.checkPostingLimits(boardId, userId);
    if (!limitsCheck.isAllowed) {
      return limitsCheck;
    }

    // Get board moderation settings
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

    // If moderation is disabled, only check posting limits
    if (!board.moderationEnabled) {
      return { isAllowed: true };
    }

    // Run content moderation
    const contentCheck = await this.moderateContent(content);
    if (!contentCheck.isAllowed) {
      return contentCheck;
    }

    return { isAllowed: true };
  }
}
