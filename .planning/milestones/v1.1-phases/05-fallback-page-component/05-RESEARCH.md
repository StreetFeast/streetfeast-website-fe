# Phase 5: Fallback Page & Component - Research

**Researched:** 2026-02-27
**Domain:** Next.js App Router server components, Apple Smart App Banner, app store badge UI
**Confidence:** HIGH

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| PAGE-01 | Desktop/unknown users see a minimal page with StreetFeast branding and both App Store and Google Play badges | Server component page at `src/app/download/page.tsx` with badge `<Image>` components wrapped in `<a>` links pointing to `APP_STORE_LINK` / `GOOGLE_PLAY_LINK` |
| PAGE-02 | Page renders as a pure server component with no client-side JavaScript | Omit `"use client"` — App Router pages are server components by default; no state, no hooks, no event handlers needed |
| PAGE-03 | Page includes Apple Smart App Banner meta tag for iOS Safari users | `export const metadata: Metadata = { itunes: { appId: '6749815073' } }` in the page file produces `<meta name="apple-itunes-app" content="app-id=6749815073">` |
| PAGE-04 | Page uses existing badge assets from /public/ and store URLs from constants/links.ts | Assets confirmed: `/public/app-store-badge.svg` and `/public/google-play-badge.png`; URLs confirmed in `src/constants/links.ts`; same pattern used in `HeroHeader` component |
</phase_requirements>

---

## Summary

Phase 5 creates a single new route `/download` that renders a static, branded landing page for desktop users and undetected devices who were not auto-redirected by the Phase 4 middleware. The page is a pure Next.js App Router server component — no `"use client"` directive, no hydration, no JavaScript shipped to the browser.

The two primary technical concerns are (1) the Apple Smart App Banner and (2) badge image rendering. Both are solved by existing Next.js Metadata API capabilities already used throughout this codebase. The `itunes` field in the `Metadata` type generates the `<meta name="apple-itunes-app">` tag server-side, ensuring Safari on iOS Desktop reads it from the initial HTML. Badge images already exist in `/public/` and are used with identical props in `HeroHeader`; the `/download` page simply reuses the same pattern.

The codebase already has a strong precedent: `HeroHeader` renders both badges as `<a>` wrapping `<Image>` components with `APP_STORE_LINK`/`GOOGLE_PLAY_LINK` from `src/constants/links.ts`. The `/download` fallback page can either inline the badge markup directly in the page or extract a new `AppStoreBadges` component following the project's component folder convention.

**Primary recommendation:** Create `src/app/download/page.tsx` as a pure server component with `export const metadata` containing the `itunes` field for the Smart App Banner, and render both app store badges using the same `<Image>` + `<a>` pattern established in `HeroHeader`.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js App Router | 15.5.2 (project) | File-based page routing, server component default, Metadata API | Already in use; pages without `"use client"` are server components |
| `next/image` | same | Optimized image rendering with automatic `unoptimized` for SVG sources | Already used project-wide; badge assets at `/public/app-store-badge.svg` and `/public/google-play-badge.png` |
| CSS Modules | — | Scoped styles via `page.module.css` | Project convention — all pages use CSS Modules |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `@/constants/links` | — | `APP_STORE_LINK`, `GOOGLE_PLAY_LINK` | Always — do not hard-code store URLs |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `metadata.itunes` field | `metadata.other['apple-itunes-app']` | Either works; `itunes` field is the strongly-typed, idiomatic Next.js approach; avoid the `other` bag unless the typed field is insufficient |
| Reusing `HeroHeader` component directly | New `AppStoreBadges` component | `HeroHeader` is a full-page section with hero images; extracting a focused `AppStoreBadges` component is cleaner for reuse |

**Installation:** No new packages required — all dependencies already present.

---

## Architecture Patterns

### Recommended Project Structure

```
src/
├── app/
│   └── download/
│       ├── page.tsx          # Server component, exports metadata + default page
│       └── page.module.css   # Scoped styles for /download layout
└── components/
    └── AppStoreBadges/       # Optional: reusable badge pair component
        ├── AppStoreBadges.tsx
        ├── AppStoreBadges.module.css
        └── index.ts
```

The `AppStoreBadges` component is optional but aligns with the project's stated reusability principle ("Create generic, reusable components when patterns emerge"). The badge pair appears in `HeroHeader`, `truck/[truckId]/page.tsx`, and will appear in `/download` — three locations justifies extraction.

