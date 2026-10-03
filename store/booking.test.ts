import { describe, it, expect } from 'vitest';
import { useBookingStore } from './booking';

describe('booking store rehydration', () => {
  it('restores checkIn/checkOut as Date objects from localStorage', async () => {
    localStorage.setItem(
      'pangpang-booking',
      JSON.stringify({
        state: {
          roomSlug: 'la-mer',
          checkIn: '2025-07-01T00:00:00.000Z',
          checkOut: '2025-07-03T00:00:00.000Z',
          adults: 2, children: 0, infants: 0, bbq: false, guestName: '', guestPhone: '',
        },
        version: 0,
      })
    );
    await useBookingStore.persist.rehydrate();
    const { checkIn, checkOut } = useBookingStore.getState();
    expect(checkIn).toBeInstanceOf(Date);
    expect(checkOut).toBeInstanceOf(Date);
    expect(checkOut!.getTime() - checkIn!.getTime()).toBe(2 * 86400000);
  });

  it('falls back to null on invalid dates', async () => {
    localStorage.setItem(
      'pangpang-booking',
      JSON.stringify({ state: { checkIn: 'garbage', checkOut: null }, version: 0 })
    );
    await useBookingStore.persist.rehydrate();
    expect(useBookingStore.getState().checkIn).toBeNull();
    expect(useBookingStore.getState().checkOut).toBeNull();
  });
});