/**
 * 사이트 전체 콘텐츠 데이터
 * 이 파일이 유일한 사실 출처다. 컴포넌트는 이것만 참조한다.
 * 지어내거나 바꾸지 마라.
 */

import type { SiteConfig } from '@/config/site';

export const ROOMS = ['la-mer', 'pierre'] as const;
export type RoomSlug = (typeof ROOMS)[number];

export interface RoomSpec {
  slug: RoomSlug;
  nameEn: string;
  nameKo: string;
  description: string;
  area: string; // '30평'
  type: string; // '거실+방, 독채형, 복층형'
  capacity: { base: number; max: number };
  price: { base: number; member: number };
  amenities: string[];
  hasSpa: boolean;
  hasPocketBall: boolean;
  floorFacilities: {
    '1F': string[];
    '2F': string[];
    '3F': string[];
  };
}

export const ROOM_SPECS: Record<RoomSlug, RoomSpec> = {
  'la-mer': {
    slug: 'la-mer',
    nameEn: 'La Mer',
    nameKo: '라메르',
    description: '제주의 바다를 닮은 공간. 3층에 월풀 스파와 포켓볼 다이가 있어 프라이빗한 휴식이 가능합니다.',
    area: '30평',
    type: '거실+방, 독채형, 복층형',
    capacity: { base: 4, max: 8 },
    price: { base: 339000, member: 339000 },
    amenities: [
      '개별바비큐',
      '빔프로젝터',
      '침대',
      '에어컨',
      'TV',
      '취사시설',
      '식탁',
      '냉장고',
      '전자레인지',
      '커피포트',
      '스파/월풀',
    ],
    hasSpa: true,
    hasPocketBall: true,
    floorFacilities: {
      '1F': ['스카이어닝 썬베드', '글라스파티오히터', '간이카페', '클래식자전거', '전동보드'],
      '2F': ['마사지기', '반신욕기', '고데기', '스팀다리미', '노트북'],
      '3F': ['오락기', '월풀자쿠지', '테라스', '포켓볼 다이'],
    },
  },
  pierre: {
    slug: 'pierre',
    nameEn: 'Pierre',
    nameKo: '피에르',
    description: '제주의 현무암 돌을 닮은 공간. 따뜻한 돌의 질감과 3층 테라스에서 바다를 조망합니다.',
    area: '30평',
    type: '거실+방, 독채형, 복층형',
    capacity: { base: 4, max: 8 },
    price: { base: 339000, member: 339000 },
    amenities: [
      '개별바비큐',
      '빔프로젝터',
      '침대',
      '에어컨',
      'TV',
      '취사시설',
      '식탁',
      '냉장고',
      '전자레인지',
      '커피포트',
      '스파/월풀',
    ],
    hasSpa: true,
    hasPocketBall: false,
    floorFacilities: {
      '1F': ['스카이어닝 썬베드', '글라스파티오히터', '간이카페', '클래식자전거', '전동보드'],
      '2F': ['마사지기', '반신욕기', '고데기', '스팀다리미', '노트북'],
      '3F': ['오락기', '월풀자쿠지', '테라스'],
    },
  },
};

export const COMMON_AMENITIES = [
  '개별바비큐',
  '빔프로젝터',
  '침대',
  '에어컨',
  'TV',
  '취사시설',
  '식탁',
  '냉장고',
  '전자레인지',
  '커피포트',
] as const;

export const BBQ_INFO = {
  type: '개별 바비큐',
  method: '셀프 이용',
  reservationRequired: true,
  price: 30000,
  priceNote: '테이블당, 현장 결제',
  restrictions: [
    '객실 내 직화 조리 금지',
    '개인 취사도구(그릴, 숯, 전기·전열기구) 반입 금지',
  ],
} as const;

export const SPA_INFO = {
  location: '해당 객실 VIP 객실(라메르, 피에르) 3층',
  note: '스파/월풀 시설은 3층에 위치합니다.',
} as const;

export const KIDS_AMENITIES = [
  '키즈 의자',
  '키즈 장난감',
  '유아 용품(보디워시, 치약)',
  '젖병 소독기',
  '젖병 세정제',
] as const;

export const KIDS_NOTE = '자세한 내용은 펜션에 문의 바랍니다. 아동 입실 가능.';

export const NEARBY_BEACHES = [
  { name: '협재 해수욕장', searchQuery: '협재 해수욕장' },
  { name: '곽지 해수욕장', searchQuery: '곽지 해수욕장' },
  { name: '금능 해수욕장', searchQuery: '금능 해수욕장' },
] as const;

