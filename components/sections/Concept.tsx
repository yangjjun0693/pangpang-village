'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/cn';
import { CONCEPT_IMAGES } from '@/data/images';
import { CONCEPT_COPY } from '@/data/content';
import { FadeUp, LineReveal, ClipReveal, StaggerContainer, StaggerItem } from '@/components/motion';
import { Separator } from '@/components/ui';

export function Concept() {
  return (
    <section id="concept" className="section bg-paper" aria-labelledby="concept-title">
      <div className="container">
        {/* 헤더 영역 - 큰 인용형 문장 */}
        <div className="mb-16 md:mb-24">
          <h2 id="concept-title" className="sr-only">소개</h2>
          <div className="max-w-2xl">
            <LineReveal
              as="blockquote"
              duration={1}
              stagger={0.1}
              className="font-display font-medium text-3xl md:text-5xl lg:text-6xl text-ink leading-[1.2] tracking-tight"
            >
              {CONCEPT_COPY.quote}
            </LineReveal>
          </div>
        </div>

        {/* 본문 - 비대칭 그리드: 좌측 텍스트, 우측 이미지 2장 겹침 배치 */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* 좌측: 설명 + 하이라이트 표 */}
          <div className="lg:pr-8">
            <FadeUp delay={0.2} duration={0.8} y={16}>
              <p className="text-basalt leading-relaxed mb-10 max-w-[32em]">
                {CONCEPT_COPY.description}
              </p>
            </FadeUp>

            {/* 핵심 사실 4개 - 에디토리얼 표 형태 */}
            <FadeUp delay={0.4} duration={0.8} y={16}>
              <div className="border-t border-basalt/20" role="list" aria-label="핵심 정보">
                {CONCEPT_COPY.highlights.map((item, index) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between py-5 border-b border-basalt/10"
                    role="listitem"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="letter-wide text-basalt/60">
                        0{index + 1}
                      </span>
                      <span className="font-medium text-ink">{item.label}</span>
                    </div>
                    <span className="font-accent font-medium text-2xl md:text-3xl text-sea tabular-nums">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* 우측: 비대칭 이미지 2장 겹침 */}
          <div className="relative lg:pl-8">
            <StaggerContainer stagger={0.15} delayChildren={0.3}>
              {/* 뒤쪽 이미지 - 약간 작게, 뒤로 밀림 */}
              <StaggerItem>
                <ClipReveal delay={0.1} duration={1}>
                  <div className="absolute top-8 md:top-12 right-0 md:right-4 w-full md:w-[85%] max-w-md aspect-[4/3] rounded-[4px] overflow-hidden shadow-[0_8px_32px_rgba(28,43,46,0.1)] z-10">
                    <img
                      src={CONCEPT_IMAGES[1].src}
                      alt={CONCEPT_IMAGES[1].alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      width={CONCEPT_IMAGES[1].width}
                      height={CONCEPT_IMAGES[1].height}
                    />
                  </div>
                </ClipReveal>
              </StaggerItem>

              {/* 앞쪽 이미지 - 더 크게, 앞으로 나옴 */}
              <StaggerItem>
                <ClipReveal delay={0} duration={1}>
                  <div className="relative w-full md:w-[90%] max-w-lg aspect-[3/4] rounded-[4px] overflow-hidden shadow-[0_12px_40px_rgba(28,43,46,0.12)] z-20">
                    <img
                      src={CONCEPT_IMAGES[0].src}
                      alt={CONCEPT_IMAGES[0].alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      width={CONCEPT_IMAGES[0].width}
                      height={CONCEPT_IMAGES[0].height}
                    />
                  </div>
                </ClipReveal>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}