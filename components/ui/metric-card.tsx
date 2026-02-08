"use client";

import { motion } from 'framer-motion';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { AnimatedCounter } from './animated-counter';

interface MetricCardProps {
  label: string;
  value: number | string;
  unit?: string;
  icon?: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  description?: string;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  delay?: number;
  animated?: boolean;
}

const colorConfig = {
  primary: {
    icon: 'text-[var(--accent-primary)]',
    bg: 'bg-[var(--accent-primary)]/10',
    border: 'border-[var(--accent-primary)]/20',
    glow: 'shadow-[var(--accent-primary)]/20',
  },
  secondary: {
    icon: 'text-[var(--accent-secondary)]',
    bg: 'bg-[var(--accent-secondary)]/10',
    border: 'border-[var(--accent-secondary)]/20',
    glow: 'shadow-[var(--accent-secondary)]/20',
  },
  success: {
    icon: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    glow: 'shadow-green-500/20',
  },
  warning: {
    icon: 'text-[var(--accent-primary)]',
    bg: 'bg-[var(--accent-primary)]/10',
    border: 'border-[var(--accent-primary)]/20',
    glow: 'shadow-[var(--accent-primary)]/20',
  },
  error: {
    icon: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    glow: 'shadow-red-500/20',
  },
};

const trendConfig = {
  up: {
    icon: TrendingUp,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
  },
  down: {
    icon: TrendingDown,
    color: 'text-red-400',
    bg: 'bg-red-500/10',
  },
  neutral: {
    icon: Minus,
    color: 'text-[var(--text-muted)]',
    bg: 'bg-[var(--tertiary-bg)]',
  },
};

/**
 * Metric card component for displaying performance statistics
 * Features animated counters, trend indicators, and customizable colors
 * Used for project metrics, performance benchmarks, and achievements
 */
export const MetricCard = ({
  label,
  value,
  unit,
  icon: Icon,
  trend,
  trendValue,
  description,
  color = 'primary',
  delay = 0,
  animated = true,
}: MetricCardProps) => {
  const colors = colorConfig[color];
  const isNumeric = typeof value === 'number';

  return (
    <motion.div
      className={`
        relative p-4 rounded-xl border ${colors.border} ${colors.bg}
        backdrop-blur-sm transition-all duration-300
        hover:border-opacity-40 hover:shadow-lg ${colors.glow}
        group
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      whileHover={{ y: -4 }}
    >
      {/* Header with icon and label */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {Icon && (
            <div className={`${colors.icon} transition-transform group-hover:scale-110 duration-300`}>
              <Icon size={18} />
            </div>
          )}
          <span className="text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
            {label}
          </span>
        </div>

        {/* Trend indicator */}
        {trend && trendValue && (
          <div
            className={`
              flex items-center gap-1 px-2 py-0.5 rounded-full
              ${trendConfig[trend].bg} ${trendConfig[trend].color}
            `}
          >
            {(() => {
              const TrendIcon = trendConfig[trend].icon;
              return <TrendIcon size={12} />;
            })()}
            <span className="text-xs font-semibold">{trendValue}</span>
          </div>
        )}
      </div>

      {/* Value */}
      <div className="flex items-baseline gap-1 mb-1">
        {isNumeric && animated ? (
          <AnimatedCounter
            value={value}
            className="text-3xl font-bold text-[var(--text-primary)] tabular-nums"
          />
        ) : (
          <span className="text-3xl font-bold tabular-nums" style={{ color: 'var(--text-primary)' }}>
            {value}
          </span>
        )}
        {unit && (
          <span className="text-lg font-medium" style={{ color: 'var(--text-muted)' }}>{unit}</span>
        )}
      </div>

      {/* Description */}
      {description && (
        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {description}
        </p>
      )}

      {/* Hover glow effect */}
      <div
        className={`
          absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100
          transition-opacity duration-300 pointer-events-none
          bg-gradient-to-br ${colors.bg} blur-xl -z-10
        `}
      />
    </motion.div>
  );
};

interface ComparisonMetricCardProps {
  label: string;
  before: number;
  after: number;
  unit?: string;
  icon?: LucideIcon;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  delay?: number;
}

/**
 * Comparison metric card showing before/after values
 * Automatically calculates improvement percentage and trend
 */
export const ComparisonMetricCard = ({
  label,
  before,
  after,
  unit,
  icon,
  color = 'success',
  delay = 0,
}: ComparisonMetricCardProps) => {
  const improvement = ((after - before) / before) * 100;
  const trend = improvement > 0 ? 'up' : improvement < 0 ? 'down' : 'neutral';
  const trendValue = `${improvement > 0 ? '+' : ''}${improvement.toFixed(1)}%`;

  return (
    <MetricCard
      label={label}
      value={after}
      unit={unit}
      icon={icon}
      trend={trend}
      trendValue={trendValue}
      description={`Previously ${before}${unit || ''}`}
      color={color}
      delay={delay}
      animated
    />
  );
};

interface MetricGridProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
}

/**
 * Responsive grid container for metric cards
 */
export const MetricGrid = ({ children, columns = 3 }: MetricGridProps) => {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-4`}>
      {children}
    </div>
  );
};
