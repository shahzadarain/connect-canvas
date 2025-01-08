import { cn } from "@/lib/utils";
import NavigationLink from "./NavigationLink";
import { motion } from "framer-motion";

interface TimelineNavigationProps {
  isMobile?: boolean;
  isActive: (path: string) => boolean;
}

const TimelineNavigation = ({ isMobile, isActive }: TimelineNavigationProps) => {
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/journey", label: "Journey" },
    { path: "/achievements", label: "Achievements" },
    { path: "/ai-tools", label: "AI Tools" },
    { path: "/ai-humanitarian", label: "AI Humanitarian" },
    { path: "/blog", label: "Blog" },
    { path: "/reading", label: "Reading List" },
    { path: "/projects", label: "Projects" },
    { path: "/ideas", label: "Ideas" },
  ];

  return (
    <div className={cn(
      "relative flex",
      isMobile ? "flex-col space-y-2" : "items-center space-x-4"
    )}>
      {!isMobile && (
        <div className="absolute h-0.5 bg-white/20 top-1/2 left-0 right-0 -translate-y-1/2" />
      )}
      {navItems.map((item, index) => (
        <motion.div
          key={item.path}
          className={cn(
            "relative",
            !isMobile && "flex-1"
          )}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <NavigationLink
            to={item.path}
            isActive={isActive(item.path)}
            mobile={isMobile}
            className={cn(
              "relative z-10 flex items-center justify-center",
              !isMobile && "hover:before:scale-100 before:absolute before:content-[''] before:w-3 before:h-3 before:bg-white before:rounded-full before:-top-1 before:left-1/2 before:-translate-x-1/2 before:scale-0 before:transition-transform"
            )}
          >
            {item.label}
          </NavigationLink>
        </motion.div>
      ))}
    </div>
  );
};

export default TimelineNavigation;