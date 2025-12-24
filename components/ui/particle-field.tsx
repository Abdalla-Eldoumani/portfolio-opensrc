"use client";

import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  cellX?: number;
  cellY?: number;
}

interface SpatialGrid {
  cellSize: number;
  cells: Map<string, Particle[]>;
}

/**
 * Optimized particle field with spatial hash grid
 * Reduces connection checks from O(n²) to O(n) through spatial partitioning
 * Features adaptive quality and tab visibility detection
 */
export const ParticleField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', {
      alpha: true,
      desynchronized: true // Hint for better performance
    });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let spatialGrid: SpatialGrid;
    const CONNECTION_DISTANCE = 120;
    const CELL_SIZE = CONNECTION_DISTANCE; // Optimal cell size = connection distance

    // Adaptive quality based on device performance
    const getDeviceQuality = () => {
      const cores = navigator.hardwareConcurrency || 4;
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

      if (isMobile) return 0.5; // Reduce particles on mobile
      if (cores <= 4) return 0.7; // Low-end desktop
      return 1.0; // High-end desktop
    };

    const deviceQuality = getDeviceQuality();

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Reinitialize spatial grid on resize
      spatialGrid = {
        cellSize: CELL_SIZE,
        cells: new Map()
      };
    };

    const createParticles = () => {
      const baseCount = Math.floor((canvas.width * canvas.height) / 15000);
      const particleCount = Math.floor(baseCount * deviceQuality);
      particles = [];

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };

    // Get cell key for spatial hash
    const getCellKey = (x: number, y: number): string => {
      const cellX = Math.floor(x / CELL_SIZE);
      const cellY = Math.floor(y / CELL_SIZE);
      return `${cellX},${cellY}`;
    };

    // Build spatial hash grid - O(n) complexity
    const buildSpatialGrid = () => {
      spatialGrid.cells.clear();

      particles.forEach(particle => {
        const key = getCellKey(particle.x, particle.y);
        if (!spatialGrid.cells.has(key)) {
          spatialGrid.cells.set(key, []);
        }
        spatialGrid.cells.get(key)!.push(particle);
      });
    };

    // Get nearby cells for a particle
    const getNearbyCells = (particle: Particle): Particle[] => {
      const cellX = Math.floor(particle.x / CELL_SIZE);
      const cellY = Math.floor(particle.y / CELL_SIZE);
      const nearby: Particle[] = [];

      // Check 9 cells: current + 8 neighbors
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          const key = `${cellX + dx},${cellY + dy}`;
          const cell = spatialGrid.cells.get(key);
          if (cell) {
            nearby.push(...cell);
          }
        }
      }

      return nearby;
    };

    const drawParticle = (particle: Particle) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(6, 182, 212, ${particle.opacity})`;
      ctx.fill();
    };

    const updateParticle = (particle: Particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Bounce off walls
      if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

      // Keep within bounds
      particle.x = Math.max(0, Math.min(canvas.width, particle.x));
      particle.y = Math.max(0, Math.min(canvas.height, particle.y));
    };

    // Optimized connection drawing with spatial grid - O(n) average case
    const connectParticles = () => {
      const processed = new Set<string>();

      particles.forEach(particle => {
        const nearby = getNearbyCells(particle);

        nearby.forEach(other => {
          if (particle === other) return;

          // Create unique key to avoid duplicate connections
          const key1 = `${particle.x},${particle.y}`;
          const key2 = `${other.x},${other.y}`;
          const pairKey = key1 < key2 ? `${key1}-${key2}` : `${key2}-${key1}`;

          if (processed.has(pairKey)) return;
          processed.add(pairKey);

          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distanceSquared = dx * dx + dy * dy; // Avoid sqrt for performance
          const connectionDistanceSquared = CONNECTION_DISTANCE * CONNECTION_DISTANCE;

          if (distanceSquared < connectionDistanceSquared) {
            const distance = Math.sqrt(distanceSquared);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.15 * (1 - distance / CONNECTION_DISTANCE)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        });
      });
    };

    let lastFrameTime = Date.now();
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;

    const animate = () => {
      // Throttle animation when tab is not visible
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const now = Date.now();
      const elapsed = now - lastFrameTime;

      // Frame rate limiting for consistent performance
      if (elapsed < frameInterval) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      lastFrameTime = now - (elapsed % frameInterval);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update all particles
      particles.forEach((particle) => {
        updateParticle(particle);
        drawParticle(particle);
      });

      // Rebuild spatial grid and draw connections
      buildSpatialGrid();
      connectParticles();

      animationFrameId = requestAnimationFrame(animate);
    };

    // Handle tab visibility to pause/resume animation
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    // Handle window resize
    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };

    // Initialize
    resizeCanvas();
    createParticles();
    animate();

    // Event listeners
    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isVisible]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.4 }}
      aria-hidden="true"
    />
  );
};
