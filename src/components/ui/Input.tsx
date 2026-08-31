'use client';

import { forwardRef, InputHTMLAttributes, LabelHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-12 w-full rounded-xl border border-input bg-background px-4 py-3 text-base',
          'placeholder:text-muted-foreground/50',
          'focus:outline-none focus:ring-2 focus:ring-volvo-blue/50 focus:border-transparent',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'transition-all duration-200',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export const Label = forwardRef<HTMLLabelElement, LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={cn('text-sm font-medium text-foreground mb-2 block', className)}
      {...props}
    />
  )
);

Label.displayName = 'Label';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      className={cn(
        'flex min-h-[100px] w-full rounded-xl border border-input bg-background px-4 py-3 text-base',
        'placeholder:text-muted-foreground/50',
        'focus:outline-none focus:ring-2 focus:ring-volvo-blue/50 focus:border-transparent',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'transition-all duration-200',
        className
      )}
      ref={ref}
      {...props}
    />
  )
);

Textarea.displayName = 'Textarea';

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, ...props }, ref) => (
    <select
      className={cn(
        'flex h-12 w-full rounded-xl border border-input bg-background px-4 py-3 text-base',
        'focus:outline-none focus:ring-2 focus:ring-volvo-blue/50 focus:border-transparent',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'transition-all duration-200',
        'appearance-none bg-no-repeat bg-right',
        'bg-[url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2716%27 height=%2716%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%234A4A4A%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpath d=%27M6 9l6 6 6-6%27/%3E%3C/svg%3E")]',
        'bg-[length:16px_16px] bg-[right_12px_center] pr-10',
        className
      )}
      ref={ref}
      {...props}
    />
  )
);

Select.displayName = 'Select';

export const FormField = ({ 
  label, 
  error, 
  hint, 
  required, 
  children, 
  className 
}: { 
  label: string; 
  error?: string; 
  hint?: string; 
  required?: boolean; 
  children: React.ReactNode; 
  className?: string; 
}) => (
  <div className={cn('space-y-1.5', className)}>
    <Label>{label} {required && <span className="text-destructive">*</span>}</Label>
    {children}
    {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
    {hint && !error && <p className="text-sm text-muted-foreground">{hint}</p>}
  </div>
);