'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';
import { NOTICE_ITEMS, USAGE_GUIDE } from '@/data/content';
import { FadeUp, LineReveal } from '@/components/motion';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown, Link as LinkIcon, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export function Notice() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="notice" className="section bg-paper-deep" aria-labelledby="notice-title">
      <div className="container">
        <div className="mb-12 md:mb-16 max-w-xl">
          <h2 id="notice-title" className="sr-only">이용안내</h2>
<LineReveal as="p" className="letter-wide text-sea mb-2">Notice</LineReveal>
          <LineReveal as="h3" duration={0.9} className="font-display font-medium text-3xl md:text-5xl lg:text-6xl text-ink leading-[1.2]">편안한 머무름을 위한 <br />약속</LineReveal>
        </div>

        <FadeUp delay={0.1} duration={0.8} y={16}>
          <div className="border border-basalt/20 rounded-[4px] overflow-hidden bg-paper mb-12">
            <AccordionPrimitive.Root type="multiple" value={openIndex !== null ? [String(openIndex)] : []} onValueChange={(v) => setOpenIndex(v[0] ? parseInt(v[0], 10) : null)}>
              <div className="divide-y divide-basalt/10">
                {NOTICE_ITEMS.map((item, index) => (
                  <AccordionPrimitive.Item key={index} value={String(index)} className="overflow-hidden">
                    <AccordionPrimitive.Header>
                      <AccordionPrimitive.Trigger className="flex items-center justify-between w-full px-6 py-5 text-left text-base font-medium text-ink hover:text-sea transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sea focus-visible:ring-offset-2 focus-visible:ring-offset-paper">
                        <span className="pr-4">{item}</span>
                        <ChevronDown className="w-5 h-5 text-basalt/60 flex-shrink-0 transition-transform duration-300 ease-out data-[state=open]:rotate-180" aria-hidden="true" />
                      </AccordionPrimitive.Trigger>
                    </AccordionPrimitive.Header>
                    <AccordionPrimitive.Content className="overflow-hidden text-basalt leading-relaxed">
                      <div className="px-6 pb-6 pt-2 text-sm">
                        이 항목에 대한 상세 내용은 이용안내 전문 페이지에서 확인하실 수 있습니다.
                      </div>
                    </AccordionPrimitive.Content>
                  </AccordionPrimitive.Item>
                ))}
              </div>
            </AccordionPrimitive.Root>
          </div>

          <div className="text-center">
            <Link href="/notice" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium tracking-wide text-sea border border-sea rounded-[2px] hover:bg-sea/5 transition-all duration-200">
              이용안내 전문 보기
              <ExternalLink className="w-4 h-4 stroke-[1.5]" aria-hidden="true" />
              <span className="sr-only">새 페이지에서 열림</span>
            </Link>
            <p className="mt-4 text-sm text-basalt/60">체크인 {USAGE_GUIDE.checkIn} / 체크아웃 {USAGE_GUIDE.checkOut} / {USAGE_GUIDE.lateCheckIn}</p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
