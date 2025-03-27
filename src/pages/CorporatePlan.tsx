
import React from 'react';
import { ArrowRight, Briefcase, Clock, Users, ClipboardCheck, Building } from 'lucide-react';
import { useInView } from '@/utils/animations';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const CorporatePlan = () => {
  const { toast } = useToast();
  const { ref: headerRef, isInView: headerIsInView } = useInView();
  const { ref: contentRef, isInView: contentIsInView } = useInView();
  
  const handleWhatsAppClick = () => {
    // Open WhatsApp chat with a predefined message
    const phoneNumber = '1234567890'; // Replace with your actual WhatsApp number
    const message = 'Hello! I\'m interested in the Corporate Meal Plan for my company.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "WhatsApp Opening",
      description: "Connecting you with our corporate meal specialist...",
    });
  };
  
  const handleSubscribeClick = () => {
    window.open('https://forms.gle/HUFnoTiq24m6aTdA8', '_blank');
    
    toast({
      title: "Subscription Form",
      description: "Opening corporate subscription form in a new tab",
    });
  };

  return (
    <div className="min-h-screen bg-sage-50 relative">
      <Navbar />
      
      <main className="pt-20 pb-16 md:pt-28 md:pb-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[#e6f0f8] -z-10"></div>
          <div className="absolute inset-0 bg-noise opacity-30 -z-10"></div>
          
          <div ref={headerRef} className="max-w-7xl mx-auto px-4 py-12 md:py-20 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className={`transition-all duration-700 ease-out ${headerIsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                <span className="inline-block px-4 py-1.5 bg-sage-100 text-sage-700 rounded-full text-sm font-medium mb-6">
                  Corporate Meal Plan
                </span>
                
                <h1 className="text-4xl md:text-5xl font-serif font-medium text-sage-800 mb-6">
                  Homely Food, Professional Performance
                </h1>
                
                <p className="text-lg md:text-xl text-sage-600 mb-8">
                  Nourish your team with balanced, energizing meals that boost productivity and create a culture of wellbeing in your workplace.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button onClick={handleSubscribeClick} className="premium-button flex items-center gap-2 group">
                    Order for Your Team
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
                    Discuss Corporate Options
                  </Button>
                </div>
              </div>
              
              <div className={`relative transition-all duration-700 delay-200 ease-out ${headerIsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Corporate meals" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <span className="text-white font-medium">
                      Elevate your workplace culture
                    </span>
                  </div>
                </div>
                
                <div className="absolute -bottom-6 -right-6 bg-white rounded-lg p-4 shadow-lg max-w-[180px]">
                  <p className="text-sage-800 font-serif font-medium mb-1">Sustainable Packaging</p>
                  <p className="text-sage-600 text-sm">Eco-friendly containers for your company's values</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 md:py-24">
          <div ref={contentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Building className={`w-12 h-12 text-sage-600 mx-auto mb-4 transition-all duration-700 ease-out ${contentIsInView ? 'opacity-100' : 'opacity-0'}`} />
              
              <h2 className={`text-3xl md:text-4xl font-serif font-medium text-sage-800 mb-4 transition-all duration-700 delay-100 ease-out ${contentIsInView ? 'opacity-100' : 'opacity-0'}`}>
                The Taste of Home at Your Workplace
              </h2>
              
              <p className={`text-lg text-sage-600 transition-all duration-700 delay-200 ease-out ${contentIsInView ? 'opacity-100' : 'opacity-0'}`}>
                We bring the comfort and nutrition of homemade meals to your office, supporting your team's health, productivity, and overall happiness.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  title: "Team Nutrition",
                  description: "Customizable meal plans that cater to different dietary preferences and nutritional needs across your team."
                },
                {
                  icon: Clock,
                  title: "Punctual Delivery",
                  description: "Reliable, on-time delivery schedules that integrate seamlessly with your workplace routines."
                },
                {
                  icon: ClipboardCheck,
                  title: "Easy Administration",
                  description: "Simple ordering systems, consolidated billing, and dedicated account management for hassle-free service."
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
                  Beyond Just Meals
                </span>
                
                <h2 className="text-3xl md:text-4xl font-serif font-medium text-sage-800 mb-6">
                  Why Companies Choose Our Meal Plan
                </h2>
                
                <div className="space-y-6">
                  {[
                    "Promotes employee wellness and demonstrates your commitment to their wellbeing",
                    "Reduces time spent on food decisions, allowing for more focused work hours",
                    "Creates opportunities for team bonding and improved workplace culture",
                    "Sustainable packaging aligns with corporate environmental responsibility",
                    "Flexible subscription options to fit different company sizes and budgets"
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="mt-1 h-6 w-6 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-sage-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-sage-700">{benefit}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Button onClick={handleSubscribeClick} className="premium-button flex items-center gap-2 group">
                    Start Corporate Plan
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
                    Request Custom Quote
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-[3/4] rounded-xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Team lunch" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[3/4] rounded-xl overflow-hidden mt-6">
                  <img 
                    src="https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Office meal" 
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
                Client Success Stories
              </span>
              
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-sage-800 mb-4">
                What Our Corporate Clients Say
              </h2>
              
              <p className="text-lg text-sage-600">
                See how our meal plans have transformed workplace culture
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  quote: "Implementing these meals has been one of our best wellness initiatives. Our team loves the variety and quality, and we've noticed improved energy levels throughout the workday.",
                  name: "Vikram S.",
                  title: "HR Director, Tech Solutions Inc."
                },
                {
                  quote: "The convenience and quality of the corporate plan has been exceptional. What sets them apart is how they accommodate our diverse team's dietary needs while maintaining consistency in quality.",
                  name: "Deepa M.",
                  title: "Office Manager, Global Finance"
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
                Elevate Your Workplace Meals Today
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

export default CorporatePlan;
