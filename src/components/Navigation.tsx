import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ScrollButton from "./navigation/ScrollButton";
import { Progress } from "./ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import NavigationHeader from "./navigation/NavigationHeader";
import NavigationLink from "./navigation/NavigationLink";
import { Search } from "lucide-react";
import { Input } from "./ui/input";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

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
            ? "bg-primary/95 backdrop-blur-xl shadow-lg" 
            : "bg-primary/90 backdrop-blur-lg"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Desktop menu */}
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center space-x-1">
              <NavigationLink to="/" isActive={isActive("/")}>
                Home
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
                Reading
              </NavigationLink>
              <NavigationLink to="/projects" isActive={isActive("/projects")}>
                Projects
              </NavigationLink>
              <NavigationLink to="/ideas" isActive={isActive("/ideas")}>
                Ideas
              </NavigationLink>
            </div>

            {/* Search bar */}
            <div className="hidden sm:flex items-center ml-4 relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  type="search"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 w-[200px] bg-white/10 border-0 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-white/20"
                />
              </div>
            </div>

            {/* Mobile menu button */}
            <NavigationHeader isOpen={isOpen} toggleMenu={toggleMenu} />
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="sm:hidden bg-primary/95 backdrop-blur-xl rounded-b-xl"
              >
                <div className="px-2 pt-2 pb-3 space-y-1">
                  <NavigationLink to="/" isActive={isActive("/")} mobile>
                    Home
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
                    Reading
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

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 w-full h-[2px]">
            <Progress value={scrollProgress} className="rounded-none bg-white/10" />
          </div>
        </div>
      </motion.nav>

      {/* Minimal spacer */}
      <div className="h-16" />
    </>
  );
};

export default Navigation;