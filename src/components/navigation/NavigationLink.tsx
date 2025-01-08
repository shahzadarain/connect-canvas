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
          "relative group px-3 py-1.5 rounded-lg transition-all duration-300",
          "hover:text-white hover:bg-white/10",
          routeActive || isActive ? "text-white bg-white/20" : "text-white/85",
          mobile ? "block text-base w-full" : "text-sm inline-flex items-center",
          "overflow-hidden",
          className
        )
      }
    >
      <motion.span
        className="relative z-10"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>
      
      {/* Hover effect background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-500/50 to-blue-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
        whileHover={{
          scale: 1.2,
          opacity: 0.15,
        }}
      />
    </NavLink>
  );
};

export default NavigationLink;