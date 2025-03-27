
import React from 'react';
import { ArrowRight, Baby, Check, PhoneCall, CalendarCheck, Heart } from 'lucide-react';
import { useInView } from '@/utils/animations';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const MaternityPlan = () => {
  const { toast } = useToast();
  const { ref: headerRef, isInView: headerIsInView } = useInView();
  const { ref: contentRef, isInView: contentIsInView } = useInView();
  
  const handleWhatsAppClick = () => {
    // Open WhatsApp chat with a predefined message
    const phoneNumber = '1234567890'; // Replace with your actual WhatsApp number
    const message = 'Hello! I\'m interested in the Maternity Meal Plan.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "WhatsApp Opening",
      description: "Connecting you with our maternity nutrition expert...",
    });
  };
  
  const handleSubscribeClick = () => {
    window.open('https://forms.gle/HUFnoTiq24m6aTdA8', '_blank');
    
    toast({
      title: "Subscription Form",
      description: "Opening subscription form in a new tab",
    });
  };

  return (
    <div className="min-h-screen bg-sage-50 relative">
      <Navbar />
      
      <main className="pt-20 pb-16 md:pt-28 md:pb-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[#f8efe6] -z-10"></div>
          <div className="absolute inset-0 bg-noise opacity-30 -z-10"></div>
          
          <div ref={headerRef} className="max-w-7xl mx-auto px-4 py-12 md:py-20 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className={`transition-all duration-700 ease-out ${headerIsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                <span className="inline-block px-4 py-1.5 bg-sage-100 text-sage-700 rounded-full text-sm font-medium mb-6">
                  Maternity Meal Plan
                </span>
                
                <h1 className="text-4xl md:text-5xl font-serif font-medium text-sage-800 mb-6">
                  Nourishing You & Your Little One
                </h1>
                
                <p className="text-lg md:text-xl text-sage-600 mb-8">
                  Specially crafted meals to support you during pregnancy and postpartum. Because your child's health begins with yours.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={handleSubscribeClick} className="premium-button flex items-center gap-2 group">
                    Subscribe Now
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </Button>
                  
                  <Button onClick={handleWhatsAppClick} variant="outline" className="bg-white text-sage-700 border-sage-200 hover:bg-sage-50 flex items-center gap-2">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width={20} 
                      height={20} 
                      viewBox="0 0 24 24" 
                      fill="#25D366" 
                      stroke="none"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Chat with an Expert
                  </Button>
                </div>
              </div>
              
              <div className={`relative transition-all duration-700 delay-200 ease-out ${headerIsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Maternity meals" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <span className="text-white font-medium">
                      Crafted with care for two
                    </span>
                  </div>
                </div>
                
                <div className="absolute -bottom-6 -right-6 bg-white rounded-lg p-4 shadow-lg max-w-[180px]">
                  <p className="text-sage-800 font-serif font-medium mb-1">100% Natural</p>
                  <p className="text-sage-600 text-sm">No preservatives, no palm oil, just pure nutrition</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 md:py-24">
          <div ref={contentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Baby className={`w-12 h-12 text-sage-600 mx-auto mb-4 transition-all duration-700 ease-out ${contentIsInView ? 'opacity-100' : 'opacity-0'}`} />
              
              <h2 className={`text-3xl md:text-4xl font-serif font-medium text-sage-800 mb-4 transition-all duration-700 delay-100 ease-out ${contentIsInView ? 'opacity-100' : 'opacity-0'}`}>
                Your Child is Our Nation's Future
              </h2>
              
              <p className={`text-lg text-sage-600 transition-all duration-700 delay-200 ease-out ${contentIsInView ? 'opacity-100' : 'opacity-0'}`}>
                We provide specially formulated meals that support prenatal and postnatal nutrition, because we believe in nurturing the next generation from day one.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Heart,
                  title: "Prenatal Support",
                  description: "Optimally balanced nutrition to support fetal development and maternal health during pregnancy."
                },
                {
                  icon: CalendarCheck,
                  title: "Postnatal Recovery",
                  description: "Meals designed to support healing, lactation, and energy restoration after childbirth."
                },
                {
                  icon: PhoneCall,
                  title: "Expert Consultation",
                  description: "Direct access to our nutritionists for personalized guidance throughout your journey."
                }
              ].map((feature, index) => (
                <Card 
                  key={index}
                  className={`border-sage-200 transition-all duration-700 ease-out ${contentIsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <CardContent className="pt-6">
                    <div className="mb-4 inline-flex items-center justify-center p-2 bg-sage-100 rounded-full">
                      <feature.icon className="w-6 h-6 text-sage-700" />
                    </div>
                    
                    <h3 className="text-xl font-serif font-medium text-sage-800 mb-2">
                      {feature.title}
                    </h3>
                    
                    <p className="text-sage-600">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-16 md:py-24 bg-sage-50 relative">
          <div className="absolute inset-0 bg-noise opacity-30"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block px-4 py-1.5 bg-sage-100 text-sage-700 rounded-full text-sm font-medium mb-6">
                  Curated for Your Child's Health
                </span>
                
                <h2 className="text-3xl md:text-4xl font-serif font-medium text-sage-800 mb-6">
                  Why Choose Our Maternity Plan?
                </h2>
                
                <div className="space-y-6">
                  {[
                    "Rich in essential nutrients like folic acid, iron, calcium, and omega-3s",
                    "Specially designed to address common pregnancy discomforts",
                    "Supports milk production for nursing mothers",
                    "Optimized for easy digestion and morning sickness relief",
                    "Every meal prepared fresh with seasonal ingredients"
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="mt-1 h-6 w-6 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0">
                        <Check size={16} className="text-sage-700" />
                      </div>
                      <p className="text-sage-700">{benefit}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Button onClick={handleSubscribeClick} className="premium-button flex items-center gap-2 group">
                    Start Your Plan
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </Button>
                  
                  <Button onClick={handleWhatsAppClick} variant="outline" className="bg-white text-sage-700 border-sage-200 hover:bg-sage-50 flex items-center gap-2">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width={20} 
                      height={20} 
                      viewBox="0 0 24 24" 
                      fill="#25D366" 
                      stroke="none"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Get Personalized Advice
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-[3/4] rounded-xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Nutritious meal" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[3/4] rounded-xl overflow-hidden mt-6">
                  <img 
                    src="https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Balanced meal" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-block px-4 py-1.5 bg-sage-100 text-sage-700 rounded-full text-sm font-medium mb-4">
                Success Stories
              </span>
              
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-sage-800 mb-4">
                Stories from Happy Mothers
              </h2>
              
              <p className="text-lg text-sage-600">
                Hear from mothers who thrived with our maternity meal plan
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  quote: "The maternity meal plan was a lifesaver during my pregnancy. The meals were not only delicious but helped manage my morning sickness and provided all the nutrients my baby needed.",
                  name: "Priya S.",
                  title: "New mother"
                },
                {
                  quote: "As a working mother, I didn't have time to prepare balanced meals. This plan ensured I got proper nutrition postpartum, which I believe helped with my recovery and milk supply.",
                  name: "Meera K.",
                  title: "Mother of two"
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-xl border border-sage-200 shadow-sm">
                  <svg width="45" height="36" viewBox="0 0 45 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-sage-200 mb-4">
                    <path d="M13.5 18H9C9 12.4772 13.4772 8 19 8V12C15.6863 12 13 14.6863 13 18V18ZM31.5 18H27C27 12.4772 31.4772 8 37 8V12C33.6863 12 31 14.6863 31 18V18Z" stroke="currentColor" strokeWidth="4"/>
                  </svg>
                  
                  <p className="text-sage-700 mb-6">
                    "{testimonial.quote}"
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center">
                      <span className="text-sage-700 font-medium">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium text-sage-800">{testimonial.name}</p>
                      <p className="text-sm text-sage-600">{testimonial.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Button onClick={handleSubscribeClick} className="premium-button flex items-center gap-2 group mx-auto">
                Start Your Maternity Plan Today
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <WhatsAppButton />
      <Footer />
    </div>
  );
};

export default MaternityPlan;
