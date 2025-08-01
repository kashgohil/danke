// Multi-step form types and interfaces

export interface BasicInfoData {
  boardType:
    | 'appreciation'
    | 'birthday'
    | 'farewell'
    | 'welcome'
    | 'congratulations'
    | 'get-well'
    | 'sympathy'
    | 'holiday'
    | 'anniversary'
    | 'retirement'
    | 'graduation'
    | 'baby-shower'
    | 'wedding'
    | 'general';
  recipientName: string;
  title?: string; // Auto-generated based on type and name, but editable
}

export interface TypeConfigData {
  // Appreciation-specific
  appreciationTheme?: 'professional' | 'casual' | 'celebration';
  showContributorNames?: boolean;

  // Birthday-specific
  birthdayDate?: Date;
  ageDisplay?: 'show' | 'hide' | 'milestone-only';

  // Farewell-specific
  farewellType?: 'retirement' | 'job-change' | 'relocation' | 'other';
  lastWorkingDay?: Date;

  // General options
  customMessage?: string;
  backgroundColor?: string;
}

export interface BoardConfigData {
  postingMode: 'single' | 'multiple';
  moderationEnabled: boolean;
  allowAnonymous: boolean;
  maxPostsPerUser?: number; // Only for multiple mode
  boardVisibility: 'public' | 'private';
  expirationDate?: Date;
}

export interface MultiStepFormData {
  basicInfo: BasicInfoData;
  typeConfig: TypeConfigData;
  boardConfig: BoardConfigData;
}

export interface FormState {
  currentStep: number;
  stepData: MultiStepFormData;
  stepValidation: {
    [stepIndex: number]: boolean;
  };
  stepErrors: {
    [stepIndex: number]: Record<string, string>;
  };
  touchedFields: {
    [stepIndex: number]: Set<string>;
  };
  isSubmitting: boolean;
  submitError: string | null;
  completedSteps: Set<number>;
}

export type FormAction =
  | { type: 'SET_STEP'; payload: number }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | {
      type: 'UPDATE_STEP_DATA';
      payload: { step: keyof MultiStepFormData; data: Partial<any> };
    }
  | { type: 'SET_STEP_VALIDATION'; payload: { step: number; isValid: boolean } }
  | {
      type: 'SET_STEP_ERRORS';
      payload: { step: number; errors: Record<string, string> };
    }
  | { type: 'SET_SUBMITTING'; payload: boolean }
  | { type: 'SET_SUBMIT_ERROR'; payload: string | null }
  | { type: 'RESET_FORM' }
  | { type: 'MARK_STEP_COMPLETED'; payload: number }
  | { type: 'MARK_FIELD_TOUCHED'; payload: { step: number; field: string } };

export interface StepValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export interface ValidationRule<T> {
  field: keyof T;
  validator: (value: any, allData: T) => string | null;
  required?: boolean;
}
