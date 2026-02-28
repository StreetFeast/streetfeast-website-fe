# Phase 6: SEO & Sitemap - Research

**Researched:** 2026-02-28
**Domain:** Next.js metadata API (OG/Twitter), JSON-LD structured data, sitemap.ts, LayoutContent gate
**Confidence:** HIGH

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| SEO-01 | Page exports Next.js metadata with title, description, and OG tags | Extend the existing `metadata` export in `src/app/download/page.tsx` — add `openGraph` object with title, description, url, images; `metadataBase` inherited from root layout at `https://streetfeastapp.com` |
| SEO-02 | Page has canonical URL and Twitter card meta tags | Add `alternates.canonical: '/download'` and `twitter: { card: 'summary_large_image', ... }` fields to the page's `metadata` export |
| SEO-03 | Page includes inline JSON-LD MobileApplication structured data | Add `<script type="application/ld+json" dangerouslySetInnerHTML=...>` inside the `DownloadPage` JSX return — use `MobileApplication` schema.org type; no new packages required |
| SEO-04 | /download is added to sitemap.ts with appropriate priority | Add one entry to the array in `src/app/sitemap.ts` with `url: baseUrl + '/download'`, `changeFrequency: 'monthly'`, `priority: 0.8` |
</phase_requirements>

---

## Summary

Phase 6 is a focused metadata and schema augmentation phase. All four requirements resolve to changes in exactly two files: `src/app/download/page.tsx` (SEO-01, SEO-02, SEO-03) and `src/app/sitemap.ts` (SEO-04). Additionally, a fifth success criterion in the roadmap requires patching `LayoutContent.tsx` to add `/download` to `allowedPaths` so the launch gate does not block the page in pre-launch production environments.

The entire standard stack is already present in the codebase. The root layout already sets `metadataBase: new URL('https://streetfeastapp.com')` and an OG image at `/social-media-logo.png` (1352x632). The download page already exports a `Metadata` object with title, description, and itunes fields — this phase extends it with openGraph, twitter, and alternates.canonical. JSON-LD is implemented as a `<script>` tag inside the server component's JSX, following the Next.js official guide. No new npm packages are required.

The gap closure item (LayoutContent) is a one-line array change that must also land in this phase per the roadmap success criteria. Without it, `/download` shows the `ComingSoon` component in pre-launch production when `NEXT_PUBLIC_IS_LAUNCHED` is not set, which means neither users nor crawlers see the page.

**Primary recommendation:** Extend `download/page.tsx` metadata export and add JSON-LD script in one plan task; add `/download` to `sitemap.ts` and `LayoutContent.allowedPaths` in a second (or the same) task.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js Metadata API | 15.5.2 (project) | OG, Twitter card, canonical, alternates | Already used in layout.tsx, terms/page.tsx, privacy/page.tsx — zero new setup |
| `MetadataRoute.Sitemap` (Next.js) | 15.5.2 | Type-safe sitemap generation | Already used in `src/app/sitemap.ts` — extending the existing array |
| Schema.org JSON-LD (inline `<script>`) | n/a | MobileApplication structured data for Google rich results | Official Next.js recommendation; no library needed |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `schema-dts` | optional | TypeScript types for JSON-LD objects | Optional only — adds type safety to the JSON-LD object literal; zero runtime cost. Not required, but useful if the team wants type-checked structured data |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Inline `<script dangerouslySetInnerHTML>` | `next-seo` library | `next-seo` adds a package dependency for a problem that Next.js App Router already solves natively; stick with inline script |
| Inline `<script dangerouslySetInnerHTML>` | `schema-dts` + inline | `schema-dts` types are optional — the JSON-LD object is small enough that TypeScript `as const` or a comment is sufficient |
| `social-media-logo.png` as OG image | Custom `/download` OG image | Custom OG image is deferred to future (DL-01); use the existing `social-media-logo.png` (1352x632) |

**Installation:** No new packages required.

