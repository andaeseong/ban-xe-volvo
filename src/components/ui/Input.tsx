'use client';

import { forwardRef, InputHTMLAttributes, LabelHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-[46px] w-full rounded-xl border-[1.5px] border-slate-300 bg-white px-4 py-2.5 text-[15px] font-medium text-slate-900',
          'placeholder:text-slate-400 placeholder:font-normal',
          'hover:border-slate-400 hover:bg-white',
          'focus:outline-none focus:border-[#003057] focus:ring-4 focus:ring-[#003057]/10 focus:bg-white',
          'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-50',
          'transition-all duration-200 ease-[cubic-bezier(0.32,0.72,0,1)]',
          'dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:hover:border-slate-500 dark:focus:border-sky-500 dark:focus:ring-sky-500/15',
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
      className={cn('text-[13px] font-semibold tracking-tight text-slate-900 mb-2 block dark:text-slate-100', className)}
      {...props}
    />
  )
);

Label.displayName = 'Label';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      className={cn(
        'flex min-h-[110px] w-full rounded-xl border-[1.5px] border-slate-300 bg-white px-4 py-3 text-[15px] font-medium text-slate-900',
        'placeholder:text-slate-400 placeholder:font-normal',
        'hover:border-slate-400',
        'focus:outline-none focus:border-[#003057] focus:ring-4 focus:ring-[#003057]/10',
        'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-50',
        'transition-all duration-200',
        'dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500',
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
        'flex h-[46px] w-full rounded-xl border-[1.5px] border-slate-300 bg-white px-4 py-2.5 pr-11 text-[15px] font-medium text-slate-900',
        'hover:border-slate-400 hover:bg-white',
        'focus:outline-none focus:border-[#003057] focus:ring-4 focus:ring-[#003057]/10 focus:bg-white',
        'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-50',
        'transition-all duration-200 ease-[cubic-bezier(0.32,0.72,0,1)]',
        'appearance-none bg-no-repeat',
        'bg-[url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2716%27 height=%2716%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23334155%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpath d=%27M6 9l6 6 6-6%27/%3E%3C/svg%3E")]',
        'bg-[length:16px_16px] bg-[right_12px_center]',
        'dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-500 dark:focus:border-sky-500 dark:focus:ring-sky-500/15',
        'dark:bg-[url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2716%27 height=%2716%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23CBD5E1%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpath d=%27M6 9l6 6 6-6%27/%3E%3C/svg%3E")]',
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
    <Label>{label} {required && <span className="text-red-600 dark:text-red-400">*</span>}</Label>
    {children}
    {error && <p className="text-[13px] font-medium text-red-600 dark:text-red-400 flex items-center gap-1.5" role="alert"><svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>{error}</p>}
    {hint && !error && <p className="text-[13px] text-slate-600 dark:text-slate-400">{hint}</p>}
  </div>
);
