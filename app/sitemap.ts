import { MetadataRoute } from 'next';
import { SITE } from '@/config/site';
import { ROOMS } from '@/data/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE.url;

  const staticRoutes = [
    '',
    '/notice',
    '/rooms/la-mer',
    '/rooms/pierre',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return staticRoutes;
}