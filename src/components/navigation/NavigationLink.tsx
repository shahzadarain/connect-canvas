import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface NavigationLinkProps {
  to: string;
  isActive?: boolean;
  children: React.ReactNode;
}

const NavigationLink = ({ to, isActive, children }: NavigationLinkProps) => {
  return (
    <Link 
      to={to}
      className={cn(
        "relative py-2 text-sm font-medium transition-all duration-300",
        isActive
          ? 'text-accent'
          : 'text-primary/80 hover:text-accent dark:text-white/80 dark:hover:text-accent'
      )}
    >
      {children}
      <span 
        className={cn(
          "absolute bottom-0 left-0 w-full h-0.5 bg-accent transform origin-left transition-transform duration-500",
          isActive ? 'scale-x-100' : 'scale-x-0'
        )}
      />
    </Link>
  );
};

export default NavigationLink;