
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

// Slide animations for testimonials
export const slideInRight = (isInView: boolean) => 
  isInView ? 'animate-slide-in-right' : 'opacity-0';

export const slideOutRight = (isInView: boolean) => 
  isInView ? 'animate-slide-out-right' : 'opacity-0';

// Scale animation for hover effects
export const scaleOnHover = 'transition-transform duration-200 hover:scale-105';
