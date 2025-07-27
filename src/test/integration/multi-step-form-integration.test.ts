import {
  generateTitle,
  validateBasicInfo,
  validateBoardConfig,
  validateTypeConfig,
} from '@/hooks/use-multi-step-form';
import {
  getStepCompletionStatus,
  transformFormDataForAPI,
} from '@/lib/multi-step-form-utils';
import { MultiStepFormData } from '@/types/multi-step-form';
import { describe, expect, it } from 'vitest';

describe('Multi-step form integration', () => {
  it('should handle complete form workflow', () => {
    // Step 1: Basic Info
    const basicInfo = {
      boardType: 'appreciation' as const,
      recipientName: 'John Doe',
      nameType: 'full-name' as const,
      title: generateTitle('appreciation', 'John Doe', 'full-name'),
    };

    const basicInfoValidation = validateBasicInfo(basicInfo);
    expect(basicInfoValidation.isValid).toBe(true);
    expect(basicInfo.title).toBe('Appreciation Board for John Doe');

    // Step 2: Type Config
    const typeConfig = {
      appreciationTheme: 'professional' as const,
      showContributorNames: true,
      customMessage: 'Thank you for your hard work!',
    };

    const typeConfigValidation = validateTypeConfig(
      typeConfig,
      basicInfo.boardType
    );
    expect(typeConfigValidation.isValid).toBe(true);

    // Step 3: Board Config
    const boardConfig = {
      postingMode: 'multiple' as const,
      moderationEnabled: false,
      allowAnonymous: true,
      boardVisibility: 'public' as const,
      maxPostsPerUser: 5,
    };

    const boardConfigValidation = validateBoardConfig(boardConfig);
    expect(boardConfigValidation.isValid).toBe(true);

    // Complete form data
    const formData: MultiStepFormData = {
      basicInfo,
      typeConfig,
      boardConfig,
    };

    // Check completion status
    const completionStatus = getStepCompletionStatus(formData);
    expect(completionStatus[0]).toBe(true); // Basic info complete
    expect(completionStatus[1]).toBe(true); // Type config complete
    expect(completionStatus[2]).toBe(true); // Board config complete

    // Transform for API
    const apiData = transformFormDataForAPI(formData);
    expect(apiData).toEqual({
      title: 'Appreciation Board for John Doe',
      recipientName: 'John Doe',
      boardType: 'appreciation',
      nameType: 'full-name',
      postingMode: 'multiple',
      moderationEnabled: false,
      allowAnonymous: true,
      maxPostsPerUser: 5,
      boardVisibility: 'public',
      expirationDate: undefined,
      typeConfig: {
        appreciationTheme: 'professional',
        showContributorNames: true,
        customMessage: 'Thank you for your hard work!',
      },
    });
  });

  it('should handle birthday board workflow', () => {
    const basicInfo = {
      boardType: 'birthday' as const,
      recipientName: 'Jane Smith',
      nameType: 'first-name' as const,
      title: generateTitle('birthday', 'Jane Smith', 'first-name'),
    };

    const typeConfig = {
      birthdayDate: '2024-12-25',
      ageDisplay: 'milestone-only' as const,
    };

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30); // 30 days from now

    const boardConfig = {
      postingMode: 'single' as const,
      moderationEnabled: true,
      allowAnonymous: false,
      boardVisibility: 'private' as const,
      expirationDate: futureDate.toISOString(),
    };

    // Validate all steps
    expect(validateBasicInfo(basicInfo).isValid).toBe(true);
    expect(validateTypeConfig(typeConfig, basicInfo.boardType).isValid).toBe(
      true
    );
    expect(validateBoardConfig(boardConfig).isValid).toBe(true);

    // Check title generation
    expect(basicInfo.title).toBe('Happy Birthday Jane!');

    const formData: MultiStepFormData = {
      basicInfo,
      typeConfig,
      boardConfig,
    };

    const apiData = transformFormDataForAPI(formData);
    expect(apiData.boardType).toBe('birthday');
    expect(apiData.nameType).toBe('first-name');
    expect(apiData.postingMode).toBe('single');
    expect(apiData.typeConfig.birthdayDate).toBe('2024-12-25');
  });

  it('should handle validation errors correctly', () => {
    // Invalid basic info
    const invalidBasicInfo = {
      boardType: 'general' as const,
      recipientName: '', // Empty name
      nameType: 'full-name' as const,
    };

    const basicInfoValidation = validateBasicInfo(invalidBasicInfo);
    expect(basicInfoValidation.isValid).toBe(false);
    expect(basicInfoValidation.errors.recipientName).toBeDefined();

    // Invalid type config
    const invalidTypeConfig = {
      birthdayDate: 'invalid-date',
      customMessage: 'a'.repeat(501), // Too long
    };

    const typeConfigValidation = validateTypeConfig(
      invalidTypeConfig,
      'birthday'
    );
    expect(typeConfigValidation.isValid).toBe(false);
    expect(typeConfigValidation.errors.birthdayDate).toBeDefined();
    expect(typeConfigValidation.errors.customMessage).toBeDefined();

    // Invalid board config
    const invalidBoardConfig = {
      postingMode: 'multiple' as const,
      moderationEnabled: false,
      allowAnonymous: true,
      boardVisibility: 'public' as const,
      maxPostsPerUser: 100, // Too high
      expirationDate: '2020-01-01', // Past date
    };

    const boardConfigValidation = validateBoardConfig(invalidBoardConfig);
    expect(boardConfigValidation.isValid).toBe(false);
    expect(boardConfigValidation.errors.maxPostsPerUser).toBeDefined();
    expect(boardConfigValidation.errors.expirationDate).toBeDefined();
  });

  it('should handle step completion status correctly', () => {
    // Incomplete basic info
    const incompleteFormData: MultiStepFormData = {
      basicInfo: {
        boardType: 'general',
        recipientName: '', // Missing
        nameType: 'full-name',
      },
      typeConfig: {},
      boardConfig: {
        postingMode: 'multiple',
        moderationEnabled: false,
        allowAnonymous: true,
        boardVisibility: 'public',
      },
    };

    const completionStatus = getStepCompletionStatus(incompleteFormData);
    expect(completionStatus[0]).toBe(false); // Basic info incomplete
    expect(completionStatus[1]).toBe(true); // Type config always complete
    expect(completionStatus[2]).toBe(true); // Board config complete
  });
});
