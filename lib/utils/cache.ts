/**
 * LocalStorage caching utility
 * Used to cache GitHub API responses and respect rate limits
 * Features TTL (Time To Live) for automatic cache invalidation
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

const CACHE_PREFIX = 'portfolio_cache_';

/**
 * Set an item in cache with TTL
 * @param key - Cache key
 * @param data - Data to cache
 * @param ttl - Time to live in milliseconds (default: 24 hours)
 */
export function setCache<T>(key: string, data: T, ttl: number = 24 * 60 * 60 * 1000): void {
  try {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl
    };

    localStorage.setItem(
      `${CACHE_PREFIX}${key}`,
      JSON.stringify(entry)
    );
  } catch (error) {
    // Handle quota exceeded or other localStorage errors
    console.warn('Failed to set cache:', error);
  }
}

/**
 * Get an item from cache if not expired
 * @param key - Cache key
 * @returns Cached data or null if expired/not found
 */
export function getCache<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(`${CACHE_PREFIX}${key}`);
    if (!item) return null;

    const entry: CacheEntry<T> = JSON.parse(item);
    const now = Date.now();

    // Check if cache has expired
    if (now - entry.timestamp > entry.ttl) {
      // Remove expired cache
      removeCache(key);
      return null;
    }

    return entry.data;
  } catch (error) {
    console.warn('Failed to get cache:', error);
    return null;
  }
}

/**
 * Remove an item from cache
 * @param key - Cache key
 */
export function removeCache(key: string): void {
  try {
    localStorage.removeItem(`${CACHE_PREFIX}${key}`);
  } catch (error) {
    console.warn('Failed to remove cache:', error);
  }
}

/**
 * Clear all portfolio cache entries
 */
export function clearAllCache(): void {
  try {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(CACHE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.warn('Failed to clear cache:', error);
  }
}

/**
 * Check if cache exists and is valid
 * @param key - Cache key
 * @returns true if cache exists and hasn't expired
 */
export function hasValidCache(key: string): boolean {
  return getCache(key) !== null;
}

/**
 * Get cache age in milliseconds
 * @param key - Cache key
 * @returns Age in milliseconds or null if not found
 */
export function getCacheAge(key: string): number | null {
  try {
    const item = localStorage.getItem(`${CACHE_PREFIX}${key}`);
    if (!item) return null;

    const entry: CacheEntry<any> = JSON.parse(item);
    return Date.now() - entry.timestamp;
  } catch (error) {
    return null;
  }
}

/**
 * Get remaining TTL in milliseconds
 * @param key - Cache key
 * @returns Remaining TTL or 0 if expired/not found
 */
export function getRemainingTTL(key: string): number {
  try {
    const item = localStorage.getItem(`${CACHE_PREFIX}${key}`);
    if (!item) return 0;

    const entry: CacheEntry<any> = JSON.parse(item);
    const age = Date.now() - entry.timestamp;
    const remaining = entry.ttl - age;

    return Math.max(0, remaining);
  } catch (error) {
    return 0;
  }
}

/**
 * Update cache TTL without changing data
 * @param key - Cache key
 * @param newTTL - New TTL in milliseconds
 */
export function updateCacheTTL(key: string, newTTL: number): boolean {
  try {
    const item = localStorage.getItem(`${CACHE_PREFIX}${key}`);
    if (!item) return false;

    const entry: CacheEntry<any> = JSON.parse(item);
    entry.ttl = newTTL;

    localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(entry));
    return true;
  } catch (error) {
    console.warn('Failed to update cache TTL:', error);
    return false;
  }
}
