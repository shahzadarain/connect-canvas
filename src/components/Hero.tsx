import React from 'react';
import { Sparkles, Globe, Building } from 'lucide-react';

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1A1F2C] via-[#2C3E50] to-[#1A1F2C] py-20">
      {/* Animated background patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px] animate-[slide_20s_linear_infinite]" />
        </div>
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1F2C]/98 via-[#1A1F2C]/95 to-[#1A1F2C]/98" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Enhanced glass card with better blur and border effects */}
          <div className="bg-white/[0.03] backdrop-blur-2xl rounded-2xl p-8 shadow-2xl border border-white/10 transform hover:scale-[1.01] transition-all duration-700">
            {/* Header with icons */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <Building className="w-8 h-8 text-blue-400 animate-float" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
                SHAHZAD ASGHAR
              </h1>
              <Globe className="w-8 h-8 text-blue-400 animate-float" />
            </div>
            
            {/* Tagline with sparkles */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <Sparkles className="w-5 h-5 text-blue-400" />
              <p className="text-xl text-blue-200 font-light">Innovation is my passion</p>
              <Sparkles className="w-5 h-5 text-blue-400" />
            </div>
            
            {/* Mission statement */}
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-light tracking-wide mb-8">
              With two decades of experience, I've merged IT infrastructure, cloud services, AI, and analytics to support informed decisions and protect vulnerable communities. My work spans from integrating refugee data with national health systems to implementing AI-enabled communication solutions.
            </p>
            
            {/* Enhanced tags with better hover effects and animations */}
            <div className="flex flex-wrap gap-3 mt-8 justify-start">
              {['DigitalTransformation', 'HumanitarianTech', 'AIInnovation', 'CloudComputing', 'Cybersecurity'].map((tag, index) => (
                <span 
                  key={tag} 
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-500/10 text-blue-200 hover:bg-blue-500/20 transition-all duration-500 cursor-pointer border border-blue-400/20 hover:border-blue-400/30 hover:scale-105">
                    #{tag}
                  </span>
                </span>
              ))}
            </div>
          </div>
          
          {/* Call-to-action buttons */}
          <div className="flex flex-wrap gap-6 justify-start mt-12">
            <a 
              href="https://www.linkedin.com/in/shahzadasghar1/"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white rounded-full transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-blue-500/25 font-medium"
            >
              View Profile
              <span className="inline-block transition-transform group-hover:translate-x-2 ml-2 duration-500">→</span>
            </a>
            <a
              href="https://www.linkedin.com/in/shahzadasghar1/"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 bg-white/[0.03] hover:bg-white/[0.08] text-white rounded-full transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-white/10 backdrop-blur-xl font-medium border border-white/10 hover:border-white/20"
            >
              Connect with Me
              <span className="inline-block transition-transform group-hover:translate-x-2 ml-2 duration-500">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
