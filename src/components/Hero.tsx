import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { BubbleTags } from "./hero/BubbleTags";
import { BackgroundText } from "./hero/BackgroundText";
import { PortalButton } from "./hero/PortalButton";

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

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#001524]">
      <BackgroundText />

      {/* Subtle Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative container mx-auto px-4 py-16 z-10">
        <motion.div 
          className="max-w-5xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight">
              <span className="bg-[#0047AB] text-white px-4 py-2 inline-block w-full">
                SHAHZAD ASGHAR
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white font-black mb-6 font-serif">
              <span className="bg-[#0047AB] px-4 py-2 inline-block">
                ✨ Innovation is my passion ✨
              </span>
            </p>
            <p className="text-lg md:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed font-serif">
              With two decades of experience, I've merged{' '}
              <span className="bg-[#0FA0CE]/20 px-1">IT infrastructure</span>,{' '}
              <span className="bg-[#0FA0CE]/20 px-1">cloud services</span>,{' '}
              <span className="bg-[#0FA0CE]/20 px-1">AI</span>, and{' '}
              <span className="bg-[#0FA0CE]/20 px-1">analytics</span> to support
              informed decisions and protect vulnerable communities. My work spans from integrating{' '}
              <span className="bg-[#0FA0CE]/20 px-1">refugee data</span> with{' '}
              <span className="bg-[#0FA0CE]/20 px-1">national health systems</span> to implementing{' '}
              <span className="bg-[#0FA0CE]/20 px-1">AI-enabled communication solutions</span>.
            </p>
          </motion.div>
          
          <BubbleTags />
          <PortalButton />

          {/* Cursor particles effect */}
          {cursorParticles.map((particle) => (
            <motion.div
              key={particle.id}
              className="fixed w-2 h-2 bg-[#0FA0CE] rounded-full pointer-events-none"
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
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;