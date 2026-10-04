/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Pages: 정적 export -> out/ 폴더만 배포 (.next 캐시 제외)
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'pix8.agoda.net' },
      { protocol: 'https', hostname: 'q-xx.bstatic.com' },
      { protocol: 'https', hostname: 'i.imgur.com' },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'motion'],
  },
};

module.exports = nextConfig;