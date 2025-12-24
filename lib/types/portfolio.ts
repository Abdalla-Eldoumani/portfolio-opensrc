import { IconType } from 'react-icons';
import { LucideIcon } from 'lucide-react';

/**
 * Portfolio data type definitions
 * Centralized TypeScript interfaces for type safety across the application
 */

// Project types
export interface ProjectMetrics {
  requests?: number;
  responseTime?: number;
  cacheReduction?: number;
  performanceGain?: number;
  iterations?: number;
}

export interface Project {
  name: string;
  description: string;
  fullDescription?: string;
  image: string;
  images?: string[]; // Multiple images for carousel (fallback to single image if not provided)
  github?: string;
  live?: string;
  tech: string[];
  featured: boolean;
  icon: LucideIcon;
  metrics?: string;
  liveMetrics?: ProjectMetrics;
  category?: 'performance' | 'ai' | 'web' | 'security' | 'education';
  githubRepo?: {
    owner: string;
    repo: string;
  };
}

// Skill types
export interface Skill {
  name: string;
  icon: IconType;
  level?: string;
  proficiency: number;
  color: string;
  category: string;
}

export interface SkillCategory {
  category: string;
  skills: {
    name: string;
    icon: IconType;
    color: string;
  }[];
}

export type SkillConnections = Record<string, string[]>;

// Experience types
export type ExperienceType = 'Academic' | 'Remote' | 'Fellowship' | 'Mentorship';

export interface Experience {
  role: string;
  company: string;
  location: string;
  duration: string;
  type: ExperienceType;
  description: string;
  achievements: string[];
  skills: string[];
  icon: IconType;
  color: string;
  bgColor: string;
  borderColor: string;
}

// Education types
export interface Education {
  degree: string;
  minor?: string;
  institution: string;
  location: string;
  duration: string;
  gpa: string;
  honors?: string;
  description: string;
  highlights: string[];
}

// Animation types
export interface SpringConfig {
  damping: number;
  stiffness: number;
  mass?: number;
}

export interface MotionVariant {
  hidden: {
    opacity: number;
    [key: string]: number | string;
  };
  visible: {
    opacity: number;
    [key: string]: number | string;
  };
}

export interface AnimationConfig {
  duration: number;
  delay?: number;
  ease?: string | number[];
}
