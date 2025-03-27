
import React from 'react';
import { ArrowRight, ChefHat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInView } from '@/utils/animations';
import { useToast } from '@/hooks/use-toast';

const RecipeSection = () => {
  const { ref, isInView } = useInView();
  const { toast } = useToast();

  const handleGetRecipes = () => {
    // Open WhatsApp chat with a predefined message
    const phoneNumber = '1234567890'; // Replace with your actual WhatsApp number
    const message = 'Hello! I\'d love to receive your healthy recipe PDF guide!';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Opening WhatsApp",
      description: "Connecting you to get your free recipes PDF!",
    });
  };

  return (
    <section className="py-20 md:py-28 relative bg-cream-50">
      <div className="absolute inset-0 bg-noise opacity-30"></div>
      
      <div ref={ref} className="section-container relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className={`transition-all duration-700 delay-100 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="mb-4 inline-flex items-center justify-center p-2 bg-sage-100 rounded-full">
              <ChefHat className="w-6 h-6 text-sage-700" />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-sage-800 mb-4">
              We Believe in Your Kitchen's Power
            </h2>
            <p className="text-lg text-sage-600 mb-6">
              The best meals are those prepared with love in your own kitchen. Let us help you discover the joy of homemade nutrition with our curated recipes.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sage-700 font-medium">✓</span>
                </div>
                <p className="text-sage-700">Quick, nutritious recipes for busy lifestyles</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sage-700 font-medium">✓</span>
                </div>
                <p className="text-sage-700">No palm oil, no preservatives, just real ingredients</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sage-700 font-medium">✓</span>
                </div>
                <p className="text-sage-700">Seasonal meal planning suggestions</p>
              </div>
            </div>
            
            <Button 
              onClick={handleGetRecipes}
              className="premium-button flex items-center gap-2 group"
            >
              Get Free Recipe Guide
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          
          <div className={`relative transition-all duration-700 delay-300 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Healthy homemade meals" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
                    <span className="text-sage-700 text-lg font-medium">30+</span>
                  </div>
                  <p className="text-white font-medium">Recipes in our free guide</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-sage-100 rounded-lg p-4 shadow-lg max-w-[180px]">
              <p className="text-sage-800 font-serif font-medium mb-1">No Preservatives</p>
              <p className="text-sage-600 text-sm">All our meal plans use 100% natural ingredients</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecipeSection;
