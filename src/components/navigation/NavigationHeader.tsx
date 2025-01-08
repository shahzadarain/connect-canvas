import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MobileMenuButton from "./MobileMenuButton";

interface NavigationHeaderProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const NavigationHeader = ({ isOpen, toggleMenu }: NavigationHeaderProps) => {
  return (
    <div className="flex justify-between h-16">
      <div className="flex">
        <Link to="/" className="flex items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-xl font-bold text-white hover:text-secondary transition-colors duration-300"
          >
            Shahzad Asghar
          </motion.div>
        </Link>
      </div>
      <MobileMenuButton isOpen={isOpen} toggleMenu={toggleMenu} />
    </div>
  );
};

export default NavigationHeader;