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
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-gray-800">
                Shahzad Asghar
              </Link>
            </div>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:flex sm:items-center">
            {isHomePage ? (
              <>
                <ScrollButton to="hero">Home</ScrollButton>
                <ScrollButton to="projects">Projects</ScrollButton>
                <ScrollButton to="contact">Contact</ScrollButton>
              </>
            ) : null}
            <NavigationLink to="/achievements">Achievements</NavigationLink>
            <NavigationLink to="/ai-tools">AI Tools</NavigationLink>
            <NavigationLink to="/ai-news">AI News</NavigationLink>
            <NavigationLink to="/ai-humanitarian">AI Humanitarian</NavigationLink>
            <NavigationLink to="/ai-humanitarian-training">Training</NavigationLink>
            <NavigationLink to="/blog">Blog</NavigationLink>
            <NavigationLink to="/reading">Reading List</NavigationLink>
          </div>

          {/* Mobile menu button */}
          <MobileMenuButton isOpen={isOpen} toggleMenu={toggleMenu} />
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`sm:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="pt-2 pb-3 space-y-1">
          {isHomePage ? (
            <>
              <ScrollButton to="hero" mobile>Home</ScrollButton>
              <ScrollButton to="projects" mobile>Projects</ScrollButton>
              <ScrollButton to="contact" mobile>Contact</ScrollButton>
            </>
          ) : null}
          <NavigationLink to="/achievements" mobile>Achievements</NavigationLink>
          <NavigationLink to="/ai-tools" mobile>AI Tools</NavigationLink>
          <NavigationLink to="/ai-news" mobile>AI News</NavigationLink>
          <NavigationLink to="/ai-humanitarian" mobile>AI Humanitarian</NavigationLink>
          <NavigationLink to="/ai-humanitarian-training" mobile>Training</NavigationLink>
          <NavigationLink to="/blog" mobile>Blog</NavigationLink>
          <NavigationLink to="/reading" mobile>Reading List</NavigationLink>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;