'use client';

import { forwardRef } from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '@/lib/cn';

interface TooltipProps extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root> {}

interface TooltipTriggerProps extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger> {}

interface TooltipContentProps extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {}

export const Tooltip = TooltipPrimitive.Root;
export const TooltipProvider = TooltipPrimitive.Provider;

export const TooltipTrigger = TooltipPrimitive.Trigger;

export const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ className, sideOffset = 8, ...props }, ref) => (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'px-3 py-1.5 text-xs font-medium text-paper bg-ink rounded-[2px]',
        'animate-in fade-in-0 zoom-in-95',
        'data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95',
        'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className
      )}
      {...props}
    />
  )
);

TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export const TooltipArrow = forwardRef<SVGSVGElement, React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Arrow>>(
  ({ className, ...props }, ref) => (
    <TooltipPrimitive.Arrow
      ref={ref}
      className={cn('fill-ink', className)}
      {...props}
    />
  )
);

TooltipArrow.displayName = TooltipPrimitive.Arrow.displayName;