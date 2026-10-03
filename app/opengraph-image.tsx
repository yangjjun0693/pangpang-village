import { ImageResponse } from 'next/og';
import { SITE } from '@/config/site';

export const runtime = 'edge';

export default async function() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F5F1E8',
          fontFamily: 'Noto Serif KR, serif',
          color: '#1C2B2E',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* 노이즈 텍스처 시뮬레이션 */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.03,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: '256px 256px',
            pointerEvents: 'none',
          }}
        />

        {/* 상단 장식 라인 */}
        <div
          style={{
            position: 'absolute',
            top: 80,
            left: '10%',
            right: '10%',
            height: 1,
            background: 'linear-gradient(90deg, transparent, #A8864F, transparent)',
          }}
        />

        {/* 메인 워드마크 */}
        <div style={{ textAlign: 'center', zIndex: 1 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 500,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            {SITE.name}
          </div>

          <div
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 20,
              fontStyle: 'italic',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#4A4D4B',
              marginBottom: 32,
            }}
          >
            {SITE.nameEn}
          </div>

          {/* 태그라인 */}
          <div
            style={{
              fontSize: 28,
              fontWeight: 300,
              lineHeight: 1.5,
              maxWidth: 800,
              color: '#2F5D62',
            }}
          >
            제주 한림 귀덕 해안도로, 3층 독채 가족펜션
          </div>
        </div>

        {/* 하단 정보 */}
        <div
          style={{
            position: 'absolute',
            bottom: 80,
            left: '10%',
            right: '10%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 16,
            color: '#4A4D4B',
            borderTop: '1px solid #A8864F33',
            paddingTop: 24,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic' }}>📍</span>
            <span>제주시 한림읍 귀덕7길 17</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic' }}>🏠</span>
            <span>독채 · 복층 · 기준 4 / 최대 8</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic' }}>💰</span>
            <span>339,000원~/박</span>
          </div>
        </div>

        {/* 하단 장식 라인 */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            left: '10%',
            right: '10%',
            height: 1,
            background: 'linear-gradient(90deg, transparent, #A8864F, transparent)',
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}