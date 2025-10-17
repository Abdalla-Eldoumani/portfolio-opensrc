"use client";

import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
  delay?: number;
}

/**
 * Smooth animated counter with physics-based spring animation
 * Perfect for showcasing metrics and performance numbers
 * Uses tabular figures for consistent width during animation
 */
export const AnimatedCounter = ({
  value,
  duration = 2,
  suffix = '',
  prefix = '',
  decimals = 0,
  className = '',
  delay = 0,
}: AnimatedCounterProps) => {
  const springValue = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  const display = useTransform(springValue, (latest) => {
    const formatted = latest.toFixed(decimals);
    return `${prefix}${formatted}${suffix}`;
  });

  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!hasAnimated.current) {
      const timer = setTimeout(() => {
        springValue.set(value);
        hasAnimated.current = true;
      }, delay * 1000);

      return () => clearTimeout(timer);
    }
  }, [value, delay, springValue]);

  return (
    <motion.span
      className={`numeric-tabular ${className}`}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.4, delay }}
    >
      {display}
    </motion.span>
  );
};

/**
 * Animated counter with visual progress ring
 * Ideal for percentage-based metrics and completion rates
 */
interface AnimatedCounterWithRingProps extends AnimatedCounterProps {
  maxValue: number;
  ringColor?: string;
  size?: number;
  strokeWidth?: number;
}

export const AnimatedCounterWithRing = ({
  value,
  maxValue,
  duration = 2,
  suffix = '%',
  ringColor = 'var(--accent-primary)',
  size = 120,
  strokeWidth = 8,
  className = '',
  delay = 0,
}: AnimatedCounterWithRingProps) => {
  const springValue = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  const progress = useTransform(springValue, (latest) => {
    return (latest / maxValue) * 100;
  });

  const circumference = (size - strokeWidth) * Math.PI;
  const strokeDashoffset = useTransform(
    progress,
    (latest) => circumference - (latest / 100) * circumference
  );

  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!hasAnimated.current) {
      const timer = setTimeout(() => {
        springValue.set(value);
        hasAnimated.current = true;
      }, delay * 1000);

      return () => clearTimeout(timer);
    }
  }, [value, delay, springValue]);

  return (
    <motion.div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, delay, ease: [0.34, 1.56, 0.64, 1] }}
    >
      {/* Background ring */}
      <svg
        className="absolute inset-0 -rotate-90"
        width={size}
        height={size}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={(size - strokeWidth) / 2}
          fill="none"
          stroke="var(--border-primary)"
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={(size - strokeWidth) / 2}
          fill="none"
          stroke={ringColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{ strokeDashoffset }}
        />
      </svg>

      {/* Counter text */}
      <div className="relative flex flex-col items-center">
        <span className={`text-2xl font-bold numeric-tabular ${className}`}>
          <AnimatedCounter value={value} suffix={suffix} delay={delay} decimals={0} />
        </span>
      </div>
    </motion.div>
  );
};
