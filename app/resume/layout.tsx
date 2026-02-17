import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume',
  description:
    'View and download Abdalla Eldoumani\'s resume. Computer Science student at the University of Calgary specializing in systems programming and full-stack web development.',
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
