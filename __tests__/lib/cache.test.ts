import { getCache, setCache, removeCache, clearAllCache } from '@/lib/utils/cache';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Cache utilities', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('setCache', () => {
    it('stores data in localStorage', () => {
      const key = 'test-key';
      const data = { name: 'John', age: 30 };
      const ttl = 1000;

      setCache(key, data, ttl);

      const stored = localStorage.getItem(`portfolio_cache_${key}`);
      expect(stored).toBeTruthy();

      const parsed = JSON.parse(stored!);
      expect(parsed.data).toEqual(data);
      expect(parsed.timestamp).toBeLessThanOrEqual(Date.now());
    });

    it('sets correct expiry time', () => {
      const key = 'test-key';
      const data = { value: 123 };
      const ttl = 5000;
      const now = Date.now();

      setCache(key, data, ttl);

      const stored = JSON.parse(localStorage.getItem(`portfolio_cache_${key}`)!);
      expect(stored.ttl).toBe(ttl);
      expect(stored.timestamp).toBeGreaterThanOrEqual(now);
      expect(stored.timestamp).toBeLessThanOrEqual(now + 100); // 100ms tolerance
    });
  });

  describe('getCache', () => {
    it('retrieves non-expired data', () => {
      const key = 'test-key';
      const data = { message: 'Hello' };
      const ttl = 10000; // 10 seconds

      setCache(key, data, ttl);
      const retrieved = getCache(key);

      expect(retrieved).toEqual(data);
    });

    it('returns null for expired data', () => {
      const key = 'test-key';
      const data = { message: 'Expired' };
      const ttl = -1000; // Already expired

      setCache(key, data, ttl);
      const retrieved = getCache(key);

      expect(retrieved).toBeNull();
    });

    it('returns null for non-existent key', () => {
      const retrieved = getCache('non-existent-key');
      expect(retrieved).toBeNull();
    });

    it('returns null for invalid JSON', () => {
      localStorage.setItem('invalid-key', 'not-json');
      const retrieved = getCache('invalid-key');
      expect(retrieved).toBeNull();
    });
  });

  describe('removeCache', () => {
    it('removes specific cache key', () => {
      const key = 'test-key';
      setCache(key, { data: 'test' }, 1000);

      removeCache(key);

      expect(getCache(key)).toBeNull();
    });
  });

  describe('clearAllCache', () => {
    it('clears all cache entries', () => {
      setCache('key1', { data: 'test1' }, 1000);
      setCache('key2', { data: 'test2' }, 1000);

      clearAllCache();

      expect(getCache('key1')).toBeNull();
      expect(getCache('key2')).toBeNull();
    });
  });
});
