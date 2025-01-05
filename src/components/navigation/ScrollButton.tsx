import { cn } from '@/lib/utils';

interface ScrollButtonProps {
  id: string;
  label: string;
  isActive: boolean;
  onClick: (id: string) => void;
}

const ScrollButton = ({ id, label, isActive, onClick }: ScrollButtonProps) => {
  return (
    <button 
      onClick={() => onClick(id)} 
      className={cn(
        "relative py-2 text-sm font-medium transition-all duration-300",
        isActive 
          ? 'text-accent' 
          : 'text-primary/80 hover:text-accent dark:text-white/80 dark:hover:text-accent'
      )}
    >
      {label}
      <span 
        className={cn(
          "absolute bottom-0 left-0 w-full h-0.5 bg-accent transform origin-left transition-transform duration-500",
          isActive ? 'scale-x-100' : 'scale-x-0'
        )}
      />
    </button>
  );
};

export default ScrollButton;