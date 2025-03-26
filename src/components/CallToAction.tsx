
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

  const handleWhatsAppClick = () => {
    // Open WhatsApp chat with a predefined message
    const phoneNumber = '1234567890'; // Replace with your actual WhatsApp number
    const message = 'Hello! I\'m interested in your meal plans.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "WhatsApp Opening",
      description: "Connecting you with our nutrition expert...",
    });
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
                
                <form onSubmit={handleSubmit} className="space-y-4 mb-4">
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

                <div className="text-center my-4">
                  <span className="text-sage-500 text-sm">or</span>
                </div>

                <button 
                  onClick={handleWhatsAppClick}
                  className="w-full py-3 px-4 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Contact on WhatsApp
                </button>
                
                <div className="space-y-3 mt-6">
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
