"use client";

import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

interface TimelineEvent {
  date: string;
  label: string;
  color: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface TimelineVisualProps {
  events: TimelineEvent[];
  orientation?: 'vertical' | 'horizontal';
  className?: string;
}

/**
 * Visual SVG timeline component
 * Creates an interactive timeline with animated connections
 * Supports both vertical and horizontal orientations
 */
export const TimelineVisual = ({
  events,
  orientation = 'vertical',
  className = '',
}: TimelineVisualProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Auto-advance timeline every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % events.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [events.length]);

  // Update progress based on active index
  useEffect(() => {
    setProgress(((activeIndex + 1) / events.length) * 100);
  }, [activeIndex, events.length]);

  if (orientation === 'horizontal') {
    return (
      <div className={`relative py-8 ${className}`}>
        <svg
          className="w-full h-24"
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
        >
          {/* Background line */}
          <line
            x1="50"
            y1="50"
            x2="950"
            y2="50"
            stroke="rgba(107, 114, 128, 0.3)"
            strokeWidth="2"
          />

          {/* Progress line */}
          <motion.line
            x1="50"
            y1="50"
            x2={(progress / 100) * 900 + 50}
            y2="50"
            stroke="url(#timeline-gradient)"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />

          {/* Gradient definition */}
          <defs>
            <linearGradient id="timeline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>

          {/* Event dots */}
          {events.map((event, index) => {
            const x = 50 + (index / (events.length - 1)) * 900;
            const isActive = index === activeIndex;
            const isPast = index < activeIndex;

            return (
              <g key={index}>
                {/* Outer ring (pulse effect when active) */}
                <motion.circle
                  cx={x}
                  cy="50"
                  r={isActive ? 15 : 12}
                  fill="none"
                  stroke={event.color}
                  strokeWidth="2"
                  animate={{
                    scale: isActive ? [1, 1.2, 1] : 1,
                    opacity: isActive ? [0.5, 0.8, 0.5] : isPast ? 0.8 : 0.3,
                  }}
                  transition={{
                    duration: 2,
                    repeat: isActive ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                />

                {/* Inner dot */}
                <motion.circle
                  cx={x}
                  cy="50"
                  r="8"
                  fill={isPast || isActive ? event.color : 'rgba(107, 114, 128, 0.5)'}
                  animate={{
                    scale: isActive ? [1, 1.1, 1] : 1,
                  }}
                  transition={{
                    duration: 1,
                    repeat: isActive ? Infinity : 0,
                  }}
                  className="cursor-pointer"
                  onClick={() => setActiveIndex(index)}
                />
              </g>
            );
          })}
        </svg>

        {/* Event labels */}
        <div className="flex justify-between px-2 mt-4">
          {events.map((event, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`text-xs text-center transition-all ${
                index === activeIndex
                  ? 'font-semibold'
                  : 'hover:text-[var(--text-secondary)]'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                color: index === activeIndex ? 'var(--text-primary)' : 'var(--text-muted)',
                maxWidth: `${100 / events.length}%`,
              }}
            >
              <div>{event.label}</div>
              <div className="text-[10px] mt-1" style={{ color: 'var(--text-muted)' }}>{event.date}</div>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  // Vertical orientation
  return (
    <div className={`relative ${className}`}>
      <div className="flex">
        {/* SVG Timeline */}
        <div className="relative flex-shrink-0 w-16">
          <svg className="w-full h-full" viewBox="0 0 100 1000" preserveAspectRatio="none">
            {/* Background line */}
            <line
              x1="50"
              y1="50"
              x2="50"
              y2="950"
              stroke="rgba(107, 114, 128, 0.3)"
              strokeWidth="2"
            />

            {/* Progress line */}
            <motion.line
              x1="50"
              y1="50"
              x2="50"
              y2={(progress / 100) * 900 + 50}
              stroke="url(#timeline-gradient-vertical)"
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />

            {/* Gradient definition */}
            <defs>
              <linearGradient id="timeline-gradient-vertical" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>

            {/* Event dots */}
            {events.map((event, index) => {
              const y = 50 + (index / (events.length - 1)) * 900;
              const isActive = index === activeIndex;
              const isPast = index < activeIndex;

              return (
                <g key={index}>
                  {/* Outer ring */}
                  <motion.circle
                    cx="50"
                    cy={y}
                    r={isActive ? 15 : 12}
                    fill="none"
                    stroke={event.color}
                    strokeWidth="2"
                    animate={{
                      scale: isActive ? [1, 1.2, 1] : 1,
                      opacity: isActive ? [0.5, 0.8, 0.5] : isPast ? 0.8 : 0.3,
                    }}
                    transition={{
                      duration: 2,
                      repeat: isActive ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Inner dot */}
                  <motion.circle
                    cx="50"
                    cy={y}
                    r="8"
                    fill={isPast || isActive ? event.color : 'rgba(107, 114, 128, 0.5)'}
                    animate={{
                      scale: isActive ? [1, 1.1, 1] : 1,
                    }}
                    transition={{
                      duration: 1,
                      repeat: isActive ? Infinity : 0,
                    }}
                    className="cursor-pointer"
                    onClick={() => setActiveIndex(index)}
                  />

                  {/* Connecting line to label */}
                  <line
                    x1="65"
                    y1={y}
                    x2="80"
                    y2={y}
                    stroke={isPast || isActive ? event.color : 'rgba(107, 114, 128, 0.3)'}
                    strokeWidth="1"
                    strokeDasharray="2,2"
                  />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Event labels */}
        <div className="flex-1 space-y-8 pl-4">
          {events.map((event, index) => {
            const IconComponent = event.icon;
            const isActive = index === activeIndex;

            return (
              <motion.button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-full text-left p-3 rounded-lg transition-all ${
                  isActive ? 'border' : ''
                }`}
                whileHover={{ x: 5 }}
                animate={{
                  opacity: isActive ? 1 : 0.6,
                  scale: isActive ? 1.02 : 1,
                }}
                transition={{ duration: 0.3 }}
                style={{
                  height: `${100 / events.length}%`,
                  backgroundColor: isActive ? 'var(--tertiary-bg)' : undefined,
                  borderColor: isActive ? 'var(--border-primary)' : undefined,
                }}
              >
                <div className="flex items-center gap-3">
                  {IconComponent && (
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${event.color}20`, borderColor: event.color, color: event.color }}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div
                      className="font-semibold"
                      style={{ color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                    >
                      {event.label}
                    </div>
                    <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{event.date}</div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/**
 * Compact milestone timeline
 * Shows key dates in a condensed format
 */
export const MilestoneTimeline = ({ events }: { events: TimelineEvent[] }) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {events.map((event, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="flex flex-col items-center p-3 rounded-lg glass-effect min-w-[120px]"
        >
          {event.icon && (
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center mb-2"
              style={{ backgroundColor: `${event.color}20`, borderColor: event.color, borderWidth: 2, color: event.color }}
            >
              <event.icon className="w-5 h-5" />
            </div>
          )}
          <div className="text-sm font-semibold text-center" style={{ color: 'var(--text-primary)' }}>{event.label}</div>
          <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{event.date}</div>
        </motion.div>
      ))}
    </div>
  );
};
