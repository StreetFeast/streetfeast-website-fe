// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import { getEnrichedTrucks, getTrucksByCity } from '@/lib/api/server';
import { ALL_CITIES } from '@/content/cities';
import { ALL_STATES } from '@/content/states';

const BASE = 'https://streetfeastapp.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${BASE}`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/food-trucks`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/download`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/features`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/roadmap`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: 'monthly', priority: 0.2 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: 'monthly', priority: 0.2 },
  ];

  const stateEntries: MetadataRoute.Sitemap = ALL_STATES.map((s) => ({
    url: `${BASE}/food-trucks/${s.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Only include city pages that have at least one truck (empty cities are noindex'd).
  const cityEntries = (
    await Promise.all(
      ALL_CITIES.map(async (c) => {
        const trucks = await getTrucksByCity(c.stateSlug, c.slug, c.aliases ?? []);
        if (trucks.length === 0) return null;
        return {
          url: `${BASE}/food-trucks/${c.stateSlug}/${c.slug}`,
          lastModified: now,
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        };
      })
    )
  ).filter((e): e is NonNullable<typeof e> => e !== null);

  const trucks = await getEnrichedTrucks();
  const truckEntries: MetadataRoute.Sitemap = trucks.map((t) => ({
    url: `${BASE}/truck/${t.id}`,
    lastModified: now,
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...stateEntries, ...cityEntries, ...truckEntries];
}
