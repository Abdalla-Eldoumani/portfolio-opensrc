import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MagneticButton } from '@/components/ui/magnetic-button';

describe('MagneticButton', () => {
  it('renders children correctly', () => {
    render(<MagneticButton>Click me</MagneticButton>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<MagneticButton onClick={handleClick}>Click me</MagneticButton>);

    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows loading state', () => {
    render(<MagneticButton loading>Click me</MagneticButton>);

    // Loading spinner should be visible
    const spinner = screen.getByRole('button').querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  it('is disabled when loading', () => {
    render(<MagneticButton loading>Click me</MagneticButton>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('is disabled when disabled prop is true', () => {
    render(<MagneticButton disabled>Click me</MagneticButton>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(<MagneticButton disabled onClick={handleClick}>Click me</MagneticButton>);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<MagneticButton className="custom-class">Click me</MagneticButton>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });
});
