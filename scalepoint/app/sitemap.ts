import type { MetadataRoute } from 'next';
import { config } from '@/lib/config';
import { OPPORTUNITIES } from '@/data/opportunities';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = config.siteUrl.replace(/\/$/, '');
  const routes = ['', '/opportunities', '/executive-profile', '/employer-search', '/talent-intelligence', '/about', '/contact', '/privacy', '/terms'];
  const staticEntries = routes.map((r) => ({ url: `${base}${r}`, lastModified: new Date() }));
  const opps = OPPORTUNITIES.map((o) => ({ url: `${base}/opportunities/${o.slug}`, lastModified: new Date() }));
  return [...staticEntries, ...opps];
}