---

## Architecture Patterns

### Recommended Project Structure

```
src/
├── app/
│   ├── download/
│   │   └── page.tsx          # MODIFY: add openGraph, twitter, alternates, JSON-LD script
│   ├── sitemap.ts            # MODIFY: add /download entry
│   └── layout.tsx            # READ-ONLY: metadataBase already set here
└── components/
    └── LayoutContent/
        └── LayoutContent.tsx  # MODIFY: add '/download' to allowedPaths array
```

No new files are needed. All changes are modifications to existing files.

### Pattern 1: Extending Page Metadata with OG + Twitter + Canonical

**What:** The existing `metadata` export in `download/page.tsx` is extended with `openGraph`, `twitter`, and `alternates` fields. The `metadataBase` set in `app/layout.tsx` (`https://streetfeastapp.com`) is inherited automatically — relative paths resolve to absolute URLs.

**When to use:** Any page-level metadata that needs social sharing support.

**Example:**
```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
// src/app/download/page.tsx — extending existing metadata export

import type { Metadata } from 'next';

export const metadata: Metadata = {
  // Existing fields (Phase 5)
  title: 'Download StreetFeast',
  description: 'Download the StreetFeast app to discover food trucks and street vendors near you.',
  itunes: {
    appId: '6749815073',
  },
  // New Phase 6 fields
  alternates: {
    canonical: '/download',   // Resolves to: https://streetfeastapp.com/download
  },
  openGraph: {
    title: 'Download StreetFeast',
    description: 'Discover food trucks and street vendors near you. Download the StreetFeast app.',
    url: '/download',          // Resolves to: https://streetfeastapp.com/download
    siteName: 'StreetFeast',
    images: [
      {
        url: '/social-media-logo.png',  // Existing asset — 1352x632
        width: 1352,
        height: 632,
        alt: 'StreetFeast - Discover Amazing Street Food',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Download StreetFeast',
    description: 'Discover food trucks and street vendors near you. Download the StreetFeast app.',
    images: ['/social-media-logo.png'],
    creator: '@streetfeast',  // matches root layout
  },
};
```

**Key insight on metadata merging:** Next.js shallowly merges metadata objects. The `openGraph` field defined in `layout.tsx` will be **replaced** (not merged) by the `openGraph` defined in `download/page.tsx`. This is the desired behavior — the download page needs its own specific `url` and `type`. However, `metadataBase` IS inherited because it's defined at the layout level and not overridden at the page level.

### Pattern 2: JSON-LD MobileApplication Script in Server Component JSX

**What:** A `<script type="application/ld+json">` element rendered inside the server component's JSX return. The Next.js official docs recommend this exact approach — no third-party library needed.

**When to use:** Any page-level structured data. For the download page, `MobileApplication` schema is the correct type.

**Example:**
```typescript
// Source: https://nextjs.org/docs/app/guides/json-ld + https://schema.org/MobileApplication
// src/app/download/page.tsx — inside DownloadPage component JSX

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MobileApplication',
  name: 'StreetFeast',
  description: 'Discover food trucks and street vendors near you.',
  applicationCategory: 'FoodApplication',
  operatingSystem: 'iOS, Android',
  url: 'https://streetfeastapp.com/download',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};

// In JSX return:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
  }}
/>
```

The `.replace(/</g, '\\u003c')` XSS mitigation is from the official Next.js guide. It prevents injection via string values that contain HTML characters. For this static JSON-LD it is a no-op but the practice should be followed.

**Placement:** Place the `<script>` anywhere inside the JSX return — Next.js hoists it to the `<head>` automatically. Recommended placement is as the first child of `<main>` for clarity.

### Pattern 3: Adding an Entry to sitemap.ts

**What:** The existing `sitemap.ts` already returns an array. Add a new entry for `/download`.

**When to use:** Any route that should be indexed by search engines.

