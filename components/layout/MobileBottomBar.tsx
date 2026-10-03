'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/cn';
import { SITE } from '@/config/site';
import { Button } from '@/components/ui';
import { useBookingStore, useBookingStoreReady } from '@/store/booking';

export function MobileBottomBar() {
  const [visible, setVisible] = useState(false);
  const ready = useBookingStoreReady();
  const { checkIn, checkOut } = useBookingStore();
  
  const nights = checkIn && checkOut
    ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
    : 1;
  const baseTotal = SITE.price.base * nights;

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible || !ready) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className={cn(
        'fixed bottom-0 left-0 right-0 z-40',
        'bg-paper/95 backdrop-blur-sm border-t border-basalt/20',
        'px-4 py-3 safe-area-inset-bottom',
        'flex items-center justify-between gap-4'
      )}
      role="region"
      aria-label="예약 빠른 접근"
    >
      <div className="flex flex-col items-start gap-0.5 min-w-0">
        <span className="font-accent-italic text-xs text-basalt/60 tracking-[0.18em] uppercase">
          1박 기준
        </span>
        <span className="font-display font-medium text-lg tabular-nums text-ink">
          {baseTotal.toLocaleString()}원<span className="font-body text-basalt text-sm ml-1">~</span>
        </span>
      </div>

      <Button
        onClick={() => {
          const target = document.getElementById('booking');
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            target.focus();
          }
        }}
        variant="primary"
        className="flex-1 max-w-xs py-3 text-base"
      >
        예약 문의
      </Button>
    </motion.div>
  );
}