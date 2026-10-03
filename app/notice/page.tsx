'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/cn';
import { SITE } from '@/config/site';
import { NOTICE_ITEMS, USAGE_GUIDE } from '@/data/content';
import { Header } from '@/components/layout';
import { Footer } from '@/components/layout';
import { MobileBottomBar } from '@/components/layout';
import { LenisProvider } from '@/components/providers';
import { FadeUp, LineReveal } from '@/components/motion';
import { Button } from '@/components/ui';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown, Link as LinkIcon, ExternalLink, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NoticePage() {
  return (
    <LenisProvider>
      <Header />
      <main id="main-content" className="min-h-screen">
        <section className="section bg-paper-deep" aria-labelledby="notice-title">
          <div className="container max-w-3xl">
            {/* 백 링크 */}
            <FadeUp delay={0.05} duration={0.6} y={12}>
              <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-basalt/60 hover:text-sea transition-colors mb-8">
                <ArrowLeft className="w-4 h-4 stroke-[1.5]" aria-hidden="true" />
                홈으로 돌아가기
              </Link>
            </FadeUp>

            {/* 헤더 */}
            <FadeUp delay={0.1} duration={0.8} y={16}>
              <h1 id="notice-title" className="font-display font-medium text-3xl md:text-5xl lg:text-6xl text-ink leading-[1.2] tracking-tight mb-4">
                이용안내 전문
              </h1>
              <p className="text-basalt leading-relaxed max-w-[34em]">
                예약 전 반드시 확인해주세요. 모든 이용객의 편안하고 안전한 머무름을 위한 규정입니다.
              </p>
            </FadeUp>

            {/* 기본 정보 요약 */}
            <FadeUp delay={0.2} duration={0.8} y={16} className="mt-10">
              <div className="border border-basalt/20 rounded-[4px] p-6 bg-paper mb-8">
                <h2 className="font-display font-medium text-lg text-ink mb-4">기본 정보</h2>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-basalt" role="list">
                  <div className="flex items-baseline gap-3" role="listitem">
                    <dt className="letter-wide text-basalt/60 w-24 flex-shrink-0">체크인</dt>
                    <dd className="font-medium text-ink">{USAGE_GUIDE.checkIn}</dd>
                  </div>
                  <div className="flex items-baseline gap-3" role="listitem">
                    <dt className="letter-wide text-basalt/60 w-24 flex-shrink-0">체크아웃</dt>
                    <dd className="font-medium text-ink">{USAGE_GUIDE.checkOut}</dd>
                  </div>
                  <div className="flex items-baseline gap-3" role="listitem">
                    <dt className="letter-wide text-basalt/60 w-24 flex-shrink-0">레이트 체크인</dt>
                    <dd className="font-medium text-ink">{USAGE_GUIDE.lateCheckIn}</dd>
                  </div>
                  <div className="flex items-baseline gap-3" role="listitem">
                    <dt className="letter-wide text-basalt/60 w-24 flex-shrink-0">주차</dt>
                    <dd>{USAGE_GUIDE.parking}</dd>
                  </div>
                  <div className="flex items-baseline gap-3" role="listitem">
                    <dt className="letter-wide text-basalt/60 w-24 flex-shrink-0">금연</dt>
                    <dd>{USAGE_GUIDE.smoking}</dd>
                  </div>
                  <div className="flex items-baseline gap-3" role="listitem">
                    <dt className="letter-wide text-basalt/60 w-24 flex-shrink-0">아동 입실</dt>
                    <dd>{USAGE_GUIDE.childrenAllowed ? '가능' : '불가'}</dd>
                  </div>
                  <div className="flex items-baseline gap-3 sm:col-span-2" role="listitem">
                    <dt className="letter-wide text-basalt/60 w-24 flex-shrink-0">1회용품</dt>
                    <dd className="text-sm">{USAGE_GUIDE.disposableItems}</dd>
                  </div>
                </dl>
              </div>
            </FadeUp>

            {/* 공지사항 아코디언 */}
            <FadeUp delay={0.3} duration={0.8} y={16}>
              <div className="border border-basalt/20 rounded-[4px] overflow-hidden bg-paper">
                <AccordionPrimitive.Root type="single" collapsible className="divide-y divide-basalt/10">
                  {NOTICE_ITEMS.map((item, index) => (
                    <AccordionPrimitive.Item key={index} value={String(index)} className="overflow-hidden">
                      <AccordionPrimitive.Header>
                        <AccordionPrimitive.Trigger className="flex items-start justify-between gap-4 w-full px-6 py-5 text-left text-base font-medium text-ink hover:text-sea transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sea focus-visible:ring-offset-2 focus-visible:ring-offset-paper">
                          <span className="flex-1 pr-4 leading-relaxed">{item}</span>
                          <ChevronDown className="w-5 h-5 text-basalt/60 flex-shrink-0 mt-0.5 transition-transform duration-300 ease-out data-[state=open]:rotate-180" aria-hidden="true" />
                        </AccordionPrimitive.Trigger>
                      </AccordionPrimitive.Header>
                      <AccordionPrimitive.Content className="overflow-hidden text-basalt leading-relaxed">
                        <div className="px-6 pb-6 pt-2 text-sm border-t border-basalt/10">
                          이 항목은 펜션 이용 시 반드시 준수해야 할 규정입니다. 위반 시 퇴실 조치 또는 환불 불가 사유가 될 수 있으니 유의해주시기 바랍니다.
                        </div>
                      </AccordionPrimitive.Content>
                    </AccordionPrimitive.Item>
                  ))}
                </AccordionPrimitive.Root>
              </div>
            </FadeUp>

            {/* 모두 펼치기/접기 버튼 */}
            <FadeUp delay={0.4} duration={0.8} y={16} className="mt-8">
              <AllToggleButton />
            </FadeUp>

            {/* 하단 안내 */}
            <FadeUp delay={0.5} duration={0.8} y={16} className="mt-12 pt-8 border-t border-basalt/20">
              <p className="text-sm text-basalt/60 leading-relaxed text-center mb-6">
                위 이용안내는 펜션 사정에 따라 변경될 수 있습니다. 예약 시점에 펜션 측에 다시 한 번 확인해주시기 바랍니다.
              </p>
              <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium tracking-wide text-sea border border-sea rounded-[2px] hover:bg-sea/5 transition-all duration-200">
                <ArrowLeft className="w-4 h-4 stroke-[1.5]" aria-hidden="true" />
                홈으로 돌아가기
              </Link>
            </FadeUp>
          </div>
        </section>
      </main>
      <Footer />
      <MobileBottomBar />
    </LenisProvider>
  );
}

function AllToggleButton() {
  const [allOpen, setAllOpen] = useState(false);
  const [triggers, setTriggers] = useState<Element[]>([]);

  useEffect(() => {
    const triggers = document.querySelectorAll('[data-radix-accordion-trigger]');
    setTriggers(Array.from(triggers));
  }, []);

  const toggleAll = () => {
    const newState = !allOpen;
    setAllOpen(newState);
    triggers.forEach((trigger) => {
      const isOpen = trigger.getAttribute('data-state') === 'open';
      if (isOpen !== newState) {
        (trigger as HTMLElement).click();
      }
    });
  };

  return (
    <div className="text-center">
      <Button variant="secondary" onClick={toggleAll} size="sm">
        {allOpen ? '모두 접기' : '모두 펼치기'}
        <ChevronDown className={cn('w-4 h-4 stroke-[1.5] transition-transform', allOpen && 'rotate-180')} aria-hidden="true" />
      </Button>
    </div>
  );
}