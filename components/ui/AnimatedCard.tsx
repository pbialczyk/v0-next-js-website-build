'use client';

import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function AnimatedCard({ children, delay = 0, className }: AnimatedCardProps) {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        inView 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8',
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default AnimatedCard;
