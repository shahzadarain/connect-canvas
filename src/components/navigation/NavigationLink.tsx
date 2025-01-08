import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type NavigationLinkProps = {
  to: string;
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
  mobile?: boolean;
};

const NavigationLink = ({ to, children, className, mobile, isActive }: NavigationLinkProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive: routeActive }) =>
        cn(
          "relative px-6 py-2.5 rounded-full transition-all duration-200",
          "text-white/90 hover:text-white",
          routeActive || isActive ? "bg-white/20 shadow-sm" : "hover:bg-white/10",
          mobile ? "block text-base w-full" : "text-base font-medium",
          "backdrop-blur-sm",
          className
        )
      }
    >
      <motion.span
        className="relative z-10"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>
    </NavLink>
  );
};

export default NavigationLink;