"use client";

import { motion } from 'framer-motion';
import { ProjectModal, useProjectModal } from '@/components/ui/project-modal';
import { projects as projectsData } from '@/lib/data/projects';
import { ProjectCard } from './project-card';
import { useState } from 'react';
import { motionVariants, animationConfigs } from '@/lib/constants/animations';

/**
 * Projects Section - Main component
 * Showcase of featured projects with comprehensive details
 */
export const ProjectsSection = () => {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const { isOpen, currentProject, openModal, closeModal } = useProjectModal();

  const toggleExpand = (projectName: string) => {
    setExpandedProject(expandedProject === projectName ? null : projectName);
  };

  return (
    <section className="py-20 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={motionVariants.swissEntrance.hidden}
          whileInView={motionVariants.swissEntrance.visible}
          transition={{ duration: 0.6, ease: animationConfigs.entrance.ease }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-display text-4xl sm:text-5xl mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-body text-xl max-w-3xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            A showcase of innovative projects demonstrating expertise in performance optimization,
            AI integration, cybersecurity, and full-stack development.
          </p>
        </motion.div>

        {/* Featured Projects Grid */}
        <div className="space-y-16">
          {projectsData.map((project, index) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={index}
              isExpanded={expandedProject === project.name}
              onToggleExpand={toggleExpand}
              onOpenPreview={openModal}
            />
          ))}
        </div>

        {/* Project Preview Modal */}
        <ProjectModal
          isOpen={isOpen}
          onClose={closeModal}
          projectUrl={currentProject?.url || ''}
          projectName={currentProject?.name || ''}
        />
      </div>
    </section>
  );
};
