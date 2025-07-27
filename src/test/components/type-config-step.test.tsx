/**
 * @vitest-environment jsdom
 */

import { TypeConfigStep } from '@/components/boards/type-config-step';
import { TypeConfigData } from '@/types/multi-step-form';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('TypeConfigStep', () => {
  const mockOnChange = vi.fn();
  const mockOnValidationChange = vi.fn();

  const defaultProps = {
    boardType: 'general' as const,
    data: {} as TypeConfigData,
    onChange: mockOnChange,
    onValidationChange: mockOnValidationChange,
    errors: {},
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders general configuration for general board type', () => {
    render(<TypeConfigStep {...defaultProps} />);

    expect(screen.getByText('Board Settings')).toBeInTheDocument();
    expect(screen.getByText('Custom Message (Optional)')).toBeInTheDocument();
    expect(screen.getByText('Background Color (Optional)')).toBeInTheDocument();
  });

  it('renders appreciation-specific configuration for appreciation board type', () => {
    render(<TypeConfigStep {...defaultProps} boardType="appreciation" />);

    expect(screen.getByText('Appreciation Board Settings')).toBeInTheDocument();
    expect(
      screen.getByText('Choose the theme for your appreciation board')
    ).toBeInTheDocument();
    expect(screen.getByText('Professional')).toBeInTheDocument();
    expect(screen.getByText('Casual')).toBeInTheDocument();
    expect(screen.getByText('Celebration')).toBeInTheDocument();
  });

  it('renders birthday-specific configuration for birthday board type', () => {
    render(<TypeConfigStep {...defaultProps} boardType="birthday" />);

    expect(screen.getByText('Birthday Board Settings')).toBeInTheDocument();
    expect(screen.getByText('Birthday Date (Optional)')).toBeInTheDocument();
    expect(screen.getByText('Age Display Preference')).toBeInTheDocument();
    expect(screen.getByText('Show Age')).toBeInTheDocument();
    expect(screen.getByText('Hide Age')).toBeInTheDocument();
  });

  it('renders farewell-specific configuration for farewell board type', () => {
    render(<TypeConfigStep {...defaultProps} boardType="farewell" />);

    expect(screen.getByText('Farewell Board Settings')).toBeInTheDocument();
    expect(
      screen.getByText('What type of farewell is this?')
    ).toBeInTheDocument();
    expect(screen.getByText('Retirement')).toBeInTheDocument();
    expect(screen.getByText('New Job')).toBeInTheDocument();
    expect(screen.getByText('Last Working Day (Optional)')).toBeInTheDocument();
  });

  it('calls onChange when appreciation theme is selected', async () => {
    render(<TypeConfigStep {...defaultProps} boardType="appreciation" />);

    const professionalOption = screen
      .getByText('Professional')
      .closest('div[role="button"], div');
    fireEvent.click(professionalOption!);

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith({
        appreciationTheme: 'professional',
      });
    });
  });

  it('calls onChange when birthday date is entered', async () => {
    render(<TypeConfigStep {...defaultProps} boardType="birthday" />);

    const dateInput = screen.getByLabelText('Birthday Date (Optional)');
    fireEvent.change(dateInput, { target: { value: '2024-01-15' } });

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalled();
    });
  });

  it('calls onChange when custom message is entered', async () => {
    render(<TypeConfigStep {...defaultProps} />);

    const messageTextarea = screen.getByPlaceholderText(
      'Add a personal message or instructions for contributors...'
    );
    fireEvent.change(messageTextarea, { target: { value: 'Test message' } });

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith({
        customMessage: 'Test message',
      });
    });
  });

  it('calls onChange when background color is selected', async () => {
    render(<TypeConfigStep {...defaultProps} />);

    const blueColorOption = screen.getByText('Blue').closest('div');
    fireEvent.click(blueColorOption!);

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith({
        backgroundColor: '#3B82F6',
      });
    });
  });

  it('shows validation errors when provided', () => {
    const errors = {
      customMessage: 'Custom message too long',
      backgroundColor: 'Invalid color format',
    };

    render(<TypeConfigStep {...defaultProps} errors={errors} />);

    expect(screen.getByText('Custom message too long')).toBeInTheDocument();
    expect(screen.getByText('Invalid color format')).toBeInTheDocument();
  });

  it('calls onValidationChange when validation state changes', async () => {
    render(<TypeConfigStep {...defaultProps} />);

    // Component should call onValidationChange on mount
    await waitFor(() => {
      expect(mockOnValidationChange).toHaveBeenCalled();
    });
  });

  it('handles farewell type selection', async () => {
    render(<TypeConfigStep {...defaultProps} boardType="farewell" />);

    const retirementOption = screen
      .getByText('Retirement')
      .closest('div[role="button"], div');
    fireEvent.click(retirementOption!);

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith({
        farewellType: 'retirement',
      });
    });
  });

  it('handles age display selection for birthday boards', async () => {
    render(<TypeConfigStep {...defaultProps} boardType="birthday" />);

    const showAgeOption = screen
      .getByText('Show Age')
      .closest('div[role="button"], div');
    fireEvent.click(showAgeOption!);

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith({
        ageDisplay: 'show',
      });
    });
  });

  it('handles contributor names toggle for appreciation boards', async () => {
    render(<TypeConfigStep {...defaultProps} boardType="appreciation" />);

    const contributorNamesOption = screen
      .getByText('Show contributor names')
      .closest('div[role="button"], div');
    fireEvent.click(contributorNamesOption!);

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith({
        showContributorNames: true,
      });
    });
  });

  it('stores dates in correct format for validation', async () => {
    render(<TypeConfigStep {...defaultProps} boardType="birthday" />);

    const dateInput = screen.getByLabelText('Birthday Date (Optional)');
    fireEvent.change(dateInput, { target: { value: '2024-01-15' } });

    await waitFor(() => {
      // Should store date in YYYY-MM-DD format, not ISO string
      expect(mockOnChange).toHaveBeenCalledWith({
        birthdayDate: '2024-01-15',
      });
    });
  });

  it('handles existing ISO date strings correctly', () => {
    const propsWithISODate = {
      ...defaultProps,
      boardType: 'birthday' as const,
      data: { birthdayDate: '2024-01-15T00:00:00.000Z' },
    };

    render(<TypeConfigStep {...propsWithISODate} />);

    const dateInput = screen.getByLabelText(
      'Birthday Date (Optional)'
    ) as HTMLInputElement;
    // Should display the date in YYYY-MM-DD format
    expect(dateInput.value).toBe('2024-01-15');
  });

  it('supports keyboard navigation for appreciation theme selection', async () => {
    render(<TypeConfigStep {...defaultProps} boardType="appreciation" />);

    const professionalOption = screen
      .getByText('Professional')
      .closest('[role="button"]');
    expect(professionalOption).toBeInTheDocument();

    // Test Enter key
    fireEvent.keyDown(professionalOption!, { key: 'Enter' });
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith({
        appreciationTheme: 'professional',
      });
    });

    // Test Space key
    const casualOption = screen.getByText('Casual').closest('[role="button"]');
    fireEvent.keyDown(casualOption!, { key: ' ' });
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith({
        appreciationTheme: 'casual',
      });
    });
  });
});
