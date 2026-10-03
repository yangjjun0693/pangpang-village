'use client';

import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { cn } from '@/lib/cn';
import { SITE } from '@/config/site';
import { ROOM_SPECS, ROOMS, type RoomSlug } from '@/data/content';
import { Calendar } from './Calendar';
import { Stepper } from './Stepper';
import { PriceBreakdownView } from './PriceBreakdown';
import { calculatePrice, validateCapacity, generateBookingSummary } from '@/lib/price';
import { BookingParams, PriceBreakdown } from '@/lib/price';
import { Button, Input } from '@/components/ui';
import { Badge } from '@/components/ui';
import { FadeUp, LineReveal } from '@/components/motion';
import { useBookingStore } from '@/store/booking';
import { Check, AlertCircle, Info, Copy, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui';

const bookingSchema = z.object({
  guestName: z.string().min(1, '이름을 입력해주세요'),
  guestPhone: z.string().min(1, '연락처를 입력해주세요').refine(
    (v) => /^010\d{8}$/.test(v.replace(/\D/g, '')),
    '올바른 휴대폰 번호를 입력해주세요 (010-XXXX-XXXX)'
  ),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const ROOM_LABELS: Record<RoomSlug, string> = {
  'la-mer': '라메르 (La Mer)',
  'pierre': '피에르 (Pierre)',
};

export function BookingForm({
  onSubmit,
  onSummaryCopy,
  onNavigateExternal,
}: {
  onSubmit: (data: BookingFormData & { summary: string }) => void;
  onSummaryCopy: (summary: string) => void;
  onNavigateExternal: (url: string) => void;
}) {
  const {
    roomSlug,
    checkIn,
    checkOut,
    adults,
    children,
    infants,
    bbq,
    guestName,
    guestPhone,
    setGuestName,
    setGuestPhone,
  } = useBookingStore();

  const [submitted, setSubmitted] = useState(false);
  const [summary, setSummary] = useState('');
  const [capacityError, setCapacityError] = useState<string | null>(null);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      guestName,
      guestPhone,
    },
    mode: 'onChange',
  });

  const watchedName = useWatch({ control: form.control, name: 'guestName' });
  const watchedPhone = useWatch({ control: form.control, name: 'guestPhone' });

  // 용량 검증
  const validation = validateCapacity({ adults, children, infants });
if (!validation.valid) {
    setCapacityError(validation.message ?? '인원 수를 확인해주세요');
  } else {
    setCapacityError(null);
  }

  // 요금 계산
  const bookingParams: BookingParams = {
    roomSlug,
    checkIn: checkIn!,
    checkOut: checkOut!,
    adults,
    children,
    infants,
    bbq,
  };

  const breakdown: PriceBreakdown = calculatePrice(bookingParams);

  // 폼 값 동기화
  const handleNameChange = (value: string) => {
    form.setValue('guestName', value, { shouldValidate: true });
    setGuestName(value);
  };

  const handlePhoneChange = (value: string) => {
    const formatted = value.replace(/\D/g, '').slice(0, 11);
    form.setValue('guestPhone', formatted, { shouldValidate: true });
    setGuestPhone(formatted);
  };

  const handleSubmit = (data: BookingFormData) => {
    if (!checkIn || !checkOut) return;

    const summaryText = generateBookingSummary(
      bookingParams,
      breakdown,
      data.guestName,
      data.guestPhone
    );

    setSummary(summaryText);
    setSubmitted(true);
    onSubmit({ ...data, summary: summaryText });
  };

  const nights = checkIn && checkOut
    ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <section id="booking" className="section bg-paper-deep" aria-labelledby="booking-title">
      <div className="container">
        <div className="mb-12 md:mb-16 max-w-xl">
          <h2 id="booking-title" className="sr-only">예약 문의</h2>
<LineReveal as="p" className="letter-wide text-sea mb-2">Booking</LineReveal>
          <LineReveal as="h3" duration={0.9} className="font-display font-medium text-3xl md:text-5xl lg:text-6xl text-ink leading-[1.2]">예약 문의하기</LineReveal>
        </div>

        {!submitted ? (
          <FadeUp delay={0.1} duration={0.8} y={16}>
            <div className="grid lg:grid-cols-[1fr_380px] gap-8 lg:gap-12">
              {/* 좌측: 캘린더 + 객실 선택 + 인원 */}
              <div className="space-y-6">
                {/* 날짜 선택 */}
                <div className="border border-basalt/20 rounded-[4px] p-6 bg-paper">
                  <h3 className="font-display font-medium text-lg text-ink mb-4">숙박 기간</h3>
                  <Calendar
                    selected={{ from: checkIn, to: checkOut }}
                    onSelect={(range) => {
                      useBookingStore.getState().setDates(range?.from || null, range?.to || null);
                    }}
                  />
                  {checkIn && checkOut && (
                    <p className="mt-3 text-sm text-basalt/60">
                      {format(checkIn, 'M월 d일 (E)', { locale: ko })} ~ {format(checkOut, 'M월 d일 (E)', { locale: ko })} · {nights}박
                    </p>
                  )}
                </div>

                {/* 객실 선택 */}
                <div className="border border-basalt/20 rounded-[4px] p-6 bg-paper">
                  <h3 className="font-display font-medium text-lg text-ink mb-4">객실 선택</h3>
                  <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="객실 선택">
                    {ROOMS.map((slug) => {
                      const room = ROOM_SPECS[slug];
                      const isSelected = roomSlug === slug;
                      return (
                        <button
                          key={slug}
                          type="button"
                          role="radio"
                          aria-checked={isSelected}
                          onClick={() => useBookingStore.getState().setRoomSlug(slug)}
                          className={cn(
                            'relative p-4 text-left rounded-[4px] border-2 transition-all duration-200',
                            isSelected
                              ? 'border-sea bg-sea/5'
                              : 'border-basalt/20 hover:border-sea/30'
                          )}
                        >
                          <div className="font-accent-italic text-sm text-sea/80 mb-1">{room.nameEn}</div>
                          <div className="font-display font-medium text-base text-ink">{room.nameKo}</div>
                          <div className="mt-2 text-sm text-basalt/60">{room.area} · 기준 {room.capacity.base} / 최대 {room.capacity.max}</div>
                          <div className="mt-1 font-accent font-medium text-base text-sea tabular-nums">
                            {room.price.base.toLocaleString()}원/박
                          </div>
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-sea flex items-center justify-center">
                              <Check className="w-3 h-3 text-paper" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 인원 선택 */}
                <div className="border border-basalt/20 rounded-[4px] p-6 bg-paper">
                  <h3 className="font-display font-medium text-lg text-ink mb-4">인원 구성</h3>
                  <div className="space-y-4">
                    <Stepper
                      value={adults}
                      onChange={(v) => useBookingStore.getState().setAdults(v)}
                      min={1}
                      max={8}
                      label="성인"
                      unit="필수 1명 이상"
                    />
                    <Stepper
                      value={children}
                      onChange={(v) => useBookingStore.getState().setChildren(v)}
                      min={0}
                      max={8}
                      label="아동"
                      unit="24개월 이상"
                    />
                    <Stepper
                      value={infants}
                      onChange={(v) => useBookingStore.getState().setInfants(v)}
                      min={0}
                      max={8}
                      label="유아"
                      unit="24개월 미만 (무료)"
                    />
                  </div>

                  <p className="mt-4 text-sm text-basalt/60">
                    기준 인원 {SITE.capacity.base}명 초과 시 1인당 {SITE.price.extraPerson.toLocaleString()}원/박 추가 (유아 제외)
                  </p>

                  {capacityError && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="mt-3 flex items-center gap-2 text-sm text-rose/80 bg-rose/5 border border-rose/20 rounded-[2px] p-3">
                          <AlertCircle className="w-4 h-4 flex-shrink-0" />
                          <span>{capacityError}</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top">{capacityError}</TooltipContent>
                    </Tooltip>
                  )}
                </div>

                {/* 바비큐 */}
                <div className="border border-basalt/20 rounded-[4px] p-6 bg-paper">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={bbq}
                      onChange={(e) => useBookingStore.getState().setBbq(e.target.checked)}
                      className="w-5 h-5 rounded-[2px] border-basalt/30 text-sea focus:ring-sea focus:ring-2"
                      role="switch"
                      aria-checked={bbq}
                    />
                    <div>
                      <div className="font-medium text-ink">개별 바비큐 이용</div>
                      <div className="text-sm text-basalt/60">테이블당 {SITE.price.bbq.toLocaleString()}원 (현장 결제, 사전 예약 필수)</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* 우측: 요금 상세 + 신청자 정보 */}
              <div className="lg:sticky lg:top-24 space-y-6">
                <PriceBreakdownView breakdown={breakdown} />

                <div className="border border-basalt/20 rounded-[4px] p-6 bg-paper">
                  <h3 className="font-display font-medium text-lg text-ink mb-4">신청자 정보</h3>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4" noValidate>
                    <Input
                      label="이름"
                      placeholder="홍길동"
                      value={watchedName}
                      onChange={(e) => handleNameChange(e.target.value)}
                      error={form.formState.errors.guestName?.message}
                      required
                      autoComplete="name"
                    />
                    <Input
                      label="연락처"
                      placeholder="010-1234-5678"
                      value={watchedPhone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      error={form.formState.errors.guestPhone?.message}
                      required
                      autoComplete="tel"
                      inputMode="tel"
                    />
                    <Button type="submit" variant="primary" className="w-full py-3 text-base" disabled={!checkIn || !checkOut || !validation.valid}>
                      예약 문의 제출
                    </Button>
                    <p className="text-xs text-basalt/50 text-center">
                      제출 시 예약 문의 요약이 생성되며, 복사하여 펜션에 문의하실 수 있습니다.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </FadeUp>
        ) : (
          <FadeUp delay={0.1} duration={0.8} y={16}>
            <SubmitSuccess
              summary={summary}
              onCopy={onSummaryCopy}
              onNewInquiry={() => setSubmitted(false)}
              externalLinks={[
                { label: '야놀자', url: SITE.yanoljaUrl },
                { label: '아고다', url: SITE.agodaUrl },
              ].filter((l) => l.url)}
              onNavigateExternal={onNavigateExternal}
            />
          </FadeUp>
        )}
      </div>
    </section>
  );
}

function SubmitSuccess({
  summary,
  onCopy,
  onNewInquiry,
  externalLinks,
  onNavigateExternal,
}: {
  summary: string;
  onCopy: (summary: string) => void;
  onNewInquiry: () => void;
  externalLinks: { label: string; url: string }[];
  onNavigateExternal: (url: string) => void;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    onCopy(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center py-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-sea/10 flex items-center justify-center">
          <Check className="w-8 h-8 text-sea" />
        </div>
        <h3 className="font-display font-medium text-2xl md:text-3xl text-ink mb-2">예약 문의 요약이 생성되었습니다</h3>
        <p className="text-basalt">아래 내용을 복사하여 펜션에 문의해주세요.</p>
      </div>

      <div className="border border-basalt/20 rounded-[4px] p-6 bg-paper relative">
        <button
          onClick={handleCopy}
          className="absolute top-4 right-4 p-2 rounded-[2px] bg-basalt/10 hover:bg-basalt/20 transition-colors"
          aria-label={copied ? '복사됨' : '요약 복사'}
        >
          <Copy className={cn('w-5 h-5 stroke-[1.5]', copied ? 'text-sea' : 'text-basalt')} />
        </button>
        <pre className="whitespace-pre-wrap text-sm text-basalt leading-relaxed font-body pr-12">{summary}</pre>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-4 right-40 px-3 py-1 bg-sea text-paper text-xs rounded-[2px]"
          >
            복사되었습니다
          </motion.div>
        )}
      </div>

      {externalLinks.length > 0 && (
        <div className="border border-basalt/20 rounded-[4px] p-6 bg-paper">
          <h4 className="font-display font-medium text-lg text-ink mb-3 flex items-center gap-2">
            <Info className="w-5 h-5 text-sea" />
            다른 예약처에서 예약하기
          </h4>
          <p className="text-sm text-basalt/60 mb-4">외부 예약 사이트로 이동합니다. 사이트별로 요금과 잔여 객실이 다를 수 있습니다.</p>
          <div className="flex flex-wrap gap-3">
            {externalLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateExternal(link.url);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-basalt bg-paper border border-basalt/20 rounded-[2px] hover:text-sea hover:border-sea/30 transition-all duration-200"
              >
                {link.label}
                <ExternalLink className="w-4 h-4 stroke-[1.5]" aria-hidden="true" />
                <span className="sr-only">새 창에서 열림</span>
              </a>
            ))}
          </div>
        </div>
      )}

      <Button variant="secondary" onClick={onNewInquiry} className="w-full">
        새로운 문의 작성
      </Button>
    </div>
  );
}

import { motion } from 'motion/react';
