
import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { useInView } from '@/utils/animations';
import { toast } from '@/hooks/use-toast';

const CallToAction = () => {
  const { ref, isInView } = useInView();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Thank you for subscribing!",
        description: "We'll reach out to you soon with our meal options.",
      });
      setEmail('');
      setLoading(false);
    }, 1000);
  };
  
  return (
    <section id="subscribe" className="py-20 md:py-28 relative bg-sage-800 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sage-700/50 rounded-full opacity-70 blur-3xl transform translate-x-1/3 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-sage-700/50 rounded-full opacity-70 blur-3xl transform -translate-x-1/2 translate-y-1/3"></div>
      <div className="absolute inset-0 bg-noise opacity-10"></div>
      
      <div ref={ref} className="section-container relative z-10">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left side - Image */}
            <div className="relative h-64 md:h-auto">
              <img 
                src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Chef preparing a healthy meal" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sage-800/70 via-sage-800/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 md:p-8">
                <h3 className="text-2xl font-serif font-medium text-white mb-2">Start Your Journey</h3>
                <p className="text-sage-50">Nourish your body with meals that care for you.</p>
              </div>
            </div>
            
            {/* Right side - Form */}
            <div className="p-6 md:p-10">
              <div className={`transition-all duration-700 delay-200 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <h3 className="text-2xl font-serif font-medium text-sage-800 mb-4">
                  Ready to transform your meals?
                </h3>
                <p className="text-sage-600 mb-6">
                  Subscribe to get started with premium meal deliveries tailored just for you.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-sage-700 mb-1">
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 rounded-md border border-sage-200 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    className="premium-button w-full flex items-center justify-center gap-2 group"
                    disabled={loading}
                  >
                    {loading ? (
                      <span>Processing...</span>
                    ) : (
                      <>
                        Get Started
                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Check size={18} className="text-sage-500 mt-0.5 shrink-0" />
                    <span className="text-sage-600 text-sm">7-day satisfaction guarantee</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check size={18} className="text-sage-500 mt-0.5 shrink-0" />
                    <span className="text-sage-600 text-sm">Flexible subscription - modify or cancel anytime</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check size={18} className="text-sage-500 mt-0.5 shrink-0" />
                    <span className="text-sage-600 text-sm">Personalized meal consultation included</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
