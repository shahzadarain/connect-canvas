import { motion } from "framer-motion";
import { useState } from "react";

export const PortalButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleProfileClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      window.open('https://www.linkedin.com/in/shahzadasghar1/', '_blank');
      setIsClicked(false);
    }, 1000);
  };

  return (
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
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(34,211,238,0.3),transparent_70%)]" />
        
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
        
        <span className="relative z-10 text-lg font-semibold text-white group-hover:text-cyan-100">
          Enter Portal →
        </span>

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
  );
};