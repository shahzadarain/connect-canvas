import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative py-12 mt-20">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent" />
      
      {/* Animated pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(135deg, #9b87f5 25%, transparent 25%), 
                           linear-gradient(225deg, #9b87f5 25%, transparent 25%), 
                           linear-gradient(45deg, #9b87f5 25%, transparent 25%), 
                           linear-gradient(315deg, #9b87f5 25%, transparent 25%)`,
          backgroundPosition: '10px 0, 10px 0, 0 0, 0 0',
          backgroundSize: '20px 20px',
          backgroundRepeat: 'repeat',
          animation: 'slide 20s linear infinite'
        }}
      />

      {/* Glass effect container */}
      <div className="relative container mx-auto px-4">
        <div className="backdrop-blur-sm rounded-xl bg-white/5 border border-white/10 py-6 px-8 shadow-2xl">
          <p className="text-center text-base font-medium">
            <span className="bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
              Developed by Shahzad with ReactJS and{' '}
            </span>
            <Heart 
              className="inline-block w-5 h-5 mx-1 text-red-500 animate-pulse" 
              fill="currentColor"
            />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;