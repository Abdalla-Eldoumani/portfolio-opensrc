"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Star, GitFork, Eye, AlertCircle, Clock } from 'lucide-react';
import { fetchRepoStats, timeAgo, type GitHubRepoStats } from '@/lib/api/github';

interface GitHubStatsProps {
  owner: string;
  repo: string;
  compact?: boolean;
}

/**
 * GitHub repository statistics component
 * Displays live stats with smart caching and skeleton loaders
 * Shows stars, forks, watchers, last commit time
 */
export const GitHubStats = ({ owner, repo, compact = false }: GitHubStatsProps) => {
  const [stats, setStats] = useState<GitHubRepoStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;

    const loadStats = async () => {
      setLoading(true);
      setError(false);

      try {
        const data = await fetchRepoStats(owner, repo);

        if (mounted) {
          if (data) {
            setStats(data);
          } else {
            setError(true);
          }
        }
      } catch (err) {
        if (mounted) {
          setError(true);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadStats();

    return () => {
      mounted = false;
    };
  }, [owner, repo]);

  // Skeleton loader
  if (loading) {
    return (
      <div className={`flex ${compact ? 'gap-3' : 'gap-4'} items-center`}>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center gap-1.5 animate-pulse"
          >
            <div className={`${compact ? 'w-3 h-3' : 'w-4 h-4'} rounded`} style={{ backgroundColor: 'var(--border-primary)' }} />
            <div className={`${compact ? 'w-6 h-3' : 'w-8 h-4'} rounded`} style={{ backgroundColor: 'var(--border-primary)' }} />
          </div>
        ))}
      </div>
    );
  }

  // Error state
  if (error || !stats) {
    return (
      <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
        <AlertCircle size={14} />
        <span>Stats unavailable</span>
      </div>
    );
  }

  // Compact view (for badges/inline)
  if (compact) {
    return (
      <div className="flex gap-3 items-center text-sm">
        {stats.stars > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-1"
            style={{ color: 'var(--accent-primary)' }}
            title={`${stats.stars} stars`}
          >
            <Star size={14} fill="currentColor" />
            <span className="font-medium">{formatNumber(stats.stars)}</span>
          </motion.div>
        )}

        {stats.forks > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex items-center gap-1"
            style={{ color: 'var(--accent-secondary)' }}
            title={`${stats.forks} forks`}
          >
            <GitFork size={14} />
            <span className="font-medium">{formatNumber(stats.forks)}</span>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex items-center gap-1"
          style={{ color: 'var(--text-muted)' }}
          title={`Updated ${timeAgo(stats.pushedAt)}`}
        >
          <Clock size={14} />
          <span className="font-medium text-xs">{timeAgo(stats.pushedAt)}</span>
        </motion.div>
      </div>
    );
  }

  // Full view (for detailed display)
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <StatCard
        icon={<Star size={16} fill="currentColor" />}
        label="Stars"
        value={stats.stars}
        color="var(--accent-primary)"
        delay={0}
      />

      <StatCard
        icon={<GitFork size={16} />}
        label="Forks"
        value={stats.forks}
        color="var(--accent-secondary)"
        delay={0.1}
      />

      <StatCard
        icon={<Eye size={16} />}
        label="Watchers"
        value={stats.watchers}
        color="var(--accent-secondary)"
        delay={0.2}
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="flex flex-col items-start p-3 rounded-lg"
        style={{ backgroundColor: 'var(--secondary-bg)', border: '1px solid var(--border-primary)' }}
      >
        <div className="flex items-center gap-2 mb-1" style={{ color: 'var(--text-muted)' }}>
          <Clock size={16} />
          <span className="text-xs font-medium uppercase tracking-wide">Updated</span>
        </div>
        <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
          {timeAgo(stats.pushedAt)}
        </span>
      </motion.div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
  delay: number;
}

const StatCard = ({ icon, label, value, color, delay }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="flex flex-col items-start p-3 rounded-lg transition-colors"
      style={{ backgroundColor: 'var(--secondary-bg)', border: '1px solid var(--border-primary)' }}
    >
      <div className="flex items-center gap-2 mb-1" style={{ color }}>
        {icon}
        <span className="text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
          {label}
        </span>
      </div>
      <span className="text-lg font-bold numeric-tabular" style={{ color: 'var(--text-primary)' }}>
        {formatNumber(value)}
      </span>
    </motion.div>
  );
};

/**
 * Format numbers with K/M suffixes
 */
function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toString();
}
