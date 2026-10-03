'use client';

import { motion, type HTMLMotionProps } from 'motion/react';
import { cn } from '@/lib/cn';
import { forwardRef } from 'react';

interface FadeUpProps extends HTMLMotionProps<'div'> {
  delay?: number;
  duration?: number;
  y?: number;
  children: React.ReactNode;
}

export const FadeUp = forwardRef<HTMLDivElement, FadeUpProps>(
  ({ className, delay = 0, duration = 0.8, y = 16, children, ...props }, ref) => (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, ease: [0.22, 1, 0.36, 1], delay }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  )
);

FadeUp.displayName = 'FadeUp';

interface LineRevealProps extends HTMLMotionProps<'div'> {
  delay?: number;
  duration?: number;
  stagger?: number;
  children: React.ReactNode;
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'div' | 'blockquote';
}

export const LineReveal = forwardRef<HTMLDivElement, LineRevealProps>(
  ({ className, delay = 0, duration = 0.9, stagger = 0.08, children, as: Component = 'div', ...props }, ref) => {
    const lines = typeof children === 'string' ? children.split('\n') : [children];

    const renderLines = () => (
      <>
        {lines.map((line, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration, ease: [0.22, 1, 0.36, 1], delay: delay + i * stagger }}
            style={{ display: 'block' }}
          >
            {line}
            {i < lines.length - 1 && <br />}
          </motion.span>
        ))}
      </>
    );

    switch (Component) {
      case 'p':
        return <motion.p ref={ref} className={cn(className)} {...props}>{renderLines()}</motion.p>;
      case 'h1':
        return <motion.h1 ref={ref} className={cn(className)} {...props}>{renderLines()}</motion.h1>;
      case 'h2':
        return <motion.h2 ref={ref} className={cn(className)} {...props}>{renderLines()}</motion.h2>;
      case 'h3':
        return <motion.h3 ref={ref} className={cn(className)} {...props}>{renderLines()}</motion.h3>;
      case 'h4':
        return <motion.h4 ref={ref} className={cn(className)} {...props}>{renderLines()}</motion.h4>;
      case 'span':
        return <motion.span ref={ref} className={cn(className)} {...props}>{renderLines()}</motion.span>;
      case 'blockquote':
        return <motion.blockquote ref={ref as any} className={cn(className)} {...(props as any)}>{renderLines()}</motion.blockquote>;
      default:
        return <motion.div ref={ref} className={cn(className)} {...props}>{renderLines()}</motion.div>;
    }
  }
);

LineReveal.displayName = 'LineReveal';

interface ClipRevealProps extends HTMLMotionProps<'div'> {
  delay?: number;
  duration?: number;
  children: React.ReactNode;
}

export const ClipReveal = forwardRef<HTMLDivElement, ClipRevealProps>(
  ({ className, delay = 0, duration = 1, children, ...props }, ref) => (
    <motion.div
      ref={ref}
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      animate={{ clipPath: 'inset(0 0 0 0)' }}
      transition={{ duration, ease: [0.22, 1, 0.36, 1], delay }}
      className={cn('overflow-hidden', className)}
      {...props}
    >
      {children}
    </motion.div>
  )
);

ClipReveal.displayName = 'ClipReveal';

interface KenBurnsProps extends HTMLMotionProps<'div'> {
  duration?: number;
  scaleStart?: number;
  scaleEnd?: number;
  children: React.ReactNode;
}

export const KenBurns = forwardRef<HTMLDivElement, KenBurnsProps>(
  ({ className, duration = 20, scaleStart = 1, scaleEnd = 1.06, children, ...props }, ref) => (
    <motion.div
      ref={ref}
      initial={{ scale: scaleStart }}
      animate={{ scale: scaleEnd }}
      transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
      className={cn('overflow-hidden', className)}
      {...props}
    >
      {children}
    </motion.div>
  )
);

KenBurns.displayName = 'KenBurns';

interface StaggerContainerProps extends HTMLMotionProps<'div'> {
  stagger?: number;
  delayChildren?: number;
  children: React.ReactNode;
}

export const StaggerContainer = forwardRef<HTMLDivElement, StaggerContainerProps>(
  ({ className, stagger = 0.1, delayChildren = 0, children, ...props }, ref) => (
    <motion.div
      ref={ref}
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { staggerChildren: stagger, delayChildren },
        },
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  )
);

StaggerContainer.displayName = 'StaggerContainer';

interface StaggerItemProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
}

export const StaggerItem = forwardRef<HTMLDivElement, StaggerItemProps>(
  ({ className, children, ...props }, ref) => (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  )
);

StaggerItem.displayName = 'StaggerItem';