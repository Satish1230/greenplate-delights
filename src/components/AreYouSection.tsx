
import React, { useState, useEffect } from 'react';
import { useInView } from '@/utils/animations';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

// Data for the "Are You" categories
const categories = [
  {
    id: 1,
    title: "A Busy Professional",
    description: "Looking for convenient, healthy meals that fit your schedule without compromising on nutrition or taste.",
    icon: "👔",
    benefits: [
      "Time-saving meal plans tailored to your schedule",
      "Nutrition-focused options to maintain energy levels",
      "Convenient delivery that works around your meetings"
    ]
  },
  {
    id: 2,
    title: "Health Conscious",
    description: "Focused on nutrition and wellness, seeking balanced meals with quality ingredients to support your lifestyle.",
    icon: "💪",
    benefits: [
      "Macro-balanced meals with full nutritional transparency",
      "Clean ingredients with no artificial additives",
      "Options that align with your fitness goals"
    ]
  },
  {
    id: 3,
    title: "An Expectant Mother",
    description: "Needing nutrient-rich, carefully prepared meals that support your health and your baby's development.",
    icon: "🤰",
    benefits: [
      "Specially designed meals rich in essential nutrients",
      "Gentle flavors that work with changing tastes",
      "Convenient delivery to help you rest and prepare"
    ]
  },
  {
    id: 4,
    title: "Managing Dietary Needs",
    description: "Dealing with specific dietary requirements and looking for delicious options that meet your needs.",
    icon: "🥗",
    benefits: [
      "Clear allergen labeling on all meals",
      "Specialized menu options for common restrictions",
      "Customizable plans that respect your dietary boundaries"
    ]
  },
  {
    id: 5,
    title: "Building Your Fitness",
    description: "Focused on reaching fitness goals with protein-rich, properly portioned meals that fuel your workouts.",
    icon: "🏋️",
    benefits: [
      "High-protein options designed for muscle recovery",
      "Portioned meals to support your specific calorie needs",
      "Pre and post-workout nutrition optimization"
    ]
  }
];

const AreYouSection = () => {
  const { ref, isInView } = useInView();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [transitionClass, setTransitionClass] = useState('animate-slide-in-right');
  const [initialRender, setInitialRender] = useState(true);

  // Navigate to previous category with animation
  const prevCategory = () => {
    if (selectedIndex === 0) return;
    setTransitionClass('animate-slide-out-right');
    
    setTimeout(() => {
      setSelectedIndex((prev) => prev - 1);
      setTransitionClass('animate-slide-in-right');
      setInitialRender(false);
    }, 300);
  };
  
  // Navigate to next category with animation
  const nextCategory = () => {
    if (selectedIndex === categories.length - 1) return;
    setTransitionClass('animate-slide-out-right');
    
    setTimeout(() => {
      setSelectedIndex((prev) => prev + 1);
      setTransitionClass('animate-slide-in-right');
      setInitialRender(false);
    }, 300);
  };

  // Handle direct selection of a category by clicking on avatar
  const handleCategorySelect = (index) => {
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
    <section id="are-you" className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-green-50 rounded-full opacity-20 blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-50 rounded-full opacity-20 blur-3xl transform translate-x-1/3 translate-y-1/3"></div>
      
      <div ref={ref} className="section-container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className={`inline-block px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4 transition-all duration-700 ease-out ${isInView ? 'opacity-100' : 'opacity-0'}`}>
            Find Your Fit
          </span>
          <h2 className={`section-title transition-all duration-700 delay-100 ease-out ${isInView ? 'opacity-100' : 'opacity-0'} text-transparent bg-clip-text bg-gradient-to-r from-black to-green-600`}>
            Are You...
          </h2>
          <p className={`section-subtitle mx-auto transition-all duration-700 delay-200 ease-out ${isInView ? 'opacity-100' : 'opacity-0'}`}>
            Discover the perfect meal plan tailored to your specific lifestyle and needs
          </p>
        </div>
        
        <div className={`max-w-5xl mx-auto transition-all duration-1000 ease-out ${isInView ? 'opacity-100' : 'opacity-0'}`}>
          <div className="relative flex flex-col items-center">
            {/* Main category card */}
            <div className={`bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-gray-100 relative z-10 w-full max-w-4xl ${transitionClass}`}>
              {/* Card border gradient */}
              <div className="absolute -inset-[2px] bg-gradient-to-b from-green-500 via-green-400 to-green-800 rounded-2xl -z-10 opacity-70"></div>
              
              {/* Large icon display */}
              <div className="absolute -top-6 -left-6 text-5xl bg-green-50 w-16 h-16 rounded-full flex items-center justify-center border border-green-100 shadow-sm">
                {categories[selectedIndex].icon}
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
                <div className="flex-1">
                  <h3 className="text-2xl font-serif font-medium text-gray-800 mb-4">
                    {categories[selectedIndex].title}
                  </h3>
                  
                  <p className="text-lg text-gray-600 mb-6">
                    {categories[selectedIndex].description}
                  </p>
                  
                  <div className="space-y-3">
                    {categories[selectedIndex].benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check className="text-green-500 h-5 w-5 mt-1 shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8">
                    <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-md transition-all duration-300 ease-in-out shadow-sm hover:shadow-md">
                      View Recommended Plans
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Category selector carousel */}
            <div className="mt-12 w-full">
              <Carousel className="w-full">
                <div className="flex justify-between items-center mb-6">
                  <button 
                    onClick={prevCategory}
                    className={`w-10 h-10 rounded-full bg-white border border-gray-200 hover:border-green-300 flex items-center justify-center text-gray-700 transition-all ${selectedIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
                    aria-label="Previous category"
                    disabled={selectedIndex === 0}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  
                  <div className="text-gray-600 text-sm font-medium">
                    {selectedIndex + 1} of {categories.length}
                  </div>
                  
                  <button 
                    onClick={nextCategory}
                    className={`w-10 h-10 rounded-full bg-white border border-gray-200 hover:border-green-300 flex items-center justify-center text-gray-700 transition-all ${selectedIndex === categories.length - 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`}
                    aria-label="Next category"
                    disabled={selectedIndex === categories.length - 1}
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
                
                <CarouselContent className="px-4">
                  {categories.map((item, index) => (
                    <CarouselItem key={item.id} className="basis-1/5 md:basis-1/5 lg:basis-1/5 xl:basis-1/5 pl-2 pr-2">
                      <div 
                        className={`cursor-pointer transition-all duration-200 ${selectedIndex === index ? 'scale-110' : 'opacity-60 hover:opacity-80'}`}
                        onClick={() => handleCategorySelect(index)}
                      >
                        <div className={`w-16 h-16 rounded-full overflow-hidden border-2 flex items-center justify-center bg-green-50 text-2xl ${selectedIndex === index ? 'border-green-500' : 'border-gray-200'}`}>
                          {item.icon}
                        </div>
                        {selectedIndex === index && (
                          <div className="h-1 bg-green-500 mt-2 rounded-full mx-auto w-6"></div>
                        )}
                        <p className="text-xs text-center mt-2 text-gray-700">
                          {item.title.split(' ')[0]}
                        </p>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </div>
      </div>

      {/* Add the animation CSS */}
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

        .animate-fade-in {
          animation: fade-in 0.5s forwards;
        }

        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}} />
    </section>
  );
};

export default AreYouSection;
