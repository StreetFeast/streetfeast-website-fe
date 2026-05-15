# SEO Foundation + Kentucky Geographic Launch

## Problem

`streetfeastapp.com` does not rank for the queries that matter to the business:

- `food trucks in Bowling Green`, `food trucks Glasgow KY`, `food trucks near me Somerset`, etc. — no geographic intent anywhere on the site.
- Named-truck queries like `Mama's Tacos Bowling Green` — `/truck/[truckId]` is fully client-rendered (`'use client'` + `useEffect`), so Googlebot sees an empty skeleton on every truck profile.
- Branded / app-related queries — the home page is ~13 lines of JSX (hero + footer) with almost no indexable content.

Concrete observed gaps in the codebase:

- Root `metadata` in `src/app/layout.tsx` is generic and contains no Kentucky / city signal.
- `src/app/sitemap.ts` lists only 4 URLs (`/`, `/privacy`, `/terms`, `/download`).
- No JSON-LD structured data anywhere.
- No location landing pages.
- Truck profile page (`src/app/truck/[truckId]/page.tsx`) has no `generateMetadata`, returns 200 even on missing trucks (soft-404), and renders no server HTML.

## Goal

Within 8-12 weeks of launch, the site ranks on page 1 of Google for:

- `food trucks in [Kentucky city]` for Bowling Green, Glasgow, Somerset, Elizabethtown, Owensboro
- `[truck name]` for every truck registered on the platform
- `food trucks Kentucky` (state-level)

Measurable via Google Search Console impressions + clicks per page bucket (truck profiles, city pages, state hub).

## Scope

### In

- Technical SEO baseline (per-page metadata factory, JSON-LD helpers, dynamic sitemap, robots, OG images).
- Convert `/truck/[truckId]` from client-only to server-rendered with `generateMetadata`, JSON-LD, breadcrumbs, and a proper 404. The truck URL itself does **not** change; existing links/QR codes keep working.
- New routes:
  - `/food-trucks` — national hub
  - `/food-trucks/[state]` — state hub (Kentucky at launch)
  - `/food-trucks/[state]/[city]` — city page (5 Kentucky cities at launch)
- Home page beef-up with Kentucky framing and indexable content sections (featured cities, how-it-works, FAQ).
- Content registry pattern that lets you add cities and trucks without backend changes (typed `.ts` files committed to the repo).
- Cuisine captured on truck JSON-LD via `servesCuisine` (from the existing `truck.cuisine` API field), but **no cuisine landing pages**.

### Out

- Blog (`/blog/*`) — deferred.
- Cuisine landing pages (`/food-trucks/cuisine/*`) — deferred; revisit once Search Console shows demand.
- Truck URL slug migration (e.g. `/truck/mamas-tacos`) — separate future phase; requires backend slug field.
- Backend list-trucks endpoint — we use a static `TRUCK_IDS` registry in the repo.
- i18n / hreflang.
- `Review` / `AggregateRating` schema (only when first-party reviews exist; never aggregate from elsewhere).
- Visual redesign — existing CSS modules continue to work.

## Architecture

### Route map

```
/                                       (existing — KY-framed copy added)
/food-trucks                            (NEW: national hub — state index)
/food-trucks/kentucky                   (NEW: state hub)
/food-trucks/kentucky/bowling-green     (NEW)
/food-trucks/kentucky/glasgow           (NEW)
/food-trucks/kentucky/somerset          (NEW)
/food-trucks/kentucky/elizabethtown     (NEW — noindex until trucks)
/food-trucks/kentucky/owensboro         (NEW — noindex until trucks)
/truck/[truckId]                        (UNCHANGED URL — converted from client-only to SSR)
```

The `[state]/[city]` template is generic; Louisiana, Virginia, or any other state drops in by adding an editorial content file plus letting trucks with that state's zipcodes resolve there naturally.

### File layout additions

```
src/app/food-trucks/
  page.tsx                          (national hub)
  [state]/
    page.tsx                        (state hub)
    [city]/
      page.tsx                      (city page)

src/app/truck/[truckId]/
  page.tsx                          (CONVERTED: server component — fetch + metadata + JSON-LD + 404)
  TruckProfileClient.tsx            (NEW: existing interactive UI extracted, receives data via props)
  page.module.css                   (unchanged)

src/content/
  trucks.ts                         (TRUCK_IDS array + FEATURED_TRUCK_IDS set)
  states/
    kentucky.ts                     (state editorial copy)
  cities/
    kentucky/
      bowling-green.ts
      glasgow.ts
      somerset.ts
      elizabethtown.ts
      owensboro.ts
    index.ts                        (city loader / generateStaticParams source)

src/lib/seo/
  metadata.ts                       (buildMetadata factory)
  jsonld.ts                         (typed JSON-LD builders)
  JsonLd.tsx                        (<script type="application/ld+json"> server component)

src/lib/api/
  server.ts                         (server-only fetch wrappers + getEnrichedTrucks cache)

src/lib/location/
  zipcode.ts                        (server-only zipcodes wrapper + slugify)

src/lib/content/
  types.ts                          (StateContent, CityContent, FaqItem types)
  cities.ts                         (getCityContent, getAllCityRoutes loaders)
  states.ts                         (getStateContent loader)

src/components/
  Breadcrumb/                       (visible breadcrumb component)
  TruckCard/                        (server-rendered card for city/state hubs)
  CitiesGrid/                       (state hub cities list)
  EmptyCityState/                   (no-trucks CTA block)
  HomeFeaturedCities/               (home page section)
  HomeHowItWorks/                   (home page section)
  HomeFaq/                          (home page section)
  Faq/                              (reusable accordion for FAQPage JSON-LD)
```

