import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useEffect } from 'react';
import { isAfterSunset, getNextTransitionTime } from '@/lib/utils/sun-times';

export type Theme = 'light' | 'dark' | 'auto';
export type ResolvedTheme = 'light' | 'dark';

interface ThemeStore {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  updateResolvedTheme: () => Promise<void>;
}

/**
 * Theme store with Zustand
 * Manages theme preference with localStorage persistence
 * Supports auto mode based on time of day
 */
export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: 'auto',
      resolvedTheme: 'dark',

      setTheme: (theme: Theme) => {
        set({ theme });
        get().updateResolvedTheme();
      },

      updateResolvedTheme: async () => {
        const { theme } = get();
        let resolved: ResolvedTheme;

        if (theme === 'auto') {
          // Check system preference first
          if (typeof window !== 'undefined' && window.matchMedia) {
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

            // If user has system preference, use it
            // Otherwise, use time-based detection
            if (systemPrefersDark) {
              resolved = 'dark';
            } else {
              // Check if after sunset
              const afterSunset = await isAfterSunset();
              resolved = afterSunset ? 'dark' : 'light';
            }
          } else {
            resolved = 'dark';
          }
        } else {
          resolved = theme;
        }

        set({ resolvedTheme: resolved });

        // Apply to document
        if (typeof document !== 'undefined') {
          document.documentElement.setAttribute('data-theme', resolved);
          document.documentElement.style.colorScheme = resolved;
        }
      },
    }),
    {
      name: 'theme-preference',
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);

/**
 * Hook for theme management
 * Automatically updates theme based on time of day when in auto mode
 */
export const useTheme = () => {
  const { theme, resolvedTheme, setTheme, updateResolvedTheme } = useThemeStore();

  // Set up auto theme updates
  useEffect(() => {
    // Skip on server
    if (typeof window === 'undefined') return;

    // Initial theme application
    if (!document.documentElement.hasAttribute('data-theme')) {
      updateResolvedTheme();
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'auto') {
        updateResolvedTheme();
      }
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Legacy support
      mediaQuery.addListener(handleChange);
    }

    // Set up automatic transitions at sunrise/sunset when in auto mode
    let transitionTimeout: NodeJS.Timeout | null = null;

    const scheduleNextTransition = async () => {
      if (theme === 'auto') {
        try {
          const nextTransition = await getNextTransitionTime();
          const now = new Date();
          const msUntilTransition = nextTransition.getTime() - now.getTime();

          if (msUntilTransition > 0) {
            transitionTimeout = setTimeout(() => {
              updateResolvedTheme();
              scheduleNextTransition(); // Schedule next one
            }, msUntilTransition);
          }
        } catch (error) {
          // Fallback: check every hour
          transitionTimeout = setTimeout(() => {
            updateResolvedTheme();
            scheduleNextTransition();
          }, 3600000); // 1 hour
        }
      }
    };

    scheduleNextTransition();

    // Cleanup on unmount
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }

      if (transitionTimeout) {
        clearTimeout(transitionTimeout);
      }
    };
  }, [theme, updateResolvedTheme]);

  return {
    theme,
    resolvedTheme,
    setTheme,
    isDark: resolvedTheme === 'dark',
    isLight: resolvedTheme === 'light',
    isAuto: theme === 'auto',
  };
};

/**
 * Simple hook to get current resolved theme
 * Use this in components that only need to read the theme
 */
export const useResolvedTheme = () => {
  const resolvedTheme = useThemeStore((state) => state.resolvedTheme);
  return resolvedTheme;
};