**Example:**
```typescript
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
// src/app/sitemap.ts — adding /download entry

import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://streetfeastapp.com';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    // NEW: Phase 6
    {
      url: `${baseUrl}/download`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
```

**Priority rationale:** `0.8` reflects the page's importance — it's the primary CTA page for the app download funnel, more important than legal pages (`0.5`) but less than the homepage (`1`). `monthly` changeFrequency is appropriate; the content is stable but could change with new app store links.

### Pattern 4: LayoutContent allowedPaths Gap Closure

**What:** `LayoutContent.tsx` controls a launch gate — when `NEXT_PUBLIC_IS_LAUNCHED` is not `'true'`, only paths in `allowedPaths` render their content. All others show `<ComingSoon />`. Currently `/download` is NOT in the list, which means in pre-launch production the page is unreachable.

**Current state:**
```typescript
// src/components/LayoutContent/LayoutContent.tsx — CURRENT (broken for /download)
const allowedPaths = ['/terms', '/privacy', '/delete-my-data'];
```

**Fix:**
```typescript
// src/components/LayoutContent/LayoutContent.tsx — FIXED
const allowedPaths = ['/terms', '/privacy', '/delete-my-data', '/download'];
```

This is a one-line change. It is critical for Success Criterion 5 in the roadmap.

### Anti-Patterns to Avoid

- **Defining `metadataBase` again in download/page.tsx:** It is already in the root layout. Redefining it causes no harm but is redundant and confusing.
- **Setting `openGraph.type: 'SoftwareApplication'`:** Not a valid OG type. Use `'website'` — OG protocol does not have a MobileApplication type. JSON-LD handles the structured data type signal.
- **Omitting `.replace(/</g, '\\u003c')` in JSON.stringify:** A low-risk omission for static data, but official Next.js docs include it as a security practice. Follow the documented pattern.
- **Using `next/script` instead of a raw `<script>` tag for JSON-LD:** `next/script` is for external scripts. For inline JSON-LD, use a plain `<script>` element with `dangerouslySetInnerHTML`.
- **Putting JSON-LD in layout.tsx instead of page.tsx:** Layout JSON-LD applies to all child routes. MobileApplication data is specific to `/download`. Keep it in the page file.
- **Setting `changeFrequency: 'never'` for /download:** The page URL and content may change when new app store links are added. `monthly` is appropriate.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| OG / Twitter meta tags | Manual `<meta>` tags in JSX | `metadata.openGraph` + `metadata.twitter` in Next.js | Idiomatic, type-safe, server-rendered in `<head>` without any JSX manipulation |
| Canonical URL tag | `<link rel="canonical">` in JSX | `metadata.alternates.canonical` | Same — handled by Next.js metadata API |
| Sitemap XML | Custom route handler returning XML string | `src/app/sitemap.ts` with `MetadataRoute.Sitemap` | Already in place; extending the array is 4 lines |
| JSON-LD | External library | Inline `<script dangerouslySetInnerHTML>` | Official Next.js docs show this pattern; no package needed for a single static schema |

**Key insight:** Zero custom infrastructure is needed. This phase is entirely additive changes to existing files using existing Next.js APIs.

---

## Common Pitfalls

### Pitfall 1: openGraph Metadata Is Silently Discarded Without metadataBase

**What goes wrong:** OG `images` with relative URLs (e.g., `/social-media-logo.png`) cause a Next.js build warning or are not rendered if `metadataBase` is missing.
**Why it happens:** Absolute URLs are required for OG images. Without `metadataBase`, Next.js cannot resolve relative paths.
**How to avoid:** The root `app/layout.tsx` already defines `metadataBase: new URL('https://streetfeastapp.com')`. Do not re-define it in the download page — it is inherited. Use relative paths freely.
**Warning signs:** Build warning "metadata.openGraph.images ... must be absolute"; OG image missing in link preview.

### Pitfall 2: metadata Merging Loses the OG Description

