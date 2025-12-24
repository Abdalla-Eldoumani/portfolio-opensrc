import {
  fetchRepoStats,
  calculateLanguagePercentages,
  timeAgo,
  type GitHubLanguages
} from '@/lib/api/github';

// Mock the cache module
jest.mock('@/lib/utils/cache', () => ({
  getCache: jest.fn(),
  setCache: jest.fn(),
}));

describe('GitHub API utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('calculateLanguagePercentages', () => {
    it('calculates correct percentages', () => {
      const languages: GitHubLanguages = {
        TypeScript: 7500,
        JavaScript: 2000,
        CSS: 500,
      };

      const result = calculateLanguagePercentages(languages);

      expect(result).toEqual({
        TypeScript: 75,
        JavaScript: 20,
        CSS: 5,
      });
    });

    it('handles single language', () => {
      const languages: GitHubLanguages = {
        Python: 1000,
      };

      const result = calculateLanguagePercentages(languages);

      expect(result).toEqual({
        Python: 100,
      });
    });

    it('handles empty object', () => {
      const languages: GitHubLanguages = {};

      const result = calculateLanguagePercentages(languages);

      expect(result).toEqual({});
    });

    it('rounds percentages correctly', () => {
      const languages: GitHubLanguages = {
        TypeScript: 333,
        JavaScript: 333,
        CSS: 334,
      };

      const result = calculateLanguagePercentages(languages);

      // Should round to 33, 33, 33 (each 333/1000 = 33.3, rounds to 33)
      expect(result.TypeScript).toBe(33);
      expect(result.JavaScript).toBe(33);
      expect(result.CSS).toBe(33);
    });
  });

  describe('timeAgo', () => {
    it('shows "just now" for very recent times', () => {
      const now = new Date().toISOString();
      expect(timeAgo(now)).toBe('just now');
    });

    it('shows minutes ago', () => {
      const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000).toISOString();
      expect(timeAgo(twoMinutesAgo)).toBe('2 minutes ago');
    });

    it('shows hours ago', () => {
      const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString();
      expect(timeAgo(threeHoursAgo)).toBe('3 hours ago');
    });

    it('shows days ago', () => {
      const fiveDaysAgo = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString();
      expect(timeAgo(fiveDaysAgo)).toBe('5 days ago');
    });

    it('shows singular form correctly', () => {
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
      expect(timeAgo(oneHourAgo)).toBe('1 hour ago');
    });

    it('shows months ago', () => {
      const twoMonthsAgo = new Date(Date.now() - 2 * 30 * 24 * 60 * 60 * 1000).toISOString();
      expect(timeAgo(twoMonthsAgo)).toBe('2 months ago');
    });

    it('shows years ago', () => {
      const oneYearAgo = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString();
      expect(timeAgo(oneYearAgo)).toBe('1 year ago');
    });
  });
});
