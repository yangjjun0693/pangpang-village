/**
 * 전화번호 유틸
 * 한국 휴대폰 번호 검증 및 포맷
 */

export function formatPhoneNumber(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (digits.length === 0) return '';
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
}

export function parsePhoneNumber(value: string): string {
  return value.replace(/\D/g, '');
}

export function isValidKoreanMobile(value: string): boolean {
  const digits = parsePhoneNumber(value);
  // 한국 휴대폰: 010-xxxx-xxxx (11자리)
  return /^010\d{8}$/.test(digits);
}

export function getTelLink(phone: string): string {
  const digits = parsePhoneNumber(phone);
  return `tel:${digits}`;
}

export function maskPhoneNumber(phone: string): string {
  const digits = parsePhoneNumber(phone);
  if (digits.length !== 11) return phone;
  return `${digits.slice(0, 3)}-****-${digits.slice(7)}`;
}