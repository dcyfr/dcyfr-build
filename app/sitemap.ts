import type { MetadataRoute } from 'next';
import templates from '@/data/templates.json';

const BASE = 'https://dcyfr.build';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/templates`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/cost-estimator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];

  const templateRoutes: MetadataRoute.Sitemap = (templates as { id: string }[]).map((t) => ({
    url: `${BASE}/templates/${t.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...templateRoutes];
}
