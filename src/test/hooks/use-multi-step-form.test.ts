import {
  generateTitle,
  useMultiStepForm,
  validateBasicInfo,
  validateBoardConfig,
  validateTypeConfig,
} from '@/hooks/use-multi-step-form';
import {
  BasicInfoData,
  BoardConfigData,
  TypeConfigData,
} from '@/types/multi-step-form';
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(globalThis, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

describe('useMultiStepForm', () => {
  it('should initialize with correct default state', () => {
    const { result } = renderHook(() => useMultiStepForm());

    expect(result.current.currentStep).toBe(0);
    expect(result.current.stepData.basicInfo.boardType).toBe('general');
    expect(result.current.stepData.basicInfo.recipientName).toBe('');
    expect(result.current.stepData.basicInfo.nameType).toBe('full-name');
    expect(result.current.stepData.boardConfig.postingMode).toBe('multiple');
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.submitError).toBe(null);
  });

  it('should navigate between steps correctly', () => {
    const { result } = renderHook(() => useMultiStepForm());

    // Test next step
    act(() => {
      result.current.nextStep();
    });
    expect(result.current.currentStep).toBe(1);

    // Test previous step
    act(() => {
      result.current.prevStep();
    });
    expect(result.current.currentStep).toBe(0);

    // Test go to specific step
    act(() => {
      result.current.goToStep(2);
    });
    expect(result.current.currentStep).toBe(2);
  });

  it('should update basic info data correctly', () => {
    const { result } = renderHook(() => useMultiStepForm());

    act(() => {
      result.current.updateBasicInfo({
        recipientName: 'John Doe',
        boardType: 'appreciation',
      });
    });

    expect(result.current.stepData.basicInfo.recipientName).toBe('John Doe');
    expect(result.current.stepData.basicInfo.boardType).toBe('appreciation');
  });

  it('should auto-generate title when basic info changes', () => {
    const { result } = renderHook(() => useMultiStepForm());

    act(() => {
      result.current.updateBasicInfo({
        recipientName: 'John Doe',
        boardType: 'birthday',
      });
    });

    expect(result.current.stepData.basicInfo.title).toBe(
      'Happy Birthday John Doe!'
    );
  });

  it('should update type config data correctly', () => {
    const { result } = renderHook(() => useMultiStepForm());

    act(() => {
      result.current.updateTypeConfig({
        appreciationTheme: 'professional',
        showContributorNames: true,
      });
    });

    expect(result.current.stepData.typeConfig.appreciationTheme).toBe(
      'professional'
    );
    expect(result.current.stepData.typeConfig.showContributorNames).toBe(true);
  });

  it('should update board config data correctly', () => {
    const { result } = renderHook(() => useMultiStepForm());

    act(() => {
      result.current.updateBoardConfig({
        postingMode: 'single',
        moderationEnabled: true,
      });
    });

    expect(result.current.stepData.boardConfig.postingMode).toBe('single');
    expect(result.current.stepData.boardConfig.moderationEnabled).toBe(true);
  });

  it('should validate current step correctly', () => {
    const { result } = renderHook(() => useMultiStepForm());

    // Initially invalid (empty recipient name)
    act(() => {
      const validation = result.current.validateCurrentStep();
      expect(validation.isValid).toBe(false);
      expect(validation.errors.recipientName).toBeDefined();
    });

    // Make it valid
    act(() => {
      result.current.updateBasicInfo({
        recipientName: 'John Doe',
      });
    });

    act(() => {
      const validation = result.current.validateCurrentStep();
      expect(validation.isValid).toBe(true);
      expect(Object.keys(validation.errors)).toHaveLength(0);
    });
  });

  it('should handle navigation permissions correctly', () => {
    const { result } = renderHook(() => useMultiStepForm());

    // Initially can't go next (invalid) or back (first step)
    expect(result.current.canGoNext).toBe(false);
    expect(result.current.canGoBack).toBe(false);

    // Make step valid
    act(() => {
      result.current.updateBasicInfo({
        recipientName: 'John Doe',
      });
      result.current.validateCurrentStep();
    });

    expect(result.current.canGoNext).toBe(true);
    expect(result.current.canGoBack).toBe(false);

    // Go to next step
    act(() => {
      result.current.nextStep();
    });

    expect(result.current.canGoBack).toBe(true);
    expect(result.current.isLastStep).toBe(false);

    // Go to last step
    act(() => {
      result.current.nextStep();
    });

    expect(result.current.isLastStep).toBe(true);
  });

  it('should reset form correctly', () => {
    const { result } = renderHook(() => useMultiStepForm());

    // Make changes
    act(() => {
      result.current.updateBasicInfo({ recipientName: 'John Doe' });
      result.current.nextStep();
    });

    expect(result.current.currentStep).toBe(1);
    expect(result.current.stepData.basicInfo.recipientName).toBe('John Doe');

    // Reset
    act(() => {
      result.current.resetForm();
    });

    expect(result.current.currentStep).toBe(0);
    expect(result.current.stepData.basicInfo.recipientName).toBe('');
  });
});

