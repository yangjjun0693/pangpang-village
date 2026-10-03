'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/cn';
import { formatPriceBreakdown } from '@/lib/price';
import { PriceBreakdown } from '@/lib/price';

interface PriceBreakdownProps {
  breakdown: PriceBreakdown;
  className?: string;
}

export function PriceBreakdownView({ breakdown, className }: PriceBreakdownProps) {
  const [displayLines, setDisplayLines] = useState<string[]>([]);

  useEffect(() => {
    const lines = formatPriceBreakdown(breakdown);
    setDisplayLines(lines);
  }, [breakdown]);

  return (
    <div className={cn('border border-basalt/20 rounded-[4px] p-6 bg-paper', className)} role="region" aria-label="예상 금액 상세">
      <h3 className="font-display font-medium text-lg text-ink mb-4">예상 금액</h3>

      <div className="space-y-3 mb-4" role="list">
        {displayLines.map((line, index) => (
          <div key={index} className="flex items-baseline justify-between gap-4 text-basalt" role="listitem">
            <span>{line}</span>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-basalt/20">
        <div className="flex items-baseline justify-between gap-4 mb-2">
          <span className="font-display font-medium text-xl text-ink">숙박료 + 추가인원</span>
          <span className="font-accent font-medium text-2xl text-sea tabular-nums">
            {breakdown.subtotal.toLocaleString()}원
          </span>
        </div>

        {breakdown.bbq && (
          <div className="flex items-baseline justify-between gap-4 text-basalt">
            <span>바비큐 (현장 결제 별도)</span>
            <span className="font-medium tabular-nums">{breakdown.bbqPrice.toLocaleString()}원</span>
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-basalt/20 flex items-baseline justify-between gap-4">
          <span className="font-display font-medium text-xl text-ink">참고 합계</span>
          <span className="font-accent font-medium text-2xl text-ink tabular-nums">
            {breakdown.totalWithBbq.toLocaleString()}원
          </span>
        </div>
      </div>

      <p className="mt-4 text-xs text-basalt/60 leading-relaxed">
        ※ 표시 금액은 안내용 예상 금액이며, 일자와 시점에 따라 달라질 수 있으니 최종 금액은 펜션에서 확인 후 확정됩니다.
      </p>
    </div>
  );
}
