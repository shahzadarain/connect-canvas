import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Shield, Cloud, Globe, Brain, Database } from "lucide-react";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const Hero = () => {
  const isMobile = useIsMobile();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorParticles, setCursorParticles] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isMobile) {
        const particle = {
          x: e.clientX,
          y: e.clientY,
          id: Date.now(),
        };
        setCursorParticles(prev => [...prev.slice(-20), particle]);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  const hashTags = [
    { tag: "#DigitalTransformation", icon: <Database className="w-4 h-4" /> },
    { tag: "#HumanitarianTech", icon: <Globe className="w-4 h-4" /> },
    { tag: "#AIInnovation", icon: <Brain className="w-4 h-4" /> },
    { tag: "#CloudComputing", icon: <Cloud className="w-4 h-4" /> },
    { tag: "#Cybersecurity", icon: <Shield className="w-4 h-4" /> }
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Primary Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#334155]" />
      
      {/* Subtle Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Secondary Gradient Overlay for Depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-[#1E293B]/50 opacity-60" />

      {/* Content Container */}
      <div className="relative container mx-auto px-4 py-16 z-10">
        <motion.div 
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header Section */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
              SHAHZAD ASGHAR
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 font-light mb-6">
              Welcome to the Future of Technology
            </p>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Bridging Innovation and Humanity through Digital Transformation
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            {/* Left Column - Profile Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10"
            >
              <img 
                src="/lovable-uploads/d2df6a7d-ce1e-4662-95f7-9d2b827dc804.png"
                alt="Shahzad Asghar speaking at an event"
                className="w-full h-full object-cover object-center rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent" />
            </motion.div>

            {/* Right Column - Description */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-6 text-gray-200"
            >
              <p className="text-lg leading-relaxed">
                With two decades of experience, I've pioneered the integration of IT infrastructure,
                cloud services, AI, and analytics to support informed decisions and protect vulnerable
                communities.
              </p>
              <p className="text-lg leading-relaxed">
                My work spans from integrating refugee data with national health systems to
                implementing AI-enabled communication solutions.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  asChild
                  className="group bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                >
                  <a 
                    href="https://www.linkedin.com/in/shahzadasghar1/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <span className="relative z-10">View Profile →</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="group bg-transparent border-2 border-blue-400 text-blue-300 hover:bg-blue-500/10 px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <a 
                    href="https://www.linkedin.com/in/shahzadasghar1/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Connect with Me →
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* HashTags Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap justify-center gap-3 mt-8"
          >
            {hashTags.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-blue-200 text-sm font-medium border border-blue-400/20 hover:border-blue-400/50 transition-all duration-300 cursor-pointer backdrop-blur-sm"
              >
                {item.icon}
                <span>{item.tag}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Cursor particles effect */}
      {cursorParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className="fixed w-2 h-2 bg-blue-400 rounded-full pointer-events-none"
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{
            opacity: 0,
            scale: 0,
            x: particle.x - 4,
            y: particle.y - 4,
          }}
          transition={{ duration: 1 }}
        />
      ))}
    </section>
  );
};

export default Hero;