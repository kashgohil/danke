'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StepIndicator } from '@/components/ui/step-indicator';
import { useState } from 'react';

export default function DemoStepIndicatorPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const stepLabels = ['Basic Info', 'Configuration', 'Review & Submit'];
  const totalSteps = 3;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCompletedSteps((prev) => [...prev, currentStep]);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCompletedSteps((prev) =>
        prev.filter((step) => step !== currentStep - 1)
      );
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setCompletedSteps([]);
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Step Indicator Component Demo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Step Indicator */}
          <StepIndicator
            currentStep={currentStep}
            totalSteps={totalSteps}
            stepLabels={stepLabels}
            completedSteps={completedSteps}
          />

          {/* Current Step Content */}
          <div className="bg-muted/50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">
              Step {currentStep}: {stepLabels[currentStep - 1]}
            </h3>
            <p className="text-muted-foreground">
              This is the content for{' '}
              {stepLabels[currentStep - 1].toLowerCase()}. Use the navigation
              buttons below to test the step indicator.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              Back
            </Button>

            <Button variant="outline" onClick={handleReset}>
              Reset
            </Button>

            <Button onClick={handleNext} disabled={currentStep === totalSteps}>
              {currentStep === totalSteps ? 'Complete' : 'Next'}
            </Button>
          </div>

          {/* State Display */}
          <div className="bg-background border rounded-lg p-4">
            <h4 className="font-medium mb-2">Current State:</h4>
            <ul className="text-sm space-y-1">
              <li>Current Step: {currentStep}</li>
              <li>Total Steps: {totalSteps}</li>
              <li>Completed Steps: [{completedSteps.join(', ')}]</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
