import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['projects', 'impact', 'learning', 'reading', 'submit'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }

      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
      isScrolled ? 'bg-white/80 backdrop-blur-xl shadow-lg dark:bg-gray-900/80' : 'bg-transparent'
    )}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <div className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-300 cursor-pointer">
            Shahzad ASGHAR
          </div>
          
          <div className={cn(
            "fixed md:relative top-20 md:top-0 left-0 md:left-auto w-full md:w-auto h-screen md:h-auto bg-white/95 dark:bg-gray-900/95 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none transition-transform duration-300 ease-in-out transform md:transform-none",
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
            "md:flex md:items-center md:gap-8"
          )}>
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 px-6 md:px-0 pt-6 md:pt-0">
              {[
                ['projects', 'Projects'],
                ['impact', 'Global Impact'],
                ['learning', 'Learning Journey'],
                ['reading', 'Reading List'],
                ['submit', 'Submit Idea']
              ].map(([id, label]) => (
                <button 
                  key={id}
                  onClick={() => scrollToSection(id)} 
                  className={cn(
                    "relative py-2 text-sm font-medium transition-all duration-300",
                    activeSection === id 
                      ? 'text-accent' 
                      : 'text-primary/80 hover:text-accent dark:text-white/80 dark:hover:text-accent'
                  )}
                >
                  {label}
                  <span 
                    className={cn(
                      "absolute bottom-0 left-0 w-full h-0.5 bg-accent transform origin-left transition-transform duration-500",
                      activeSection === id ? 'scale-x-100' : 'scale-x-0'
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;