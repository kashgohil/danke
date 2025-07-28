import { MultiStepBoardCreationForm } from '@/components/boards/board-creation-form';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock the router
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock fetch
global.fetch = vi.fn();

describe('MultiStepBoardCreationForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          success: true,
          data: {
            id: 'test-board-id',
            viewToken: 'test-view-token',
            postToken: 'test-post-token',
          },
        }),
    } as Response);
  });

  it('renders form fields correctly', () => {
    render(<MultiStepBoardCreationForm />);

    expect(screen.getByLabelText(/board title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/recipient name/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /create board/i })
    ).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', async () => {
    const user = userEvent.setup();
    render(<MultiStepBoardCreationForm />);

    const submitButton = screen.getByRole('button', { name: /create board/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/title is required/i)).toBeInTheDocument();
      expect(
        screen.getByText(/recipient name is required/i)
      ).toBeInTheDocument();
    });
  });

  it('submits form with valid data', async () => {
    const user = userEvent.setup();
    render(<MultiStepBoardCreationForm />);

    const titleInput = screen.getByLabelText(/board title/i);
    const recipientInput = screen.getByLabelText(/recipient name/i);
    const submitButton = screen.getByRole('button', { name: /create board/i });

    await user.type(titleInput, 'Test Board');
    await user.type(recipientInput, 'Test Recipient');
    await user.click(submitButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/boards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Test Board',
          recipientName: 'Test Recipient',
        }),
      });
    });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/boards/test-board-id/manage');
    });
  });

  it('shows loading state during submission', async () => {
    const user = userEvent.setup();

    // Mock a delayed response
    vi.mocked(fetch).mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                ok: true,
                json: () =>
                  Promise.resolve({
                    success: true,
                    data: {
                      id: 'test-board-id',
                      viewToken: 'test-view-token',
                      postToken: 'test-post-token',
                    },
                  }),
              } as Response),
            100
          )
        )
    );

    render(<MultiStepBoardCreationForm />);

    const titleInput = screen.getByLabelText(/board title/i);
    const recipientInput = screen.getByLabelText(/recipient name/i);
    const submitButton = screen.getByRole('button', { name: /create board/i });

    await user.type(titleInput, 'Test Board');
    await user.type(recipientInput, 'Test Recipient');
    await user.click(submitButton);

    expect(screen.getByText(/creating board/i)).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it('handles API errors gracefully', async () => {
    const user = userEvent.setup();

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      json: () =>
        Promise.resolve({
          success: false,
          error: 'Server error',
        }),
    } as Response);

    render(<MultiStepBoardCreationForm />);

    const titleInput = screen.getByLabelText(/board title/i);
    const recipientInput = screen.getByLabelText(/recipient name/i);
    const submitButton = screen.getByRole('button', { name: /create board/i });

    await user.type(titleInput, 'Test Board');
    await user.type(recipientInput, 'Test Recipient');
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/server error/i)).toBeInTheDocument();
    });
  });

  it('validates title length', async () => {
    const user = userEvent.setup();
    render(<MultiStepBoardCreationForm />);

    const titleInput = screen.getByLabelText(/board title/i);
    const longTitle = 'a'.repeat(101); // Assuming max length is 100

    await user.type(titleInput, longTitle);
    await user.tab(); // Trigger blur event

    await waitFor(() => {
      expect(screen.getByText(/title is too long/i)).toBeInTheDocument();
    });
  });

  it('validates recipient name length', async () => {
    const user = userEvent.setup();
    render(<MultiStepBoardCreationForm />);

    const recipientInput = screen.getByLabelText(/recipient name/i);
    const longName = 'a'.repeat(101); // Assuming max length is 100

    await user.type(recipientInput, longName);
    await user.tab(); // Trigger blur event

    await waitFor(() => {
      expect(
        screen.getByText(/recipient name is too long/i)
      ).toBeInTheDocument();
    });
  });
});
