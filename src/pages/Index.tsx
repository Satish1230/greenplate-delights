
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedPlans from '@/components/FeaturedPlans';
import About from '@/components/About';
import Testimonials from '@/components/Testimonials';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import FAQSection from '@/components/FAQSection';
import SubscriptionSection from '@/components/SubscriptionSection';
import AreYouSection from '@/components/AreYouSection';
import FSSAIBadge from '@/components/FSSAIBadge';
import StatCards from '@/components/StatCards';
import WhatsAppButton from '@/components/WhatsAppButton';
import ScratchCard from '@/components/ScratchCard';

const Index = () => {
  return (
    <div className="min-h-screen bg-sage-50 relative overflow-hidden">
      <Navbar />
      <Hero />
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="my-6 sm:my-8">
          <FSSAIBadge />
        </div>
        <StatCards />
        <FeaturedPlans />
        <About />
        <AreYouSection />
        <SubscriptionSection />
        <Testimonials />
        <FAQSection />
        <ScratchCard/>
        <CallToAction />
      </div>
      <WhatsAppButton />
      <Footer />
    </div>
  );
};

export default Index;
