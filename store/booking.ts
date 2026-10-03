/**
 * 예약 위젯 전역 상태 (zustand)
 * 헤더/히어로 퀵바/모바일 하단바/예약 섹션이 공유
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { RoomSlug } from '@/data/content';

export interface BookingState {
  roomSlug: RoomSlug;
  checkIn: Date | null;
  checkOut: Date | null;
  adults: number;
  children: number; // 24개월 이상
  infants: number; // 24개월 미만
  bbq: boolean;
  guestName: string;
  guestPhone: string;
  // Actions
  setRoomSlug: (slug: RoomSlug) => void;
  setDates: (checkIn: Date | null, checkOut: Date | null) => void;
  setAdults: (count: number) => void;
  setChildren: (count: number) => void;
  setInfants: (count: number) => void;
  setBbq: (value: boolean) => void;
  setGuestName: (name: string) => void;
  setGuestPhone: (phone: string) => void;
  reset: () => void;
  // Hydration helpers
  _hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
}

const DEFAULT_STATE = {
  roomSlug: 'la-mer' as RoomSlug,
  checkIn: null,
  checkOut: null,
  adults: 2,
  children: 0,
  infants: 0,
  bbq: false,
  guestName: '',
  guestPhone: '',
  _hasHydrated: false,
};

function toDate(value: unknown): Date | null {
  if (!value) return null;
  const d = value instanceof Date ? value : new Date(value as string | number);
  return Number.isNaN(d.getTime()) ? null : d;
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      ...DEFAULT_STATE,
      setRoomSlug: (roomSlug) => set({ roomSlug }),
      setDates: (checkIn, checkOut) => set({ checkIn, checkOut }),
      setAdults: (adults) => set({ adults: Math.max(1, Math.min(8, adults)) }),
      setChildren: (children) => set({ children: Math.max(0, Math.min(8, children)) }),
      setInfants: (infants) => set({ infants: Math.max(0, Math.min(8, infants)) }),
      setBbq: (bbq) => set({ bbq }),
      setGuestName: (guestName) => set({ guestName }),
      setGuestPhone: (guestPhone) => set({ guestPhone }),
      reset: () => set(DEFAULT_STATE),
      setHasHydrated: (_hasHydrated) => set({ _hasHydrated }),
    }),
    {
      name: 'pangpang-booking',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        roomSlug: state.roomSlug,
        checkIn: state.checkIn,
        checkOut: state.checkOut,
        adults: state.adults,
        children: state.children,
        infants: state.infants,
        bbq: state.bbq,
        guestName: state.guestName,
        guestPhone: state.guestPhone,
      }),
      // localStorage는 JSON이라 Date가 문자열로 저장됨 -> 복원 시점에 Date로 변환
      merge: (persisted, current) => {
        const saved = (persisted ?? {}) as Partial<BookingState>;
        return {
          ...current,
          ...saved,
          checkIn: toDate(saved.checkIn),
          checkOut: toDate(saved.checkOut),
        };
      },
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

// 훅: hydration 완료까지 대기
export function useBookingStoreReady() {
  const ready = useBookingStore((s) => s._hasHydrated);
  return ready;
}