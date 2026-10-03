'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import { SITE } from '@/config/site';
import { Header } from '@/components/layout';
import { Footer } from '@/components/layout';
import { MobileBottomBar } from '@/components/layout';
import { LenisProvider } from '@/components/providers';
import { FadeUp, LineReveal } from '@/components/motion';
import { Button } from '@/components/ui';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <LenisProvider>
      <Header />
      <main id="main-content" className="min-h-screen flex items-center justify-center px-6">
        <div className="container max-w-md text-center py-20">
          <FadeUp delay={0.1} duration={0.8} y={20}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="mb-8"
            >
              <span className="font-accent font-medium text-8xl md:text-12xl text-basalt/10 tracking-tighter leading-none select-none">
                404
              </span>
            </motion.div>
          </FadeUp>

          <FadeUp delay={0.2} duration={0.8} y={16}>
            <h1 className="font-display font-medium text-3xl md:text-4xl text-ink mb-4">
              페이지를 찾을 수 없습니다
            </h1>
            <p className="text-basalt leading-relaxed mb-10 max-w-[30em] mx-auto">
              요청하신 페이지가 존재하지 않거나 이동되었습니다.
              홈페이지에서 다시 찾아보시거나, 아래 버튼으로 이동해주세요.
            </p>
          </FadeUp>

          <FadeUp delay={0.3} duration={0.8} y={16}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/" className="btn btn-primary">
                <Home className="w-4 h-4 stroke-[1.5]" aria-hidden="true" />
                홈으로 돌아가기
              </Link>
              <Link href="/rooms/la-mer" className="btn btn-secondary">
                <Search className="w-4 h-4 stroke-[1.5]" aria-hidden="true" />
                객실 둘러보기
              </Link>
            </div>
          </FadeUp>

          <FadeUp delay={0.4} duration={0.8} y={16} className="mt-12">
            <div className="flex items-center justify-center gap-6 text-sm text-basalt/50">
              <span className="flex items-center gap-1.5">
                <Search className="w-4 h-4 stroke-[1.5]" aria-hidden="true" />
                <Link href="/rooms/la-mer" className="hover:text-sea transition-colors">라메르</Link>
              </span>
              <span className="w-px h-4 bg-basalt/20" aria-hidden="true" />
              <span className="flex items-center gap-1.5">
                <Search className="w-4 h-4 stroke-[1.5]" aria-hidden="true" />
                <Link href="/rooms/pierre" className="hover:text-sea transition-colors">피에르</Link>
              </span>
              <span className="w-px h-4 bg-basalt/20" aria-hidden="true" />
              <span className="flex items-center gap-1.5">
                <Search className="w-4 h-4 stroke-[1.5]" aria-hidden="true" />
                <Link href="/notice" className="hover:text-sea transition-colors">이용안내</Link>
              </span>
            </div>
          </FadeUp>
        </div>
      </main>
      <Footer />
      <MobileBottomBar />
    </LenisProvider>
  );
}