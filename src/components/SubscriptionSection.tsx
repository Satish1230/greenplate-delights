
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useInView } from '@/utils/animations';

const subscriptionData = [
  {
    id: 'monthly',
    title: 'Monthly Subscription Plan',
    subtitle: 'Most Valuable – Min 25% OFF',
    imageSrc: 'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    color: 'bg-[#f2f7f2]', // Light sage
    textColor: 'text-sage-800',
    borderColor: 'border-sage-200',
    size: 'col-span-2 md:col-span-1 md:row-span-2',
  },
  {
    id: 'biWeekly',
    title: 'Bi-Weekly Subscription',
    subtitle: 'Hot Seller Package!',
    imageSrc: 'https://images.unsplash.com/photo-1540914124281-342587941389?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    color: 'bg-[#f1f6e6]', // Light olive
    textColor: 'text-sage-800',
    borderColor: 'border-sage-200',
    size: 'col-span-2 md:col-span-1',
  },
  {
    id: 'weekly',
    title: 'Weekly Meal Plan',
    subtitle: 'Convenient in Small Package!',
    imageSrc: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    color: 'bg-[#f8f5e6]', // Light cream
    textColor: 'text-sage-800',
    borderColor: 'border-sage-200',
    size: 'col-span-2 md:col-span-1',
  }
];

const SubscriptionSection = () => {
  const { ref, isInView } = useInView();

  return (
    <section id="subscription" className="py-20 md:py-32 relative">
      <div className="absolute inset-0 bg-noise opacity-30"></div>
      
      <div ref={ref} className="section-container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className={`inline-block px-4 py-1.5 bg-sage-100 text-sage-700 rounded-full text-sm font-medium mb-4 transition-all duration-700 ease-out ${isInView ? 'opacity-100' : 'opacity-0'}`}>
            Flexible Options
          </span>
          <h2 className={`section-title transition-all duration-700 delay-100 ease-out ${isInView ? 'opacity-100' : 'opacity-0'}`}>
            Types of Subscription
          </h2>
          <p className={`section-subtitle mx-auto transition-all duration-700 delay-200 ease-out ${isInView ? 'opacity-100' : 'opacity-0'}`}>
            Choose the plan that best fits your lifestyle and nutritional needs
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          {subscriptionData.map((subscription, index) => (
            <div 
              key={subscription.id}
              className={`${subscription.size} transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <div className={`${subscription.color} h-full rounded-2xl p-6 md:p-8 border ${subscription.borderColor} relative overflow-hidden group`}>
                <div className="relative z-10">
                  <h3 className={`text-xl md:text-2xl font-serif font-medium ${subscription.textColor} mb-2`}>
                    {subscription.title}
                  </h3>
                  <p className="text-sage-600 mb-6 md:mb-8">
                    {subscription.subtitle}
                  </p>
                  
                  <a 
                    href="https://forms.gle/HUFnoTiq24m6aTdA8" 
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="premium-button inline-flex items-center justify-center gap-2 group"
                  >
                    Subscribe Now
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
                
                <div className="absolute bottom-0 right-0 w-1/2 h-1/2 transform translate-y-6 translate-x-6 opacity-80 transition-transform duration-500 ease-out group-hover:translate-y-3 group-hover:translate-x-3">
                  <img 
                    src={subscription.imageSrc}
                    alt={subscription.title}
                    className="w-full h-full object-cover object-center rounded-tl-2xl"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SubscriptionSection;
