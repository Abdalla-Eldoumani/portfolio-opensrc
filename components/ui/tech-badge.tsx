"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Info } from 'lucide-react';

interface TechBadgeProps {
  name: string;
  description?: string;
  category?: 'frontend' | 'backend' | 'database' | 'tool' | 'language' | 'framework';
  proficiency?: number; // 0-100
  icon?: React.ReactNode;
  delay?: number; // Animation delay
  showTooltip?: boolean;
  className?: string;
}

// Tech descriptions database
const TECH_DESCRIPTIONS: Record<string, string> = {
  // Languages
  'Rust': 'Systems programming language focused on safety, speed, and concurrency',
  'C++': 'High-performance compiled language with low-level memory control',
  'Python': 'Versatile language for scripting, data science, and backend development',
  'TypeScript': 'JavaScript superset adding static typing and enhanced developer experience',
  'JavaScript': 'Dynamic language powering interactive web experiences',
  'Java': 'Object-oriented language for enterprise applications and Android development',
  'HTML5': 'Markup language for structuring web content with semantic elements',
  'CSS3': 'Styling language for visual presentation and responsive layouts',

  // Frontend Frameworks/Libraries
  'React': 'Component-based JavaScript library for building user interfaces',
  'Next.js': 'React framework with server-side rendering and static generation',
  'TailwindCSS': 'Utility-first CSS framework for rapid UI development',
  'Framer Motion': 'Production-ready animation library for React applications',

  // Backend & APIs
  'Axum': 'Ergonomic Rust web framework built on Tokio for async performance',
  'Node.js': 'JavaScript runtime for building scalable server-side applications',
  'Express': 'Minimal Node.js web framework for APIs and web apps',
  'RESTful API': 'Architectural style for web services using HTTP methods',
  'GraphQL': 'Query language for APIs with strong typing and efficient data fetching',

  // Databases
  'SQLite': 'Lightweight embedded SQL database for local storage',
  'PostgreSQL': 'Advanced open-source relational database with rich features',
  'MySQL': 'Popular relational database management system',
  'MongoDB': 'NoSQL document database for flexible schema design',
  'Prisma': 'Type-safe ORM for Node.js and TypeScript with auto-generated queries',

  // Authentication & Security
  'JWT': 'JSON Web Tokens for secure authentication and information exchange',
  'Clerk Auth': 'Complete authentication and user management platform',
  'OAuth': 'Open standard for secure API authorization',

  // DevOps & Tools
  'Git': 'Distributed version control system for tracking code changes',
  'Docker': 'Containerization platform for consistent development and deployment',
  'Vercel': 'Cloud platform for frontend deployment with automatic scaling',
  'WebSocket': 'Protocol for bidirectional real-time communication',

  // Performance & Optimization
  'Caching': 'Strategy to store and reuse data for improved performance',
  'Rate Limiting': 'Technique to control request frequency and prevent abuse',
  'AVX2 SIMD': 'Advanced Vector Extensions for parallel data processing',
  'OpenMP': 'API for multi-platform shared-memory parallel programming',

  // Algorithms & Techniques
  "Strassen's Algorithm": 'Efficient matrix multiplication reducing computational complexity',
  'Performance Optimization': 'Techniques to improve code speed and resource usage',

  // APIs & Integrations
  'OpenAI API': 'API for integrating GPT models and AI capabilities',
  'Financial APIs': 'Third-party services for real-time market and financial data',
  'Stripe': 'Payment processing platform for online transactions',

  // Testing
  'JUnit': 'Unit testing framework for Java applications',

  // Design & Content
  'Interactive Design': 'User-centered approach creating engaging experiences',
  'Educational Content': 'Materials designed for effective learning and knowledge transfer',
};

// Category colors
const CATEGORY_COLORS = {
  frontend: 'from-cyan-500 to-blue-500',
  backend: 'from-purple-500 to-pink-500',
  database: 'from-green-500 to-emerald-500',
  tool: 'from-orange-500 to-red-500',
  language: 'from-yellow-500 to-amber-500',
  framework: 'from-indigo-500 to-violet-500',
};

/**
 * Tech badge with rich tooltip
 * Shows technology name with optional description on hover
 * Includes proficiency bar and category indicator
 */
