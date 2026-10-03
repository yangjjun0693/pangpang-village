'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';
import { SITE } from '@/config/site';
import { FadeUp, LineReveal, ClipReveal } from '@/components/motion';
import { Button } from '@/components/ui';
import { Copy, MapPin, Navigation, Phone, ExternalLink } from 'lucide-react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui';

export function Location() {
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    await navigator.clipboard.writeText(SITE.address.full);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const mapLinks = [
    { label: '네이버 지도', href: `https://map.naver.com/p/search/${encodeURIComponent(SITE.address.full)}`, icon: <MapPin className="w-4 h-4" /> },
    { label: '카카오맵', href: `https://map.kakao.com/link/search/${encodeURIComponent(SITE.address.full)}`, icon: <Navigation className="w-4 h-4" /> },
    { label: '티맵', href: `https://tmap.tmap.co.kr/tmap/mobile/search?searchKeyword=${encodeURIComponent(SITE.address.full)}`, icon: <MapPin className="w-4 h-4" /> },
  ].filter((l) => l.href);

  return (
    <section id="location" className="section bg-paper" aria-labelledby="location-title">
      <div className="container">
        <div className="mb-12 md:mb-16 max-w-xl">
          <h2 id="location-title" className="sr-only">오시는 길</h2>
          <LineReveal as="p" className="letter-wide text-sea mb-2">Location</LineReveal>
          <LineReveal as="h3" duration={0.9} className="font-display font-medium text-3xl md:text-5xl lg:text-6xl text-ink leading-[1.2]">찾아오시는 <br />길</LineReveal>
        </div>

        <FadeUp delay={0.1} duration={0.8} y={16}>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* 좌측: 주소 + 복사 + 지도 링크 */}
            <div className="lg:pr-8">
              <div className="border border-basalt/20 rounded-[4px] p-6 md:p-8 bg-paper mb-8">
                <h3 className="font-display font-medium text-xl text-ink mb-4">주소</h3>
                <address className="not-italic text-basalt leading-relaxed mb-6 max-w-xs">
                  <p>{SITE.address.full}</p>
                </address>
                <div className="flex flex-wrap gap-3">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button onClick={copyAddress} variant="secondary" className="gap-2">
                          <Copy className="w-4 h-4 stroke-[1.5]" aria-hidden="true" />
                          {copied ? '복사됨' : '주소 복사'}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top" align="center">
                        {copied ? '클립보드에 복사되었습니다' : '주소를 클립보드에 복사합니다'}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              <div className="space-y-3" role="list" aria-label="지도 앱으로 열기">
                {mapLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 border border-basalt/20 rounded-[4px] bg-paper hover:border-sea/30 hover:text-sea transition-all duration-200 group"
                    role="listitem"
                  >
                    <span className="w-10 h-10 rounded-[2px] bg-sea/10 flex items-center justify-center text-sea group-hover:bg-sea group-hover:text-paper transition-colors">
                      {link.icon}
                    </span>
                    <span className="font-medium text-ink">{link.label}에서 열기</span>
                    <ExternalLink className="w-4 h-4 text-basalt/40 group-hover:text-sea transition-colors ml-auto" aria-hidden="true" />
                    <span className="sr-only">새 창에서 열림</span>
                  </a>
                ))}
              </div>

              {SITE.phone && (
                <div className="mt-8 pt-6 border-t border-basalt/20">
                  <a href={`tel:${(SITE.phone as string).replace(/\D/g, '')}`} className="flex items-center gap-3 text-ink hover:text-sea transition-colors">
                    <Phone className="w-5 h-5 stroke-[1.5] text-sea" aria-hidden="true" />
                    <span>{SITE.phone}</span>
                  </a>
                </div>
              )}
            </div>

            {/* 우측: 추상 해안선 SVG + 주소 타이포 */}
            <div className="relative">
              <FadeUp delay={0.2} duration={0.8} y={16}>
                <LocationIllustration />
              </FadeUp>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function LocationIllustration() {
  const width = 400;
  const height = 320;
  const seaColor = '#D7E3DF'; // sea-mist
  const landColor = '#ECE6D9'; // paper-deep
  const brass = '#A8864F';
  const ink = '#1C2B2E';

  return (
    <div className="w-full max-w-md mx-auto lg:mx-0" role="img" aria-label="제주 귀덕리 해안선 일러스트, 팡팡 빌리지 위치 표시">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="sea-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={seaColor} />
            <stop offset="100%" stopColor="#C8D8CE" />
          </linearGradient>
          <linearGradient id="land-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={landColor} />
            <stop offset="100%" stopColor="#DFD8CB" />
          </linearGradient>
        </defs>

        {/* 바다 */}
        <rect x="0" y="0" width={width} height={height} fill="url(#sea-gradient)" />

        {/* 해안선 - 유기적인 곡선 */}
        <path
          d="M -50,180 Q 80,140 150,160 Q 220,180 280,150 Q 340,120 400,140 Q 460,160 500,180 V 370 H -50 Z"
          fill="url(#land-gradient)"
          stroke={brass}
          strokeWidth="1.5"
          opacity="0.9"
        />

        {/* 해안선 강조선 */}
        <path
          d="M -50,180 Q 80,140 150,160 Q 220,180 280,150 Q 340,120 400,140 Q 460,160 500,180"
          fill="none"
          stroke={brass}
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* 건물 위치 마커 */}
        <g transform="translate(220, 120)">
          {/* 건물 심볼 - 작은 집 모양 */}
          <path
            d="M -20,30 L -20,0 Q -20,-10 -10,-10 L 10,-10 Q 20,-10 20,0 L 20,30 Z"
            fill={ink}
            opacity="0.8"
          />
          <rect x="-12" y="8" width="8" height="22" fill={brass} opacity="0.6" rx="1" />
          <rect x="4" y="8" width="8" height="22" fill={brass} opacity="0.6" rx="1" />
          {/* 위치 핀 */}
          <circle cx="0" cy="-20" r="8" fill={ink} />
          <circle cx="0" cy="-20" r="4" fill={brass} />
        </g>

        {/* 위치 라벨 */}
        <text x="220" y="80" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="14" fill={ink} fontWeight="500" letterSpacing="0.18em">PANG PANG VILLAGE</text>
        <text x="220" y="100" textAnchor="middle" fontFamily="Noto Serif KR, serif" fontSize="11" fill={ink} opacity="0.7">제주 한림 귀덕7길 17</text>

        {/* 나침반 */}
        <g transform={`translate(${width - 50}, 50)`} opacity="0.5">
          <circle cx="0" cy="0" r="18" fill="none" stroke={brass} strokeWidth="1" />
          <path d="M 0,-14 L 0,-8 M 0,8 L 0,14 M -14,0 L -8,0 M 8,0 L 14,0" stroke={brass} strokeWidth="1" strokeLinecap="round" />
          <text x="0" y="-16" textAnchor="middle" fontFamily="Cormorant Garamond, serif" fontSize="9" fill={brass}>N</text>
        </g>

        {/* 파도 표시 */}
        <g stroke={ink} strokeWidth="0.5" opacity="0.15" fill="none">
          <path d="M 50,220 Q 100,210 150,220 Q 200,230 250,220 Q 300,210 350,220" />
          <path d="M 30,260 Q 80,250 130,260 Q 180,270 230,260 Q 280,250 330,260" />
          <path d="M 70,300 Q 120,290 170,300 Q 220,310 270,300 Q 320,290 370,300" />
        </g>
      </svg>

      {/* 범례 */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-basalt/60">
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-2 bg-gradient-to-r from-sea-mist to-#C8D8CE rounded" />
          <span>바다</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-2 bg-gradient-to-r from-paper-deep to-#DFD8CB rounded" />
          <span>육지</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-ink/80" />
          <span>펜션 위치</span>
        </div>
      </div>
    </div>
  );
}