**What goes wrong:** The root layout defines a full `openGraph` object. If the download page defines a new `openGraph` object without all fields, the missing fields are NOT inherited — they are dropped.
**Why it happens:** Next.js performs a **shallow merge** of metadata objects. The `openGraph` key is replaced entirely by the page-level definition.
**How to avoid:** Include all needed OG fields in the page-level `openGraph` object — do not rely on inheriting individual sub-fields from the layout.
**Warning signs:** Slack/iMessage preview shows generic site description instead of the download page description.

### Pitfall 3: /download Still Shows ComingSoon in Production

**What goes wrong:** Even after all metadata is correct, visiting `/download` in a pre-launch environment shows `<ComingSoon />` because `LayoutContent.tsx` does not include it in `allowedPaths`.
**Why it happens:** The LayoutContent launch gate was written before the `/download` route existed. The allowedPaths list was never updated.
**How to avoid:** Add `'/download'` to the `allowedPaths` array in `src/components/LayoutContent/LayoutContent.tsx`. This is a required change for Success Criterion 5.
**Warning signs:** Page renders `<ComingSoon />` when `NEXT_PUBLIC_IS_LAUNCHED` is not set.

### Pitfall 4: JSON-LD Appears in the DOM but Google Can't Read It

**What goes wrong:** Google Search Console reports "Structured data not found" even though the `<script type="application/ld+json">` is visible in the HTML source.
**Why it happens:** For streaming metadata in Next.js 15, if `generateMetadata` involves async work, metadata may be deferred. However, `download/page.tsx` uses a static `metadata` export (no async), so the JSON-LD script is in the server-rendered HTML from the first byte. This pitfall applies only if someone changes the page to use `generateMetadata` with async logic.
**How to avoid:** Keep the download page's metadata as a static export (`export const metadata`). Do not convert to `generateMetadata` unless there is a specific reason.
**Warning signs:** `<script type="application/ld+json">` present in the response body but appears after `<body>` in the streaming output.

### Pitfall 5: Twitter Card Not Rendering in Slack/iMessage

**What goes wrong:** The Twitter card fields are present in `<head>` but preview crawlers (Slack, iMessage) show a plain text link instead of a card.
**Why it happens:** These crawlers read `og:*` tags more reliably than `twitter:*` tags. The OG image must be accessible — if the image URL resolves to a 404 (e.g., relative path without `metadataBase`), the preview card will not render.
**How to avoid:** The `openGraph.images` array takes priority for these crawlers. Ensure `/social-media-logo.png` is in `/public/` and returns a 200 — it already is.
**Warning signs:** Preview shows no image; Slack "Unfurl" shows only title and no card.

---

## Code Examples

Verified patterns from official sources:

### Complete Phase 6 metadata for download/page.tsx

```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata (verified 2026-02-28)
// Full metadata export for src/app/download/page.tsx after Phase 6

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Download StreetFeast',
  description: 'Download the StreetFeast app to discover food trucks and street vendors near you.',
  itunes: {
    appId: '6749815073',  // retained from Phase 5
  },
  alternates: {
    canonical: '/download',
  },
  openGraph: {
    title: 'Download StreetFeast',
    description: 'Discover food trucks and street vendors near you. Download the StreetFeast app.',
    url: '/download',
    siteName: 'StreetFeast',
    images: [
      {
        url: '/social-media-logo.png',
        width: 1352,
        height: 632,
        alt: 'StreetFeast - Discover Amazing Street Food',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Download StreetFeast',
    description: 'Discover food trucks and street vendors near you. Download the StreetFeast app.',
    images: ['/social-media-logo.png'],
    creator: '@streetfeast',
  },
};
```

### JSON-LD MobileApplication Script

```typescript
// Source: https://nextjs.org/docs/app/guides/json-ld (verified 2026-02-28)
//         https://schema.org/MobileApplication (verified 2026-02-28)
// Placed inside DownloadPage JSX return

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MobileApplication',
  name: 'StreetFeast',
  description: 'Discover food trucks and street vendors near you.',
  applicationCategory: 'FoodApplication',
  operatingSystem: 'iOS, Android',
  url: 'https://streetfeastapp.com/download',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};

// In JSX:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
  }}
/>
```

