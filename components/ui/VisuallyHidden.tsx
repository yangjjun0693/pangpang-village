'use client';

import * as VisuallyHiddenPrimitive from '@radix-ui/react-visually-hidden';
import { forwardRef } from 'react';

export const VisuallyHidden = forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<typeof VisuallyHiddenPrimitive.Root>
>(({ children, ...props }, ref) => (
  <VisuallyHiddenPrimitive.Root ref={ref} {...props}>
    {children}
  </VisuallyHiddenPrimitive.Root>
));

VisuallyHidden.displayName = 'VisuallyHidden';