// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mock framer-motion
jest.mock('framer-motion', () => {
  const removeMotionProps = (props) => {
    const {
      initial,
      animate,
      exit,
      whileHover,
      whileTap,
      whileInView,
      viewport,
      transition,
      variants,
      style,
      ...rest
    } = props;
    return rest;
  };

  return {
    motion: {
      div: ({ children, ...props }) => <div {...removeMotionProps(props)}>{children}</div>,
      button: ({ children, ...props }) => <button {...removeMotionProps(props)}>{children}</button>,
      a: ({ children, ...props }) => <a {...removeMotionProps(props)}>{children}</a>,
      span: ({ children, ...props }) => <span {...removeMotionProps(props)}>{children}</span>,
      nav: ({ children, ...props }) => <nav {...removeMotionProps(props)}>{children}</nav>,
      section: ({ children, ...props}) => <section {...removeMotionProps(props)}>{children}</section>,
      footer: ({ children, ...props }) => <footer {...removeMotionProps(props)}>{children}</footer>,
    },
    AnimatePresence: ({ children }) => children,
    useMotionValue: () => ({ get: () => 0, set: jest.fn() }),
    useSpring: () => ({ get: () => 0, set: jest.fn() }),
    useTransform: () => ({ get: () => 0 }),
    useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
  };
})

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() { return [] }
  unobserve() {}
}

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})