### Pattern 1: Pure Server Component Page with Metadata

**What:** A Next.js App Router page file that exports a `Metadata` object and a default React component. No `"use client"` directive. No hooks or event handlers.

**When to use:** Any page that displays static branding content with no client interactivity. This is the default mode in App Router.

**Example:**
```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
// src/app/download/page.tsx
import type { Metadata } from 'next';
import Image from 'next/image';
import { APP_STORE_LINK, GOOGLE_PLAY_LINK } from '@/constants/links';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Download StreetFeast',
  description: 'Get the StreetFeast app on iOS and Android.',
  itunes: {
    appId: '6749815073',
  },
};

export default function DownloadPage() {
  return (
    <main className={styles.main}>
      {/* branding + badge links */}
      <a href={APP_STORE_LINK} target="_blank" rel="noopener noreferrer">
        <Image
          src="/app-store-badge.svg"
          alt="Download on the App Store"
          width={180}
          height={63}
        />
      </a>
      <a href={GOOGLE_PLAY_LINK} target="_blank" rel="noopener noreferrer">
        <Image
          src="/google-play-badge.png"
          alt="Get it on Google Play"
          width={180}
          height={63}
        />
      </a>
    </main>
  );
}
```

### Pattern 2: Apple Smart App Banner via `metadata.itunes`

**What:** The Next.js `Metadata` type includes an `itunes` field that generates the `<meta name="apple-itunes-app" content="app-id=...">` tag in the server-rendered HTML `<head>`.

**When to use:** Any page that should show the iOS Safari Smart App Banner prompting users to download the app.

**Example:**
```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#applewebapp
export const metadata: Metadata = {
  itunes: {
    appId: '6749815073',        // from APP_STORE_LINK: /id6749815073
    appArgument: '/download',   // optional: deep-link argument passed to app
  },
};
// Generates: <meta name="apple-itunes-app" content="app-id=6749815073, app-argument=/download">
```

**Critical:** The `itunes` metadata must be exported from the page's `.tsx` file (not layout) so it applies only to the `/download` route. The root `app/layout.tsx` does NOT include this tag.

### Pattern 3: Badge Image with `next/image` (existing project pattern)

**What:** SVG images via `next/image` are automatically treated as `unoptimized` when the `src` ends in `.svg`. PNG images receive standard optimization.

**Example (from HeroHeader — established pattern):**
```typescript
// Source: src/components/HeroHeader/HeroHeader.tsx (existing)
<a href={APP_STORE_LINK} target="_blank" rel="noopener noreferrer">
  <Image
    src="/app-store-badge.svg"
    alt="Download on the App Store"
    width={180}
    height={63}
  />
</a>
<a href={GOOGLE_PLAY_LINK} target="_blank" rel="noopener noreferrer">
  <Image
    src="/google-play-badge.png"
    alt="Get it on Google Play"
    width={180}
    height={63}
  />
</a>
```

Asset dimensions:
- `app-store-badge.svg` — SVG (vector, any dimensions work; 180×63 is established project width)
- `google-play-badge.png` — 270×80px actual file; 180×63 is the display size used project-wide (aspect ratio matches)

### Anti-Patterns to Avoid

- **`"use client"` on the download page:** Violates PAGE-02 requirement and causes JavaScript hydration. No interactivity is needed on this page.
- **Rendering `apple-itunes-app` via `metadata.other`:** Works, but the `itunes` typed field is the idiomatic approach; use it.
- **Dynamically injecting the Smart App Banner meta tag client-side:** Safari only reads this tag from initial server-rendered HTML. Client-side injection (via `useEffect`) is silently ignored by iOS Safari.
- **Hard-coding store URLs:** Always import from `@/constants/links` — PAGE-04 requires this explicitly.
- **Adding `Header` or `Footer` if they require `"use client"` in any child:** `Header` is `"use client"` (it uses `useAuthStore`). Including it in the download page is fine architecturally since Next.js allows client components as children of server components, but adds client JS. Check whether the design calls for a full site header or a minimal standalone layout.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Apple Smart App Banner | Custom `<meta>` tag in JSX | `metadata.itunes.appId` field in Next.js Metadata | Idiomatic, typed, server-rendered correctly — no risk of Safari ignoring a dynamically-injected tag |
| Badge image optimization | `<img>` with manual loading | `next/image` with `width`/`height` | Automatic lazy loading, priority hints, and automatic `unoptimized` for SVG — established project pattern |

