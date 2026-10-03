'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/cn';
import { DayPicker, DateRange } from 'react-day-picker';
import { format, addMonths, startOfMonth } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarProps {
  selected: { from: Date | null; to: Date | null } | undefined;
  onSelect: (range: DateRange | undefined) => void;
  disabledDays?: Date[];
  className?: string;
}

export function Calendar({ selected, onSelect, disabledDays, className }: CalendarProps) {
  const [displayMonth, setDisplayMonth] = useState(() => startOfMonth(new Date()));
  const isMobile = useMediaQuery('(max-width: 767px)');
  const monthCount = isMobile ? 1 : 2;

  const prevMonth = () => setDisplayMonth((m) => addMonths(m, -1));
  const nextMonth = () => setDisplayMonth((m) => addMonths(m, 1));

  const isDayDisabled = (day: Date) => {
    if (day < startOfMonth(new Date())) return true;
    if (disabledDays?.some((d) => format(d, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'))) return true;
    return false;
  };

const dayPickerSelected = selected ? { from: selected.from ?? undefined, to: selected.to ?? undefined } : undefined;

  return (
    <div className={cn('bg-paper border border-basalt/20 rounded-[4px] p-4 md:p-6', className)} role="region" aria-label="날짜 선택">
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="p-2 rounded-[2px] hover:bg-basalt/10 transition-colors" aria-label="이전 달">
          <ChevronLeft className="w-5 h-5 stroke-[1.5]" />
        </button>
        <span className="font-display font-medium text-lg text-ink">{format(displayMonth, 'yyyy년 M월', { locale: ko })}</span>
        <button onClick={nextMonth} className="p-2 rounded-[2px] hover:bg-basalt/10 transition-colors" aria-label="다음 달">
          <ChevronRight className="w-5 h-5 stroke-[1.5]" />
        </button>
      </div>

<DayPicker
        mode="range"
        selected={dayPickerSelected}
        onSelect={onSelect}
        fromMonth={displayMonth}
        numberOfMonths={monthCount}
        locale={ko}
        disabled={isDayDisabled}
        classNames={{
          root: 'rdp',
          month: 'rdp-month',
          caption: 'rdp-caption',
          caption_label: 'rdp-caption_label',
          nav: 'rdp-nav',
          nav_button: 'rdp-nav_button',
          table: 'rdp-table',
          head: 'rdp-head',
          head_row: 'rdp-head_row',
          head_cell: 'rdp-head_cell',
          tbody: 'rdp-body',
          row: 'rdp-row',
          cell: 'rdp-cell',
          day: 'rdp-day',
          day_button: 'rdp-day_button',
          day_range_start: 'rdp-day_range_start',
          day_range_end: 'rdp-day_range_end',
          day_range_middle: 'rdp-day_range_middle',
          day_selected: 'rdp-day_selected',
          day_disabled: 'rdp-day_disabled',
          day_today: 'rdp-day_today',
          day_outside: 'rdp-day_outside',
        }}
      />
    </div>
  );
}

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);
  return matches;
}
