import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import NavigationLink from "./navigation/NavigationLink";
import MobileMenuButton from "./navigation/MobileMenuButton";
import ScrollButton from "./navigation/ScrollButton";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-md shadow-lg fixed w-full z-50 border-b border-gray-100">
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
          </div>
        </div>
      </nav>
      {/* Spacer to prevent content from hiding under fixed nav */}
      <div className="h-16"></div>
    </>
  );
};

export default Navigation;