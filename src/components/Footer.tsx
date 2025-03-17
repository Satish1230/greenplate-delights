
import React from 'react';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer id="contact" className="bg-white relative">
      <div className="border-t border-sage-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Column 1 - Brand & Social */}
            <div>
              <a href="#" className="inline-block">
                <h2 className="text-2xl font-serif text-sage-800 font-semibold mb-6">GreenPlate</h2>
              </a>
              <p className="text-sage-600 mb-6 max-w-xs">
                Premium meal subscriptions crafted with care for specific nutritional needs.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center text-sage-600 hover:bg-sage-200 transition-colors" aria-label="Instagram">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center text-sage-600 hover:bg-sage-200 transition-colors" aria-label="Facebook">
                  <Facebook size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center text-sage-600 hover:bg-sage-200 transition-colors" aria-label="Twitter">
                  <Twitter size={20} />
                </a>
              </div>
            </div>
            
            {/* Column 2 - Meal Plans */}
            <div>
              <h3 className="text-lg font-medium text-sage-800 mb-6">Meal Plans</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#plans" className="text-sage-600 hover:text-sage-800 transition-colors">Maternity Plan</a>
                </li>
                <li>
                  <a href="#plans" className="text-sage-600 hover:text-sage-800 transition-colors">Fitness & Keto</a>
                </li>
                <li>
                  <a href="#plans" className="text-sage-600 hover:text-sage-800 transition-colors">Corporate Meals</a>
                </li>
                <li>
                  <a href="#plans" className="text-sage-600 hover:text-sage-800 transition-colors">Custom Plans</a>
                </li>
              </ul>
            </div>
            
            {/* Column 3 - Company */}
            <div>
              <h3 className="text-lg font-medium text-sage-800 mb-6">Company</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#about" className="text-sage-600 hover:text-sage-800 transition-colors">About Us</a>
                </li>
                <li>
                  <a href="#" className="text-sage-600 hover:text-sage-800 transition-colors">How It Works</a>
                </li>
                <li>
                  <a href="#testimonials" className="text-sage-600 hover:text-sage-800 transition-colors">Testimonials</a>
                </li>
                <li>
                  <a href="#" className="text-sage-600 hover:text-sage-800 transition-colors">Careers</a>
                </li>
              </ul>
            </div>
            
            {/* Column 4 - Contact */}
            <div>
              <h3 className="text-lg font-medium text-sage-800 mb-6">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Mail size={20} className="text-sage-600 shrink-0 mt-0.5" />
                  <a href="mailto:hello@greenplate.com" className="text-sage-600 hover:text-sage-800 transition-colors">hello@greenplate.com</a>
                </li>
                <li className="flex items-start gap-3">
                  <Phone size={20} className="text-sage-600 shrink-0 mt-0.5" />
                  <a href="tel:+1-555-123-4567" className="text-sage-600 hover:text-sage-800 transition-colors">+1 (555) 123-4567</a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={20} className="text-sage-600 shrink-0 mt-0.5" />
                  <span className="text-sage-600">123 Green Avenue<br />San Francisco, CA 94107</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-sage-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sage-600 text-sm mb-4 md:mb-0">
              &copy; {currentYear} GreenPlate. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-sage-600 text-sm hover:text-sage-800 transition-colors">Privacy Policy</a>
              <a href="#" className="text-sage-600 text-sm hover:text-sage-800 transition-colors">Terms of Service</a>
              <a href="#" className="text-sage-600 text-sm hover:text-sage-800 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
