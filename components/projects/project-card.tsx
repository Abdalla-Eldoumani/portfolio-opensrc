"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { ArrowUpRight, Code, Globe, ChevronDown, Info, Eye } from 'lucide-react';
import Link from 'next/link';
import { PerformanceBadge } from '@/components/ui/performance-badge';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { ImageCarousel } from '@/components/ui/image-carousel';
import { TechBadge } from '@/components/ui/tech-badge';
import { GitHubStats } from '@/components/ui/github-stats';
import type { Project } from '@/lib/types/portfolio';
import { ProjectMetrics } from './project-metrics';
import { ProjectTechStack } from './project-tech-stack';

interface ProjectCardProps {
  project: Project;
  index: number;
  isExpanded: boolean;
  onToggleExpand: (projectName: string) => void;
  onOpenPreview: (url: string, name: string) => void;
}

/**
 * Project Card Component
 * Comprehensive project display with image carousel, metrics, tech stack, and actions
 */
export const ProjectCard = ({ project, index, isExpanded, onToggleExpand, onOpenPreview }: ProjectCardProps) => {
  const IconComponent = project.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: "easeInOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${
        index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
      }`}
    >
      {/* Project Image/Carousel */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className={`relative group ${
          index % 2 === 1 ? 'lg:col-start-2' : ''
        }`}
      >
        <div className="glass-effect p-4 rounded-2xl overflow-hidden hover-lift">
          <ImageCarousel
            images={project.images || [project.image]}
            alt={project.name}
            className="h-64 lg:h-80"
            autoPlayInterval={5000}
            aspectRatio="video"
          />

          {/* Overlay Performance Badge */}
          {project.metrics && (
            <div className="absolute bottom-8 left-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10">
              <PerformanceBadge metric={project.metrics} icon="zap" />
            </div>
          )}

          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-8 right-8 px-4 py-2 glass-effect text-sm font-bold tracking-wide">
              FEATURED
            </div>
          )}
        </div>
      </motion.div>

      {/* Project Details */}
      <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
        {/* Project Header */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            {IconComponent && (
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--accent-primary-10)', color: 'var(--accent-primary)' }}>
                <IconComponent size={24} />
              </div>
            )}
            <div className="flex-1">
              <h3 className="text-3xl font-bold font-serif mb-1" style={{ color: 'var(--text-primary)' }}>{project.name}</h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{project.category}</p>
            </div>
          </div>

          <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{project.description}</p>

          {/* Expandable Full Description */}
          {project.fullDescription && (
            <div className="mt-4">
              <button
                onClick={() => onToggleExpand(project.name)}
                className="flex items-center text-sm transition-colors group"
                style={{ color: 'var(--accent-primary)' }}
                aria-expanded={isExpanded}
                aria-controls={`project-details-${project.name}`}
              >
                <Info size={16} className="mr-2" />
                <span>{isExpanded ? 'Show Less' : 'Show More Details'}</span>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-1"
                >
                  <ChevronDown size={16} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    id={`project-details-${project.name}`}
                    role="region"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="mt-4 leading-relaxed" style={{ color: 'var(--text-muted)' }}>{project.fullDescription}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Project Metrics */}
        {project.liveMetrics && <ProjectMetrics stats={project.liveMetrics} />}

        {/* Tech Stack */}
        <ProjectTechStack tech={project.tech} />

        {/* GitHub Stats */}
        {project.githubRepo && (
          <div className="pt-4" style={{ borderTop: '1px solid var(--border-primary)' }}>
            <GitHubStats
              owner={project.githubRepo.owner}
              repo={project.githubRepo.repo}
              compact={true}
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 pt-4">
          {project.github && (
            <Link href={project.github} target="_blank" rel="noopener noreferrer">
              <MagneticButton>
                <FaGithub size={20} />
                <span>Source Code</span>
                <Code size={16} />
              </MagneticButton>
            </Link>
          )}

          {project.live && project.live !== "#" && (
            <>
              <MagneticButton onClick={() => onOpenPreview(project.live!, project.name)}>
                <Eye size={20} />
                <span>Preview</span>
              </MagneticButton>

              <Link href={project.live} target="_blank" rel="noopener noreferrer">
                <MagneticButton>
                  <Globe size={20} />
                  <span>Open in Tab</span>
                  <ArrowUpRight size={16} />
                </MagneticButton>
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};
