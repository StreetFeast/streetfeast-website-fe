# Stack Research: App Download Page (v1.1)

**Domain:** Smart mobile redirect page with device detection, app store deep-link, and SEO metadata
**Researched:** 2026-02-27
**Confidence:** HIGH

## Executive Summary

The `/download` page requires three technical capabilities: device detection for auto-redirect, SEO metadata (OG tags + structured data), and a fallback landing page for desktop/unknown devices. All three can be implemented using **only what is already in the stack** — Next.js 15 built-ins cover every requirement. No new npm packages are needed.

The project already has a working middleware in `src/middleware.ts` that reads `user-agent` from `request.headers` for the `/truck/:path*` route. The same pattern extended with a `/download` matcher delivers the auto-redirect before any React renders. App store URLs are already centralized in `src/constants/links.ts`.

---

## What Is New (and What Already Exists)

| Capability | Status | How |
|------------|--------|-----|
| User-agent string access | **Already exists** in `src/middleware.ts` | `request.headers.get('user-agent')` |
| iOS/Android regex detection | **Already exists** in middleware and `truck/[truckId]/page.tsx` | `/iPhone\|iPad\|iPod\|Android/i` |
| App store URL constants | **Already exists** | `src/constants/links.ts` |
| Static `metadata` export | **Already exists** (used in `privacy/page.tsx`) | `export const metadata: Metadata = {...}` |
| OG image | **Already exists** | `/social-media-logo.png` (1352x632) |
| `metadataBase` | **Already set** in root `layout.tsx` | `new URL('https://streetfeastapp.com')` |
| Middleware matcher config | **Already in use** | `export const config = { matcher: [...] }` |
| JSON-LD script tag | **New — trivial** | Inline `<script type="application/ld+json">` in server component |
| `/download` page component | **New** | `src/app/download/page.tsx` |

---

## Recommended Stack (Additions Only)

### No New Dependencies Required

Zero new npm packages. Everything needed is already installed or built into Next.js 15.

| Technology | Version | Purpose | Why No Library Needed |
|------------|---------|---------|----------------------|
| **Next.js Middleware** | 15.5.7 (existing) | Auto-redirect iOS/Android before page renders | `userAgent` from `next/server` is already the project pattern in `src/middleware.ts` |
| **Next.js `metadata` export** | 15.5.7 (existing) | OG tags, Twitter card, `apple-itunes-app` meta, canonical URL | Static export used across all pages already; no dynamic data needed |
| **Next.js JSON-LD pattern** | 15.5.7 (existing) | `SoftwareApplication` structured data for Google Search | Inline `<script dangerouslySetInnerHTML>` in server component — no library |
| **CSS Modules** | Existing | Fallback landing page styles | Matches site-wide pattern |

---

## Implementation Approach

### Approach: Middleware Redirect (Not Server Component `redirect()`)

Use **middleware** for the auto-redirect, not `headers()` in a server component. Reason: middleware executes before any React rendering, delivering the redirect at the edge with zero page load. The project already does this exact pattern for truck profile pages.

The server-rendered `/download` page (`page.tsx`) serves as the **fallback** for desktop and unknown user-agents — middleware already excluded those from redirecting.

**Decision: Do NOT put redirect logic in `page.tsx`.** Middleware handles redirect; page handles fallback. Clean separation.

### Middleware Extension

Extend `src/middleware.ts` — do not create a new file. Add `/download` to the matcher and add an iOS/Android branch that redirects to the respective app store URL.

```typescript
// src/middleware.ts — extend existing file
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { APP_STORE_LINK, GOOGLE_PLAY_LINK } from '@/constants/links';

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';
  const { pathname } = request.nextUrl;

  // Existing: truck deep-link redirect
  const truckMatch = pathname.match(/^\/truck\/([^\/]+)$/);
  if (truckMatch && /iPhone|iPad|iPod|Android/i.test(userAgent)) {
    const truckId = truckMatch[1];
    const url = request.nextUrl.clone();
    url.pathname = `/m/truck/${truckId}`;
    return NextResponse.redirect(url);
  }

  // New: /download auto-redirect for mobile users
  if (pathname === '/download') {
    if (/iPhone|iPad|iPod/i.test(userAgent)) {
      return NextResponse.redirect(APP_STORE_LINK);
    }
    if (/Android/i.test(userAgent)) {
      return NextResponse.redirect(GOOGLE_PLAY_LINK);
    }
    // Desktop/unknown: fall through to page.tsx fallback
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/truck/:path*',
    '/download',
  ],
};
```

### Fallback Page (`src/app/download/page.tsx`)

Server Component (no `'use client'` needed). Exports static `metadata` and renders both store badges. No state, no effects.

```typescript
// src/app/download/page.tsx
import type { Metadata } from 'next';
import { APP_STORE_LINK, GOOGLE_PLAY_LINK } from '@/constants/links';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Download StreetFeast',
  description: 'Download the StreetFeast app to discover food trucks, street vendors, and pop-up restaurants near you. Available on iOS and Android.',
  alternates: {
    canonical: '/download',
  },
  openGraph: {
    title: 'Download StreetFeast',
    description: 'Discover food trucks, street vendors, and pop-up restaurants near you.',
    url: 'https://streetfeastapp.com/download',
    images: [
      {
        url: '/social-media-logo.png', // existing asset
        width: 1352,
        height: 632,
        alt: 'StreetFeast - Download the App',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Download StreetFeast',
    description: 'Discover food trucks and street food near you.',
    images: ['/social-media-logo.png'],
  },
  // Smart banner for iOS Safari — prompts app install without redirect
  itunes: {
    appId: '6749815073',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MobileApplication',
  name: 'StreetFeast',
  description: 'Discover food trucks, street vendors, and pop-up restaurants near you.',
  operatingSystem: 'iOS, ANDROID',
  applicationCategory: 'FoodApplication',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  url: 'https://streetfeastapp.com/download',
};

export default function DownloadPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      {/* Fallback UI: both store badges */}
    </>
  );
}
```

