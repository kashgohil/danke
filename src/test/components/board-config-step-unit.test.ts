import { boardConfigStepSchema } from '@/lib/validations/board';
import { BoardConfigData } from '@/types/multi-step-form';
import { describe, expect, it } from 'vitest';

describe('BoardConfigStep - Unit Tests', () => {
  it('validates complete board config data', () => {
    const validData: BoardConfigData = {
      postingMode: 'multiple',
      moderationEnabled: false,
      allowAnonymous: true,
      boardVisibility: 'public',
    };

    // Transform for validation
    const validationData = {
      ...validData,
      maxPostsPerUser: validData.maxPostsPerUser?.toString() || null,
      expirationDate: validData.expirationDate
        ? new Date(validData.expirationDate).toISOString()
        : undefined,
    };

    const result = boardConfigStepSchema.safeParse(validationData);
    expect(result.success).toBe(true);
  });

  it('validates board config with optional fields', () => {
    const validData = {
      postingMode: 'single' as const,
      moderationEnabled: true,
      allowAnonymous: false,
      maxPostsPerUser: '5',
      boardVisibility: 'private' as const,
      expirationDate: new Date('2024-12-31T23:59:00.000Z').toISOString(),
    };

    const result = boardConfigStepSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('validates posting mode enum', () => {
    const validModes = ['single', 'multiple'];
    const invalidModes = ['unlimited', 'restricted', ''];

    validModes.forEach((mode) => {
      const data = {
        postingMode: mode,
        moderationEnabled: false,
        allowAnonymous: true,
        boardVisibility: 'public' as const,
      };
      const result = boardConfigStepSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    invalidModes.forEach((mode) => {
      const data = {
        postingMode: mode,
        moderationEnabled: false,
        allowAnonymous: true,
        boardVisibility: 'public' as const,
      };
      const result = boardConfigStepSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  it('validates board visibility enum', () => {
    const validVisibilities = ['public', 'private'];
    const invalidVisibilities = ['protected', 'internal', ''];

    validVisibilities.forEach((visibility) => {
      const data = {
        postingMode: 'multiple' as const,
        moderationEnabled: false,
        allowAnonymous: true,
        boardVisibility: visibility,
      };
      const result = boardConfigStepSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    invalidVisibilities.forEach((visibility) => {
      const data = {
        postingMode: 'multiple' as const,
        moderationEnabled: false,
        allowAnonymous: true,
        boardVisibility: visibility,
      };
      const result = boardConfigStepSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  it('validates max posts per user format', () => {
    const validValues = ['1', '5', '10', '50', null, undefined];
    const invalidValues = ['abc', '-1'];

    validValues.forEach((value) => {
      const data = {
        postingMode: 'multiple' as const,
        moderationEnabled: false,
        allowAnonymous: true,
        boardVisibility: 'public' as const,
        maxPostsPerUser: value,
      };
      const result = boardConfigStepSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    invalidValues.forEach((value) => {
      const data = {
        postingMode: 'multiple' as const,
        moderationEnabled: false,
        allowAnonymous: true,
        boardVisibility: 'public' as const,
        maxPostsPerUser: value,
      };
      const result = boardConfigStepSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  it('requires all mandatory fields', () => {
    const incompleteData = {
      moderationEnabled: false,
      allowAnonymous: true,
    };

    const result = boardConfigStepSchema.safeParse(incompleteData);
    expect(result.success).toBe(false);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => issue.path[0]);
      expect(errors).toContain('postingMode');
      // boardVisibility has a default value, so it's not required
    }
  });

  it('handles boolean fields correctly', () => {
    const data = {
      postingMode: 'single' as const,
      moderationEnabled: true,
      allowAnonymous: false,
      boardVisibility: 'private' as const,
    };

    const result = boardConfigStepSchema.safeParse(data);
    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.moderationEnabled).toBe(true);
      expect(result.data.allowAnonymous).toBe(false);
    }
  });

  it('handles expiration date validation', () => {
    const validDate = new Date('2024-12-31T23:59:00.000Z').toISOString();
    const data = {
      postingMode: 'multiple' as const,
      moderationEnabled: false,
      allowAnonymous: true,
      boardVisibility: 'public' as const,
      expirationDate: validDate,
    };

    const result = boardConfigStepSchema.safeParse(data);
    expect(result.success).toBe(true);
  });
});
