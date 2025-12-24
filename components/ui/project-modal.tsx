"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useCallback, useState } from 'react';
import { X, ExternalLink, Loader2, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { MagneticButton } from './magnetic-button';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectUrl: string;
  projectName: string;
  allowExternalPreview?: boolean; // If false, show iframe; if true, just link
}

/**
 * Project preview modal with iframe
 * Features: Escape key to close, click outside to close, loading states
 * Gracefully handles iframe errors and cross-origin restrictions
 */
export const ProjectModal = ({
  isOpen,
  onClose,
  projectUrl,
  projectName,
  allowExternalPreview = true,
}: ProjectModalProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Reset states when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setHasError(false);
    }
  }, [isOpen, projectUrl]);

  // Handle iframe load
  const handleIframeLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Handle iframe error
  const handleIframeError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  // Backdrop click handler
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Backdrop blur */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Modal content */}
          <motion.div
            className="relative w-full max-w-7xl max-h-[90vh] glass-effect rounded-2xl overflow-hidden shadow-2xl"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gray-900/50">
              <div className="flex items-center gap-3">
                <h2
                  id="modal-title"
                  className="text-xl font-bold text-white"
                >
                  {projectName}
                </h2>
                {!hasError && (
                  <span className="px-2 py-1 text-xs font-medium text-emerald-400 bg-emerald-400/10 rounded-full">
                    Live Preview
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {/* Open in new tab button */}
                <motion.a
                  href={projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-300 hover:text-white border border-gray-600 hover:border-gray-400 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Open ${projectName} in new tab`}
                >
                  <ExternalLink size={14} />
                  <span className="hidden sm:inline">Open in Tab</span>
                </motion.a>

                {/* Close button */}
                <motion.button
                  onClick={onClose}
                  className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close modal"
                >
                  <X size={20} />
                </motion.button>
              </div>
            </div>

            {/* Content area */}
            <div className="relative w-full h-[calc(90vh-80px)] bg-gray-950">
              {/* Loading state */}
              {isLoading && !hasError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-gray-400">
                  <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
                  <p className="text-sm">Loading preview...</p>
                </div>
              )}

              {/* Error state */}
              {hasError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-gray-400 p-8">
                  <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center">
                    <AlertCircle className="w-8 h-8 text-orange-500" />
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-lg font-semibold text-white">
                      Preview Unavailable
                    </p>
                    <p className="text-sm text-gray-400 max-w-md">
                      This project cannot be previewed in an embedded frame due to security restrictions.
                      Please click &ldquo;Open in Tab&rdquo; to view the live site.
                    </p>
                  </div>
                  <a
                    href={projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4"
                  >
                    <MagneticButton className="flex items-center gap-2 glass-effect px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-white/10">
                      <ExternalLink size={18} />
                      Open in New Tab
                    </MagneticButton>
                  </a>
                </div>
              )}

              {/* Iframe preview */}
              {!hasError && (
                <iframe
                  src={projectUrl}
                  title={`${projectName} live preview`}
                  className="w-full h-full border-0"
                  onLoad={handleIframeLoad}
                  onError={handleIframeError}
                  sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                  loading="lazy"
                />
              )}
            </div>

            {/* Footer hint */}
            <div className="px-4 py-2 border-t border-white/10 bg-gray-900/50 text-xs text-gray-500 flex items-center justify-between">
              <span>Press <kbd className="px-1.5 py-0.5 bg-gray-800 rounded text-gray-400 border border-gray-700">Esc</kbd> to close</span>
              <span className="hidden sm:inline">Click outside to dismiss</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * Hook to manage project modal state
 * Returns: isOpen, open, close handlers
 */
export const useProjectModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<{
    url: string;
    name: string;
  } | null>(null);

  const openModal = useCallback((url: string, name: string) => {
    setCurrentProject({ url, name });
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    // Delay clearing project to allow exit animation
    setTimeout(() => setCurrentProject(null), 300);
  }, []);

  return {
    isOpen,
    currentProject,
    openModal,
    closeModal,
  };
};

/**
 * Lightweight modal for quick project info
 * Alternative to full iframe preview
 */
interface QuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    name: string;
    description: string;
    fullDescription?: string;
    image: string;
    tech: string[];
    github?: string;
    live?: string;
  };
}

export const QuickViewModal = ({
  isOpen,
  onClose,
  project,
}: QuickViewModalProps) => {
  // Close on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && onClose()}
          role="dialog"
          aria-modal="true"
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          <motion.div
            className="relative w-full max-w-2xl glass-effect rounded-2xl overflow-hidden shadow-2xl"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-900/80 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {/* Image */}
            <div className="relative h-64 overflow-hidden">
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 600px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <h2 className="text-2xl font-bold text-white">{project.name}</h2>

              <p className="text-gray-300 leading-relaxed">
                {project.fullDescription || project.description}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-sm font-medium text-gray-300 bg-gray-800/50 rounded-full border border-gray-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <MagneticButton className="w-full flex items-center justify-center gap-2 glass-effect px-4 py-2 rounded-lg font-semibold hover:bg-white/10">
                      <ExternalLink size={16} />
                      Live Demo
                    </MagneticButton>
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <MagneticButton className="w-full flex items-center justify-center gap-2 border border-gray-600 hover:border-gray-400 px-4 py-2 rounded-lg font-semibold hover:bg-white/5">
                      Source Code
                    </MagneticButton>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
