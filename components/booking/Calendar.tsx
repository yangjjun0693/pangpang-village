'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/cn';
import { DayPicker, DateRange } from 'react-day-picker';
import { format, addMonths, startOfMonth, startOfDay } from 'date-fns';
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

  const thisMonth = startOfMonth(new Date());
  const canGoPrev = displayMonth > thisMonth;
  const prevMonth = () => canGoPrev && setDisplayMonth((m) => addMonths(m, -1));
  const nextMonth = () => setDisplayMonth((m) => addMonths(m, 1));

  const today = startOfDay(new Date());
  const isDayDisabled = (day: Date) => {
    if (day < today) return true;
    if (disabledDays?.some((d) => format(d, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'))) return true;
    return false;
  };

  const dayPickerSelected = selected ? { from: selected.from ?? undefined, to: selected.to ?? undefined } : undefined;

  const title =
    monthCount === 2
      ? `${format(displayMonth, 'yyyy년 M월', { locale: ko })} – ${format(addMonths(displayMonth, 1), 'M월', { locale: ko })}`
      : format(displayMonth, 'yyyy년 M월', { locale: ko });

  return (
    <div className={cn('w-full', className)} role="region" aria-label="날짜 선택">
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={prevMonth}
          disabled={!canGoPrev}
          className="p-2 rounded-full hover:bg-ink/5 transition-colors disabled:opacity-25 disabled:hover:bg-transparent"
          aria-label="이전 달"
        >
          <ChevronLeft className="w-5 h-5 stroke-[1.5]" />
        </button>
        <span className="font-display font-medium text-lg text-ink tabular-nums">{title}</span>
        <button type="button" onClick={nextMonth} className="p-2 rounded-full hover:bg-ink/5 transition-colors" aria-label="다음 달">
          <ChevronRight className="w-5 h-5 stroke-[1.5]" />
        </button>
      </div>

      <DayPicker
        mode="range"
        selected={dayPickerSelected}
        onSelect={onSelect}
        month={displayMonth}
        onMonthChange={setDisplayMonth}
        startMonth={thisMonth}
        hideNavigation
        numberOfMonths={monthCount}
        locale={ko}
        disabled={isDayDisabled}
        classNames={{
          root: 'w-full',
          months: 'flex flex-col md:flex-row justify-center gap-10 md:gap-14',
          month: 'w-full md:w-auto',
          month_caption: 'sr-only',
          caption_label: 'sr-only',
          month_grid: 'w-full border-collapse mx-auto',
          weekdays: '',
          weekday: 'h-10 w-11 text-center align-middle text-xs font-medium text-basalt/60 tracking-wider',
          weeks: '',
          week: '',
          day: 'h-11 w-11 p-0 text-center align-middle text-sm',
          day_button:
            'h-10 w-10 mx-auto flex items-center justify-center rounded-full text-sm font-medium text-ink transition-colors duration-300 hover:bg-sea-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sea disabled:hover:bg-transparent disabled:cursor-not-allowed',
          selected: '[&>button]:bg-sea [&>button]:text-paper [&>button:hover]:bg-sea',
          range_start: 'bg-gradient-to-r from-transparent from-50% to-sea-mist/70 to-50% [&>button]:bg-sea [&>button]:text-paper',
          range_end: 'bg-gradient-to-l from-transparent from-50% to-sea-mist/70 to-50% [&>button]:bg-sea [&>button]:text-paper',
          range_middle: '!bg-sea-mist/70 [&>button]:!bg-transparent [&>button]:!text-ink',
          today: '[&>button]:underline [&>button]:decoration-brass [&>button]:underline-offset-4 [&>button]:decoration-2',
          disabled: 'opacity-30',
          outside: 'opacity-0 pointer-events-none',
          hidden: 'invisible',
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