### Data layer

The backend has no list-trucks endpoint. We bridge that with a typed registry of truck IDs in the repo, plus zipcode-based city/state derivation (the truck record already exposes `zipcode`).

```ts
// src/content/trucks.ts
// TODO: ADD CONTENT — populate with your real truck IDs.
// One-line PR appends a new truck. No state/city/cuisine needed here —
// state/city are derived from the truck's zipcode; cuisine comes from the
// truck API response.

export const TRUCK_IDS: string[] = [
  // 'XXXXX',
  // 'XXXXX',
];

// Optional: surfaces a truck in the "Featured" slot on state/city hubs.
export const FEATURED_TRUCK_IDS = new Set<string>([
  // 'XXXXX',
]);
```

```ts
// src/lib/location/zipcode.ts
import 'server-only'; // build-time error if imported from a client component
import { lookup } from 'zipcodes';

export type CityLocation = {
  city: string;        // "Bowling Green"
  citySlug: string;    // "bowling-green"
  state: string;       // "KY"
  stateName: string;   // "Kentucky"
  stateSlug: string;   // "kentucky"
  latitude: number;
  longitude: number;
};

const STATE_NAMES: Record<string, string> = {
  KY: 'Kentucky',
  // TODO: ADD CONTENT — add states as the platform expands.
  // LA: 'Louisiana',
  // VA: 'Virginia',
};

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function cityFromZipcode(zip: string | null | undefined): CityLocation | null {
  if (!zip) return null;
  const data = lookup(zip);
  if (!data) return null;
  const stateName = STATE_NAMES[data.state] ?? data.state;
  return {
    city: data.city,
    citySlug: slugify(data.city),
    state: data.state,
    stateName,
    stateSlug: slugify(stateName),
    latitude: data.latitude,
    longitude: data.longitude,
  };
}
```

```ts
// src/lib/api/server.ts
import 'server-only';
import { unstable_cache } from 'next/cache';
import { TRUCK_IDS, FEATURED_TRUCK_IDS } from '@/content/trucks';
import { cityFromZipcode, type CityLocation } from '@/lib/location/zipcode';
import type { TruckDetailResponse, TruckOccurrence, Menu } from '@/types/api';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

export type EnrichedTruck = TruckDetailResponse & {
  location: CityLocation | null;
  isFeatured: boolean;
};

async function fetchTruckDetails(truckId: string): Promise<TruckDetailResponse | null> {
  const res = await fetch(`${API_BASE}/api/v1/Truck/${truckId}`, {
    next: { revalidate: 300, tags: [`truck:${truckId}`] },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Truck fetch failed: ${res.status}`);
  return res.json();
}

export const getTruckDetailsServer = (truckId: string) => fetchTruckDetails(truckId);

export async function getTruckOccurrencesServer(
  truckId: string,
  startLocal: string,
  endLocal: string
): Promise<TruckOccurrence[]> {
  const url = `${API_BASE}/api/v1/Truck/${truckId}/Schedule/Occurrences?startLocal=${startLocal}&endLocal=${endLocal}`;
  const res = await fetch(url, { next: { revalidate: 300, tags: [`truck:${truckId}`] } });
  if (!res.ok) return [];
  return res.json();
}

export async function getTruckMenuServer(truckId: string, menuId: number): Promise<Menu | null> {
  const res = await fetch(`${API_BASE}/api/v1/Truck/${truckId}/Menu?menuId=${menuId}`, {
    next: { revalidate: 600, tags: [`truck:${truckId}`] },
  });
  if (!res.ok) return null;
  return res.json();
}

export const getEnrichedTrucks = unstable_cache(
  async (): Promise<EnrichedTruck[]> => {
    const results = await Promise.all(
      TRUCK_IDS.map(async (id) => {
        const truck = await fetchTruckDetails(id);
        if (!truck) return null;
        return {
          ...truck,
          location: cityFromZipcode(truck.zipcode),
          isFeatured: FEATURED_TRUCK_IDS.has(id),
        };
      })
    );
    return results.filter((t): t is EnrichedTruck => t !== null);
  },
  ['enriched-trucks'],
  { revalidate: 3600, tags: ['trucks'] }
);

