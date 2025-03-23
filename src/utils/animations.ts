
import { useEffect, useRef, useState } from 'react';

// Custom hook for detecting when an element is in viewport
export function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return { ref, isInView };
}

// Animation variants
export const fadeIn = (isInView: boolean) => 
  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10';

export const fadeInDelay = (isInView: boolean, delay: number) => 
  isInView 
    ? `opacity-100 translate-y-0 transition-all duration-1000 ease-out delay-${delay}` 
    : 'opacity-0 translate-y-10';

// Staggered animation for lists of items
export const staggeredFadeIn = (isInView: boolean, index: number) => {
  const delay = index * 100;
  return isInView 
    ? `opacity-100 translate-y-0 transition-all duration-700 ease-out delay-[${delay}ms]` 
    : 'opacity-0 translate-y-10';
};

// Slide animations for testimonials and category sections
export const slideInRight = (isInView: boolean) => 
  isInView ? 'animate-slide-in-right' : 'opacity-0';

export const slideOutRight = (isInView: boolean) => 
  isInView ? 'animate-slide-out-right' : 'opacity-0';

// Interactive element animations
export const pulseOnHover = 'transition-transform duration-300 hover:scale-105 hover:shadow-md';
export const scaleOnHover = 'transition-transform duration-200 hover:scale-105';
export const highlightOnHover = 'transition-colors duration-200 hover:bg-sage-100';

// Accordion animations
export const accordionOpen = 'transition-all duration-300 ease-out';
export const accordionClosed = 'transition-all duration-300 ease-in';

// Text animations
export const typewriter = 'animate-typing overflow-hidden whitespace-nowrap border-r-4 border-sage-500';

// Card animations
export const cardFlip = 'perspective-1000 transition-transform duration-500 transform-style-3d';
export const cardHover = 'transition-all duration-300 hover:-translate-y-2 hover:shadow-lg';
