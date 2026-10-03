/**
 * price.ts 단위 테스트
 * vitest 사용
 */

import { describe, it, expect } from 'vitest';
import {
  calculateNights,
  calculatePrice,
  formatPrice,
  formatPriceBreakdown,
  validateCapacity,
  generateBookingSummary,
} from '@/lib/price';

describe('calculateNights', () => {
  it('같은 날짜면 1박', () => {
    const checkIn = new Date('2025-07-01');
    const checkOut = new Date('2025-07-02');
    expect(calculateNights(checkIn, checkOut)).toBe(1);
  });

  it('연속 3박', () => {
    const checkIn = new Date('2025-07-01');
    const checkOut = new Date('2025-07-04');
    expect(calculateNights(checkIn, checkOut)).toBe(3);
  });

  it('체크아웃이 체크인보다 빠르면 최소 1박', () => {
    const checkIn = new Date('2025-07-05');
    const checkOut = new Date('2025-07-04');
    expect(calculateNights(checkIn, checkOut)).toBe(1);
  });
});

describe('calculatePrice', () => {
  const baseParams = {
    roomSlug: 'la-mer' as const,
    checkIn: new Date('2025-07-01'),
    checkOut: new Date('2025-07-03'), // 2박
    adults: 2,
    children: 0,
    infants: 0,
    bbq: false,
  };

  it('기준 인원 내면 추가 요금 없음', () => {
    const result = calculatePrice(baseParams);
    expect(result.nights).toBe(2);
    expect(result.basePrice).toBe(339000);
    expect(result.accommodationTotal).toBe(678000);
    expect(result.extraPersons).toBe(0);
    expect(result.extraPersonTotal).toBe(0);
    expect(result.subtotal).toBe(678000);
  });

  it('성인 2명 추가 시 추가 요금 발생', () => {
    const params = { ...baseParams, adults: 6 }; // 기준 4명 + 2명 추가
    const result = calculatePrice(params);
    expect(result.extraPersons).toBe(2);
    expect(result.extraPersonPrice).toBe(15000);
    expect(result.extraPersonTotal).toBe(60000); // 2 * 15000 * 2박
    expect(result.subtotal).toBe(738000);
  });

  it('아동도 추가 인원에 포함', () => {
    const params = { ...baseParams, adults: 3, children: 2 }; // 5명, 기준 4명 -> 1명 추가
    const result = calculatePrice(params);
    expect(result.extraPersons).toBe(1);
    expect(result.extraPersonTotal).toBe(30000); // 1 * 15000 * 2박
  });

  it('유아는 추가 인원에 포함되지 않음', () => {
    const params = { ...baseParams, adults: 4, infants: 2 }; // 성인 4명 = 기준 인원, 유아 2명 무료
    const result = calculatePrice(params);
    expect(result.extraPersons).toBe(0);
  });

  it('바비큐 선택 시 별도 금액 표시', () => {
    const params = { ...baseParams, bbq: true };
    const result = calculatePrice(params);
    expect(result.bbq).toBe(true);
    expect(result.bbqPrice).toBe(30000);
    expect(result.totalWithBbq).toBe(result.subtotal + 30000);
  });

  it('피에르 객실도 같은 가격', () => {
    const params = { ...baseParams, roomSlug: 'pierre' as const };
    const result = calculatePrice(params);
    expect(result.basePrice).toBe(339000);
  });
});

describe('formatPrice', () => {
  it('천 단위 콤마와 원 표시', () => {
    expect(formatPrice(339000)).toBe('339,000원');
    expect(formatPrice(15000)).toBe('15,000원');
    expect(formatPrice(0)).toBe('0원');
  });
});

describe('formatPriceBreakdown', () => {
  it('기본 내역 문자열 배열 반환', () => {
    const breakdown = {
      nights: 2,
      basePrice: 339000,
      accommodationTotal: 678000,
      extraPersons: 1,
      extraPersonPrice: 15000,
      extraPersonTotal: 30000,
      bbq: false,
      bbqPrice: 0,
      subtotal: 708000,
      totalWithBbq: 708000,
    };
    const lines = formatPriceBreakdown(breakdown);
    expect(lines).toContain('339,000원 × 2박');
    expect(lines).toContain('추가 인원 1명 × 15,000원 × 2박');
  });

  it('바비큐 있을 때 현장 결제 별도 표시', () => {
    const breakdown = {
      nights: 1,
      basePrice: 339000,
      accommodationTotal: 339000,
      extraPersons: 0,
      extraPersonPrice: 15000,
      extraPersonTotal: 0,
      bbq: true,
      bbqPrice: 30000,
      subtotal: 339000,
      totalWithBbq: 369000,
    };
    const lines = formatPriceBreakdown(breakdown);
    expect(lines.some((l) => l.includes('바비큐') && l.includes('현장 결제 별도'))).toBe(true);
  });
});

describe('validateCapacity', () => {
  it('최대 8명 이하면 통과', () => {
    expect(validateCapacity({ adults: 4, children: 2, infants: 2 })).toEqual({ valid: true });
    expect(validateCapacity({ adults: 8, children: 0, infants: 0 })).toEqual({ valid: true });
  });

  it('최대 8명 초과면 실패', () => {
    const result = validateCapacity({ adults: 6, children: 3, infants: 0 });
    expect(result.valid).toBe(false);
    expect(result.message).toContain('최대 인원');
  });
});

describe('generateBookingSummary', () => {
  it('요약 텍스트에 핵심 정보 포함', () => {
    const params = {
      roomSlug: 'la-mer' as const,
      checkIn: new Date('2025-07-01'),
      checkOut: new Date('2025-07-03'),
      adults: 4,
      children: 1,
      infants: 1,
      bbq: true,
    };
    const breakdown = calculatePrice(params);
    const summary = generateBookingSummary(params, breakdown, '홍길동', '010-1234-5678');

    expect(summary).toContain('라메르');
    expect(summary).toContain('La Mer');
    expect(summary).toContain('2박');
    expect(summary).toContain('성인 4명');
    expect(summary).toContain('아동 1명');
    expect(summary).toContain('유아 1명');
    expect(summary).toContain('바비큐');
    expect(summary).toContain('현장 결제 별도');
    expect(summary).toContain('홍길동');
    expect(summary).toContain('010-1234-5678');
    expect(summary).toContain('안내용 예상 금액');
  });
});