export async function getTrucksByCity(
  stateSlug: string,
  citySlug: string,
  acceptedAliases: string[] = []
): Promise<EnrichedTruck[]> {
  const accepted = new Set<string>([citySlug, ...acceptedAliases]);
  const all = await getEnrichedTrucks();
  return all.filter(
    (t) => t.location?.stateSlug === stateSlug && accepted.has(t.location.citySlug)
  );
}

export async function getTrucksByState(stateSlug: string): Promise<EnrichedTruck[]> {
  const all = await getEnrichedTrucks();
  return all.filter((t) => t.location?.stateSlug === stateSlug);
}
```

### Content schema

```ts
// src/lib/content/types.ts
export type FaqItem = { q: string; a: string };

export type StateContent = {
  slug: string;
  name: string;
  abbreviation: string;
  metaDescription: string;
  intro: string;
  faq: FaqItem[];
  heroImage?: { src: string; alt: string };
};

export type CityContent = {
  slug: string;
  name: string;
  stateSlug: string;
  stateName: string;
  stateAbbr: string;
  metaDescription: string;
  intro: string;
  neighborhoods?: string[];
  faq: FaqItem[];
  aliases?: string[];
  heroImage?: { src: string; alt: string };
};
```

```ts
// src/content/states/kentucky.ts
import type { StateContent } from '@/lib/content/types';

export const kentucky: StateContent = {
  slug: 'kentucky',
  name: 'Kentucky',
  abbreviation: 'KY',
  // TODO: ADD CONTENT — 150-160 char description with "food trucks" + "Kentucky" + a city or two.
  metaDescription:
    'Find food trucks across Kentucky — real-time locations, menus, and schedules in Bowling Green, Glasgow, Somerset, and beyond.',
  // TODO: ADD CONTENT — 200-300 words. Talk about KY's food truck scene, what makes it distinct,
  // where trucks tend to gather, the cultural/regional angle. This is the page's main ranking signal.
  intro: `Kentucky's food truck scene...`,
  // TODO: ADD CONTENT — 4-6 state-level FAQs. Examples below; rewrite with real answers.
  faq: [
    {
      q: 'Where can I find food trucks in Kentucky?',
      a: 'Food trucks operate in cities and towns across Kentucky...',
    },
    {
      q: 'Do Kentucky food trucks operate year-round?',
      a: '...',
    },
    {
      q: 'How do I find the schedule for a Kentucky food truck?',
      a: '...',
    },
    {
      q: 'Can I book a Kentucky food truck for a private event?',
      a: '...',
    },
  ],
};
```

```ts
// src/content/cities/kentucky/bowling-green.ts
import type { CityContent } from '@/lib/content/types';

export const bowlingGreen: CityContent = {
  slug: 'bowling-green',
  name: 'Bowling Green',
  stateSlug: 'kentucky',
  stateName: 'Kentucky',
  stateAbbr: 'KY',
  // TODO: ADD CONTENT — 150-160 chars. Must include "food trucks" + "Bowling Green" + "Kentucky".
  metaDescription:
    'Find food trucks in Bowling Green, Kentucky. Real-time locations, menus, and schedules for the best street food in BG.',
  // TODO: ADD CONTENT — 200+ words of unique editorial. Mention WKU, Fountain Square,
  // common parking spots, when/where trucks cluster, the cultural angle. Avoid duplicating
  // copy across cities — Google penalizes templated location pages.
  intro: `Bowling Green's food truck scene...`,
  // TODO: ADD CONTENT — popular spots where food trucks actually park. These render
  // visibly and pick up hyperlocal search traffic ("food trucks WKU", etc.).
  neighborhoods: [
    'Downtown / Fountain Square',
    'WKU Campus',
    // 'Greenwood Mall area',
    // 'Scottsville Road corridor',
  ],
  // TODO: ADD CONTENT — 4-6 questions specific to Bowling Green. Make answers genuinely useful.
  faq: [
    { q: 'Where are food trucks parked in Bowling Green?', a: '...' },
    { q: 'Are there food trucks near WKU?', a: '...' },
    { q: 'When do food trucks operate in Bowling Green?', a: '...' },
    { q: 'How do I find tonight\'s food trucks in Bowling Green?', a: '...' },
  ],
  // Optional: if a nearby postal community resolves via zipcode to something other than
  // "Bowling Green" but should appear on this city page, add the slugified name here.
  // aliases: ['plum-springs', 'oakland'],
};
```

```ts
// src/content/cities/kentucky/glasgow.ts
import type { CityContent } from '@/lib/content/types';

