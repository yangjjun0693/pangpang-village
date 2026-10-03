/**
 * 이미지 데이터 관리
 * 나중에 /public/images/ 에 직접 찍은 사진을 넣고 경로만 바꾸면 된다.
 * 외부 핫링크가 막히거나 실패할 수 있으니 onError 폴백을 사용한다.
 */

export interface ImageData {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  blurColor: string; // 지배색 (blur placeholder용 단색)
  priority?: boolean;
}

export const IMAGES: ImageData[] = [
  {
    id: 'exterior-1',
    src: 'https://pix8.agoda.net/hotelImages/119/1196206/1196206_17091320400056317938.jpg?ca=6&ce=1&s=1024x',
    alt: '팡팡 빌리지 외관 전경, 제주 해안도로 앞 3층 독채 건물',
    width: 1024,
    height: 768,
    blurColor: '#D7E3DF', // sea-mist
    priority: true,
  },
  {
    id: 'interior-1',
    src: 'https://i.imgur.com/53fjLuD.png',
    alt: '객실 내부 거실 공간, 복층 구조와 큰 창문',
    width: 1024,
    height: 768,
    blurColor: '#ECE6D9', // paper-deep
    priority: false,
  },
  {
    id: 'interior-2',
    src: 'https://pix8.agoda.net/hotelImages/119/1196206/1196206_16042808570041878550.jpg?ca=13&ce=1&s=1024x',
    alt: '객실 내부 침실 공간, 따뜻한 톤의 인테리어',
    width: 1024,
    height: 768,
    blurColor: '#D9CFC0', // 따뜻한 돌색
    priority: false,
  },
  {
    id: 'exterior-2',
    src: 'https://q-xx.bstatic.com/xdata/images/hotel/max1024x768/530201038.jpg?k=a373dbf92bb06b7f6e0705eaffd2d10dde0cf1961db95f6f1b2643f45f36e1d3&o=&s=1024x',
    alt: '팡팡 빌리지 외관 측면 뷰, 해안도로와 어우러진 건물',
    width: 1024,
    height: 768,
    blurColor: '#D7E3DF', // sea-mist
    priority: false,
  },
] as const;

export function getImage(id: string): ImageData | undefined {
  return IMAGES.find((img) => img.id === id);
}

export function getImagesByIds(ids: string[]): ImageData[] {
  return ids.map((id) => getImage(id)!).filter(Boolean);
}

// 히어로용 메인 이미지
export const HERO_IMAGE = getImage('exterior-1')!;

// 객실 공용 이미지 (라메르/피에르 구분 없이 사용)
export const ROOM_IMAGES = [getImage('interior-1')!, getImage('interior-2')!];

// 갤러리 이미지 (전체 4장)
export const GALLERY_IMAGES = IMAGES;

// 컨셉 섹션용 이미지 (비대칭 배치용 2장)
export const CONCEPT_IMAGES = [getImage('interior-1')!, getImage('exterior-2')!];

// 층별 투어용 이미지 (사진이 층별로 따로 없으므로 기존 이미지 배정)
// 실제 층과 매칭되지 않을 수 있으므로 색면+SVG 단면도 병행
export const FLOOR_TOUR_IMAGES = {
  '1F': getImage('exterior-1')!,
  '2F': getImage('interior-1')!,
  '3F': getImage('interior-2')!,
} as const;