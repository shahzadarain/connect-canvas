import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MobileMenuButton from "./MobileMenuButton";

interface NavigationHeaderProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const NavigationHeader = ({ isOpen, toggleMenu }: NavigationHeaderProps) => {
  return (
    <div className="flex justify-between h-14">
      <div className="flex">
        <Link to="/" className="flex items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-xl font-bold"
          >
            <span className="text-white">Shahzad</span>{" "}
            <span className="text-purple-400">Asghar</span>
          </motion.div>
        </Link>
      </div>
      <MobileMenuButton isOpen={isOpen} toggleMenu={toggleMenu} />
    </div>
  );
};

export default NavigationHeader;