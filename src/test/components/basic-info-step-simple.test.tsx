/**
 * @vitest-environment jsdom
 */

import { BasicInfoStep } from '@/components/boards/basic-info-step';
import { BasicInfoData } from '@/types/multi-step-form';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('BasicInfoStep - Core Functionality', () => {
  const mockOnChange = vi.fn();
  const mockOnValidationChange = vi.fn();

  const defaultData: BasicInfoData = {
    boardType: 'general',
    recipientName: '',
    nameType: 'full-name',
    title: '',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(
      <BasicInfoStep
        data={defaultData}
        onChange={mockOnChange}
        onValidationChange={mockOnValidationChange}
        errors={{}}
      />
    );

    expect(
      screen.getByText('What type of board are you creating?')
    ).toBeInTheDocument();
  });

  it('displays all board type options', () => {
    render(
      <BasicInfoStep
        data={defaultData}
        onChange={mockOnChange}
        onValidationChange={mockOnValidationChange}
        errors={{}}
      />
    );

    expect(screen.getByText('Appreciation Board')).toBeInTheDocument();
    expect(screen.getByText('Birthday Board')).toBeInTheDocument();
    expect(screen.getByText('Farewell Board')).toBeInTheDocument();
    expect(screen.getByText('General Board')).toBeInTheDocument();
  });

  it('calls onChange when board type is selected', () => {
    render(
      <BasicInfoStep
        data={defaultData}
        onChange={mockOnChange}
        onValidationChange={mockOnValidationChange}
        errors={{}}
      />
    );

    fireEvent.click(screen.getByText('Appreciation Board'));

    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        boardType: 'appreciation',
      })
    );
  });

  it('shows recipient name input', () => {
    render(
      <BasicInfoStep
        data={defaultData}
        onChange={mockOnChange}
        onValidationChange={mockOnValidationChange}
        errors={{}}
      />
    );

    expect(screen.getByLabelText('Who is this board for?')).toBeInTheDocument();
  });

  it('calls onChange when recipient name is entered', () => {
    render(
      <BasicInfoStep
        data={defaultData}
        onChange={mockOnChange}
        onValidationChange={mockOnValidationChange}
        errors={{}}
      />
    );

    const nameInput = screen.getByLabelText('Who is this board for?');
    fireEvent.change(nameInput, { target: { value: 'John Smith' } });

    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        recipientName: 'John Smith',
      })
    );
  });
});
