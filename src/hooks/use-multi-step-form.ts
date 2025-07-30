import {
  BasicInfoData,
  BoardConfigData,
  FormAction,
  FormState,
  MultiStepFormData,
  StepValidationResult,
  TypeConfigData,
} from '@/types/multi-step-form';
import { useCallback, useMemo, useReducer } from 'react';

// Initial form data
const initialFormData: MultiStepFormData = {
  basicInfo: {
    boardType: 'general',
    recipientName: '',
    nameType: 'full-name',
    title: '',
  },
  typeConfig: {},
  boardConfig: {
    postingMode: 'multiple',
    moderationEnabled: false,
    allowAnonymous: true,
    boardVisibility: 'public',
  },
};

// Initial state
const initialState: FormState = {
  currentStep: 0,
  stepData: initialFormData,
  stepValidation: {},
  stepErrors: {},
  touchedFields: {},
  isSubmitting: false,
  submitError: null,
  completedSteps: new Set(),
};

// Form reducer
function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_STEP':
      return {
        ...state,
        currentStep: Math.max(0, Math.min(action.payload, 2)), // Clamp between 0-2
      };

    case 'NEXT_STEP':
      const nextStep = Math.min(state.currentStep + 1, 2);
      return {
        ...state,
        currentStep: nextStep,
        completedSteps: new Set([...state.completedSteps, state.currentStep]),
      };

    case 'PREV_STEP':
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 0),
      };

    case 'UPDATE_STEP_DATA':
      return {
        ...state,
        stepData: {
          ...state.stepData,
          [action.payload.step]: {
            ...state.stepData[action.payload.step],
            ...action.payload.data,
          },
        },
      };

    case 'SET_STEP_VALIDATION':
      return {
        ...state,
        stepValidation: {
          ...state.stepValidation,
          [action.payload.step]: action.payload.isValid,
        },
      };

    case 'SET_STEP_ERRORS':
      return {
        ...state,
        stepErrors: {
          ...state.stepErrors,
          [action.payload.step]: action.payload.errors,
        },
      };

    case 'SET_SUBMITTING':
      return {
        ...state,
        isSubmitting: action.payload,
      };

    case 'SET_SUBMIT_ERROR':
      return {
        ...state,
        submitError: action.payload,
        isSubmitting: false,
      };

    case 'MARK_STEP_COMPLETED':
      return {
        ...state,
        completedSteps: new Set([...state.completedSteps, action.payload]),
      };

    case 'MARK_FIELD_TOUCHED':
      const currentTouchedFields =
        state.touchedFields[action.payload.step] || new Set();
      return {
        ...state,
        touchedFields: {
          ...state.touchedFields,
          [action.payload.step]: new Set([
            ...currentTouchedFields,
            action.payload.field,
          ]),
        },
      };

    case 'RESET_FORM':
      return initialState;

    default:
      return state;
  }
}

