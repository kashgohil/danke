'use client';

import { BasicInfoStep } from '@/components/boards/basic-info-step';
import { BoardConfigStep } from '@/components/boards/board-config-step';
import { NavigationControls } from '@/components/boards/navigation-controls';
import { TypeConfigStep } from '@/components/boards/type-config-step';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { useMultiStepForm } from '@/hooks/use-multi-step-form';
import { apiRequest, useApiErrorHandler } from '@/lib/api-error-handler';
import { Board } from '@/lib/db';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

export function CreateBoardClient() {
  const router = useRouter();
  const { handleError } = useApiErrorHandler();

  const [isCreating, setIsCreating] = useState(false);

  const {
    currentStep,
    stepData,
    isSubmitting,
    submitError,
    errors,
    isValid,
    touchedFields,
    nextStep,
    prevStep,
    canGoNext,
    canGoBack,
    updateBasicInfo,
    updateTypeConfig,
    updateBoardConfig,
    validateAllSteps,
    setSubmitting,
    setSubmitError,
  } = useMultiStepForm();

  const onSuccess = useCallback((board: Board) => {
    setIsCreating(false);
    // Navigate to the board management page
    router.push(`/boards/${board.id}/manage`);
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      setSubmitting(true);
      setSubmitError(null);
      setIsCreating(true);

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

      const result = await apiRequest('/api/boards', {
        method: 'POST',
        body: JSON.stringify(submissionData),
      });

      const board = result.data;

      if (!board) {
        throw new Error('No board data received from server');
      }

      onSuccess(board);
    } catch (error) {
      const errorMessage = handleError(error);
      setSubmitError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  }, [stepData, validateAllSteps, setSubmitting, setSubmitError, onSuccess]);

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <BasicInfoStep
            data={stepData.basicInfo as any}
            onChange={updateBasicInfo}
            errors={errors.basicInfo}
            touchedFields={touchedFields.basicInfo}
          />
        );
      case 1:
        return (
          <TypeConfigStep
            boardType={stepData.basicInfo.boardType as any}
            data={stepData.typeConfig as any}
            onChange={updateTypeConfig}
            errors={errors.typeConfig}
            touchedFields={touchedFields.typeConfig}
          />
        );
      case 2:
        return (
          <BoardConfigStep
            data={stepData.boardConfig as any}
            onChange={updateBoardConfig}
            errors={errors.boardConfig}
            touchedFields={touchedFields.boardConfig}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        console.error('MultiStepBoardCreationForm error:', error, errorInfo);
      }}
    >
      <div className="w-full">
        <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-danke-900">
              Create Your Board
            </h1>
            <p className="text-sm sm:text-base text-danke-900">
              Follow these steps to create a personalized board for your
              occasion
            </p>
          </div>

          <div className="p-6 sm:p-8 lg:p-12 flex flex-col bg-background/80 backdrop-blur-sm rounded-lg gap-6 sm:gap-8">
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
                    <p className="mt-1 text-sm text-destructive/80">
                      {submitError}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSubmitError(null)}
                    className="flex-shrink-0 text-destructive/60 hover:text-destructive"
                  >
                    <span className="sr-only">Dismiss</span>
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
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

            {renderStepContent()}

            <NavigationControls
              currentStep={currentStep}
              totalSteps={3}
              isValid={isValid}
              canGoNext={canGoNext}
              canGoBack={canGoBack}
              isSubmitting={isSubmitting}
              onNext={nextStep}
              onBack={prevStep}
              onSubmit={handleSubmit}
            />

            <div className="text-center pt-4">
              <button
                type="button"
                onClick={() => router.push('/')}
                disabled={isSubmitting}
                className="text-sm text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="hidden sm:inline">
                  Cancel and return to dashboard
                </span>
                <span className="sm:hidden">Cancel</span>
              </button>
            </div>
          </div>
        </div>
        {isCreating && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-card border border-border rounded-lg p-6 shadow-lg max-w-sm mx-4">
              <div className="flex items-center space-x-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                <div>
                  <h3 className="font-semibold">Creating Your Board</h3>
                  <p className="text-sm text-muted-foreground">
                    Please wait while we set up your board...
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}
