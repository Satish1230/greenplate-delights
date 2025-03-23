
import React from 'react';
import { useInView } from '@/utils/animations';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { HelpCircle, Search } from 'lucide-react';

// FAQ data
const faqData = [
  {
    question: "How does the meal subscription work?",
    answer: "Our meal subscription delivers fresh, homemade meals directly to your doorstep on your chosen schedule. Choose from weekly, bi-weekly, or monthly plans. Each delivery includes carefully prepared meals following traditional recipes with premium ingredients."
  },
  {
    question: "Can I customize my meal preferences?",
    answer: "Absolutely! We offer full customization for your meal preferences. You can specify dietary restrictions, allergies, spice levels, and favorite cuisines. Our flexible platform allows you to change these preferences at any time through your account."
  },
  {
    question: "What areas do you deliver to?",
    answer: "We currently deliver to select metropolitan areas. Enter your zip code on our website to check if we service your area. We're constantly expanding our delivery zones to reach more customers with our authentic homemade meals."
  },
  {
    question: "How are the meals packaged?",
    answer: "Our meals are packaged in eco-friendly, recyclable containers that maintain freshness and are safe for reheating. Each package is carefully sealed and labeled with ingredients, nutritional information, and heating instructions."
  },
  {
    question: "Can I skip a delivery or cancel my subscription?",
    answer: "Yes, you have complete flexibility! You can skip a delivery, pause your subscription, or cancel at any time through your account dashboard. We just ask for notice 48 hours before your scheduled delivery date."
  },
  {
    question: "Do you accommodate special dietary needs?",
    answer: "We cater to various dietary preferences including vegetarian, vegan, gluten-free, dairy-free, low-carb, and more. All special dietary requirements can be specified when you sign up, and our chefs will prepare your meals accordingly."
  }
];

const FAQSection = () => {
  const { ref, isInView } = useInView();
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const filteredFAQs = faqData.filter(
    faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="faq" className="py-20 relative bg-sage-50">
      <div className="absolute inset-0 bg-noise opacity-20"></div>
      
      <div ref={ref} className="section-container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className={`inline-block px-4 py-1.5 bg-sage-100 text-sage-700 rounded-full text-sm font-medium mb-4 transition-all duration-700 ease-out ${isInView ? 'opacity-100' : 'opacity-0'}`}>
            Got Questions?
          </span>
          <h2 className={`section-title transition-all duration-700 delay-100 ease-out ${isInView ? 'opacity-100' : 'opacity-0'}`}>
            Frequently Asked Questions
          </h2>
          <p className={`section-subtitle mx-auto transition-all duration-700 delay-200 ease-out ${isInView ? 'opacity-100' : 'opacity-0'}`}>
            Find answers to common questions about our meal subscriptions
          </p>
        </div>

        {/* Search box */}
        <div className={`relative max-w-xl mx-auto mb-10 transition-all duration-700 delay-300 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-sage-200 focus:border-sage-500 focus:ring-1 focus:ring-sage-500 bg-white/80 backdrop-blur-sm transition-all"
            />
          </div>
        </div>

        {/* FAQ accordion */}
        <div className={`max-w-3xl mx-auto glass-card rounded-xl p-1 transition-all duration-700 delay-400 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {filteredFAQs.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {filteredFAQs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-sage-200 last:border-b-0">
                  <AccordionTrigger className="hover:text-sage-800 py-5 px-6 text-left font-medium text-sage-700">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-5 text-sage-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
              <HelpCircle size={48} className="text-sage-400 mb-4" />
              <h3 className="text-lg font-medium text-sage-700 mb-2">No matching questions found</h3>
              <p className="text-sage-500">Try a different search term or browse all our FAQs by clearing your search</p>
              <button 
                onClick={() => setSearchTerm('')} 
                className="mt-4 px-4 py-2 bg-sage-100 text-sage-700 hover:bg-sage-200 rounded-md transition-colors"
              >
                Clear search
              </button>
            </div>
          )}
        </div>

        {/* Contact prompt */}
        <div className={`text-center mt-10 transition-all duration-700 delay-500 ease-out ${isInView ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-sage-600">
            Still have questions? <a href="#contact" className="text-sage-800 font-medium hover:underline">Contact us</a> for more information.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
