'use client';

import { LenisProvider } from '@/components/providers';
import { Header } from '@/components/layout';
import { Footer } from '@/components/layout';
import { MobileBottomBar } from '@/components/layout';
import { ClientOnly } from '@/components/ClientOnly';
import {
  Hero,
  Concept,
  Rooms,
  FloorTour,
  Facilities,
  Around,
  Gallery,
  Notice,
  Location,
} from '@/components/sections';
import { BookingForm } from '@/components/booking';

export default function HomePage() {
  return (
    <LenisProvider>
      <Header />
      <ClientOnly fallback={<div className="min-h-screen" />}>
        <main id="main-content" className="min-h-screen">
          <Hero />
          <Concept />
          <Rooms />
          <FloorTour />
          <Facilities />
          <Around />
          <Gallery />
          <Notice />
          <Location />
          <BookingForm
            onSubmit={() => {}}
            onSummaryCopy={() => {}}
            onNavigateExternal={(url) => window.open(url, '_blank', 'noopener,noreferrer')}
          />
        </main>
        <MobileBottomBar />
      </ClientOnly>
      <Footer />
    </LenisProvider>
  );
}