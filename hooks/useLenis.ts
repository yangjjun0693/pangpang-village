/**
 * Lenis 부드러운 스크롤 훅
 * prefers-reduced-motion이면 비활성화
 * 클라이언트 사이드에서만 초기화
 */

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

declare global {
  interface Window {
    __lenis__?: any;
  }
}

export function useLenis() {
  const reducedMotion = useReducedMotion();
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    if (reducedMotion) return;

    // 동적 import로 번들 크기 최적화
    import('@studio-freight/lenis').then(({ default: Lenis }) => {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // 부드러운 감속
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      lenisRef.current = lenis;
      window.__lenis__ = lenis;

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      return () => {
        lenis.destroy();
        window.__lenis__ = undefined;
      };
    });
  }, [reducedMotion]);

  return lenisRef.current;
}

// 스크롤 진행률 (0~1)
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const onScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setProgress(lenis.scroll / scrollHeight);
      }
    };

    lenis.on('scroll', onScroll);
    return () => lenis.off('scroll', onScroll);
  }, [lenis]);

  return progress;
}