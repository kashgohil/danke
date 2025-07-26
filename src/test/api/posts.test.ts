import { DELETE, PUT } from '@/app/api/posts/[postId]/route';
import { POST } from '@/app/api/posts/route';
import { NextRequest } from 'next/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock the database
vi.mock('@/lib/db', () => ({
  db: {
    insert: vi.fn().mockReturnValue({
      values: vi.fn().mockReturnValue({
        returning: vi.fn().mockResolvedValue([
          {
            id: 'test-post-id',
            boardId: 'test-board-id',
            creatorId: 'test-user-id',
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
          },
        ]),
      }),
    }),
    select: vi.fn().mockReturnValue({
      from: vi.fn().mockReturnValue({
        where: vi.fn().mockResolvedValue([
          {
            id: 'test-board-id',
            title: 'Test Board',
            recipientName: 'Test Recipient',
            creatorId: 'test-user-id',
            viewToken: 'test-view-token',
            postToken: 'test-post-token',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ]),
      }),
    }),
    update: vi.fn().mockReturnValue({
      set: vi.fn().mockReturnValue({
        where: vi.fn().mockReturnValue({
          returning: vi.fn().mockResolvedValue([
            {
              id: 'test-post-id',
              boardId: 'test-board-id',
              creatorId: 'test-user-id',
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
            },
          ]),
        }),
      }),
    }),
  },
  boards: {},
  posts: {},
  users: {},
}));

// Mock auth
vi.mock('@/lib/api-auth', () => ({
  getAuthenticatedUser: vi.fn().mockResolvedValue({
    id: 'test-user-id',
    name: 'Test User',
    email: 'test@example.com',
  }),
}));

describe('/api/posts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('POST', () => {
    it('should create a new post with valid data', async () => {
      const request = new NextRequest('http://localhost:3000/api/posts', {
        method: 'POST',
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
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.success).toBe(true);
      expect(data.data).toHaveProperty('id');
      expect(data.data.content).toEqual({
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [{ type: 'text', text: 'Test content' }],
          },
        ],
      });
    });

    it('should return 400 for invalid data', async () => {
      const request = new NextRequest('http://localhost:3000/api/posts', {
        method: 'POST',
        body: JSON.stringify({
          boardId: '', // Invalid empty boardId
          content: { type: 'doc', content: [] },
          mediaUrls: [],
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('validation');
    });

    it('should return 401 for unauthenticated user', async () => {
      const { getAuthenticatedUser } = await import('@/lib/api-auth');
      vi.mocked(getAuthenticatedUser).mockResolvedValueOnce(null);

      const request = new NextRequest('http://localhost:3000/api/posts', {
        method: 'POST',
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
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Unauthorized');
    });
  });
});

describe('/api/posts/[postId]', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('PUT', () => {
    it('should update post within edit time limit', async () => {
      // Mock post created 5 minutes ago (within 10 minute limit)
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
      const { db } = await import('@/lib/db');
      vi.mocked(db.select).mockReturnValueOnce({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockResolvedValue([
            {
              id: 'test-post-id',
              boardId: 'test-board-id',
              creatorId: 'test-user-id',
              content: {
                type: 'doc',
                content: [
                  {
                    type: 'paragraph',
                    content: [{ type: 'text', text: 'Original content' }],
                  },
                ],
              },
              mediaUrls: [],
              createdAt: fiveMinutesAgo,
              updatedAt: fiveMinutesAgo,
              isDeleted: false,
            },
          ]),
        }),
      } as any);

      const request = new NextRequest(
        'http://localhost:3000/api/posts/test-post-id',
        {
          method: 'PUT',
          body: JSON.stringify({
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
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const response = await PUT(request, {
        params: { postId: 'test-post-id' },
      });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.content).toEqual({
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [{ type: 'text', text: 'Updated content' }],
          },
        ],
      });
    });

    it('should return 403 for post outside edit time limit', async () => {
      // Mock post created 15 minutes ago (outside 10 minute limit)
      const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
      const { db } = await import('@/lib/db');
      vi.mocked(db.select).mockReturnValueOnce({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockResolvedValue([
            {
              id: 'test-post-id',
              boardId: 'test-board-id',
              creatorId: 'test-user-id',
              content: {
                type: 'doc',
                content: [
                  {
                    type: 'paragraph',
                    content: [{ type: 'text', text: 'Original content' }],
                  },
                ],
              },
              mediaUrls: [],
              createdAt: fifteenMinutesAgo,
              updatedAt: fifteenMinutesAgo,
              isDeleted: false,
            },
          ]),
        }),
      } as any);

      const request = new NextRequest(
        'http://localhost:3000/api/posts/test-post-id',
        {
          method: 'PUT',
          body: JSON.stringify({
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
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const response = await PUT(request, {
        params: { postId: 'test-post-id' },
      });
      const data = await response.json();

      expect(response.status).toBe(403);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Edit time limit exceeded');
    });
  });

  describe('DELETE', () => {
    it('should delete post by creator', async () => {
      const { db } = await import('@/lib/db');
      vi.mocked(db.select).mockReturnValueOnce({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockResolvedValue([
            {
              id: 'test-post-id',
              boardId: 'test-board-id',
              creatorId: 'test-user-id',
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
            },
          ]),
        }),
      } as any);

      const request = new NextRequest(
        'http://localhost:3000/api/posts/test-post-id',
        {
          method: 'DELETE',
        }
      );

      const response = await DELETE(request, {
        params: { postId: 'test-post-id' },
      });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toBe('Post deleted successfully');
    });

    it('should return 403 for non-creator trying to delete', async () => {
      const { db } = await import('@/lib/db');
      vi.mocked(db.select).mockReturnValueOnce({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockResolvedValue([
            {
              id: 'test-post-id',
              boardId: 'test-board-id',
              creatorId: 'different-user-id', // Different creator
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
            },
          ]),
        }),
      } as any);

      const request = new NextRequest(
        'http://localhost:3000/api/posts/test-post-id',
        {
          method: 'DELETE',
        }
      );

      const response = await DELETE(request, {
        params: { postId: 'test-post-id' },
      });
      const data = await response.json();

      expect(response.status).toBe(403);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Unauthorized to delete this post');
    });
  });
});
