import { motion } from "framer-motion";
import MobileMenuButton from "./MobileMenuButton";

interface NavigationHeaderProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const NavigationHeader = ({ isOpen, toggleMenu }: NavigationHeaderProps) => {
  return (
    <div className="flex sm:hidden items-center">
      <MobileMenuButton isOpen={isOpen} toggleMenu={toggleMenu} />
    </div>
  );
};

export default NavigationHeader;