'use client';

import { cn } from '@/lib/cn';
import { NEARBY_BEACHES, NEARBY_ATTRACTIONS } from '@/data/content';
import { FadeUp, LineReveal } from '@/components/motion';
import { MapPin, Waves, TreePine, Anchor } from 'lucide-react';

export function Around() {
  return (
    <section id="around" className="section bg-paper-deep" aria-labelledby="around-title">
      <div className="container">
        <div className="mb-12 md:mb-16 max-w-xl">
          <h2 id="around-title" className="sr-only">주변 환경</h2>
          <LineReveal as="p" className="letter-wide text-sea mb-2">Around</LineReveal>
          <LineReveal as="h3" duration={0.9} className="font-display font-medium text-3xl md:text-5xl lg:text-6xl text-ink leading-[1.2]">걸어서 닿는 <br />바다와 풍경</LineReveal>
        </div>

        <FadeUp delay={0.1} duration={0.8} y={16}>
          <PlaceGroup title="해수욕장" icon={<Waves className="w-5 h-5 stroke-[1.5]" aria-hidden="true" />} places={NEARBY_BEACHES} category="beach" />
        </FadeUp>

        <FadeUp delay={0.2} duration={0.8} y={16}>
          <PlaceGroup title="가볼 만한 곳" icon={<TreePine className="w-5 h-5 stroke-[1.5]" aria-hidden="true" />} places={NEARBY_ATTRACTIONS} category="attraction" />
        </FadeUp>
      </div>
    </section>
  );
}

function PlaceGroup({ title, icon, places, category }: { title: string; icon: React.ReactNode; places: readonly { name: string; searchQuery: string }[]; category: 'beach' | 'attraction'; }) {
  const naverSearchUrl = (query: string) => `https://map.naver.com/p/search/${encodeURIComponent(query)}`;

  return (
    <div className="border border-basalt/20 rounded-[4px] overflow-hidden bg-paper">
      <div className="px-6 md:px-8 py-5 border-b border-basalt/20 flex items-center gap-3">
        <div className="w-10 h-10 rounded-[2px] bg-sea/10 flex items-center justify-center text-sea">{icon}</div>
        <h3 className="font-display font-medium text-xl text-ink">{title}</h3>
      </div>
      <ul className="divide-y divide-basalt/10" role="list">
        {places.map((place) => (
          <li key={place.name} className="px-6 md:px-8 py-5">
            <a href={naverSearchUrl(place.searchQuery)} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-4 group">
              <div className="flex items-center gap-3 min-w-0">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-sea/40" aria-hidden="true" />
                <span className="font-medium text-ink group-hover:text-sea transition-colors">{place.name}</span>
              </div>
              <span className="flex-shrink-0 flex items-center gap-1 text-sm text-basalt/60 group-hover:text-sea transition-colors">네이버 지도에서 보기 <MapPin className="w-4 h-4 stroke-[1.5]" aria-hidden="true" /></span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}