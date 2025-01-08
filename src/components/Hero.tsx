import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Shield, Cloud, Globe, Brain, Database } from "lucide-react";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const Hero = () => {
  const isMobile = useIsMobile();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorParticles, setCursorParticles] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

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
    { tag: "#DigitalTransformation" },
    { tag: "#HumanitarianTech" },
    { tag: "#AIInnovation" },
    { tag: "#CloudComputing" },
    { tag: "#Cybersecurity" }
  ];

  const handleProfileClick = () => {
    setIsClicked(true);
    // Delay the navigation to allow the animation to play
    setTimeout(() => {
      window.open('https://www.linkedin.com/in/shahzadasghar1/', '_blank');
      setIsClicked(false);
    }, 1000);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#001524]">
      {/* Large Number Background */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none">
        <div className="text-[20rem] font-bold bg-gradient-to-b from-[#0FA0CE] to-[#0047AB] bg-clip-text text-transparent">
          18
        </div>
      </div>

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
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col gap-4 mt-8 mb-8 max-w-2xl mx-auto"
          >
            {hashTags.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center justify-center px-4 py-2 bg-white border-2 border-[#FF4500] text-[#FF4500] text-base md:text-lg font-bold hover:bg-[#FF4500] hover:text-white transition-all duration-300"
              >
                <span>{item.tag}</span>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Holographic Portal Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center mt-8"
          >
            <motion.button
              onClick={handleProfileClick}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              animate={{
                scale: isClicked ? 20 : 1,
                opacity: isClicked ? 0 : 1,
              }}
              transition={{
                duration: isClicked ? 0.8 : 0.3,
                ease: "easeInOut"
              }}
              className={`
                relative group
                px-12 py-7 rounded-2xl
                bg-transparent
                overflow-hidden
                transition-all duration-300
                border-2 border-cyan-500
                hover:border-cyan-400
                ${isHovered ? 'shadow-[0_0_30px_rgba(34,211,238,0.5)]' : ''}
              `}
            >
              {/* Holographic background effects */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-50" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(34,211,238,0.3),transparent_70%)]" />
              
              {/* Animated border glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-30"
                animate={{
                  backgroundPosition: isHovered ? ["0% 50%", "100% 50%"] : "0% 50%",
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
              
              {/* Button content */}
              <span className="relative z-10 text-lg font-semibold text-white group-hover:text-cyan-100">
                Enter Portal →
              </span>

              {/* Ripple effect on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20"
                animate={{
                  scale: isHovered ? [1, 1.2] : 1,
                  opacity: isHovered ? [0.5, 0] : 0,
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
              />
            </motion.button>
          </motion.div>

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
