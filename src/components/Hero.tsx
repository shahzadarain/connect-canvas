import React from 'react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1A1F2C] via-[#2C3E50] to-[#1A1F2C] py-20">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80')] opacity-20 bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1F2C]/80 via-[#1A1F2C]/70 to-[#1A1F2C]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <img 
              src="/lovable-uploads/8cac0737-3e7f-4979-8c34-0aee6a5c5f26.png" 
              alt="UNHCR Jordan Data Analysis Group Header"
              className="w-full rounded-2xl shadow-2xl hover:shadow-blue-500/20 transition-all duration-500"
            />
          </div>
          
          <div className="bg-white/[0.08] backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/10">
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-light">
              With two decades of experience, I've merged IT infrastructure, cloud services, AI, and analytics to support informed decisions and protect vulnerable communities. Highlights include integrating refugee data with national health systems, AI-enabled communication, data governance improvements, cloud-based helplines, digital capacity-building, predictive analytics for resource planning, cybersecurity awareness initiatives, and modernizing legacy systems. I welcome collaborations that apply technology for meaningful humanitarian outcomes.
            </p>
            
            <div className="flex flex-wrap gap-3 mt-8 justify-start">
              {['DigitalTransformation', 'HumanitarianTech', 'AIInnovation', 'CloudComputing', 'Cybersecurity'].map((tag) => (
                <span 
                  key={tag} 
                  className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-500/10 text-blue-200 hover:bg-blue-500/20 transition-all duration-300 cursor-pointer border border-blue-400/20 hover:border-blue-400/40 hover:scale-105"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-6 justify-start mt-8">
            <a 
              href="https://www.linkedin.com/in/shahzadasghar1/"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 font-medium"
            >
              View Profile
              <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
            </a>
            <a
              href="https://www.linkedin.com/in/shahzadasghar1/"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 bg-white/[0.08] hover:bg-white/[0.12] text-white rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-white/10 backdrop-blur-sm font-medium border border-white/10 hover:border-white/20"
            >
              Connect with Me
              <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;