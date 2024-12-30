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
              <p className="text-lg md:text-xl text-gray-300 mb-8">
                With over two decades of experience, I have leveraged IT infrastructure, cloud solutions, AI, and data analytics to drive informed decision-making and deliver critical support to vulnerable populations.
              </p>
              <div className="space-y-4 text-gray-300">
                <h3 className="text-white text-xl font-semibold">Key Highlights:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Data Integration for Crisis Response: Integrated refugee data with national health systems using scalable cloud platforms, resulting in improved access to essential services.</li>
                  <li>AI-Enhanced Communication: Introduced speech-to-text analytics and machine learning models, automating transcription and classification to enhance response times, accuracy, and inclusivity.</li>
                  <li>Data Governance & Intelligence: Implemented robust data governance measures and upgraded security protocols, leading to faster and more confident decision-making.</li>
                  <li>Scalable Information Channels: Deployed cloud-based helpline systems, automating thousands of daily inquiries to elevate service standards.</li>
                  <li>Building Technical Capacity: Collaborated with industry leaders to design training programs, developing essential digital competencies.</li>
                  <li>Predictive Analytics for Resource Allocation: Deployed machine learning models to strategically allocate resources.</li>
                  <li>Cybersecurity Leadership: Initiated the 'Cyber Security Hygiene' program, delivering over 20 targeted training sessions.</li>
                  <li>Infrastructure & Cloud Modernization: Migrated legacy environments to cloud-based architectures.</li>
                </ul>
              </div>
              <p className="text-lg mt-6 text-gray-300">
                I am passionate about collaborating on innovative solutions that leverage technology to address humanitarian challenges. Let's connect to discuss how we can drive impactful change together.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {['DigitalTransformation', 'HumanitarianTech', 'AIInnovation', 'CloudComputing', 'Cybersecurity'].map((tag) => (
                  <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-200">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-8">
              <button className="px-8 py-3 bg-accent hover:bg-accent/90 text-white rounded-full transition-colors">
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