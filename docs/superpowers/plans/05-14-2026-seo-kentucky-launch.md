# SEO Foundation + Kentucky Geographic Launch — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `streetfeastapp.com` rank for `[truck name]`, `food trucks in [Kentucky city]`, and `food trucks Kentucky` queries by adding technical SEO (per-page metadata, JSON-LD), converting `/truck/[truckId]` from client-only to server-rendered, building state+city landing pages for Kentucky, and beefing up the home page with indexable content.

**Architecture:** Static editorial content registry in `src/content/` for cities/states/home copy. Server-only data layer (`src/lib/api/server.ts`) iterates a `TRUCK_IDS` registry and enriches each truck with city/state derived from its `zipcode` (via the `zipcodes` package, gated behind `import 'server-only'`). Typed metadata factory + JSON-LD builders in `src/lib/seo/`. New routes under `/food-trucks/[state]/[city]`. Existing truck profile page split into a server shell (data fetch, metadata, JSON-LD) plus a client island (existing interactive logic, takes server data as props).

**Tech Stack:** Next.js 15 App Router + Turbopack, React 19, TypeScript strict, CSS Modules, `zipcodes` (already a dep), `next/cache` `unstable_cache` for ISR, no test framework (verification = `npm run lint` + `npm run build` + manual curl).

**Source spec:** `docs/superpowers/specs/2026-05-14-seo-kentucky-launch-design.md` — read this before starting. It explains every decision and tradeoff this plan implements.

**Verification model (no tests):**
- `npm run lint` after every change — must pass
- `npm run build` at end of each phase — must succeed
- `npm run dev` + `curl -s http://localhost:3000/<path> | grep <expected text>` for SSR verification
- Manual Google Rich Results Test (https://search.google.com/test/rich-results) for JSON-LD verification at end

**Project conventions to honor:**
- Each component lives in its own folder: `ComponentName/ComponentName.tsx` + `.module.css` + `index.ts` (re-exports `default`)
- CSS Modules imported as `styles`
- `'use client'` only when needed (state/effects/browser APIs)
- Path alias `@/*` → `./src/*`
- Existing pages import `Header` and `Footer` explicitly per-page (not from layout)
- Commit messages match project style: title-case, past-tense, brief ("Added X", "Updated Y", "Fixed Z")

---

## Phase 0: Pre-flight

### Task 0.1: Verify environment and route allowlist

**Files:**
- Modify: `src/components/LayoutContent/LayoutContent.tsx`

The site has a "coming soon" gate (`LayoutContent`) that only renders allowed paths when `NEXT_PUBLIC_IS_LAUNCHED !== 'true'`. New `/food-trucks/*` paths need to render even when the flag is off (otherwise SEO crawl gets a coming-soon page).

- [ ] **Step 1: Confirm current state**

Run:
```bash
npm run lint
npm run build
```
Expected: both succeed cleanly. If they don't, fix any pre-existing issues first.

- [ ] **Step 2: Update LayoutContent to allow `/food-trucks/*` paths**

Replace the contents of `src/components/LayoutContent/LayoutContent.tsx` with:

```tsx
'use client';

import { usePathname } from 'next/navigation';
import { ComingSoon } from '@/components/ComingSoon';

interface LayoutContentProps {
  children: React.ReactNode;
}

const ALLOWED_PREFIXES = ['/food-trucks'];
const ALLOWED_EXACT = ['/terms', '/privacy', '/delete-my-data', '/download'];

export default function LayoutContent({ children }: LayoutContentProps) {
  const isLaunched = process.env.NEXT_PUBLIC_IS_LAUNCHED === 'true';
  const pathname = usePathname();
  const isAllowed =
    ALLOWED_EXACT.includes(pathname) ||
    ALLOWED_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  if (isLaunched || isAllowed) {
    return <>{children}</>;
  }

  return <ComingSoon />;
}
```

- [ ] **Step 3: Verify**

Run:
```bash
npm run lint
```
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/LayoutContent/LayoutContent.tsx
git commit -m "Allow /food-trucks routes through coming-soon gate"
```

---

## Phase 1: SEO Infrastructure Foundations

These are pure utilities every later phase depends on. No routes or pages yet — just the toolbox.

### Task 1.1: Create metadata factory

**Files:**
- Create: `src/lib/seo/metadata.ts`

- [ ] **Step 1: Create the file**

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

const DEFAULT_IMAGE = {
  url: '/social-media-logo.png',
  width: 1352,
  height: 632,
  alt: 'StreetFeast',
};

export function buildMetadata(input: BuildMetadataInput): Metadata {
  const url = `${SITE_URL}${input.path}`;
  const image = input.image ?? DEFAULT_IMAGE;

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

- [ ] **Step 2: Verify**

```bash
npm run lint
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/seo/metadata.ts
git commit -m "Add buildMetadata factory for per-page SEO metadata"
```

### Task 1.2: Create JsonLd component

**Files:**
- Create: `src/lib/seo/JsonLd.tsx`

- [ ] **Step 1: Create the file**

```tsx
// src/lib/seo/JsonLd.tsx
// Server-rendered <script> tag for JSON-LD structured data.

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

- [ ] **Step 2: Verify**

```bash
npm run lint
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/seo/JsonLd.tsx
git commit -m "Add JsonLd component for structured data"
```

### Task 1.3: Create JSON-LD typed builders

**Files:**
- Create: `src/lib/seo/jsonld.ts`

- [ ] **Step 1: Create the file**

```ts
// src/lib/seo/jsonld.ts
import type { TruckDetailResponse, TruckOccurrence } from '@/types/api';
import type { CityLocation } from '@/lib/location/zipcode';
import type { FaqItem } from '@/lib/content/types';

const SITE_URL = 'https://streetfeastapp.com';
const SITE_NAME = 'StreetFeast';
const LOGO_URL = `${SITE_URL}/streetfeastlogowhite.png`;

const APP_STORE_URL = 'https://apps.apple.com/app/streetfeast/id6504638546';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.streetfeast.app';

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: LOGO_URL,
    sameAs: [
      'https://www.instagram.com/streetfeastapp',
      'https://www.facebook.com/streetfeastapp',
      'https://x.com/streetfeast',
    ],
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { '@id': `${SITE_URL}#organization` },
  };
}

export function mobileApplicationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MobileApplication',
    '@id': `${SITE_URL}#app`,
    name: SITE_NAME,
    operatingSystem: 'iOS, ANDROID',
    applicationCategory: 'FoodAndDrink',
    description:
      'Find food trucks, street vendors, and pop-up restaurants near you with real-time locations, menus, and schedules.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    installUrl: [APP_STORE_URL, PLAY_STORE_URL],
    downloadUrl: [APP_STORE_URL, PLAY_STORE_URL],
    publisher: { '@id': `${SITE_URL}#organization` },
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function faqPageJsonLd(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function itemListJsonLd(
  name: string,
  items: Array<{ url: string; name: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${SITE_URL}${item.url}`,
      name: item.name,
    })),
  };
}

function buildOpeningHoursSpec(occurrences: TruckOccurrence[]) {
  return occurrences
    .filter((o) => !o.isClosed)
    .slice(0, 7)
    .map((o) => ({
      '@type': 'OpeningHoursSpecification',
      opens: o.openTimeLocal,
      closes: o.closeTimeLocal,
      validFrom: o.openTimeLocal,
      validThrough: o.closeTimeLocal,
    }));
}

export function foodEstablishmentJsonLd(
  truck: TruckDetailResponse,
  location: CityLocation | null,
  occurrences: TruckOccurrence[],
  storagePrefix: string
) {
  const heroImage = truck.images?.[0]?.imageUri
    ? truck.images[0].imageUri.startsWith('http')
      ? truck.images[0].imageUri
      : `${storagePrefix}${truck.images[0].imageUri}`
    : undefined;

  const sameAs = [
    truck.instagram && (truck.instagram.startsWith('http')
      ? truck.instagram
      : `https://instagram.com/${truck.instagram.replace('@', '')}`),
    truck.facebook && (truck.facebook.startsWith('http')
      ? truck.facebook
      : `https://facebook.com/${truck.facebook}`),
    truck.tiktok && (truck.tiktok.startsWith('http')
      ? truck.tiktok
      : `https://tiktok.com/@${truck.tiktok.replace('@', '')}`),
    truck.x && (truck.x.startsWith('http')
      ? truck.x
      : `https://x.com/${truck.x.replace('@', '')}`),
    truck.website && (truck.website.startsWith('http')
      ? truck.website
      : `https://${truck.website}`),
  ].filter((s): s is string => Boolean(s));

  const url = `${SITE_URL}/truck/${truck.id}`;
  const openingHours = buildOpeningHoursSpec(occurrences);

  return {
    '@context': 'https://schema.org',
    '@type': 'FoodEstablishment',
    '@id': `${url}#truck`,
    name: truck.name,
    ...(truck.description && { description: truck.description }),
    url,
    ...(heroImage && { image: [heroImage] }),
    ...(truck.phone && { telephone: truck.phone }),
    ...(truck.cuisine && { servesCuisine: truck.cuisine }),
    ...(location && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: location.latitude,
        longitude: location.longitude,
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: location.city,
        addressRegion: location.state,
        addressCountry: 'US',
        ...(truck.zipcode && { postalCode: truck.zipcode }),
      },
    }),
    ...(openingHours.length > 0 && { openingHoursSpecification: openingHours }),
    ...(sameAs.length > 0 && { sameAs }),
  };
}
```

- [ ] **Step 2: Verify (will fail until 1.4 + 2.1 are done — that's OK; we'll come back)**

```bash
npm run lint
```
Expected: TypeScript errors about missing `@/lib/location/zipcode` and `@/lib/content/types` imports. **This is expected** — those files are created in Tasks 1.4 and 2.1. The lint pass at the end of Phase 1 will verify resolution.

- [ ] **Step 3: Commit**

```bash
git add src/lib/seo/jsonld.ts
git commit -m "Add JSON-LD typed builders"
```

### Task 1.4: Create server-only zipcode wrapper

**Files:**
- Create: `src/lib/location/zipcode.ts`

- [ ] **Step 1: Create the file**

```ts
// src/lib/location/zipcode.ts
// IMPORTANT: This file imports the `zipcodes` package which contains the full
// US zipcode database. Never import this file from a client component.
// The `import 'server-only'` directive throws a build-time error if you try.