### Generated HTML Output (what crawlers see)

```html
<!-- From metadata.alternates.canonical -->
<link rel="canonical" href="https://streetfeastapp.com/download" />

<!-- From metadata.openGraph -->
<meta property="og:title" content="Download StreetFeast" />
<meta property="og:description" content="Discover food trucks and street vendors near you. Download the StreetFeast app." />
<meta property="og:url" content="https://streetfeastapp.com/download" />
<meta property="og:site_name" content="StreetFeast" />
<meta property="og:image" content="https://streetfeastapp.com/social-media-logo.png" />
<meta property="og:image:width" content="1352" />
<meta property="og:image:height" content="632" />
<meta property="og:image:alt" content="StreetFeast - Discover Amazing Street Food" />
<meta property="og:type" content="website" />
<meta property="og:locale" content="en_US" />

<!-- From metadata.twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Download StreetFeast" />
<meta name="twitter:description" content="Discover food trucks and street vendors near you. Download the StreetFeast app." />
<meta name="twitter:image" content="https://streetfeastapp.com/social-media-logo.png" />
<meta name="twitter:creator" content="@streetfeast" />

<!-- JSON-LD (in body, Google reads it) -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "StreetFeast",
  "description": "Discover food trucks and street vendors near you.",
  "applicationCategory": "FoodApplication",
  "operatingSystem": "iOS, Android",
  "url": "https://streetfeastapp.com/download",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
}
</script>
```

### Sitemap entry

```typescript
// Source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap (verified 2026-02-28)
// New entry to add to src/app/sitemap.ts

{
  url: `${baseUrl}/download`,
  lastModified: new Date(),
  changeFrequency: 'monthly',
  priority: 0.8,
},
```

### LayoutContent fix

