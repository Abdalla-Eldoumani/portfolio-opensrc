'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, FileDown, Copy, Check, FileText, Code } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ResumeHeader() {
  const [activeTab, setActiveTab] = useState<'pdf' | 'latex'>('pdf');
  const [latexSource, setLatexSource] = useState('');
  const [loadingLatex, setLoadingLatex] = useState(false);
  const [copied, setCopied] = useState(false);
  const copiedTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const toast = useToast();

  // Toggle panel visibility via DOM — keeps iframe outside React's render tree
  useEffect(() => {
    const pdfPanel = document.getElementById('panel-pdf');
    const latexPanel = document.getElementById('panel-latex');
    if (pdfPanel) pdfPanel.style.display = activeTab === 'pdf' ? 'flex' : 'none';
    if (latexPanel) latexPanel.style.display = activeTab === 'latex' ? 'flex' : 'none';
  }, [activeTab]);

  useEffect(() => {
    if (activeTab === 'latex' && !latexSource) {
      const controller = new AbortController();
      setLoadingLatex(true);
      fetch('/my-resume.tex', { signal: controller.signal })
        .then((r) => r.text())
        .then((text) => {
          setLatexSource(text);
          setLoadingLatex(false);
        })
        .catch((err) => {
          if (err.name !== 'AbortError') {
            setLatexSource('% Failed to load LaTeX source.');
            setLoadingLatex(false);
          }
        });
      return () => controller.abort();
    }
  }, [activeTab, latexSource]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (copiedTimeoutRef.current) clearTimeout(copiedTimeoutRef.current);
    };
  }, []);

  const handleCopyLatex = useCallback(async () => {
    let source = latexSource;
    if (!source) {
      try {
        const res = await fetch('/my-resume.tex');
        source = await res.text();
        setLatexSource(source);
      } catch {
        toast.error('Failed to load LaTeX source');
        return;
      }
    }
    try {
      await navigator.clipboard.writeText(source);
      setCopied(true);
      toast.success('Copied to clipboard', {
        description: 'LaTeX source has been copied',
        duration: 3000,
      });
      if (copiedTimeoutRef.current) clearTimeout(copiedTimeoutRef.current);
      copiedTimeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy', {
        description: 'Could not access clipboard',
        duration: 3000,
      });
    }
  }, [latexSource, toast]);

  const tabs = [
    { id: 'pdf' as const, label: 'View Resume', icon: FileText },
    { id: 'latex' as const, label: 'LaTeX Source', icon: Code },
  ];

  return (
    <>
      <header
        className="glass-effect sticky top-0 z-40 border-b"
        style={{ borderColor: 'var(--border-primary)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-3 sm:py-4">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="group inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
                style={{ color: 'var(--text-secondary)' }}
              >
                <ArrowLeft
                  size={16}
                  className="transition-transform duration-200 group-hover:-translate-x-1"
                  aria-hidden="true"
                />
                <span className="hidden sm:inline">Portfolio</span>
              </Link>
              <h1
                className="font-serif text-lg sm:text-xl font-semibold"
                style={{ color: 'var(--text-primary)' }}
              >
                Resume
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Tab buttons */}
              <div
                className="flex rounded-lg p-0.5"
                style={{ backgroundColor: 'var(--secondary-bg)' }}
                role="tablist"
                aria-label="Resume view"
              >
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`panel-${tab.id}`}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200"
                      style={{
                        color: isActive ? 'var(--accent-primary)' : 'var(--text-muted)',
                        backgroundColor: isActive ? 'var(--accent-primary-10)' : 'transparent',
                      }}
                    >
                      <Icon size={14} aria-hidden="true" />
                      <span className="hidden xs:inline">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              <div
                className="hidden sm:block w-px h-6"
                style={{ backgroundColor: 'var(--border-primary)' }}
                aria-hidden="true"
              />

              {/* Action buttons */}
              <div className="flex items-center gap-1.5">
                <a
                  href="/my-resume.pdf"
                  download="Abdalla_Eldoumani_Resume.pdf"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 hover-glow"
                  style={{ color: 'var(--text-secondary)' }}
                  aria-label="Download resume as PDF"
                >
                  <FileDown size={14} aria-hidden="true" />
                  <span className="hidden md:inline">PDF</span>
                </a>

                <a
                  href="/my-resume.tex"
                  download="Abdalla_Eldoumani_Resume.tex"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 hover-glow"
                  style={{ color: 'var(--text-secondary)' }}
                  aria-label="Download resume as LaTeX source"
                >
                  <FileDown size={14} aria-hidden="true" />
                  <span className="hidden md:inline">.tex</span>
                </a>

                <button
                  onClick={handleCopyLatex}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 hover-glow"
                  style={{
                    color: copied ? 'var(--color-success)' : 'var(--text-secondary)',
                  }}
                  aria-label={copied ? 'LaTeX copied' : 'Copy LaTeX source to clipboard'}
                >
                  {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
                  <span className="hidden md:inline">{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* LaTeX panel — rendered by client component, hidden by default */}
      <div
        id="panel-latex"
        role="tabpanel"
        aria-labelledby="tab-latex"
        className="flex-1 flex-col"
        style={{ display: 'none' }}
      >
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-1">
          <div
            className="rounded-lg border overflow-hidden"
            style={{
              backgroundColor: 'var(--secondary-bg)',
              borderColor: 'var(--border-primary)',
            }}
          >
            <div
              className="flex items-center justify-between px-4 py-2 border-b"
              style={{
                backgroundColor: 'var(--tertiary-bg)',
                borderColor: 'var(--border-primary)',
              }}
            >
              <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                my-resume.tex
              </span>
              <button
                onClick={handleCopyLatex}
                className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-colors duration-200"
                style={{ color: copied ? 'var(--color-success)' : 'var(--text-muted)' }}
                aria-label={copied ? 'LaTeX copied' : 'Copy LaTeX to clipboard'}
              >
                {copied ? <Check size={12} aria-hidden="true" /> : <Copy size={12} aria-hidden="true" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>

            <div className="overflow-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
              {loadingLatex ? (
                <div className="p-8 flex items-center justify-center">
                  <span className="font-mono text-sm" style={{ color: 'var(--text-muted)' }}>
                    Loading LaTeX source...
                  </span>
                </div>
              ) : (
                <pre
                  className="p-4 font-mono text-sm leading-relaxed overflow-x-auto"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <code>{latexSource}</code>
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
