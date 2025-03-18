import React, { useEffect, useState } from 'react';
import { ArrowRight, Sprout, Heart, Clock } from 'lucide-react';
import { useInView } from '@/utils/animations';

const Hero = () => {
  const { ref, isInView } = useInView();
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-sage-50/50 to-white z-0"></div>
      <div className="absolute inset-0 bg-noise opacity-30 z-0"></div>
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-sage-100/40 to-transparent rounded-full transform translate-x-1/2 -translate-y-1/2 blur-3xl z-0"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gradient-radial from-sage-100/30 to-transparent rounded-full transform -translate-x-1/2 translate-y-1/2 blur-2xl z-0"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left column content */}
          <div className="max-w-xl">
            <span 
              className={`inline-block px-4 py-1.5 bg-sage-100 text-sage-700 rounded-full text-sm font-medium mb-6 transition-all duration-700 ease-out ${isInView ? 'opacity-100' : 'opacity-0 -translate-y-4'}`}
            >
              Premium Meal Subscriptions
            </span>
            
            <h1 
              className={`text-4xl md:text-5xl xl:text-6xl font-serif font-medium leading-tight text-sage-800 mb-6 transition-all duration-700 delay-100 ease-out ${isInView ? 'opacity-100' : 'opacity-0 -translate-y-4'}`}
            >
              Nourishing Meals <br />
              <span className="text-sage-600">Delivered with Care</span>
            </h1>
            
            <p 
              className={`text-lg text-sage-600 mb-8 transition-all duration-700 delay-200 ease-out ${isInView ? 'opacity-100' : 'opacity-0 -translate-y-4'}`}
            >
              Premium, chef-crafted meals tailored to your specific needs. 
              Whether you're a busy professional, expecting mother, or health enthusiast, 
              we have nutritious options made just for you.
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-4 mb-12 transition-all duration-700 delay-300 ease-out ${isInView ? 'opacity-100' : 'opacity-0 -translate-y-4'}`}>
              <a 
                href="#plans" 
                className="premium-button flex items-center justify-center gap-2 group"
              >
                View Our Plans 
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
              
              <a 
                href="#about" 
                className="bg-white border border-sage-200 hover:border-sage-300 text-sage-700 font-medium py-3 px-6 rounded-md transition-all duration-300 ease-in-out flex items-center justify-center"
              >
                Learn More
              </a>
            </div>
            
            {/* Features */}
            <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 transition-all duration-700 delay-400 ease-out ${isInView ? 'opacity-100' : 'opacity-0 -translate-y-4'}`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center text-sage-600">
                  <Sprout size={20} />
                </div>
                <span className="text-sm text-sage-700">Organic Ingredients</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center text-sage-600">
                  <Heart size={20} />
                </div>
                <span className="text-sm text-sage-700">Nutritionist Approved</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center text-sage-600">
                  <Clock size={20} />
                </div>
                <span className="text-sm text-sage-700">Weekly Delivery</span>
              </div>
            </div>
          </div>
          
          {/* Right column image */}
          <div 
            className={`relative transition-all duration-1000 delay-300 ease-out ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}
          >
            <div className="relative w-full h-[500px] rounded-2xl overflow-hidden bg-sage-100">
              <img 
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Healthy meal with fresh ingredients" 
                className="w-full h-full object-cover object-center"
                loading="eager"
              />
            </div>
            
            {/* Floating elements */}
            <div className="absolute -left-6 -bottom-6 w-40 h-40 rounded-2xl overflow-hidden border-4 border-white shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                alt="Chef preparing meal" 
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>
            
            {/* Stats card */}
            <div className="absolute -right-6 -top-6 glass-card px-6 py-4 rounded-xl backdrop-blur-md border border-white/20 shadow-lg">
              <div className="text-center">
                <span className="block text-3xl font-serif font-bold text-sage-800">97%</span>
                <span className="text-sm text-sage-600">Customer Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
