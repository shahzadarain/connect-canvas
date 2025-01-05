import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import NavigationLink from "./navigation/NavigationLink";
import MobileMenuButton from "./navigation/MobileMenuButton";
import ScrollButton from "./navigation/ScrollButton";
import { Progress } from "./ui/progress";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const winScroll = document.documentElement.scrollTop;
      const height = 
        document.documentElement.scrollHeight - 
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
      
      // Set navbar background blur based on scroll position
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
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-white/80 backdrop-blur-md shadow-lg" 
            : "bg-white/50 backdrop-blur-sm"
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
        <div 
          className={`sm:hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md">
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
        </div>

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