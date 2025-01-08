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
          "relative group px-4 py-2 rounded-full transition-all duration-300",
          "hover:text-white hover:bg-white/20",
          routeActive || isActive ? "text-white bg-white/25 shadow-sm" : "text-white/90",
          mobile ? "block text-base w-full" : "text-sm inline-flex items-center",
          "overflow-hidden backdrop-blur-sm",
          className
        )
      }
    >
      <motion.span
        className="relative z-10 font-medium"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>
      
      {/* iOS-style hover effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
        whileHover={{
          scale: 1.1,
          opacity: 0.15,
        }}
      />
    </NavLink>
  );
};

export default NavigationLink;