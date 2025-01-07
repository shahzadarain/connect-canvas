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
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#1A1F2C] via-[#1A1F2C]/95 to-[#1A1F2C]/90">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Main Content Container */}
      <div className="relative container mx-auto px-4 py-16">
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
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-secondary to-accent animate-gradient-x mb-4">
              SHAHZAD ASGHAR
            </h1>
            <p className="text-xl md:text-2xl text-secondary/90 font-light mb-6">
              Welcome to the Future of Technology
            </p>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              Bridging Innovation and Humanity through Digital Transformation
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            {/* Left Column - Abstract Illustration */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-secondary/20 to-accent/20 border border-white/10"
            >
              <div className="absolute inset-0 backdrop-blur-sm">
                {/* Add your 3D or abstract illustration here */}
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 to-accent/30 mix-blend-overlay" />
              </div>
            </motion.div>

            {/* Right Column - Description */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-6 text-white/90"
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
                  className="group bg-secondary hover:bg-secondary-dark text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                >
                  <a 
                    href="https://www.linkedin.com/in/shahzadasghar1/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <span className="relative z-10">View Profile →</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary-dark to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="group bg-transparent border-2 border-secondary text-secondary hover:bg-secondary/10 px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
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
                className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-secondary text-sm font-medium border border-secondary/20 hover:border-secondary/50 transition-all duration-300 cursor-pointer backdrop-blur-sm"
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
          className="fixed w-2 h-2 bg-secondary rounded-full pointer-events-none"
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