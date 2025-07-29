'use client';

import { ErrorBoundary } from '@/components/ui/error-boundary';
import { StepIndicator } from '@/components/ui/step-indicator';
import { useMultiStepForm } from '@/hooks/use-multi-step-form';
import { Board } from '@/lib/db';
import { useCallback, useEffect } from 'react';
import { BasicInfoStep } from './basic-info-step';
import { BoardConfigStep } from './board-config-step';
import { NavigationControls } from './navigation-controls';
import { TypeConfigStep } from './type-config-step';

interface MultiStepBoardCreationFormProps {
  onSuccess?: (board: Board) => void;
  onCancel?: () => void;
}

const STEP_LABELS = ['Basic Info', 'Board Settings', 'Configuration'];

function MultiStepBoardCreationFormContent({
  onSuccess,
  onCancel,
}: MultiStepBoardCreationFormProps) {
  const {
    currentStep,
    stepData,
    isSubmitting,
    submitError,
    completedSteps,
    currentStepErrors,
    nextStep,
    prevStep,
    canGoNext,
    canGoBack,
    updateBasicInfo,
    updateTypeConfig,
    updateBoardConfig,
    validateCurrentStep,
    validateAllSteps,
    setSubmitting,
    setSubmitError,
  } = useMultiStepForm();

  // Validate current step whenever step data changes
  useEffect(() => {
    validateCurrentStep();
  }, [validateCurrentStep]);

  // Handle step navigation
  const handleNext = useCallback(() => {
    const validation = validateCurrentStep();
    if (validation.isValid) {
      nextStep();
    }
  }, [validateCurrentStep, nextStep]);

  const handleBack = useCallback(() => {
    prevStep();
  }, [prevStep]);

  const handleSubmit = useCallback(async () => {
    try {
      setSubmitting(true);
      setSubmitError(null);

      const isValid = validateAllSteps();
      if (!isValid) {
        setSubmitError('Please fix all validation errors before submitting.');
        return;
      }

      const submissionData = {
        // Basic info
        title: stepData.basicInfo.title || '',
        recipientName: stepData.basicInfo.recipientName,
        boardType: stepData.basicInfo.boardType,
        nameType: stepData.basicInfo.nameType,

        // Board configuration
        postingMode: stepData.boardConfig.postingMode,
        moderationEnabled: stepData.boardConfig.moderationEnabled,
        allowAnonymous: stepData.boardConfig.allowAnonymous,
        maxPostsPerUser:
          stepData.boardConfig.maxPostsPerUser?.toString() || null,
        boardVisibility: stepData.boardConfig.boardVisibility,
        expirationDate: stepData.boardConfig.expirationDate
          ? stepData.boardConfig.expirationDate
          : undefined,

        // Type-specific configuration
        typeConfig: stepData.typeConfig as Record<string, unknown>,
      };

      const response = await fetch('/api/boards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || `HTTP ${response.status}: ${response.statusText}`
        );
      }

      const result = await response.json();
      const board = result.board;

      if (!board) {
        throw new Error('No board data received from server');
      }

      onSuccess?.(board);
    } catch (error) {
      console.error('Error creating board:', error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred while creating the board.';
      setSubmitError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  }, [stepData, validateAllSteps, setSubmitting, setSubmitError, onSuccess]);

  const handleBasicInfoValidationChange = useCallback((isValid: boolean) => {},
  []);

  const handleTypeConfigValidationChange = useCallback((isValid: boolean) => {},
  []);

  const handleBoardConfigValidationChange = useCallback(
    (isValid: boolean) => {},
    []
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <BasicInfoStep
            data={stepData.basicInfo}
            onChange={updateBasicInfo}
            onValidationChange={handleBasicInfoValidationChange}
            errors={currentStepErrors}
          />
        );
      case 1:
        return (
          <TypeConfigStep
            boardType={stepData.basicInfo.boardType}
            data={stepData.typeConfig}
            onChange={updateTypeConfig}
            onValidationChange={handleTypeConfigValidationChange}
            errors={currentStepErrors}
          />
        );
      case 2:
        return (
          <BoardConfigStep
            data={stepData.boardConfig}
            onChange={updateBoardConfig}
            onValidationChange={handleBoardConfigValidationChange}
            errors={currentStepErrors}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-danke-900 dark:text-danke-900">
          Create Your Board
        </h1>
        <p className="text-danke-900 dark:text-danke-900">
          Follow these steps to create a personalized board for your occasion
        </p>
      </div>

      <StepIndicator
        currentStep={currentStep + 1}
        totalSteps={3}
        stepLabels={STEP_LABELS}
        completedSteps={Array.from(completedSteps).map((step) => step + 1)}
        className="mb-8"
      />

      {submitError && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-destructive"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-destructive">
                Error Creating Board
              </h3>
              <p className="mt-1 text-sm text-destructive/80">{submitError}</p>
            </div>
            <button
              type="button"
              onClick={() => setSubmitError(null)}
              className="flex-shrink-0 text-destructive/60 hover:text-destructive"
            >
              <span className="sr-only">Dismiss</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className="bg-card border border-border rounded-lg p-6">
        {renderStepContent()}
      </div>

      <NavigationControls
        currentStep={currentStep}
        totalSteps={3}
        canGoNext={canGoNext}
        canGoBack={canGoBack}
        isSubmitting={isSubmitting}
        onNext={handleNext}
        onBack={handleBack}
        onSubmit={handleSubmit}
      />

      {onCancel && (
        <div className="text-center pt-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="text-sm text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel and return to dashboard
          </button>
        </div>
      )}
    </div>
  );
}

export function MultiStepBoardCreationForm(
  props: MultiStepBoardCreationFormProps
) {
  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        console.error('MultiStepBoardCreationForm error:', error, errorInfo);
      }}
    >
      <MultiStepBoardCreationFormContent {...props} />
    </ErrorBoundary>
  );
}
