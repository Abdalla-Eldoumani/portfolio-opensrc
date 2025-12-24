"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme, type Theme } from '@/hooks/use-theme';
import { useEffect, useState } from 'react';

/**
 * Theme toggle component
 * Allows switching between light, dark, and auto modes
 * Shows current resolved theme with smooth transitions
 *
 * Usage:
 * <ThemeToggle /> - Compact button in navbar
 * <ThemeToggle variant="expanded" /> - Full labeled version
 */

interface ThemeToggleProps {
  variant?: 'compact' | 'expanded';
  className?: string;
}

export const ThemeToggle = ({ variant = 'compact', className = '' }: ThemeToggleProps) => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`w-10 h-10 rounded-full glass-effect flex items-center justify-center ${className}`}
        aria-label="Theme toggle loading"
      />
    );
  }

  const themes: { value: Theme; icon: typeof Sun; label: string }[] = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'dark', icon: Moon, label: 'Dark' },
    { value: 'auto', icon: Monitor, label: 'Auto' },
  ];

  const currentTheme = themes.find((t) => t.value === theme);
  const CurrentIcon = currentTheme?.icon || Monitor;

  if (variant === 'compact') {
    return (
      <div className={`relative ${className}`}>
        <motion.button
          onClick={() => {
            const currentIndex = themes.findIndex((t) => t.value === theme);
            const nextIndex = (currentIndex + 1) % themes.length;
            setTheme(themes[nextIndex].value);
          }}
          className="w-10 h-10 rounded-full glass-effect flex items-center justify-center hover:bg-white/10 transition-colors group relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={`Current theme: ${currentTheme?.label}. Click to switch.`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={theme}
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 180, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <CurrentIcon
                className={`w-5 h-5 ${
                  resolvedTheme === 'dark' ? 'text-blue-400' : 'text-amber-500'
                }`}
              />
            </motion.div>
          </AnimatePresence>

          {/* Tooltip */}
          <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="glass-effect px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap">
              {currentTheme?.label} Mode
              {theme === 'auto' && (
                <span className="text-gray-400 ml-1">({resolvedTheme})</span>
              )}
            </div>
          </div>
        </motion.button>

        {/* Theme indicator ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 pointer-events-none"
          style={{
            borderColor: resolvedTheme === 'dark' ? '#60a5fa' : '#f59e0b',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.2, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
    );
  }

  // Expanded variant with all three options
  return (
    <div className={`glass-effect p-2 rounded-2xl inline-flex gap-2 ${className}`} role="radiogroup" aria-label="Theme selector">
      {themes.map((themeOption) => {
        const Icon = themeOption.icon;
        const isActive = theme === themeOption.value;

        return (
          <motion.button
            key={themeOption.value}
            onClick={() => setTheme(themeOption.value)}
            className={`relative px-4 py-2 rounded-xl flex items-center gap-2 transition-all ${
              isActive
                ? 'bg-white/10 text-white'
                : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            role="radio"
            aria-checked={isActive}
            aria-label={`${themeOption.label} theme${
              themeOption.value === 'auto' ? ` (currently ${resolvedTheme})` : ''
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="text-sm font-medium">{themeOption.label}</span>

            {/* Active indicator */}
            {isActive && (
              <motion.div
                layoutId="theme-active-indicator"
                className="absolute inset-0 rounded-xl border-2"
                style={{
                  borderColor: resolvedTheme === 'dark' ? '#60a5fa' : '#f59e0b',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}

            {/* Auto mode indicator showing resolved theme */}
            {isActive && themeOption.value === 'auto' && (
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: resolvedTheme === 'dark' ? '#1e293b' : '#fef3c7',
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
              >
                {resolvedTheme === 'dark' ? (
                  <Moon className="w-2.5 h-2.5 text-blue-400" />
                ) : (
                  <Sun className="w-2.5 h-2.5 text-amber-600" />
                )}
              </motion.div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

/**
 * System theme indicator
 * Shows if user's system prefers dark or light mode
 * Useful for debugging and user awareness
 */
export const SystemThemeIndicator = () => {
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const updateSystemTheme = () => {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setSystemTheme(prefersDark ? 'dark' : 'light');
    };

    updateSystemTheme();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateSystemTheme);
      return () => mediaQuery.removeEventListener('change', updateSystemTheme);
    } else {
      mediaQuery.addListener(updateSystemTheme);
      return () => mediaQuery.removeListener(updateSystemTheme);
    }
  }, []);

  return (
    <div className="flex items-center gap-2 text-xs text-gray-400">
      <Monitor className="w-3 h-3" />
      <span>System: {systemTheme}</span>
    </div>
  );
};