export const glasgow: CityContent = {
  slug: 'glasgow',
  name: 'Glasgow',
  stateSlug: 'kentucky',
  stateName: 'Kentucky',
  stateAbbr: 'KY',
  // TODO: ADD CONTENT
  metaDescription: 'Find food trucks in Glasgow, Kentucky. Real-time locations, menus, and schedules.',
  // TODO: ADD CONTENT — 200+ words unique to Glasgow.
  intro: `Glasgow's food truck scene...`,
  // TODO: ADD CONTENT
  neighborhoods: [
    // 'Downtown Glasgow',
    // 'The Plaza',
  ],
  // TODO: ADD CONTENT
  faq: [
    { q: 'Where are food trucks parked in Glasgow, KY?', a: '...' },
    { q: '...', a: '...' },
  ],
};
```

```ts
// src/content/cities/kentucky/somerset.ts
import type { CityContent } from '@/lib/content/types';

export const somerset: CityContent = {
  slug: 'somerset',
  name: 'Somerset',
  stateSlug: 'kentucky',
  stateName: 'Kentucky',
  stateAbbr: 'KY',
  // TODO: ADD CONTENT
  metaDescription: 'Find food trucks in Somerset, Kentucky. Real-time locations, menus, and schedules.',
  // TODO: ADD CONTENT — 200+ words unique to Somerset.
  intro: `Somerset's food truck scene...`,
  // TODO: ADD CONTENT
  neighborhoods: [
    // 'Downtown Somerset',
    // 'Lake Cumberland area',
  ],
  // TODO: ADD CONTENT
  faq: [
    { q: 'Where are food trucks parked in Somerset, KY?', a: '...' },
    { q: '...', a: '...' },
  ],
};
```

```ts
// src/content/cities/kentucky/elizabethtown.ts
import type { CityContent } from '@/lib/content/types';

// This city has no active trucks at launch. The page is rendered with noindex
// until at least one truck's zipcode resolves to Elizabethtown.

export const elizabethtown: CityContent = {
  slug: 'elizabethtown',
  name: 'Elizabethtown',
  stateSlug: 'kentucky',
  stateName: 'Kentucky',
  stateAbbr: 'KY',
  // TODO: ADD CONTENT
  metaDescription:
    'Find food trucks in Elizabethtown, Kentucky. Real-time locations, menus, and schedules.',
  // TODO: ADD CONTENT — 200+ words unique to Elizabethtown.
  intro: `Elizabethtown's food truck scene...`,
  // TODO: ADD CONTENT
  neighborhoods: [
    // 'Downtown E-town',
    // 'Freeman Lake Park',
  ],
  // TODO: ADD CONTENT
  faq: [
    { q: 'Are there food trucks in Elizabethtown, KY?', a: '...' },
    { q: '...', a: '...' },
  ],
};
```

```ts
// src/content/cities/kentucky/owensboro.ts
import type { CityContent } from '@/lib/content/types';

// This city has no active trucks at launch. The page is rendered with noindex
// until at least one truck's zipcode resolves to Owensboro.

export const owensboro: CityContent = {
  slug: 'owensboro',
  name: 'Owensboro',
  stateSlug: 'kentucky',
  stateName: 'Kentucky',
  stateAbbr: 'KY',
  // TODO: ADD CONTENT
  metaDescription: 'Find food trucks in Owensboro, Kentucky. Real-time locations, menus, and schedules.',
  // TODO: ADD CONTENT — 200+ words unique to Owensboro.
  intro: `Owensboro's food truck scene...`,
  // TODO: ADD CONTENT
  neighborhoods: [
    // 'Downtown Owensboro',
    // 'Riverfront / Smothers Park',
  ],
  // TODO: ADD CONTENT
  faq: [
    { q: 'Are there food trucks in Owensboro, KY?', a: '...' },
    { q: '...', a: '...' },
  ],
};
```

```ts
// src/content/cities/index.ts
import type { CityContent } from '@/lib/content/types';
import { bowlingGreen } from './kentucky/bowling-green';
import { glasgow } from './kentucky/glasgow';
import { somerset } from './kentucky/somerset';
import { elizabethtown } from './kentucky/elizabethtown';
import { owensboro } from './kentucky/owensboro';

export const ALL_CITIES: CityContent[] = [
  bowlingGreen,
  glasgow,
  somerset,
  elizabethtown,
  owensboro,
];

export function getCityContent(stateSlug: string, citySlug: string): CityContent | null {
  return (
    ALL_CITIES.find((c) => c.stateSlug === stateSlug && c.slug === citySlug) ?? null
  );
}

export function getAllCityRoutes() {
  return ALL_CITIES.map((c) => ({ state: c.stateSlug, city: c.slug }));
}

