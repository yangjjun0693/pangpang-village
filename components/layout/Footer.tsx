import Link from 'next/link';
import { cn } from '@/lib/cn';
import { SITE } from '@/config/site';
import { ArrowUpRight } from 'lucide-react';

export function Footer() {
  const externalLinks = [
    { label: '야놀자', href: SITE.yanoljaUrl },
    { label: '아고다', href: SITE.agodaUrl },
    { label: '페이스북', href: SITE.facebookUrl },
  ].filter((l) => l.href);

  return (
    <footer className="bg-paper-deep border-t border-basalt/20" role="contentinfo">
      <div className="container px-6 md:px-10 lg:px-16 py-16 md:py-24">
        {/* 대형 워드마크 */}
        <div className="mb-12 md:mb-16">
          <span className="font-display font-medium text-3xl md:text-5xl lg:text-7xl text-ink/10 tracking-tight select-none">
            {SITE.name}
          </span>
          <p className="font-accent-italic text-sm text-basalt/60 tracking-[0.18em] uppercase mt-2">
            {SITE.nameEn}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* 기본 정보 */}
          <div>
            <h3 className="font-display font-medium text-lg md:text-xl text-ink mb-4">정보</h3>
            <address className="not-italic text-basalt leading-relaxed max-w-xs">
              <p className="mb-2">{SITE.address.full}</p>
              <p className="mb-4">체크인 {SITE.checkIn} ~ {SITE.checkInEnd} / 체크아웃 {SITE.checkOut}</p>
              {SITE.phone && (
                <p>
                  <a href={`tel:${(SITE.phone as string).replace(/\D/g, '')}`} className="hover:text-sea transition-colors">
                    {SITE.phone}
                  </a>
                </p>
              )}
            </address>
          </div>

          {/* 링크 */}
          <div>
            <h3 className="font-display font-medium text-lg md:text-xl text-ink mb-4">바로가기</h3>
            <nav aria-label="푸터 네비게이션">
              <ul className="space-y-2 text-basalt" role="list">
                <li>
                  <Link href="#concept" className="hover:text-sea transition-colors">소개</Link>
                </li>
                <li>
                  <Link href="#rooms" className="hover:text-sea transition-colors">객실</Link>
                </li>
                <li>
                  <Link href="#floor-tour" className="hover:text-sea transition-colors">층별 안내</Link>
                </li>
                <li>
                  <Link href="#around" className="hover:text-sea transition-colors">주변</Link>
                </li>
                <li>
                  <Link href="#notice" className="hover:text-sea transition-colors">이용안내</Link>
                </li>
                <li>
                  <Link href="#location" className="hover:text-sea transition-colors">오시는 길</Link>
                </li>
                <li>
                  <Link href="/notice" className="hover:text-sea transition-colors">이용안내 전문</Link>
                </li>
                <li>
                  <Link href="/rooms/la-mer" className="hover:text-sea transition-colors">라메르 상세</Link>
                </li>
                <li>
                  <Link href="/rooms/pierre" className="hover:text-sea transition-colors">피에르 상세</Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* 외부 예약 링크 */}
          <div>
            <h3 className="font-display font-medium text-lg md:text-xl text-ink mb-4">외부 예약</h3>
            <div className="flex flex-wrap gap-2" role="list" aria-label="외부 예약 사이트">
              {externalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-basalt bg-paper border border-basalt/20 rounded-[2px] hover:text-sea hover:border-sea/30 transition-all duration-200"
                >
                  {link.label}
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[1.25]" aria-hidden="true" />
                  <span className="sr-only">새 창에서 열림</span>
                </a>
              ))}
            </div>
            {SITE.aliases.length > 0 && (
              <p className="mt-4 text-xs text-basalt/50">
                {SITE.aliases.map((a) => `(구) ${a}`).join(', ')}
              </p>
            )}
          </div>
        </div>

        {/* 하단 카피라이트 */}
        <div className="mt-12 md:mt-16 pt-8 border-t border-basalt/20">
          <p className="text-sm text-basalt/60 text-center">{SITE.footer_copy}</p>
        </div>
      </div>
    </footer>
  );
}