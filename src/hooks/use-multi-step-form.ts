import {
  basicInfoStepSchema,
  boardConfigStepSchema,
  typeConfigStepSchema,
} from '@/lib/validations/board';
import {
  BasicInfoData,
  BoardConfigData,
  TypeConfigData,
} from '@/types/multi-step-form';
import { useCallback, useMemo, useState } from 'react';
import { useForm } from './use-form-validation';

// Auto-generate title based on board type and recipient name
export const generateTitle = (
  boardType: BasicInfoData['boardType'],
  recipientName: string
): string => {
  if (!recipientName.trim()) return '';

  const name = recipientName;

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
  const [step, setStep] = useState<number>(0);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Form validation hooks for each step
  const basicInfoValidation = useForm({
    schema: basicInfoStepSchema,
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const typeConfigValidation = useForm({
    schema: typeConfigStepSchema,
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const boardConfigValidation = useForm({
    schema: boardConfigStepSchema,
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const isValid = useMemo(() => {
    switch (step) {
      case 0:
        return basicInfoValidation.isValid;
      case 1:
        return typeConfigValidation.isValid;
      case 2:
        return boardConfigValidation.isValid;
      default:
        return true;
    }
  }, [step, basicInfoValidation, typeConfigValidation, boardConfigValidation]);

  const { errors, stepData, touchedFields } = useMemo(
    () => ({
      errors: {
        basicInfo: basicInfoValidation.errors,
        typeConfig: typeConfigValidation.errors,
        boardConfig: boardConfigValidation.errors,
      },
      stepData: {
        basicInfo: basicInfoValidation.values,
        typeConfig: typeConfigValidation.values,
        boardConfig: boardConfigValidation.values,
      },
      touchedFields: {
        basicInfo: basicInfoValidation.touchedFields,
        typeConfig: typeConfigValidation.touchedFields,
        boardConfig: boardConfigValidation.touchedFields,
      },
    }),
    [basicInfoValidation, typeConfigValidation, boardConfigValidation]
  );

  const updateBasicInfo = useCallback(
    (data: Partial<BasicInfoData>) => {
      let updatedData = { ...basicInfoValidation.values, ...data };

      if (data.recipientName !== undefined || data.boardType !== undefined) {
        const autoTitle = generateTitle(
          updatedData.boardType!,
          updatedData.recipientName!
        );
        if (
          !updatedData.title ||
          updatedData.title ===
            generateTitle(
              basicInfoValidation.values.boardType!,
              basicInfoValidation.values.recipientName!
            )
        ) {
          updatedData = { ...updatedData, title: autoTitle };
        }
      }
      basicInfoValidation.setValues(updatedData);
    },
    [basicInfoValidation.values]
  );

  const updateTypeConfig = useCallback(
    (data: Partial<TypeConfigData>) => {
      const updatedData = { ...typeConfigValidation.values, ...data };
      typeConfigValidation.setValues(updatedData);
    },
    [typeConfigValidation.values]
  );

  const updateBoardConfig = useCallback(
    (data: Partial<BoardConfigData>) => {
      const updatedData = { ...boardConfigValidation.values, ...data };
      boardConfigValidation.setValues(updatedData);
    },
    [boardConfigValidation.values]
  );

  const validateAllSteps = useCallback(() => {
    return (
      basicInfoValidation.validateAll() &&
      typeConfigValidation.validateAll() &&
      boardConfigValidation.validateAll()
    );
  }, [basicInfoValidation, typeConfigValidation, boardConfigValidation]);

  const getFieldProps = useCallback(
    (field: string) => {
      switch (step) {
        case 0:
          return basicInfoValidation.getFieldProps(
            field as keyof BasicInfoData
          );
        case 1:
          return typeConfigValidation.getFieldProps(
            field as keyof TypeConfigData
          );
        case 2:
          return boardConfigValidation.getFieldProps(
            field as keyof BoardConfigData
          );
        default:
          return {
            value: '',
            onChange: () => {},
            onBlur: () => {},
            error: false,
            helperText: '',
          };
      }
    },
    [step, basicInfoValidation, typeConfigValidation, boardConfigValidation]
  );

  return {
    stepData,
    touchedFields,
    currentStep: step,
    isSubmitting: submitting,
    submitError: submitError,
    completedSteps: step,
    errors,

    goToStep: setStep,
    nextStep: () => setStep((step) => Math.min(step + 1, 2)),
    prevStep: () => setStep((step) => Math.max(step - 1, 0)),
    isValid,
    canGoNext: step < 3,
    canGoBack: step > 0,
    isLastStep: step === 2,

    updateBasicInfo,
    updateTypeConfig,
    updateBoardConfig,

    validateAllSteps,
    getFieldProps,

    basicInfoValidation,
    typeConfigValidation,
    boardConfigValidation,

    setSubmitting,
    setSubmitError,
  };
}
