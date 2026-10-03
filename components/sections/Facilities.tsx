'use client';

import { cn } from '@/lib/cn';
import { COMMON_AMENITIES, BBQ_INFO, SPA_INFO, KIDS_AMENITIES, KIDS_NOTE, NEARBY_BEACHES, NEARBY_ATTRACTIONS, SERVICE_LANGUAGE } from '@/data/content';
import { FadeUp, LineReveal } from '@/components/motion';
import { Separator } from '@/components/ui';
import { Calendar, Flame, Waves, Baby, Languages } from 'lucide-react';

export function Facilities() {
  return (
    <section id="facilities" className="section bg-paper" aria-labelledby="facilities-title">
      <div className="container">
        {/* 헤더 */}
        <div className="mb-12 md:mb-16 max-w-xl">
          <h2 id="facilities-title" className="sr-only">시설 & 서비스</h2>
          <LineReveal
            as="p"
            className="letter-wide text-sea mb-2"
          >
            Facilities & Services
          </LineReveal>
          <LineReveal
            as="h3"
            duration={0.9}
            className="font-display font-medium text-3xl md:text-5xl lg:text-6xl text-ink leading-[1.2]"
          >
            머무는 동안 <br />필요한 모든 것
          </LineReveal>
        </div>

        {/* 두 열 리스트: 구비시설 / 서비스 */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-16 md:mb-24">
          {/* 구비시설 */}
          <FadeUp delay={0.1} duration={0.8} y={16}>
            <FacilityColumn
              title="구비시설"
              icon={<Waves className="w-5 h-5 stroke-[1.5]" aria-hidden="true" />}
              items={COMMON_AMENITIES}
            />
          </FadeUp>

          {/* 서비스 */}
          <FadeUp delay={0.2} duration={0.8} y={16}>
            <FacilityColumn
              title="서비스"
              icon={<Languages className="w-5 h-5 stroke-[1.5]" aria-hidden="true" />}
              items={SERVICE_LANGUAGE.map((lang) => `${lang} 지원`)}
            />
          </FadeUp>
        </div>

        {/* 별도 블록: 바비큐 */}
        <FadeUp delay={0.3} duration={0.8} y={16}>
          <DetailBlock
            title="개별 바비큐"
            icon={<Flame className="w-5 h-5 stroke-[1.5]" aria-hidden="true" />}
            items={[
              `${BBQ_INFO.type}`,
              `${BBQ_INFO.method}`,
              `사전 예약 ${BBQ_INFO.reservationRequired ? '필수' : '불필요'}`,
              `테이블당 ${BBQ_INFO.price.toLocaleString()}원 (${BBQ_INFO.priceNote})`,
            ]}
            notes={BBQ_INFO.restrictions}
            accentColor="sea"
          />
        </FadeUp>

        {/* 별도 블록: 스파/월풀 */}
        <FadeUp delay={0.4} duration={0.8} y={16}>
          <DetailBlock
            title="스파/월풀"
            icon={<Waves className="w-5 h-5 stroke-[1.5]" aria-hidden="true" />}
            items={[SPA_INFO.location, SPA_INFO.note]}
            accentColor="sea"
          />
        </FadeUp>

        {/* 키즈 용품 */}
        <FadeUp delay={0.5} duration={0.8} y={16}>
          <DetailBlock
            title="키즈 용품"
            icon={<Baby className="w-5 h-5 stroke-[1.5]" aria-hidden="true" />}
            items={KIDS_AMENITIES}
            notes={[KIDS_NOTE]}
            accentColor="basalt"
          />
        </FadeUp>
      </div>
    </section>
  );
}

/* 두 열 리스트용 컬럼 컴포넌트 */
function FacilityColumn({
  title,
  icon,
  items,
}: {
  title: string;
  icon: React.ReactNode;
  items: readonly string[];
}) {
  return (
    <div className="border border-basalt/20 rounded-[4px] p-6 md:p-8 bg-paper">
      <div className="flex items-start gap-3 mb-6">
        <div className="flex-shrink-0 w-10 h-10 rounded-[2px] bg-sea/10 flex items-center justify-center text-sea">
          {icon}
        </div>
        <div>
          <h3 className="font-display font-medium text-xl text-ink">{title}</h3>
          <p className="text-sm text-basalt/60 mt-0.5">객실마다 동일하게 제공됩니다</p>
        </div>
      </div>

      <ul className="space-y-3" role="list">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-basalt leading-relaxed">
            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-sea/40 mt-2" aria-hidden="true" />
            <span className="text-base">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* 상세 블록 컴포넌트 (바비큐, 스파, 키즈) */
function DetailBlock({
  title,
  icon,
  items,
  notes,
  accentColor = 'sea',
}: {
  title: string;
  icon: React.ReactNode;
  items: readonly string[];
  notes?: readonly string[];
  accentColor?: 'sea' | 'basalt' | 'brass';
}) {
  const accentColors = {
    sea: 'bg-sea/10 text-sea border-sea/20',
    basalt: 'bg-basalt/10 text-basalt border-basalt/20',
    brass: 'bg-brass/10 text-brass border-brass/20',
  };

  const iconBg = accentColors[accentColor];
  const iconColor = accentColor;

  return (
    <div className="border border-basalt/20 rounded-[4px] p-6 md:p-8 bg-paper">
      <div className="flex items-start gap-4 mb-6">
        <div className={cn('flex-shrink-0 w-12 h-12 rounded-[2px] flex items-center justify-center', iconBg)}>
          <span className={cn('stroke-[1.5]', iconColor === 'sea' && 'text-sea', iconColor === 'basalt' && 'text-basalt', iconColor === 'brass' && 'text-brass')}>
            {icon}
          </span>
        </div>
        <div className="flex-1">
          <h3 className="font-display font-medium text-xl md:text-2xl text-ink">{title}</h3>
        </div>
      </div>

      <ul className="space-y-2 mb-6" role="list">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-basalt leading-relaxed">
            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2" style={{ backgroundColor: accentColor === 'sea' ? '#2F5D62' : accentColor === 'basalt' ? '#4A4D4B' : '#A8864F', opacity: 0.4 }} aria-hidden="true" />
            <span className="text-base">{item}</span>
          </li>
        ))}
      </ul>

      {notes && notes.length > 0 && (
        <div className="pt-4 border-t border-basalt/20">
          <p className="text-sm text-basalt/60 leading-relaxed">
            <strong className="text-basalt font-medium">유의사항: </strong>
            {notes.map((note, i) => (
              <span key={i}>{note}{i < notes.length - 1 ? ' / ' : ''}</span>
            ))}
          </p>
        </div>
      )}
    </div>
  );
}