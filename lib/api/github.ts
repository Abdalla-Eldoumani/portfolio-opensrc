import { getCache, setCache } from '@/lib/utils/cache';

/**
 * GitHub API integration for fetching repository statistics
 * Features intelligent caching to respect rate limits (60 requests/hour unauthenticated)
 * No authentication required for public repositories
 */

export interface GitHubRepoStats {
  stars: number;
  forks: number;
  watchers: number;
  openIssues: number;
  language: string | null;
  lastCommit: string; // ISO date string
  topics: string[];
  description: string | null;
  homepage: string | null;
  size: number; // KB
  defaultBranch: string;
  createdAt: string;
  updatedAt: string;
  pushedAt: string;
}

export interface GitHubLanguages {
  [language: string]: number; // Bytes of code
}

export interface GitHubCommit {
  sha: string;
  message: string;
  author: string;
  date: string;
  url: string;
}

interface GitHubCommitResponse {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  html_url: string;
}

const GITHUB_API_BASE = 'https://api.github.com';
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Fetch repository statistics from GitHub API
 * Uses cache to minimize API calls and respect rate limits
 */
export async function fetchRepoStats(
  owner: string,
  repo: string
): Promise<GitHubRepoStats | null> {
  const cacheKey = `github_repo_${owner}_${repo}`;

  // Check cache first
  const cached = getCache<GitHubRepoStats>(cacheKey);
  if (cached) {
    console.log(`Using cached GitHub data for ${owner}/${repo}`);
    return cached;
  }

  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${owner}/${repo}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
        // Don't cache the fetch response, we handle caching ourselves
        cache: 'no-store'
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`Repository ${owner}/${repo} not found`);
        return null;
      }
      if (response.status === 403) {
        console.warn('GitHub API rate limit exceeded');
        return null;
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();

    const stats: GitHubRepoStats = {
      stars: data.stargazers_count || 0,
      forks: data.forks_count || 0,
      watchers: data.watchers_count || 0,
      openIssues: data.open_issues_count || 0,
      language: data.language,
      lastCommit: data.pushed_at,
      topics: data.topics || [],
      description: data.description,
      homepage: data.homepage,
      size: data.size,
      defaultBranch: data.default_branch,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      pushedAt: data.pushed_at
    };

    // Cache for 24 hours
    setCache(cacheKey, stats, CACHE_TTL);

    return stats;
  } catch (error) {
    console.error(`Failed to fetch GitHub stats for ${owner}/${repo}:`, error);
    return null;
  }
}

/**
 * Fetch programming languages breakdown for a repository
 */
export async function fetchRepoLanguages(
  owner: string,
  repo: string
): Promise<GitHubLanguages | null> {
  const cacheKey = `github_languages_${owner}_${repo}`;

  // Check cache first
  const cached = getCache<GitHubLanguages>(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${owner}/${repo}/languages`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
        cache: 'no-store'
      }
    );

    if (!response.ok) {
      return null;
    }

    const languages: GitHubLanguages = await response.json();

    // Cache for 24 hours
    setCache(cacheKey, languages, CACHE_TTL);

    return languages;
  } catch (error) {
    console.error(`Failed to fetch languages for ${owner}/${repo}:`, error);
    return null;
  }
}

/**
 * Fetch latest commits for a repository
 */
export async function fetchLatestCommits(
  owner: string,
  repo: string,
  count: number = 5
): Promise<GitHubCommit[] | null> {
  const cacheKey = `github_commits_${owner}_${repo}_${count}`;

  // Check cache first
  const cached = getCache<GitHubCommit[]>(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${owner}/${repo}/commits?per_page=${count}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
        cache: 'no-store'
      }
    );

    if (!response.ok) {
      return null;
    }

    const data: GitHubCommitResponse[] = await response.json();

    const commits: GitHubCommit[] = data.map((commit) => ({
      sha: commit.sha,
      message: commit.commit.message,
      author: commit.commit.author.name,
      date: commit.commit.author.date,
      url: commit.html_url
    }));

    // Cache for 1 hour (shorter TTL for commits)
    setCache(cacheKey, commits, 60 * 60 * 1000);

    return commits;
  } catch (error) {
    console.error(`Failed to fetch commits for ${owner}/${repo}:`, error);
    return null;
  }
}

/**
 * Calculate language percentages from bytes
 */
export function calculateLanguagePercentages(languages: GitHubLanguages): Record<string, number> {
  const total = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);

  if (total === 0) return {};

  const percentages: Record<string, number> = {};
  for (const [lang, bytes] of Object.entries(languages)) {
    percentages[lang] = Math.round((bytes / total) * 100);
  }

  return percentages;
}

/**
 * Format time ago string from ISO date
 */
export function timeAgo(isoDate: string): string {
  const date = new Date(isoDate);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval} ${unit}${interval === 1 ? '' : 's'} ago`;
    }
  }

  return 'just now';
}

/**
 * Check GitHub API rate limit status
 */
export async function checkRateLimit(): Promise<{
  limit: number;
  remaining: number;
  reset: Date;
} | null> {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/rate_limit`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      }
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    const core = data.resources.core;

    return {
      limit: core.limit,
      remaining: core.remaining,
      reset: new Date(core.reset * 1000)
    };
  } catch (error) {
    console.error('Failed to check rate limit:', error);
    return null;
  }
}
