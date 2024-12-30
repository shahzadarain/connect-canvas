import React from 'react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary via-primary/90 to-background py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center md:text-left">
            <div className="mb-8">
              <img 
                src="/lovable-uploads/8cac0737-3e7f-4979-8c34-0aee6a5c5f26.png" 
                alt="UNHCR Jordan Data Analysis Group Header"
                className="w-full rounded-lg shadow-xl mb-6 hover:shadow-2xl transition-shadow duration-300"
              />
            </div>
            <div className="max-w-3xl mx-auto md:mx-0">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 shadow-xl">
                <p className="text-lg md:text-xl text-gray-100 leading-relaxed">
                  With two decades of experience, I've merged IT infrastructure, cloud services, AI, and analytics to support informed decisions and protect vulnerable communities. Highlights include integrating refugee data with national health systems, AI-enabled communication, data governance improvements, cloud-based helplines, digital capacity-building, predictive analytics for resource planning, cybersecurity awareness initiatives, and modernizing legacy systems. I welcome collaborations that apply technology for meaningful humanitarian outcomes.
                </p>
                <div className="flex flex-wrap gap-3 mt-8 justify-center md:justify-start">
                  {['DigitalTransformation', 'HumanitarianTech', 'AIInnovation', 'CloudComputing', 'Cybersecurity'].map((tag) => (
                    <span 
                      key={tag} 
                      className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-500/20 text-blue-100 hover:bg-blue-500/30 transition-colors cursor-pointer border border-blue-400/20"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-6 justify-center md:justify-start mt-8">
                <button className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium">
                  View Projects
                </button>
                <button className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl backdrop-blur-sm font-medium border border-white/20">
                  Contact Me
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;