'use client';

import { cn } from '@/lib/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'sea';
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  const variants = {
    default: 'bg-basalt/10 text-basalt border-none',
    outline: 'bg-transparent text-basalt border border-basalt/30',
    sea: 'bg-sea/10 text-sea border-none',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-[2px]',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}