// Validation utilities
export const validateBasicInfo = (
  data: BasicInfoData,
  touchedFields?: Set<string>
): StepValidationResult => {
  const errors: Record<string, string> = {};

  if (touchedFields?.has('recipientName') || !touchedFields) {
    if (!data.recipientName.trim()) {
      errors.recipientName = 'Recipient name is required';
    } else if (data.recipientName.length > 255) {
      errors.recipientName = 'Recipient name must be less than 255 characters';
    }
  }

  if (touchedFields?.has('boardType') || !touchedFields) {
    if (!data.boardType) {
      errors.boardType = 'Board type is required';
    }
  }

  if (touchedFields?.has('nameType') || !touchedFields) {
    if (!data.nameType) {
      errors.nameType = 'Name type is required';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateTypeConfig = (
  data: TypeConfigData,
  boardType: BasicInfoData['boardType'],
  touchedFields?: Set<string>
): StepValidationResult => {
  const errors: Record<string, string> = {};

  // Birthday-specific validation
  if (boardType === 'birthday') {
    if (
      (touchedFields?.has('birthdayDate') || !touchedFields) &&
      data.birthdayDate &&
      isNaN(Date.parse(data.birthdayDate))
    ) {
      errors.birthdayDate = 'Please enter a valid date';
    }
  }

  // Farewell-specific validation
  if (boardType === 'farewell') {
    if (
      (touchedFields?.has('lastWorkingDay') || !touchedFields) &&
      data.lastWorkingDay &&
      isNaN(Date.parse(data.lastWorkingDay))
    ) {
      errors.lastWorkingDay = 'Please enter a valid date';
    }
  }

  // General validation
  if (
    (touchedFields?.has('customMessage') || !touchedFields) &&
    data.customMessage &&
    data.customMessage.length > 500
  ) {
    errors.customMessage = 'Custom message must be less than 500 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateBoardConfig = (
  data: BoardConfigData,
  touchedFields?: Set<string>
): StepValidationResult => {
  const errors: Record<string, string> = {};

  if (touchedFields?.has('postingMode') || !touchedFields) {
    if (!data.postingMode) {
      errors.postingMode = 'Posting mode is required';
    }
  }

  if (
    (touchedFields?.has('maxPostsPerUser') || !touchedFields) &&
    data.postingMode === 'multiple' &&
    data.maxPostsPerUser
  ) {
    if (data.maxPostsPerUser < 1 || data.maxPostsPerUser > 50) {
      errors.maxPostsPerUser = 'Max posts per user must be between 1 and 50';
    }
  }

  if (touchedFields?.has('boardVisibility') || !touchedFields) {
    if (!data.boardVisibility) {
      errors.boardVisibility = 'Board visibility is required';
    }
  }

  if (
    (touchedFields?.has('expirationDate') || !touchedFields) &&
    data.expirationDate &&
    isNaN(Date.parse(data.expirationDate))
  ) {
    errors.expirationDate = 'Please enter a valid expiration date';
  }

  if (
    (touchedFields?.has('expirationDate') || !touchedFields) &&
    data.expirationDate &&
    new Date(data.expirationDate) <= new Date()
  ) {
    errors.expirationDate = 'Expiration date must be in the future';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Auto-generate title based on board type and recipient name
export const generateTitle = (
  boardType: BasicInfoData['boardType'],
  recipientName: string,
  nameType: BasicInfoData['nameType']
): string => {
  if (!recipientName.trim()) return '';

  const name =
    nameType === 'first-name' ? recipientName.split(' ')[0] : recipientName;

  switch (boardType) {
    case 'appreciation':
      return `Appreciation Board for ${name}`;
    case 'birthday':
      return `Happy Birthday ${name}!`;
    case 'farewell':
      return `Farewell ${name}`;
    case 'general':
    default:
      return `Board for ${name}`;
  }
};

// Custom hook for multi-step form management
export function useMultiStepForm() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  // Navigation functions
  const goToStep = useCallback((step: number) => {
    dispatch({ type: 'SET_STEP', payload: step });
  }, []);

  const nextStep = useCallback(() => {
    dispatch({ type: 'NEXT_STEP' });
  }, []);

  const prevStep = useCallback(() => {
    dispatch({ type: 'PREV_STEP' });
  }, []);

  // Data update functions
  const updateBasicInfo = useCallback(
    (data: Partial<BasicInfoData>) => {
      dispatch({
        type: 'UPDATE_STEP_DATA',
        payload: { step: 'basicInfo', data },
      });

      // Auto-generate title if recipient name or board type changes
      if (
        data.recipientName !== undefined ||
        data.boardType !== undefined ||
        data.nameType !== undefined
      ) {
        const currentData = { ...state.stepData.basicInfo, ...data };
        const autoTitle = generateTitle(
          currentData.boardType,
          currentData.recipientName,
          currentData.nameType
        );
        if (
          !currentData.title ||
          currentData.title ===
            generateTitle(
              state.stepData.basicInfo.boardType,
              state.stepData.basicInfo.recipientName,
              state.stepData.basicInfo.nameType
            )
        ) {
          dispatch({
            type: 'UPDATE_STEP_DATA',
            payload: { step: 'basicInfo', data: { title: autoTitle } },
          });
        }
      }
    },
    [state.stepData.basicInfo]
  );

  const updateTypeConfig = useCallback((data: Partial<TypeConfigData>) => {
    dispatch({
      type: 'UPDATE_STEP_DATA',
      payload: { step: 'typeConfig', data },
    });
  }, []);

  const updateBoardConfig = useCallback((data: Partial<BoardConfigData>) => {
    dispatch({
      type: 'UPDATE_STEP_DATA',
      payload: { step: 'boardConfig', data },
    });
  }, []);

  // Validation functions
  const validateCurrentStep = useCallback(() => {
    let result: StepValidationResult;
    const touchedFields = state.touchedFields[state.currentStep];

    switch (state.currentStep) {
      case 0:
        result = validateBasicInfo(state.stepData.basicInfo, touchedFields);
        break;
      case 1:
        result = validateTypeConfig(
          state.stepData.typeConfig,
          state.stepData.basicInfo.boardType,
          touchedFields
        );
        break;
      case 2:
        result = validateBoardConfig(state.stepData.boardConfig, touchedFields);
        break;
      default:
        result = { isValid: false, errors: {} };
    }

    dispatch({
      type: 'SET_STEP_VALIDATION',
      payload: { step: state.currentStep, isValid: result.isValid },
    });
    dispatch({
      type: 'SET_STEP_ERRORS',
      payload: { step: state.currentStep, errors: result.errors },
    });

    return result;
  }, [state.currentStep, state.stepData, state.touchedFields]);

  const validateAllSteps = useCallback(() => {
    // For final validation, validate all fields regardless of touched state
    const basicInfoResult = validateBasicInfo(state.stepData.basicInfo);
    const typeConfigResult = validateTypeConfig(
      state.stepData.typeConfig,
      state.stepData.basicInfo.boardType
    );
    const boardConfigResult = validateBoardConfig(state.stepData.boardConfig);

    dispatch({
      type: 'SET_STEP_VALIDATION',
      payload: { step: 0, isValid: basicInfoResult.isValid },
    });
    dispatch({
      type: 'SET_STEP_ERRORS',
      payload: { step: 0, errors: basicInfoResult.errors },
    });

    dispatch({
      type: 'SET_STEP_VALIDATION',
      payload: { step: 1, isValid: typeConfigResult.isValid },
    });
    dispatch({
      type: 'SET_STEP_ERRORS',
      payload: { step: 1, errors: typeConfigResult.errors },
    });

    dispatch({
      type: 'SET_STEP_VALIDATION',
      payload: { step: 2, isValid: boardConfigResult.isValid },
    });
    dispatch({
      type: 'SET_STEP_ERRORS',
      payload: { step: 2, errors: boardConfigResult.errors },
    });

    return (
      basicInfoResult.isValid &&
      typeConfigResult.isValid &&
      boardConfigResult.isValid
    );
  }, [state.stepData]);

  // Submission functions
  const setSubmitting = useCallback((isSubmitting: boolean) => {
    dispatch({ type: 'SET_SUBMITTING', payload: isSubmitting });
  }, []);

  const setSubmitError = useCallback((error: string | null) => {
    dispatch({ type: 'SET_SUBMIT_ERROR', payload: error });
  }, []);

  const resetForm = useCallback(() => {
    dispatch({ type: 'RESET_FORM' });
  }, []);

  const markFieldTouched = useCallback((step: number, field: string) => {
    dispatch({ type: 'MARK_FIELD_TOUCHED', payload: { step, field } });
  }, []);

  // Computed values
  const canGoNext = useMemo(() => {
    return (
      state.stepValidation[state.currentStep] === true && state.currentStep < 2
    );
  }, [state.stepValidation, state.currentStep]);

  const canGoBack = useMemo(() => {
    return state.currentStep > 0;
  }, [state.currentStep]);

  const isLastStep = useMemo(() => {
    return state.currentStep === 2;
  }, [state.currentStep]);

  const currentStepErrors = useMemo(() => {
    return state.stepErrors[state.currentStep] || {};
  }, [state.stepErrors, state.currentStep]);

  return {
    // State
    currentStep: state.currentStep,
    stepData: state.stepData,
    isSubmitting: state.isSubmitting,
    submitError: state.submitError,
    completedSteps: state.completedSteps,
    currentStepErrors,
    touchedFields: state.touchedFields,

    // Navigation
    goToStep,
    nextStep,
    prevStep,
    canGoNext,
    canGoBack,
    isLastStep,

    // Data updates
    updateBasicInfo,
    updateTypeConfig,
    updateBoardConfig,

    // Validation
    validateCurrentStep,
    validateAllSteps,
    markFieldTouched,

    // Submission
    setSubmitting,
    setSubmitError,
    resetForm,
  };
}
