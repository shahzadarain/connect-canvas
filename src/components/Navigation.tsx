import React, { useState, useEffect } from 'react';

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

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Shahzad ASGHAR
          </div>
          <div className="hidden md:flex gap-8">
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
                className={`relative py-2 text-sm font-medium transition-colors ${
                  activeSection === id 
                    ? 'text-accent' 
                    : 'text-primary/80 hover:text-accent'
                }`}
              >
                {label}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-accent transform origin-left transition-transform duration-300 ${
                  activeSection === id ? 'scale-x-100' : 'scale-x-0'
                }`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;