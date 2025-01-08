import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

type NavigationLinkProps = {
  to: string;
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
  mobile?: boolean;
  onClick?: () => void;
};

const NavigationLink = ({ to, children, className, mobile, isActive, onClick }: NavigationLinkProps) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive: routeActive }) =>
        cn(
          "relative px-4 py-2 transition-all duration-200",
          "text-white/90 hover:text-white font-medium",
          routeActive || isActive ? "bg-red-700/50" : "hover:bg-red-500/30",
          mobile ? "block text-base w-full rounded-lg" : "text-base rounded-md",
          className
        )
      }
    >
      {children}
    </NavLink>
  );
};

export default NavigationLink;