import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Smartphone, Globe } from "lucide-react";
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { StarField, FloatingOrbs } from "./hero/HeroBackground";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const Hero = () => {
  const [greeting, setGreeting] = useState("");
  const isMobile = useIsMobile();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorParticles, setCursorParticles] = useState([]);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Add particle effect
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

  return (
    <section 
      className="relative min-h-[80vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden"
      aria-label="Introduction"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 -z-10">
        <Canvas camera={{ position: [0, 0, 2] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <StarField />
          <FloatingOrbs />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      {/* Cursor particles */}
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

      <motion.div 
        className="relative max-w-5xl mx-auto p-4 sm:p-6 md:p-10 rounded-3xl bg-black/30 backdrop-blur-sm border border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.1 }}
            className="transition-transform"
          >
            <Smartphone className="w-8 h-8 sm:w-10 sm:h-10 text-secondary" aria-hidden="true" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-secondary via-secondary-dark to-accent animate-gradient-x"
          >
            {greeting}, I'm SHAHZAD ASGHAR
          </motion.h1>
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.1 }}
            className="transition-transform"
          >
            <Globe className="w-8 h-8 sm:w-10 sm:h-10 text-secondary" aria-hidden="true" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8 sm:mb-10 max-w-3xl mx-auto"
        >
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-secondary mb-4 sm:mb-6 tracking-wide">
            ✨ Innovation is my passion ✨
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed px-4 sm:px-0">
            With two decades of experience, I've merged IT infrastructure, cloud services,
            AI, and analytics to support informed decisions and protect vulnerable
            communities. My work spans from integrating refugee data with national
            health systems to implementing AI-enabled communication solutions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-10 px-2 sm:px-0"
        >
          {["#DigitalTransformation", "#HumanitarianTech", "#AIInnovation", "#CloudComputing", "#Cybersecurity"].map(
            (tag, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(96, 165, 250, 0.2)" }}
                className="px-3 sm:px-6 py-2 sm:py-3 rounded-full bg-white/5 text-secondary text-sm sm:text-base font-medium border border-secondary/20 hover:border-secondary/50 transition-all duration-300 cursor-pointer backdrop-blur-sm"
              >
                {tag}
              </motion.span>
            )
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6"
        >
          <Button
            asChild
            className="group bg-secondary hover:bg-secondary-dark text-white px-6 sm:px-8 py-4 sm:py-5 text-sm sm:text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto relative overflow-hidden"
          >
            <a 
              href="https://www.linkedin.com/in/shahzadasghar1/" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="View Shahzad's LinkedIn Profile"
            >
              <span className="relative z-10">View Profile →</span>
              <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary-dark to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="group bg-transparent border-2 border-secondary text-secondary hover:bg-secondary/10 px-6 sm:px-8 py-4 sm:py-5 text-sm sm:text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto relative overflow-hidden"
          >
            <a 
              href="https://www.linkedin.com/in/shahzadasghar1/" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Connect with Shahzad on LinkedIn"
            >
              <span className="relative z-10">Connect with Me →</span>
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 via-secondary-dark/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;