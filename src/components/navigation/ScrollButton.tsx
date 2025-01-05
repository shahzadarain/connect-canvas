import { cn } from '@/lib/utils';

interface ScrollButtonProps {
  to: string;
  children: React.ReactNode;
  mobile?: boolean;
}

const ScrollButton = ({ to, children, mobile }: ScrollButtonProps) => {
  const handleClick = () => {
    const element = document.getElementById(to);
    if (element) {
      // Add smooth scrolling and proper offset for fixed header
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      // Adjust scroll position to account for fixed header
      window.scrollBy(0, -64); // 64px is the height of our fixed header
    }
    
    // If it's a mobile menu, we should close it after clicking
    const mobileMenu = document.querySelector('[aria-label="Toggle mobile menu"]');
    if (mobile && mobileMenu) {
      (mobileMenu as HTMLButtonElement).click();
    }
  };

  return (
    <button 
      onClick={handleClick}
      className={cn(
        "relative py-2 text-sm font-medium transition-all duration-300",
        mobile ? "block w-full px-3 py-2 text-base" : "mx-4",
        "text-primary/80 hover:text-accent dark:text-white/80 dark:hover:text-accent"
      )}
    >
      {children}
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent transform origin-left transition-transform duration-500 scale-x-0 hover:scale-x-100" />
    </button>
  );
};

export default ScrollButton;