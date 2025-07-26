import { POST } from '@/app/api/upload/route';
import { NextRequest } from 'next/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock fs and path modules
vi.mock('fs/promises', () => ({
  writeFile: vi.fn().mockResolvedValue(undefined),
  mkdir: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('path', () => ({
  join: vi.fn((...args) => args.join('/')),
  extname: vi.fn((filename) => {
    const parts = filename.split('.');
    return parts.length > 1 ? `.${parts[parts.length - 1]}` : '';
  }),
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
  nanoid: vi.fn().mockReturnValue('test-file-id'),
}));

describe('/api/upload', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('POST', () => {
    it('should upload image file successfully', async () => {
      const imageFile = new File(['fake image content'], 'test.jpg', {
        type: 'image/jpeg',
      });
      const formData = new FormData();
      formData.append('file', imageFile);

      const request = new NextRequest('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toHaveProperty('url');
      expect(data.data.url).toContain('test-file-id');
      expect(data.data.url).toContain('.jpg');
    });

    it('should upload video file successfully', async () => {
      const videoFile = new File(['fake video content'], 'test.mp4', {
        type: 'video/mp4',
      });
      const formData = new FormData();
      formData.append('file', videoFile);

      const request = new NextRequest('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toHaveProperty('url');
      expect(data.data.url).toContain('test-file-id');
      expect(data.data.url).toContain('.mp4');
    });

    it('should reject unsupported file type', async () => {
      const textFile = new File(['fake text content'], 'test.txt', {
        type: 'text/plain',
      });
      const formData = new FormData();
      formData.append('file', textFile);

      const request = new NextRequest('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Unsupported file type');
    });

    it('should reject file that is too large', async () => {
      // Create a mock file that's larger than 10MB
      const largeFile = new File(['x'.repeat(11 * 1024 * 1024)], 'large.jpg', {
        type: 'image/jpeg',
      });
      const formData = new FormData();
      formData.append('file', largeFile);

      const request = new NextRequest('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('File too large');
    });

    it('should return 401 for unauthenticated user', async () => {
      const { getAuthenticatedUser } = await import('@/lib/api-auth');
      vi.mocked(getAuthenticatedUser).mockResolvedValueOnce(null);

      const imageFile = new File(['fake image content'], 'test.jpg', {
        type: 'image/jpeg',
      });
      const formData = new FormData();
      formData.append('file', imageFile);

      const request = new NextRequest('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.success).toBe(false);
      expect(data.error).toBe('Unauthorized');
    });

    it('should return 400 when no file is provided', async () => {
      const formData = new FormData();

      const request = new NextRequest('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBe('No file provided');
    });
  });
});
