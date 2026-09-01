'use client';

import { forwardRef, ButtonHTMLAttributes, cloneElement, isValidElement } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'subtle';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  asChild?: boolean;
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
    asChild = false,
    disabled,
    children,
    ...props 
  }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold tracking-tight transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-volvo-blue-vivid/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 cursor-pointer select-none whitespace-nowrap';
    
    const variants = {
      primary: 'bg-[#003057] text-white hover:bg-[#002540] shadow-[0_4px_14px_rgba(0,48,87,0.22)] hover:shadow-[0_8px_24px_rgba(0,48,87,0.28)] hover:-translate-y-[1px] dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400 dark:shadow-none',
      secondary: 'bg-slate-900 text-white hover:bg-slate-800 shadow-md hover:shadow-lg hover:-translate-y-[1px] dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white',
      outline: 'bg-white border-[1.5px] border-slate-300 text-slate-900 hover:bg-slate-50 hover:border-slate-400 hover:text-[#003057] shadow-sm hover:shadow-md dark:bg-transparent dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:border-slate-500',
      ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white',
      accent: 'bg-[#B9973B] text-slate-900 hover:bg-[#A6842F] shadow-[0_4px_14px_rgba(185,151,59,0.25)] hover:shadow-[0_8px_24px_rgba(185,151,59,0.35)] hover:-translate-y-[1px] font-bold dark:bg-amber-400 dark:hover:bg-amber-300',
      subtle: 'bg-slate-100 text-slate-900 hover:bg-slate-200 border border-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700 dark:hover:bg-slate-700',
    };
    
    const sizes = {
      sm: 'px-4 py-2 text-[13px] gap-1.5 rounded-full min-h-[36px]',
      md: 'px-5 py-2.5 text-[14px] gap-2 rounded-full min-h-[42px]',
      lg: 'px-6 py-3 text-[15px] gap-2 rounded-full min-h-[48px]',
      xl: 'px-8 py-4 text-[16px] gap-2.5 rounded-full min-h-[56px]',
    };
    
    const width = fullWidth ? 'w-full' : '';
    const buttonClass = cn(baseStyles, variants[variant], sizes[size], width, className);
    const content = (
      <>
        {isLoading ? (
          <svg className="animate-spin h-4 w-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : leftIcon ? (
          <span className="flex-shrink-0 [&>svg]:h-4 [&>svg]:w-4">{leftIcon}</span>
        ) : null}
        <span className="truncate">{children}</span>
        {!isLoading && rightIcon && <span className="flex-shrink-0 [&>svg]:h-4 [&>svg]:w-4 group-hover:translate-x-0.5 transition-transform duration-300">{rightIcon}</span>}
      </>
    );
    
    if (asChild && isValidElement(children)) {
      const child = children as React.ReactElement<{ className?: string; children?: React.ReactNode }>;
      return cloneElement(child, {
        className: cn(buttonClass, (child.props as { className?: string }).className, 'group'),
        ref,
      } as unknown as Record<string, unknown>);
    }
    
    return (
      <button
        ref={ref}
        className={cn(buttonClass, 'group')}
        disabled={disabled || isLoading}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';
