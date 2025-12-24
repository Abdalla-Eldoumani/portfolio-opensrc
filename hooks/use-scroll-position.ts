"use client";

import { useEffect, useState } from 'react';

interface ScrollPosition {
  scrollY: number;
  scrollX: number;
  scrollDirection: 'up' | 'down' | null;
  scrollProgress: number; // 0 to 1
}

/**
 * Hook to track scroll position and direction
 * Returns current scroll position, direction, and progress (0-1)
 * Optimized with RAF throttling
 */
export const useScrollPosition = (): ScrollPosition => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    scrollY: 0,
    scrollX: 0,
    scrollDirection: null,
    scrollProgress: 0,
  });

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollPosition = () => {
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = documentHeight > 0 ? scrollY / documentHeight : 0;

      setScrollPosition({
        scrollY,
        scrollX,
        scrollDirection: scrollY > lastScrollY ? 'down' : scrollY < lastScrollY ? 'up' : null,
        scrollProgress,
      });

      lastScrollY = scrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollPosition);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScrollPosition(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollPosition;
};

/**
 * Hook to detect if element is in viewport
 * Returns true when element is visible (with optional threshold)
 */
export const useInViewport = (
  ref: React.RefObject<HTMLElement>,
  threshold: number = 0.1
): boolean => {
  const [isInViewport, setIsInViewport] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold]);

  return isInViewport;
};

/**
 * Hook for parallax scroll effect
 * Returns a transform value based on scroll position
 * speed: positive = moves slower, negative = moves faster
 */
export const useParallax = (speed: number = 0.5): number => {
  const { scrollY } = useScrollPosition();
  return scrollY * speed;
};

/**
 * Hook to get element's distance from viewport top
 * Useful for scroll-triggered animations
 */
export const useElementScroll = (ref: React.RefObject<HTMLElement>) => {
  const [offset, setOffset] = useState(0);
  const { scrollY } = useScrollPosition();

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const elementTop = element.getBoundingClientRect().top + window.scrollY;
    const elementOffset = scrollY - elementTop;

    setOffset(elementOffset);
  }, [scrollY, ref]);

  return offset;
};
