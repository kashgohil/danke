import { GET } from '@/app/api/boards/[viewToken]/route';
import { POST } from '@/app/api/boards/route';
import { NextRequest } from 'next/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock the database
vi.mock('@/lib/db', () => ({
  db: {
    insert: vi.fn().mockReturnValue({
      values: vi.fn().mockReturnValue({
        returning: vi.fn().mockResolvedValue([
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
    select: vi.fn().mockReturnValue({
      from: vi.fn().mockReturnValue({
        where: vi.fn().mockReturnValue({
          leftJoin: vi.fn().mockReturnValue({
            orderBy: vi.fn().mockResolvedValue([
              {
                board: {
                  id: 'test-board-id',
                  title: 'Test Board',
                  recipientName: 'Test Recipient',
                  creatorId: 'test-user-id',
                  viewToken: 'test-view-token',
                  postToken: 'test-post-token',
                  createdAt: new Date(),
                  updatedAt: new Date(),
                },
                post: null,
                user: null,
              },
            ]),
          }),
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

// Mock nanoid
vi.mock('nanoid', () => ({
  nanoid: vi.fn().mockReturnValue('test-token'),
}));

describe('/api/boards', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('POST', () => {
    it('should create a new board with valid data', async () => {
      const request = new NextRequest('http://localhost:3000/api/boards', {
        method: 'POST',
        body: JSON.stringify({
          title: 'Test Board',
          recipientName: 'Test Recipient',
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
      expect(data.data).toHaveProperty('viewToken');
      expect(data.data).toHaveProperty('postToken');
      expect(data.data.title).toBe('Test Board');
      expect(data.data.recipientName).toBe('Test Recipient');
    });

    it('should return 400 for invalid data', async () => {
      const request = new NextRequest('http://localhost:3000/api/boards', {
        method: 'POST',
        body: JSON.stringify({
          title: '', // Invalid empty title
          recipientName: 'Test Recipient',
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

      const request = new NextRequest('http://localhost:3000/api/boards', {
        method: 'POST',
        body: JSON.stringify({
          title: 'Test Board',
          recipientName: 'Test Recipient',
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

describe('/api/boards/[viewToken]', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET', () => {
    it('should return board with posts for valid view token', async () => {
      const response = await GET(
        new NextRequest('http://localhost:3000/api/boards/test-view-token'),
        { params: { viewToken: 'test-view-token' } }
      );
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toHaveProperty('board');
      expect(data.data).toHaveProperty('posts');
      expect(data.data.board.title).toBe('Test Board');
    });

    it('should return 404 for invalid view token', async () => {
      const { db } = await import('@/lib/db');
      vi.mocked(db.select).mockReturnValueOnce({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockReturnValue({
            leftJoin: vi.fn().mockReturnValue({
              orderBy: vi.fn().mockResolvedValue([]),
            }),
          }),
        }),
      } as any);

      const response = await GET(
        new NextRequest('http://localhost:3000/api/boards/invalid-token'),
        { params: { viewToken: 'invalid-token' } }
      );
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Board not found');
    });
  });
});
