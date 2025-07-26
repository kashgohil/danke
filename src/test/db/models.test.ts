import {
  createBoard,
  getBoardByViewToken,
  getBoardWithPosts,
} from '@/lib/models/board';
import {
  createPost,
  deletePost,
  getPostById,
  updatePost,
} from '@/lib/models/post';
import { createUser, getUserById } from '@/lib/models/user';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock the database
const mockDb = {
  insert: vi.fn(),
  select: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
};

vi.mock('@/lib/db', () => ({
  db: mockDb,
  boards: { id: 'boards.id', title: 'boards.title' },
  posts: { id: 'posts.id', content: 'posts.content' },
  users: { id: 'users.id', name: 'users.name' },
}));

// Mock nanoid
vi.mock('nanoid', () => ({
  nanoid: vi.fn().mockReturnValue('test-id'),
}));

describe('Database Models', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('User Model', () => {
    it('should create a new user', async () => {
      const mockUser = {
        id: 'user-123',
        name: 'Test User',
        email: 'test@example.com',
        avatarUrl: 'https://example.com/avatar.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockDb.insert.mockReturnValue({
        values: vi.fn().mockReturnValue({
          returning: vi.fn().mockResolvedValue([mockUser]),
        }),
      });

      const result = await createUser({
        id: 'user-123',
        name: 'Test User',
        email: 'test@example.com',
        avatarUrl: 'https://example.com/avatar.jpg',
      });

      expect(result).toEqual(mockUser);
      expect(mockDb.insert).toHaveBeenCalled();
    });

    it('should get user by id', async () => {
      const mockUser = {
        id: 'user-123',
        name: 'Test User',
        email: 'test@example.com',
        avatarUrl: 'https://example.com/avatar.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockDb.select.mockReturnValue({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockResolvedValue([mockUser]),
        }),
      });

      const result = await getUserById('user-123');

      expect(result).toEqual(mockUser);
      expect(mockDb.select).toHaveBeenCalled();
    });

    it('should return null for non-existent user', async () => {
      mockDb.select.mockReturnValue({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockResolvedValue([]),
        }),
      });

      const result = await getUserById('non-existent');

      expect(result).toBeNull();
    });
  });

  describe('Board Model', () => {
    it('should create a new board', async () => {
      const mockBoard = {
        id: 'board-123',
        title: 'Test Board',
        recipientName: 'Test Recipient',
        creatorId: 'user-123',
        viewToken: 'view-token',
        postToken: 'post-token',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockDb.insert.mockReturnValue({
        values: vi.fn().mockReturnValue({
          returning: vi.fn().mockResolvedValue([mockBoard]),
        }),
      });

      const result = await createBoard({
        title: 'Test Board',
        recipientName: 'Test Recipient',
        creatorId: 'user-123',
      });

      expect(result).toEqual(mockBoard);
      expect(mockDb.insert).toHaveBeenCalled();
    });

    it('should get board by view token', async () => {
      const mockBoard = {
        id: 'board-123',
        title: 'Test Board',
        recipientName: 'Test Recipient',
        creatorId: 'user-123',
        viewToken: 'view-token',
        postToken: 'post-token',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockDb.select.mockReturnValue({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockResolvedValue([mockBoard]),
        }),
      });

      const result = await getBoardByViewToken('view-token');

      expect(result).toEqual(mockBoard);
      expect(mockDb.select).toHaveBeenCalled();
    });

    it('should get board with posts', async () => {
      const mockBoardWithPosts = {
        board: {
          id: 'board-123',
          title: 'Test Board',
          recipientName: 'Test Recipient',
          creatorId: 'user-123',
          viewToken: 'view-token',
          postToken: 'post-token',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        posts: [
          {
            id: 'post-123',
            boardId: 'board-123',
            creatorId: 'user-123',
            content: { type: 'doc', content: [] },
            mediaUrls: [],
            createdAt: new Date(),
            updatedAt: new Date(),
            isDeleted: false,
            user: {
              id: 'user-123',
              name: 'Test User',
              email: 'test@example.com',
              avatarUrl: null,
            },
          },
        ],
      };

      mockDb.select.mockReturnValue({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockReturnValue({
            leftJoin: vi.fn().mockReturnValue({
              orderBy: vi.fn().mockResolvedValue([
                {
                  board: mockBoardWithPosts.board,
                  post: mockBoardWithPosts.posts[0],
                  user: mockBoardWithPosts.posts[0].user,
                },
              ]),
            }),
          }),
        }),
      });

      const result = await getBoardWithPosts('view-token');

      expect(result.board).toEqual(mockBoardWithPosts.board);
      expect(result.posts).toHaveLength(1);
      expect(result.posts[0]).toEqual(mockBoardWithPosts.posts[0]);
    });
  });

  describe('Post Model', () => {
    it('should create a new post', async () => {
      const mockPost = {
        id: 'post-123',
        boardId: 'board-123',
        creatorId: 'user-123',
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
        createdAt: new Date(),
        updatedAt: new Date(),
        isDeleted: false,
      };

      mockDb.insert.mockReturnValue({
        values: vi.fn().mockReturnValue({
          returning: vi.fn().mockResolvedValue([mockPost]),
        }),
      });

      const result = await createPost({
        boardId: 'board-123',
        creatorId: 'user-123',
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
      });

      expect(result).toEqual(mockPost);
      expect(mockDb.insert).toHaveBeenCalled();
    });

    it('should get post by id', async () => {
      const mockPost = {
        id: 'post-123',
        boardId: 'board-123',
        creatorId: 'user-123',
        content: { type: 'doc', content: [] },
        mediaUrls: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        isDeleted: false,
      };

      mockDb.select.mockReturnValue({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockResolvedValue([mockPost]),
        }),
      });

      const result = await getPostById('post-123');

      expect(result).toEqual(mockPost);
      expect(mockDb.select).toHaveBeenCalled();
    });

    it('should update a post', async () => {
      const updatedPost = {
        id: 'post-123',
        boardId: 'board-123',
        creatorId: 'user-123',
        content: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: 'Updated content' }],
            },
          ],
        },
        mediaUrls: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        isDeleted: false,
      };

      mockDb.update.mockReturnValue({
        set: vi.fn().mockReturnValue({
          where: vi.fn().mockReturnValue({
            returning: vi.fn().mockResolvedValue([updatedPost]),
          }),
        }),
      });

      const result = await updatePost('post-123', {
        content: {
          type: 'doc',
          content: [
            {
              type: 'paragraph',
              content: [{ type: 'text', text: 'Updated content' }],
            },
          ],
        },
        mediaUrls: [],
      });

      expect(result).toEqual(updatedPost);
      expect(mockDb.update).toHaveBeenCalled();
    });

    it('should soft delete a post', async () => {
      const deletedPost = {
        id: 'post-123',
        boardId: 'board-123',
        creatorId: 'user-123',
        content: { type: 'doc', content: [] },
        mediaUrls: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        isDeleted: true,
      };

      mockDb.update.mockReturnValue({
        set: vi.fn().mockReturnValue({
          where: vi.fn().mockReturnValue({
            returning: vi.fn().mockResolvedValue([deletedPost]),
          }),
        }),
      });

      const result = await deletePost('post-123');

      expect(result).toEqual(deletedPost);
      expect(mockDb.update).toHaveBeenCalled();
    });
  });
});