**Key insight:** This phase has zero novel infrastructure. Every required building block already exists in the codebase (`links.ts`, badge assets, `metadata` export pattern, `next/image` usage). The work is assembly, not invention.

---

## Common Pitfalls

### Pitfall 1: Smart App Banner Not Appearing on iOS Safari

**What goes wrong:** The banner never shows even though the meta tag is present in the DOM.
**Why it happens:** Safari reads `apple-itunes-app` only from the initial server-rendered HTML. If the tag is injected after page load (via `useEffect`, `document.createElement`, etc.), Safari ignores it silently.
**How to avoid:** Export `metadata.itunes` from the server component page file. Verified via official Next.js docs and GitHub Discussion #43807.
**Warning signs:** The tag appears in DevTools `<head>` but only after page JS has executed.

### Pitfall 2: Page Accidentally Becomes Client Component

**What goes wrong:** Adding any hook, event handler, or `"use client"` directive to `download/page.tsx` causes the whole page to ship JavaScript and hydrate, violating PAGE-02.
**Why it happens:** Developer adds interactivity (e.g., copy-link button, analytics event) without realizing the downstream effect.
**How to avoid:** The page component should only contain JSX with `<Image>`, `<a>`, and layout elements. Any interactive additions belong in a child client component.
**Warning signs:** `"use client"` appears in `page.tsx`, or you see `__NEXT_DATA__` hydration payload in the page source.

### Pitfall 3: Branding Inconsistency

**What goes wrong:** New page uses a different logo, font, or color palette than the rest of the site.
**Why it happens:** The download page is a new, isolated route without Header/Footer scaffolding.
**How to avoid:** Use `logowithtext.png` or `streetfeastlogowhite.png` from `/public/` for branding. Use the CSS custom property `--font-lexend` (set globally in `app/layout.tsx`) and the existing brand colors from `src/constants/colors.ts`.
**Warning signs:** Logo looks different from the homepage; font appears as system sans-serif.

### Pitfall 4: `next/image` Width/Height Mismatch for PNG Badge

**What goes wrong:** Console warning or layout shift because display `width`/`height` don't match the natural aspect ratio.
**Why it happens:** `google-play-badge.png` is 270×80px (aspect ratio 3.375:1). At display width 180, the correct height is ~53px, not 63px. However, `next/image` renders with `object-fit` semantics and the established project convention uses 180×63 for both badges.
**How to avoid:** Use the established project values of `width={180} height={63}` to match existing usage in `HeroHeader`. If pixel-perfect rendering is needed, use `width={180} height={53}` for the PNG and `width={180} height={63}` for the SVG.
**Warning signs:** "Image with src has "sizes" prop ... but is missing..." warnings, or visible badge distortion.

---

## Code Examples

Verified patterns from official sources and codebase:

### Complete Minimal Download Page

```typescript
// Source: Next.js docs + established codebase pattern
// src/app/download/page.tsx

import type { Metadata } from 'next';
import Image from 'next/image';
import { APP_STORE_LINK, GOOGLE_PLAY_LINK } from '@/constants/links';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Download StreetFeast',
  description: 'Download the StreetFeast app to discover food trucks and street vendors near you.',
  itunes: {
    appId: '6749815073',
  },
};

export default function DownloadPage() {
  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <Image
          src="/logowithtext.png"
          alt="StreetFeast"
          width={200}
          height={60}
          priority
        />
        <h1 className={styles.heading}>Get StreetFeast</h1>
        <p className={styles.subheading}>Discover food trucks and street vendors near you.</p>
        <div className={styles.badges}>
          <a href={APP_STORE_LINK} target="_blank" rel="noopener noreferrer">
            <Image
              src="/app-store-badge.svg"
              alt="Download on the App Store"
              width={180}
              height={63}
            />
          </a>
          <a href={GOOGLE_PLAY_LINK} target="_blank" rel="noopener noreferrer">
            <Image
              src="/google-play-badge.png"
              alt="Get it on Google Play"
              width={180}
              height={53}
            />
          </a>
        </div>
      </div>
    </main>
  );
}
```

### What the `itunes` Metadata Generates

```html
<!-- Source: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#applewebapp -->
<meta name="apple-itunes-app" content="app-id=6749815073">
```

### Extractable `AppStoreBadges` Component (if reuse is desired)

