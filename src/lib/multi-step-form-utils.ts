import { MultiStepFormData } from '@/types/multi-step-form';

// Local storage key for form persistence
const FORM_STORAGE_KEY = 'multi-step-board-form';

// Form data persistence utilities
export const saveFormDataToStorage = (data: MultiStepFormData): void => {
  try {
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to save form data to localStorage:', error);
  }
};

export const loadFormDataFromStorage = (): MultiStepFormData | null => {
  try {
    const stored = localStorage.getItem(FORM_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.warn('Failed to load form data from localStorage:', error);
  }
  return null;
};

export const clearFormDataFromStorage = (): void => {
  try {
    localStorage.removeItem(FORM_STORAGE_KEY);
  } catch (error) {
    console.warn('Failed to clear form data from localStorage:', error);
  }
};

// Form data transformation utilities
export const transformFormDataForAPI = (formData: MultiStepFormData) => {
  const { basicInfo, typeConfig, boardConfig } = formData;

  return {
    // Basic board fields
    title: basicInfo.title || '',
    recipientName: basicInfo.recipientName,

    // Extended fields
    boardType: basicInfo.boardType,
    postingMode: boardConfig.postingMode,
    moderationEnabled: boardConfig.moderationEnabled,
    allowAnonymous: boardConfig.allowAnonymous,
    maxPostsPerUser: boardConfig.maxPostsPerUser,
    boardVisibility: boardConfig.boardVisibility,
    expirationDate: boardConfig.expirationDate,

    // Type-specific configuration as JSON
    typeConfig: typeConfig,
  };
};

// Step completion validation
export const getStepCompletionStatus = (formData: MultiStepFormData) => {
  const basicInfoComplete = !!(
    formData.basicInfo.recipientName.trim() && formData.basicInfo.boardType
  );

  // Type config is always considered complete since most fields are optional
  const typeConfigComplete = true;

  const boardConfigComplete = !!(
    formData.boardConfig.postingMode &&
    formData.boardConfig.boardVisibility !== undefined &&
    formData.boardConfig.moderationEnabled !== undefined &&
    formData.boardConfig.allowAnonymous !== undefined
  );

  return {
    0: basicInfoComplete,
    1: typeConfigComplete,
    2: boardConfigComplete,
  };
};

// Form validation helpers
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidDate = (dateString: string): boolean => {
  if (!dateString) return true; // Optional dates are valid when empty
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

export const isFutureDate = (dateString: string): boolean => {
  if (!dateString) return true; // Optional dates are valid when empty
  const date = new Date(dateString);
  return date > new Date();
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

// Error message helpers
export const getFieldErrorMessage = (
  fieldName: string,
  value: any,
  rules: any
): string | null => {
  if (!value && rules.required) {
    return `${fieldName} is required`;
  }

  if (value && rules.minLength && value.length < rules.minLength) {
    return `${fieldName} must be at least ${rules.minLength} characters`;
  }

  if (value && rules.maxLength && value.length > rules.maxLength) {
    return `${fieldName} must be less than ${rules.maxLength} characters`;
  }

  if (value && rules.pattern && !rules.pattern.test(value)) {
    return rules.patternMessage || `${fieldName} format is invalid`;
  }

  return null;
};

// Step navigation helpers
export const getStepTitle = (stepIndex: number): string => {
  const titles = ['Basic Information', 'Type Configuration', 'Board Settings'];
  return titles[stepIndex] || 'Unknown Step';
};

export const getStepDescription = (stepIndex: number): string => {
  const descriptions = [
    'Set up the basic details for your board',
    'Configure options specific to your board type',
    'Choose posting rules and board settings',
  ];
  return descriptions[stepIndex] || '';
};

export const getProgressPercentage = (
  currentStep: number,
  totalSteps: number = 3
): number => {
  return Math.round(((currentStep + 1) / totalSteps) * 100);
};
