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
          "relative group px-4 py-2 rounded-lg transition-all duration-300",
          "hover:text-white",
          routeActive || isActive ? "text-white bg-white/10" : "text-white/75",
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
        className="absolute inset-0 bg-gradient-to-r from-secondary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
        whileHover={{
          scale: 1.2,
          opacity: 0.15,
        }}
      />
      
      {/* Particle-like dots effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{ scale: 0, x: "50%", y: "50%" }}
            animate={{
              scale: [0, 1, 0],
              x: ["50%", `${Math.random() * 100}%`, "50%"],
              y: ["50%", `${Math.random() * 100}%`, "50%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>
    </NavLink>
  );
};

export default NavigationLink;