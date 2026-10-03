'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/cn';
import { ROOM_SPECS, ROOMS, getAllRoomSpecs } from '@/data/content';
import { ROOM_IMAGES } from '@/data/images';
import { SITE } from '@/config/site';
import { Button, Badge, Separator } from '@/components/ui';
import { FadeUp, ClipReveal, LineReveal, StaggerContainer, StaggerItem } from '@/components/motion';
import { Calendar, Users, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { useBookingStore } from '@/store/booking';

export function Rooms() {
  const rooms = getAllRoomSpecs();
  const { roomSlug, setRoomSlug } = useBookingStore();

  return (
    <section id="rooms" className="section bg-paper" aria-labelledby="rooms-title">
      <div className="container">
        {/* 섹션 헤더 */}
        <div className="mb-12 md:mb-16 max-w-2xl">
          <h2 id="rooms-title" className="sr-only">객실 안내</h2>
          <LineReveal
            as="p"
            className="letter-wide text-sea mb-2"
          >
            Rooms
          </LineReveal>
          <LineReveal
            as="h3"
            duration={0.9}
            className="font-display font-medium text-3xl md:text-5xl lg:text-6xl text-ink leading-[1.2]"
          >
            두 개의 독채, <br />다른 바다와 돌의 풍경
          </LineReveal>
        </div>

        {/* 데스크톱: 좌우 분할 패널 + 호버 인터랙션 */}
        <div className="hidden lg:flex gap-4 mb-16" role="list" aria-label="객실 선택">
          {rooms.map((room, index) => (
            <RoomPanel
              key={room.slug}
              room={room}
              index={index}
              isActive={roomSlug === room.slug}
              onSelect={() => setRoomSlug(room.slug)}
            />
          ))}
        </div>

        {/* 모바일: 세로 스택 */}
        <div className="lg:hidden space-y-8" role="list" aria-label="객실 선택">
          {rooms.map((room) => (
            <MobileRoomCard
              key={room.slug}
              room={room}
              isActive={roomSlug === room.slug}
              onSelect={() => setRoomSlug(room.slug)}
            />
          ))}
        </div>

        {/* 비교 표 - 탭 형태로 */}
        <FadeUp delay={0.3} duration={0.8} y={16}>
          <RoomComparisonTable rooms={rooms} />
        </FadeUp>
      </div>
    </section>
  );
}

/* 데스크톱 패널 컴포넌트 */
function RoomPanel({
  room,
  index,
  isActive,
  onSelect,
}: {
  room: typeof ROOM_SPECS['la-mer'];
  index: number;
  isActive: boolean;
  onSelect: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      role="listitem"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'relative flex flex-col overflow-hidden rounded-[4px] border border-basalt/20 bg-paper',
        'transition-all duration-500 ease-out',
        isActive ? 'ring-2 ring-sea ring-offset-2 ring-offset-paper' : '',
        hovered && !isActive ? 'flex-[1.3] z-10 shadow-[0_12px_40px_rgba(28,43,46,0.1)]' : 'flex-1'
      )}
      style={{ flexGrow: hovered && !isActive ? 1.3 : 1 }}
    >
      {/* 이미지 슬라이더 */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <RoomImageSlider images={ROOM_IMAGES} roomSlug={room.slug} />
      </div>

      {/* 콘텐츠 */}
      <div className="flex-1 flex flex-col p-6 md:p-8">
        {/* 영문 이름 + 한글 이름 */}
        <div className="mb-4">
          <LineReveal
            as="p"
            className="font-accent-italic text-2xl md:text-3xl text-sea/80 tracking-[0.05em]"
          >
            {room.nameEn}
          </LineReveal>
          <LineReveal
            as="h3"
            delay={0.1}
            className="font-display font-medium text-2xl md:text-3xl text-ink mt-1"
          >
            {room.nameKo}
          </LineReveal>
        </div>

        {/* 한 줄 설명 */}
        <FadeUp delay={0.2} y={8}>
          <p className="text-basalt leading-relaxed mb-6">{room.description}</p>
        </FadeUp>

        {/* 핵심 스펙 - 얇은 라인 리스트 */}
        <FadeUp delay={0.3} y={8}>
          <dl className="space-y-3 mb-6" role="list">
            <SpecRow label="면적" value={room.area} />
            <SpecRow label="유형" value={room.type} />
            <SpecRow label="인원" value={`기준 ${room.capacity.base} / 최대 ${room.capacity.max}`} />
            <SpecRow label="1박" value={`${room.price.base.toLocaleString()}원`} />
          </dl>
        </FadeUp>

        {/* 차별점 뱃지 */}
        <FadeUp delay={0.4} y={8}>
          <div className="flex flex-wrap gap-2 mb-6">
            {room.hasSpa && (
              <Badge variant="sea">스파/월풀</Badge>
            )}
            {room.hasPocketBall && (
              <Badge variant="outline">포켓볼 다이</Badge>
            )}
          </div>
        </FadeUp>

        {/* 액션 버튼 */}
        <FadeUp delay={0.5} y={8}>
          <Button
            onClick={onSelect}
            variant={isActive ? 'primary' : 'secondary'}
            className="w-full justify-center gap-2"
          >
            {isActive ? '선택됨' : '자세히 보기'}
            <Maximize2 className="w-4 h-4 stroke-[1.5]" aria-hidden="true" />
          </Button>
        </FadeUp>
      </div>
    </motion.article>
  );
}

