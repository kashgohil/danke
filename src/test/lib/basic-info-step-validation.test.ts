import { basicInfoStepSchema } from '@/lib/validations/board';
import { BasicInfoData } from '@/types/multi-step-form';
import { describe, expect, it } from 'vitest';

describe('BasicInfoStep Validation', () => {
  it('validates complete basic info data', () => {
    const validData: BasicInfoData = {
      boardType: 'appreciation',
      recipientName: 'John Smith',
      nameType: 'full-name',
      title: 'Appreciation Board for John Smith',
    };

    const result = basicInfoStepSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('requires board type', () => {
    const invalidData = {
      recipientName: 'John Smith',
      nameType: 'full-name',
      title: 'Test Board',
    };

    const result = basicInfoStepSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((issue) => issue.path.includes('boardType'))
      ).toBe(true);
    }
  });

  it('requires recipient name', () => {
    const invalidData = {
      boardType: 'appreciation',
      nameType: 'full-name',
      title: 'Test Board',
    };

    const result = basicInfoStepSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((issue) =>
          issue.path.includes('recipientName')
        )
      ).toBe(true);
    }
  });

  it('requires name type', () => {
    const invalidData = {
      boardType: 'appreciation',
      recipientName: 'John Smith',
      title: 'Test Board',
    };

    const result = basicInfoStepSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((issue) => issue.path.includes('nameType'))
      ).toBe(true);
    }
  });

  it('validates all board types', () => {
    const boardTypes = [
      'appreciation',
      'birthday',
      'farewell',
      'welcome',
      'congratulations',
      'get-well',
      'sympathy',
      'holiday',
      'anniversary',
      'retirement',
      'graduation',
      'baby-shower',
      'wedding',
      'general',
    ] as const;

    boardTypes.forEach((boardType) => {
      const data: BasicInfoData = {
        boardType,
        recipientName: 'John Smith',
        nameType: 'full-name',
        title: 'Test Board',
      };

      const result = basicInfoStepSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  it('validates all name types', () => {
    const nameTypes = ['first-name', 'full-name', 'nickname'] as const;

    nameTypes.forEach((nameType) => {
      const data: BasicInfoData = {
        boardType: 'appreciation',
        recipientName: 'John Smith',
        nameType,
        title: 'Test Board',
      };

      const result = basicInfoStepSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  it('rejects invalid board type', () => {
    const invalidData = {
      boardType: 'invalid-type',
      recipientName: 'John Smith',
      nameType: 'full-name',
      title: 'Test Board',
    };

    const result = basicInfoStepSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('rejects invalid name type', () => {
    const invalidData = {
      boardType: 'appreciation',
      recipientName: 'John Smith',
      nameType: 'invalid-name-type',
      title: 'Test Board',
    };

    const result = basicInfoStepSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('allows empty title (optional field)', () => {
    const dataWithoutTitle = {
      boardType: 'appreciation',
      recipientName: 'John Smith',
      nameType: 'full-name',
    };

    const result = basicInfoStepSchema.safeParse(dataWithoutTitle);
    expect(result.success).toBe(true);
  });

  it('rejects empty recipient name', () => {
    const invalidData = {
      boardType: 'appreciation',
      recipientName: '',
      nameType: 'full-name',
      title: 'Test Board',
    };

    const result = basicInfoStepSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some(
          (issue) =>
            issue.path.includes('recipientName') &&
            issue.message.includes('required')
        )
      ).toBe(true);
    }
  });

  it('rejects recipient name that is too long', () => {
    const invalidData = {
      boardType: 'appreciation',
      recipientName: 'a'.repeat(256), // Exceeds 255 character limit
      nameType: 'full-name',
      title: 'Test Board',
    };

    const result = basicInfoStepSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some(
          (issue) =>
            issue.path.includes('recipientName') &&
            issue.message.includes('too long')
        )
      ).toBe(true);
    }
  });
});