### Metadata Notes

| Field | Value | Rationale |
|-------|-------|-----------|
| `metadata.itunes.appId` | `'6749815073'` | App ID from existing `APP_STORE_LINK` URL — adds iOS Smart App Banner to mobile Safari on desktop |
| `openGraph.type` | Inherited `'website'` from root layout | Correct for a download landing page (not `article`) |
| `alternates.canonical` | `'/download'` | Prevents duplicate content issues if page is accessed via multiple paths |
| JSON-LD `@type` | `MobileApplication` | Google's recommended subtype for iOS/Android apps; more specific than `SoftwareApplication` |
| JSON-LD `offers.price` | `'0'` | Required by Google for rich results; free app |
| JSON-LD `applicationCategory` | `'FoodApplication'` | Correct schema.org value for food discovery apps |

---

## Alternatives Considered

| Recommended | Alternative | Why Not |
|-------------|-------------|---------|
| **Middleware redirect** | `redirect()` in server component via `headers()` | Middleware runs at the edge before any rendering — faster, cleaner separation. `headers()` would require the page to be dynamically rendered and execute after server component starts. |
| **Inline JSON-LD** | `schema-dts` npm package for TypeScript types | Adds a dependency for a single static object. Typing benefit does not justify the package. |
| **Inline JSON-LD** | `next-seo` library | Adds significant bundle weight (React components) for what is three lines of inline script. Not used anywhere else in the project. |
| **Existing `/social-media-logo.png`** | New OG image for download page | The existing 1352x632 image is correctly sized for OG. Creating a new image is not justified without design input. |
| **`userAgent()` from `next/server`** in middleware | `ua` property from `userAgent()` helper | The project's existing middleware uses `request.headers.get('user-agent')` directly with regex, which is simpler and already validated working. No reason to change the pattern. |

---

## What NOT to Add

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| `ua-parser-js` or `next-useragent` npm packages | Unnecessary for three regex checks; adds 40KB+ to the bundle | Inline regex in middleware (already the project pattern) |
| `schema-dts` | Unnecessary type complexity for a static JSON-LD block | Plain TypeScript object |
| `next-seo` | Heavyweight abstraction over Next.js built-in metadata API | Native `metadata` export (already used across the project) |
| `'use client'` on the download page | Desktop fallback has no interactive state; marking client would disable SSR | Keep as server component |
| Client-side `navigator.userAgent` detection on `/download` | Causes flash of wrong content and defeats the purpose of middleware redirect | Middleware redirect (runs before any client JS) |

---

## Stack Patterns by Scenario

**If mobile user visits `/download`:**
- Middleware fires before React renders
- Regex matches iPhone/iPad/iPod → `NextResponse.redirect(APP_STORE_LINK)`
- Regex matches Android → `NextResponse.redirect(GOOGLE_PLAY_LINK)`
- Zero page render, immediate external redirect

**If desktop user (or unknown user-agent) visits `/download`:**
- Middleware calls `NextResponse.next()`
- `page.tsx` server component renders fallback landing page
- Both App Store and Google Play badges shown
- SEO metadata and JSON-LD included in rendered HTML

**If bot/crawler visits `/download`:**
- Middleware lets through (bots rarely match iPhone/Android regex)
- Full page renders with complete metadata for indexing
- JSON-LD structured data available for Google rich results

---

## Sitemap Update Required

Add `/download` to `src/app/sitemap.ts` — currently only `/`, `/privacy`, and `/terms` are listed:

```typescript
{
  url: `${baseUrl}/download`,
  lastModified: new Date(),
  changeFrequency: 'monthly',
  priority: 0.8,  // High priority — primary conversion page
}
```

---

## Version Compatibility

| Package | Current Version | Status |
|---------|----------------|--------|
| `next` | 15.5.7 | `userAgent` from `next/server` stable; `metadata` export stable; JSON-LD pattern stable |
| `typescript` | 5.x | `Metadata` type from `next` fully typed; no additional type packages needed |

---

## Sources

- [Next.js `userAgent` API Reference](https://nextjs.org/docs/app/api-reference/functions/userAgent) — HIGH confidence, official docs fetched 2026-02-27; confirmed `userAgent` is imported from `next/server`, works in middleware
- [Next.js `headers()` API Reference](https://nextjs.org/docs/app/api-reference/functions/headers) — HIGH confidence, official docs fetched 2026-02-27; confirmed `headers()` is now async in Next.js 15
- [Next.js `generateMetadata` API Reference](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) — HIGH confidence, official docs fetched 2026-02-27; confirmed `itunes`, `appLinks`, `alternates.canonical` are supported fields
- [Next.js JSON-LD Guide](https://nextjs.org/docs/app/guides/json-ld) — HIGH confidence, official docs fetched 2026-02-27; confirmed inline `<script>` pattern with `replace(/</g, '\\u003c')` XSS prevention
- [Google Structured Data: Software App](https://developers.google.com/search/docs/appearance/structured-data/software-app) — HIGH confidence, official Google Search docs fetched 2026-02-27; confirmed required fields: `name`, `offers.price`; supported type: `MobileApplication`
- [DEV.to: Redirecting mobile users to App or Play Store in NextJS](https://dev.to/andreasbergstrom/redirecting-mobile-users-to-app-or-play-store-using-nextjs-3pp1) — MEDIUM confidence, community article; confirmed middleware approach with `userAgent` helper from `next/server`

---

*Stack research for: Smart App Download Page (v1.1)*
*Researched: 2026-02-27*