export const TechBadge = ({
  name,
  description,
  category,
  proficiency,
  icon,
  delay = 0,
  showTooltip = true,
  className = '',
}: TechBadgeProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<'top' | 'bottom'>('top');
  const badgeRef = useRef<HTMLDivElement>(null);

  // Auto-detect description from database if not provided
  const finalDescription = description || TECH_DESCRIPTIONS[name];

  // Check if tooltip should render above or below based on viewport position
  useEffect(() => {
    if (!isHovered || !badgeRef.current) return;

    const rect = badgeRef.current.getBoundingClientRect();
    const spaceAbove = rect.top;
    const spaceBelow = window.innerHeight - rect.bottom;

    // If more space below, show tooltip below
    setTooltipPosition(spaceBelow > spaceAbove ? 'bottom' : 'top');
  }, [isHovered]);

  const categoryGradient = category ? CATEGORY_COLORS[category] : 'from-gray-500 to-gray-600';

  return (
    <motion.div
      ref={badgeRef}
      className={`relative inline-block ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.3,
        delay,
        ease: [0.34, 1.56, 0.64, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      {/* Badge */}
      <motion.div
        className="px-3 py-1.5 text-sm font-medium text-gray-300 bg-gray-800/50 rounded-full border border-gray-700 hover:border-gray-600 hover:bg-gray-800/70 transition-all cursor-default flex items-center gap-1.5"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.98 }}
        tabIndex={0}
        role="button"
        aria-label={`${name}${finalDescription ? `: ${finalDescription}` : ''}`}
      >
        {icon && <span className="w-4 h-4">{icon}</span>}
        <span>{name}</span>
        {finalDescription && showTooltip && (
          <Info size={12} className="text-gray-500" aria-hidden="true" />
        )}
      </motion.div>

      {/* Tooltip */}
      {showTooltip && finalDescription && (
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className={`absolute left-1/2 -translate-x-1/2 z-50 pointer-events-none ${
                tooltipPosition === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
              }`}
              initial={{ opacity: 0, y: tooltipPosition === 'top' ? 10 : -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: tooltipPosition === 'top' ? 10 : -10, scale: 0.9 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              {/* Tooltip card */}
              <div className="glass-effect px-4 py-3 rounded-xl border border-white/10 shadow-2xl max-w-xs min-w-[200px]">
                {/* Header with category badge */}
                <div className="flex items-center justify-between gap-3 mb-2">
                  <p className="font-bold text-white text-sm">{name}</p>
                  {category && (
                    <span
                      className={`px-2 py-0.5 text-[10px] font-semibold rounded-full bg-gradient-to-r ${categoryGradient} text-white uppercase tracking-wide`}
                    >
                      {category}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs text-gray-300 leading-relaxed mb-3">
                  {finalDescription}
                </p>

                {/* Proficiency bar */}
                {proficiency !== undefined && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-gray-400">
                      <span>Proficiency</span>
                      <span className="font-semibold text-cyan-400">{proficiency}%</span>
                    </div>
                    <div className="h-1 bg-gray-700/50 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${categoryGradient}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${proficiency}%` }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Arrow pointer */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 w-0 h-0 ${
                  tooltipPosition === 'top'
                    ? 'top-full border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-900/90'
                    : 'bottom-full border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-gray-900/90'
                }`}
              />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
};

/**
 * Tech stack grid with automatic categorization
 * Groups technologies by category for better organization
 */
interface TechStackProps {
  technologies: Array<{
    name: string;
    category?: TechBadgeProps['category'];
    proficiency?: number;
  }>;
  showCategories?: boolean;
  className?: string;
}

export const TechStack = ({
  technologies,
  showCategories = false,
  className = '',
}: TechStackProps) => {
  if (!showCategories) {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {technologies.map((tech, index) => (
          <TechBadge
            key={tech.name}
            name={tech.name}
            category={tech.category}
            proficiency={tech.proficiency}
            delay={index * 0.05}
          />
        ))}
      </div>
    );
  }

  // Group by category
  const grouped = technologies.reduce((acc, tech) => {
    const category = tech.category || 'tool';
    if (!acc[category]) acc[category] = [];
    acc[category].push(tech);
    return acc;
  }, {} as Record<string, typeof technologies>);

  return (
    <div className={`space-y-6 ${className}`}>
      {Object.entries(grouped).map(([category, techs]) => (
        <div key={category}>
          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            {category}
          </h4>
          <div className="flex flex-wrap gap-2">
            {techs.map((tech, index) => (
              <TechBadge
                key={tech.name}
                name={tech.name}
                category={tech.category}
                proficiency={tech.proficiency}
                delay={index * 0.05}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
