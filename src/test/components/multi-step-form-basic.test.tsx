import { MultiStepBoardCreationForm } from '@/components/boards/board-creation-form';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

// Mock the router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

// Mock fetch
global.fetch = vi.fn();

describe('MultiStepBoardCreationForm Basic Rendering', () => {
  it('renders the form without crashing', () => {
    render(<MultiStepBoardCreationForm />);

    // Check if the main heading is present
    expect(screen.getByText('Create Your Board')).toBeInTheDocument();
  });

  it('shows the step indicator', () => {
    render(<MultiStepBoardCreationForm />);

    // Check if step indicator is present (looking for step labels)
    expect(screen.getByText('Basic Info')).toBeInTheDocument();
    expect(screen.getByText('Board Settings')).toBeInTheDocument();
    expect(screen.getByText('Configuration')).toBeInTheDocument();
  });

  it('shows the first step content', () => {
    render(<MultiStepBoardCreationForm />);

    // Check if first step content is visible
    expect(
      screen.getByText('What type of board are you creating?')
    ).toBeInTheDocument();
  });
});
