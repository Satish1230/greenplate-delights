
import React from 'react';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { useInView } from '@/utils/animations';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const QualityPromise = () => {
  const { ref, isInView } = useInView();
  const navigate = useNavigate();

  return (
    <section ref={ref} className="py-12 md:py-20 relative">
      <div className="absolute inset-0 bg-noise opacity-20"></div>
      
      <div className="bg-white rounded-2xl border border-sage-200 shadow-sm overflow-hidden relative z-10">
        <div className="grid md:grid-cols-2">
          <div className="p-6 md:p-10 lg:p-12">
            <span className={`inline-block px-4 py-1.5 bg-sage-100 text-sage-700 rounded-full text-sm font-medium mb-6 transition-all duration-700 ease-out ${isInView ? 'opacity-100' : 'opacity-0'}`}>
              Our Quality Promise
            </span>
            
            <h2 className={`text-3xl md:text-4xl font-serif font-medium text-sage-800 mb-6 transition-all duration-700 delay-100 ease-out ${isInView ? 'opacity-100' : 'opacity-0'}`}>
              Food That Respects Your Health
            </h2>
            
            <p className={`text-lg text-sage-600 mb-8 transition-all duration-700 delay-200 ease-out ${isInView ? 'opacity-100' : 'opacity-0'}`}>
              At Green Plate, we believe that what's NOT in your food is just as important as what is. Our commitment to your health is unwavering.
            </p>
            
            <div className={`space-y-4 mb-8 transition-all duration-700 delay-300 ease-out ${isInView ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-sage-600 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-medium text-sage-800 text-lg">No Preservatives</h3>
                  <p className="text-sage-600">We never use artificial preservatives or chemicals to extend shelf life. Our meals are naturally fresh.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-sage-600 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-medium text-sage-800 text-lg">No Palm Oil</h3>
                  <p className="text-sage-600">We've eliminated palm oil from all our recipes for both health and environmental reasons.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-sage-600 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-medium text-sage-800 text-lg">No Artificial Flavors</h3>
                  <p className="text-sage-600">The delicious taste of our food comes from quality ingredients and skilled cooking, not lab-created flavors.</p>
                </div>
              </div>
            </div>
            
            <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-400 ease-out ${isInView ? 'opacity-100' : 'opacity-0'}`}>
              <Button 
                onClick={() => navigate('/maternity-plan')} 
                className="premium-button flex items-center gap-2 group"
              >
                Explore Our Plans
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
          
          <div className="relative hidden md:block">
            <div className={`absolute inset-0 transition-all duration-1000 delay-500 ease-out ${isInView ? 'opacity-100' : 'opacity-0'}`}>
              <img 
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Fresh, preservative-free food" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent"></div>
            </div>
            
            <div className="absolute top-10 right-10 max-w-[250px] bg-white/90 backdrop-blur-sm p-5 rounded-lg border border-sage-200 shadow-md z-10">
              <h3 className="font-medium text-sage-800 text-lg mb-2">What We Don't Use:</h3>
              <ul className="space-y-2">
                {[
                  "Artificial preservatives",
                  "Palm oil",
                  "Artificial colors",
                  "MSG or flavor enhancers",
                  "Excessive sodium",
                  "High fructose corn syrup"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span className="text-sage-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualityPromise;
