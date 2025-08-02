'use client';

import { Button } from '@/components/ui/button';
import { LoadingButton } from '@/components/ui/loading-states';

export interface NavigationControlsProps {
  currentStep: number;
  totalSteps: number;
  canGoNext: boolean;
  canGoBack: boolean;
  isSubmitting: boolean;
  isValid: boolean;
  onNext: () => void;
  onBack: () => void;
  onSubmit: () => void;
}

export function NavigationControls({
  currentStep,
  totalSteps,
  canGoNext,
  isValid,
  canGoBack,
  isSubmitting,
  onNext,
  onBack,
  onSubmit,
}: NavigationControlsProps) {
  const isLastStep = currentStep === totalSteps - 1;

  const handleNext = () => {
    if (canGoNext && !isSubmitting) {
      onNext();
    }
  };

  const handleBack = () => {
    if (canGoBack && !isSubmitting) {
      onBack();
    }
  };

  const handleSubmit = () => {
    if (!isSubmitting) {
      onSubmit();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sm:gap-0">
      <div className="flex-1 order-2 sm:order-1">
        {canGoBack && (
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            Back
          </Button>
        )}
      </div>

      <div className="flex-1 flex justify-end order-1 sm:order-2">
        {isLastStep ? (
          <LoadingButton
            type="button"
            onClick={handleSubmit}
            loading={isSubmitting}
            loadingText="Creating Board..."
            disabled={!isValid || isSubmitting}
            className="w-full sm:w-auto"
          >
            <span className="hidden sm:inline">Create Board</span>
            <span className="sm:hidden">Create</span>
          </LoadingButton>
        ) : (
          <Button
            type="button"
            onClick={handleNext}
            disabled={!isValid || !canGoNext}
            className="w-full sm:w-auto"
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
