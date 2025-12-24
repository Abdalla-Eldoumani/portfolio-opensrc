import { useState, useEffect } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

/**
 * Hook to track mouse position with optional smoothing
 * Returns current mouse coordinates relative to viewport
 *
 * @param smoothing - Enable position smoothing (default: false)
 * @param smoothFactor - Smoothing factor (0-1, higher = smoother but laggier) (default: 0.15)
 */
export const useMousePosition = (smoothing = false, smoothFactor = 0.15) => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [targetPosition, setTargetPosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    // Skip on server or touch devices
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(hover: hover)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setTargetPosition({ x: e.clientX, y: e.clientY });

      if (!smoothing) {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [smoothing]);

  // Smooth following with requestAnimationFrame
  useEffect(() => {
    if (!smoothing) return;

    let animationFrameId: number;

    const smoothUpdate = () => {
      setMousePosition((prev) => ({
        x: prev.x + (targetPosition.x - prev.x) * smoothFactor,
        y: prev.y + (targetPosition.y - prev.y) * smoothFactor,
      }));

      animationFrameId = requestAnimationFrame(smoothUpdate);
    };

    animationFrameId = requestAnimationFrame(smoothUpdate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [smoothing, smoothFactor, targetPosition]);

  return mousePosition;
};

/**
 * Hook to detect if mouse is hovering over an element
 * Useful for cursor state changes
 */
export const useMouseHover = (ref: React.RefObject<HTMLElement>) => {
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref]);

  return isHovering;
};

/**
 * Hook to track mouse velocity
 * Returns speed in pixels per frame
 */
export const useMouseVelocity = () => {
  const [velocity, setVelocity] = useState({ x: 0, y: 0, speed: 0 });
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0, time: Date.now() });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(hover: hover)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const deltaTime = now - lastPosition.time;

      if (deltaTime === 0) return;

      const deltaX = e.clientX - lastPosition.x;
      const deltaY = e.clientY - lastPosition.y;

      const vx = deltaX / deltaTime;
      const vy = deltaY / deltaTime;
      const speed = Math.sqrt(vx * vx + vy * vy);

      setVelocity({ x: vx, y: vy, speed });
      setLastPosition({ x: e.clientX, y: e.clientY, time: now });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [lastPosition]);

  return velocity;
};
