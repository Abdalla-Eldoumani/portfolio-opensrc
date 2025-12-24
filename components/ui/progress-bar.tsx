"use client";

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface ProgressBarProps {
  value: number; // 0-100
  max?: number;
  label?: string;
  showValue?: boolean;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  delay?: number;
}

const colorClasses = {
  primary: 'bg-gradient-to-r from-cyan-500 to-blue-500',
  secondary: 'bg-gradient-to-r from-purple-500 to-pink-500',
  success: 'bg-gradient-to-r from-green-500 to-emerald-500',
  warning: 'bg-gradient-to-r from-yellow-500 to-orange-500',
  error: 'bg-gradient-to-r from-red-500 to-rose-500',
};

const sizeClasses = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
};

/**
 * Animated progress bar component
 * Used for skill proficiency, performance metrics, and achievement progress
 * Features smooth spring animations and customizable colors
 */
export const ProgressBar = ({
  value,
  max = 100,
  label,
  showValue = false,
  color = 'primary',
  size = 'md',
  animated = true,
  delay = 0,
}: ProgressBarProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const [displayValue, setDisplayValue] = useState(0);

  const normalizedValue = Math.min(Math.max(0, value), max);
  const percentage = (normalizedValue / max) * 100;

  // Animate value counting
  useEffect(() => {
    if (!animated || !isInView) {
      setDisplayValue(normalizedValue);
      return;
    }

    const duration = 1500; // 1.5 seconds
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(normalizedValue * easedProgress));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const timeout = setTimeout(animate, delay * 1000);
    return () => clearTimeout(timeout);
  }, [normalizedValue, animated, isInView, delay]);

  return (
    <div ref={containerRef} className="w-full">
      {/* Label and value */}
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-sm font-medium text-gray-300">
              {label}
            </span>
          )}
          {showValue && (
            <motion.span
              className="text-sm font-bold text-white tabular-nums"
              initial={{ opacity: 0 }}
              animate={{ opacity: isInView ? 1 : 0 }}
              transition={{ duration: 0.3, delay }}
            >
              {displayValue}
              {max === 100 && '%'}
              {max !== 100 && ` / ${max}`}
            </motion.span>
          )}
        </div>
      )}

      {/* Progress bar track */}
      <div
        className={`w-full ${sizeClasses[size]} bg-gray-800/50 rounded-full overflow-hidden border border-gray-700/30`}
      >
        {/* Progress bar fill */}
        <motion.div
          className={`h-full ${colorClasses[color]} rounded-full relative overflow-hidden`}
          initial={{ width: 0 }}
          animate={{ width: isInView ? `${percentage}%` : 0 }}
          transition={{
            duration: 1.5,
            delay,
            ease: [0.34, 1.56, 0.64, 1], // Bounce easing
          }}
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{
              duration: 2,
              delay: delay + 1.5,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

interface ComparisonProgressBarProps {
  baseline: number;
  improved: number;
  baselineLabel?: string;
  improvedLabel?: string;
  unit?: string;
  delay?: number;
}

/**
 * Dual progress bar for before/after comparisons
 * Useful for showing performance improvements (e.g., "25% faster")
 */
export const ComparisonProgressBar = ({
  baseline,
  improved,
  baselineLabel = 'Before',
  improvedLabel = 'After',
  unit = '%',
  delay = 0,
}: ComparisonProgressBarProps) => {
  const improvement = ((improved - baseline) / baseline) * 100;
  const improvementText = improvement > 0 ? `+${improvement.toFixed(1)}%` : `${improvement.toFixed(1)}%`;

  return (
    <div className="space-y-3">
      {/* Improvement badge */}
      <motion.div
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: delay + 1.5 }}
      >
        <span className="text-green-400 font-bold text-sm">
          {improvementText}
        </span>
        <span className="text-gray-400 text-xs">improvement</span>
      </motion.div>

      {/* Baseline bar */}
      <ProgressBar
        value={baseline}
        label={baselineLabel}
        showValue
        color="secondary"
        size="md"
        delay={delay}
      />

      {/* Improved bar */}
      <ProgressBar
        value={improved}
        label={improvedLabel}
        showValue
        color="success"
        size="md"
        delay={delay + 0.2}
      />
    </div>
  );
};
