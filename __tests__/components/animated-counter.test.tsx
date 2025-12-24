import React from 'react';
import { render } from '@testing-library/react';
import { AnimatedCounter } from '@/components/ui/animated-counter';

describe('AnimatedCounter', () => {
  it('renders without crashing', () => {
    const { container } = render(<AnimatedCounter value={100} />);
    expect(container).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <AnimatedCounter value={50} className="custom-class" />
    );
    const element = container.querySelector('.custom-class');
    expect(element).toBeInTheDocument();
  });

  it('handles zero value', () => {
    const { container } = render(<AnimatedCounter value={0} />);
    expect(container).toBeInTheDocument();
  });

  it('handles large numbers', () => {
    const { container } = render(<AnimatedCounter value={1000000} />);
    expect(container).toBeInTheDocument();
  });

  it('renders with prefix and suffix', () => {
    const { container } = render(<AnimatedCounter value={75} prefix="$" suffix="%" />);
    expect(container).toBeInTheDocument();
  });
});
