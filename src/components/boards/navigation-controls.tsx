'use client';

import { Button } from '@/components/ui/button';
import { LoadingButton } from '@/components/ui/loading-states';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

export interface NavigationControlsProps {
  currentStep: number;
  totalSteps: number;
  canGoNext: boolean;
  canGoBack: boolean;
  isSubmitting: boolean;
  onNext: () => void;
  onBack: () => void;
  onSubmit: () => void;
}

export function NavigationControls({
  currentStep,
  totalSteps,
  canGoNext,
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
    <div className="flex items-center justify-between pt-6 border-t border-border">
      <div className="flex-1">
        {canGoBack && (
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            disabled={isSubmitting}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        )}
      </div>

      <div className="flex-1 flex justify-end">
        {isLastStep ? (
          <LoadingButton
            type="button"
            onClick={handleSubmit}
            loading={isSubmitting}
            loadingText="Creating Board..."
            disabled={!canGoNext}
            className="flex items-center gap-2"
            size="lg"
          >
            <Check className="w-4 h-4" />
            Create Board
          </LoadingButton>
        ) : (
          <Button
            type="button"
            onClick={handleNext}
            disabled={!canGoNext || isSubmitting}
            className="flex items-center gap-2"
            size="lg"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
