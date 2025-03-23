
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedPlans from '@/components/FeaturedPlans';
import SubscriptionSection from '@/components/SubscriptionSection';
import Testimonials from '@/components/Testimonials';
import About from '@/components/About';
import CallToAction from '@/components/CallToAction';
import ScratchCard from '@/components/ScratchCard';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';

const Index = () => {
  // Smooth scroll to section when clicking on navigation links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const href = target.closest('a')?.getAttribute('href');
      
      if (href?.startsWith('#') && href !== '#') {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Accounting for fixed header
            behavior: 'smooth'
          });
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <FeaturedPlans />
        <SubscriptionSection />
        <About />
        <Testimonials />
        <CallToAction />
        <ScratchCard />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Index;
