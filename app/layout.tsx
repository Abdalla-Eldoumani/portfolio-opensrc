import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SimpleCursor } from "@/components/ui/custom-cursor";
import "./globals.css";

const font = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://abdallaeldoumani.vercel.app'),
  title: {
    default: "Abdalla Eldoumani - Full Stack Developer & AI Engineer",
    template: "%s | Abdalla Eldoumani"
  },

  description: "Computer Science student at University of Calgary specializing in high-performance systems, AI/ML, and full-stack development. Creator of Rust HTTP servers handling 10k+ concurrent requests and performance-optimized C++ libraries achieving 25-41% gains over NumPy.",
  
  keywords: [
    "Full Stack Developer",
    "Software Engineer",
    "AI ML Engineer",
    "Rust Developer",
    "TypeScript Developer",
    "React Developer",
    "Next.js Developer",
    "Performance Optimization",
    "Computer Science",
    "University of Calgary",
    "High Performance Computing",
    "Cybersecurity",
    "Calgary Developer",
    "Web Development",
    "Software Development"
  ],

  authors: [{ name: "Abdalla Eldoumani", url: "https://github.com/Abdalla-Eldoumani" }],
  creator: "Abdalla Eldoumani",
  publisher: "Abdalla Eldoumani",
  
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://abdallaeldoumani.com",
    siteName: "Abdalla Eldoumani Portfolio",
    title: "Abdalla Eldoumani - Full Stack Developer & AI Engineer",
    description: "Computer Science student creating high-performance web applications and AI/ML solutions. Specializing in Rust, TypeScript, React, and Next.js. Open to new opportunities in 2025.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Abdalla Eldoumani - Full Stack Developer & AI Engineer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Abdalla Eldoumani - Full Stack Developer & AI Engineer",
    description: "Computer Science student creating high-performance web applications and AI/ML solutions.",
    images: ["/images/og-image.png"],
    creator: "@AbdallaEldoumani",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",
  verification: {
    google: "",
  },

  alternates: {
    canonical: "https://abdallaeldoumani.vercel.app",
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Abdalla Eldoumani",
    url: "https://abdallaeldoumani.vercel.app",
    image: "https://abdallaeldoumani.vercel.app/images/abdalla.jpg",
    sameAs: [
      "https://github.com/Abdalla-Eldoumani",
      "https://www.linkedin.com/in/abdallaeldoumani/",
    ],
    jobTitle: "Full Stack Developer & AI Engineer",
    worksFor: {
      "@type": "EducationalOrganization",
      name: "University of Calgary",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "University of Calgary",
    },
    knowsAbout: [
      "Full Stack Development",
      "Artificial Intelligence",
      "Machine Learning",
      "Rust Programming",
      "TypeScript",
      "React",
      "Next.js",
      "Performance Optimization",
      "Cybersecurity",
      "High Performance Computing",
    ],
    description: "Computer Science student at University of Calgary specializing in high-performance systems, AI/ML, and full-stack development.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Calgary",
      addressRegion: "Alberta",
      addressCountry: "Canada",
    },
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={font.className}>
        <SimpleCursor />
        {children}
      </body>
    </html>
  );
}