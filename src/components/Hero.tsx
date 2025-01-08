import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { BubbleTags } from "./hero/BubbleTags";
import { BackgroundText } from "./hero/BackgroundText";
import { PortalButton } from "./hero/PortalButton";
import { TypeAnimation } from 'react-type-animation';

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
            <div className="text-xl md:text-2xl text-white font-black mb-6 font-serif h-12">
              <span className="bg-[#0047AB] px-4 py-2 inline-block">
                <TypeAnimation
                  sequence={[
                    '✨ Innovation is my passion ✨',
                    3000,
                    '✨ Transforming Ideas into Reality ✨',
                    3000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </span>
            </div>
            <div className="text-lg md:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed font-serif min-h-[120px]">
              <TypeAnimation
                sequence={[
                  1000, // Wait 1s before starting
                  'Merging IT Infrastructure with Innovation',
                  1000,
                  'Integrating Cloud Services for Scalability',
                  1000,
                  'Leveraging AI for Intelligent Solutions',
                  1000,
                  'Empowering Analytics for Informed Decisions',
                  1000,
                  `With two decades of experience, I've merged IT infrastructure, cloud services, AI, and analytics to support informed decisions and protect vulnerable communities. My work spans from integrating refugee data with national health systems to implementing AI-enabled communication solutions.`,
                  5000,
                ]}
                wrapper="p"
                speed={50}
                repeat={Infinity}
                className="bg-[#0FA0CE]/20 px-4 py-2"
              />
            </div>
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