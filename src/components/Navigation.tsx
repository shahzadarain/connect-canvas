import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

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
  };

  const navItems = [
    ['projects', 'Projects'],
    ['impact', 'Global Impact'],
    ['learning', 'Learning Journey'],
    ['reading', 'Reading List'],
    ['submit', 'Submit Idea']
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-lg dark:bg-gray-900/80' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
          >
            Shahzad ASGHAR
          </motion.div>
          
          <div className="hidden md:flex gap-8">
            {navItems.map(([id, label]) => (
              <motion.button
                key={id}
                onClick={() => scrollToSection(id)}
                className={cn(
                  'relative py-2 px-3 text-sm font-medium transition-all duration-300 rounded-md',
                  activeSection === id
                    ? 'text-accent'
                    : 'text-primary/80 hover:text-accent dark:text-white/80 dark:hover:text-accent'
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {label}
                <motion.span
                  className={cn(
                    'absolute bottom-0 left-0 w-full h-0.5 bg-accent rounded-full',
                    activeSection === id ? 'opacity-100' : 'opacity-0'
                  )}
                  initial={false}
                  animate={{
                    scaleX: activeSection === id ? 1 : 0,
                    opacity: activeSection === id ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;