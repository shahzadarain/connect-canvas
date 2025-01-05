import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import NavigationLink from "./navigation/NavigationLink";
import MobileMenuButton from "./navigation/MobileMenuButton";
import ScrollButton from "./navigation/ScrollButton";
import { Progress } from "./ui/progress";
import { motion, AnimatePresence } from "framer-motion";

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
      
      // Only trigger refresh when at top of page and pulling down
      if (window.scrollY === 0 && touchEnd - touchStart > 100 && !isRefreshing) {
        setIsRefreshing(true);
        // Refresh the page after animation
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
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link 
                  to="/" 
                  className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
                >
                  Shahzad Asghar
                </Link>
              </div>
            </div>

            {/* Desktop menu */}
            <div className="hidden sm:flex sm:items-center">
              {isHomePage ? (
                <>
                  <ScrollButton to="hero">Home</ScrollButton>
                  <ScrollButton to="contact">Contact</ScrollButton>
                </>
              ) : null}
              <NavigationLink to="/achievements" isActive={location.pathname === '/achievements'}>
                Achievements
              </NavigationLink>
              <NavigationLink to="/ai-tools" isActive={location.pathname === '/ai-tools'}>
                AI Tools
              </NavigationLink>
              <NavigationLink to="/ai-news" isActive={location.pathname === '/ai-news'}>
                AI News
              </NavigationLink>
              <NavigationLink to="/ai-humanitarian" isActive={location.pathname === '/ai-humanitarian'}>
                AI Humanitarian
              </NavigationLink>
              <NavigationLink to="/blog" isActive={location.pathname === '/blog'}>
                Blog
              </NavigationLink>
              <NavigationLink to="/reading" isActive={location.pathname === '/reading'}>
                Reading List
              </NavigationLink>
              <NavigationLink to="/projects" isActive={location.pathname === '/projects'}>
                Projects
              </NavigationLink>
              <NavigationLink to="/ideas" isActive={location.pathname === '/ideas'}>
                Ideas
              </NavigationLink>
            </div>

            {/* Mobile menu button */}
            <MobileMenuButton isOpen={isOpen} toggleMenu={toggleMenu} />
          </div>
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
                {isHomePage ? (
                  <>
                    <ScrollButton to="hero" mobile>Home</ScrollButton>
                    <ScrollButton to="contact" mobile>Contact</ScrollButton>
                  </>
                ) : null}
                <NavigationLink to="/achievements" mobile isActive={location.pathname === '/achievements'}>
                  Achievements
                </NavigationLink>
                <NavigationLink to="/ai-tools" mobile isActive={location.pathname === '/ai-tools'}>
                  AI Tools
                </NavigationLink>
                <NavigationLink to="/ai-news" mobile isActive={location.pathname === '/ai-news'}>
                  AI News
                </NavigationLink>
                <NavigationLink to="/ai-humanitarian" mobile isActive={location.pathname === '/ai-humanitarian'}>
                  AI Humanitarian
                </NavigationLink>
                <NavigationLink to="/blog" mobile isActive={location.pathname === '/blog'}>
                  Blog
                </NavigationLink>
                <NavigationLink to="/reading" mobile isActive={location.pathname === '/reading'}>
                  Reading List
                </NavigationLink>
                <NavigationLink to="/projects" mobile isActive={location.pathname === '/projects'}>
                  Projects
                </NavigationLink>
                <NavigationLink to="/ideas" mobile isActive={location.pathname === '/ideas'}>
                  Ideas
                </NavigationLink>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll Progress Indicator */}
        <div className="absolute bottom-0 left-0 w-full h-0.5">
          <Progress value={scrollProgress} className="rounded-none" />
        </div>
      </nav>
      {/* Spacer to prevent content from hiding under fixed nav */}
      <div className="h-16"></div>
    </>
  );
};

export default Navigation;