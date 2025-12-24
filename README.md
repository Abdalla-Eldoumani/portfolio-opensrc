# Abdalla Eldoumani - Portfolio Website

A production-grade portfolio showcasing exceptional frontend craftsmanship and attention to detail. Built with Next.js 14, TypeScript, and Tailwind CSS, featuring refined typography, sophisticated interactions, and a command palette for keyboard-first navigation.

**Live Demo:** [View Portfolio](https://abdallaeldoumani.vercel.app/)

## About Me

I'm a Computer Science student at the University of Calgary specializing in high-performance systems, AI/ML, and full-stack development. Creator of Rust HTTP servers handling 10k+ concurrent requests and performance-optimized C++ libraries achieving 25-41% gains over NumPy.

## Key Features

### Signature Interactions
- **Command Palette (Cmd+K)**: Professional keyboard-first navigation with fuzzy search
- **Interactive Skills Constellation**: Force-directed graph visualization with proficiency-based sizing, project-based connections, zoom & pan (0.5x-2.0x with Ctrl/Cmd modifier), smart tooltip positioning, and optimized height (400px/500px) - no scroll interference
- **Magnetic Button System**: Physics-based magnetic attraction with configurable strength (0.1-0.5), creating premium playful interactions on CTAs and icon buttons
- **Animated Performance Counters**: Spring-animated metrics with tabular figures, perfect for showcasing technical achievements with visual impact
- **Scroll Progress Indicator**: Smooth gradient progress bar with physics-based spring animation tracking page scroll
- **Particle Network System**: Canvas-based animated particle field with dynamic connections in hero section
- **Magnetic Card Effects**: 3D perspective tilt on hover with spring physics for premium feel
- **Progressive Disclosure**: Expandable project cards revealing technical deep-dives on demand
- **Refined Micro-interactions**: Spring physics animations (cubic-bezier 0.34, 1.56, 0.64, 1) with purposeful feedback
- **Performance Badges**: Animated metric displays showcasing technical achievements

### Visual Excellence
- **Swiss Design Meets Modern Web**: Deliberate color palette beyond typical dark themes
- **Custom SVG Illustrations**: Hand-crafted technical diagrams for FastMathExt and Self-Checkout projects, eliminating AI-generated imagery
- **Advanced Typography System**:
  - Inter font family with optimized weights (300-800) and `font-display: swap`
  - Fluid sizing with `clamp()` functions (2.5rem - 4.5rem for h1)
  - Optical letter-spacing (-0.04em to -0.01em based on hierarchy)
  - OpenType features: kerning, ligatures, contextual alternates, tabular figures
  - Text wrapping optimization: `text-wrap: balance` for headings, `pretty` for paragraphs
- **Refined Glassmorphism**: Functional backdrop blur with elevated shadows
- **Enhanced Card System**: Top-border gradient reveals, magnetic 3D tilt, and elevation on hover
- **Gradient Border Animations**: Rotating multi-color borders for premium visual hierarchy
- **Custom Selection Colors**: Brand-consistent text selection and focus states

### Performance Optimized
- **Progressive Image Loading**: Blur-up effect with 700ms transitions
- **GPU Acceleration**: `transform: translateZ(0)`, `backface-visibility: hidden`, perspective optimization
- **IntersectionObserver**: Custom hooks for scroll-triggered animations (replacing AOS)
- **Conditional Will-Change**: Applied only during active interactions for optimal performance
- **Bundle Optimization**: Strategic package imports, 192 kB First Load JS
- **Production Ready**: Zero TypeScript errors, clean static generation
- **Accessibility First**: WCAG compliant with refined focus-visible states and reduced motion support

### SEO Excellence
- **Comprehensive Metadata**: Enhanced Open Graph, Twitter Cards, and meta descriptions
- **Structured Data (JSON-LD)**: Schema.org Person markup for rich search results
- **Dynamic Sitemap**: Auto-generated XML sitemap for search engine crawling
- **Robots.txt**: Optimized crawler guidance with sitemap reference
- **Web Manifest**: PWA-ready with custom theme colors and icons
- **Semantic HTML**: Proper heading hierarchy and ARIA labels
- **Mobile-First Indexing**: Fully responsive with touch-optimized interactions

## Technologies Used

### Core Framework
- **Next.js 14** - React framework with App Router and experimental optimizations
- **TypeScript** - Type-safe development with strict mode
- **Tailwind CSS** - Utility-first CSS with custom design system

### Animations & UI
- **Framer Motion** - Spring physics and orchestrated animations
- **Lucide React** - Consistent iconography (optimized imports)
- **React Icons** - Extended icon library with Simple Icons

### Design System
- **Custom CSS Variables** - Semantic color tokens and elevation system
- **Typography Scale** - Optical sizing with OpenType features
- **Motion Design** - Cubic-bezier easing with reduced motion support

### Development Tools
- **ESLint** - Code quality and Next.js best practices
- **PostCSS** - CSS processing with Tailwind optimizations

## Featured Projects

### Rust HTTP Server
Production-ready HTTP server handling **10,000+ concurrent requests** with <10ms response time.
- **Tech:** Rust, Axum, SQLite, WebSocket, JWT Authentication
- **Performance:** 60% reduction in database queries, sub-100ms search responses

### FastMathExt
High-performance C++ matrix multiplication library achieving **25-41% performance gains** over NumPy through advanced optimization techniques.
- **Tech:** C++, OpenMP, AVX2 SIMD, Multi-level Cache Blocking
- **Performance:** O(n^3) to O(n^2.807) complexity reduction using Strassen's algorithm

### Budget Buddy
CalgaryHacks24 winning project - A full-stack financial platform for young Canadian investors.
- **Tech:** Next.js, Supabase, TypeScript, TailwindCSS
- **Impact:** Addresses the issue that 70% of young Canadians avoid stock market investing

### Interactive Cybersecurity Site
Educational platform demonstrating cybersecurity concepts with interactive simulations.
- **Tech:** React, Node.js, MongoDB, Express.js

### AI-Platform
Multi-model AI platform integrating OpenAI's latest models with modern web technologies.
- **Tech:** Next.js, TypeScript, OpenAI API, Prisma, MySQL, Stripe

## Project Structure

```
portfolio_website/
├── app/                    # Next.js App Router
│   ├── resume/            # Resume page
│   ├── globals.css        # Design system with CSS variables & advanced animations
│   ├── layout.tsx         # Root layout with metadata & JSON-LD
│   ├── page.tsx          # Homepage composition
│   ├── sitemap.ts         # Dynamic XML sitemap generation
│   └── robots.ts          # Robots.txt for crawler guidance
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   │   ├── animated-counter.tsx    # Physics-based spring animated counters
│   │   ├── blur-image.tsx          # Progressive image loading component
│   │   ├── magnetic-button.tsx     # Magnetic attraction button with physics
│   │   ├── magnetic-card.tsx       # 3D tilt effect with spring physics
│   │   ├── particle-field.tsx      # Canvas-based particle network
│   │   ├── performance-badge.tsx   # Animated metric badges
│   │   ├── scroll-progress.tsx     # Smooth scroll progress indicator
│   │   ├── scroll-reveal.tsx       # Scroll-triggered animations
│   │   └── skill-constellation.tsx # Interactive skills graph (signature)
│   ├── about.tsx         # About with magnetic buttons and highlight cards
│   ├── command-palette.tsx # ⌘K command palette (signature feature)
│   ├── contact.tsx       # Elevated contact section
│   ├── experience.tsx    # Timeline with achievements
│   ├── hero-section.tsx  # Hero with magnetic buttons and particle field
│   ├── navbar.tsx        # Active section navigation
│   ├── projects.tsx      # Projects with animated metrics and magnetic CTAs
│   └── skills.tsx        # Skills constellation + category grid
├── hooks/                # Custom React hooks
│   └── use-intersection.ts # IntersectionObserver hook for performance
├── lib/                  # Utility functions
│   └── utils.ts         # Tailwind merge utilities
├── public/              # Static assets
│   ├── images/         # Optimized project images
│   ├── my-resume.pdf   # Resume document
│   └── site.webmanifest # PWA manifest file
├── next.config.mjs      # Image optimization config
└── tailwind.config.ts   # Extended design tokens
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Abdalla-Eldoumani/portfolio-website.git
cd portfolio-website
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

4. **Open your browser**
Visit [http://localhost:3000](http://localhost:3000) to see the portfolio.

### Build for Production

```bash
npm run build
npm start
```

## Design Philosophy

**"Swiss design meets modern web"** - Craftsmanship over flashiness:

### Visual Hierarchy
- **Optical Typography**: Letter-spacing adjustments (-0.03em for h1, -0.025em for h2)
- **Font Features**: Kerning, ligatures, contextual alternates, tabular figures
- **Text Balancing**: Automatic line balancing for headlines

### Color System
- **Semantic Variables**: `--accent-primary`, `--text-secondary`, `--shadow-elevated`
- **Refined Palette**: Beyond typical dark theme (#0a0b0f base, #06b6d4 accent cyan)
- **Custom Selection**: Brand-consistent text selection (`rgba(6, 182, 212, 0.25)`)

### Interaction Design
- **Meaningful Animations**: Reduced intensity, cubic-bezier(0.4, 0, 0.2, 1) easing
- **Spring Physics**: Natural feel on skill card hover interactions
- **Purposeful Feedback**: 1px lifts with shadow elevation, scale(0.98) on press

### Accessibility
- **Focus-Visible States**: 2px rings with proper offset, no generic outline
- **Keyboard Navigation**: Command palette, arrow key support, Tab traversal
- **Reduced Motion**: Respects `prefers-reduced-motion` preference
- **High Contrast**: Compatible with `prefers-contrast: high`

## Performance Metrics

- **First Load JS**: 196 kB (optimized bundle splitting with enhanced interactive components)
- **Image Optimization**: Progressive blur-up loading, AVIF/WebP formats, responsive sizing
- **Static Generation**: Pre-rendered pages for instant loading
- **Animation Performance**: GPU-accelerated transforms, conditional will-change, spring physics
- **Accessibility**: WCAG 2.1 AA compliant with enhanced focus states, ARIA labels, keyboard navigation
- **Responsive**: Fluid typography with clamp(), optimized breakpoints (320px, 640px, 768px, 1024px, 1920px)
- **SEO Score**: Comprehensive metadata, structured data, dynamic sitemap, robots.txt

## What Makes It Stand Out

1. **Interactive Skills Constellation**: Unique force-directed graph visualization with proficiency-based node sizing, project-based skill connections, zoom & pan functionality (Ctrl/Cmd + wheel), smart tooltip positioning with viewport boundary detection, and optimized height (400px/500px) - normal scrolling works seamlessly, demonstrates advanced React and animation expertise
2. **Magnetic Button System**: Physics-based attraction effects on all CTAs and social icons with configurable strength (damping: 20, stiffness: 300), creating premium playful interactions - rare in portfolios, creates memorable UX
3. **Animated Performance Metrics**: Spring-animated counters with tabular figures showcasing live project metrics (10k+ requests, <10ms response, 60% cache efficiency) - technical achievements presented with visual impact
4. **Command Palette** (`⌘K`): Keyboard-first navigation with fuzzy search - immediate signal of technical sophistication
5. **Scroll Progress Indicator**: Elegant gradient progress bar with smooth spring physics tracking reading position
6. **Particle Network System**: Canvas-based animated background with dynamic particle connections and optimized RAF loop - subtle but sophisticated
7. **Magnetic Card Interactions**: 3D perspective tilt effects with spring physics (damping: 20, stiffness: 150) for premium tactile feel
8. **Progressive Disclosure**: Expandable project cards with smooth height animations revealing technical deep-dives
9. **Typography Excellence**: Inter font with fluid sizing, optical letter-spacing (-0.04em to -0.01em), OpenType features (kerning, ligatures, tabular figures)
10. **Performance-First Architecture**: GPU acceleration, IntersectionObserver-based scroll animations, progressive image loading with blur-up effects
11. **Refined Animations**: Spring physics (cubic-bezier 0.34, 1.56, 0.64, 1), purposeful micro-interactions, and proper easing curves
12. **Design System**: Semantic CSS variables, custom scrollbar, modular typography scale, and Swiss-inspired visual hierarchy
13. **Production Quality**: Custom React hooks, reusable UI components, TypeScript strictness, zero build errors

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Abdalla-Eldoumani/portfolio-website.git
cd portfolio-website

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build    # Creates optimized production build
npm start        # Serves production build
```

## Keyboard Shortcuts

- **Cmd+K / Ctrl+K**: Open command palette
- **↑↓**: Navigate commands
- **Enter**: Execute selected command
- **Esc**: Close command palette
- **1-6**: Quick section navigation
- **g**: Open GitHub profile
- **l**: Open LinkedIn profile
- **r**: Download resume
- **Ctrl/Cmd + Scroll**: Zoom skills constellation (0.5x-2.0x)
- **Click & Drag**: Pan skills constellation when zoomed

## Recent Enhancements

### Performance & Architecture
- **Data Layer Extraction**: Separated data definitions into typed modules (lib/data/projects.ts, lib/data/skills.ts, lib/data/experience.ts) with comprehensive TypeScript interfaces for maintainability
- **Animation System Centralization**: Consolidated Framer Motion configurations into lib/constants/animations.ts with reusable spring presets and motion variants
- **Particle Field Optimization**: Implemented spatial hash grid reducing collision detection from O(n²) to O(n), with connection pooling and adaptive quality
- **Skill Constellation Optimization**: Added connection memoization, viewport culling, and separated static/hover layers for 60fps performance

### UI/UX Improvements
- **Custom Cursor**: Desktop-only cursor with faster physics (stiffness: 500, damping: 15) for natural mouse feel, context-aware states, and subtle particle trail
- **Command Palette Enhancements**: Accurate scrollbar width calculation preventing layout shift, improved mobile breakpoints
- **Enhanced Focus States**: Gradient focus rings with box-shadow animations for beautiful accessibility
- **Mobile Navigation**: Added click-to-close overlay for improved mobile menu UX
- **Skip to Main Content**: Accessible skip link for keyboard users
- **Toast Notification System**: Context-based notifications with auto-dismiss, queue management, and ARIA live regions

### Accessibility Enhancements
- **Intersection Observer Navigation**: Replaced scroll position detection with Intersection Observer API for accurate active section highlighting
- **ARIA Label Audit**: Added descriptive aria-labels to all interactive elements including contact cards and navigation items
- **Semantic HTML**: Added proper footer tag with role="contentinfo" for better SEO and accessibility
- **Keyboard Navigation**: Full keyboard support for skill constellation with Tab, Arrow keys, Enter, and Escape

### Component Architecture
- **Modular Refactoring**: Split large components into focused, reusable modules:
  - Skills: skills-section, featured-skills, skills-grid
  - Projects: project-card, project-metrics, project-tech-stack, image-carousel, project-modal
  - Experience: experience-card, education-card, timeline-visual
- **New UI Components**: progress-bar, metric-card, github-stats, toast system, theme-toggle, depth-indicator, section-transition

### Code Quality
- **TypeScript Strictness**: Eliminated all 'any' types, added proper type guards, created GitHubCommitResponse interface
- **Design System Refinement**: Added spacing tokens (--space-xs to --space-3xl), refined elevation system (--elevation-0 to --elevation-5), state colors, alpha variants for accent colors
- **Test Infrastructure**: Jest configuration with React Testing Library, 25+ passing unit tests covering cache utilities, GitHub API utilities, and UI components

### GitHub Integration
- **Live Stats**: GitHub API integration with LocalStorage caching (24hr TTL) for repository statistics
- **Performance Metrics**: Animated visualizations for stars, forks, commits, and language breakdowns
- **Rate Limit Respect**: Intelligent caching system to stay within GitHub's 60 requests/hour unauthenticated limit

### Design System
- **Spacing Scale**: Consistent spacing tokens from 0.5rem to 6rem
- **Elevation System**: 6-level shadow system for depth hierarchy
- **State Colors**: Success, warning, error, and info color tokens
- **Label Text Utility**: Swiss-inspired uppercase labels with precise letter-spacing
- **Alpha Variants**: Opacity variants (10%-90%) for accent colors

## Connect With Me

- **Portfolio**: [abdallaeldoumani.vercel.app](https://abdallaeldoumani.vercel.app/)
- **LinkedIn**: [Abdalla Eldoumani](https://www.linkedin.com/in/abdallaeldoumani/)
- **GitHub**: [@Abdalla-Eldoumani](https://github.com/Abdalla-Eldoumani)
- **Email**: [aamsdoumani@gmail.com](mailto:aamsdoumani@gmail.com)

## License

This project is open source and available under the [MIT License](LICENSE).

---