```typescript
// Source: CLAUDE.md component convention + HeroHeader pattern
// src/components/AppStoreBadges/AppStoreBadges.tsx
import Image from 'next/image';
import { APP_STORE_LINK, GOOGLE_PLAY_LINK } from '@/constants/links';
import styles from './AppStoreBadges.module.css';

interface AppStoreBadgesProps {
  className?: string;
}

export default function AppStoreBadges({ className }: AppStoreBadgesProps) {
  return (
    <div className={`${styles.badges} ${className ?? ''}`.trim()}>
      <a href={APP_STORE_LINK} target="_blank" rel="noopener noreferrer">
        <Image
          src="/app-store-badge.svg"
          alt="Download on the App Store"
          width={180}
          height={63}
        />
      </a>
      <a href={GOOGLE_PLAY_LINK} target="_blank" rel="noopener noreferrer">
        <Image
          src="/google-play-badge.png"
          alt="Get it on Google Play"
          width={180}
          height={53}
        />
      </a>
    </div>
  );
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Pages Router `<Head>` for metadata | App Router `export const metadata` or `generateMetadata` | Next.js 13 | Metadata is now exported as a typed object, not JSX — simpler and type-safe |
| Manual `<meta name="apple-itunes-app">` in JSX | `metadata.itunes.appId` field | Next.js 13.2 | Strongly typed, no risk of client-side injection |
| `viewport` in `metadata` object | Separate `generateViewport` export | Next.js 14 | Viewport is now its own export; do not put it in `metadata` |

**Deprecated/outdated:**
- `metadata.viewport`: Deprecated in Next.js 14. Use `generateViewport` export instead if viewport customization is needed.
- `metadata.themeColor`: Same deprecation. Use `generateViewport`.

---

## Open Questions

1. **Should the download page include the site Header and Footer?**
   - What we know: `Header` is `"use client"` (uses `useAuthStore`). Including it is technically valid (client child of server parent) but adds hydration JS for the nav.
   - What's unclear: The design spec says "minimal page" (PAGE-01). Whether "minimal" means no site chrome or just visually simple is not defined.
   - Recommendation: Build a standalone layout (no Header/Footer) for a pure, zero-JS experience. This matches the "fallback for non-mobile" intent. If branding requires the header, it can be added later without touching PAGE-02.

2. **Should the `AppStoreBadges` component be extracted as a shared component?**
   - What we know: Badges are used in 3 places (HeroHeader, truck page, download page). Project CLAUDE.md says "Create generic, reusable components when patterns emerge."
   - What's unclear: Planner's preference for scope — extraction adds a task but improves long-term DX.
   - Recommendation: Extract it in this phase. The effort is minimal (copy + refactor existing code) and prevents a 4th duplication.

---

## Sources

### Primary (HIGH confidence)

- [Next.js generateMetadata docs — itunes field](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#applewebapp) — confirmed `itunes.appId` generates `<meta name="apple-itunes-app">` server-side; confirmed `metadata` and `generateMetadata` are server-components-only; fetched 2026-02-27
- `src/components/HeroHeader/HeroHeader.tsx` — direct codebase evidence for badge image props (`width={180} height={63}`, `APP_STORE_LINK`, `GOOGLE_PLAY_LINK`)
- `src/constants/links.ts` — confirmed `APP_STORE_LINK` contains App ID `6749815073`
- `public/google-play-badge.png` — confirmed 270×80px via `identify` tool
- `public/app-store-badge.svg` — confirmed SVG (next/image auto-unoptimized)

### Secondary (MEDIUM confidence)

- [Next.js vercel/next.js Discussion #43807](https://github.com/vercel/next.js/discussions/43807) — confirmed Smart App Banner must be in initial server HTML, not dynamically injected; validated by official docs pattern
- [Next.js Image component docs](https://nextjs.org/docs/app/api-reference/components/image) — SVG src automatically sets `unoptimized`

### Tertiary (LOW confidence)

- None — all critical claims verified via official docs or direct codebase inspection.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all libraries already in use; no new dependencies
- Architecture: HIGH — confirmed from official Next.js docs and direct codebase pattern matching
- Pitfalls: HIGH — `itunes` server-only requirement confirmed from official docs and community discussion

**Research date:** 2026-02-27
**Valid until:** 2026-04-27 (Next.js App Router metadata API is stable; badge assets and constants are project-controlled)
