"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Circle } from 'lucide-react';
import { BlurImage } from './blur-image';

interface ImageCarouselProps {
  images: string[];
  alt: string;
  className?: string;
  autoPlayInterval?: number; // ms, 0 = disabled
  showIndicators?: boolean;
  showControls?: boolean;
  aspectRatio?: 'video' | 'square' | 'wide' | 'portrait';
}

/**
 * Image carousel with smooth transitions
 * Features: Auto-play, keyboard navigation, touch swipe support
 * Optimized with priority loading for first image
 */
export const ImageCarousel = ({
  images,
  alt,
  className = '',
  autoPlayInterval = 0,
  showIndicators = true,
  showControls = true,
  aspectRatio = 'video',
}: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 = left, 1 = right
  const [isPaused, setIsPaused] = useState(false);
  const touchStartRef = useRef<number | null>(null);
  const touchEndRef = useRef<number | null>(null);

  const totalImages = images.length;

  // Only show carousel UI if multiple images
  const isCarousel = totalImages > 1;

  // Navigate to specific index — functional updates avoid dependency on currentIndex
  const goToSlide = useCallback((index: number) => {
    setCurrentIndex((prev) => {
      const newIndex = (index + totalImages) % totalImages;
      setDirection(newIndex > prev ? 1 : -1);
      return newIndex;
    });
  }, [totalImages]);

  // Next/Previous handlers
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = (prev + 1) % totalImages;
      setDirection(1);
      return next;
    });
  }, [totalImages]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = (prev - 1 + totalImages) % totalImages;
      setDirection(-1);
      return next;
    });
  }, [totalImages]);

  // Keyboard navigation
  useEffect(() => {
    if (!isCarousel) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCarousel, goToPrev, goToNext]);

  // Auto-play functionality
  useEffect(() => {
    if (!isCarousel || autoPlayInterval === 0 || isPaused) return;

    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isCarousel, autoPlayInterval, isPaused, goToNext]);

  // Touch swipe detection (50px minimum swipe distance)
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    touchEndRef.current = null;
    touchStartRef.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndRef.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartRef.current || !touchEndRef.current) return;

    const distance = touchStartRef.current - touchEndRef.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) goToNext();
    if (isRightSwipe) goToPrev();
  };

  // Slide animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  };

  // Aspect ratio classes
  const aspectClasses = {
    video: 'aspect-video',
    square: 'aspect-square',
    wide: 'aspect-[21/9]',
    portrait: 'aspect-[3/4]',
  };

  return (
    <div
      className={`relative overflow-hidden rounded-xl group ${aspectClasses[aspectRatio]} ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={(e) => { setIsPaused(true); onTouchStart(e); }}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      role="region"
      aria-label={`Image carousel: ${alt}`}
      aria-live="polite"
    >
      {/* Image container */}
      <div className="relative w-full h-full">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0"
          >
            <BlurImage
              src={images[currentIndex]}
              alt={`${alt} - Image ${currentIndex + 1} of ${totalImages}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              priority={currentIndex === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>

      {/* Navigation Controls */}
      {isCarousel && showControls && (
        <>
          {/* Previous button */}
          <motion.button
            onClick={goToPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 glass-effect p-2 rounded-full opacity-0 group-hover:opacity-100 [@media(hover:none)]:opacity-70 transition-opacity duration-300 hover:bg-white/20 z-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </motion.button>

          {/* Next button */}
          <motion.button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 glass-effect p-2 rounded-full opacity-0 group-hover:opacity-100 [@media(hover:none)]:opacity-70 transition-opacity duration-300 hover:bg-white/20 z-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </motion.button>
        </>
      )}

      {/* Dot indicators */}
      {isCarousel && showIndicators && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-white w-6 h-1.5'
                  : 'bg-white/40 w-1.5 h-1.5 hover:bg-white/60'
              } rounded-full`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to image ${index + 1}`}
              aria-current={index === currentIndex}
            />
          ))}
        </div>
      )}

      {/* Image counter (top-right) */}
      {isCarousel && (
        <div
          className="absolute top-3 right-3 glass-effect px-3 py-1 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 [@media(hover:none)]:opacity-70 transition-opacity duration-300 z-10"
          style={{ color: 'var(--text-primary)' }}
          aria-live="polite"
        >
          {currentIndex + 1} / {totalImages}
        </div>
      )}
    </div>
  );
};

/**
 * Thumbnail navigation carousel
 * Shows preview thumbnails below main image
 */
interface ThumbnailCarouselProps extends ImageCarouselProps {
  thumbnailHeight?: number;
}

export const ThumbnailCarousel = ({
  images,
  alt,
  className = '',
  thumbnailHeight = 80,
  ...props
}: ThumbnailCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Main carousel */}
      <ImageCarousel
        images={images}
        alt={alt}
        showIndicators={false}
        {...props}
      />

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
          {images.map((image, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative flex-shrink-0 rounded-lg overflow-hidden transition-all duration-300 ${
                index === currentIndex
                  ? 'ring-2 ring-cyan-500 ring-offset-2 ring-offset-gray-950'
                  : 'opacity-60 hover:opacity-100'
              }`}
              style={{ height: thumbnailHeight, width: thumbnailHeight * 1.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`View image ${index + 1}`}
              aria-current={index === currentIndex}
            >
              <BlurImage
                src={image}
                alt={`${alt} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="120px"
              />
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
};
