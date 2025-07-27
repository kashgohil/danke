interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

class MemoryCache {
  private cache = new Map<string, CacheItem<any>>();
  private cleanupInterval: NodeJS.Timeout;

  constructor() {
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 5 * 60 * 1000);
  }

  set<T>(key: string, data: T, ttlMs: number = 5 * 60 * 1000): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlMs,
    });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    const now = Date.now();
    if (now - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  delete(key: string): void {
    this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.ttl) {
        this.cache.delete(key);
      }
    }
  }

  destroy(): void {
    clearInterval(this.cleanupInterval);
    this.clear();
  }
}

export const cache = new MemoryCache();

export const cacheKeys = {
  board: (token: string) => `board:${token}`,
  boardPosts: (boardId: string) => `board_posts:${boardId}`,
  user: (userId: string) => `user:${userId}`,
  postWithUser: (postId: string) => `post_with_user:${postId}`,
};

export const cacheTTL = {
  board: 10 * 60 * 1000, // 10 minutes
  posts: 2 * 60 * 1000, // 2 minutes
  user: 30 * 60 * 1000, // 30 minutes
  shortLived: 30 * 1000, // 30 seconds
};
