'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/cn';
import { GALLERY_IMAGES } from '@/data/images';
import { FadeUp, LineReveal, ClipReveal } from '@/components/motion';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X, ChevronLeft, ChevronRight, Maximize } from 'lucide-react';

export function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!openIndex) return;
    if (e.key === 'Escape') setOpenIndex(null);
    if (e.key === 'ArrowLeft') setOpenIndex((i) => (i === 0 ? GALLERY_IMAGES.length - 1 : (i || 1) - 1));
    if (e.key === 'ArrowRight') setOpenIndex((i) => (i === GALLERY_IMAGES.length - 1 ? 0 : (i || 0) + 1));
  }, [openIndex]);

  useEffect(() => {
    if (openIndex !== null) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [openIndex, handleKeyDown]);

  return (
    <section id="gallery" className="section bg-paper" aria-labelledby="gallery-title">
      <div className="container">
        <div className="mb-12 md:mb-16 max-w-xl">
          <h2 id="gallery-title" className="sr-only">갤러리</h2>
          <LineReveal as="p" className="letter-wide text-sea mb-2">Gallery</LineReveal>
          <LineReveal as="h3" duration={0.9} className="font-display font-medium text-3xl md:text-5xl lg:text-6xl text-ink leading-[1.2]">공간의 <br />풍경</LineReveal>
        </div>

        <FadeUp delay={0.1} duration={0.8} y={16}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-4 lg:grid-rows-2 lg:gap-4" role="list" aria-label="갤러리 이미지">
            {GALLERY_IMAGES.map((image, index) => (
              <article
                key={image.id}
                className={cn(
                  'relative overflow-hidden rounded-[4px] bg-basalt/10 cursor-zoom-in group',
                  index === 0 && 'md:col-span-2 lg:col-span-2 lg:row-span-2',
                  index === 1 && 'md:col-span-1 lg:col-span-1',
                  index === 2 && 'md:col-span-1 lg:col-span-1',
                  index === 3 && 'md:col-span-2 lg:col-span-2'
                )}
                role="listitem"
              >
                <ClipReveal delay={index * 0.05} duration={0.9}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading={index < 2 ? 'eager' : 'lazy'}
                    width={image.width}
                    height={image.height}
                    onError={(e) => {
                      const fallbackSrc = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 768'%3E%3Crect fill='${image.blurColor.slice(1)}' width='1024' height='768'/%3E%3Ctext x='512' y='384' font-family='system-ui' font-size='24' fill='%23666' text-anchor='middle' dominant-baseline='middle'%3E이미지 로드 실패%3C/text%3E%3C/svg%3E`;
                      e.currentTarget.src = fallbackSrc;
                    }}
                  />
                </ClipReveal>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" aria-hidden="true">
                  <Maximize className="w-8 h-8 text-paper stroke-[1.5]" />
                </div>
                <button
                  onClick={() => setOpenIndex(index)}
                  className="absolute inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sea focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                  aria-label={`${image.alt} 크게 보기`}
                />
              </article>
            ))}
          </div>
        </FadeUp>

        <AnimatePresence>
          {openIndex !== null && (
            <Lightbox
              index={openIndex}
              onClose={() => setOpenIndex(null)}
              onPrev={() => setOpenIndex((i) => (i === 0 ? GALLERY_IMAGES.length - 1 : (i || 1) - 1))}
              onNext={() => setOpenIndex((i) => (i === GALLERY_IMAGES.length - 1 ? 0 : (i || 0) + 1))}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function Lightbox({ index, onClose, onPrev, onNext }: { index: number; onClose: () => void; onPrev: () => void; onNext: () => void }) {
  const image = GALLERY_IMAGES[index];
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  return (
    <DialogPrimitive.Root open={true} onOpenChange={onClose}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-ink/90 backdrop-blur-sm z-50 animate-in fade-in-0" />
        <DialogPrimitive.Content
          ref={dialogRef}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 max-w-none max-h-none animate-in zoom-in-95 fade-in-0"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-paper/90 backdrop-blur-sm text-ink hover:bg-paper transition-colors focus-visible:ring-2 focus-visible:ring-sea"
            aria-label="닫기"
          >
            <X className="w-6 h-6 stroke-[1.5]" />
          </button>

          <button
            onClick={onPrev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-paper/90 backdrop-blur-sm text-ink hover:bg-paper transition-colors focus-visible:ring-2 focus-visible:ring-sea lg:hidden"
            aria-label="이전 이미지"
          >
            <ChevronLeft className="w-6 h-6 stroke-[1.5]" />
          </button>
          <button
            onClick={onNext}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-paper/90 backdrop-blur-sm text-ink hover:bg-paper transition-colors focus-visible:ring-2 focus-visible:ring-sea lg:hidden"
            aria-label="다음 이미지"
          >
            <ChevronRight className="w-6 h-6 stroke-[1.5]" />
          </button>

          <div className="relative w-full max-w-5xl max-h-[90vh]">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-auto max-h-[80vh] object-contain rounded-[4px]"
              width={image.width}
              height={image.height}
            />
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 lg:hidden" role="navigation" aria-label="이미지 탐색">
            <button onClick={onPrev} className="p-2 rounded-full bg-paper/90 backdrop-blur-sm text-ink" aria-label="이전"><ChevronLeft className="w-5 h-5" /></button>
            <span className="flex items-center px-3 text-sm text-paper bg-ink/70 rounded-full">{index + 1} / {GALLERY_IMAGES.length}</span>
            <button onClick={onNext} className="p-2 rounded-full bg-paper/90 backdrop-blur-sm text-ink" aria-label="다음"><ChevronRight className="w-5 h-5" /></button>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}