export function getCitiesByState(stateSlug: string): CityContent[] {
  return ALL_CITIES.filter((c) => c.stateSlug === stateSlug);
}
```

## SEO baseline (Section 2)

### Metadata factory

```ts
// src/lib/seo/metadata.ts
import type { Metadata } from 'next';

const SITE_URL = 'https://streetfeastapp.com';

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: { url: string; width: number; height: number; alt: string };
  noindex?: boolean;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
};

export function buildMetadata(input: BuildMetadataInput): Metadata {
  const url = `${SITE_URL}${input.path}`;
  const image = input.image ?? {
    url: '/social-media-logo.png',
    width: 1352,
    height: 632,
    alt: 'StreetFeast',
  };
  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: url },
    robots: input.noindex
      ? { index: false, follow: true }
      : {
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
      title: input.title,
      description: input.description,
      url,
      siteName: 'StreetFeast',
      images: [image],
      locale: 'en_US',
      type: input.type ?? 'website',
      ...(input.publishedTime && { publishedTime: input.publishedTime }),
      ...(input.modifiedTime && { modifiedTime: input.modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: input.title,
      description: input.description,
      images: [image.url],
      creator: '@streetfeast',
    },
  };
}
```

### JSON-LD builders

Typed builders rendered via a tiny `<JsonLd>` server component. Schemas used:

- `Organization` + `WebSite` (with `SearchAction`) — sitewide in `layout.tsx`
- `MobileApplication` — home + `/download`
- `FoodEstablishment` — every truck profile (preferred over plain `LocalBusiness`; has `servesCuisine`, `menu`, `openingHoursSpecification`)
- `BreadcrumbList` — truck profile, state hub, city page
- `FAQPage` — home, state hub, city pages
- `ItemList` of `FoodEstablishment` — state hub (featured), city pages (active trucks)

```tsx
// src/lib/seo/JsonLd.tsx
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

`FoodEstablishment` shape (truck profile):

```ts
{
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  "@id": "https://streetfeastapp.com/truck/12847#truck",
  "name": truck.name,
  "description": truck.description,
  "url": canonicalUrl,
  "image": [heroImage, ...secondaryImages],
  "telephone": truck.phone,
  "servesCuisine": truck.cuisine,                // single string from API
  "geo": { "@type": "GeoCoordinates", latitude, longitude },
  "address": { "@type": "PostalAddress", addressLocality, addressRegion, postalCode, addressCountry: "US" },
  "openingHoursSpecification": [...next7DaysFromOccurrences],
  "sameAs": [instagram, facebook, tiktok, x].filter(Boolean),
  "hasMenu": { "@type": "Menu", "url": `${url}#menu`, "hasMenuSection": [...] }
}
```

`openingHoursSpecification` is built from the next ~7 days of occurrences (food truck hours are inherently irregular).

### Dynamic sitemap

```ts
// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import { getEnrichedTrucks, getTrucksByCity } from '@/lib/api/server';
import { ALL_CITIES } from '@/content/cities';

