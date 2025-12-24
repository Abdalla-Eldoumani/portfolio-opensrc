"use client";

import { ToastContainer } from './toast';
import { useToastStore } from '@/hooks/use-toast';

interface ToastProviderProps {
  children?: React.ReactNode;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

/**
 * Toast Provider Component
 * Place this at the root of your app (layout.tsx) to enable toasts globally
 *
 * Usage:
 * ```tsx
 * <ToastProvider position="top-right">
 *   {children}
 * </ToastProvider>
 * ```
 *
 * Then use the toast hook anywhere in your app:
 * ```tsx
 * const toast = useToast();
 * toast.success('Operation successful!');
 * ```
 */
export const ToastProvider = ({ children, position = 'top-right' }: ToastProviderProps) => {
  const { toasts, removeToast } = useToastStore();

  return (
    <>
      {children}
      <ToastContainer
        toasts={toasts}
        onDismiss={removeToast}
        position={position}
      />
    </>
  );
};
