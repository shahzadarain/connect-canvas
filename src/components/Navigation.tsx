import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ScrollButton from "./navigation/ScrollButton";
import { Progress } from "./ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import NavigationHeader from "./navigation/NavigationHeader";
import TimelineNavigation from "./navigation/TimelineNavigation";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Pull to refresh functionality
  useEffect(() => {
    let touchStart = 0;
    let touchEnd = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStart = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      touchEnd = e.touches[0].clientY;
      
      if (window.scrollY === 0 && touchEnd - touchStart > 100 && !isRefreshing) {
        setIsRefreshing(true);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isRefreshing]);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = 
        document.documentElement.scrollHeight - 
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
      setIsScrolled(window.scrollY > 0);
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
      {/* Pull to refresh indicator */}
      <AnimatePresence>
        {isRefreshing && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-0 left-0 w-full flex justify-center z-50 bg-background/80 backdrop-blur-sm py-2"
          >
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full"
              />
              <span className="text-sm font-medium">Refreshing...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav 
        className={`fixed w-full z-40 transition-all duration-300 ${
          isScrolled 
            ? "bg-white/80 backdrop-blur-md shadow-lg dark:bg-gray-900/80" 
            : "bg-white/50 backdrop-blur-sm dark:bg-gray-900/50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NavigationHeader isOpen={isOpen} toggleMenu={toggleMenu} />
          
          {/* Desktop menu */}
          <div className="hidden sm:block py-4">
            {isHomePage && (
              <div className="flex space-x-4 mb-4">
                <ScrollButton to="hero">Home</ScrollButton>
                <ScrollButton to="contact">Contact</ScrollButton>
              </div>
            )}
            <TimelineNavigation isActive={isActive} />
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="sm:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md"
              >
                <div className="pt-2 pb-3 space-y-1">
                  {isHomePage && (
                    <>
                      <ScrollButton to="hero" mobile>Home</ScrollButton>
                      <ScrollButton to="contact" mobile>Contact</ScrollButton>
                    </>
                  )}
                  <TimelineNavigation isMobile isActive={isActive} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Scroll Progress Indicator */}
          <div className="absolute bottom-0 left-0 w-full h-0.5">
            <Progress value={scrollProgress} className="rounded-none" />
          </div>
        </div>
      </nav>
      {/* Spacer to prevent content from hiding under fixed nav */}
      <div className="h-16"></div>
    </>
  );
};

export default Navigation;