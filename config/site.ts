/**
 * 사이트 설정 상수
 * 외부 링크가 바뀌면 이 파일만 고치면 된다.
 * 여기에 채우세요: PHONE, KAKAO_CHANNEL_URL, NAVER_BOOKING_URL, INSTAGRAM_URL
 */

export const SITE = {
  name: '팡팡 빌리지',
  nameEn: 'PANG PANG VILLAGE',
  description: '제주 한림 귀덕 해안도로에 위치한 3층 독채 가족펜션. 라메르(바다)와 피에르(돌) 두 개의 복층 독채 객실을 운영합니다.',
  url: 'https://pangpangvillage.com',
  address: {
    full: '제주특별자치도 제주시 한림읍 귀덕7길 17',
    sido: '제주특별자치도',
    sigungu: '제주시',
    eupmyeon: '한림읍',
    road: '귀덕7길 17',
  },
  checkIn: '15:00',
  checkOut: '11:00',
  checkInEnd: '22:00',
  price: {
    base: 339000,
    extraPerson: 15000,
    bbq: 30000,
  },
  capacity: {
    base: 4,
    max: 8,
  },
  // 연락처 - 값이 비어 있으면 해당 UI 자동 숨김
  phone: '',
  kakaoChannelUrl: '',
  naverBookingUrl: '',
  instagramUrl: '',
  // 외부 예약 링크 (값이 채워져 있음)
  yanoljaUrl: 'https://nol.yanolja.com/stay/domestic/3008086?verticalCategory=PRODUCT_CATEGORY_KOREA_ACCOMMODATION',
  agodaUrl: 'https://www.agoda.com/ko-kr/jeju-sorang-n-farms-village_2/hotel/jeju-island-kr.html',
  facebookUrl: 'https://www.facebook.com/farmsvillageVIP',
  // 별칭 (구 상호 등) - 값이 있을 때만 푸터에 표시
  aliases: [],
  footer_copy: '© 팡팡 빌리지',
} as const;

export type SiteConfig = typeof SITE;