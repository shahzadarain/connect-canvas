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
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0B0F17]">
      {/* Subtle Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Content Container */}
      <div className="relative container mx-auto px-4 py-16 z-10">
        <motion.div 
          className="max-w-5xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Header Section */}
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#60A5FA] mb-4 tracking-tight">
              SHAHZAD ASGHAR
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light mb-6">
              ✨ Innovation is my passion ✨
            </p>
            <p className="text-lg md:text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              With two decades of experience, I've merged IT infrastructure, cloud services, AI, and analytics to support
              informed decisions and protect vulnerable communities. My work spans from integrating refugee data
              with national health systems to implementing AI-enabled communication solutions.
            </p>
          </motion.div>

          {/* HashTags Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 mt-12 mb-12"
          >
            {hashTags.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A1F2C]/50 text-[#60A5FA] text-sm font-medium border border-[#60A5FA]/20 hover:border-[#60A5FA]/50 transition-all duration-300"
              >
                {item.icon}
                <span>{item.tag}</span>
              </motion.div>
            ))}
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          >
            <Button
              asChild
              className="bg-[#60A5FA] hover:bg-[#60A5FA]/90 text-white px-8 py-6 text-lg font-semibold rounded-xl"
            >
              <a 
                href="https://www.linkedin.com/in/shahzadasghar1/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                View Profile →
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-2 border-[#60A5FA]/30 text-[#60A5FA] hover:bg-[#60A5FA]/10 px-8 py-6 text-lg font-semibold rounded-xl"
            >
              <a 
                href="https://www.linkedin.com/in/shahzadasghar1/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Connect with Me →
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Cursor particles effect */}
      {cursorParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className="fixed w-2 h-2 bg-[#60A5FA] rounded-full pointer-events-none"
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