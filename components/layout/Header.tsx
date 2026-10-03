'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/cn';
import { SITE } from '@/config/site';
import { Button } from '@/components/ui';
import { Menu, X, ChevronDown } from 'lucide-react';

const NAV_ITEMS = [
  { href: '#concept', label: '소개' },
  { href: '#rooms', label: '객실' },
  { href: '#floor-tour', label: '층별 안내' },
  { href: '#around', label: '주변' },
  { href: '#notice', label: '이용안내' },
  { href: '#location', label: '오시는 길' },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleReserveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById('booking');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      target.focus();
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out',
        scrolled
          ? 'bg-paper/95 backdrop-blur-sm border-b border-basalt/20'
          : 'bg-transparent'
      )}
      style={{ height: 'var(--header-height)' }}
      role="banner"
    >
      <div className="container flex items-center justify-between h-full px-6 md:px-10 lg:px-16">
        {/* 로고 */}
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sea focus-visible:ring-offset-2 focus-visible:ring-offset-paper rounded-[2px]"
          aria-label={`${SITE.name} 홈으로`}
        >
          <span className="font-display font-medium text-lg md:text-xl text-ink tracking-tight">
            {SITE.name}
          </span>
          <span className="font-accent-italic text-xs md:text-sm text-basalt tracking-[0.18em] uppercase hidden sm:inline">
            {SITE.nameEn}
          </span>
        </Link>

        {/* 데스크톱 네비게이션 */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="메인 메뉴">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm font-medium text-basalt hover:text-sea transition-colors duration-200 rounded-[2px]"
            >
              {item.label}
            </Link>
          ))}
          <Button onClick={handleReserveClick} variant="primary" size="sm">
            예약 문의
          </Button>
        </nav>

        {/* 모바일 햄버거 버튼 */}
        <button
          className="lg:hidden p-2 -ml-2 -mr-2 text-ink"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="메뉴 열기"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <Menu className="w-6 h-6 stroke-[1.25]" aria-hidden="true" />
        </button>
      </div>

      {/* 모바일 풀스크린 메뉴 */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-paper flex flex-col lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="메뉴"
          >
            <div className="flex items-center justify-between p-6 border-b border-basalt/20">
              <Link
                href="/"
                className="flex items-center gap-2 font-display font-medium text-xl text-ink"
                onClick={() => setMobileMenuOpen(false)}
              >
                {SITE.name}
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-ink"
                aria-label="메뉴 닫기"
              >
                <X className="w-6 h-6 stroke-[1.25]" aria-hidden="true" />
              </button>
            </div>

            <nav className="flex-1 py-8 px-6 overflow-y-auto" aria-label="모바일 메뉴">
              <ul className="space-y-1" role="list">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-4 text-2xl font-display font-medium text-ink hover:text-sea transition-colors duration-300 border-b border-basalt/10"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Button
                    onClick={() => {
                      handleReserveClick({ preventDefault: () => {}, currentTarget: null } as any);
                      setMobileMenuOpen(false);
                    }}
                    variant="primary"
                    className="w-full mt-4 py-4 text-lg"
                  >
                    예약 문의
                  </Button>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}