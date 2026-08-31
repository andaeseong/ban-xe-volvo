'use client';

import { forwardRef, SliderHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export const Slider = forwardRef<HTMLInputElement, SliderHTMLAttributes<HTMLInputElement>>(
  ({ className, min = 0, max = 100, step = 1, value, onValueChange, ...props }, ref) => {
    const percentage = ((Number(value) - min) / (max - min)) * 100;
    
    return (
      <div className={cn('relative w-full', className)}>
        <input
          type="range"
          ref={ref}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onValueChange?.(Number(e.target.value))}
          className={cn(
            'appearance-none w-full h-2 bg-muted rounded-full cursor-pointer',
            'focus:outline-none focus:ring-2 focus:ring-volvo-blue/50 focus:ring-offset-2',
            'hover:bg-muted/80 transition-colors'
          )}
          style={{
            background: `linear-gradient(to right, var(--color-volvo-blue) ${percentage}%, var(--color-border) ${percentage}%)`,
          }}
          {...props}
        />
        <div className="absolute bottom-full left-0 right-0 mb-2 flex justify-between text-[10px] text-muted-foreground">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>
    );
  }
);

Slider.displayName = 'Slider';