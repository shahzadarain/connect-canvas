import React from 'react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary to-background py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center md:text-left">
            <div className="mb-8">
              <img 
                src="/lovable-uploads/8cac0737-3e7f-4979-8c34-0aee6a5c5f26.png" 
                alt="UNHCR Jordan Data Analysis Group Header"
                className="w-full rounded-lg shadow-xl mb-6"
              />
            </div>
            <div className="prose prose-invert max-w-none">
              <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                With over two decades of experience, I have leveraged IT infrastructure, cloud solutions, AI, and data analytics to drive informed decision-making and deliver critical support to vulnerable populations.
              </p>
              <div className="space-y-6 text-gray-300">
                <h3 className="text-white text-2xl font-semibold mb-4">Key Highlights:</h3>
                <ul className="list-none space-y-4">
                  {[
                    "Data Integration for Crisis Response: Integrated refugee data with national health systems using scalable cloud platforms, resulting in improved access to essential services.",
                    "AI-Enhanced Communication: Introduced speech-to-text analytics and machine learning models, automating transcription and classification to enhance response times, accuracy, and inclusivity.",
                    "Data Governance & Intelligence: Implemented robust data governance measures and upgraded security protocols, leading to faster and more confident decision-making.",
                    "Scalable Information Channels: Deployed cloud-based helpline systems, automating thousands of daily inquiries to elevate service standards.",
                    "Building Technical Capacity: Collaborated with industry leaders to design training programs, developing essential digital competencies.",
                    "Predictive Analytics for Resource Allocation: Deployed machine learning models to strategically allocate resources.",
                    "Cybersecurity Leadership: Initiated the 'Cyber Security Hygiene' program, delivering over 20 targeted training sessions.",
                    "Infrastructure & Cloud Modernization: Migrated legacy environments to cloud-based architectures."
                  ].map((highlight, index) => (
                    <li key={index} className="flex items-start space-x-3 bg-primary/10 p-4 rounded-lg hover:bg-primary/20 transition-colors">
                      <span className="text-blue-400 font-semibold min-w-[24px]">{index + 1}.</span>
                      <span className="leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-lg mt-8 text-gray-300 leading-relaxed">
                I am passionate about collaborating on innovative solutions that leverage technology to address humanitarian challenges. Let's connect to discuss how we can drive impactful change together.
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {['DigitalTransformation', 'HumanitarianTech', 'AIInnovation', 'CloudComputing', 'Cybersecurity'].map((tag) => (
                  <span key={tag} className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-500/20 text-blue-200 hover:bg-blue-500/30 transition-colors">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-8">
              <button className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors">
                View Projects
              </button>
              <button className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors">
                Contact Me
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;