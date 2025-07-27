import { describe, expect, it, vi } from 'vitest';
import { cache, cacheKeys, cacheTTL } from '../lib/cache';
import {
  measureAsync,
  measureSync,
  perf,
  trackApiCall,
  trackDbQuery,
} from '../lib/performance';

describe('Performance Optimizations', () => {
  describe('Cache', () => {
    it('should store and retrieve cached data', () => {
      const testData = { id: '1', name: 'Test' };
      const key = 'test-key';

      cache.set(key, testData, 1000);
      const retrieved = cache.get(key);

      expect(retrieved).toEqual(testData);
    });

    it('should expire cached data after TTL', async () => {
      const testData = { id: '1', name: 'Test' };
      const key = 'test-key-expire';

      cache.set(key, testData, 10); // 10ms TTL

      await new Promise((resolve) => setTimeout(resolve, 20));

      const retrieved = cache.get(key);
      expect(retrieved).toBeNull();
    });

    it('should generate correct cache keys', () => {
      expect(cacheKeys.board('token123')).toBe('board:token123');
      expect(cacheKeys.boardPosts('board123')).toBe('board_posts:board123');
      expect(cacheKeys.user('user123')).toBe('user:user123');
    });

    it('should have reasonable TTL values', () => {
      expect(cacheTTL.board).toBeGreaterThan(0);
      expect(cacheTTL.posts).toBeGreaterThan(0);
      expect(cacheTTL.user).toBeGreaterThan(0);
      expect(cacheTTL.shortLived).toBeGreaterThan(0);
    });
  });

  describe('Performance Monitoring', () => {
    it('should measure sync operations', () => {
      const result = measureSync('test-operation', () => {
        let sum = 0;
        for (let i = 0; i < 1000; i++) {
          sum += i;
        }
        return sum;
      });

      expect(result).toBe(499500); // Sum of 0 to 999

      const metrics = perf.getMetrics('test-operation');
      expect(metrics).toBeTruthy();
      expect(metrics!.count).toBe(1);
      expect(metrics!.avg).toBeGreaterThan(0);
    });

    it('should track multiple measurements', () => {
      perf.clear();

      for (let i = 0; i < 5; i++) {
        measureSync('multi-test', () => {
          return Math.random();
        });
      }

      const metrics = perf.getMetrics('multi-test');
      expect(metrics).toBeTruthy();
      expect(metrics!.count).toBe(5);
    });

    it('should return null for non-existent metrics', () => {
      const metrics = perf.getMetrics('non-existent');
      expect(metrics).toBeNull();
    });

    it('should measure async operations', async () => {
      perf.clear();

      const result = await measureAsync('async-test', async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
        return 'success';
      });

      expect(result).toBe('success');

      const metrics = perf.getMetrics('async-test');
      expect(metrics).toBeTruthy();
      expect(metrics!.count).toBe(1);
      expect(metrics!.avg).toBeGreaterThan(0);
    });

    it('should track API calls', async () => {
      perf.clear();

      const mockApiCall = vi.fn().mockResolvedValue({ data: 'test' });
      const result = await trackApiCall('test-api', mockApiCall);

      expect(result).toEqual({ data: 'test' });
      expect(mockApiCall).toHaveBeenCalledOnce();

      const metrics = perf.getMetrics('api-test-api');
      expect(metrics).toBeTruthy();
      expect(metrics!.count).toBe(1);
    });

    it('should track database queries', async () => {
      perf.clear();

      const mockDbQuery = vi.fn().mockResolvedValue([{ id: 1, name: 'test' }]);
      const result = await trackDbQuery('test-query', mockDbQuery);

      expect(result).toEqual([{ id: 1, name: 'test' }]);
      expect(mockDbQuery).toHaveBeenCalledOnce();

      const metrics = perf.getMetrics('db-test-query');
      expect(metrics).toBeTruthy();
      expect(metrics!.count).toBe(1);
    });

    it('should track cache operations', () => {
      perf.clear();

      cache.set('test-key', { data: 'test' }, 1000);
      const result = cache.get('test-key');

      expect(result).toEqual({ data: 'test' });
    });
  });
});
