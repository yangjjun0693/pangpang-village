/**
 * 요금 계산 순수 함수
 * 테스트 가능하게 분리함
 */

import { SITE } from '@/config/site';
import { ROOM_SPECS, type RoomSlug } from '@/data/content';

export interface BookingParams {
  roomSlug: RoomSlug;
  checkIn: Date;
  checkOut: Date;
  adults: number;
  children: number; // 24개월 이상
  infants: number; // 24개월 미만
  bbq: boolean;
}

export interface PriceBreakdown {
  nights: number;
  basePrice: number;
  accommodationTotal: number;
  extraPersons: number;
  extraPersonPrice: number;
  extraPersonTotal: number;
  bbq: boolean;
  bbqPrice: number;
  subtotal: number; // 숙박료 + 추가인원요금 (바비큐 제외, 현장결제 별도)
  totalWithBbq: number; // 참고용 합계
}

export function calculateNights(checkIn: Date, checkOut: Date): number {
  const diffTime = checkOut.getTime() - checkIn.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(1, diffDays);
}

export function calculatePrice(params: BookingParams): PriceBreakdown {
  const nights = calculateNights(params.checkIn, params.checkOut);
  const roomSpec = ROOM_SPECS[params.roomSlug];
  const basePrice = roomSpec.price.base;
  const accommodationTotal = basePrice * nights;

  // 기준 인원 초과 계산: 성인 + 아동 - 기준인원 (유아 제외)
  const totalGuests = params.adults + params.children;
  const extraPersons = Math.max(0, totalGuests - SITE.capacity.base);
  const extraPersonPrice = SITE.price.extraPerson;
  const extraPersonTotal = extraPersons * extraPersonPrice * nights;

  const bbqPrice = params.bbq ? SITE.price.bbq : 0;

  const subtotal = accommodationTotal + extraPersonTotal;
  const totalWithBbq = subtotal + bbqPrice;

  return {
    nights,
    basePrice,
    accommodationTotal,
    extraPersons,
    extraPersonPrice,
    extraPersonTotal,
    bbq: params.bbq,
    bbqPrice,
    subtotal,
    totalWithBbq,
  };
}

export function formatPrice(price: number): string {
  return price.toLocaleString('ko-KR') + '원';
}

export function formatPriceBreakdown(breakdown: PriceBreakdown): string[] {
  const lines: string[] = [];
  lines.push(`${formatPrice(breakdown.basePrice)} × ${breakdown.nights}박`);
  if (breakdown.extraPersons > 0) {
    lines.push(`추가 인원 ${breakdown.extraPersons}명 × ${formatPrice(breakdown.extraPersonPrice)} × ${breakdown.nights}박`);
  }
  if (breakdown.bbq) {
    lines.push(`바비큐 ${formatPrice(breakdown.bbqPrice)} (현장 결제 별도)`);
  }
  return lines;
}

export function validateCapacity(params: Pick<BookingParams, 'adults' | 'children' | 'infants'>): { valid: boolean; message?: string } {
  const total = params.adults + params.children + params.infants;
  if (total > SITE.capacity.max) {
    return {
      valid: false,
      message: `최대 인원(${SITE.capacity.max}명)을 초과합니다. ${MAX_CAPACITY_NOTE}`,
    };
  }
  return { valid: true };
}

export const MAX_CAPACITY_NOTE = '최대 인원 기준은 펜션에 확인 바랍니다.';

export function generateBookingSummary(params: BookingParams, breakdown: PriceBreakdown, guestName: string, guestPhone: string): string {
  const roomSpec = ROOM_SPECS[params.roomSlug];
  const checkInStr = params.checkIn.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' });
  const checkOutStr = params.checkOut.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' });

  const lines = [
    '[팡팡 빌리지 예약 문의 요약]',
    `객실: ${roomSpec.nameKo} (${roomSpec.nameEn})`,
    `기간: ${checkInStr} ~ ${checkOutStr} (${breakdown.nights}박)`,
    `인원: 성인 ${params.adults}명, 아동 ${params.children}명, 유아 ${params.infants}명`,
    `바비큐: ${params.bbq ? '이용 (현장 결제 별도)' : '미이용'}`,
    `예상 금액: ${formatPrice(breakdown.subtotal)} (숙박료 + 추가인원)`,
    params.bbq ? `바비큐 별도: ${formatPrice(breakdown.bbqPrice)} (현장 결제)` : '',
    `예약자: ${guestName}`,
    `연락처: ${guestPhone}`,
    '',
    '※ 위 금액은 안내용 예상 금액입니다. 최종 금액은 펜션에서 확인 후 확정됩니다.',
  ].filter(Boolean);

  return lines.join('\n');
}