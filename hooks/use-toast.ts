import { create } from 'zustand';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastStore {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  clearAll: () => void;
}

/**
 * Toast notification store using Zustand
 * Provides centralized toast management with queue support
 */
export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],

  addToast: (toast) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: Toast = {
      id,
      duration: 5000, // Default 5 seconds
      ...toast,
    };

    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));

    // Auto-dismiss after duration
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }));
      }, newToast.duration);
    }

    return id;
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },

  clearAll: () => {
    set({ toasts: [] });
  },
}));

/**
 * Convenient hook for triggering toasts
 * Usage:
 *
 * const toast = useToast();
 * toast.success('Operation completed!');
 * toast.error('Something went wrong', { duration: 10000 });
 */
export const useToast = () => {
  const { addToast, removeToast, clearAll } = useToastStore();

  return {
    success: (title: string, options?: Partial<Omit<Toast, 'id' | 'type' | 'title'>>) => {
      return addToast({ type: 'success', title, ...options });
    },

    error: (title: string, options?: Partial<Omit<Toast, 'id' | 'type' | 'title'>>) => {
      return addToast({ type: 'error', title, ...options });
    },

    info: (title: string, options?: Partial<Omit<Toast, 'id' | 'type' | 'title'>>) => {
      return addToast({ type: 'info', title, ...options });
    },

    warning: (title: string, options?: Partial<Omit<Toast, 'id' | 'type' | 'title'>>) => {
      return addToast({ type: 'warning', title, ...options });
    },

    custom: (toast: Omit<Toast, 'id'>) => {
      return addToast(toast);
    },

    dismiss: (id: string) => {
      removeToast(id);
    },

    dismissAll: () => {
      clearAll();
    },
  };
};

/**
 * Predefined toast helpers for common actions
 */
// Toast helpers disabled due to circular type reference - can be re-enabled with proper typing
/* export const toastHelpers = {
  clipboardCopy: (useToast: ReturnType<typeof useToast>) => {
    useToast.success('Copied to clipboard', {
      description: 'Text has been copied to your clipboard',
      duration: 3000,
    });
  },

  resumeDownload: (useToast: ReturnType<typeof useToast>) => {
    useToast.success('Resume downloaded', {
      description: 'Check your downloads folder',
      duration: 4000,
    });
  },

  githubError: (useToast: ReturnType<typeof useToast>) => {
    useToast.error('Failed to fetch GitHub stats', {
      description: 'Showing cached data. Rate limit may have been reached.',
      duration: 6000,
    });
  },

  commandPaletteHint: (useToast: ReturnType<typeof useToast>) => {
    useToast.info('Quick tip', {
      description: 'Press Ctrl+K (Cmd+K on Mac) to open command palette',
      duration: 5000,
    });
  },
}; */
