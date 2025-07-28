import { NavigationControls } from '@/components/boards/navigation-controls';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('NavigationControls', () => {
  const defaultProps = {
    currentStep: 0,
    totalSteps: 3,
    canGoNext: true,
    canGoBack: false,
    isSubmitting: false,
    onNext: vi.fn(),
    onBack: vi.fn(),
    onSubmit: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Button Display Logic', () => {
    it('should not show Back button on first step', () => {
      render(
        <NavigationControls
          {...defaultProps}
          currentStep={0}
          canGoBack={false}
        />
      );

      expect(screen.queryByText('Back')).not.toBeInTheDocument();
      expect(screen.getByText('Next')).toBeInTheDocument();
    });

    it('should show Back button on middle steps', () => {
      render(
        <NavigationControls
          {...defaultProps}
          currentStep={1}
          canGoBack={true}
        />
      );

      expect(screen.getByText('Back')).toBeInTheDocument();
      expect(screen.getByText('Next')).toBeInTheDocument();
    });

    it('should show Create Board button on last step', () => {
      render(
        <NavigationControls
          {...defaultProps}
          currentStep={2}
          canGoBack={true}
        />
      );

      expect(screen.getByText('Back')).toBeInTheDocument();
      expect(screen.getByText('Create Board')).toBeInTheDocument();
      expect(screen.queryByText('Next')).not.toBeInTheDocument();
    });
  });

  describe('Navigation Functionality', () => {
    it('should call onNext when Next button is clicked', async () => {
      const user = userEvent.setup();
      const onNext = vi.fn();

      render(
        <NavigationControls
          {...defaultProps}
          onNext={onNext}
          canGoNext={true}
        />
      );

      await user.click(screen.getByText('Next'));
      expect(onNext).toHaveBeenCalledTimes(1);
    });

    it('should call onBack when Back button is clicked', async () => {
      const user = userEvent.setup();
      const onBack = vi.fn();

      render(
        <NavigationControls
          {...defaultProps}
          currentStep={1}
          canGoBack={true}
          onBack={onBack}
        />
      );

      await user.click(screen.getByText('Back'));
      expect(onBack).toHaveBeenCalledTimes(1);
    });

    it('should call onSubmit when Create Board button is clicked', async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();

      render(
        <NavigationControls
          {...defaultProps}
          currentStep={2}
          canGoBack={true}
          onSubmit={onSubmit}
        />
      );

      await user.click(screen.getByText('Create Board'));
      expect(onSubmit).toHaveBeenCalledTimes(1);
    });
  });

  describe('Step Validation', () => {
    it('should disable Next button when canGoNext is false', () => {
      render(<NavigationControls {...defaultProps} canGoNext={false} />);

      const nextButton = screen.getByText('Next');
      expect(nextButton).toBeDisabled();
    });

    it('should enable Next button when canGoNext is true', () => {
      render(<NavigationControls {...defaultProps} canGoNext={true} />);

      const nextButton = screen.getByText('Next');
      expect(nextButton).not.toBeDisabled();
    });

    it('should disable Create Board button when canGoNext is false on last step', () => {
      render(
        <NavigationControls
          {...defaultProps}
          currentStep={2}
          canGoNext={false}
        />
      );

      const createButton = screen.getByText('Create Board');
      expect(createButton).toBeDisabled();
    });

    it('should not call onNext when Next button is disabled and clicked', async () => {
      const user = userEvent.setup();
      const onNext = vi.fn();

      render(
        <NavigationControls
          {...defaultProps}
          onNext={onNext}
          canGoNext={false}
        />
      );

      const nextButton = screen.getByText('Next');
      await user.click(nextButton);
      expect(onNext).not.toHaveBeenCalled();
    });
  });

  describe('Loading States', () => {
    it('should show loading state on Create Board button when submitting', () => {
      render(
        <NavigationControls
          {...defaultProps}
          currentStep={2}
          isSubmitting={true}
        />
      );

      expect(screen.getByText('Creating Board...')).toBeInTheDocument();
    });

    it('should disable all buttons when submitting', () => {
      render(
        <NavigationControls
          {...defaultProps}
          currentStep={1}
          canGoBack={true}
          isSubmitting={true}
        />
      );

      const backButton = screen.getByText('Back');
      const nextButton = screen.getByText('Next');

      expect(backButton).toBeDisabled();
      expect(nextButton).toBeDisabled();
    });

    it('should not call navigation functions when submitting', async () => {
      const user = userEvent.setup();
      const onNext = vi.fn();
      const onBack = vi.fn();

      render(
        <NavigationControls
          {...defaultProps}
          currentStep={1}
          canGoBack={true}
          isSubmitting={true}
          onNext={onNext}
          onBack={onBack}
        />
      );

      await user.click(screen.getByText('Back'));
      await user.click(screen.getByText('Next'));

      expect(onNext).not.toHaveBeenCalled();
      expect(onBack).not.toHaveBeenCalled();
    });
  });

  describe('Form State Management', () => {
    it('should handle step transitions correctly', () => {
      const { rerender } = render(
        <NavigationControls {...defaultProps} currentStep={0} />
      );

      // First step - no back button, next button present
      expect(screen.queryByText('Back')).not.toBeInTheDocument();
      expect(screen.getByText('Next')).toBeInTheDocument();

      // Middle step - both buttons present
      rerender(
        <NavigationControls
          {...defaultProps}
          currentStep={1}
          canGoBack={true}
        />
      );
      expect(screen.getByText('Back')).toBeInTheDocument();
      expect(screen.getByText('Next')).toBeInTheDocument();

      // Last step - back button and create button
      rerender(
        <NavigationControls
          {...defaultProps}
          currentStep={2}
          canGoBack={true}
        />
      );
      expect(screen.getByText('Back')).toBeInTheDocument();
      expect(screen.getByText('Create Board')).toBeInTheDocument();
    });

    it('should preserve button states during re-renders', () => {
      const { rerender } = render(
        <NavigationControls {...defaultProps} canGoNext={false} />
      );

      expect(screen.getByText('Next')).toBeDisabled();

      rerender(
        <NavigationControls
          {...defaultProps}
          canGoNext={false}
          isSubmitting={true}
        />
      );
      expect(screen.getByText('Next')).toBeDisabled();
    });
  });

  describe('Accessibility', () => {
    it('should have proper button types', () => {
      render(
        <NavigationControls
          {...defaultProps}
          currentStep={1}
          canGoBack={true}
        />
      );

      const backButton = screen.getByText('Back');
      const nextButton = screen.getByText('Next');

      expect(backButton).toHaveAttribute('type', 'button');
      expect(nextButton).toHaveAttribute('type', 'button');
    });

    it('should have proper button types on last step', () => {
      render(
        <NavigationControls
          {...defaultProps}
          currentStep={2}
          canGoBack={true}
        />
      );

      const backButton = screen.getByText('Back');
      const createButton = screen.getByText('Create Board');

      expect(backButton).toHaveAttribute('type', 'button');
      expect(createButton).toHaveAttribute('type', 'button');
    });

    it('should have proper ARIA attributes for disabled buttons', () => {
      render(<NavigationControls {...defaultProps} canGoNext={false} />);

      const nextButton = screen.getByText('Next');
      expect(nextButton).toHaveAttribute('disabled');
    });
  });

  describe('Edge Cases', () => {
    it('should handle single step form', () => {
      render(
        <NavigationControls {...defaultProps} totalSteps={1} currentStep={0} />
      );

      expect(screen.queryByText('Back')).not.toBeInTheDocument();
      expect(screen.getByText('Create Board')).toBeInTheDocument();
      expect(screen.queryByText('Next')).not.toBeInTheDocument();
    });

    it('should handle zero-based step indexing correctly', () => {
      // Step 0 of 3 total steps (0, 1, 2)
      render(
        <NavigationControls {...defaultProps} currentStep={0} totalSteps={3} />
      );
      expect(screen.getByText('Next')).toBeInTheDocument();

      // Step 2 of 3 total steps (last step)
      render(
        <NavigationControls {...defaultProps} currentStep={2} totalSteps={3} />
      );
      expect(screen.getByText('Create Board')).toBeInTheDocument();
    });
  });
});
