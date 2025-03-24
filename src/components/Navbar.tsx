
import React, { useState, useEffect } from 'react';
import { Menu, X, LogIn, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from './Logo';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Check if user is logged in
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate('/');
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };

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
          <a href="/" className="flex items-center">
            <Logo />
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#plans" className="text-sage-700 hover:text-sage-900 transition-colors">Plans</a>
            <a href="#about" className="text-sage-700 hover:text-sage-900 transition-colors">Our Story</a>
            <a href="#testimonials" className="text-sage-700 hover:text-sage-900 transition-colors">Testimonials</a>
            <a href="#contact" className="text-sage-700 hover:text-sage-900 transition-colors">Contact</a>
            
            {isLoggedIn ? (
              <>
                <Button 
                  variant="ghost"
                  className="text-sage-700 hover:text-sage-900 transition-colors"
                  onClick={handleDashboard}
                >
                  My Dashboard
                </Button>
                <Button 
                  variant="outline"
                  className="border-sage-500 text-sage-700 hover:bg-sage-100"
                  onClick={handleLogout}
                >
                  <LogOut size={18} className="mr-2" /> Logout
                </Button>
              </>
            ) : (
              <Button 
                className="bg-sage-500 hover:bg-sage-600 text-white"
                onClick={handleLogin}
              >
                <LogIn size={18} className="mr-2" /> Sign In
              </Button>
            )}
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
              
              {isLoggedIn ? (
                <>
                  <button 
                    className="text-sage-700 hover:text-sage-900 py-2 transition-colors text-left"
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleDashboard();
                    }}
                  >
                    My Dashboard
                  </button>
                  <button 
                    className="bg-sage-100 text-sage-700 hover:bg-sage-200 py-2 px-4 rounded transition-colors text-left flex items-center"
                    onClick={() => {
                      setIsMenuOpen(false);
                      handleLogout();
                    }}
                  >
                    <LogOut size={18} className="mr-2" /> Logout
                  </button>
                </>
              ) : (
                <button 
                  className="bg-sage-500 hover:bg-sage-600 text-white py-2 px-4 rounded transition-colors flex items-center justify-center"
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleLogin();
                  }}
                >
                  <LogIn size={18} className="mr-2" /> Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
