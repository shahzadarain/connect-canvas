import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ScrollButton from "./navigation/ScrollButton";
import { Progress } from "./ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import NavigationHeader from "./navigation/NavigationHeader";
import NavigationLink from "./navigation/NavigationLink";
import { useToast } from "./ui/use-toast";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = 
        document.documentElement.scrollHeight - 
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-primary/90 backdrop-blur-xl shadow-lg" 
            : "bg-primary/75 backdrop-blur-lg"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NavigationHeader isOpen={isOpen} toggleMenu={toggleMenu} />
          
          {/* Desktop menu - iOS style */}
          <div className="hidden sm:block">
            <div className="flex justify-center space-x-1 py-3">
              <NavigationLink to="/" isActive={isActive("/")}>
                Home
              </NavigationLink>
              <NavigationLink to="/contact" isActive={isActive("/contact")}>
                Contact
              </NavigationLink>
              <NavigationLink to="/achievements" isActive={isActive("/achievements")}>
                Achievements
              </NavigationLink>
              <NavigationLink to="/ai-tools" isActive={isActive("/ai-tools")}>
                AI Tools
              </NavigationLink>
              <NavigationLink to="/ai-news" isActive={isActive("/ai-news")}>
                AI News
              </NavigationLink>
              <NavigationLink to="/ai-humanitarian" isActive={isActive("/ai-humanitarian")}>
                AI Humanitarian
              </NavigationLink>
              <NavigationLink to="/blog" isActive={isActive("/blog")}>
                Blog
              </NavigationLink>
              <NavigationLink to="/reading" isActive={isActive("/reading")}>
                Reading List
              </NavigationLink>
              <NavigationLink to="/projects" isActive={isActive("/projects")}>
                Projects
              </NavigationLink>
              <NavigationLink to="/ideas" isActive={isActive("/ideas")}>
                Ideas
              </NavigationLink>
            </div>
          </div>

          {/* Mobile menu with iOS-style animations */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="sm:hidden bg-primary/95 backdrop-blur-xl rounded-b-xl"
              >
                <div className="px-2 pt-2 pb-3 space-y-1">
                  <NavigationLink to="/" isActive={isActive("/")} mobile>
                    Home
                  </NavigationLink>
                  <NavigationLink to="/contact" isActive={isActive("/contact")} mobile>
                    Contact
                  </NavigationLink>
                  <NavigationLink to="/achievements" isActive={isActive("/achievements")} mobile>
                    Achievements
                  </NavigationLink>
                  <NavigationLink to="/ai-tools" isActive={isActive("/ai-tools")} mobile>
                    AI Tools
                  </NavigationLink>
                  <NavigationLink to="/ai-news" isActive={isActive("/ai-news")} mobile>
                    AI News
                  </NavigationLink>
                  <NavigationLink to="/ai-humanitarian" isActive={isActive("/ai-humanitarian")} mobile>
                    AI Humanitarian
                  </NavigationLink>
                  <NavigationLink to="/blog" isActive={isActive("/blog")} mobile>
                    Blog
                  </NavigationLink>
                  <NavigationLink to="/reading" isActive={isActive("/reading")} mobile>
                    Reading List
                  </NavigationLink>
                  <NavigationLink to="/projects" isActive={isActive("/projects")} mobile>
                    Projects
                  </NavigationLink>
                  <NavigationLink to="/ideas" isActive={isActive("/ideas")} mobile>
                    Ideas
                  </NavigationLink>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* iOS-style progress indicator */}
          <div className="absolute bottom-0 left-0 w-full h-[2px]">
            <Progress value={scrollProgress} className="rounded-none bg-white/10" />
          </div>
        </div>
      </motion.nav>

      {/* Minimal spacer */}
      <div className="h-12" />
    </>
  );
};

export default Navigation;