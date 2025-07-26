import { PostCreationForm } from '@/components/posts/post-creation-form';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock the rich text editor
vi.mock('@tiptap/react', () => ({
  useEditor: vi.fn(() => ({
    getHTML: vi.fn(() => '<p>Test content</p>'),
    getJSON: vi.fn(() => ({
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [{ type: 'text', text: 'Test content' }],
        },
      ],
    })),
    commands: {
      setContent: vi.fn(),
      focus: vi.fn(),
    },
    isEditable: true,
    isEmpty: false,
  })),
  EditorContent: ({ editor }: any) => (
    <div data-testid="editor-content">Editor Content</div>
  ),
}));

// Mock fetch
global.fetch = vi.fn() as any;

const mockOnSuccess = vi.fn();

describe('PostCreationForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          success: true,
          data: {
            id: 'test-post-id',
            content: {
              type: 'doc',
              content: [
                {
                  type: 'paragraph',
                  content: [{ type: 'text', text: 'Test content' }],
                },
              ],
            },
            mediaUrls: [],
          },
        }),
    } as Response);
  });

  it('renders form elements correctly', () => {
    render(<PostCreationForm boardId="test-board-id" />);

    expect(screen.getByTestId('editor-content')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /post message/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/add media/i)).toBeInTheDocument();
  });

  it('submits post with text content', async () => {
    const user = userEvent.setup();
    render(<PostCreationForm boardId="test-board-id" />);

    const submitButton = screen.getByRole('button', { name: /post message/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          boardId: 'test-board-id',
          content: {
            type: 'doc',
            content: [
              {
                type: 'paragraph',
                content: [{ type: 'text', text: 'Test content' }],
              },
            ],
          },
          mediaUrls: [],
        }),
      });
    });

    expect(mockOnSuccess).toHaveBeenCalled();
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
                    data: { id: 'test-post-id' },
                  }),
              } as Response),
            100
          )
        )
    );

    render(<PostCreationForm boardId="test-board-id" />);

    const submitButton = screen.getByRole('button', { name: /post message/i });
    await user.click(submitButton);

    expect(screen.getByText(/posting/i)).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it('handles API errors gracefully', async () => {
    const user = userEvent.setup();

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      json: () =>
        Promise.resolve({
          success: false,
          error: 'Failed to create post',
        }),
    } as Response);

    render(<PostCreationForm boardId="test-board-id" />);

    const submitButton = screen.getByRole('button', { name: /post message/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/failed to create post/i)).toBeInTheDocument();
    });

    expect(mockOnSuccess).not.toHaveBeenCalled();
  });

  it('handles media upload', async () => {
    const user = userEvent.setup();

    // Mock successful upload
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          success: true,
          data: { url: 'https://example.com/uploaded-image.jpg' },
        }),
    } as Response);

    render(<PostCreationForm boardId="test-board-id" />);

    const fileInput = screen.getByLabelText(/upload media/i);
    const file = new File(['fake image'], 'test.jpg', { type: 'image/jpeg' });

    await user.upload(fileInput, file);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        '/api/upload',
        expect.objectContaining({
          method: 'POST',
          body: expect.any(FormData),
        })
      );
    });
  });

  it('prevents submission with empty content', async () => {
    const user = userEvent.setup();

    // Mock empty editor
    const { useEditor } = await import('@tiptap/react');
    vi.mocked(useEditor).mockReturnValueOnce({
      getHTML: vi.fn(() => ''),
      getJSON: vi.fn(() => ({ type: 'doc', content: [] })),
      commands: { setContent: vi.fn(), focus: vi.fn() },
      isEditable: true,
      isEmpty: true,
    } as any);

    render(<PostCreationForm boardId="test-board-id" />);

    const submitButton = screen.getByRole('button', { name: /post message/i });
    await user.click(submitButton);

    expect(fetch).not.toHaveBeenCalled();
    expect(screen.getByText(/please add some content/i)).toBeInTheDocument();
  });

  it('removes uploaded media', async () => {
    const user = userEvent.setup();

    // Mock successful upload first
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          success: true,
          data: { url: 'https://example.com/uploaded-image.jpg' },
        }),
    } as Response);

    render(<PostCreationForm boardId="test-board-id" />);

    const fileInput = screen.getByLabelText(/upload media/i);
    const file = new File(['fake image'], 'test.jpg', { type: 'image/jpeg' });

    await user.upload(fileInput, file);

    await waitFor(() => {
      expect(screen.getByText('test.jpg')).toBeInTheDocument();
    });

    const removeButton = screen.getByRole('button', { name: /remove/i });
    await user.click(removeButton);

    expect(screen.queryByText('test.jpg')).not.toBeInTheDocument();
  });
});
