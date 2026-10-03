'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import { HERO_IMAGE, ROOM_IMAGES } from '@/data/images';
import { HERO_COPY } from '@/data/content';
import { SITE } from '@/config/site';
import { Button } from '@/components/ui';
import { FadeUp, LineReveal, ClipReveal, KenBurns } from '@/components/motion';
import { Calendar, Users, ChevronDown } from 'lucide-react';
import { useBookingStore } from '@/store/booking';
import { formatDateShort } from '@/lib/format';

export function Hero() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const { checkIn, checkOut, roomSlug, setRoomSlug } = useBookingStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleQuickReserve = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById('booking');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      target.focus();
    }
  };

  return (
    <section
      ref={scrollRef}
      id="hero"
      className="relative min-h-screen flex items-end overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* 배경 이미지 - 풀블리드 + 켄번즈 */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <KenBurns duration={22} scaleStart={1} scaleEnd={1.05}>
          <div className="absolute inset-0">
            <img
              src={HERO_IMAGE.src}
              alt=""
              className="w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
              width={HERO_IMAGE.width}
              height={HERO_IMAGE.height}
            />
            {/* 어두운 오버레이 그라디언트 - 텍스트 가독성용 */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/20 to-transparent" />
            {/* 하단 페이드 - 다음 섹션과 자연스러운 연결 */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-paper to-transparent" />
          </div>
        </KenBurns>
      </div>

      {/* 스크롤 유도 표시 */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <div className="w-px h-12 bg-sea/50 rounded-full overflow-hidden">
          <motion.div
            className="w-full h-1/3 bg-sea"
            animate={{ y: [0, '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <ChevronDown className="w-5 h-5 text-sea stroke-[1.5]" />
      </motion.div>

      {/* 콘텐츠 */}
      <div className="container relative z-10 px-6 md:px-10 lg:px-16 pb-20 md:pb-28 lg:pb-36">
        <div className="max-w-3xl">
          {/* 메인 타이틀 - 줄 단위 리빌 */}
          <h1 id="hero-title" className="font-display font-medium text-ink/5 mb-6">
            <LineReveal
              as="div"
              duration={1}
              stagger={0.12}
              delay={0.2}
              className="text-paper"
            >
              {HERO_COPY.main}
            </LineReveal>
          </h1>

          {/* 서브 카피 */}
          <p className="font-body text-paper/90 text-lg md:text-xl leading-relaxed mb-10 max-w-[30em]">
            <FadeUp delay={0.6} duration={0.8} y={12}>
              {HERO_COPY.sub}
            </FadeUp>
          </p>

          {/* 예약 퀵바 */}
          {mounted && (
            <FadeUp delay={0.8} duration={0.8} y={16}>
              <QuickBookingBar
                checkIn={checkIn}
                checkOut={checkOut}
                roomSlug={roomSlug}
                onRoomChange={setRoomSlug}
                onReserveClick={handleQuickReserve}
              />
            </FadeUp>
          )}
        </div>
      </div>
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
      className="bg-paper/95 backdrop-blur-sm border border-basalt/20 rounded-[4px] p-4 md:p-6 shadow-[0_4px_24px_rgba(28,43,46,0.08)]"
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