describe('Validation functions', () => {
  describe('validateBasicInfo', () => {
    it('should validate required fields', () => {
      const invalidData: BasicInfoData = {
        boardType: 'general',
        recipientName: '',
        nameType: 'full-name',
      };

      const result = validateBasicInfo(invalidData);
      expect(result.isValid).toBe(false);
      expect(result.errors.recipientName).toBeDefined();
    });

    it('should validate field lengths', () => {
      const invalidData: BasicInfoData = {
        boardType: 'general',
        recipientName: 'a'.repeat(256), // Too long
        nameType: 'full-name',
      };

      const result = validateBasicInfo(invalidData);
      expect(result.isValid).toBe(false);
      expect(result.errors.recipientName).toContain('255 characters');
    });

    it('should pass with valid data', () => {
      const validData: BasicInfoData = {
        boardType: 'appreciation',
        recipientName: 'John Doe',
        nameType: 'full-name',
      };

      const result = validateBasicInfo(validData);
      expect(result.isValid).toBe(true);
      expect(Object.keys(result.errors)).toHaveLength(0);
    });
  });

  describe('validateTypeConfig', () => {
    it('should validate birthday date', () => {
      const invalidData: TypeConfigData = {
        birthdayDate: 'invalid-date',
      };

      const result = validateTypeConfig(invalidData, 'birthday');
      expect(result.isValid).toBe(false);
      expect(result.errors.birthdayDate).toBeDefined();
    });

    it('should validate custom message length', () => {
      const invalidData: TypeConfigData = {
        customMessage: 'a'.repeat(501), // Too long
      };

      const result = validateTypeConfig(invalidData, 'general');
      expect(result.isValid).toBe(false);
      expect(result.errors.customMessage).toContain('500 characters');
    });

    it('should pass with valid data', () => {
      const validData: TypeConfigData = {
        appreciationTheme: 'professional',
        showContributorNames: true,
        customMessage: 'Great work!',
      };

      const result = validateTypeConfig(validData, 'appreciation');
      expect(result.isValid).toBe(true);
      expect(Object.keys(result.errors)).toHaveLength(0);
    });
  });

  describe('validateBoardConfig', () => {
    it('should validate required fields', () => {
      const invalidData: BoardConfigData = {
        postingMode: 'multiple',
        moderationEnabled: false,
        allowAnonymous: true,
        boardVisibility: 'public',
      };

      const result = validateBoardConfig(invalidData);
      expect(result.isValid).toBe(true); // All required fields present
    });

    it('should validate max posts per user range', () => {
      const invalidData: BoardConfigData = {
        postingMode: 'multiple',
        moderationEnabled: false,
        allowAnonymous: true,
        boardVisibility: 'public',
        maxPostsPerUser: 100, // Too high
      };

      const result = validateBoardConfig(invalidData);
      expect(result.isValid).toBe(false);
      expect(result.errors.maxPostsPerUser).toContain('between 1 and 50');
    });

    it('should validate expiration date is in future', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const invalidData: BoardConfigData = {
        postingMode: 'single',
        moderationEnabled: false,
        allowAnonymous: true,
        boardVisibility: 'public',
        expirationDate: yesterday.toISOString(),
      };

      const result = validateBoardConfig(invalidData);
      expect(result.isValid).toBe(false);
      expect(result.errors.expirationDate).toContain('future');
    });
  });

  describe('generateTitle', () => {
    it('should generate correct titles for different board types', () => {
      expect(generateTitle('appreciation', 'John Doe', 'full-name')).toBe(
        'Appreciation Board for John Doe'
      );
      expect(generateTitle('birthday', 'John Doe', 'full-name')).toBe(
        'Happy Birthday John Doe!'
      );
      expect(generateTitle('farewell', 'John Doe', 'full-name')).toBe(
        'Farewell John Doe'
      );
      expect(generateTitle('general', 'John Doe', 'full-name')).toBe(
        'Board for John Doe'
      );
    });

    it('should handle first name only', () => {
      expect(generateTitle('birthday', 'John Doe', 'first-name')).toBe(
        'Happy Birthday John!'
      );
    });

    it('should handle empty name', () => {
      expect(generateTitle('appreciation', '', 'full-name')).toBe('');
    });
  });
});
