'use client';

import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'destructive' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
  onRemove?: () => void;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', dot = false, children, onRemove, ...props }, ref) => {
    const variants = {
      default: 'bg-volvo-blue text-white',
      secondary: 'bg-volvo-iron text-white',
      outline: 'border-2 border-volvo-blue text-volvo-blue bg-transparent',
      success: 'bg-green-600 text-white',
      warning: 'bg-amber-600 text-white',
      destructive: 'bg-red-600 text-white',
      accent: 'bg-volvo-gold text-volvo-black',
    };
    
    const sizes = {
      sm: 'px-2 py-0.5 text-xs gap-1',
      md: 'px-3 py-1 text-sm gap-1.5',
      lg: 'px-4 py-1.5 text-base gap-2',
    };
    
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center font-medium rounded-full',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {dot && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
        {children}
        {onRemove && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="ml-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full hover:bg-black/10 dark:hover:bg-white/20"
            aria-label="Remove"
          >
            <svg className="h-3 w-3" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 3l8 8M11 3L3 11" />
            </svg>
          </button>
        )}
      </span>
    );
  }
);

Badge.displayName = 'Badge';