import 'server-only';
import { lookup } from 'zipcodes';

export type CityLocation = {
  city: string;       // "Bowling Green"
  citySlug: string;   // "bowling-green"
  state: string;      // "KY"
  stateName: string;  // "Kentucky"
  stateSlug: string;  // "kentucky"
  latitude: number;
  longitude: number;
};

// Add states here as the platform expands beyond Kentucky.
const STATE_NAMES: Record<string, string> = {
  KY: 'Kentucky',
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

- [ ] **Step 2: Verify**

```bash
npm run lint
```
Expected: no errors in this file. (`jsonld.ts` still errors on the content types import — that's expected; fixed in Task 2.1.)

- [ ] **Step 3: Commit**

```bash
git add src/lib/location/zipcode.ts
git commit -m "Add server-only zipcode-to-city wrapper"
```

### Task 1.5: Tighten robots.ts

**Files:**
- Modify: `src/app/robots.ts`

- [ ] **Step 1: Replace contents**

```ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://streetfeastapp.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/static/',
          '/profile/',
          '/forgot-password',
          '/reset-password',
          '/verify',
          '/truck-verification',
          '/m/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
```

- [ ] **Step 2: Verify**

```bash
npm run lint
```
Expected: no errors in `robots.ts`.

- [ ] **Step 3: Commit**

```bash
git add src/app/robots.ts
git commit -m "Disallow auth and account routes in robots.txt"
```

---

## Phase 2: Content Registry & Types

Typed editorial copy lives in `src/content/`. Every field needing user copy is marked with `// TODO: ADD CONTENT`.

### Task 2.1: Create content types

**Files:**
- Create: `src/lib/content/types.ts`

- [ ] **Step 1: Create the file**

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

- [ ] **Step 2: Verify**

```bash
npm run lint
```
Expected: no errors. `jsonld.ts`'s import of `FaqItem` now resolves.

- [ ] **Step 3: Commit**

```bash
git add src/lib/content/types.ts
git commit -m "Add content types for state, city, and FAQ"
```

### Task 2.2: Create truck registry

**Files:**
- Create: `src/content/trucks.ts`

- [ ] **Step 1: Create the file**

```ts
// src/content/trucks.ts
// The list of truck IDs this site is responsible for. Drives the sitemap and
// city pages. Append a one-liner here when onboarding a new truck.
//
// All other truck data (name, description, zipcode → city, cuisine, menus,
// schedule, images, social links) comes LIVE from the backend at request
// time and is cached for 5 minutes via ISR. No PR needed for routine changes.

// TODO: ADD CONTENT — replace with your real truck IDs (strings, not numbers).
export const TRUCK_IDS: string[] = [
  // 'XXXXX',
  // 'XXXXX',
];

// Optional: surfaces a truck in the "Featured" slot on state/city hubs.
export const FEATURED_TRUCK_IDS = new Set<string>([
  // 'XXXXX',
]);
```

- [ ] **Step 2: Verify**

```bash
npm run lint
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/content/trucks.ts
git commit -m "Add truck ID registry"
```

### Task 2.3: Create Kentucky state content

**Files:**
- Create: `src/content/states/kentucky.ts`

- [ ] **Step 1: Create the file**

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

  // TODO: ADD CONTENT — 200-300 words. Talk about KY's food truck scene, what makes it
  // distinct, where trucks tend to gather, the cultural/regional angle. This is the page's
  // main ranking signal — make it genuinely useful, not boilerplate.
  intro: `Kentucky's food truck scene...`,

  // TODO: ADD CONTENT — 4-6 state-level FAQs. Examples below; rewrite with real answers.
  faq: [
    {
      q: 'Where can I find food trucks in Kentucky?',
      a: 'Food trucks operate across Kentucky in cities like Bowling Green, Glasgow, Somerset, Elizabethtown, and Owensboro...',
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

- [ ] **Step 2: Verify**

```bash
npm run lint
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/content/states/kentucky.ts
git commit -m "Add Kentucky state content stub"
```

### Task 2.4: Create five Kentucky city stubs

**Files:**
- Create: `src/content/cities/kentucky/bowling-green.ts`
- Create: `src/content/cities/kentucky/glasgow.ts`
- Create: `src/content/cities/kentucky/somerset.ts`
- Create: `src/content/cities/kentucky/elizabethtown.ts`
- Create: `src/content/cities/kentucky/owensboro.ts`

- [ ] **Step 1: Create `bowling-green.ts`**

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
  // common parking spots, when/where trucks cluster, the cultural angle. AVOID duplicating
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
    { q: "How do I find tonight's food trucks in Bowling Green?", a: '...' },
  ],

  // Optional: if a nearby postal community resolves via zipcode to something other than
  // "Bowling Green" but should appear on this city page, add the slugified name here.
  // aliases: ['plum-springs', 'oakland'],
};
```

- [ ] **Step 2: Create `glasgow.ts`**

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

- [ ] **Step 3: Create `somerset.ts`**

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

- [ ] **Step 4: Create `elizabethtown.ts`**

```ts
// src/content/cities/kentucky/elizabethtown.ts
// NOTE: This city has no active trucks at launch. The page renders with noindex
// until at least one truck's zipcode resolves to Elizabethtown.
import type { CityContent } from '@/lib/content/types';

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

- [ ] **Step 5: Create `owensboro.ts`**

```ts
// src/content/cities/kentucky/owensboro.ts
// NOTE: This city has no active trucks at launch. The page renders with noindex
// until at least one truck's zipcode resolves to Owensboro.
import type { CityContent } from '@/lib/content/types';

export const owensboro: CityContent = {
  slug: 'owensboro',
  name: 'Owensboro',
  stateSlug: 'kentucky',
  stateName: 'Kentucky',
  stateAbbr: 'KY',

  // TODO: ADD CONTENT
  metaDescription:
    'Find food trucks in Owensboro, Kentucky. Real-time locations, menus, and schedules.',

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

- [ ] **Step 6: Verify**

```bash
npm run lint
```
Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add src/content/cities/kentucky/
git commit -m "Add Kentucky city content stubs (5 cities)"
```

### Task 2.5: Create city and state loaders

**Files:**
- Create: `src/content/cities/index.ts`
- Create: `src/content/states/index.ts`

- [ ] **Step 1: Create `cities/index.ts`**

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

export function getAllCityRoutes(): Array<{ state: string; city: string }> {
  return ALL_CITIES.map((c) => ({ state: c.stateSlug, city: c.slug }));
}

export function getCitiesByState(stateSlug: string): CityContent[] {
  return ALL_CITIES.filter((c) => c.stateSlug === stateSlug);
}
```

- [ ] **Step 2: Create `states/index.ts`**

```ts
// src/content/states/index.ts
import type { StateContent } from '@/lib/content/types';
import { kentucky } from './kentucky';

export const ALL_STATES: StateContent[] = [kentucky];

export function getStateContent(stateSlug: string): StateContent | null {
  return ALL_STATES.find((s) => s.slug === stateSlug) ?? null;
}

export function getAllStateRoutes(): Array<{ state: string }> {
  return ALL_STATES.map((s) => ({ state: s.slug }));
}
```

- [ ] **Step 3: Verify**

```bash
npm run lint
```
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/content/cities/index.ts src/content/states/index.ts
git commit -m "Add city and state content loaders"
```

### Task 2.6: Create home content

**Files:**
- Create: `src/content/home.ts`

- [ ] **Step 1: Create the file**

```ts
// src/content/home.ts
import type { FaqItem } from '@/lib/content/types';

// TODO: ADD CONTENT — 4-6 general FAQs. These are app-level, not city-specific.
// Make answers helpful enough to be eligible for FAQ rich snippets in SERP.
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

// TODO: ADD CONTENT — 3-step explainer, ~50 words each.
export const HOW_IT_WORKS: Array<{ title: string; body: string }> = [
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

- [ ] **Step 2: Verify**

```bash
npm run lint
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/content/home.ts
git commit -m "Add home page FAQ and how-it-works content"
```

---

## Phase 3: Server-Side Data Layer

### Task 3.1: Create server-only API wrappers

**Files:**
- Create: `src/lib/api/server.ts`

The existing `src/utils/api.ts` uses axios with an auth interceptor — fine for the browser, unnecessary on the server. Server wrappers use `fetch` with Next's caching primitives. All fetch failures are **swallowed** so the build succeeds even when the backend is unreachable.

- [ ] **Step 1: Inspect the backend env var being used**

```bash
grep -r "NEXT_PUBLIC_API_BASE_URL\|NEXT_PUBLIC_STORAGE_PREFIX\|baseURL" src/utils/ src/lib/ 2>/dev/null | head -10
```
Note the env var names. The wrapper will use `NEXT_PUBLIC_API_BASE_URL` for the API and `NEXT_PUBLIC_STORAGE_PREFIX` for image paths. If your axios config uses a different name, swap it in below.

- [ ] **Step 2: Create the file**

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

async function safeFetchJson<T>(
  url: string,
  next: { revalidate?: number; tags?: string[] }
): Promise<T | null> {
  try {
    const res = await fetch(url, { next });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export function fetchTruckDetails(truckId: string): Promise<TruckDetailResponse | null> {
  return safeFetchJson<TruckDetailResponse>(`${API_BASE}/api/v1/Truck/${truckId}`, {
    revalidate: 300,
    tags: [`truck:${truckId}`],
  });
}

export function getTruckDetailsServer(
  truckId: string
): Promise<TruckDetailResponse | null> {
  return fetchTruckDetails(truckId);
}

export async function getTruckOccurrencesServer(
  truckId: string,
  startLocal: string,
  endLocal: string
): Promise<TruckOccurrence[]> {
  const url = `${API_BASE}/api/v1/Truck/${truckId}/Schedule/Occurrences?startLocal=${encodeURIComponent(startLocal)}&endLocal=${encodeURIComponent(endLocal)}`;
  const result = await safeFetchJson<TruckOccurrence[]>(url, {
    revalidate: 300,
    tags: [`truck:${truckId}`],
  });
  return result ?? [];
}

export async function getTruckMenuServer(
  truckId: string,
  menuId: number
): Promise<Menu | null> {
  const url = `${API_BASE}/api/v1/Truck/${truckId}/Menu?menuId=${menuId}`;
  const data = await safeFetchJson<Menu | Menu[]>(url, {
    revalidate: 600,
    tags: [`truck:${truckId}`],
  });
  if (!data) return null;
  // API may return an array; normalize to single Menu
  if (Array.isArray(data)) {
    const first = data[0];
    if (!first) return null;
    return {
      id: menuId,
      truckId: Number(truckId),
      name: '',
      description: null,
      categories: first.categories,
      isDefault: true,
      imageUri: first.imageUri,
    };
  }
  return data;
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

- [ ] **Step 3: Check that `TruckDetailResponse` has a `zipcode` field**

```bash
grep -n "zipcode" src/types/api.ts
```
Expected: at least one match showing `zipcode` is a field on `TruckDetailResponse`. If missing, add it to the type:
```ts
zipcode?: string | null;
```

- [ ] **Step 4: Verify**

```bash
npm run lint
```
Expected: no errors. If there are type errors about missing fields on `TruckDetailResponse`, check `src/types/api.ts` and add them — they're already returned by the API per the existing client-side usage.

- [ ] **Step 5: Commit**

```bash
git add src/lib/api/server.ts
git commit -m "Add server-only data layer with cached truck enrichment"
```

---

## Phase 4: Truck Profile SSR Conversion

The biggest single SEO unlock. After this phase, every truck profile is server-rendered with metadata, JSON-LD, breadcrumbs, and a real 404 status for missing trucks.

### Task 4.1: Create Breadcrumb component

**Files:**
- Create: `src/components/Breadcrumb/Breadcrumb.tsx`
- Create: `src/components/Breadcrumb/Breadcrumb.module.css`
- Create: `src/components/Breadcrumb/index.ts`

- [ ] **Step 1: Create `Breadcrumb.tsx`**

```tsx
// src/components/Breadcrumb/Breadcrumb.tsx
import Link from 'next/link';
import styles from './Breadcrumb.module.css';

export type BreadcrumbItem = { name: string; path: string };

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className={styles.nav}>
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.path} className={styles.item}>
              {isLast ? (
                <span className={styles.current} aria-current="page">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link href={item.path} className={styles.link}>
                    {item.name}
                  </Link>
                  <span className={styles.sep} aria-hidden="true">
                    {' › '}
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
```

- [ ] **Step 2: Create `Breadcrumb.module.css`**

```css
.nav {
  padding: 1rem 1.5rem;
  font-size: 0.875rem;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.item {
  display: inline-flex;
  align-items: center;
}

.link {
  color: var(--brand-orange, #ED6A00);
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

.current {
  color: #444;
  font-weight: 500;
}

.sep {
  color: #888;
  margin: 0 0.4rem;
}
```

- [ ] **Step 3: Create `index.ts`**

```ts
export { default as Breadcrumb } from './Breadcrumb';
export type { BreadcrumbItem } from './Breadcrumb';
```

- [ ] **Step 4: Verify**

```bash
npm run lint
```
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/Breadcrumb/
git commit -m "Add Breadcrumb component"
```

### Task 4.2: Create TruckCard component

**Files:**
- Create: `src/components/TruckCard/TruckCard.tsx`
- Create: `src/components/TruckCard/TruckCard.module.css`
- Create: `src/components/TruckCard/index.ts`

Server component. Renders a truck preview card with a link to `/truck/[id]`. Uses inline `background-image` for the hero image (matches existing pattern; avoids `next.config.ts` `remotePatterns` work).

- [ ] **Step 1: Create `TruckCard.tsx`**

```tsx
// src/components/TruckCard/TruckCard.tsx
// Server component. Status badge ("Open now" / "Opens Fri 11am") is computed
// server-side from occurrences and refreshed by ISR.
import Link from 'next/link';
import type { EnrichedTruck } from '@/lib/api/server';
import type { TruckOccurrence } from '@/types/api';
import styles from './TruckCard.module.css';

const STORAGE_PREFIX = process.env.NEXT_PUBLIC_STORAGE_PREFIX ?? '';

function imageUrl(uri: string | null | undefined): string | null {
  if (!uri) return null;
  if (uri.startsWith('http')) return uri;
  return `${STORAGE_PREFIX}${uri}`;
}

type StatusInfo = { label: string; kind: 'open' | 'soon' | 'closed' };

function computeStatus(
  occurrences: TruckOccurrence[],
  now: Date = new Date()
): StatusInfo {
  const upcoming = [...occurrences].sort(
    (a, b) => new Date(a.openTimeLocal).getTime() - new Date(b.openTimeLocal).getTime()
  );

  for (const occ of upcoming) {
    if (occ.isClosed) continue;
    const open = new Date(occ.openTimeLocal);
    const close = new Date(occ.closeTimeLocal);
    if (now >= open && now < close) return { label: 'Open now', kind: 'open' };
    const minsUntilOpen = (open.getTime() - now.getTime()) / 60000;
    if (minsUntilOpen > 0 && minsUntilOpen <= 60) {
      return { label: 'Opening soon', kind: 'soon' };
    }
    if (minsUntilOpen > 0) {
      const day = open.toLocaleDateString('en-US', { weekday: 'short' });
      const time = open.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
      return { label: `Opens ${day} ${time}`, kind: 'closed' };
    }
  }
  return { label: 'Closed', kind: 'closed' };
}

type TruckCardProps = {
  truck: EnrichedTruck;
  occurrences?: TruckOccurrence[];
};

export default function TruckCard({ truck, occurrences = [] }: TruckCardProps) {
  const hero = imageUrl(truck.images?.[0]?.imageUri);
  const status = computeStatus(occurrences);
  const altLocation = truck.location?.city ?? 'Kentucky';

  return (
    <Link href={`/truck/${truck.id}`} className={styles.card} aria-label={truck.name}>
      <div
        className={styles.hero}
        style={hero ? { backgroundImage: `url(${hero})` } : undefined}
        role="img"
        aria-label={`${truck.name} food truck in ${altLocation}`}
      />
      <div className={styles.body}>
        <h3 className={styles.name}>{truck.name}</h3>
        {truck.cuisine && <p className={styles.cuisine}>{truck.cuisine}</p>}
        <span className={`${styles.badge} ${styles[`badge-${status.kind}`]}`}>
          {status.label}
        </span>
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Create `TruckCard.module.css`**

```css
.card {
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  text-decoration: none;
  color: inherit;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.hero {
  aspect-ratio: 4 / 3;
  background-color: #f3f3f3;
  background-size: cover;
  background-position: center;
}

.body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.name {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
}

.cuisine {
  margin: 0;
  font-size: 0.875rem;
  color: #666;
}

.badge {
  display: inline-block;
  align-self: flex-start;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.badge-open {
  background: #1f8a3f;
  color: white;
}

.badge-soon {
  background: #ED6A00;
  color: white;
}

.badge-closed {
  background: #eee;
  color: #555;
}
```

- [ ] **Step 3: Create `index.ts`**

```ts
export { default as TruckCard } from './TruckCard';
```

- [ ] **Step 4: Verify**

```bash
npm run lint
```
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/TruckCard/
git commit -m "Add server-rendered TruckCard component"
```

### Task 4.3: Extract TruckProfileClient from existing page

**Files:**
- Create: `src/app/truck/[truckId]/TruckProfileClient.tsx`
- Reference (don't modify yet): `src/app/truck/[truckId]/page.tsx`

This task **only** creates the new client component. The page rewrite happens in Task 4.4.

- [ ] **Step 1: Read the existing page**

```bash
cat src/app/truck/[truckId]/page.tsx | wc -l
```
Expected: ~700 lines.

- [ ] **Step 2: Create `TruckProfileClient.tsx`**

This is the existing page's UI logic with the data-fetching `useEffect` calls removed — data now arrives as props. Copy the existing page contents into `TruckProfileClient.tsx`, then make these specific changes:

1. Keep `'use client';` at the top.
2. Replace the props interface:
   ```tsx
   import type { TruckDetailResponse, TruckOccurrence, Menu } from '@/types/api';
   import type { CityLocation } from '@/lib/location/zipcode';

   interface TruckProfileClientProps {
     truck: TruckDetailResponse;
     initialOccurrences: TruckOccurrence[];
     initialDefaultMenu: Menu | null;
     location: CityLocation | null;
   }

   export default function TruckProfileClient({
     truck,
     initialOccurrences,
     initialDefaultMenu,
     location,
   }: TruckProfileClientProps) {
   ```
3. Remove the data-fetching useEffects (the three that call `getTruckDetails`, `getTruckOccurrences`, `getTruckMenu`) AND the loading/error state for those fetches.
4. Replace the `useState` initializers for `truckData`, `futureOccurrences`, `defaultMenu`, `loading`, `error`, `truckId` with values derived from props:
   ```tsx
   const truckData = truck;
   const [futureOccurrences, setFutureOccurrences] = useState<TruckOccurrence[]>(initialOccurrences);
   const [defaultMenu, setDefaultMenu] = useState<Menu | null>(initialDefaultMenu);
   const truckId = String(truck.id);
   ```
   (We keep `setFutureOccurrences` / `setDefaultMenu` declared in case the component later needs to refetch — not required at launch but harmless.)
5. Remove the `if (loading)` and `if (error || !truckData)` branches that returned the skeleton and error UI. The error UI moves to `not-found.tsx` in Task 4.5.
6. Remove the `import` for `TruckProfileSkeleton` and `getTruckDetails`/`getTruckOccurrences`/`getTruckMenu`.
7. Remove the `useEffect` that detects user device — actually, KEEP this one, it's for the modal CTA.
8. The component's initial date pick depends on a `useEffect`. Replace with a synchronous initializer:
   ```tsx
   const [selectedDate, setSelectedDate] = useState<string>(() => {
     const today = new Date();
     const y = today.getFullYear();
     const m = String(today.getMonth() + 1).padStart(2, '0');
     const d = String(today.getDate()).padStart(2, '0');
     return `${y}-${m}-${d}`;
   });
   ```

If you find the diff confusing, copy `src/app/truck/[truckId]/page.tsx` verbatim, then walk top-to-bottom applying changes 1-8 above. Read each chunk you remove to be sure it's safe.

- [ ] **Step 3: Verify**

```bash
npm run lint
```
Expected: no errors. The new file exists but isn't imported by anything yet.

- [ ] **Step 4: Commit**

```bash
git add src/app/truck/[truckId]/TruckProfileClient.tsx
git commit -m "Extract TruckProfileClient from truck profile page"
```

### Task 4.4: Rewrite truck page.tsx as server component

**Files:**
- Overwrite: `src/app/truck/[truckId]/page.tsx`

- [ ] **Step 1: Replace the entire file contents**

```tsx
// src/app/truck/[truckId]/page.tsx
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
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
import { Breadcrumb, type BreadcrumbItem } from '@/components/Breadcrumb';
import TruckProfileClient from './TruckProfileClient';

const STORAGE_PREFIX = process.env.NEXT_PUBLIC_STORAGE_PREFIX ?? '';

export const revalidate = 300;

type PageProps = { params: Promise<{ truckId: string }> };

function todayLocalISO(): string {
  return new Date().toISOString().split('T')[0];
}

function in30DaysISO(): string {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().split('T')[0];
}

function truncate(s: string, max: number): string {
  if (s.length <= max) return s;
  return s.slice(0, max - 1).trimEnd() + '…';
}

function heroImageMeta(truck: { images?: Array<{ imageUri?: string | null }> | null }) {
  const uri = truck.images?.[0]?.imageUri;
  if (!uri) return undefined;
  const url = uri.startsWith('http') ? uri : `${STORAGE_PREFIX}${uri}`;
  return { url, width: 1200, height: 630, alt: 'Food truck' };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { truckId } = await params;
  const truck = await getTruckDetailsServer(truckId);
  if (!truck) return { robots: { index: false, follow: false } };

  const location = cityFromZipcode(truck.zipcode);
  const locationSuffix = location
    ? ` — Food Truck in ${location.city}, ${location.state}`
    : '';

  const description = truncate(
    truck.description ??
      `${truck.name} is a food truck${
        location ? ` operating in ${location.city}, ${location.state}` : ''
      }. View their menu, hours, and upcoming schedule on StreetFeast.`,
    160
  );

  return buildMetadata({
    title: `${truck.name}${locationSuffix}`,
    description,
    path: `/truck/${truckId}`,
    image: heroImageMeta(truck),
  });
}

export default async function TruckPage({ params }: PageProps) {
  const { truckId } = await params;
  const truck = await getTruckDetailsServer(truckId);
  if (!truck) notFound();

  const [occurrences, defaultMenu] = await Promise.all([
    getTruckOccurrencesServer(truckId, todayLocalISO(), in30DaysISO()),
    truck.defaultMenuId
      ? getTruckMenuServer(truckId, truck.defaultMenuId)
      : Promise.resolve(null),
  ]);

  const location = cityFromZipcode(truck.zipcode);

  const crumbs: BreadcrumbItem[] = [
    { name: 'Home', path: '/' },
    { name: 'Food Trucks', path: '/food-trucks' },
    ...(location
      ? [
          { name: location.stateName, path: `/food-trucks/${location.stateSlug}` },
          {
            name: location.city,
            path: `/food-trucks/${location.stateSlug}/${location.citySlug}`,
          },
        ]
      : []),
    { name: truck.name, path: `/truck/${truckId}` },
  ];

  return (
    <>
      <JsonLd
        data={foodEstablishmentJsonLd(truck, location, occurrences, STORAGE_PREFIX)}
      />
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

- [ ] **Step 2: Verify build**

```bash
npm run lint
npm run build
```
Expected: both succeed. The page now builds as a server component.

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```
In another terminal:
```bash
curl -s "http://localhost:3000/truck/<a-real-truck-id>" | grep -i "<title>"
curl -s "http://localhost:3000/truck/<a-real-truck-id>" | grep -i "FoodEstablishment"
curl -s "http://localhost:3000/truck/<a-real-truck-id>" | grep -i "BreadcrumbList"
```
Expected:
- `<title>` includes the truck's name (not just "StreetFeast")
- `FoodEstablishment` JSON-LD appears in the HTML
- `BreadcrumbList` JSON-LD appears in the HTML

If you don't have a real truck ID handy, use any ID from the existing app or DB. Stop the dev server with Ctrl+C.

- [ ] **Step 4: Commit**

```bash
git add src/app/truck/[truckId]/page.tsx
git commit -m "Convert truck profile to server component with metadata and JSON-LD"
```

### Task 4.5: Add not-found.tsx for truck route

**Files:**
- Create: `src/app/truck/[truckId]/not-found.tsx`

The existing page returned 200 + an error UI on missing trucks (soft-404). Now `notFound()` triggers Next's not-found.tsx which returns proper 404.

- [ ] **Step 1: Create the file**

The visual should match the existing "Oops! We couldn't find this truck" UI. Salvage that block from the old `page.tsx` git history (or recreate it):

```tsx
// src/app/truck/[truckId]/not-found.tsx
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export default function TruckNotFound() {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <div className={styles.errorIcon}>
          <Image
            src="/streetfeastlogowhite.png"
            alt="StreetFeast"
            width={120}
            height={120}
          />
        </div>
        <h1 className={styles.errorTitle}>Oops! We couldn&apos;t find this truck</h1>
        <p className={styles.errorMessage}>
          This food truck might have moved locations or is no longer available.
          Don&apos;t worry — there are plenty more delicious options waiting for you!
        </p>
        <div className={styles.errorActions}>
          <Link href="/food-trucks/kentucky" className={styles.primaryButton}>
            Find Other Trucks
          </Link>
        </div>
        <div className={styles.errorBranding}>
          <span className={styles.brandText}>Street</span>
          <span className={styles.brandTextAccent}>Feast</span>
        </div>
        <p className={styles.errorSubtext}>
          Discover street food vendors, food trucks &amp; pop-ups near you
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify the referenced CSS classes still exist**

```bash
grep -E "errorContainer|errorContent|errorIcon|errorTitle|errorMessage|errorActions|primaryButton|errorBranding|brandText|brandTextAccent|errorSubtext" src/app/truck/[truckId]/page.module.css
```
Expected: every class name appears. If any are missing, copy their definitions from the existing CSS file (they may have been removed when the old error UI was deleted — in that case the styles still need to live in `page.module.css`).

- [ ] **Step 3: Verify build**

```bash
npm run lint
npm run build
```
Expected: succeeds.

- [ ] **Step 4: Verify 404 status**

```bash
npm run dev
```
Another terminal:
```bash
curl -s -o /dev/null -w "%{http_code}\n" "http://localhost:3000/truck/this-id-does-not-exist"
```
Expected: `404`.

- [ ] **Step 5: Commit**

```bash
git add src/app/truck/[truckId]/not-found.tsx
git commit -m "Add proper 404 page for missing trucks"
```

### Task 4.6: Add "More trucks in [city]" cross-link block

**Files:**
- Create: `src/components/RelatedTrucks/RelatedTrucks.tsx`
- Create: `src/components/RelatedTrucks/RelatedTrucks.module.css`
- Create: `src/components/RelatedTrucks/index.ts`
- Modify: `src/app/truck/[truckId]/page.tsx`

- [ ] **Step 1: Create `RelatedTrucks.tsx`**

```tsx
// src/components/RelatedTrucks/RelatedTrucks.tsx
// Server component. Renders up to 6 other trucks from the same city.
import Link from 'next/link';
import { getTrucksByCity, getTruckOccurrencesServer } from '@/lib/api/server';
import { TruckCard } from '@/components/TruckCard';
import type { CityLocation } from '@/lib/location/zipcode';
import styles from './RelatedTrucks.module.css';

type RelatedTrucksProps = {
  location: CityLocation;
  excludeId: string;
};

function todayLocalISO(): string {
  return new Date().toISOString().split('T')[0];
}

function in30DaysISO(): string {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().split('T')[0];
}

export default async function RelatedTrucks({ location, excludeId }: RelatedTrucksProps) {
  const all = await getTrucksByCity(location.stateSlug, location.citySlug);
  const others = all.filter((t) => String(t.id) !== excludeId).slice(0, 6);

  if (others.length === 0) return null;

  // Fetch occurrences in parallel for status badges.
  const start = todayLocalISO();
  const end = in30DaysISO();
  const truckOccurrences = await Promise.all(
    others.map((t) => getTruckOccurrencesServer(String(t.id), start, end))
  );

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>More food trucks in {location.city}</h2>
      <div className={styles.grid}>
        {others.map((truck, i) => (
          <TruckCard key={truck.id} truck={truck} occurrences={truckOccurrences[i]} />
        ))}
      </div>
      <Link
        href={`/food-trucks/${location.stateSlug}/${location.citySlug}`}
        className={styles.viewAll}
      >
        View all {location.city} food trucks →
      </Link>
    </section>
  );
}
```

- [ ] **Step 2: Create `RelatedTrucks.module.css`**

```css
.section {
  padding: 2rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.heading {
  font-size: 1.5rem;
  margin: 0 0 1.5rem 0;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.viewAll {
  display: inline-block;
  color: #ED6A00;
  font-weight: 600;
  text-decoration: none;
}

.viewAll:hover {
  text-decoration: underline;
}
```

- [ ] **Step 3: Create `index.ts`**

```ts
export { default as RelatedTrucks } from './RelatedTrucks';
```

- [ ] **Step 4: Wire into the truck page**

In `src/app/truck/[truckId]/page.tsx`, add the import:
```tsx
import { RelatedTrucks } from '@/components/RelatedTrucks';
```

And render it at the bottom of the page, inside the fragment after `<TruckProfileClient ... />`:
```tsx
      {location && (
        <RelatedTrucks location={location} excludeId={truckId} />
      )}
    </>
  );
}
```

- [ ] **Step 5: Verify**

```bash
npm run lint
npm run build
```
Expected: succeeds.

```bash
npm run dev
```
Visit a truck profile in the browser. Confirm "More food trucks in [city]" appears below the existing UI when the truck has a city. (Will appear empty / not render if there are no other trucks in the city yet — that's correct behavior.)

- [ ] **Step 6: Commit**

```bash
git add src/components/RelatedTrucks/ src/app/truck/[truckId]/page.tsx
git commit -m "Add RelatedTrucks cross-link block to truck profile"
```

---

## Phase 5: Location Pages

### Task 5.1: Create reusable Faq accordion

**Files:**
- Create: `src/components/Faq/Faq.tsx`
- Create: `src/components/Faq/Faq.module.css`
- Create: `src/components/Faq/index.ts`

- [ ] **Step 1: Create `Faq.tsx`**

```tsx
// src/components/Faq/Faq.tsx
'use client';

import { useState } from 'react';
import type { FaqItem } from '@/lib/content/types';
import styles from './Faq.module.css';

export default function Faq({ items, heading }: { items: FaqItem[]; heading?: string }) {
  const [open, setOpen] = useState<number | null>(null);

  if (items.length === 0) return null;

  return (
    <section className={styles.section}>
      {heading && <h2 className={styles.heading}>{heading}</h2>}
      <dl className={styles.list}>
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className={styles.item}>
              <dt>
                <button
                  type="button"
                  className={styles.question}
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{item.q}</span>
                  <span aria-hidden="true" className={styles.icon}>
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
              </dt>
              {isOpen && (
                <dd className={styles.answer}>
                  <p>{item.a}</p>
                </dd>
              )}
            </div>
          );
        })}
      </dl>
    </section>
  );
}
```

- [ ] **Step 2: Create `Faq.module.css`**

```css
.section {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.heading {
  font-size: 1.75rem;
  margin: 0 0 1.5rem 0;
}

.list {
  margin: 0;
}

.item {
  border-bottom: 1px solid #e5e5e5;
}

.question {
  width: 100%;
  background: none;
  border: 0;
  text-align: left;
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.0625rem;
  font-weight: 600;
  color: #222;
  cursor: pointer;
  font-family: inherit;
}

.icon {
  font-size: 1.5rem;
  color: #ED6A00;
  margin-left: 1rem;
}

.answer {
  padding: 0 0 1rem 0;
  margin: 0;
  color: #444;
  line-height: 1.6;
}

.answer p {
  margin: 0;
}
```

- [ ] **Step 3: Create `index.ts`**

```ts
export { default as Faq } from './Faq';
```

- [ ] **Step 4: Verify**

```bash
npm run lint
```
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/Faq/
git commit -m "Add reusable Faq accordion component"
```

### Task 5.2: Create EmptyCityState component

**Files:**
- Create: `src/components/EmptyCityState/EmptyCityState.tsx`
- Create: `src/components/EmptyCityState/EmptyCityState.module.css`
- Create: `src/components/EmptyCityState/index.ts`

- [ ] **Step 1: Create `EmptyCityState.tsx`**

```tsx
// src/components/EmptyCityState/EmptyCityState.tsx
import Link from 'next/link';
import styles from './EmptyCityState.module.css';

export default function EmptyCityState({ cityName }: { cityName: string }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Be the first food truck in {cityName}</h2>
      <p className={styles.body}>
        We don&apos;t have any food trucks listed in {cityName} yet. If you operate
        a food truck or know one we should add, register and we&apos;ll get you
        on the map.
      </p>
      <Link href="/register-truck" className={styles.cta}>
        Register your food truck
      </Link>
    </section>
  );
}
```

- [ ] **Step 2: Create `EmptyCityState.module.css`**

```css
.section {
  text-align: center;
  padding: 3rem 1.5rem;
  max-width: 600px;
  margin: 2rem auto;
  background: #fafafa;
  border-radius: 12px;
}

.heading {
  font-size: 1.5rem;
  margin: 0 0 1rem 0;
}

.body {
  color: #555;
  margin: 0 0 1.5rem 0;
  line-height: 1.5;
}

.cta {
  display: inline-block;
  background: #ED6A00;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
}

.cta:hover {
  background: #d35e00;
}
```

- [ ] **Step 3: Create `index.ts`**

```ts
export { default as EmptyCityState } from './EmptyCityState';
```

- [ ] **Step 4: Verify and commit**

```bash
npm run lint
git add src/components/EmptyCityState/
git commit -m "Add EmptyCityState component"
```

### Task 5.3: Create NearbyCities component

**Files:**
- Create: `src/components/NearbyCities/NearbyCities.tsx`
- Create: `src/components/NearbyCities/NearbyCities.module.css`
- Create: `src/components/NearbyCities/index.ts`

- [ ] **Step 1: Create `NearbyCities.tsx`**

```tsx
// src/components/NearbyCities/NearbyCities.tsx
import Link from 'next/link';
import type { CityContent } from '@/lib/content/types';
import styles from './NearbyCities.module.css';

type Props = {
  cities: CityContent[];
  stateSlug: string;
};

export default function NearbyCities({ cities, stateSlug }: Props) {
  if (cities.length === 0) return null;
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Other Kentucky cities</h2>
      <ul className={styles.list}>
        {cities.map((city) => (
          <li key={city.slug}>
            <Link
              href={`/food-trucks/${stateSlug}/${city.slug}`}
              className={styles.link}
            >
              {city.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

- [ ] **Step 2: Create `NearbyCities.module.css`**

```css
.section {
  padding: 2rem 1.5rem;
  max-width: 1000px;
  margin: 0 auto;
}

.heading {
  font-size: 1.25rem;
  margin: 0 0 1rem 0;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.link {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: #f3f3f3;
  border-radius: 999px;
  color: #ED6A00;
  text-decoration: none;
  font-weight: 500;
}

.link:hover {
  background: #ED6A00;
  color: white;
}
```

- [ ] **Step 3: Create `index.ts` and commit**

```ts
// src/components/NearbyCities/index.ts
export { default as NearbyCities } from './NearbyCities';
```

```bash
npm run lint
git add src/components/NearbyCities/
git commit -m "Add NearbyCities component"
```

### Task 5.4: Create NeighborhoodsBlock component

**Files:**
- Create: `src/components/NeighborhoodsBlock/NeighborhoodsBlock.tsx`
- Create: `src/components/NeighborhoodsBlock/NeighborhoodsBlock.module.css`
- Create: `src/components/NeighborhoodsBlock/index.ts`

- [ ] **Step 1: Create `NeighborhoodsBlock.tsx`**

```tsx
// src/components/NeighborhoodsBlock/NeighborhoodsBlock.tsx
import styles from './NeighborhoodsBlock.module.css';

type Props = {
  items: string[];
  cityName: string;
};

export default function NeighborhoodsBlock({ items, cityName }: Props) {
  if (items.length === 0) return null;
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Where to find food trucks in {cityName}</h2>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item} className={styles.item}>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
```

- [ ] **Step 2: Create `NeighborhoodsBlock.module.css`**

```css
.section {
  padding: 2rem 1.5rem;
  max-width: 1000px;
  margin: 0 auto;
}

.heading {
  font-size: 1.5rem;
  margin: 0 0 1rem 0;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.75rem;
}

.item {
  padding: 0.75rem 1rem;
  background: #fff;
  border-left: 4px solid #ED6A00;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
```

- [ ] **Step 3: Create `index.ts` and commit**

```ts
// src/components/NeighborhoodsBlock/index.ts
export { default as NeighborhoodsBlock } from './NeighborhoodsBlock';
```

```bash
npm run lint
git add src/components/NeighborhoodsBlock/
git commit -m "Add NeighborhoodsBlock component"
```

### Task 5.5: Create CitiesGrid component

**Files:**
- Create: `src/components/CitiesGrid/CitiesGrid.tsx`
- Create: `src/components/CitiesGrid/CitiesGrid.module.css`
- Create: `src/components/CitiesGrid/index.ts`

- [ ] **Step 1: Create `CitiesGrid.tsx`**

```tsx
// src/components/CitiesGrid/CitiesGrid.tsx
// Server component. Each card shows city name + active truck count.
import Link from 'next/link';
import type { CityContent } from '@/lib/content/types';
import { getTrucksByCity } from '@/lib/api/server';
import styles from './CitiesGrid.module.css';

type Props = {
  cities: CityContent[];
};

export default async function CitiesGrid({ cities }: Props) {
  const counts = await Promise.all(
    cities.map((c) => getTrucksByCity(c.stateSlug, c.slug, c.aliases ?? []))
  );

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Kentucky cities</h2>
      <div className={styles.grid}>
        {cities.map((city, i) => {
          const count = counts[i].length;
          return (
            <Link
              key={city.slug}
              href={`/food-trucks/${city.stateSlug}/${city.slug}`}
              className={styles.card}
            >
              <h3 className={styles.cityName}>{city.name}</h3>
              <p className={styles.count}>
                {count} active food truck{count === 1 ? '' : 's'}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `CitiesGrid.module.css`**

```css
.section {
  padding: 2rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.heading {
  font-size: 1.75rem;
  margin: 0 0 1.5rem 0;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}

.card {
  display: block;
  padding: 1.5rem;
  background: #fff;
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.cityName {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
}

.count {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}
```

- [ ] **Step 3: Create `index.ts` and commit**

```ts
// src/components/CitiesGrid/index.ts
export { default as CitiesGrid } from './CitiesGrid';
```

```bash
npm run lint
git add src/components/CitiesGrid/
git commit -m "Add CitiesGrid component"
```

### Task 5.6: Create national hub /food-trucks

**Files:**
- Create: `src/app/food-trucks/page.tsx`
- Create: `src/app/food-trucks/page.module.css`

- [ ] **Step 1: Create `page.tsx`**

```tsx
// src/app/food-trucks/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumb, type BreadcrumbItem } from '@/components/Breadcrumb';
import { JsonLd } from '@/lib/seo/JsonLd';
import { breadcrumbJsonLd, itemListJsonLd } from '@/lib/seo/jsonld';
import { buildMetadata } from '@/lib/seo/metadata';
import { ALL_STATES } from '@/content/states';
import styles from './page.module.css';

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: 'Food Trucks — Find Street Food Across the United States',
  description:
    'Browse food trucks by state and city. Real-time locations, menus, and schedules from StreetFeast.',
  path: '/food-trucks',
});

const crumbs: BreadcrumbItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Food Trucks', path: '/food-trucks' },
];

export default function FoodTrucksHub() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd
        data={itemListJsonLd(
          'States with food trucks on StreetFeast',
          ALL_STATES.map((s) => ({
            url: `/food-trucks/${s.slug}`,
            name: s.name,
          }))
        )}
      />
      <Header />
      <main className={styles.main}>
        <Breadcrumb items={crumbs} />
        <h1 className={styles.h1}>Food Trucks</h1>
        <p className={styles.lede}>
          Find food trucks near you. Browse by state to see active vendors,
          their schedules, and what they&apos;re serving.
        </p>
        <h2 className={styles.h2}>States</h2>
        <ul className={styles.statesList}>
          {ALL_STATES.map((state) => (
            <li key={state.slug}>
              <Link
                href={`/food-trucks/${state.slug}`}
                className={styles.stateLink}
              >
                {state.name}
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Create `page.module.css`**

```css
.main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
}

.h1 {
  font-size: 2.5rem;
  margin: 1rem 0 0.5rem 0;
}

.lede {
  font-size: 1.125rem;
  color: #555;
  margin: 0 0 2rem 0;
  max-width: 700px;
  line-height: 1.6;
}

.h2 {
  font-size: 1.5rem;
  margin: 2rem 0 1rem 0;
}

.statesList {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}

.stateLink {
  display: block;
  padding: 1.5rem;
  background: #fff;
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  font-size: 1.25rem;
  font-weight: 600;
}

.stateLink:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}
```

- [ ] **Step 3: Verify**

```bash
npm run lint
npm run build
```
Expected: succeeds.

```bash
npm run dev
curl -s "http://localhost:3000/food-trucks" | grep -E "<title>|BreadcrumbList|Kentucky"
```
Expected: title contains "Food Trucks", JSON-LD present, Kentucky link rendered.

- [ ] **Step 4: Commit**

```bash
git add src/app/food-trucks/page.tsx src/app/food-trucks/page.module.css
git commit -m "Add national food trucks hub page"
```

### Task 5.7: Create state hub /food-trucks/[state]

**Files:**
- Create: `src/app/food-trucks/[state]/page.tsx`
- Create: `src/app/food-trucks/[state]/page.module.css`

- [ ] **Step 1: Create `page.tsx`**

```tsx
// src/app/food-trucks/[state]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumb, type BreadcrumbItem } from '@/components/Breadcrumb';
import { CitiesGrid } from '@/components/CitiesGrid';
import { TruckCard } from '@/components/TruckCard';
import { Faq } from '@/components/Faq';
import { JsonLd } from '@/lib/seo/JsonLd';
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  itemListJsonLd,
} from '@/lib/seo/jsonld';
import { buildMetadata } from '@/lib/seo/metadata';
import {
  getStateContent,
  getAllStateRoutes,
} from '@/content/states';
import { getCitiesByState } from '@/content/cities';
import { getTrucksByState, getTruckOccurrencesServer } from '@/lib/api/server';
import styles from './page.module.css';

export const dynamicParams = false;
export const revalidate = 3600;

type PageProps = { params: Promise<{ state: string }> };

export async function generateStaticParams() {
  return getAllStateRoutes();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state } = await params;
  const content = getStateContent(state);
  if (!content) return { robots: { index: false, follow: false } };
  return buildMetadata({
    title: `Food Trucks in ${content.name} — Find Street Food Across ${content.abbreviation}`,
    description: content.metaDescription,
    path: `/food-trucks/${state}`,
  });
}

function todayISO(): string {
  return new Date().toISOString().split('T')[0];
}
function in30DaysISO(): string {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().split('T')[0];
}

export default async function StateHub({ params }: PageProps) {
  const { state } = await params;
  const content = getStateContent(state);
  if (!content) notFound();

  const cities = getCitiesByState(state);
  const allTrucksInState = await getTrucksByState(state);
  const featured = allTrucksInState.filter((t) => t.isFeatured).slice(0, 6);

  const start = todayISO();
  const end = in30DaysISO();
  const featuredOccurrences = await Promise.all(
    featured.map((t) => getTruckOccurrencesServer(String(t.id), start, end))
  );

  const crumbs: BreadcrumbItem[] = [
    { name: 'Home', path: '/' },
    { name: 'Food Trucks', path: '/food-trucks' },
    { name: content.name, path: `/food-trucks/${state}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      {cities.length > 0 && (
        <JsonLd
          data={itemListJsonLd(
            `${content.name} cities with food trucks`,
            cities.map((c) => ({
              url: `/food-trucks/${state}/${c.slug}`,
              name: c.name,
            }))
          )}
        />
      )}
      {content.faq.length > 0 && <JsonLd data={faqPageJsonLd(content.faq)} />}
      <Header />
      <main className={styles.main}>
        <Breadcrumb items={crumbs} />
        <h1 className={styles.h1}>Food Trucks in {content.name}</h1>
        <div className={styles.intro}>
          {content.intro.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {featured.length > 0 && (
          <section className={styles.featured}>
            <h2 className={styles.h2}>Featured trucks</h2>
            <div className={styles.featuredGrid}>
              {featured.map((truck, i) => (
                <TruckCard
                  key={truck.id}
                  truck={truck}
                  occurrences={featuredOccurrences[i]}
                />
              ))}
            </div>
          </section>
        )}

        {cities.length > 0 && <CitiesGrid cities={cities} />}

        <Faq items={content.faq} heading={`${content.name} food truck FAQ`} />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Create `page.module.css`**

```css
.main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
}

.h1 {
  font-size: 2.5rem;
  margin: 1rem 0 1rem 0;
}

.intro {
  font-size: 1.0625rem;
  color: #333;
  line-height: 1.65;
  max-width: 800px;
  margin: 0 0 2rem 0;
}

.intro p {
  margin: 0 0 1rem 0;
}

.h2 {
  font-size: 1.75rem;
  margin: 0 0 1.5rem 0;
}

.featured {
  padding: 2rem 0;
}

.featuredGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
}
```

- [ ] **Step 3: Verify**

```bash
npm run lint
npm run build
```
Expected: succeeds.

```bash
npm run dev
curl -s "http://localhost:3000/food-trucks/kentucky" | grep -E "<title>|BreadcrumbList|Bowling Green"
```
Expected: title contains "Kentucky", JSON-LD present, "Bowling Green" appears (from the city grid).

- [ ] **Step 4: Commit**

```bash
git add src/app/food-trucks/[state]/page.tsx src/app/food-trucks/[state]/page.module.css
git commit -m "Add state hub page"
```

### Task 5.8: Create city page /food-trucks/[state]/[city]

**Files:**
- Create: `src/app/food-trucks/[state]/[city]/page.tsx`
- Create: `src/app/food-trucks/[state]/[city]/page.module.css`

- [ ] **Step 1: Create `page.tsx`**

```tsx
// src/app/food-trucks/[state]/[city]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Breadcrumb, type BreadcrumbItem } from '@/components/Breadcrumb';
import { TruckCard } from '@/components/TruckCard';
import { EmptyCityState } from '@/components/EmptyCityState';
import { NearbyCities } from '@/components/NearbyCities';
import { NeighborhoodsBlock } from '@/components/NeighborhoodsBlock';
import { Faq } from '@/components/Faq';
import { JsonLd } from '@/lib/seo/JsonLd';
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  itemListJsonLd,
} from '@/lib/seo/jsonld';
import { buildMetadata } from '@/lib/seo/metadata';
import {
  getCityContent,
  getAllCityRoutes,
  getCitiesByState,
} from '@/content/cities';
import { getTrucksByCity, getTruckOccurrencesServer } from '@/lib/api/server';
import styles from './page.module.css';

export const dynamicParams = false;
export const revalidate = 3600;

type PageProps = { params: Promise<{ state: string; city: string }> };

export async function generateStaticParams() {
  return getAllCityRoutes();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state, city } = await params;
  const content = getCityContent(state, city);
  if (!content) return { robots: { index: false, follow: false } };
  const trucks = await getTrucksByCity(state, city, content.aliases ?? []);
  return buildMetadata({
    title: `${content.name} Food Trucks — Where to Find Street Food in ${content.stateName}`,
    description: content.metaDescription,
    path: `/food-trucks/${state}/${city}`,
    noindex: trucks.length === 0,
  });
}

function todayISO(): string {
  return new Date().toISOString().split('T')[0];
}
function in30DaysISO(): string {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().split('T')[0];
}

export default async function CityPage({ params }: PageProps) {
  const { state, city } = await params;
  const content = getCityContent(state, city);
  if (!content) notFound();

  const trucks = await getTrucksByCity(state, city, content.aliases ?? []);
  const otherCities = getCitiesByState(state).filter((c) => c.slug !== city);

  const start = todayISO();
  const end = in30DaysISO();
  const truckOccurrences = await Promise.all(
    trucks.map((t) => getTruckOccurrencesServer(String(t.id), start, end))
  );

  const crumbs: BreadcrumbItem[] = [
    { name: 'Home', path: '/' },
    { name: 'Food Trucks', path: '/food-trucks' },
    { name: content.stateName, path: `/food-trucks/${state}` },
    { name: content.name, path: `/food-trucks/${state}/${city}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      {trucks.length > 0 && (
        <JsonLd
          data={itemListJsonLd(
            `Food trucks in ${content.name}, ${content.stateName}`,
            trucks.map((t) => ({
              url: `/truck/${t.id}`,
              name: t.name,
            }))
          )}
        />
      )}
      {content.faq.length > 0 && <JsonLd data={faqPageJsonLd(content.faq)} />}
      <Header />
      <main className={styles.main}>
        <Breadcrumb items={crumbs} />
        <h1 className={styles.h1}>
          Food Trucks in {content.name}, {content.stateName}
        </h1>
        <div className={styles.intro}>
          {content.intro.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {trucks.length > 0 ? (
          <section className={styles.trucks}>
            <h2 className={styles.h2}>Active food trucks in {content.name}</h2>
            <div className={styles.truckGrid}>
              {trucks.map((truck, i) => (
                <TruckCard
                  key={truck.id}
                  truck={truck}
                  occurrences={truckOccurrences[i]}
                />
              ))}
            </div>
          </section>
        ) : (
          <EmptyCityState cityName={content.name} />
        )}

        {content.neighborhoods && content.neighborhoods.length > 0 && (
          <NeighborhoodsBlock items={content.neighborhoods} cityName={content.name} />
        )}

        {otherCities.length > 0 && (
          <NearbyCities cities={otherCities} stateSlug={state} />
        )}

        <Faq items={content.faq} heading={`${content.name} food truck FAQ`} />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Create `page.module.css`**

```css
.main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
}

.h1 {
  font-size: 2.25rem;
  margin: 1rem 0 1rem 0;
}

.intro {
  font-size: 1.0625rem;
  color: #333;
  line-height: 1.65;
  max-width: 800px;
  margin: 0 0 2rem 0;
}

.intro p {
  margin: 0 0 1rem 0;
}

.h2 {
  font-size: 1.75rem;
  margin: 0 0 1.5rem 0;
}

.trucks {
  padding: 2rem 0;
}

.truckGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
}
```

- [ ] **Step 3: Verify**

```bash
npm run lint
npm run build
```
Expected: succeeds. Build will pre-render all 5 city pages.

```bash
npm run dev
curl -s "http://localhost:3000/food-trucks/kentucky/bowling-green" | grep -E "<title>|BreadcrumbList|FAQPage"
curl -s -o /dev/null -w "%{http_code}\n" "http://localhost:3000/food-trucks/kentucky/not-a-real-city"
```
Expected:
- Bowling Green page: title contains "Bowling Green", JSON-LD includes BreadcrumbList and FAQPage
- Unknown city: returns `404` (because `dynamicParams = false`)

- [ ] **Step 4: Commit**

```bash
git add src/app/food-trucks/[state]/[city]/
git commit -m "Add city page with truck grid, neighborhoods, FAQ"
```

---

## Phase 6: Home Page

### Task 6.1: Update root layout metadata + sitewide JSON-LD

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Read the current file**

```bash
cat src/app/layout.tsx
```
Note the current structure so the changes integrate cleanly.

- [ ] **Step 2: Replace contents**

```tsx
// src/app/layout.tsx
import type { Metadata } from 'next';
import { Lexend } from 'next/font/google';
import './globals.css';
import { PostHogProvider, PostHogPageView } from '@posthog/next';
import { LayoutContent } from '@/components/LayoutContent';
import Providers from '@/components/Providers';
import CookieBanner from '@/components/CookieBanner';
import { POSTHOG_KEY } from '@/lib/posthog';
import FacebookPixel from '@/components/FacebookPixel';
import { JsonLd } from '@/lib/seo/JsonLd';
import { organizationJsonLd, websiteJsonLd } from '@/lib/seo/jsonld';

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-lexend',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://streetfeastapp.com'),
  title: {
    default: 'StreetFeast — Find Food Trucks Near You in Kentucky & Beyond',
    template: '%s | StreetFeast',
  },
  description:
    'Find food trucks, street vendors, and pop-up restaurants near you. Real-time locations, menus, and schedules across Kentucky — Bowling Green, Glasgow, Somerset, Elizabethtown, Owensboro, and more.',
  keywords: [
    'food trucks',
    'food trucks Kentucky',
    'food trucks Bowling Green',
    'street food',
    'food vendors',
    'pop-up restaurants',
    'food truck app',
    'food truck schedule',
  ],
  authors: [{ name: 'StreetFeast' }],
  creator: 'StreetFeast',
  publisher: 'StreetFeast',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'StreetFeast — Find Food Trucks Near You in Kentucky & Beyond',
    description:
      'Find food trucks, street vendors, and pop-up restaurants in your area. Real-time locations, menus, and schedules.',
    url: 'https://streetfeastapp.com',
    siteName: 'StreetFeast',
    images: [
      {
        url: '/social-media-logo.png',
        width: 1352,
        height: 632,
        alt: 'StreetFeast - Find Food Trucks',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StreetFeast — Find Food Trucks Near You',
    description:
      'Find food trucks and street vendors in your area. Real-time locations, menus, and schedules.',
    images: ['/social-media-logo.png'],
    creator: '@streetfeast',
  },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lexend.className}>
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <FacebookPixel />
        <PostHogProvider apiKey={POSTHOG_KEY} clientOptions={{ api_host: '/ingest' }}>
          <PostHogPageView />
          <Providers>
            <LayoutContent>{children}</LayoutContent>
          </Providers>
          <CookieBanner />
        </PostHogProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify**

```bash
npm run lint
npm run build
```
Expected: succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx
git commit -m "Update root metadata with Kentucky framing and sitewide JSON-LD"
```

### Task 6.2: Create HomeFeaturedCities

**Files:**
- Create: `src/components/HomeFeaturedCities/HomeFeaturedCities.tsx`
- Create: `src/components/HomeFeaturedCities/HomeFeaturedCities.module.css`
- Create: `src/components/HomeFeaturedCities/index.ts`

- [ ] **Step 1: Create `HomeFeaturedCities.tsx`**

```tsx
// src/components/HomeFeaturedCities/HomeFeaturedCities.tsx
import Link from 'next/link';
import type { CityContent } from '@/lib/content/types';
import styles from './HomeFeaturedCities.module.css';

export default function HomeFeaturedCities({ cities }: { cities: CityContent[] }) {
  if (cities.length === 0) return null;
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>Find Food Trucks in Your City</h2>
        <p className={styles.lede}>
          StreetFeast tracks active food trucks across Kentucky in real time.
        </p>
        <div className={styles.grid}>
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/food-trucks/${city.stateSlug}/${city.slug}`}
              className={styles.card}
            >
              <span className={styles.cityName}>{city.name}</span>
              <span className={styles.stateName}>{city.stateAbbr}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `HomeFeaturedCities.module.css`**

```css
.section {
  padding: 4rem 1.5rem;
  background: #fafafa;
}

.inner {
  max-width: 1100px;
  margin: 0 auto;
}

.heading {
  font-size: 2rem;
  margin: 0 0 0.5rem 0;
  text-align: center;
}

.lede {
  font-size: 1.125rem;
  color: #555;
  text-align: center;
  margin: 0 0 2.5rem 0;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.cityName {
  font-size: 1.125rem;
  font-weight: 600;
}

.stateName {
  font-size: 0.875rem;
  color: #888;
}
```

- [ ] **Step 3: Create `index.ts` and commit**

```ts
// src/components/HomeFeaturedCities/index.ts
export { default as HomeFeaturedCities } from './HomeFeaturedCities';
```

```bash
npm run lint
git add src/components/HomeFeaturedCities/
git commit -m "Add HomeFeaturedCities section component"
```

### Task 6.3: Create HomeHowItWorks

**Files:**
- Create: `src/components/HomeHowItWorks/HomeHowItWorks.tsx`
- Create: `src/components/HomeHowItWorks/HomeHowItWorks.module.css`
- Create: `src/components/HomeHowItWorks/index.ts`

- [ ] **Step 1: Create `HomeHowItWorks.tsx`**

```tsx
// src/components/HomeHowItWorks/HomeHowItWorks.tsx
import { HOW_IT_WORKS } from '@/content/home';
import styles from './HomeHowItWorks.module.css';

export default function HomeHowItWorks() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>How StreetFeast Works</h2>
        <ol className={styles.list}>
          {HOW_IT_WORKS.map((step, i) => (
            <li key={i} className={styles.item}>
              <div className={styles.number}>{i + 1}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepBody}>{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `HomeHowItWorks.module.css`**

```css
.section {
  padding: 4rem 1.5rem;
}

.inner {
  max-width: 1000px;
  margin: 0 auto;
}

.heading {
  font-size: 2rem;
  margin: 0 0 2.5rem 0;
  text-align: center;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
}

.item {
  text-align: center;
}

.number {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #ED6A00;
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem auto;
}

.stepTitle {
  font-size: 1.25rem;
  margin: 0 0 0.75rem 0;
}

.stepBody {
  color: #555;
  line-height: 1.6;
  margin: 0;
}
```

- [ ] **Step 3: Create `index.ts` and commit**

```ts
// src/components/HomeHowItWorks/index.ts
export { default as HomeHowItWorks } from './HomeHowItWorks';
```

```bash
npm run lint
git add src/components/HomeHowItWorks/
git commit -m "Add HomeHowItWorks section component"
```

### Task 6.4: Create HomeFaq

**Files:**
- Create: `src/components/HomeFaq/HomeFaq.tsx`
- Create: `src/components/HomeFaq/index.ts`

This is a thin wrapper that emits the FAQPage JSON-LD alongside the existing `Faq` accordion. The wrapper exists so the JSON-LD lives next to the questions, not at the page level (clearer separation).

- [ ] **Step 1: Create `HomeFaq.tsx`**

```tsx
// src/components/HomeFaq/HomeFaq.tsx
import { Faq } from '@/components/Faq';
import { JsonLd } from '@/lib/seo/JsonLd';
import { faqPageJsonLd } from '@/lib/seo/jsonld';
import { HOME_FAQ } from '@/content/home';

export default function HomeFaq() {
  return (
    <>
      <JsonLd data={faqPageJsonLd(HOME_FAQ)} />
      <Faq items={HOME_FAQ} heading="Food Truck FAQ" />
    </>
  );
}
```

- [ ] **Step 2: Create `index.ts` and commit**

```ts
// src/components/HomeFaq/index.ts
export { default as HomeFaq } from './HomeFaq';
```

```bash
npm run lint
git add src/components/HomeFaq/
git commit -m "Add HomeFaq section with FAQ JSON-LD"
```

### Task 6.5: Update home page

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace contents**

```tsx
// src/app/page.tsx
import { Header } from '@/components/Header';
import { HeroHeader } from '@/components/HeroHeader';
import { Footer } from '@/components/Footer';
import { HomeFeaturedCities } from '@/components/HomeFeaturedCities';
import { HomeHowItWorks } from '@/components/HomeHowItWorks';
import { HomeFaq } from '@/components/HomeFaq';
import { JsonLd } from '@/lib/seo/JsonLd';
import { mobileApplicationJsonLd } from '@/lib/seo/jsonld';
import { getCitiesByState } from '@/content/cities';

export default function Home() {
  const kyCities = getCitiesByState('kentucky');
  return (
    <>
      <JsonLd data={mobileApplicationJsonLd()} />
      <Header />
      <HeroHeader />
      <HomeFeaturedCities cities={kyCities} />
      <HomeHowItWorks />
      <HomeFaq />
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Verify**

```bash
npm run lint
npm run build
```
Expected: succeeds.

```bash
npm run dev
curl -s "http://localhost:3000" | grep -E "MobileApplication|FAQPage|Bowling Green|How StreetFeast Works"
```
Expected: all four strings present.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "Add featured cities, how-it-works, and FAQ sections to home"
```

### Task 6.6: Update Footer with city links

**Files:**
- Modify: `src/components/Footer/Footer.tsx`

- [ ] **Step 1: Read the existing Footer**

```bash
cat src/components/Footer/Footer.tsx
```

- [ ] **Step 2: Add a "Find Food Trucks" column**

Add a new section/column to the existing footer that contains links to the state hub and 5 city pages. The exact JSX depends on the existing footer structure — match its column/list pattern. Use these links:

```tsx
<div className={styles.footerColumn}>
  <h3 className={styles.footerHeading}>Find Food Trucks</h3>
  <ul className={styles.footerList}>
    <li><Link href="/food-trucks/kentucky">Kentucky</Link></li>
    <li><Link href="/food-trucks/kentucky/bowling-green">Bowling Green</Link></li>
    <li><Link href="/food-trucks/kentucky/glasgow">Glasgow</Link></li>
    <li><Link href="/food-trucks/kentucky/somerset">Somerset</Link></li>
    <li><Link href="/food-trucks/kentucky/elizabethtown">Elizabethtown</Link></li>
    <li><Link href="/food-trucks/kentucky/owensboro">Owensboro</Link></li>
  </ul>
</div>
```

If the Footer uses class names that differ from `footerColumn` / `footerHeading` / `footerList`, swap them for the existing equivalents. If new CSS classes are needed, add them to `Footer.module.css` matching the visual style of existing columns.

Also ensure `Link` is imported from `next/link` at the top of the file if it isn't already.

- [ ] **Step 3: Verify**

```bash
npm run lint
npm run build
```
Expected: succeeds.

```bash
npm run dev
curl -s "http://localhost:3000" | grep -E "Find Food Trucks|/food-trucks/kentucky/glasgow"
```
Expected: footer link present.

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer/
git commit -m "Add Find Food Trucks column to footer"
```

---

## Phase 7: Sitemap

### Task 7.1: Rewrite sitemap.ts

**Files:**
- Overwrite: `src/app/sitemap.ts`

- [ ] **Step 1: Replace contents**

```ts
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
```

- [ ] **Step 2: Verify**

```bash
npm run lint
npm run build
```
Expected: succeeds.

```bash
npm run dev
curl -s "http://localhost:3000/sitemap.xml" | head -40
```
Expected: XML sitemap with home, `/food-trucks`, `/food-trucks/kentucky`, plus city + truck entries (entries depend on TRUCK_IDS being populated; with an empty registry only static + state + national hub URLs appear).

- [ ] **Step 3: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "Generate dynamic sitemap from content registry and trucks"
```

---

## Post-launch Checks (Manual)

After the implementation is merged and deployed:

- [ ] Verify property in Google Search Console.
- [ ] Submit `https://streetfeastapp.com/sitemap.xml` in Search Console.
- [ ] Test JSON-LD on a sample truck profile, state hub, and city page at https://search.google.com/test/rich-results — confirm no errors.
- [ ] Lighthouse audit on truck profile before vs after — expect LCP improvement (server HTML vs skeleton-swap).
- [ ] One week post-launch: check Search Console "Pages" report — city + truck pages should be indexed, not "Discovered – currently not indexed."
- [ ] Two-to-four weeks post-launch: check "Performance" — impressions should appear for branded queries and `[city] food trucks`.

## Content seed deliverables (for the user)

Implementation can ship with placeholder copy. Before flipping pages to indexed, populate:

- [ ] `src/content/trucks.ts` — real truck IDs (and any featured)
- [ ] `src/content/states/kentucky.ts` — real intro, metaDescription, FAQs
- [ ] `src/content/cities/kentucky/{bowling-green,glasgow,somerset,elizabethtown,owensboro}.ts` — real intros, neighborhoods, FAQs, metaDescriptions
- [ ] `src/content/home.ts` — real HOME_FAQ and HOW_IT_WORKS copy

## Optional Future Work (not part of this plan)

- Dynamic OG image generation per truck / per city via `opengraph-image.tsx`
- Truck URL slug migration (`/truck/[truckSlug]`) — requires backend slug field
- Cuisine landing pages — only if Search Console shows demand
- Blog (`/blog/*`)
- `revalidateTag('truck:<id>')` webhook from backend to invalidate cache instantly
