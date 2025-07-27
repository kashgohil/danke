import { StepIndicator } from '@/components/ui/step-indicator';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('StepIndicator', () => {
  const defaultProps = {
    currentStep: 2,
    totalSteps: 3,
    stepLabels: ['Basic Info', 'Configuration', 'Review'],
    completedSteps: [1],
  };

  it('renders all steps with correct labels', () => {
    render(<StepIndicator {...defaultProps} />);

    expect(screen.getByText('Basic Info')).toBeInTheDocument();
    expect(screen.getByText('Configuration')).toBeInTheDocument();
    expect(screen.getByText('Review')).toBeInTheDocument();
  });

  it('shows step numbers correctly', () => {
    render(<StepIndicator {...defaultProps} />);

    // Current step should show number 2
    expect(screen.getByText('2')).toBeInTheDocument();
    // Upcoming step should show number 3
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('highlights current step correctly', () => {
    render(<StepIndicator {...defaultProps} />);

    // Current step should have aria-current="step"
    const currentStepElement = screen.getByText('2').closest('div');
    expect(currentStepElement).toHaveAttribute('aria-current', 'step');
  });

  it('provides screen reader information', () => {
    render(<StepIndicator {...defaultProps} />);

    expect(screen.getByText(/Step 2 of 3: Configuration/)).toBeInTheDocument();
    expect(screen.getByText(/1 steps completed/)).toBeInTheDocument();
  });

  it('handles edge case with no completed steps', () => {
    render(
      <StepIndicator {...defaultProps} currentStep={1} completedSteps={[]} />
    );

    expect(screen.getByText(/Step 1 of 3: Basic Info/)).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <StepIndicator {...defaultProps} className="custom-class" />
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('uses fallback labels when stepLabels are insufficient', () => {
    render(
      <StepIndicator
        currentStep={1}
        totalSteps={3}
        stepLabels={['Basic Info']} // Only one label for 3 steps
        completedSteps={[]}
      />
    );

    expect(screen.getByText('Basic Info')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByText('Step 3')).toBeInTheDocument();
  });
});
