import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — Page Not Found',
};

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ backgroundColor: 'var(--primary-bg)', color: 'var(--text-primary)' }}
    >
      {/* Terminal prompt */}
      <p
        className="font-mono text-sm mb-8 tracking-wide"
        style={{ color: 'var(--text-muted)' }}
      >
        <span style={{ color: 'var(--accent-primary)' }}>~</span>/abdalla-eldoumani
      </p>

      {/* 404 */}
      <h1 className="font-serif text-display sm:text-9xl mb-4" style={{ fontSize: 'clamp(4rem, 20vw, 9rem)' }}>
        <span className="text-gradient">404</span>
      </h1>

      {/* Message */}
      <p
        className="text-lg sm:text-xl text-center max-w-md mb-2"
        style={{ color: 'var(--text-secondary)' }}
      >
        This page doesn&apos;t exist.
      </p>
      <p
        className="font-mono text-sm text-center max-w-md mb-12"
        style={{ color: 'var(--text-muted)' }}
      >
        segfault — the address you requested is outside the mapped region.
      </p>

      {/* Back home */}
      <Link
        href="/"
        className="group inline-flex items-center gap-3 px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 hover-glow"
        style={{
          backgroundColor: 'var(--accent-primary-10)',
          color: 'var(--accent-primary)',
          border: '1px solid var(--accent-primary-30)',
        }}
      >
        <span
          className="font-mono text-xs transition-transform duration-300 group-hover:-translate-x-1"
          aria-hidden="true"
        >
          &lt;-
        </span>
        Return home
      </Link>

      {/* Decorative terminal lines */}
      <div
        className="mt-16 font-mono text-xs space-y-1 text-center"
        style={{ color: 'var(--text-muted)' }}
        aria-hidden="true"
      >
        <p><span style={{ color: 'var(--accent-primary)' }}>$</span> curl -I /this-page</p>
        <p>HTTP/1.1 404 Not Found</p>
        <p>x-powered-by: next.js, caffeine, curiosity</p>
      </div>
    </div>
  );
}
