'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'motion/react';
import { HERO_IMAGE } from '@/data/images';
import { HERO_COPY } from '@/data/content';
import { SITE } from '@/config/site';
import { Button } from '@/components/ui';
import { FadeUp, LineReveal } from '@/components/motion';
import { Marquee } from '@/components/motion/extras';
import { Calendar, Users } from 'lucide-react';
import { useBookingStore } from '@/store/booking';
import { formatDateShort } from '@/lib/format';

const MARQUEE_ITEMS = ['라메르', '피에르', '독채', '복층 3층', '30평', '귀덕리 해안도로'];

export function Hero() {
  const imgWrap = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const { checkIn, checkOut, roomSlug, setRoomSlug } = useBookingStore();

  useEffect(() => setMounted(true), []);

  /* 스크롤하면 이미지 프레임이 좌우로 열리며 풀블리드가 된다 */
  const { scrollYProgress } = useScroll({ target: imgWrap, offset: ['start end', 'start 15%'] });
  const inset = useTransform(scrollYProgress, [0, 1], [16, 0]);
  const clip = useMotionTemplate`inset(0% ${inset}% 0% ${inset}%)`;
  const zoom = useTransform(scrollYProgress, [0, 1], [1.4, 1.02]);

  const handleQuickReserve = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById('booking');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      target.focus();
    }
  };

  const [line1, line2] = [SITE.nameEn.split(' ').slice(0, 2).join(' '), SITE.nameEn.split(' ').slice(2).join(' ')];

  return (
    <section id="hero" className="relative bg-paper pt-28 md:pt-36 overflow-hidden" aria-labelledby="hero-title">
      <div className="container px-6 md:px-10 lg:px-16">
        <FadeUp delay={0.1} className="flex items-center justify-between text-xs tracking-[0.3em] uppercase text-basalt mb-8 md:mb-12">
          <span>Jeju · Gwideok</span>
          <span className="hidden sm:inline">Private 3F Villa</span>
        </FadeUp>

        <h1 id="hero-title" className="font-accent font-medium uppercase text-ink leading-[0.84] tracking-[-0.02em] text-[clamp(3.4rem,14.5vw,13rem)]">
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span className="block" initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}>
              {line1}
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.06em] md:pl-[12vw]">
            <motion.span className="block" initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}>
              {line2}
            </motion.span>
          </span>
        </h1>

        <div className="mt-10 md:mt-14 grid md:grid-cols-12 gap-6 items-end">
          <LineReveal as="p" delay={0.6} className="md:col-span-7 font-display font-medium text-2xl md:text-4xl text-ink leading-snug">
            {HERO_COPY.main}
          </LineReveal>
          <FadeUp delay={0.8} className="md:col-span-5 md:text-right text-basalt">
            {HERO_COPY.sub}
          </FadeUp>
        </div>
      </div>

      {/* 풀블리드 이미지 프레임 */}
      <div ref={imgWrap} className="relative mt-14 md:mt-20 h-[70vh] md:h-[88vh]">
        <motion.div className="absolute inset-0 overflow-hidden" style={{ clipPath: clip, background: HERO_IMAGE.blurColor }}>
          <motion.img
            src={HERO_IMAGE.src}
            alt={HERO_IMAGE.alt}
            width={HERO_IMAGE.width}
            height={HERO_IMAGE.height}
            loading="eager"
            style={{ scale: zoom }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>
      </div>

      {/* 예약 퀵바 - 이미지 하단에 걸치게 */}
      <div className="container px-6 md:px-10 lg:px-16 relative z-10 -mt-14 md:-mt-16">
        {mounted && (
          <FadeUp delay={0.1}>
            <div className="max-w-4xl mx-auto">
              <QuickBookingBar
                checkIn={checkIn}
                checkOut={checkOut}
                roomSlug={roomSlug}
                onRoomChange={setRoomSlug}
                onReserveClick={handleQuickReserve}
              />
            </div>
          </FadeUp>
        )}
      </div>

      <Marquee items={MARQUEE_ITEMS} className="font-accent font-medium text-5xl md:text-8xl text-ink/90 py-16 md:py-24" />
    </section>
  );
}

function QuickBookingBar({
  checkIn,
  checkOut,
  roomSlug,
  onRoomChange,
  onReserveClick,
}: {
  checkIn: Date | null;
  checkOut: Date | null;
  roomSlug: 'la-mer' | 'pierre';
  onRoomChange: (slug: 'la-mer' | 'pierre') => void;
  onReserveClick: (e: React.MouseEvent) => void;
}) {
  const ROOM_LABELS = {
    'la-mer': '라메르 (La Mer)',
    'pierre': '피에르 (Pierre)',
  } as const;

  return (
    <div
      className="hero-glass p-4 md:p-6"
      role="search"
      aria-label="빠른 예약"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        {/* 체크인 */}
        <div>
          <label htmlFor="hero-checkin" className="label">
            체크인
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-basalt/50 stroke-[1.5]" aria-hidden="true" />
            <input
              id="hero-checkin"
              type="text"
              readOnly
              value={checkIn ? formatDateShort(checkIn) : '날짜 선택'}
              className="input pl-10 cursor-pointer"
              onClick={onReserveClick}
            />
          </div>
        </div>

        {/* 체크아웃 */}
        <div>
          <label htmlFor="hero-checkout" className="label">
            체크아웃
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-basalt/50 stroke-[1.5]" aria-hidden="true" />
            <input
              id="hero-checkout"
              type="text"
              readOnly
              value={checkOut ? formatDateShort(checkOut) : '날짜 선택'}
              className="input pl-10 cursor-pointer"
              onClick={onReserveClick}
            />
          </div>
        </div>

        {/* 객실 선택 */}
        <div>
          <label htmlFor="hero-room" className="label">
            객실
          </label>
          <select
            id="hero-room"
            value={roomSlug}
            onChange={(e) => onRoomChange(e.target.value as 'la-mer' | 'pierre')}
            className="input appearance-none bg-no-repeat bg-right pr-10"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%234A4D4B' stroke-width='1.5'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundPosition: 'right 0.75rem center' }}
          >
            <option value="la-mer">{ROOM_LABELS['la-mer']}</option>
            <option value="pierre">{ROOM_LABELS['pierre']}</option>
          </select>
        </div>

        {/* 예약 버튼 */}
        <Button onClick={onReserveClick} variant="primary" className="w-full md:w-auto md:ml-2">
          <Users className="w-4 h-4 stroke-[1.5]" aria-hidden="true" />
          예약 문의
        </Button>
      </div>

      <p className="mt-4 text-xs text-basalt/50 text-center">
        날짜와 객실을 선택하면 예약 문의 섹션으로 이동합니다.
      </p>
    </div>
  );
}