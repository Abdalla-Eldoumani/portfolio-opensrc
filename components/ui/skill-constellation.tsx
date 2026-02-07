"use client";

import { motion } from 'framer-motion';
import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { IconType } from 'react-icons';
import { skillConnections } from '@/lib/data/skills';

interface Skill {
  name: string;
  icon: IconType;
  proficiency: number;
  color: string;
  category: string;
}

interface SkillConstellationProps {
  skills: Skill[];
}

interface Connection {
  from: number;
  to: number;
  fromName: string;
  toName: string;
}

interface TooltipPosition {
  showAbove: boolean;
  horizontalAlign: 'left' | 'center' | 'right';
}

/**
 * Optimized interactive skill constellation - signature feature
 * Visualizes skills as an interconnected knowledge graph
 * Features memoized connections and touch-optimized interactions
 * Proficiency determines node size, hover reveals connections
 */
export const SkillConstellation = ({ skills }: SkillConstellationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [focusedSkillIndex, setFocusedSkillIndex] = useState<number>(-1);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [pathHighlight, setPathHighlight] = useState<{ from: string; to: string } | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Detect touch device to optimize interactions
  const isTouchDevice = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }, []);

  // Get unique categories from skills
  const categories = useMemo(() => {
    const cats = Array.from(new Set(skills.map(s => s.category)));
    return ['All', ...cats];
  }, [skills]);

  // Filter skills by category
  const filteredSkills = useMemo(() => {
    if (!selectedCategory || selectedCategory === 'All') return skills;
    return skills.filter(s => s.category === selectedCategory);
  }, [skills, selectedCategory]);

  // Optimized: Check skill connections using imported data
  const shouldConnect = useCallback((skill1: Skill, skill2: Skill) => {
    return (
      skillConnections[skill1.name]?.includes(skill2.name) ||
      skillConnections[skill2.name]?.includes(skill1.name)
    );
  }, []);

  // Memoized connections - compute once and cache
  // This prevents O(n²) recalculation on every render
  const connections = useMemo(() => {
    const result: Connection[] = [];

    skills.forEach((skill1, i) => {
      skills.slice(i + 1).forEach((skill2, j) => {
        if (shouldConnect(skill1, skill2)) {
          result.push({
            from: i,
            to: i + j + 1,
            fromName: skill1.name,
            toName: skill2.name
          });
        }
      });
    });

    return result;
  }, [skills, shouldConnect]);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Zoom with mouse wheel
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (containerRef.current && containerRef.current.contains(e.target as Node)) {
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          const delta = -e.deltaY * 0.001;
          setZoomLevel((prev) => Math.min(Math.max(0.5, prev + delta), 2.0));
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  // Pan handlers
  const panRafRef = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const clientX = e.clientX;
    const clientY = e.clientY;
    if (panRafRef.current) return;
    panRafRef.current = requestAnimationFrame(() => {
      setPanOffset({
        x: clientX - dragStart.x,
        y: clientY - dragStart.y,
      });
      panRafRef.current = 0;
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - panOffset.x,
        y: e.touches[0].clientY - panOffset.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && e.touches.length === 1) {
      setPanOffset({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Get connected skill indices for arrow navigation
  const getConnectedSkillIndices = useCallback((currentIndex: number): number[] => {
    const currentSkill = skills[currentIndex];
    if (!currentSkill) return [];

    return connections
      .filter(conn =>
        conn.fromName === currentSkill.name || conn.toName === currentSkill.name
      )
      .map(conn => {
        if (conn.fromName === currentSkill.name) {
          return skills.findIndex(s => s.name === conn.toName);
        } else {
          return skills.findIndex(s => s.name === conn.fromName);
        }
      })
      .filter(index => index !== -1);
  }, [skills, connections]);

  // Keyboard navigation handler
  const handleKeyDown = useCallback((e: React.KeyboardEvent, skillIndex: number) => {
    const connectedIndices = getConnectedSkillIndices(skillIndex);

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        setSelectedSkill(skills[skillIndex].name);
        setHoveredSkill(skills[skillIndex].name);
        break;

      case 'Escape':
        e.preventDefault();
        setSelectedSkill(null);
        setHoveredSkill(null);
        break;

      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        if (connectedIndices.length > 0) {
          // Navigate to next connected skill
          const currentConnectedIndex = connectedIndices.findIndex(i => i > skillIndex);
          const nextIndex = currentConnectedIndex !== -1
            ? connectedIndices[currentConnectedIndex]
            : connectedIndices[0];
          setFocusedSkillIndex(nextIndex);
          // Focus the actual DOM element
          const nextButton = document.querySelector(`[data-skill-index="${nextIndex}"]`) as HTMLButtonElement;
          nextButton?.focus();
        }
        break;

      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        if (connectedIndices.length > 0) {
          // Navigate to previous connected skill
          const currentConnectedIndex = connectedIndices.findIndex(i => i < skillIndex);
          const prevIndex = currentConnectedIndex !== -1
            ? connectedIndices[connectedIndices.length - 1]
            : connectedIndices[connectedIndices.length - 1];
          setFocusedSkillIndex(prevIndex);
          // Focus the actual DOM element
          const prevButton = document.querySelector(`[data-skill-index="${prevIndex}"]`) as HTMLButtonElement;
          prevButton?.focus();
        }
        break;

      case 'Tab':
        // Let Tab work naturally for sequential navigation
        // Update focused index when tabbing
        setFocusedSkillIndex(skillIndex);
        break;
    }
  }, [skills, getConnectedSkillIndices]);

  // Get connection names for ARIA labels
  const getConnectionNames = useCallback((skillName: string): string[] => {
    return connections
      .filter(conn => conn.fromName === skillName || conn.toName === skillName)
      .map(conn => conn.fromName === skillName ? conn.toName : conn.fromName);
  }, [connections]);

  // Pre-compute skill positions with useMemo (depends only on skills.length + dimensions)
  const skillPositions = useMemo(() => {
    const total = skills.length;
    const radius = Math.min(dimensions.width, dimensions.height) * 0.35;
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;

    return skills.map((_, index) => {
      const angle = (index / total) * 2 * Math.PI;
      return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      };
    });
  }, [skills, dimensions.width, dimensions.height]);

  const getSkillPosition = (index: number) => {
    return skillPositions[index] || { x: 0, y: 0 };
  };

  const getTooltipPosition = (nodeX: number, nodeY: number): TooltipPosition => {
    const viewportHeight = dimensions.height;
    const showAbove = nodeY > viewportHeight * 0.6;

    let horizontalAlign: 'left' | 'center' | 'right' = 'center';
    if (nodeX < 100) horizontalAlign = 'left';
    else if (nodeX > dimensions.width - 100) horizontalAlign = 'right';

    return { showAbove, horizontalAlign };
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[400px] lg:h-[500px] overflow-hidden rounded-2xl"
      style={{
        background: 'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.05) 0%, transparent 70%)',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="group"
      aria-label="Interactive skill constellation - use Tab to navigate between skills, Arrow keys to move between connected skills, Enter to select, Escape to deselect"
    >
      {/* Category filters */}
      <div className="absolute top-4 left-4 z-50 flex flex-wrap gap-2 max-w-md">
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => setSelectedCategory(category === 'All' ? null : category)}
            className={`glass-effect-static px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-300 ${
              (!selectedCategory && category === 'All') || selectedCategory === category
                ? 'border-cyan-500 text-white bg-cyan-500/20'
                : 'border-white/10 text-gray-400 hover:text-white hover:border-white/20'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Filter by ${category} skills`}
            aria-pressed={(!selectedCategory && category === 'All') || selectedCategory === category}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Zoom controls */}
      <div className="absolute top-4 right-4 z-50 flex flex-col gap-2">
        <button
          onClick={() => setZoomLevel((prev) => Math.min(prev + 0.2, 2.0))}
          className="glass-effect-static w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          aria-label="Zoom in"
        >
          <span className="text-xl font-bold">+</span>
        </button>
        <button
          onClick={() => setZoomLevel((prev) => Math.max(prev - 0.2, 0.5))}
          className="glass-effect-static w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          aria-label="Zoom out"
        >
          <span className="text-xl font-bold">−</span>
        </button>
        <div className="glass-effect-static px-2 py-1 rounded-lg border border-white/10 text-xs text-white text-center">
          {Math.round(zoomLevel * 100)}%
        </div>
      </div>

      {/* Zoomable/Pannable container */}
      <div
        style={{
          transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
          transformOrigin: 'center center',
          transition: isDragging ? 'none' : 'transform 0.3s ease-out',
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        {/* Connection lines - using memoized connections for performance */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.1" />
            <stop offset="50%" stopColor="var(--accent-secondary)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {connections.map((connection, index) => {
          const pos1 = getSkillPosition(connection.from);
          const pos2 = getSkillPosition(connection.to);

          const skill1 = skills[connection.from];
          const skill2 = skills[connection.to];

          const isHighlighted =
            hoveredSkill === connection.fromName || hoveredSkill === connection.toName;

          // Check if this connection is in the highlighted path
          const isPathHighlighted = pathHighlight &&
            ((pathHighlight.from === connection.fromName && pathHighlight.to === connection.toName) ||
             (pathHighlight.from === connection.toName && pathHighlight.to === connection.fromName));

          // Calculate connection strength (shared connections)
          const fromConnections = skillConnections[connection.fromName] || [];
          const toConnections = skillConnections[connection.toName] || [];
          const sharedConnections = fromConnections.filter((c: string) => toConnections.includes(c));
          const strength = 1 + (sharedConnections.length * 0.5); // Base 1, +0.5 per shared connection

          // Dim connections when category filter is active and neither skill matches
          const isDimmed = selectedCategory &&
            skill1.category !== selectedCategory &&
            skill2.category !== selectedCategory;

          return (
            <motion.line
              key={`${connection.fromName}-${connection.toName}`}
              x1={pos1.x}
              y1={pos1.y}
              x2={pos2.x}
              y2={pos2.y}
              stroke={isPathHighlighted ? "var(--accent-primary)" : "url(#connectionGradient)"}
              strokeWidth={isPathHighlighted ? 3 : isHighlighted ? 2 * strength : 1 * strength}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: isDimmed ? 0.05 : isPathHighlighted ? 0.8 : isHighlighted ? 0.6 : 0.15,
              }}
              transition={{
                duration: 1.5,
                delay: index * 0.05,
                opacity: { duration: 0.3 },
              }}
            />
          );
        })}
      </svg>

        {/* Skill nodes */}
        {skills.map((skill, index) => {
          const position = getSkillPosition(index);
          const size = 40 + (skill.proficiency / 100) * 40; // 40-80px based on proficiency
          const Icon = skill.icon;
          const isHovered = hoveredSkill === skill.name || selectedSkill === skill.name;
          const isFocused = focusedSkillIndex === index;
          const tooltipPos = getTooltipPosition(position.x, position.y);
          const connectedSkills = getConnectionNames(skill.name);

          // Dim skills that don't match the selected category
          const isDimmed = selectedCategory && skill.category !== selectedCategory;

          // Build comprehensive ARIA label
          const ariaLabel = `${skill.name}, proficiency ${skill.proficiency} percent${
            connectedSkills.length > 0
              ? `, connects to ${connectedSkills.join(', ')}`
              : ', no connections'
          }. Press Enter to select, Arrow keys to navigate connections.`;

          return (
            <motion.button
              key={skill.name}
              data-skill-index={index}
              className="absolute group focus:outline-none"
              style={{
                left: position.x,
                top: position.y,
                width: size,
                height: size,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: isDimmed ? 0.3 : 1 }}
              transition={{
                duration: 0.6,
                delay: index * 0.05,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              whileHover={!isTouchDevice ? { scale: 1.2, zIndex: 50 } : undefined}
              onHoverStart={!isTouchDevice ? () => setHoveredSkill(skill.name) : undefined}
              onHoverEnd={!isTouchDevice ? () => setHoveredSkill(null) : undefined}
              onTouchStart={isTouchDevice ? () => setHoveredSkill(skill.name) : undefined}
              onTouchEnd={isTouchDevice ? () => setTimeout(() => setHoveredSkill(null), 2000) : undefined}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onFocus={() => {
                setFocusedSkillIndex(index);
                setHoveredSkill(skill.name);
              }}
              onBlur={() => {
                if (!selectedSkill) {
                  setHoveredSkill(null);
                }
              }}
              aria-label={ariaLabel}
              tabIndex={0}
              type="button"
            >
              {/* Glow effect on hover */}
              <motion.div
                className="absolute inset-0 rounded-full blur-xl"
                style={{
                  background: skill.color.replace('text-', 'bg-'),
                  opacity: 0,
                }}
                animate={{ opacity: isHovered ? 0.4 : 0 }}
                transition={{ duration: 0.3 }}
              />

              {/* Node */}
              <div
                className="relative w-full h-full flex items-center justify-center rounded-full border-2 transition-all duration-300"
                style={{
                  background: 'var(--secondary-bg)',
                  borderColor: isHovered
                    ? 'var(--accent-primary)'
                    : 'var(--border-primary)',
                  boxShadow: isHovered
                    ? '0 8px 32px rgba(6, 182, 212, 0.3)'
                    : '0 2px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Icon
                  className={`${skill.color} transition-transform duration-300 ${
                    isHovered ? 'scale-110' : ''
                  }`}
                  size={size * 0.5}
                />

                {/* Keyboard focus indicator */}
                {isFocused && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    style={{
                      boxShadow: '0 0 0 3px var(--primary-bg), 0 0 0 5px var(--accent-primary), 0 0 16px rgba(6, 182, 212, 0.4)',
                    }}
                  />
                )}
              </div>

              {/* Smart Tooltip */}
              <motion.div
                className="absolute whitespace-nowrap pointer-events-none"
                style={{
                  top: tooltipPos.showAbove ? 'auto' : '100%',
                  bottom: tooltipPos.showAbove ? '100%' : 'auto',
                  left: tooltipPos.horizontalAlign === 'left' ? '0' : tooltipPos.horizontalAlign === 'right' ? 'auto' : '50%',
                  right: tooltipPos.horizontalAlign === 'right' ? '0' : 'auto',
                  transform: tooltipPos.horizontalAlign === 'center' ? 'translateX(-50%)' : 'none',
                  marginTop: tooltipPos.showAbove ? '0' : '8px',
                  marginBottom: tooltipPos.showAbove ? '8px' : '0',
                }}
                initial={{ opacity: 0, y: tooltipPos.showAbove ? 10 : -10 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : tooltipPos.showAbove ? 10 : -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="glass-effect-static px-4 py-3 rounded-xl border border-white/10 min-w-[200px]">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-bold text-white">{skill.name}</p>
                    <span className="text-xs font-medium text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full">
                      {skill.category}
                    </span>
                  </div>

                  {/* Proficiency bar */}
                  <div className="mb-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-400">Proficiency</span>
                      <span className="text-xs font-bold text-white">{skill.proficiency}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${skill.color.replace('text-', 'bg-')}`}
                        initial={{ width: 0 }}
                        animate={{ width: isHovered ? `${skill.proficiency}%` : 0 }}
                        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                      />
                    </div>
                  </div>

                  {/* Connections count */}
                  {connectedSkills.length > 0 && (
                    <p className="text-xs text-gray-500">
                      {connectedSkills.length} connection{connectedSkills.length !== 1 ? 's' : ''}
                    </p>
                  )}
                </div>
              </motion.div>
            </motion.button>
          );
        })}

        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <h3
              className="text-2xl font-bold text-gradient opacity-20"
              style={{ letterSpacing: '-0.02em' }}
            >
              Skills Ecosystem
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};
