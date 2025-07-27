/**
 * Unit tests for BasicInfoStep component logic (without DOM rendering)
 * Tests the Vitest conversion and core functionality
 */

import { basicInfoStepSchema } from '@/lib/validations/board';
import { BasicInfoData } from '@/types/multi-step-form';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock functions using Vitest instead of Jest
const mockOnChange = vi.fn();
const mockOnValidationChange = vi.fn();

describe('BasicInfoStep - Unit Tests (Vitest)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('validates complete basic info data with new board types', () => {
    const validData: BasicInfoData = {
      boardType: 'welcome',
      recipientName: 'John Smith',
      nameType: 'full-name',
      title: 'Welcome John Smith!',
    };

    const result = basicInfoStepSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('validates all new board types', () => {
    const newBoardTypes = [
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
    ] as const;

    newBoardTypes.forEach((boardType) => {
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

  it('rejects invalid board types', () => {
    const invalidData = {
      boardType: 'invalid-type',
      recipientName: 'John Smith',
      nameType: 'full-name',
      title: 'Test Board',
    };

    const result = basicInfoStepSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('mock functions work with Vitest', () => {
    // Test that Vitest mocks work correctly
    mockOnChange({ boardType: 'appreciation' });
    mockOnValidationChange(true);

    expect(mockOnChange).toHaveBeenCalledWith({ boardType: 'appreciation' });
    expect(mockOnValidationChange).toHaveBeenCalledWith(true);
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnValidationChange).toHaveBeenCalledTimes(1);
  });

  it('mock functions clear correctly between tests', () => {
    // This test verifies that vi.clearAllMocks() works in beforeEach
    expect(mockOnChange).not.toHaveBeenCalled();
    expect(mockOnValidationChange).not.toHaveBeenCalled();
  });

  it('validates board type enum correctly', () => {
    const allBoardTypes = [
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

    // Test that all board types are valid
    allBoardTypes.forEach((boardType) => {
      const data: BasicInfoData = {
        boardType,
        recipientName: 'John Smith',
        nameType: 'full-name',
        title: 'Test Board',
      };

      const result = basicInfoStepSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    // Verify we have 14 total board types
    expect(allBoardTypes.length).toBe(14);
  });

  it('validates name type options', () => {
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

  it('requires all mandatory fields', () => {
    // Test missing boardType
    const missingBoardType = {
      recipientName: 'John Smith',
      nameType: 'full-name',
      title: 'Test Board',
    };

    expect(basicInfoStepSchema.safeParse(missingBoardType).success).toBe(false);

    // Test missing recipientName
    const missingRecipientName = {
      boardType: 'appreciation',
      nameType: 'full-name',
      title: 'Test Board',
    };

    expect(basicInfoStepSchema.safeParse(missingRecipientName).success).toBe(
      false
    );

    // Test missing nameType
    const missingNameType = {
      boardType: 'appreciation',
      recipientName: 'John Smith',
      title: 'Test Board',
    };

    expect(basicInfoStepSchema.safeParse(missingNameType).success).toBe(false);
  });

  it('allows optional title field', () => {
    const dataWithoutTitle = {
      boardType: 'appreciation',
      recipientName: 'John Smith',
      nameType: 'full-name',
    };

    const result = basicInfoStepSchema.safeParse(dataWithoutTitle);
    expect(result.success).toBe(true);
  });
});
