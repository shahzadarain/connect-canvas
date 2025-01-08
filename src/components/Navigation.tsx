import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Menu, X } from "lucide-react";
import NavigationLink from "./navigation/NavigationLink";
import MobileMenuButton from "./navigation/MobileMenuButton";
import UserMenu from "./navigation/UserMenu";
import NavigationHeader from "./navigation/NavigationHeader";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const session = useSession();
  const supabase = useSupabaseClient();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-red-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <NavigationHeader />

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            <NavigationLink to="/">Home</NavigationLink>
            <NavigationLink to="/blog">Blog</NavigationLink>
            <NavigationLink to="/ai-tools">AI Tools</NavigationLink>
            <NavigationLink to="/ai-news">AI News</NavigationLink>
            <NavigationLink to="/ai-humanitarian">AI Humanitarian</NavigationLink>
            <NavigationLink to="/projects">Projects</NavigationLink>
            <NavigationLink to="/ideas">Ideas</NavigationLink>
            <NavigationLink to="/journey">Journey</NavigationLink>
            <NavigationLink to="/learning">Learning</NavigationLink>
            {session && (
              <>
                <NavigationLink to="/reading">Reading</NavigationLink>
                <NavigationLink to="/book-discussions">
                  Book Discussions
                </NavigationLink>
              </>
            )}
            <UserMenu session={session} supabase={supabase} />
          </div>

          {/* Mobile menu button */}
          <MobileMenuButton isOpen={isOpen} toggleMenu={toggleMenu} />
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavigationLink to="/" mobile onClick={closeMenu}>
              Home
            </NavigationLink>
            <NavigationLink to="/blog" mobile onClick={closeMenu}>
              Blog
            </NavigationLink>
            <NavigationLink to="/ai-tools" mobile onClick={closeMenu}>
              AI Tools
            </NavigationLink>
            <NavigationLink to="/ai-news" mobile onClick={closeMenu}>
              AI News
            </NavigationLink>
            <NavigationLink to="/ai-humanitarian" mobile onClick={closeMenu}>
              AI Humanitarian
            </NavigationLink>
            <NavigationLink to="/projects" mobile onClick={closeMenu}>
              Projects
            </NavigationLink>
            <NavigationLink to="/ideas" mobile onClick={closeMenu}>
              Ideas
            </NavigationLink>
            <NavigationLink to="/journey" mobile onClick={closeMenu}>
              Journey
            </NavigationLink>
            <NavigationLink to="/learning" mobile onClick={closeMenu}>
              Learning
            </NavigationLink>
            {session && (
              <>
                <NavigationLink to="/reading" mobile onClick={closeMenu}>
                  Reading
                </NavigationLink>
                <NavigationLink to="/book-discussions" mobile onClick={closeMenu}>
                  Book Discussions
                </NavigationLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;