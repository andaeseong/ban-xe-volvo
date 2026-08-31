'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    isLoading = false, 
    leftIcon, 
    rightIcon,
    fullWidth = false,
    disabled,
    children,
    ...props 
  }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volvo-blue/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants = {
      primary: 'bg-volvo-blue text-white hover:bg-volvo-blue-dark shadow-lg shadow-volvo-blue/30 hover:shadow-volvo-blue/40',
      secondary: 'bg-volvo-iron text-white hover:bg-volvo-iron/90 shadow-md',
      outline: 'border-2 border-volvo-blue text-volvo-blue hover:bg-volvo-blue/10',
      ghost: 'text-volvo-blue hover:bg-volvo-blue/10',
      accent: 'bg-volvo-gold text-volvo-black hover:bg-volvo-gold/90 shadow-lg shadow-volvo-gold/30',
    };
    
    const sizes = {
      sm: 'px-4 py-2 text-sm gap-1.5 rounded-full',
      md: 'px-6 py-3 text-base gap-2 rounded-full',
      lg: 'px-8 py-4 text-lg gap-2 rounded-full',
      xl: 'px-10 py-5 text-xl gap-3 rounded-full',
    };
    
    const width = fullWidth ? 'w-full' : '';
    
    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], width, className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : leftIcon ? (
          <span className="flex-shrink-0">{leftIcon}</span>
        ) : null}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';