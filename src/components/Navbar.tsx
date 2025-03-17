
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "py-3 bg-white/90 shadow-sm backdrop-blur-sm" 
          : "py-5 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          <a href="#" className="text-2xl font-serif text-sage-800 font-semibold">GreenPlate</a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#plans" className="text-sage-700 hover:text-sage-900 transition-colors">Plans</a>
            <a href="#about" className="text-sage-700 hover:text-sage-900 transition-colors">Our Story</a>
            <a href="#testimonials" className="text-sage-700 hover:text-sage-900 transition-colors">Testimonials</a>
            <a href="#contact" className="text-sage-700 hover:text-sage-900 transition-colors">Contact</a>
            <a 
              href="#subscribe" 
              className="bg-sage-500 hover:bg-sage-600 text-white px-5 py-2 rounded-md font-medium transition-all"
            >
              Subscribe Now
            </a>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-sage-800" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 top-full bg-white shadow-lg border-t border-sage-100 animate-fade-in">
            <div className="flex flex-col space-y-4 p-4">
              <a 
                href="#plans" 
                className="text-sage-700 hover:text-sage-900 py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Plans
              </a>
              <a 
                href="#about" 
                className="text-sage-700 hover:text-sage-900 py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Our Story
              </a>
              <a 
                href="#testimonials" 
                className="text-sage-700 hover:text-sage-900 py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Testimonials
              </a>
              <a 
                href="#contact" 
                className="text-sage-700 hover:text-sage-900 py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <a 
                href="#subscribe" 
                className="bg-sage-500 hover:bg-sage-600 text-white px-5 py-2 rounded-md font-medium transition-all text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Subscribe Now
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
