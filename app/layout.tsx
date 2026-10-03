import type { Metadata, Viewport } from 'next';
import { Noto_Serif_KR } from 'next/font/google';
import { Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { SITE } from '@/config/site';
import 'pretendard/dist/web/variable/PretendardVariable-VF.css';

/* 폰트 설정 - next/font로 최적화 */
const notoSerifKR = Noto_Serif_KR({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
  variable: '--font-display',
  fallback: ['system-ui', 'serif'],
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-accent',
  fallback: ['Georgia', 'serif'],
});

export const viewport: Viewport = {
  themeColor: '#F5F1E8',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | 제주 한림 독채 펜션`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: ['제주 펜션', '한림 펜션', '독채 펜션', '복층 펜션', '가족 펜션', '귀덕리', '라메르', '피에르'],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} | 제주 한림 독채 펜션`,
    description: SITE.description,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: SITE.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} | 제주 한림 독채 펜션`,
    description: SITE.description,
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  verification: {
    google: '',
  },
  category: 'travel',
};

function jsonLd() {
  const sameAs = [
    SITE.facebookUrl,
    SITE.yanoljaUrl,
    SITE.agodaUrl,
  ].filter(Boolean);

  const data = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: SITE.name,
    alternateName: SITE.nameEn,
    url: SITE.url,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'KR',
      addressRegion: SITE.address.sido,
      addressLocality: SITE.address.sigungu,
      streetAddress: SITE.address.road,
    },
    checkInTime: SITE.checkIn,
    checkOutTime: SITE.checkOut,
    priceRange: '₩339,000 - ₩500,000',
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: '개별 바비큐', value: true },
      { '@type': 'LocationFeatureSpecification', name: '빔프로젝터', value: true },
      { '@type': 'LocationFeatureSpecification', name: '스파/월풀', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'OTT (넷플릭스)', value: true },
      { '@type': 'LocationFeatureSpecification', name: '주차 가능', value: true },
      { '@type': 'LocationFeatureSpecification', name: '독채 객실', value: true },
      { '@type': 'LocationFeatureSpecification', name: '복층 구조', value: true },
      { '@type': 'LocationFeatureSpecification', name: '해수욕장 인근', value: true },
      { '@type': 'LocationFeatureSpecification', name: '키즈 용품 구비', value: true },
    ],
    ...(SITE.phone ? { telephone: SITE.phone } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fontVars = [notoSerifKR.variable, cormorant.variable].join(' ');

  return (
    <html lang="ko" className={fontVars}>
      <head>
        {jsonLd()}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${notoSerifKR.className} ${cormorant.className}`}>
        {children}
      </body>
    </html>
  );
}