/* 모바일 카드 컴포넌트 */
function MobileRoomCard({
  room,
  isActive,
  onSelect,
}: {
  room: typeof ROOM_SPECS['la-mer'];
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.article
      role="listitem"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'border border-basalt/20 rounded-[4px] overflow-hidden bg-paper',
        isActive && 'ring-2 ring-sea ring-offset-2 ring-offset-paper'
      )}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <RoomImageSlider images={ROOM_IMAGES} roomSlug={room.slug} />
      </div>

      <div className="p-6">
        <div className="flex items-baseline justify-between gap-3 mb-3">
          <div>
            <p className="font-accent-italic text-lg text-sea/80">{room.nameEn}</p>
            <h3 className="font-display font-medium text-xl text-ink">{room.nameKo}</h3>
          </div>
          {isActive && (
            <Badge variant="sea">선택됨</Badge>
          )}
        </div>

        <p className="text-basalt leading-relaxed mb-4">{room.description}</p>

        <dl className="space-y-2 mb-4 text-sm" role="list">
          <SpecRow label="면적" value={room.area} />
          <SpecRow label="인원" value={`기준 ${room.capacity.base} / 최대 ${room.capacity.max}`} />
          <SpecRow label="1박" value={`${room.price.base.toLocaleString()}원`} />
        </dl>

        <div className="flex flex-wrap gap-2 mb-4">
          {room.hasSpa && <Badge variant="sea">스파/월풀</Badge>}
          {room.hasPocketBall && <Badge variant="outline">포켓볼 다이</Badge>}
        </div>

        <Button onClick={onSelect} variant={isActive ? 'primary' : 'secondary'} className="w-full">
          {isActive ? '이 객실로 예약하기' : '자세히 보기'}
        </Button>
      </div>
    </motion.article>
  );
}

/* 스펙 행 */
function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4" role="listitem">
      <dt className="letter-wide text-basalt/60 text-sm">{label}</dt>
      <dd className="font-medium text-ink text-right tabular-nums">{value}</dd>
    </div>
  );
}

/* 이미지 슬라이더 (Embla) */
function RoomImageSlider({ images, roomSlug }: { images: typeof ROOM_IMAGES; roomSlug: string }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();
  const scrollTo = (index: number) => emblaApi?.scrollTo(index);

  useEffect(() => {
    if (!emblaApi) return;
    const onInit = () => setScrollSnaps(emblaApi.scrollSnapList());
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    const onReInit = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on('init', onInit);
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onReInit);
    onInit();
    return () => {
      emblaApi.off('init', onInit);
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onReInit);
    };
  }, [emblaApi]);

  return (
    <div ref={emblaRef} className="embla" aria-label={`${roomSlug === 'la-mer' ? '라메르' : '피에르'} 객실 이미지`}>
      <div className="embla__container">
        {images.map((image, i) => (
          <div key={image.id} className="embla__slide">
            <img
              src={image.src}
              alt={`${roomSlug === 'la-mer' ? '라메르' : '피에르'} ${i + 1}: ${image.alt}`}
              className="w-full h-full object-cover"
              loading={i === 0 ? 'eager' : 'lazy'}
              width={image.width}
              height={image.height}
              onError={(e) => {
                e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 768'%3E%3Crect fill='${image.blurColor.slice(1)}' width='1024' height='768'/%3E%3Ctext x='512' y='384' font-family='system-ui' font-size='24' fill='%23666' text-anchor='middle' dominant-baseline='middle'%3E이미지 로드 실패%3C/text%3E%3C/svg%3E`;
              }}
            />
          </div>
        ))}
      </div>

      {/* 네비게이션 버튼 */}
      <button
        className="embla__button embla__button--prev"
        onClick={scrollPrev}
        aria-label="이전 이미지"
        type="button"
      >
        <ChevronLeft className="w-5 h-5 stroke-[1.5]" aria-hidden="true" />
      </button>
      <button
        className="embla__button embla__button--next"
        onClick={scrollNext}
        aria-label="다음 이미지"
        type="button"
      >
        <ChevronRight className="w-5 h-5 stroke-[1.5]" aria-hidden="true" />
      </button>

      {/* 닷 인디케이터 */}
      <div className="embla__dots" role="tablist" aria-label="이미지 선택">
        {scrollSnaps.map((_, i) => (
          <button
            key={i}
            className={cn(
              'embla__dot',
              i === selectedIndex && 'embla__dot--selected'
            )}
            onClick={() => scrollTo(i)}
            role="tab"
            aria-selected={i === selectedIndex}
            aria-label={`이미지 ${i + 1}`}
            type="button"
          />
        ))}
      </div>
    </div>
  );
}

