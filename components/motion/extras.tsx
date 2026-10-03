'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { cn } from '@/lib/cn';
import { VIEWPORT } from './index';

const EASE = [0.22, 1, 0.36, 1] as const;

/** 단어 단위 라이즈 리빌 */
export function SplitWords({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <motion.span
      className={cn('inline', className)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      transition={{ staggerChildren: 0.07, delayChildren: delay }}
      aria-label={text}
    >
      {text.split(' ').map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.28em] pb-[0.12em] -mb-[0.12em]" aria-hidden="true">
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: '115%' }, show: { y: 0, transition: { duration: 1, ease: EASE } } }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/** 옆에서 열리듯 나오는 이미지 마스크 (관찰 대상은 바깥 div) */
export function ImageReveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div initial="hidden" whileInView="show" viewport={VIEWPORT} className={className}>
      <motion.div
        className="h-full"
        variants={{
          hidden: { clipPath: 'inset(0 0 0 100%)' },
          show: { clipPath: 'inset(0 0 0 0%)', transition: { duration: 1.3, ease: EASE, delay } },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

interface Img { src: string; alt: string; width: number; height: number; blurColor: string }

/** 스크롤에 따라 안에서 천천히 움직이는 이미지 */
export function ParallaxImage({ image, className, intensity = 9, eager = false }: { image: Img; className?: string; intensity?: number; eager?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${intensity}%`, `${intensity}%`]);
  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)} style={{ background: image.blurColor }}>
      <motion.img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={eager ? 'eager' : 'lazy'}
        style={{ y, scale: 1.22 }}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
}

/** 끝없이 흐르는 텍스트 띠 */
export function Marquee({ items, className }: { items: string[]; className?: string }) {
  return (
    <div className={cn('overflow-hidden whitespace-nowrap select-none', className)} aria-hidden="true">
      <div className="marquee-track inline-flex">
        {[0, 1].map((k) => (
          <span key={k} className="inline-flex shrink-0 items-center">
            {items.map((t) => (
              <span key={t + k} className="inline-flex items-center">
                <span className="px-6 md:px-10">{t}</span>
                <span className="w-2 h-2 rounded-full bg-brass" />
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}