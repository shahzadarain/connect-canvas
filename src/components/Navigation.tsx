import React from 'react';

const Navigation = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="text-xl font-bold">Shahzad ASGHAR</div>
          <div className="hidden md:flex gap-8">
            <button 
              onClick={() => scrollToSection('projects')} 
              className="text-primary hover:text-accent transition-colors"
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection('impact')} 
              className="text-primary hover:text-accent transition-colors"
            >
              Global Impact
            </button>
            <button 
              onClick={() => scrollToSection('learning')} 
              className="text-primary hover:text-accent transition-colors"
            >
              Learning Journey
            </button>
            <button 
              onClick={() => scrollToSection('reading')} 
              className="text-primary hover:text-accent transition-colors"
            >
              Reading List
            </button>
            <button 
              onClick={() => scrollToSection('submit')} 
              className="text-primary hover:text-accent transition-colors"
            >
              Submit Idea
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;