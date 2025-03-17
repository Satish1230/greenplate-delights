
import React from 'react';
import { CheckCircle, Leaf, ShieldCheck, Utensils } from 'lucide-react';
import { useInView } from '@/utils/animations';

const About = () => {
  const { ref, isInView } = useInView();
  const { ref: ref2, isInView: isInView2 } = useInView();
  
  return (
    <section id="about" className="py-20 md:py-32 bg-white relative">
      <div ref={ref} className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left column - Image */}
          <div className={`relative transition-all duration-1000 ease-out ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Organic produce and ingredients" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating badge */}
              <div className="absolute -right-6 -bottom-6 w-40 h-40 rounded-full overflow-hidden">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center p-2">
                  <div className="w-full h-full rounded-full border-2 border-dashed border-sage-300 flex items-center justify-center">
                    <div className="text-center">
                      <span className="block text-sage-800 font-serif text-lg font-semibold">100%</span>
                      <span className="text-sm text-sage-600">Organic</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Text content */}
          <div>
            <span className={`inline-block px-4 py-1.5 bg-sage-100 text-sage-700 rounded-full text-sm font-medium mb-6 transition-all duration-700 ease-out ${isInView ? 'opacity-100' : 'opacity-0'}`}>
              Our Story
            </span>
            
            <h2 className={`text-4xl md:text-5xl font-serif font-medium text-sage-800 mb-6 transition-all duration-700 delay-100 ease-out ${isInView ? 'opacity-100' : 'opacity-0'}`}>
              Reimagining Nutrition for Modern Lives
            </h2>
            
            <p className={`text-lg text-sage-600 mb-6 transition-all duration-700 delay-200 ease-out ${isInView ? 'opacity-100' : 'opacity-0'}`}>
              Founded by a team of chefs, nutritionists, and health enthusiasts, GreenPlate was born from a simple belief: premium nutrition shouldn't be sacrificed for convenience.
            </p>
            
            <p className={`text-lg text-sage-600 mb-8 transition-all duration-700 delay-300 ease-out ${isInView ? 'opacity-100' : 'opacity-0'}`}>
              We source only the finest organic ingredients, partnering with local farms to ensure freshness and sustainability. Every meal is crafted with intention, scientifically balanced to support specific nutritional needs while delighting the palate.
            </p>
            
            <ul className="space-y-4 mb-8">
              {[
                { icon: Leaf, text: 'Organic, local ingredients sourced from trusted farms' },
                { icon: Utensils, text: 'Prepared by expert chefs with culinary training' },
                { icon: CheckCircle, text: 'Nutritionist-verified meal plans for specific needs' },
                { icon: ShieldCheck, text: 'Strict quality control and safety standards' }
              ].map((item, index) => (
                <li 
                  key={index} 
                  className={`flex items-start gap-3 transition-all duration-700 ease-out ${isInView ? 'opacity-100' : 'opacity-0'}`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <item.icon className="text-sage-500 shrink-0 mt-1" size={20} />
                  <span className="text-sage-700">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Stats section */}
      <div ref={ref2} className="bg-sage-50 py-16 mt-20 relative">
        <div className="absolute inset-0 bg-noise opacity-30"></div>
        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '10,000+', label: 'Meals Delivered Weekly' },
              { value: '98%', label: 'Customer Satisfaction' },
              { value: '25+', label: 'Specialized Diet Options' },
              { value: '100%', label: 'Eco-Friendly Packaging' }
            ].map((stat, index) => (
              <div 
                key={index}
                className={`text-center transition-all duration-700 ease-out ${isInView2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl font-serif font-bold text-sage-800 mb-2">{stat.value}</div>
                <div className="text-sage-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
