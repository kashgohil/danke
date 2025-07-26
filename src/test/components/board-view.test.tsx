import { Board, BoardView } from '@/components/boards/board-view';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock the masonry layout component
vi.mock('@/components/ui/masonry-layout', () => ({
  MasonryLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="masonry-layout">{children}</div>
  ),
}));

// Mock the post content component
vi.mock('@/components/posts/post-content', () => ({
  PostContent: ({ post }: { post: any }) => (
    <div data-testid={`post-${post.id}`}>
      <div>{post.user?.name || 'Anonymous'}</div>
      <div>{post.content.content[0]?.content[0]?.text || 'No content'}</div>
    </div>
  ),
}));

const mockBoard = {
  id: 'test-board-id',
  title: 'Test Board',
  recipientName: 'Test Recipient',
  creatorId: 'creator-id',
  viewToken: 'view-token',
  postToken: 'post-token',
  createdAt: new Date(),
  updatedAt: new Date(),
} as unknown as Board;

const mockPosts = [
  {
    id: 'post-1',
    boardId: 'test-board-id',
    creatorId: 'user-1',
    content: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [{ type: 'text', text: 'First post content' }],
        },
      ],
    },
    mediaUrls: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,
    user: {
      id: 'user-1',
      name: 'User One',
      email: 'user1@example.com',
      avatarUrl: 'https://example.com/avatar1.jpg',
    },
  },
  {
    id: 'post-2',
    boardId: 'test-board-id',
    creatorId: 'user-2',
    content: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [{ type: 'text', text: 'Second post content' }],
        },
      ],
    },
    mediaUrls: ['https://example.com/image.jpg'],
    createdAt: new Date(),
    updatedAt: new Date(),
    isDeleted: false,
    user: {
      id: 'user-2',
      name: 'User Two',
      email: 'user2@example.com',
      avatarUrl: null,
    },
  },
] as any;

describe('BoardView', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders board title and recipient', () => {
    render(<BoardView board={mockBoard} posts={mockPosts} />);

    expect(screen.getByText('Test Board')).toBeInTheDocument();
    expect(screen.getByText(/for Test Recipient/i)).toBeInTheDocument();
  });

  it('renders posts in masonry layout', () => {
    render(<BoardView board={mockBoard} posts={mockPosts} />);

    expect(screen.getByTestId('masonry-layout')).toBeInTheDocument();
    expect(screen.getByTestId('post-post-1')).toBeInTheDocument();
    expect(screen.getByTestId('post-post-2')).toBeInTheDocument();
  });

  it('displays post content correctly', () => {
    render(<BoardView board={mockBoard} posts={mockPosts} />);

    expect(screen.getByText('First post content')).toBeInTheDocument();
    expect(screen.getByText('Second post content')).toBeInTheDocument();
    expect(screen.getByText('User One')).toBeInTheDocument();
    expect(screen.getByText('User Two')).toBeInTheDocument();
  });

  it('shows empty state when no posts', () => {
    render(<BoardView board={mockBoard} posts={[]} />);

    expect(screen.getByText(/no messages yet/i)).toBeInTheDocument();
    expect(screen.getByText(/be the first to share/i)).toBeInTheDocument();
  });

  it('filters out deleted posts', () => {
    const postsWithDeleted = [
      ...mockPosts,
      {
        id: 'post-3',
        boardId: 'test-board-id',
        creatorId: 'user-3',
        content: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: 'Deleted post' }],
            },
          ],
        },
        mediaUrls: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        isDeleted: true,
        user: {
          id: 'user-3',
          name: 'User Three',
          email: 'user3@example.com',
          avatarUrl: null,
        },
      },
    ];

    render(<BoardView board={mockBoard} posts={postsWithDeleted} />);

    expect(screen.getByTestId('post-post-1')).toBeInTheDocument();
    expect(screen.getByTestId('post-post-2')).toBeInTheDocument();
    expect(screen.queryByTestId('post-post-3')).not.toBeInTheDocument();
    expect(screen.queryByText('Deleted post')).not.toBeInTheDocument();
  });

  it('handles posts without user data', () => {
    const postsWithoutUser = [
      {
        id: 'post-1',
        boardId: 'test-board-id',
        creatorId: 'user-1',
        content: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: 'Post without user' }],
            },
          ],
        },
        mediaUrls: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        isDeleted: false,
        user: null,
      },
    ] as any;

    render(<BoardView board={mockBoard} posts={postsWithoutUser} />);

    expect(screen.getByText('Anonymous')).toBeInTheDocument();
    expect(screen.getByText('Post without user')).toBeInTheDocument();
  });

  it('displays post creation link', () => {
    render(<BoardView board={mockBoard} posts={mockPosts} />);

    const postLink = screen.getByRole('link', { name: /add your message/i });
    expect(postLink).toBeInTheDocument();
    expect(postLink).toHaveAttribute('href', '/boards/post/post-token');
  });

  it('shows board statistics', () => {
    render(<BoardView board={mockBoard} posts={mockPosts} />);

    expect(screen.getByText(/2 messages/i)).toBeInTheDocument();
  });

  it('handles responsive design classes', () => {
    render(<BoardView board={mockBoard} posts={mockPosts} />);

    const container = screen.getByTestId('masonry-layout').parentElement;
    expect(container).toHaveClass('container', 'mx-auto', 'px-4');
  });
});
