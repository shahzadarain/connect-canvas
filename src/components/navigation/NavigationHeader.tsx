import { Link } from "react-router-dom";
import MobileMenuButton from "./MobileMenuButton";

interface NavigationHeaderProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const NavigationHeader = ({ isOpen, toggleMenu }: NavigationHeaderProps) => {
  return (
    <div className="flex justify-between h-16">
      <div className="flex">
        <div className="flex-shrink-0 flex items-center">
          <Link 
            to="/" 
            className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
          >
            Shahzad Asghar
          </Link>
        </div>
      </div>
      <MobileMenuButton isOpen={isOpen} toggleMenu={toggleMenu} />
    </div>
  );
};

export default NavigationHeader;