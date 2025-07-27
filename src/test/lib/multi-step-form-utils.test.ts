import {
  clearFormDataFromStorage,
  getFieldErrorMessage,
  getProgressPercentage,
  getStepCompletionStatus,
  getStepDescription,
  getStepTitle,
  isFutureDate,
  isValidDate,
  isValidEmail,
  loadFormDataFromStorage,
  sanitizeInput,
  saveFormDataToStorage,
  transformFormDataForAPI,
} from '@/lib/multi-step-form-utils';
import { MultiStepFormData } from '@/types/multi-step-form';
import { beforeEach, describe, expect, it, vi } from 'vitest';

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

describe('multi-step-form-utils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('localStorage utilities', () => {
    const mockFormData: MultiStepFormData = {
      basicInfo: {
        boardType: 'appreciation',
        recipientName: 'John Doe',
        nameType: 'full-name',
        title: 'Appreciation Board for John Doe',
      },
      typeConfig: {
        appreciationTheme: 'professional',
        showContributorNames: true,
      },
      boardConfig: {
        postingMode: 'multiple',
        moderationEnabled: false,
        allowAnonymous: true,
        boardVisibility: 'public',
      },
    };

    it('should save form data to localStorage', () => {
      saveFormDataToStorage(mockFormData);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'multi-step-board-form',
        JSON.stringify(mockFormData)
      );
    });

    it('should load form data from localStorage', () => {
      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockFormData));

      const result = loadFormDataFromStorage();

      expect(localStorageMock.getItem).toHaveBeenCalledWith(
        'multi-step-board-form'
      );
      expect(result).toEqual(mockFormData);
    });

    it('should return null when localStorage is empty', () => {
      localStorageMock.getItem.mockReturnValue(null);

      const result = loadFormDataFromStorage();

      expect(result).toBeNull();
    });

    it('should handle localStorage errors gracefully', () => {
      localStorageMock.getItem.mockImplementation(() => {
        throw new Error('localStorage error');
      });

      const result = loadFormDataFromStorage();

      expect(result).toBeNull();
    });

    it('should clear form data from localStorage', () => {
      clearFormDataFromStorage();

      expect(localStorageMock.removeItem).toHaveBeenCalledWith(
        'multi-step-board-form'
      );
    });
  });

  describe('transformFormDataForAPI', () => {
    it('should transform form data correctly for API', () => {
      const formData: MultiStepFormData = {
        basicInfo: {
          boardType: 'birthday',
          recipientName: 'Jane Smith',
          nameType: 'first-name',
          title: 'Happy Birthday Jane!',
        },
        typeConfig: {
          birthdayDate: '2024-12-25',
          ageDisplay: 'show',
        },
        boardConfig: {
          postingMode: 'single',
          moderationEnabled: true,
          allowAnonymous: false,
          boardVisibility: 'private',
          maxPostsPerUser: 1,
          expirationDate: '2024-12-31T23:59:59Z',
        },
      };

      const result = transformFormDataForAPI(formData);

      expect(result).toEqual({
        title: 'Happy Birthday Jane!',
        recipientName: 'Jane Smith',
        boardType: 'birthday',
        nameType: 'first-name',
        postingMode: 'single',
        moderationEnabled: true,
        allowAnonymous: false,
        maxPostsPerUser: 1,
        boardVisibility: 'private',
        expirationDate: '2024-12-31T23:59:59Z',
        typeConfig: {
          birthdayDate: '2024-12-25',
          ageDisplay: 'show',
        },
      });
    });
  });

  describe('getStepCompletionStatus', () => {
    it('should return correct completion status for all steps', () => {
      const completeFormData: MultiStepFormData = {
        basicInfo: {
          boardType: 'general',
          recipientName: 'John Doe',
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

      const result = getStepCompletionStatus(completeFormData);

      expect(result[0]).toBe(true); // Basic info complete
      expect(result[1]).toBe(true); // Type config always complete
      expect(result[2]).toBe(true); // Board config complete
    });

    it('should return false for incomplete basic info', () => {
      const incompleteFormData: MultiStepFormData = {
        basicInfo: {
          boardType: 'general',
          recipientName: '', // Empty name
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

      const result = getStepCompletionStatus(incompleteFormData);

      expect(result[0]).toBe(false); // Basic info incomplete
      expect(result[1]).toBe(true); // Type config always complete
      expect(result[2]).toBe(true); // Board config complete
    });
  });

  describe('validation helpers', () => {
    it('should validate email addresses correctly', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name+tag@domain.co.uk')).toBe(true);
      expect(isValidEmail('invalid-email')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
    });

    it('should validate dates correctly', () => {
      expect(isValidDate('2024-12-25')).toBe(true);
      expect(isValidDate('2024-12-25T10:30:00Z')).toBe(true);
      expect(isValidDate('')).toBe(true); // Empty is valid (optional)
      expect(isValidDate('invalid-date')).toBe(false);
      expect(isValidDate('2024-13-45')).toBe(false);
    });

    it('should validate future dates correctly', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      expect(isFutureDate(tomorrow.toISOString())).toBe(true);
      expect(isFutureDate(yesterday.toISOString())).toBe(false);
      expect(isFutureDate('')).toBe(true); // Empty is valid (optional)
    });

    it('should sanitize input correctly', () => {
      expect(sanitizeInput('  Hello World  ')).toBe('Hello World');
      expect(sanitizeInput('Test<script>alert("xss")</script>')).toBe(
        'Testscriptalert("xss")/script'
      );
      expect(sanitizeInput('Normal text')).toBe('Normal text');
    });

    it('should generate field error messages correctly', () => {
      const rules = {
        required: true,
        minLength: 3,
        maxLength: 10,
        pattern: /^[a-zA-Z]+$/,
        patternMessage: 'Only letters allowed',
      };

      expect(getFieldErrorMessage('Name', '', rules)).toBe('Name is required');
      expect(getFieldErrorMessage('Name', 'ab', rules)).toBe(
        'Name must be at least 3 characters'
      );
      expect(getFieldErrorMessage('Name', 'verylongname', rules)).toBe(
        'Name must be less than 10 characters'
      );
      expect(getFieldErrorMessage('Name', 'test123', rules)).toBe(
        'Only letters allowed'
      );
      expect(getFieldErrorMessage('Name', 'valid', rules)).toBeNull();
    });
  });

  describe('step helpers', () => {
    it('should return correct step titles', () => {
      expect(getStepTitle(0)).toBe('Basic Information');
      expect(getStepTitle(1)).toBe('Type Configuration');
      expect(getStepTitle(2)).toBe('Board Settings');
      expect(getStepTitle(99)).toBe('Unknown Step');
    });

    it('should return correct step descriptions', () => {
      expect(getStepDescription(0)).toBe(
        'Set up the basic details for your board'
      );
      expect(getStepDescription(1)).toBe(
        'Configure options specific to your board type'
      );
      expect(getStepDescription(2)).toBe(
        'Choose posting rules and board settings'
      );
      expect(getStepDescription(99)).toBe('');
    });

    it('should calculate progress percentage correctly', () => {
      expect(getProgressPercentage(0, 3)).toBe(33);
      expect(getProgressPercentage(1, 3)).toBe(67);
      expect(getProgressPercentage(2, 3)).toBe(100);
      expect(getProgressPercentage(0)).toBe(33); // Default 3 steps
    });
  });
});
