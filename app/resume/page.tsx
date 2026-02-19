import { ResumeHeader } from '@/components/resume/resume-header';
import { ToastProvider } from '@/components/ui/toast-provider';

const SITE_URL = 'https://abdallaeldoumani.vercel.app';

/**
 * In production, use Google Docs Viewer to render the PDF as HTML.
 * This bypasses browser PDF plugin issues on Vercel's CDN.
 * In development, use a direct iframe (works fine on localhost).
 */
const pdfSrc =
  process.env.NODE_ENV === 'production'
    ? `https://docs.google.com/gview?url=${encodeURIComponent(`${SITE_URL}/my-resume.pdf`)}&embedded=true`
    : '/my-resume.pdf';

export default function ResumePage() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: 'var(--primary-bg)' }}
    >
      <ToastProvider>
        <ResumeHeader />
      </ToastProvider>

      {/* PDF panel — server-rendered */}
      <div
        id="panel-pdf"
        role="tabpanel"
        aria-labelledby="tab-pdf"
        className="flex-1 flex flex-col"
        style={{ display: 'flex' }}
      >
        <iframe
          src={pdfSrc}
          className="flex-1 w-full"
          style={{ minHeight: 'calc(100vh - 4rem)', border: 'none' }}
          title="Abdalla Eldoumani's Resume"
          allow="autoplay"
        />
      </div>
    </div>
  );
}
