import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import * as React from 'react';

export interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
  completedSteps: number[];
  className?: string;
}

const StepIndicator = React.forwardRef<HTMLDivElement, StepIndicatorProps>(
  ({ currentStep, totalSteps, stepLabels, completedSteps, className }, ref) => {
    return (
      <nav
        ref={ref}
        className={cn('w-full', className)}
        aria-label="Progress"
        role="navigation"
      >
        <ol className="flex items-center justify-between">
          {Array.from({ length: totalSteps }, (_, index) => {
            const stepNumber = index + 1;
            const isCompleted = completedSteps.includes(stepNumber);
            const isCurrent = stepNumber === currentStep;
            const isUpcoming = stepNumber > currentStep;
            const stepLabel = stepLabels[index] || `Step ${stepNumber}`;

            return (
              <li
                key={stepNumber}
                className={cn(
                  'flex items-center',
                  index < totalSteps - 1 && 'flex-1'
                )}
              >
                <div className="flex flex-col items-center relative">
                  <div
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors',
                      {
                        // Completed step
                        'border-primary bg-primary text-primary-foreground':
                          isCompleted,
                        // Current step
                        'border-primary bg-background text-primary ring-2 ring-primary ring-offset-2 ring-offset-background':
                          isCurrent,
                        // Upcoming step
                        'border-muted bg-background text-muted-foreground':
                          isUpcoming,
                      }
                    )}
                    aria-current={isCurrent ? 'step' : undefined}
                  >
                    {isCompleted ? (
                      <Check className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <span>{stepNumber}</span>
                    )}
                  </div>

                  <span
                    className={cn(
                      'absolute -bottom-6 left-1/2 text-center -translate-x-1/2 mt-2 text-xs font-medium leading-tight',
                      'hidden sm:block sm:whitespace-nowrap sm:max-w-[80px]',
                      'md:max-w-none md:whitespace-normal',
                      {
                        'text-primary': isCurrent || isCompleted,
                        'text-muted-foreground': isUpcoming,
                      }
                    )}
                  >
                    {stepLabel}
                  </span>
                </div>

                {index < totalSteps - 1 && (
                  <div
                    className={cn(
                      'flex-1 h-0.5 mx-2 sm:mx-4 transition-colors',
                      {
                        'bg-primary':
                          stepNumber <= Math.max(...completedSteps, 0),
                        'bg-muted': stepNumber > Math.max(...completedSteps, 0),
                      }
                    )}
                    aria-hidden="true"
                  />
                )}
              </li>
            );
          })}
        </ol>

        <div className="sr-only">
          Step {currentStep} of {totalSteps}: {stepLabels[currentStep - 1]}
          {completedSteps.length > 0 && (
            <span>, {completedSteps.length} steps completed</span>
          )}
        </div>
      </nav>
    );
  }
);

StepIndicator.displayName = 'StepIndicator';

export { StepIndicator };
