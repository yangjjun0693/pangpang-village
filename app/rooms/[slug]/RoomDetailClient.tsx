'use client';

import { useEffect } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import { SITE } from '@/config/site';
import { ROOM_IMAGES, FLOOR_TOUR_IMAGES } from '@/data/images';
import { ROOM_SPECS, type RoomSpec } from '@/data/content';
import { Header } from '@/components/layout';
import { Footer } from '@/components/layout';
import { MobileBottomBar } from '@/components/layout';
import { LenisProvider } from '@/components/providers';
import { Button } from '@/components/ui';
import { FadeUp, LineReveal, ClipReveal, KenBurns, StaggerContainer, StaggerItem } from '@/components/motion';
import { Calendar, Users, Maximize2, ChevronLeft, ChevronRight, MapPin, Waves, Flame, Baby, Check } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { useBookingStore } from '@/store/booking';
import { formatDateShort } from '@/lib/format';
import { formatPrice } from '@/lib/price';

interface RoomDetailClientProps {
  room: RoomSpec;
}

export function RoomDetailClient({ room }: RoomDetailClientProps) {
  const { roomSlug, checkIn, checkOut, setRoomSlug, setDates } = useBookingStore();

  useEffect(() => {
    setRoomSlug(room.slug);
  }, [room.slug, setRoomSlug]);

  const handleQuickReserve = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById('booking');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      target.focus();
    }
  };

  const nights = checkIn && checkOut
    ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
    : 1;

  return (
    <LenisProvider>
      <Header />
      <main id="main-content" className="min-h-screen">
        {/* 히어로 - 객실 대표 이미지 */}
        <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-end overflow-hidden" aria-labelledby="room-hero-title">
          <div className="absolute inset-0 z-0" aria-hidden="true">
            <KenBurns duration={25} scaleStart={1} scaleEnd={1.04}>
              <div className="absolute inset-0">
                <img
                  src={ROOM_IMAGES[0].src}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                  width={ROOM_IMAGES[0].width}
                  height={ROOM_IMAGES[0].height}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-paper to-transparent" />
              </div>
            </KenBurns>
          </div>

          <div className="container relative z-10 px-6 md:px-10 lg:px-16 pb-16 md:pb-24">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <LineReveal
                  as="p"
                  className="letter-wide text-sea/80 mb-2 text-paper"
                >
                  {room.nameEn}
                </LineReveal>
                <h1 id="room-hero-title" className="font-display font-medium text-4xl md:text-6xl lg:text-7xl text-paper leading-[1.15] tracking-tight mb-4">
                  {room.nameKo}
                </h1>
                <p className="font-body text-paper/90 text-lg md:text-xl leading-relaxed mb-8 max-w-[32em]">
                  {room.description}
                </p>

                {/* 퀵 예약 바 */}
                <div className="bg-paper/95 backdrop-blur-sm border border-basalt/20 rounded-[4px] p-4 md:p-6 shadow-[0_4px_24px_rgba(28,43,46,0.08)]">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div>
                      <label htmlFor="room-checkin" className="label">체크인</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-basalt/50 stroke-[1.5]" aria-hidden="true" />
                        <input id="room-checkin" type="text" readOnly value={checkIn ? formatDateShort(checkIn) : '날짜 선택'} className="input pl-10 cursor-pointer" onClick={handleQuickReserve} />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="room-checkout" className="label">체크아웃</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-basalt/50 stroke-[1.5]" aria-hidden="true" />
                        <input id="room-checkout" type="text" readOnly value={checkOut ? formatDateShort(checkOut) : '날짜 선택'} className="input pl-10 cursor-pointer" onClick={handleQuickReserve} />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="room-guests" className="label">인원</label>
                      <select id="room-guests" className="input appearance-none bg-no-repeat bg-right pr-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%234A4D4B' stroke-width='1.5'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundPosition: 'right 0.75rem center' }}>
                        {[2,3,4,5,6,7,8].map((n) => <option key={n} value={n}>{n}명</option>)}
                      </select>
                    </div>
                    <Button onClick={handleQuickReserve} variant="primary" className="w-full md:w-auto md:ml-2">
                      <Users className="w-4 h-4 stroke-[1.5]" aria-hidden="true" />
                      예약 문의
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 객실 상세 정보 */}
        <section className="section bg-paper" aria-labelledby="room-detail-title">
          <div className="container">
            <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16">
              {/* 좌측: 이미지 갤러리 + 핵심 스펙 */}
              <div className="space-y-8">
                {/* 이미지 슬라이더 */}
                <FadeUp delay={0.1} duration={0.8} y={16}>
                  <div className="relative aspect-[4/3] rounded-[4px] overflow-hidden bg-basalt/10">
                    <RoomImageGallery images={ROOM_IMAGES} roomName={room.nameKo} />
                  </div>
                </FadeUp>

                {/* 핵심 스펙 카드 */}
                <FadeUp delay={0.2} duration={0.8} y={16}>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4" role="list">
                    <SpecCard label="면적" value={room.area} icon={<Maximize2 className="w-5 h-5" />} />
                    <SpecCard label="유형" value={room.type} icon={<MapPin className="w-5 h-5" />} />
                    <SpecCard label="인원" value={`기준 ${room.capacity.base} / 최대 ${room.capacity.max}`} icon={<Users className="w-5 h-5" />} />
                    <SpecCard label="1박 요금" value={formatPrice(room.price.base)} icon={<Calendar className="w-5 h-5" />} />
                  </div>
                </FadeUp>

                {/* 차별점 */}
                <FadeUp delay={0.3} duration={0.8} y={16}>
                  <div className="border border-basalt/20 rounded-[4px] p-6 bg-paper">
                    <h3 className="font-display font-medium text-lg text-ink mb-4">이 객실만의 특징</h3>
                    <div className="flex flex-wrap gap-2">
                      {room.hasSpa && <span className="px-3 py-1 text-sm font-medium bg-sea/10 text-sea rounded-[2px]">스파/월풀 구비</span>}
                      {room.hasPocketBall && <span className="px-3 py-1 text-sm font-medium bg-basalt/10 text-basalt rounded-[2px] border border-basalt/20">포켓볼 다이</span>}
                      {!room.hasSpa && !room.hasPocketBall && <span className="px-3 py-1 text-sm font-medium bg-basalt/10 text-basalt/60 rounded-[2px] border border-basalt/20">기본 구비시설 동일</span>}
                    </div>
                  </div>
                </FadeUp>
              </div>

              {/* 우측: 구비시설 + 층별 시설 + 설명 */}
              <div className="space-y-8 lg:sticky lg:top-24 lg:max-h-[calc(100vh-6rem)] overflow-y-auto pr-4">
                {/* 구비시설 */}
                <FadeUp delay={0.1} duration={0.8} y={16}>
                  <div className="border border-basalt/20 rounded-[4px] p-6 bg-paper">
                    <h3 className="font-display font-medium text-lg text-ink mb-4 flex items-center gap-2">
                      <Waves className="w-5 h-5 text-sea" aria-hidden="true" />
                      구비시설
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="list">
                      {room.amenities.map((amenity) => (
                        <li key={amenity} className="flex items-center gap-2 text-basalt" role="listitem">
                          <span className="w-1.5 h-1.5 rounded-full bg-sea/40 flex-shrink-0" aria-hidden="true" />
                          <span>{amenity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeUp>

                {/* 층별 시설 */}
                <FadeUp delay={0.2} duration={0.8} y={16}>
                  <div className="border border-basalt/20 rounded-[4px] p-6 bg-paper">
                    <h3 className="font-display font-medium text-lg text-ink mb-4">층별 시설</h3>
                    <div className="space-y-6">
                      {Object.entries(room.floorFacilities).map(([floor, facilities]) => (
                        <div key={floor} className="border-t border-basalt/10 pt-4 first:border-0 first:pt-0">
                          <div className="flex items-baseline gap-3 mb-3">
                            <span className="font-accent font-medium text-2xl text-sea">{floor}</span>
                            <span className="font-medium text-ink">
                              {floor === '1F' && '1층'}
                              {floor === '2F' && '2층'}
                              {floor === '3F' && '3층 (복층)'}
                            </span>
                          </div>
                          <ul className="space-y-2" role="list">
                            {facilities.map((facility) => (
                              <li key={facility} className="flex items-center gap-2 text-basalt" role="listitem">
                                <span className="w-1.5 h-1.5 rounded-full bg-sea/40 flex-shrink-0" aria-hidden="true" />
                                <span>{facility}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeUp>

                {/* 바비큐 / 스파 안내 */}
                <FadeUp delay={0.3} duration={0.8} y={16}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <DetailCard
                      title="개별 바비큐"
                      icon={<Flame className="w-5 h-5" />}
                      items={[
                        '셀프 이용',
                        '사전 예약 필수',
                        `테이블당 ${SITE.price.bbq.toLocaleString()}원 (현장 결제)`,
                        '객실 내 직화 조리 금지',
                        '개인 취사도구 반입 금지',
                      ]}
                    />
                    <DetailCard
                      title="스파/월풀"
                      icon={<Waves className="w-5 h-5" />}
                      items={[
                        '해당 객실 VIP 객실 3층',
                        room.hasSpa ? '이 객실에 구비됨' : '라메르 객실에 구비됨',
                      ]}
                    />
                  </div>
                </FadeUp>
              </div>
            </div>

            {/* 다른 객실 보기 링크 */}
            <FadeUp delay={0.4} duration={0.8} y={16} className="mt-12 text-center">
              <Link href={`/rooms/${room.slug === 'la-mer' ? 'pierre' : 'la-mer'}`} className="inline-flex items-center gap-2 text-sea hover:text-sea/80 transition-colors font-medium">
                다른 객실 보기 ({room.slug === 'la-mer' ? '피에르' : '라메르'})
                <ChevronRight className="w-4 h-4 stroke-[1.5]" aria-hidden="true" />
              </Link>
            </FadeUp>
          </div>
        </section>

        {/* 예약 섹션 */}
        <section id="booking" className="section bg-paper-deep" aria-labelledby="booking-title">
          <div className="container max-w-4xl">
            <div className="mb-12 md:mb-16 max-w-xl mx-auto text-center">
              <h2 id="booking-title" className="sr-only">예약 문의</h2>
              <LineReveal as="p" className="letter-wide text-sea mb-2">Booking</LineReveal>
              <LineReveal as="h3" duration={0.9} className="font-display font-medium text-3xl md:text-5xl lg:text-6xl text-ink leading-[1.2]">
                {room.nameKo} 예약 문의
              </LineReveal>
            </div>

            <FadeUp delay={0.1} duration={0.8} y={16}>
              <BookingFormInline room={room} nights={nights} />
            </FadeUp>
          </div>
        </section>
      </main>
      <Footer />
      <MobileBottomBar />
    </LenisProvider>
  );
}

/* 서브 컴포넌트들 */
function SpecCard({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="border border-basalt/20 rounded-[4px] p-4 bg-paper text-center" role="listitem">
      <div className="flex items-center justify-center gap-2 mb-2 text-sea">{icon}</div>
      <dt className="letter-wide text-basalt/60 text-sm mb-1">{label}</dt>
      <dd className="font-medium text-ink">{value}</dd>
    </div>
  );
}

function DetailCard({ title, icon, items }: { title: string; icon: React.ReactNode; items: string[] }) {
  return (
    <div className="border border-basalt/20 rounded-[4px] p-4 bg-paper">
      <h4 className="font-display font-medium text-base text-ink mb-3 flex items-center gap-2 text-sea">
        {icon}
        {title}
      </h4>
      <ul className="space-y-2 text-sm text-basalt" role="list">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2" role="listitem">
            <span className="w-1.5 h-1.5 rounded-full bg-sea/40 flex-shrink-0 mt-1.5" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RoomImageGallery({ images, roomName }: { images: typeof ROOM_IMAGES; roomName: string }) {
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
    const onReInit = () => { setScrollSnaps(emblaApi.scrollSnapList()); setSelectedIndex(emblaApi.selectedScrollSnap()); };
    emblaApi.on('init', onInit);
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onReInit);
    onInit();
    return () => { emblaApi.off('init', onInit); emblaApi.off('select', onSelect); emblaApi.off('reInit', onReInit); };
  }, [emblaApi]);

  return (
    <div ref={emblaRef} className="embla" aria-label={`${roomName} 객실 이미지`}>
      <div className="embla__container">
        {images.map((image, i) => (
          <div key={image.id} className="embla__slide">
            <img src={image.src} alt={`${roomName} ${i + 1}: ${image.alt}`} className="w-full h-full object-cover" loading={i === 0 ? 'eager' : 'lazy'} width={image.width} height={image.height} onError={(e) => { e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 768'%3E%3Crect fill='${image.blurColor.slice(1)}' width='1024' height='768'/%3E%3Ctext x='512' y='384' font-family='system-ui' font-size='24' fill='%23666' text-anchor='middle' dominant-baseline='middle'%3E이미지 로드 실패%3C/text%3E%3C/svg%3E`; }} />
          </div>
        ))}
      </div>
      <button className="embla__button embla__button--prev" onClick={scrollPrev} aria-label="이전 이미지" type="button"><ChevronLeft className="w-5 h-5 stroke-[1.5]" aria-hidden="true" /></button>
      <button className="embla__button embla__button--next" onClick={scrollNext} aria-label="다음 이미지" type="button"><ChevronRight className="w-5 h-5 stroke-[1.5]" aria-hidden="true" /></button>
      <div className="embla__dots" role="tablist" aria-label="이미지 선택">
        {scrollSnaps.map((_, i) => (
          <button key={i} className={cn('embla__dot', i === selectedIndex && 'embla__dot--selected')} onClick={() => scrollTo(i)} role="tab" aria-selected={i === selectedIndex} aria-label={`이미지 ${i + 1}`} type="button" />
        ))}
      </div>
    </div>
  );
}

import { useState } from 'react';

/* 간이 예약 폼 - 인라인 버전 */
function BookingFormInline({ room, nights }: { room: RoomSpec; nights: number }) {
  const { checkIn, checkOut, adults, children, infants, bbq, setBbq, guestName, guestPhone, setGuestName, setGuestPhone } = useBookingStore();
  const [submitted, setSubmitted] = useState(false);

  const baseTotal = room.price.base * nights;
  const extraPersons = Math.max(0, adults + children - 4);
  const extraTotal = extraPersons * 15000 * nights;
  const subtotal = baseTotal + extraTotal;
  const bbqTotal = bbq ? 30000 : 0;

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto text-center space-y-6">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-sea/10 flex items-center justify-center">
          <Check className="w-8 h-8 text-sea" />
        </div>
        <h3 className="font-display font-medium text-2xl text-ink">문의 요약이 생성되었습니다</h3>
        <Button variant="secondary" onClick={() => setSubmitted(false)} className="w-full max-w-xs">새로운 문의 작성</Button>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-[1fr_380px] gap-8">
      <div className="space-y-6">
        <div className="border border-basalt/20 rounded-[4px] p-6 bg-paper">
          <h4 className="font-display font-medium text-lg text-ink mb-4">숙박 기간</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">체크인</label>
              <input type="text" readOnly value={checkIn ? formatDateShort(checkIn) : '선택 필요'} className="input" />
            </div>
            <div>
              <label className="label">체크아웃</label>
              <input type="text" readOnly value={checkOut ? formatDateShort(checkOut) : '선택 필요'} className="input" />
            </div>
          </div>
        </div>

        <div className="border border-basalt/20 rounded-[4px] p-6 bg-paper">
          <h4 className="font-display font-medium text-lg text-ink mb-4">인원 구성</h4>
          <div className="grid grid-cols-3 gap-4">
            <InlineStepper label="성인" value={adults} min={1} max={8} onChange={(v) => useBookingStore.getState().setAdults(v)} />
            <InlineStepper label="아동" value={children} min={0} max={8} onChange={(v) => useBookingStore.getState().setChildren(v)} unit="24개월 이상" />
            <InlineStepper label="유아" value={infants} min={0} max={8} onChange={(v) => useBookingStore.getState().setInfants(v)} unit="24개월 미만" />
          </div>
        </div>

        <label className="flex items-center gap-3 cursor-pointer p-4 border border-basalt/20 rounded-[4px] bg-paper">
          <input type="checkbox" checked={bbq} onChange={(e) => setBbq(e.target.checked)} className="w-5 h-5 rounded-[2px] border-basalt/30 text-sea focus:ring-sea focus:ring-2" />
          <div>
            <div className="font-medium text-ink">개별 바비큐 이용</div>
            <div className="text-sm text-basalt/60">테이블당 30,000원 (현장 결제, 사전 예약 필수)</div>
          </div>
        </label>
      </div>

      <div className="lg:sticky lg:top-24 space-y-6">
        <div className="border border-basalt/20 rounded-[4px] p-6 bg-paper">
          <h4 className="font-display font-medium text-lg text-ink mb-4">예상 금액</h4>
          <div className="space-y-3 mb-4">
            <div className="flex justify-between text-basalt"><span>{room.price.base.toLocaleString()}원 × {nights}박</span><span className="font-medium">{baseTotal.toLocaleString()}원</span></div>
            {extraPersons > 0 && <div className="flex justify-between text-basalt"><span>추가 인원 {extraPersons}명 × 15,000원 × {nights}박</span><span className="font-medium">{extraTotal.toLocaleString()}원</span></div>}
            {bbq && <div className="flex justify-between text-basalt"><span>바비큐 (현장 결제 별도)</span><span className="font-medium">30,000원</span></div>}
          </div>
          <div className="pt-4 border-t border-basalt/20 flex justify-between">
            <span className="font-display font-medium text-xl text-ink">숙박료 + 추가인원</span>
            <span className="font-accent font-medium text-2xl text-sea tabular-nums">{subtotal.toLocaleString()}원</span>
          </div>
        </div>

        <div className="border border-basalt/20 rounded-[4px] p-6 bg-paper">
          <h4 className="font-display font-medium text-lg text-ink mb-4">신청자 정보</h4>
          <div className="space-y-4">
            <input type="text" placeholder="이름" value={guestName} onChange={(e) => setGuestName(e.target.value)} className="input" />
            <input type="tel" placeholder="010-1234-5678" value={guestPhone} onChange={(e) => setGuestPhone(e.target.value.replace(/\D/g, '').slice(0,11))} className="input" inputMode="tel" />
            <Button onClick={() => setSubmitted(true)} variant="primary" className="w-full py-3" disabled={!checkIn || !checkOut}>예약 문의 제출</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InlineStepper({ label, value, min, max, onChange, unit }: { label: string; value: number; min: number; max: number; onChange: (v: number) => void; unit?: string }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="label text-sm">{label}{unit && <span className="text-xs font-normal text-basalt/50 ml-1">({unit})</span>}</label>
      <div className="flex items-center border border-basalt/20 rounded-[2px] overflow-hidden bg-paper">
        <button type="button" onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} className="p-3 hover:bg-basalt/10 disabled:opacity-30"><svg className="w-5 h-5 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="5" y1="12" x2="19" y2="12" /></svg></button>
        <span className="w-12 text-center border-x border-basalt/20 font-accent font-medium text-lg">{value}</span>
        <button type="button" onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} className="p-3 hover:bg-basalt/10 disabled:opacity-30"><svg className="w-5 h-5 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg></button>
      </div>
    </div>
  );
}

