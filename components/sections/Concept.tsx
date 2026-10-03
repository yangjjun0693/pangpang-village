'use client';

import { CONCEPT_IMAGES } from '@/data/images';
import { CONCEPT_COPY } from '@/data/content';
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/motion';
import { SplitWords, ImageReveal, ParallaxImage } from '@/components/motion/extras';

export function Concept() {
  return (
    <section id="concept" className="section bg-paper" aria-labelledby="concept-title">
      <div className="container">
        <FadeUp className="letter-wide text-sea mb-8">About</FadeUp>
        <h2 id="concept-title" className="font-display font-medium text-4xl md:text-6xl lg:text-7xl text-ink leading-[1.18] tracking-tight max-w-5xl">
          <SplitWords text={CONCEPT_COPY.quote} />
        </h2>

        <div className="grid lg:grid-cols-12 gap-14 lg:gap-10 mt-16 md:mt-24 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <FadeUp delay={0.1}>
              <p className="text-basalt leading-relaxed text-lg max-w-[30em] mb-14">{CONCEPT_COPY.description}</p>
            </FadeUp>
            <StaggerContainer stagger={0.12} className="grid grid-cols-2 gap-x-6 gap-y-10">
              {CONCEPT_COPY.highlights.map((item) => (
                <StaggerItem key={item.label}>
                  <div className="font-accent font-medium text-4xl md:text-5xl text-ink leading-none tabular-nums">{item.value}</div>
                  <div className="mt-3 text-sm tracking-[0.15em] text-basalt/70">{item.label}</div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          <div className="lg:col-span-7 grid grid-cols-12 gap-4 md:gap-6">
            <ImageReveal className="col-span-8">
              <ParallaxImage image={CONCEPT_IMAGES[0]} className="aspect-[3/4] w-full" />
            </ImageReveal>
            <ImageReveal className="col-span-4 mt-24 md:mt-40" delay={0.2}>
              <ParallaxImage image={CONCEPT_IMAGES[1]} className="aspect-[3/5] w-full" intensity={14} />
            </ImageReveal>
          </div>
        </div>
      </div>
    </section>
  );
}