const BASE = 'https://streetfeastapp.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = [
    { url: BASE, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/food-trucks`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/food-trucks/kentucky`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/download`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/features`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/roadmap`, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE}/contact`, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${BASE}/privacy`, changeFrequency: 'monthly', priority: 0.2 },
    { url: `${BASE}/terms`, changeFrequency: 'monthly', priority: 0.2 },
  ];

  // Only include city pages that have trucks (empty cities are noindex'd anyway).
  const cityEntries = await Promise.all(
    ALL_CITIES.map(async (c) => {
      const trucks = await getTrucksByCity(c.stateSlug, c.slug, c.aliases);
      if (trucks.length === 0) return null;
      return {
        url: `${BASE}/food-trucks/${c.stateSlug}/${c.slug}`,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      };
    })
  );

  const trucks = await getEnrichedTrucks();
  const truckEntries = trucks.map((t) => ({
    url: `${BASE}/truck/${t.id}`,
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  return [
    ...staticEntries,
    ...cityEntries.filter((e): e is NonNullable<typeof e> => e !== null),
    ...truckEntries,
  ];
}
```

### robots.txt

```ts
// src/app/robots.ts — updated
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/profile/',
          '/forgot-password',
          '/reset-password',
          '/verify',
          '/truck-verification',
          '/m/',
        ],
      },
    ],
    sitemap: 'https://streetfeastapp.com/sitemap.xml',
    host: 'https://streetfeastapp.com',
  };
}
```

### Open Graph image generation

Use Next 15's `opengraph-image.tsx` file convention for dynamic OG cards on truck profile and city pages — better CTR than a single static `social-media-logo.png` for every share.

- `src/app/truck/[truckId]/opengraph-image.tsx` — generates per-truck card with name + hero image + location
- `src/app/food-trucks/[state]/[city]/opengraph-image.tsx` — generates per-city card with city name + state

Sitewide static OG image (`/social-media-logo.png`) remains the fallback.

## Truck profile SSR conversion (Section 3)

### Refactor pattern

`src/app/truck/[truckId]/page.tsx` becomes:

```tsx
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import {
  getTruckDetailsServer,
  getTruckOccurrencesServer,
  getTruckMenuServer,
} from '@/lib/api/server';
import { cityFromZipcode } from '@/lib/location/zipcode';
import { buildMetadata } from '@/lib/seo/metadata';
import {
  foodEstablishmentJsonLd,
  breadcrumbJsonLd,
} from '@/lib/seo/jsonld';
import { JsonLd } from '@/lib/seo/JsonLd';
import { Breadcrumb } from '@/components/Breadcrumb';
import { TruckProfileClient } from './TruckProfileClient';

export const revalidate = 300;

type Props = { params: Promise<{ truckId: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { truckId } = await params;
  const truck = await getTruckDetailsServer(truckId);
  if (!truck) return { robots: { index: false, follow: false } };

  const location = cityFromZipcode(truck.zipcode);
  const locationSuffix = location ? ` — Food Truck in ${location.city}, ${location.state}` : '';

  return buildMetadata({
    title: `${truck.name}${locationSuffix}`,
    description: (truck.description ?? defaultDescription(truck, location)).slice(0, 160),
    path: `/truck/${truckId}`,
    image: heroImageMeta(truck),
  });
}

export default async function TruckPage({ params }: Props) {
  const { truckId } = await params;
  const truck = await getTruckDetailsServer(truckId);
  if (!truck) notFound();

  const [occurrences, defaultMenu] = await Promise.all([
    getTruckOccurrencesServer(truckId, todayLocal(), in30DaysLocal()),
    truck.defaultMenuId ? getTruckMenuServer(truckId, truck.defaultMenuId) : Promise.resolve(null),
  ]);

  const location = cityFromZipcode(truck.zipcode);

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Food Trucks', path: '/food-trucks' },
    ...(location
      ? [
          { name: location.stateName, path: `/food-trucks/${location.stateSlug}` },
          { name: location.city, path: `/food-trucks/${location.stateSlug}/${location.citySlug}` },
        ]
      : []),
    { name: truck.name, path: `/truck/${truckId}` },
  ];

  return (
    <>
      <JsonLd data={foodEstablishmentJsonLd(truck, location, occurrences)} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Breadcrumb items={crumbs} />
      <TruckProfileClient
        truck={truck}
        initialOccurrences={occurrences}
        initialDefaultMenu={defaultMenu}
        location={location}
      />
    </>
  );
}
```

`TruckProfileClient.tsx` contains the existing 700-line interactive logic (tabs, date selector, modals, favorite/report buttons, Google Map) — but takes the already-fetched data as props rather than fetching via `useEffect`. Initial paint is server HTML with truck name, description, location, schedule, and menu rendered.

### 404 handling

`notFound()` triggers Next's `not-found.tsx`. The existing "Oops! We couldn't find this truck" UI moves into:

```
src/app/truck/[truckId]/not-found.tsx
```

This page returns a proper HTTP 404 status (currently the error UI returns 200, which Google treats as a soft-404).

### Server-rendered "More trucks in [city]"

Below the client island, render up to 6 other trucks from the same city as crawlable HTML cross-links. Pulled from `getTrucksByCity(location.stateSlug, location.citySlug)` minus the current truck.

### Edge cases

- Truck has no `zipcode` (or zipcode is not in the `zipcodes` package's database): metadata falls back to no-location version; breadcrumb stops at "Food Trucks"; no `address` block in JSON-LD. Page is still indexable.
- Truck's zipcode resolves to a city without an editorial content file: breadcrumb still works (uses the postal city name); city-link in breadcrumb 404s (unknown route) — this is OK because Next renders `not-found.tsx`. The truck is still indexable via its own profile.
- Truck deleted in the backend: `getTruckDetailsServer` returns null on 404 → `notFound()` → eventual removal from index via Google's normal recrawl. No proactive sitemap pruning needed (revalidate cycle handles it).

## State hub & city pages (Section 4)

### Routing

```tsx
// src/app/food-trucks/[state]/[city]/page.tsx
export const dynamicParams = false;
export const revalidate = 3600;

export async function generateStaticParams() {
  return getAllCityRoutes(); // [{ state: 'kentucky', city: 'bowling-green' }, ...]
}

export async function generateMetadata({ params }) {
  const { state, city } = await params;
  const content = getCityContent(state, city);
  if (!content) return { robots: { index: false, follow: false } };
  const trucks = await getTrucksByCity(state, city, content.aliases);
  return buildMetadata({
    title: `${content.name} Food Trucks — Where to Find Street Food in ${content.stateName}`,
    description: content.metaDescription,
    path: `/food-trucks/${state}/${city}`,
    noindex: trucks.length === 0, // empty cities crawlable but not indexed
  });
}

export default async function CityPage({ params }) {
  const { state, city } = await params;
  const content = getCityContent(state, city);
  if (!content) notFound();

  const trucks = await getTrucksByCity(state, city, content.aliases);
  const otherCities = getCitiesByState(state).filter((c) => c.slug !== city);
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Food Trucks', path: '/food-trucks' },
    { name: content.stateName, path: `/food-trucks/${state}` },
    { name: content.name, path: `/food-trucks/${state}/${city}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      {trucks.length > 0 && <JsonLd data={itemListJsonLd(trucks, content)} />}
      <JsonLd data={faqPageJsonLd(content.faq)} />
      <Breadcrumb items={crumbs} />
      <h1>Food Trucks in {content.name}, {content.stateName}</h1>
      <IntroSection text={content.intro} />
      {trucks.length > 0 ? (
        <TruckGrid trucks={trucks} />
      ) : (
        <EmptyCityState cityName={content.name} />
      )}
      {content.neighborhoods && content.neighborhoods.length > 0 && (
        <NeighborhoodsBlock items={content.neighborhoods} cityName={content.name} />
      )}
      {otherCities.length > 0 && (
        <NearbyCities cities={otherCities} stateSlug={state} />
      )}
      <FaqList items={content.faq} />
      <CtaBlock />
    </>
  );
}
```

### State hub anatomy (`/food-trucks/kentucky`)

```
Breadcrumb: Home › Food Trucks › Kentucky
H1: "Food Trucks in Kentucky"
Hero intro (kentucky.intro)
Featured trucks (up to 6, from FEATURED_TRUCK_IDS in this state)
Cities grid (5 launch cities — name, photo, active-truck count)
Kentucky FAQ (kentucky.faq, accordion)
CTA: Download app / Register your truck
```

JSON-LD: `BreadcrumbList`, `ItemList` of cities, `FAQPage`.

### National hub (`/food-trucks`)

Lightweight at launch — lists active states (just Kentucky at first), links into the state hub. Adds a second state when the platform expands.

### Empty-city behavior

- Page renders fully with editorial copy.
- Truck grid replaced with `EmptyCityState` (CTA to `/register-truck`).
- `noindex` automatically applied until ≥1 truck resolves to the city.
- `ItemList` JSON-LD omitted (would be empty).
- Sitemap excludes the entry.

### Truck cards (server-rendered)

```tsx
// src/components/TruckCard/TruckCard.tsx — server component
export function TruckCard({ truck }: { truck: EnrichedTruck }) {
  const next = nextOccurrence(truck);
  return (
    <a href={`/truck/${truck.id}`} className={styles.card}>
      <Image
        src={heroImageUrl(truck)}
        alt={`${truck.name} food truck in ${truck.location?.city ?? 'Kentucky'}`}
        width={400}
        height={300}
      />
      <h3>{truck.name}</h3>
      {truck.cuisine && <span className={styles.cuisine}>{truck.cuisine}</span>}
      <StatusBadge occurrence={next} /> {/* "Open now" / "Opens Fri 11am" — server-computed */}
    </a>
  );
}
```

All card content is server HTML — fully crawlable. Status is computed at render time and refreshes with ISR.

## Home page (Section 5)

### Root `metadata` update

```ts
// src/app/layout.tsx
title: {
  default: 'StreetFeast — Find Food Trucks Near You in Kentucky & Beyond',
  template: '%s | StreetFeast',
},
description:
  'Find food trucks, street vendors, and pop-up restaurants near you. Real-time locations, menus, and schedules across Kentucky — Bowling Green, Glasgow, Somerset, Elizabethtown, Owensboro, and more.',