```typescript
// Source: src/components/LayoutContent/LayoutContent.tsx (direct codebase read)
// Change: add '/download' to allowedPaths

const allowedPaths = ['/terms', '/privacy', '/delete-my-data', '/download'];
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Pages Router `<Head>` for OG/Twitter tags | App Router `export const metadata` object | Next.js 13 | Typed, server-rendered, merges from layout down |
| External sitemap libraries | `src/app/sitemap.ts` with `MetadataRoute.Sitemap` | Next.js 13.3 | Built-in, no dependency |
| `react-schemaorg` or `next-seo` for JSON-LD | Inline `<script dangerouslySetInnerHTML>` | Next.js 13 (App Router era) | Official recommendation; no library needed |
| `metadata.viewport` in metadata object | Separate `generateViewport` export | Next.js 14 | Do NOT put viewport in metadata — already correctly absent from this codebase |

**Deprecated/outdated:**
- `metadata.viewport`: Deprecated in Next.js 14. Not used here — no action needed.
- `metadata.themeColor`: Same deprecation. Not used here — no action needed.

---

## Open Questions

1. **Should the JSON-LD include `downloadUrl` fields pointing to the app stores?**
   - What we know: `schema.org/MobileApplication` supports `downloadUrl` (URL of the installation binary/page). App Store and Google Play URLs are in `constants/links.ts`.
   - What's unclear: Adding store URLs to JSON-LD may help rich results eligibility but is not explicitly required by SEO-03. The requirement says "MobileApplication structured data visible to Google" — the minimum viable schema is valid without `downloadUrl`.
   - Recommendation: Include `downloadUrl` for completeness. It requires no extra research and the values are already in the codebase. Map to App Store URL only (the primary platform) or include both as an array.

2. **Does the page need a separate `robots` metadata override?**
   - What we know: Root layout already sets `robots: { index: true, follow: true, googleBot: { index: true, follow: true, ... } }`. Page-level metadata that omits `robots` inherits this setting.
   - What's unclear: Nothing — inheritance is confirmed by official docs.
   - Recommendation: Do NOT add `robots` to the download page metadata. The root layout's setting is correct and will be inherited.

3. **Should the sitemap changeFrequency be `yearly` instead of `monthly`?**
   - What we know: The app store URLs are stable once live. `monthly` signals that minor updates are possible (new badge assets, copy changes). `yearly` would be appropriate if the page is truly static.
   - What's unclear: Google has stated it largely ignores `changeFrequency` and `priority` — they are hints, not directives.
   - Recommendation: Use `monthly` as a reasonable default. It aligns with the `/privacy` and `/terms` frequency and is not wrong.

---

## Codebase Inventory (What Already Exists)

This is critical context for the planner:

| Asset/File | Status | Notes |
|------------|--------|-------|
| `src/app/download/page.tsx` | EXISTS — modify | Has `metadata` with title, description, itunes; needs OG, Twitter, canonical, JSON-LD |
| `src/app/sitemap.ts` | EXISTS — modify | Has homepage, /privacy, /terms; needs /download entry |
| `src/components/LayoutContent/LayoutContent.tsx` | EXISTS — modify | `allowedPaths` missing '/download' — blocks page in pre-launch |
| `public/social-media-logo.png` | EXISTS | 1352x632 — confirmed in public/ directory; same image used by root layout OG |
| `metadataBase` | EXISTS in layout.tsx | `new URL('https://streetfeastapp.com')` — inherited by all pages |
| `src/constants/links.ts` | EXISTS | `APP_STORE_LINK`, `GOOGLE_PLAY_LINK` — available for optional `downloadUrl` in JSON-LD |

**No new files needed. No new packages needed.**

---

## Sources

### Primary (HIGH confidence)

- [Next.js generateMetadata docs](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) — verified openGraph, twitter, alternates.canonical fields and their HTML output; confirmed shallow merge behavior; fetched 2026-02-28
- [Next.js JSON-LD guide](https://nextjs.org/docs/app/guides/json-ld) — confirmed `<script dangerouslySetInnerHTML>` is the official recommendation; confirmed XSS mitigation pattern `.replace(/</g, '\\u003c')`; fetched 2026-02-28
- [Next.js sitemap docs](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) — confirmed `MetadataRoute.Sitemap` type and all supported fields; fetched 2026-02-28
- `src/app/layout.tsx` — direct codebase read; confirmed `metadataBase: new URL('https://streetfeastapp.com')` and existing OG image at `/social-media-logo.png` (1352x632)
- `src/components/LayoutContent/LayoutContent.tsx` — direct codebase read; confirmed `allowedPaths` does not include `/download`
- `src/app/sitemap.ts` — direct codebase read; confirmed existing entries and `baseUrl = 'https://streetfeastapp.com'`
- `src/app/download/page.tsx` — direct codebase read; confirmed existing metadata fields to retain and extend
- [schema.org/MobileApplication](https://schema.org/MobileApplication) — confirmed `MobileApplication` type and key properties (name, operatingSystem, applicationCategory, offers, url); fetched 2026-02-28

### Secondary (MEDIUM confidence)

- [Next.js metadata merging docs](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#merging) — shallow merge behavior documented; `openGraph` as a whole is replaced, not field-merged

### Tertiary (LOW confidence)

- None — all critical claims verified via official docs or direct codebase inspection.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — zero new dependencies; all APIs already in use project-wide; verified against Next.js 15 official docs
- Architecture: HIGH — all files identified from direct codebase reads; no ambiguity in what changes where
- Pitfalls: HIGH — shallow merge and LayoutContent gap confirmed from direct code inspection; JSON-LD placement from official docs

**Research date:** 2026-02-28
**Valid until:** 2026-04-28 (Next.js 15 metadata API is stable; schema.org MobileApplication type is stable; sitemap convention is unchanged since Next.js 13.3)
