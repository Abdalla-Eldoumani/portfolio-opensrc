"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { Toast as ToastType } from '@/hooks/use-toast';

interface ToastProps {
  toast: ToastType;
  onDismiss: (id: string) => void;
}

const toastConfig = {
  success: {
    icon: CheckCircle2,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
    progressBar: 'bg-green-500',
  },
  error: {
    icon: XCircle,
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    progressBar: 'bg-red-500',
  },
  info: {
    icon: Info,
    color: 'text-[var(--accent-primary)]',
    bg: 'bg-[var(--accent-primary)]/10',
    border: 'border-[var(--accent-primary)]/20',
    progressBar: 'bg-[var(--accent-primary)]',
  },
  warning: {
    icon: AlertTriangle,
    color: 'text-[var(--accent-primary)]',
    bg: 'bg-[var(--accent-primary)]/10',
    border: 'border-[var(--accent-primary)]/20',
    progressBar: 'bg-[var(--accent-primary)]',
  },
};

/**
 * Individual toast notification component
 * Features auto-dismiss, pause on hover, progress indicator
 */
export const Toast = ({ toast, onDismiss }: ToastProps) => {
  const config = toastConfig[toast.type];
  const Icon = config.icon;
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(100);
  const startTimeRef = useRef<number>(Date.now());
  const remainingTimeRef = useRef<number>(toast.duration || 5000);

  useEffect(() => {
    if (!toast.duration || toast.duration <= 0) return;

    let animationFrameId: number;
    let lastTimestamp = Date.now();

    const updateProgress = () => {
      if (isPaused) {
        lastTimestamp = Date.now();
        animationFrameId = requestAnimationFrame(updateProgress);
        return;
      }

      const now = Date.now();
      const elapsed = now - lastTimestamp;
      lastTimestamp = now;

      remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed);
      const newProgress = (remainingTimeRef.current / toast.duration!) * 100;
      setProgress(newProgress);

      if (remainingTimeRef.current > 0) {
        animationFrameId = requestAnimationFrame(updateProgress);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPaused, toast.duration]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      className={`
        relative flex items-start gap-3 p-4 pr-12 rounded-xl
        ${config.bg} ${config.border} border backdrop-blur-sm
        shadow-lg max-w-sm sm:max-w-md w-full
        group
      `}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Icon */}
      <div className={`${config.color} mt-0.5 shrink-0`}>
        <Icon size={20} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold leading-tight mb-0.5" style={{ color: 'var(--text-primary)' }}>
          {toast.title}
        </h4>
        {toast.description && (
          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {toast.description}
          </p>
        )}
        {toast.action && (
          <button
            onClick={toast.action.onClick}
            className={`
              mt-2 text-xs font-medium ${config.color}
              hover:underline focus:outline-none focus:underline
            `}
          >
            {toast.action.label}
          </button>
        )}
      </div>

      {/* Close button */}
      <button
        onClick={() => onDismiss(toast.id)}
        className="
          absolute top-3 right-3 p-1 rounded-lg
          text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--text-primary)]/10
          transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]
        "
        aria-label="Dismiss notification"
      >
        <X size={16} />
      </button>

      {/* Progress bar */}
      {toast.duration && toast.duration > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-xl overflow-hidden" style={{ backgroundColor: 'var(--tertiary-bg)' }}>
          <motion.div
            className={`h-full ${config.progressBar}`}
            style={{ width: `${progress}%` }}
            initial={{ width: '100%' }}
            transition={{ duration: 0.1, ease: 'linear' }}
          />
        </div>
      )}
    </motion.div>
  );
};

interface ToastContainerProps {
  toasts: ToastType[];
  onDismiss: (id: string) => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

/**
 * Toast container component - renders all active toasts
 */
export const ToastContainer = ({
  toasts,
  onDismiss,
  position = 'top-right',
}: ToastContainerProps) => {
  const positionClasses = {
    'top-right': 'top-4 right-4 items-end',
    'top-left': 'top-4 left-4 items-start',
    'bottom-right': 'bottom-4 right-4 items-end',
    'bottom-left': 'bottom-4 left-4 items-start',
    'top-center': 'top-4 left-1/2 -translate-x-1/2 items-center',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2 items-center',
  };

  return (
    <div
      className={`fixed ${positionClasses[position]} z-[9999] flex flex-col gap-3 pointer-events-none max-h-screen overflow-hidden p-4`}
      aria-label="Notifications"
      role="region"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast toast={toast} onDismiss={onDismiss} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};
