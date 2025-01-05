import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface NavigationLinkProps {
  to: string;
  children: React.ReactNode;
  isActive?: boolean;
  mobile?: boolean;
}

const NavigationLink = ({ to, children, isActive, mobile }: NavigationLinkProps) => {
  return (
    <Link 
      to={to}
      className={cn(
        "relative py-2 text-sm font-medium transition-all duration-300",
        mobile ? "block w-full px-3 py-2 text-base" : "mx-4",
        isActive
          ? 'text-accent'
          : 'text-primary/80 hover:text-accent dark:text-white/80 dark:hover:text-accent',
        !mobile && "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-accent after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
      )}
    >
      {children}
      {isActive && !mobile && (
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent transform scale-x-100 transition-transform duration-300" />
      )}
    </Link>
  );
};

export default NavigationLink;