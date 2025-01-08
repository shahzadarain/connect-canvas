import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MobileMenuButton from "./MobileMenuButton";

interface NavigationHeaderProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const NavigationHeader = ({ isOpen, toggleMenu }: NavigationHeaderProps) => {
  return (
    <div className="flex justify-end h-12 items-center sm:hidden">
      <MobileMenuButton isOpen={isOpen} toggleMenu={toggleMenu} />
    </div>
  );
};

export default NavigationHeader;