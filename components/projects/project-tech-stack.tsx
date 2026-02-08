"use client";

import { Code } from 'lucide-react';
import { TechBadge } from '@/components/ui/tech-badge';

interface ProjectTechStackProps {
  tech: string[];
}

/**
 * Project Tech Stack Component
 * Displays technologies used with rich tooltips
 */
export const ProjectTechStack = ({ tech }: ProjectTechStackProps) => {
  return (
    <div>
      <h4 className="text-lg font-semibold mb-4 flex items-center" style={{ color: 'var(--text-secondary)' }}>
        <Code className="w-5 h-5 mr-2" style={{ color: 'var(--accent-secondary)' }} />
        Tech Stack
      </h4>
      <div className="flex flex-wrap gap-2">
        {tech.map((techItem, techIndex) => (
          <TechBadge
            key={techItem}
            name={techItem}
            delay={techIndex * 0.05}
            showTooltip={true}
          />
        ))}
      </div>
    </div>
  );
};
