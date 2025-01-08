import { cn } from "@/lib/utils";
import NavigationLink from "./NavigationLink";
import { motion } from "framer-motion";
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Container, Engine } from "tsparticles-engine";

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

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    console.log("Particles container loaded", container);
  }, []);

  return (
    <div className={cn(
      "relative flex",
      isMobile ? "flex-col space-y-2" : "items-center space-x-4"
    )}>
      {!isMobile && (
        <>
          <div className="absolute h-0.5 bg-white/20 top-1/2 left-0 right-0 -translate-y-1/2" />
          <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
              background: {
                opacity: 0,
              },
              fpsLimit: 60,
              particles: {
                color: {
                  value: "#ffffff",
                },
                links: {
                  color: "#ffffff",
                  distance: 150,
                  enable: true,
                  opacity: 0.2,
                  width: 1,
                },
                move: {
                  enable: true,
                  outModes: {
                    default: "bounce",
                  },
                  random: false,
                  speed: 2,
                  straight: false,
                },
                number: {
                  density: {
                    enable: true,
                    area: 800,
                  },
                  value: 40,
                },
                opacity: {
                  value: 0.3,
                },
                shape: {
                  type: "circle",
                },
                size: {
                  value: { min: 1, max: 3 },
                },
              },
              detectRetina: true,
            }}
            className="absolute inset-0 pointer-events-none"
          />
        </>
      )}
      {navItems.map((item, index) => (
        <motion.div
          key={item.path}
          className={cn(
            "relative z-10",
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
              "relative z-10 flex items-center justify-center group",
              !isMobile && "hover:before:scale-100 before:absolute before:content-[''] before:w-3 before:h-3 before:bg-white before:rounded-full before:-top-1 before:left-1/2 before:-translate-x-1/2 before:scale-0 before:transition-transform before:duration-300",
              "after:absolute after:content-[''] after:w-full after:h-full after:top-0 after:left-0 after:bg-white/5 after:rounded-lg after:opacity-0 after:transition-opacity after:duration-300 group-hover:after:opacity-100"
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