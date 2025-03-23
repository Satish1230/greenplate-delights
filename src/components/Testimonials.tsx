
import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useInView } from '@/utils/animations';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

// Testimonial data with additional profile images
const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'New Mother',
    content: 'The maternity meal plan has been a lifesaver during my postpartum journey. The meals are not only delicious but also help with my recovery and milk production. I\'m grateful for one less thing to worry about!',
    avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
    rating: 5
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Fitness Coach',
    content: 'As someone who values precise macronutrient ratios, I\'m impressed with the attention to detail in the Fitness & Keto plan. The meals are flavorful, well-portioned, and have helped me maintain my physique while saving me hours of meal prep.',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    rating: 5
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Marketing Director',
    content: 'Our team productivity has noticeably improved since subscribing to the Corporate meal plan. The variety keeps everyone excited about lunch, and the nutrition profile keeps us energized throughout the afternoon. Worth every penny!',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5
  },
  {
    id: 4,
    name: 'David Wilson',
    role: 'Software Engineer',
    content: 'Being on a keto diet while working long hours was challenging until I found GreenPlate. The Fitness & Keto meals keep me in ketosis and have enough variety that I never get bored. Highly recommend!',
    avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
    rating: 5
  },
  {
    id: 5,
    name: 'Jessica Lee',
    role: 'Expectant Mother',
    content: 'The Maternity plan has made my pregnancy so much easier. The meals address my specific nutritional needs and help with my morning sickness. Plus, everything tastes amazing - unlike most "healthy" meal services I\'ve tried.',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    rating: 5
  }
];

const Testimonials = () => {
  const { ref, isInView } = useInView();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [transitionClass, setTransitionClass] = useState('');
  const [initialRender, setInitialRender] = useState(true);

  // Navigate to previous testimonial with animation
  const prevTestimonial = () => {
    if (selectedIndex === 0) return;
    setTransitionClass('animate-slide-out-right');
    
    setTimeout(() => {
      setSelectedIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setTransitionClass('animate-slide-in-right');
      setInitialRender(false);
    }, 300);
  };
  
  // Navigate to next testimonial with animation
  const nextTestimonial = () => {
    if (selectedIndex === testimonials.length - 1) return;
    setTransitionClass('animate-slide-out-right');
    
    setTimeout(() => {
      setSelectedIndex((prev) => (prev + 1) % testimonials.length);
      setTransitionClass('animate-slide-in-right');
      setInitialRender(false);
    }, 300);
  };

  // Handle direct selection of a testimonial by clicking on avatar
  const handleProfileSelect = (index) => {
    if (index === selectedIndex) return;
    
    setTransitionClass('animate-slide-out-right');
    setTimeout(() => {
      setSelectedIndex(index);
      setTransitionClass('animate-slide-in-right');
      setInitialRender(false);
    }, 300);
  };

  // Reset animation class when component mounts
  useEffect(() => {
    if (initialRender) {
      setTransitionClass('animate-fade-in');
      setInitialRender(false);
    }
  }, [initialRender]);
  
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-sage-50 rounded-full opacity-70 blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sage-50 rounded-full opacity-70 blur-3xl transform translate-x-1/3 translate-y-1/3"></div>
      <div className="absolute inset-0 bg-noise opacity-30"></div>
      
      <div ref={ref} className="section-container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className={`inline-block px-4 py-1.5 bg-sage-100 text-sage-700 rounded-full text-sm font-medium mb-4 transition-all duration-700 ease-out ${isInView ? 'opacity-100' : 'opacity-0'}`}>
            Our Happy Customers
          </span>
          <h2 className={`section-title transition-all duration-700 delay-100 ease-out ${isInView ? 'opacity-100' : 'opacity-0'}`}>
            What People Are Saying
          </h2>
          <p className={`section-subtitle mx-auto transition-all duration-700 delay-200 ease-out ${isInView ? 'opacity-100' : 'opacity-0'}`}>
            Discover how our meal subscriptions have transformed daily nutrition for our diverse customers.
          </p>
        </div>
        
        <div className={`max-w-5xl mx-auto transition-all duration-1000 ease-out ${isInView ? 'opacity-100' : 'opacity-0'}`}>
          <div className="relative flex flex-col items-center">
            {/* Main testimonial card */}
            <div className={`bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-sage-100 relative z-10 w-full max-w-4xl ${transitionClass}`}>
              {/* Large quote icon */}
              <div className="absolute -top-10 -left-8 text-sage-100">
                <Quote size={80} />
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden shrink-0 border-2 border-sage-100">
                  <img 
                    src={testimonials[selectedIndex].avatar} 
                    alt={testimonials[selectedIndex].name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonials[selectedIndex].rating)].map((_, i) => (
                      <Star key={i} size={18} className="fill-sage-500 text-sage-500" />
                    ))}
                  </div>
                  
                  <blockquote className="text-lg md:text-xl text-sage-800 font-serif mb-6">
                    "{testimonials[selectedIndex].content}"
                  </blockquote>
                  
                  <div>
                    <p className="font-medium text-sage-800">{testimonials[selectedIndex].name}</p>
                    <p className="text-sage-600 text-sm">{testimonials[selectedIndex].role}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Profile images carousel */}
            <div className="mt-12 w-full">
              <Carousel className="w-full">
                <div className="flex justify-between items-center mb-6">
                  <button 
                    onClick={prevTestimonial}
                    className={`w-10 h-10 rounded-full bg-white border border-sage-200 hover:border-sage-300 flex items-center justify-center text-sage-700 transition-all ${selectedIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
                    aria-label="Previous testimonial"
                    disabled={selectedIndex === 0}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  
                  <div className="text-sage-600 text-sm font-medium">
                    {selectedIndex + 1} of {testimonials.length}
                  </div>
                  
                  <button 
                    onClick={nextTestimonial}
                    className={`w-10 h-10 rounded-full bg-white border border-sage-200 hover:border-sage-300 flex items-center justify-center text-sage-700 transition-all ${selectedIndex === testimonials.length - 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
                    aria-label="Next testimonial"
                    disabled={selectedIndex === testimonials.length - 1}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
                
                <CarouselContent className="px-4">
                  {testimonials.map((item, index) => (
                    <CarouselItem key={item.id} className="basis-1/5 md:basis-1/5 lg:basis-1/5 xl:basis-1/5 pl-2 pr-2">
                      <div 
                        className={`cursor-pointer transition-all duration-200 ${selectedIndex === index ? 'scale-110' : 'opacity-60 hover:opacity-80'}`}
                        onClick={() => handleProfileSelect(index)}
                      >
                        <div className={`w-16 h-16 rounded-full overflow-hidden border-2 ${selectedIndex === index ? 'border-sage-500' : 'border-sage-200'}`}>
                          <img 
                            src={item.avatar} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {selectedIndex === index && (
                          <div className="h-1 bg-sage-500 mt-2 rounded-full mx-auto w-6"></div>
                        )}
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </div>
      </div>

      {/* Add the animation CSS as a class to the tailwind config or via a CSS file */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slide-out-right {
          0% { opacity: 1; transform: translateX(0); }
          100% { opacity: 0; transform: translateX(-50px); }
        }
        
        @keyframes slide-in-right {
          0% { opacity: 0; transform: translateX(50px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        
        .animate-slide-out-right {
          animation: slide-out-right 0.3s forwards;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.3s forwards;
        }
      `}} />
    </section>
  );
};

export default Testimonials;
