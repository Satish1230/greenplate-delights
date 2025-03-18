
import React from 'react';
import { Check, ArrowRight, BabyIcon, Salad, Briefcase } from 'lucide-react';
import { useInView } from '@/utils/animations';

const planData = [
  {
    id: 'maternity',
    title: 'Maternity Plan',
    description: 'Nutritionally balanced meals designed for expectant and new mothers.',
    price: 149,
    icon: BabyIcon,
    features: [
      'Nutrient-rich meals for prenatal health',
      'Carefully balanced macronutrients',
      'Supports postpartum recovery',
      'Easily digestible ingredients',
      'Incorporates traditional postnatal recipes'
    ],
    image: '/lovable-uploads/f38eb532-c878-4349-aabb-8dec09e854e8.png',
    color: 'bg-[#f8efe6]'
  },
  {
    id: 'fitness',
    title: 'Fitness & Keto',
    description: 'High-protein, low-carb meals perfect for your fitness journey.',
    price: 129,
    icon: Salad,
    features: [
      'Macronutrient balanced for muscle gain',
      'Keto-friendly meal options',
      'High protein content',
      'No added sugars or preservatives',
      'Portion controlled for optimal results'
    ],
    image: '/lovable-uploads/92eb2784-7239-4360-9db0-48fc75fbec7d.png',
    color: 'bg-[#e6f5ed]'
  },
  {
    id: 'corporate',
    title: 'Corporate Meals',
    description: 'Elevate your workday with nutritious, energizing meals delivered to your office.',
    price: 179,
    icon: Briefcase,
    features: [
      'Bulk ordering for teams',
      'Brain-boosting ingredients',
      'Energy-sustaining meals',
      'Elegant presentation',
      'Sustainable packaging'
    ],
    image: '/lovable-uploads/074cd783-70c1-4844-8789-d031df552123.png',
    color: 'bg-[#e6f0f8]'
  }
];

const FeaturedPlans = () => {
  const { ref, isInView } = useInView();

  return (
    <section id="plans" className="py-20 md:py-32 relative bg-sage-50/50">
      <div className="absolute inset-0 bg-noise opacity-30"></div>
      
      <div ref={ref} className="section-container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className={`inline-block px-4 py-1.5 bg-sage-100 text-sage-700 rounded-full text-sm font-medium mb-4 transition-all duration-700 ease-out ${isInView ? 'opacity-100' : 'opacity-0'}`}>
            Our Meal Plans
          </span>
          <h2 className={`section-title transition-all duration-700 delay-100 ease-out ${isInView ? 'opacity-100' : 'opacity-0'}`}>
            Tailored Nourishment for Your Lifestyle
          </h2>
          <p className={`section-subtitle mx-auto transition-all duration-700 delay-200 ease-out ${isInView ? 'opacity-100' : 'opacity-0'}`}>
            Each meal plan is crafted with specific nutritional profiles to support different life stages and wellness goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {planData.map((plan, index) => (
            <div 
              key={plan.id}
              className={`rounded-2xl overflow-hidden transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <div className={`${plan.color} p-6 h-full flex flex-col`}>
                <div className="mb-4">
                  <plan.icon className="w-10 h-10 text-sage-700" />
                </div>
                
                <h3 className="text-2xl font-serif font-medium text-sage-800 mb-2">{plan.title}</h3>
                <p className="text-sage-600 mb-4">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-3xl font-serif font-semibold text-sage-800">${plan.price}</span>
                  <span className="text-sage-600 ml-1">/week</span>
                </div>
                
                <div className="mb-8 flex-grow">
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check size={18} className="text-sage-700 mt-0.5 shrink-0" />
                        <span className="text-sage-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <a 
                  href="#subscribe" 
                  className="premium-button w-full flex items-center justify-center gap-2 group"
                >
                  Choose Plan
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPlans;
