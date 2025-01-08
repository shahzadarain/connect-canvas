import { motion } from "framer-motion";

interface MobileMenuButtonProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const MobileMenuButton = ({ isOpen, toggleMenu }: MobileMenuButtonProps) => {
  return (
    <motion.button 
      onClick={toggleMenu}
      className="sm:hidden p-2 rounded-md hover:bg-red-500/30 transition-colors duration-300 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle mobile menu"
    >
      <motion.div
        className="w-6 h-6 relative"
        animate={isOpen ? "open" : "closed"}
      >
        <motion.span
          className="absolute w-6 h-0.5 bg-white transform-gpu"
          variants={{
            open: { rotate: 45, y: 6 },
            closed: { rotate: 0, y: 0 }
          }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="absolute w-6 h-0.5 bg-white transform-gpu"
          variants={{
            open: { opacity: 0 },
            closed: { opacity: 1 }
          }}
          transition={{ duration: 0.2 }}
          style={{ top: "50%", marginTop: "-1px" }}
        />
        <motion.span
          className="absolute w-6 h-0.5 bg-white transform-gpu"
          variants={{
            open: { rotate: -45, y: -6 },
            closed: { rotate: 0, y: 0 }
          }}
          transition={{ duration: 0.2 }}
          style={{ bottom: 0 }}
        />
      </motion.div>
    </motion.button>
  );
};

export default MobileMenuButton;