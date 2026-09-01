'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value?: number | number[];
  onValueChange?: (value: number | number[]) => void;
  min?: number;
  max?: number;
  step?: number;
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ className, min = 0, max = 100, step = 1, value, onValueChange, ...props }, ref) => {
    const numericValue = Array.isArray(value) ? value[1] ?? value[0] : Number(value ?? 0);
    const percentage = ((numericValue - min) / (max - min)) * 100;
    
    return (
      <div className={cn('relative w-full', className)}>
        <input
          type="range"
          ref={ref}
          min={min}
          max={max}
          step={step}
          value={numericValue}
          onChange={(e) => {
            const newVal = Number(e.target.value);
            if (Array.isArray(value)) {
              onValueChange?.([value[0], newVal]);
            } else {
              onValueChange?.(newVal);
            }
          }}
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