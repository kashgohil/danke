import { POST } from '@/app/api/boards/route';
import { NextRequest } from 'next/server';
import { beforeEach, describe, expect, it } from 'vitest';

// Mock the database
const mockBoard = {
  id: 'test-board-id',
  title: 'Test Board',
  recipientName: 'Test Recipient',
  creatorId: 'test-user-id',
  viewToken: 'test-view-token',
  postToken: 'test-post-token',
  boardType: 'appreciation',
  nameType: 'full-name',
  postingMode: 'multiple',
  moderationEnabled: false,
  allowAnonymous: true,
  maxPostsPerUser: null,
  boardVisibility: 'public',
  expirationDate: null,
  typeConfig: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

vi.mock('@/lib/db', () => ({
  db: {
    insert: vi.fn().mockReturnValue({
      values: vi.fn().mockReturnValue({
        returning: vi.fn().mockResolvedValue([mockBoard]),
      }),
    }),
  },
  boards: {},
}));

// Mock auth
vi.mock('@/lib/api-auth', () => ({
  withAuth: vi.fn((handler) => handler),
}));

// Mock performance tracking
vi.mock('@/lib/performance', () => ({
  trackApiCall: vi.fn((name, fn) => fn()),
  trackDbQuery: vi.fn((name, fn) => fn()),
}));

// Mock nanoid
vi.mock('nanoid', () => ({
  nanoid: vi.fn().mockReturnValue('test-token'),
}));

describe('/api/boards - Multi-step Board Creation', () => {
  const mockUser = {
    id: 'test-user-id',
    name: 'Test User',
    email: 'test@example.com',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('POST - Multi-step board creation', () => {
    it('should create a multi-step board with all fields', async () => {
      const requestBody = {
        title: 'Appreciation Board for John',
        recipientName: 'John Doe',
        boardType: 'appreciation',
        nameType: 'full-name',
        postingMode: 'multiple',
        moderationEnabled: false,
        allowAnonymous: true,
        maxPostsPerUser: '5',
        boardVisibility: 'public',
        typeConfig: {
          appreciationTheme: 'professional',
          showContributorNames: true,
        },
      };

      const request = new NextRequest('http://localhost:3000/api/boards', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await POST(request, mockUser);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.success).toBe(true);
      expect(data.data).toHaveProperty('id');
      expect(data.data).toHaveProperty('viewToken');
      expect(data.data).toHaveProperty('postToken');
      expect(data.data.title).toBe('Appreciation Board for John');
      expect(data.data.boardType).toBe('appreciation');
      expect(data.message).toBe('Board created successfully');
    });

    it('should create a birthday board with expiration date', async () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 30);

      const requestBody = {
        title: 'Happy Birthday Sarah!',
        recipientName: 'Sarah Johnson',
        boardType: 'birthday',
        nameType: 'first-name',
        postingMode: 'single',
        moderationEnabled: true,
        allowAnonymous: false,
        boardVisibility: 'private',
        expirationDate: futureDate.toISOString(),
        typeConfig: {
          birthdayDate: '1990-05-15',
          ageDisplay: 'milestone-only',
        },
      };

      const request = new NextRequest('http://localhost:3000/api/boards', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await POST(request, mockUser);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.success).toBe(true);
      expect(data.data.boardType).toBe('birthday');
      expect(data.data.postingMode).toBe('single');
    });

    it('should handle legacy board creation (backward compatibility)', async () => {
      const requestBody = {
        title: 'Simple Board',
        recipientName: 'Jane Doe',
      };

      const request = new NextRequest('http://localhost:3000/api/boards', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await POST(request, mockUser);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.success).toBe(true);
      expect(data.data.title).toBe('Simple Board');
      expect(data.data.recipientName).toBe('Jane Doe');
    });

    it('should return validation error for invalid board type', async () => {
      const requestBody = {
        title: 'Test Board',
        recipientName: 'Test User',
        boardType: 'invalid-type',
        nameType: 'full-name',
        postingMode: 'multiple',
      };

      const request = new NextRequest('http://localhost:3000/api/boards', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await POST(request, mockUser);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Invalid board data');
      expect(data.details).toBeInstanceOf(Array);
    });

    it('should return validation error for empty title', async () => {
      const requestBody = {
        title: '',
        recipientName: 'Test User',
        boardType: 'appreciation',
        nameType: 'full-name',
        postingMode: 'multiple',
      };

      const request = new NextRequest('http://localhost:3000/api/boards', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await POST(request, mockUser);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Invalid board data');
    });

    it('should return validation error for past expiration date', async () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);

      const requestBody = {
        title: 'Test Board',
        recipientName: 'Test User',
        boardType: 'appreciation',
        nameType: 'full-name',
        postingMode: 'multiple',
        expirationDate: pastDate.toISOString(),
      };

      const request = new NextRequest('http://localhost:3000/api/boards', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await POST(request, mockUser);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Invalid board data');
    });

    it('should return validation error for single posting mode with multiple posts per user', async () => {
      const requestBody = {
        title: 'Test Board',
        recipientName: 'Test User',
        boardType: 'appreciation',
        nameType: 'full-name',
        postingMode: 'single',
        maxPostsPerUser: '5',
      };

      const request = new NextRequest('http://localhost:3000/api/boards', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await POST(request, mockUser);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Invalid board data');
    });

    it('should return error for invalid request body', async () => {
      const request = new NextRequest('http://localhost:3000/api/boards', {
        method: 'POST',
        body: 'invalid json',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await POST(request, mockUser);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Invalid request body');
    });

    it('should handle database errors gracefully', async () => {
      const { db } = await import('@/lib/db');
      vi.mocked(db.insert).mockReturnValueOnce({
        values: vi.fn().mockReturnValue({
          returning: vi
            .fn()
            .mockRejectedValue(new Error('Database connection failed')),
        }),
      } as any);

      const requestBody = {
        title: 'Test Board',
        recipientName: 'Test User',
        boardType: 'appreciation',
        nameType: 'full-name',
        postingMode: 'multiple',
      };

      const request = new NextRequest('http://localhost:3000/api/boards', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await POST(request, mockUser);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Failed to create board');
    });
  });
});
