import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import NavigationLink from "./navigation/NavigationLink";
import NavigationHeader from "./navigation/NavigationHeader";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
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
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-red-700/95" : "bg-red-600"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Desktop menu */}
            <div className="hidden sm:flex sm:items-center space-x-1">
              <NavigationLink to="/blog" isActive={isActive("/blog")}>
                Articles
              </NavigationLink>
              <NavigationLink to="/reading" isActive={isActive("/reading")}>
                Books
              </NavigationLink>
              <NavigationLink to="/events" isActive={isActive("/events")}>
                Events
              </NavigationLink>
              <NavigationLink to="/membership" isActive={isActive("/membership")}>
                Membership
              </NavigationLink>
              <NavigationLink to="/newsletter" isActive={isActive("/newsletter")}>
                Newsletter
              </NavigationLink>
              <NavigationLink to="/more" isActive={isActive("/more")}>
                More
              </NavigationLink>
            </div>

            {/* Search bar */}
            <div className="hidden sm:flex items-center ml-4 flex-1 justify-end max-w-xl">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  type="search"
                  placeholder="Search articles..."
                  className="pl-10 pr-4 py-2 w-full bg-white rounded-full border-2 border-dashed border-red-300/50 text-gray-800 placeholder:text-gray-500 focus:ring-2 focus:ring-red-400 focus:border-transparent"
                />
              </div>
            </div>

            {/* Mobile menu button */}
            <NavigationHeader isOpen={isOpen} toggleMenu={toggleMenu} />
          </div>

          {/* Mobile menu */}
          {isOpen && (
            <div className="sm:hidden bg-red-700 rounded-b-xl">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <NavigationLink to="/blog" isActive={isActive("/blog")} mobile>
                  Articles
                </NavigationLink>
                <NavigationLink to="/reading" isActive={isActive("/reading")} mobile>
                  Books
                </NavigationLink>
                <NavigationLink to="/events" isActive={isActive("/events")} mobile>
                  Events
                </NavigationLink>
                <NavigationLink to="/membership" isActive={isActive("/membership")} mobile>
                  Membership
                </NavigationLink>
                <NavigationLink to="/newsletter" isActive={isActive("/newsletter")} mobile>
                  Newsletter
                </NavigationLink>
                <NavigationLink to="/more" isActive={isActive("/more")} mobile>
                  More
                </NavigationLink>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Minimal spacer */}
      <div className="h-16" />
    </>
  );
};

export default Navigation;