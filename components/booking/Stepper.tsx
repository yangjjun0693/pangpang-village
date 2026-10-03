'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/cn';

interface StepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label: string;
  unit?: string;
  disabled?: boolean;
  className?: string;
}

export const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  ({ value, onChange, min = 0, max = 8, label, unit, disabled, className }, ref) => {
    const decrement = () => {
      if (!disabled && value > min) onChange(value - 1);
    };
    const increment = () => {
      if (!disabled && value < max) onChange(value + 1);
    };

    const labelId = `${label}-label`;

    return (
      <div ref={ref} className={cn('flex items-center gap-3', className)} role="group" aria-labelledby={labelId}>
        <label id={labelId} className="label w-28 md:w-32 flex-shrink-0">
          {label}
          {unit && <span className="text-xs font-normal text-basalt/50 ml-1">({unit})</span>}
        </label>
        <div className="flex items-center border border-basalt/20 rounded-[2px] overflow-hidden bg-paper">
          <button
            type="button"
            onClick={decrement}
            disabled={disabled || value <= min}
            className="p-3 text-ink hover:bg-basalt/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sea"
            aria-label={`${label} 감소`}
          >
            <svg className="w-5 h-5 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
          <div className="w-16 text-center border-x border-basalt/20 bg-paper">
            <span className="font-accent font-medium text-lg tabular-nums text-ink">{value}</span>
          </div>
          <button
            type="button"
            onClick={increment}
            disabled={disabled || value >= max}
            className="p-3 text-ink hover:bg-basalt/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sea"
            aria-label={`${label} 증가`}
          >
            <svg className="w-5 h-5 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>
      </div>
    );
  }
);

Stepper.displayName = 'Stepper';