export const NEARBY_ATTRACTIONS = [
  { name: '한림공원', searchQuery: '한림공원' },
  { name: '판포 포구', searchQuery: '판포 포구' },
  { name: '애월~한담 해안 도로', searchQuery: '애월 한담 해안 도로' },
] as const;

export const SERVICE_LANGUAGE = ['한국어'] as const;

export const NOTICE_ITEMS = [
  '상황에 따라 비품 사용이 불가능할 수도 있습니다.',
  '이 문제로 환불이 불가능 한 점 참고 바랍니다.',
  '예약 인원에서 인원이 추가되는 경우 펜션에 미리 연락을 주시기 바랍니다.',
  '기준 인원 초과 시 추가 인원에 대한 비용이 별도로 발생할 수 있습니다.',
  '최대 인원 초과 시 입실이 불가능할 수 있으며, 해당 사유로 환불받을 수 없습니다.',
  '반려동물 입실 가능 펜션 외에 반려동물 동반 시 입실이 거부될 수 있으며, 해당 사유로 환불받을 수 없습니다.',
  '숙박업소는 법적으로 청소년 혼숙이 금지되어 있습니다.',
  "미성년자의 예약 및 이용은 숙소 규정에 따라 결정되며 해당 사유로 환불받을 수 없습니다.",
  '다음 이용 고객을 위해 입실, 퇴실 시간을 준수해 주시기 바랍니다.',
  '객실 및 주변 시설 이용 시 시설물의 훼손, 분실의 책임은 투숙객에게 있으며, 손해배상의 책임을 질 수 있습니다.',
  '객실의 안전과 화재예방을 위해 객실 내에서 생선이나 고기 등을 굽는 직화 방식은 허용되지 않으며, 개인적으로 준비해 오는 취사도구(그릴, 숯, 전기/전열기구 등)은 반입이 금지되어 있습니다.',
  '객실 내에서의 흡연은 금지되어 있으며, 지정된 장소를 이용해 주시기 바랍니다.',
  '다른 이용객에게 피해를 줄 수 있는 무분별한 오락, 음주, 고성방가는 삼가주시기 바랍니다.',
] as const;

export const USAGE_GUIDE = {
  checkIn: '15:00 ~ 22:00',
  checkOut: '11:00',
  lateCheckIn: '22시 이후 입실 시 펜션에 사전 연락',
  parking: '차량 1대는 집 현관문 앞쪽, 2대 이상은 문의',
  smoking: '전 객실 금연(지정된 장소 이용)',
  disposableItems: '2024년 3월 29일부터 일부 숙소는 1회용품(칫솔, 면도기 등)을 무료로 제공하지 않을 수 있음 (자원의 절약과 재활용촉진에 관한 법률 일부개정에 따름)',
  childrenAllowed: true,
  petsAllowed: false, // 주어지지 않음, 언급하지 않음
} as const;

export const HERO_COPY = {
  main: '바다 곁에, 한 채.',
  sub: '귀덕의 해안도로, 세 개 층의 독채.',
} as const;

export const CONCEPT_COPY = {
  quote: '해안 도로 위, 3층 독채 가족펜션.',
  description: '제주 서쪽 귀덕리의 해안 도로를 따라 자리 잡았습니다. 협재, 곽지, 금능 해수욕장이 가깝고 한림공원, 판포 포구, 애월~한담 해안 도로가 인근에 있습니다.',
  highlights: [
    { label: '독채', value: '전체' },
    { label: '구조', value: '복층 (3층)' },
    { label: '면적', value: '30평' },
    { label: '인원', value: '기준 4 / 최대 8' },
  ],
} as const;

export const FOOTER_COPY = '© 팡팡 빌리지';

export const PRICE_DISCLAIMER = '표시 금액은 안내용 예상 금액이며, 일자와 시점에 따라 달라질 수 있으니 최종 금액은 펜션에서 확인 후 확정됩니다.';
export const MAX_CAPACITY_NOTE = '최대 인원 기준은 펜션에 확인 바랍니다.';
export const EXTERNAL_BOOKING_NOTICE = '외부 예약 사이트로 이동합니다. 사이트별로 요금과 잔여 객실이 다를 수 있습니다.';

export function getRoomSpec(slug: RoomSlug): RoomSpec {
  return ROOM_SPECS[slug];
}

export function getAllRoomSpecs(): RoomSpec[] {
  return ROOMS.map((slug) => ROOM_SPECS[slug]);
}