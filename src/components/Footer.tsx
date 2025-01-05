import React from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

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
        <div className="backdrop-blur-sm rounded-xl bg-white/5 border border-white/10 py-8 px-8 shadow-2xl">
          {/* Navigation Links */}
          <nav className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 text-white/90">
            <div>
              <h3 className="font-semibold mb-2">Main</h3>
              <ul className="space-y-1">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/achievements" className="hover:text-white transition-colors">Achievements</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">AI</h3>
              <ul className="space-y-1">
                <li><Link to="/ai-tools" className="hover:text-white transition-colors">AI Tools</Link></li>
                <li><Link to="/ai-news" className="hover:text-white transition-colors">AI News</Link></li>
                <li><Link to="/ai-humanitarian" className="hover:text-white transition-colors">AI Humanitarian</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Resources</h3>
              <ul className="space-y-1">
                <li><Link to="/reading" className="hover:text-white transition-colors">Reading List</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Connect</h3>
              <ul className="space-y-1">
                <li>
                  <a 
                    href="https://www.linkedin.com/in/shahzadasghar1/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          {/* Copyright */}
          <div className="text-center pt-8 border-t border-white/10">
            <p className="text-base font-medium">
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
      </div>
    </footer>
  );
};

export default Footer;