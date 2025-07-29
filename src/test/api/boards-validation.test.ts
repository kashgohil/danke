import {
  createBoardSchema,
  createMultiStepBoardSchema,
} from '@/lib/validations/board';
import { describe, expect, it } from 'vitest';

describe('Board Validation Schemas', () => {
  describe('createBoardSchema (Legacy)', () => {
    it('should validate basic board data', () => {
      const validData = {
        title: 'Test Board',
        recipientName: 'John Doe',
      };

      const result = createBoardSchema.safeParse(validData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.title).toBe('Test Board');
        expect(result.data.recipientName).toBe('John Doe');
      }
    });

    it('should reject empty title', () => {
      const invalidData = {
        title: '',
        recipientName: 'John Doe',
      };

      const result = createBoardSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject empty recipient name', () => {
      const invalidData = {
        title: 'Test Board',
        recipientName: '',
      };

      const result = createBoardSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('createMultiStepBoardSchema', () => {
    it('should validate complete multi-step board data', () => {
      const validData = {
        title: 'Appreciation Board for John',
        recipientName: 'John Doe',
        boardType: 'appreciation' as const,
        nameType: 'full-name' as const,
        postingMode: 'multiple' as const,
        moderationEnabled: false,
        allowAnonymous: true,
        maxPostsPerUser: '5',
        boardVisibility: 'public' as const,
        typeConfig: {
          appreciationTheme: 'professional',
          showContributorNames: true,
        },
      };

      const result = createMultiStepBoardSchema.safeParse(validData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.title).toBe('Appreciation Board for John');
        expect(result.data.boardType).toBe('appreciation');
        expect(result.data.postingMode).toBe('multiple');
      }
    });

    it('should validate minimal multi-step board data', () => {
      const validData = {
        title: 'Simple Board',
        recipientName: 'Jane Doe',
        boardType: 'general' as const,
        nameType: 'full-name' as const,
        postingMode: 'multiple' as const,
      };

      const result = createMultiStepBoardSchema.safeParse(validData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.moderationEnabled).toBe(false);
        expect(result.data.allowAnonymous).toBe(true);
        expect(result.data.boardVisibility).toBe('public');
      }
    });

    it('should reject invalid board type', () => {
      const invalidData = {
        title: 'Test Board',
        recipientName: 'John Doe',
        boardType: 'invalid-type',
        nameType: 'full-name' as const,
        postingMode: 'multiple' as const,
      };

      const result = createMultiStepBoardSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(
          result.error.issues.some((issue) => issue.path.includes('boardType'))
        ).toBe(true);
      }
    });

    it('should reject invalid name type', () => {
      const invalidData = {
        title: 'Test Board',
        recipientName: 'John Doe',
        boardType: 'appreciation' as const,
        nameType: 'invalid-name-type',
        postingMode: 'multiple' as const,
      };

      const result = createMultiStepBoardSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject invalid posting mode', () => {
      const invalidData = {
        title: 'Test Board',
        recipientName: 'John Doe',
        boardType: 'appreciation' as const,
        nameType: 'full-name' as const,
        postingMode: 'invalid-mode',
      };

      const result = createMultiStepBoardSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should handle expiration date validation', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 30);

      const validData = {
        title: 'Test Board',
        recipientName: 'John Doe',
        boardType: 'birthday' as const,
        nameType: 'full-name' as const,
        postingMode: 'multiple' as const,
        expirationDate: futureDate.toISOString(),
      };

      const result = createMultiStepBoardSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject past expiration date', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);

      const invalidData = {
        title: 'Test Board',
        recipientName: 'John Doe',
        boardType: 'birthday' as const,
        nameType: 'full-name' as const,
        postingMode: 'multiple' as const,
        expirationDate: pastDate.toISOString(),
      };

      const result = createMultiStepBoardSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should validate maxPostsPerUser constraints', () => {
      const validData = {
        title: 'Test Board',
        recipientName: 'John Doe',
        boardType: 'appreciation' as const,
        nameType: 'full-name' as const,
        postingMode: 'multiple' as const,
        maxPostsPerUser: '10',
      };

      const result = createMultiStepBoardSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject invalid maxPostsPerUser format', () => {
      const invalidData = {
        title: 'Test Board',
        recipientName: 'John Doe',
        boardType: 'appreciation' as const,
        nameType: 'full-name' as const,
        postingMode: 'multiple' as const,
        maxPostsPerUser: 'not-a-number',
      };

      const result = createMultiStepBoardSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject single posting mode with multiple posts per user', () => {
      const invalidData = {
        title: 'Test Board',
        recipientName: 'John Doe',
        boardType: 'appreciation' as const,
        nameType: 'full-name' as const,
        postingMode: 'single' as const,
        maxPostsPerUser: '5',
      };

      const result = createMultiStepBoardSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(
          result.error.issues.some((issue) =>
            issue.message.includes('Single posting mode')
          )
        ).toBe(true);
      }
    });

    it('should allow single posting mode with 1 post per user', () => {
      const validData = {
        title: 'Test Board',
        recipientName: 'John Doe',
        boardType: 'appreciation' as const,
        nameType: 'full-name' as const,
        postingMode: 'single' as const,
        maxPostsPerUser: '1',
      };

      const result = createMultiStepBoardSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should handle empty maxPostsPerUser', () => {
      const validData = {
        title: 'Test Board',
        recipientName: 'John Doe',
        boardType: 'appreciation' as const,
        nameType: 'full-name' as const,
        postingMode: 'multiple' as const,
        maxPostsPerUser: '',
      };

      const result = createMultiStepBoardSchema.safeParse(validData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.maxPostsPerUser).toBe(null);
      }
    });

    it('should trim whitespace from title and recipient name', () => {
      const validData = {
        title: '  Test Board  ',
        recipientName: '  John Doe  ',
        boardType: 'appreciation' as const,
        nameType: 'full-name' as const,
        postingMode: 'multiple' as const,
      };

      const result = createMultiStepBoardSchema.safeParse(validData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.title).toBe('Test Board');
        expect(result.data.recipientName).toBe('John Doe');
      }
    });
  });
});
