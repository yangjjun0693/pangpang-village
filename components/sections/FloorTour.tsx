'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/cn';
import { FLOOR_TOUR_IMAGES } from '@/data/images';
import { ROOM_SPECS } from '@/data/content';
import { FadeUp, LineReveal, ClipReveal } from '@/components/motion';
import { Separator } from '@/components/ui';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const FLOOR_DATA = [
  {
    floor: '1F',
    label: '1층',
    facilities: ROOM_SPECS['la-mer'].floorFacilities['1F'],
    image: FLOOR_TOUR_IMAGES['1F'],
  },
  {
    floor: '2F',
    label: '2층',
    facilities: ROOM_SPECS['la-mer'].floorFacilities['2F'],
    image: FLOOR_TOUR_IMAGES['2F'],
  },
  {
    floor: '3F',
    label: '3층 (복층)',
    facilities: ROOM_SPECS['la-mer'].floorFacilities['3F'],
    image: FLOOR_TOUR_IMAGES['3F'],
  },
] as const;

/* 층별 투어 - 스크롤 고정(pin) 없이 단순 스택 */
export function FloorTour() {
  const reducedMotion = useReducedMotion();
  const [visibleFloors, setVisibleFloors] = useState<Set<number>>(new Set());

  useEffect(() => {
    const items = document.querySelectorAll('[data-floor-item]');
    if (reducedMotion || typeof IntersectionObserver === 'undefined') {
      setVisibleFloors(new Set(Array.from(items).map((_, i) => i)));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt((entry.target as HTMLElement).dataset.index || '0', 10);
            setVisibleFloors((prev) => new Set(Array.from(prev).concat(index)));
          }
        });
      },
      { threshold: 0.3, rootMargin: '0px 0px -100px 0px' }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <section
      id="floor-tour"
      className="section bg-paper"
      aria-labelledby="floor-tour-title"
    >
      <div className="container">
        <div className="mb-12 md:mb-16 max-w-xl">
          <h2 id="floor-tour-title" className="sr-only">층별 투어</h2>
          <LineReveal
            as="p"
            className="letter-wide text-sea mb-2"
          >
            Floor Tour
          </LineReveal>
          <LineReveal
            as="h3"
            duration={0.9}
            className="font-display font-medium text-3xl md:text-5xl lg:text-6xl text-ink leading-[1.2]"
          >
            세 개 층, <br />하나의 독채
          </LineReveal>
        </div>

        <div className="space-y-12" role="list" aria-label="층별 시설">
          {FLOOR_DATA.map((floor, index) => (
            <motion.article
              key={floor.floor}
              data-floor-item
              data-index={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: visibleFloors.has(index) ? 1 : 0, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="border border-basalt/20 rounded-[4px] overflow-hidden bg-paper"
              role="listitem"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={floor.image.src}
                  alt={`${floor.label}: ${floor.image.alt}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={floor.image.width}
                  height={floor.image.height}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                <div className="absolute bottom-6 left-6 flex items-baseline gap-2 text-paper">
                  <span className="font-accent font-medium text-3xl md:text-4xl">{floor.floor}</span>
                  <span className="font-display font-medium text-lg md:text-xl">{floor.label}</span>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-2" role="list">
                  {floor.facilities.map((facility) => (
                    <li key={facility} className="flex items-center gap-3 text-basalt">
                      <span className="w-1.5 h-1.5 rounded-full bg-sea/40 flex-shrink-0" aria-hidden="true" />
                      <span>{facility}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>

        {/* 단면도 */}
        <FadeUp delay={0.3} duration={0.8} y={16} className="mt-12">
          <BuildingCrossSection />
        </FadeUp>
      </div>
    </section>
  );
}

/* 건물 단면도 SVG - 얇은 선 일러스트 */
function BuildingCrossSection({ ref }: { ref?: React.RefObject<SVGSVGElement> }) {
  const width = 280;
  const height = 380;
  const floorHeight = height / 3;
  const wallThickness = 2;
  const brass = '#A8864F';
  const sea = '#2F5D62';

  return (
    <div className="w-full max-w-xs mx-auto lg:mx-0" role="img" aria-label="건물 단면도, 현재 층 하이라이트">
      <svg
        ref={ref}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          {/* 외벽 패턴 */}
          <pattern id="wall-pattern" patternUnits="userSpaceOnUse" width="8" height="8">
            <line x1="0" y1="8" x2="8" y2="0" stroke={brass} strokeWidth="0.5" opacity="0.3" />
          </pattern>
        </defs>

        {/* 외부 외곽선 */}
        <rect
          x={wallThickness / 2}
          y={wallThickness / 2}
          width={width - wallThickness}
          height={height - wallThickness}
          fill="none"
          stroke={brass}
          strokeWidth={wallThickness}
          className="building-outline"
        />

        {/* 층 구분선 */}
        <line
          x1={wallThickness / 2}
          y1={floorHeight}
          x2={width - wallThickness / 2}
          y2={floorHeight}
          stroke={brass}
          strokeWidth={1}
          strokeDasharray="4 4"
          className="floor-divider"
        />
        <line
          x1={wallThickness / 2}
          y1={floorHeight * 2}
          x2={width - wallThickness / 2}
          y2={floorHeight * 2}
          stroke={brass}
          strokeWidth={1}
          strokeDasharray="4 4"
          className="floor-divider"
        />

        {/* 1층 영역 */}
        <g className="floor-area">
          <rect
            className="floor-path"
            x={wallThickness}
            y={wallThickness}
            width={width - wallThickness * 2}
            height={floorHeight - wallThickness}
            fill="none"
            stroke={brass}
            strokeWidth={1}
            rx={0}
            data-floor="0"
          />
          {/* 1층 아이콘: 썬베드 */}
          <g transform={`translate(${width / 2}, ${floorHeight / 2 - 10})`} className="floor-icon">
            <rect x={-15} y={-5} width={30} height={8} rx={1} fill={brass} fillOpacity={0.3} stroke={brass} strokeWidth={0.5} />
            <rect x={-10} y={-12} width={20} height={4} rx={1} fill={brass} fillOpacity={0.5} />
          </g>
        </g>

        {/* 2층 영역 */}
        <g className="floor-area">
          <rect
            className="floor-path"
            x={wallThickness}
            y={floorHeight + wallThickness}
            width={width - wallThickness * 2}
            height={floorHeight - wallThickness}
            fill="none"
            stroke={brass}
            strokeWidth={1}
            data-floor="1"
          />
          {/* 2층 아이콘: 반신욕기 */}
          <g transform={`translate(${width / 2}, ${floorHeight * 1.5})`} className="floor-icon">
            <ellipse cx={0} cy={0} rx={18} ry={10} fill={brass} fillOpacity={0.3} stroke={brass} strokeWidth={0.5} />
            <ellipse cx={0} cy={-2} rx={14} ry={6} fill={brass} fillOpacity={0.5} />
          </g>
        </g>

        {/* 3층 영역 (복층 - 천장 경사) */}
        <g className="floor-area">
          <path
            className="floor-path"
            d={`M ${wallThickness} ${floorHeight * 2 + wallThickness} 
               L ${width - wallThickness} ${floorHeight * 2 + wallThickness}
               L ${width - wallThickness - 20} ${height - wallThickness}
               L ${wallThickness + 20} ${height - wallThickness} Z`}
            fill="none"
            stroke={brass}
            strokeWidth={1}
            data-floor="2"
          />
          {/* 3층 아이콘: 월풀 + 테라스 */}
          <g transform={`translate(${width / 2}, ${floorHeight * 2.5 - 10})`} className="floor-icon">
            <ellipse cx={-20} cy={0} rx={14} ry={8} fill={sea} fillOpacity={0.3} stroke={sea} strokeWidth={0.5} />
            <ellipse cx={-20} cy={-1} rx={10} ry={5} fill={sea} fillOpacity={0.5} />
            <rect x={10} y={-12} width={24} height={16} rx={1} fill={brass} fillOpacity={0.2} stroke={brass} strokeWidth={0.5} />
          </g>
        </g>

        {/* 지붕 */}
        <path
          d={`M ${wallThickness / 2} ${wallThickness / 2}
             L ${width / 2} ${wallThickness / 2 - 30}
             L ${width - wallThickness / 2} ${wallThickness / 2}`}
          fill="none"
          stroke={brass}
          strokeWidth={wallThickness}
          className="roof"
        />

        {/* 계단 표시 - 얇은 점선 */}
        <g stroke={brass} strokeWidth={0.5} strokeDasharray="2 3" opacity="0.5">
          <line x1={width - 30} y1={floorHeight - 10} x2={width - 30} y2={floorHeight + 10} />
          <line x1={width - 30} y1={floorHeight * 2 - 10} x2={width - 30} y2={floorHeight * 2 + 10} />
        </g>

        {/* 층 라벨 - 우측 */}
        <g fontFamily="Cormorant Garamond, serif" fontSize="11" fill={brass} textAnchor="end">
          <text x={width - 10} y={floorHeight / 2 + 4} className="floor-label" data-floor="0">1F</text>
          <text x={width - 10} y={floorHeight * 1.5 + 4} className="floor-label" data-floor="1">2F</text>
          <text x={width - 10} y={floorHeight * 2.5 + 4} className="floor-label" data-floor="2">3F</text>
        </g>
      </svg>

      {/* 범례 */}
      <div className="flex items-center justify-center gap-6 mt-4 text-xs text-basalt/60">
        <span className="flex items-center gap-1.5">
          <span className="w-6 h-1 bg-gradient-to-r from-brass to-brass/30" aria-hidden="true" />
          외벽
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-6 h-1 border-t border-dashed border-brass/50" aria-hidden="true" />
          층 경계
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-4 h-4 rounded-full border border-sea/50" aria-hidden="true" />
          물 시설
        </span>
      </div>
    </div>
  );
}