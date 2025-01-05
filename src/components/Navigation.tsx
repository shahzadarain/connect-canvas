import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useToast } from '@/components/ui/use-toast';
import NavigationLink from './navigation/NavigationLink';
import ScrollButton from './navigation/ScrollButton';
import MobileMenuButton from './navigation/MobileMenuButton';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const session = useSession();
  const supabase = useSupabaseClient();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['projects', 'impact', 'learning', 'submit'];
      const scrollPosition = window.scrollY + 100;

      if (location.pathname === '/') {
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const offsetTop = element.offsetTop;
            const offsetBottom = offsetTop + element.offsetHeight;

            if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
              setActiveSection(section);
              break;
            }
          }
        }
      }

      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
      toast({
        title: "Error logging out",
        description: "There was a problem logging out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
      isScrolled ? 'bg-white/80 backdrop-blur-xl shadow-lg dark:bg-gray-900/80' : 'bg-transparent'
    )}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-300">
            Shahzad ASGHAR
          </Link>
          
          <div className={cn(
            "fixed md:relative top-20 md:top-0 left-0 md:left-auto w-full md:w-auto h-screen md:h-auto bg-white/95 dark:bg-gray-900/95 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none transition-transform duration-300 ease-in-out transform md:transform-none",
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
            "md:flex md:items-center md:gap-8"
          )}>
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 px-6 md:px-0 pt-6 md:pt-0">
              {location.pathname === '/' && [
                ['projects', 'Projects'],
                ['impact', 'Global Impact'],
                ['learning', 'Learning Journey'],
                ['submit', 'Submit Idea']
              ].map(([id, label]) => (
                <ScrollButton 
                  key={id}
                  id={id}
                  label={label}
                  isActive={activeSection === id}
                  onClick={scrollToSection}
                />
              ))}
              
              <NavigationLink 
                to="/blog"
                isActive={location.pathname.startsWith('/blog')}
              >
                Blog
              </NavigationLink>
              
              <NavigationLink 
                to="/reading"
                isActive={location.pathname === '/reading'}
              >
                Reading List
              </NavigationLink>
              
              <NavigationLink 
                to="/ai-tools"
                isActive={location.pathname === '/ai-tools'}
              >
                AI Tools
              </NavigationLink>

              <NavigationLink 
                to="/ai-news"
                isActive={location.pathname === '/ai-news'}
              >
                AI News
              </NavigationLink>
              
              <NavigationLink 
                to="/ai-humanitarian-solutions"
                isActive={location.pathname === '/ai-humanitarian-solutions'}
              >
                AI Humanitarian
              </NavigationLink>
              
              <NavigationLink 
                to="/ai-humanitarian-training"
                isActive={location.pathname === '/ai-humanitarian-training'}
              >
                AI Training
              </NavigationLink>
              
              {session ? (
                <button
                  onClick={handleLogout}
                  className="relative py-2 text-sm font-medium transition-all duration-300 text-primary/80 hover:text-accent dark:text-white/80 dark:hover:text-accent"
                >
                  Logout
                </button>
              ) : (
                <NavigationLink to="/login">
                  Login
                </NavigationLink>
              )}
            </div>
          </div>

          <MobileMenuButton 
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;