/**
 * 날짜/시간 포맷 유틸
 * date-fns ko locale 사용
 */

import { format, formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

export function formatDate(date: Date, pattern: string = 'yyyy년 M월 d일 (E)'): string {
  return format(date, pattern, { locale: ko });
}

export function formatDateShort(date: Date): string {
  return format(date, 'M/d (E)', { locale: ko });
}

export function formatMonthYear(date: Date): string {
  return format(date, 'yyyy년 M월', { locale: ko });
}

export function formatTime(date: Date): string {
  return format(date, 'HH:mm', { locale: ko });
}

export function formatRelativeTime(date: Date): string {
  return formatDistanceToNow(date, { addSuffix: true, locale: ko });
}

export function getDayPickerLocale() {
  return ko;
}