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
      element.scrollIntoView({ behavior: 'smooth' });
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
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent transform origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100" />
    </button>
  );
};

export default ScrollButton;