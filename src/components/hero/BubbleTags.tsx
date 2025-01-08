import { motion } from "framer-motion";
import { useState } from "react";

interface BubbleTag {
  short: string;
  full: string;
}

const bubbleTags: BubbleTag[] = [
  { short: "#DT", full: "#DigitalTransformation" },
  { short: "#HT", full: "#HumanitarianTech" },
  { short: "#AI", full: "#AIInnovation" },
  { short: "#CC", full: "#CloudComputing" },
  { short: "#CS", full: "#Cybersecurity" }
];

export const BubbleTags = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="flex flex-wrap justify-center gap-3 mt-8 mb-8"
    >
      {bubbleTags.map((tag, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 + index * 0.1 }}
          className="relative"
          onHoverStart={() => setHoveredIndex(index)}
          onHoverEnd={() => setHoveredIndex(null)}
        >
          <motion.div
            className={`
              cursor-pointer rounded-full 
              bg-gradient-to-r from-cyan-500/20 to-blue-500/20
              border-2 border-cyan-500
              flex items-center justify-center
              transition-all duration-300
              ${hoveredIndex === index ? 'shadow-lg shadow-cyan-500/30' : ''}
            `}
            animate={{
              width: hoveredIndex === index ? 'auto' : '3.5rem',
              height: '3.5rem',
              padding: hoveredIndex === index ? '0.75rem 1.5rem' : '0.75rem',
            }}
          >
            <motion.span 
              className="text-white font-semibold whitespace-nowrap"
              animate={{
                opacity: 1
              }}
            >
              {hoveredIndex === index ? tag.full : tag.short}
            </motion.span>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
};