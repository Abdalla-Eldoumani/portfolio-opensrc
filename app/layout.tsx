import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://abdallaeldoumani.vercel.app'),
  title: {
    default: "Abdalla Eldoumani - Software Developer",
    template: "%s | Abdalla Eldoumani"
  },

  description: "Computer Science student at University of Calgary specializing in systems programming, full-stack web development, and technical teaching. Building from registers to React.",

  keywords: [
    "Software Developer",
    "Software Engineer",
    "Systems Programmer",
    "Teaching Assistant",
    "Rust Developer",
    "C++ Developer",
    "TypeScript Developer",
    "React Developer",
    "Next.js Developer",
    "Computer Science",
    "University of Calgary",
    "Full Stack Developer",
    "Calgary Developer",
    "Web Development",
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
    url: "https://abdallaeldoumani.vercel.app",
    siteName: "Abdalla Eldoumani Portfolio",
    title: "Abdalla Eldoumani - Software Developer",
    description: "Computer Science student building high-performance systems and modern web applications. Specializing in Rust, C++, TypeScript, and React.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Abdalla Eldoumani - Software Developer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Abdalla Eldoumani - Software Developer",
    description: "Computer Science student building high-performance systems and modern web applications.",
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
    jobTitle: "Software Developer & Teaching Assistant",
    worksFor: {
      "@type": "EducationalOrganization",
      name: "University of Calgary",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "University of Calgary",
    },
    knowsAbout: [
      "Systems Programming",
      "Full Stack Development",
      "Rust Programming",
      "C/C++ Programming",
      "TypeScript",
      "React",
      "Next.js",
      "Computer Architecture",
      "Performance Optimization",
    ],
    description: "Computer Science student at University of Calgary specializing in systems programming, full-stack web development, and technical teaching.",
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
      <body className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} ${inter.className}`}>
        {children}
      </body>
    </html>
  );
}
