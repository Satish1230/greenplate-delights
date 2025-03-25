
import React, { useState, useEffect } from 'react';

interface CounterAnimationProps {
  end: number | string;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
}

const CounterAnimation = ({ 
  end, 
  duration = 2000, 
  delay = 0,
  prefix = '',
  suffix = ''
}: CounterAnimationProps) => {
  const [count, setCount] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  
  // Parse end value to a number if it's a string
  const endValue = typeof end === 'string' ? parseInt(end.replace(/,/g, '')) : end;
  
  // Function to format the count with commas for thousands
  const formatCount = (value: number) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Set up intersection observer to start animation when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
        }
      },
      {
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
  }, [isInView]);

  // Animation effect
  useEffect(() => {
    if (!isInView) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentCount = Math.floor(progress * endValue);
      
      setCount(currentCount);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    const timeoutId = setTimeout(() => {
      window.requestAnimationFrame(step);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [isInView, endValue, duration, delay]);

  return (
    <div ref={ref} className="inline-block">
      {prefix}{formatCount(count)}{suffix}
    </div>
  );
};

export default CounterAnimation;
