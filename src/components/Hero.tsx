import React from 'react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary to-background py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-float">
              Building Technology<br />for Global Impact
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
              International technology leader with 15+ years of experience developing solutions
              across AI, cybersecurity, and digital transformation in humanitarian contexts.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <button className="px-8 py-3 bg-accent hover:bg-accent/90 text-white rounded-full transition-colors">
                View Projects
              </button>
              <button className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors">
                Contact Me
              </button>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="w-64 h-64 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-white/20 shadow-xl animate-float">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;