```

### New home page sections

`src/app/page.tsx` becomes:

```tsx
import { Header } from '@/components/Header';
import { HeroHeader } from '@/components/HeroHeader';
import { HomeFeaturedCities } from '@/components/HomeFeaturedCities';
import { HomeHowItWorks } from '@/components/HomeHowItWorks';
import { HomeFaq } from '@/components/HomeFaq';
import { Footer } from '@/components/Footer';
import { JsonLd } from '@/lib/seo/JsonLd';
import {
  mobileApplicationJsonLd,
  faqPageJsonLd,
  itemListJsonLd,
} from '@/lib/seo/jsonld';
import { HOME_FAQ } from '@/content/home';
import { getCitiesByState } from '@/content/cities';

export default function Home() {
  const kyCities = getCitiesByState('kentucky');
  return (
    <>
      <JsonLd data={mobileApplicationJsonLd()} />
      <JsonLd data={faqPageJsonLd(HOME_FAQ)} />
      <Header />
      <HeroHeader />
      <HomeFeaturedCities cities={kyCities} />
      <HomeHowItWorks />
      <HomeFaq items={HOME_FAQ} />
      <Footer />
    </>
  );
}
```

```ts
// src/content/home.ts
import type { FaqItem } from '@/lib/content/types';

// TODO: ADD CONTENT — 4-6 general FAQs. These are app-level, not city-specific.
export const HOME_FAQ: FaqItem[] = [
  {
    q: 'How do I find food trucks near me?',
    a: 'Download the StreetFeast app to see food trucks near your current location in real time...',
  },
  {
    q: 'Are food truck schedules updated in real time?',
    a: '...',
  },
  {
    q: 'Can I see menus before visiting a food truck?',
    a: '...',
  },
  {
    q: 'Does StreetFeast cover food trucks in Kentucky?',
    a: 'Yes. StreetFeast tracks food trucks across Kentucky, with active coverage in Bowling Green, Glasgow, and Somerset...',
  },
  {
    q: 'Is StreetFeast free to use?',
    a: '...',
  },
];