/* 비교 표 - Radix Tabs 스타일로 직접 구현 */
function RoomComparisonTable({ rooms }: { rooms: typeof ROOMS extends readonly (infer T)[] ? ReturnType<typeof import('@/data/content').getAllRoomSpecs> : never }) {
  const [activeTab, setActiveTab] = useState<'all' | 'differences'>('differences');

  const differences = [
    { feature: '스파/월풀', 'la-mer': true, pierre: true },
    { feature: '포켓볼 다이', 'la-mer': true, pierre: false },
  ] as const;

  const commonFeatures = [
    '개별바비큐',
    '빔프로젝터',
    '침대',
    '에어컨',
    'TV',
    '취사시설',
    '식탁',
    '냉장고',
    '전자레인지',
    '커피포트',
    '기준 4인 / 최대 8인',
    '30평',
    '복층 독채',
    '넷플릭스 시청 가능',
  ] as const;

  return (
    <div className="border border-basalt/20 rounded-[4px] overflow-hidden">
      {/* 탭 트리거 */}
      <div className="flex bg-basalt/10 border-b border-basalt/20" role="tablist">
        <button
          role="tab"
          aria-selected={activeTab === 'differences'}
          aria-controls="panel-differences"
          id="tab-differences"
          onClick={() => setActiveTab('differences')}
          className={cn(
            'flex-1 px-6 py-4 text-sm font-medium transition-all duration-200',
            activeTab === 'differences'
              ? 'bg-paper text-ink border-b-2 border-sea'
              : 'text-basalt hover:text-ink'
          )}
        >
          차이점 비교
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'all'}
          aria-controls="panel-all"
          id="tab-all"
          onClick={() => setActiveTab('all')}
          className={cn(
            'flex-1 px-6 py-4 text-sm font-medium transition-all duration-200',
            activeTab === 'all'
              ? 'bg-paper text-ink border-b-2 border-sea'
              : 'text-basalt hover:text-ink'
          )}
        >
          전체 구비시설
        </button>
      </div>

      {/* 탭 패널 */}
      <div role="tabpanel" id="panel-differences" aria-labelledby="tab-differences" hidden={activeTab !== 'differences'}>
        <div className="overflow-x-auto">
          <table className="w-full" role="table">
            <thead>
              <tr className="border-b border-basalt/20">
                <th className="px-6 py-4 text-left font-medium text-basalt letter-wide">구분</th>
                {rooms.map((room) => (
                  <th key={room.slug} className="px-6 py-4 text-center font-display font-medium text-ink">
                    {room.nameKo} <span className="font-accent-italic text-sm text-basalt/60 block mt-1">({room.nameEn})</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {differences.map((row) => (
                <tr key={row.feature} className="border-b border-basalt/10">
                  <td className="px-6 py-4 font-medium text-ink">{row.feature}</td>
                  {rooms.map((room) => (
                    <td key={room.slug} className="px-6 py-4 text-center">
                      <span className={cn(
                        'inline-flex items-center justify-center w-10 h-10 mx-auto rounded-full text-sm font-medium',
                        row[room.slug as keyof typeof row] ? 'bg-sea/10 text-sea' : 'bg-basalt/10 text-basalt/50'
                      )}>
                        {row[room.slug as keyof typeof row] ? '✓' : '✗'}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div role="tabpanel" id="panel-all" aria-labelledby="tab-all" hidden={activeTab !== 'all'}>
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3" role="list">
            {commonFeatures.map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-basalt" role="listitem">
                <span className="w-1.5 h-1.5 rounded-full bg-sea/40 flex-shrink-0" aria-hidden="true" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}