// TODO: ADD CONTENT — 3-step explainer, ~50 words each, used by HomeHowItWorks.
export const HOW_IT_WORKS = [
  {
    title: 'Discover trucks near you',
    body: 'Open the StreetFeast app to see every food truck operating nearby right now...',
  },
  {
    title: 'See real-time schedules',
    body: '...',
  },
  {
    title: 'Favorite and follow your top trucks',
    body: '...',
  },
];
```

### Footer update

Add a "Find Food Trucks" column with permanent links to:

- `/food-trucks/kentucky`
- `/food-trucks/kentucky/bowling-green`
- `/food-trucks/kentucky/glasgow`
- `/food-trucks/kentucky/somerset`
- `/food-trucks/kentucky/elizabethtown`
- `/food-trucks/kentucky/owensboro`

Five-to-six permanent sitewide internal links to the key new pages — biggest crawl-equity move available for the cost.

## Measurement & launch

### Search Console

- Verify property if not already done.
- Submit new `sitemap.xml` once deployed.
- Configure crawl error email alerts.

### Analytics

PostHog already tracks page views and the `download_redirect` event. Add a session-level `og_landing_page` capture so organic landings on city/truck pages can be filtered later.

### Core Web Vitals

- Verify Lighthouse LCP / CLS on truck profile before vs after SSR conversion (expected significant drop).
- Hero images on city pages: `priority` + responsive `sizes`.
- `next/font` already in use (Lexend).

### Post-launch index verification (≥1 week after deploy)

In Search Console:

- "Pages" report — city/truck pages indexed (not "Crawled – currently not indexed", which signals thin content).
- "Performance" report — impressions appearing for `[truck name]`, `[city] food trucks`, `food trucks Kentucky` within 2-4 weeks.

Outcome determines whether the next phase invests in cuisine pages or blog content.

## Content seed deliverables checklist

Implementation can ship with placeholder copy; before flipping pages to indexed:

- [ ] `src/content/trucks.ts` — populate `TRUCK_IDS` (and optionally `FEATURED_TRUCK_IDS`)
- [ ] `src/content/states/kentucky.ts` — `intro` (200-300 words) + 4-6 FAQs + `metaDescription`
- [ ] `src/content/cities/kentucky/bowling-green.ts` — `intro` (200+), `neighborhoods`, FAQs, `metaDescription`
- [ ] `src/content/cities/kentucky/glasgow.ts` — same
- [ ] `src/content/cities/kentucky/somerset.ts` — same
- [ ] `src/content/cities/kentucky/elizabethtown.ts` — same (pages stays `noindex` until trucks exist)
- [ ] `src/content/cities/kentucky/owensboro.ts` — same (page stays `noindex` until trucks exist)
- [ ] `src/content/home.ts` — `HOME_FAQ` + `HOW_IT_WORKS` copy
- [ ] (Optional) representative hero image per city for OG card generation

Every file ships with `// TODO: ADD CONTENT` comments at each writable field.

## What this design does NOT cover

- Blog (`/blog/*`) — deferred; revisit if Search Console shows demand for informational queries.
- Cuisine landing pages — deferred; cuisine data is still emitted in truck JSON-LD via `servesCuisine`.
- Truck URL slug migration (`/truck/[truckSlug]`) — requires backend slug field; future phase.
- Backend list-trucks endpoint — current design uses the in-repo `TRUCK_IDS` registry. When the backend exposes a list endpoint, only `getEnrichedTrucks` needs to change.
- Real-time truck-update webhook to `revalidateTag('truck:<id>')` — possible follow-up; current ISR (5 min for trucks, 1 hour for hubs) is sufficient for launch.
- Visual redesign — existing components and CSS modules continue to work; new components follow the project's CSS-module-per-folder convention.
- Performance budgets / Lighthouse CI — track manually pre/post launch; full CI gating is a follow-up.
- Review schema — only when first-party reviews exist on the platform.
- i18n / hreflang.
