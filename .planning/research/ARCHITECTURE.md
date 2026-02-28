# Architecture Research: Smart App Download Page Integration

**Domain:** Next.js 15 App Router — smart download page with device detection and auto-redirect
**Researched:** 2026-02-27
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         Next.js 15 Request Pipeline                      │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  Incoming Request: GET /download                                          │
│      ↓                                                                    │
│  ┌─────────────────────────────────────────────────────────────────┐     │
│  │  src/middleware.ts  (runs FIRST, before any page render)         │     │
│  │                                                                   │     │
│  │  1. Read User-Agent header via request.headers.get('user-agent') │     │
│  │  2. Test against /iPhone|iPad|iPod|Android/i                     │     │
│  │  3a. iOS    → NextResponse.redirect(APP_STORE_URL, 302)          │     │
│  │  3b. Android → NextResponse.redirect(GOOGLE_PLAY_URL, 302)       │     │
│  │  3c. Desktop / Unknown → NextResponse.next()                     │     │
│  └──────────────────────────┬──────────────────────────────────────┘     │
│                             │ (only reaches page when device undetected)  │
│                             ↓                                             │
│  ┌─────────────────────────────────────────────────────────────────┐     │
│  │  src/app/download/page.tsx  (Server Component — SSR)             │     │
│  │                                                                   │     │
│  │  - Renders static fallback HTML with both store badges           │     │
│  │  - Exports metadata for SEO and OG tags                          │     │
│  │  - Imports DownloadFallback component for badge layout           │     │
│  └─────────────────────────────────────────────────────────────────┘     │
│                                                                           │
└─────────────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Implementation |
|-----------|----------------|----------------|
| `src/middleware.ts` | Device detection and redirect for /download | MODIFIED — add `/download` to existing matcher, add iOS/Android routing |
| `src/app/download/page.tsx` | Fallback page for desktop/unknown devices; exports page metadata | NEW — Server Component, static |
| `src/components/DownloadPage/` | Fallback UI with both store badges | NEW — Client-optional, purely presentational |
| `src/constants/links.ts` | Centralised App Store and Google Play URLs | EXISTING — no changes needed |
| `src/app/sitemap.ts` | Add /download to crawlable sitemap | MODIFIED — add download URL entry |

## Recommended Project Structure

Changes for this milestone are minimal by design. The existing architecture already has all the primitives.

```
src/
├── middleware.ts              # MODIFIED: add /download matcher + iOS/Android redirect
├── app/
│   ├── download/              # NEW: download page route
│   │   └── page.tsx           # NEW: Server Component with metadata export + DownloadPage component
│   ├── sitemap.ts             # MODIFIED: add /download entry
│   └── ...
├── components/
│   ├── DownloadPage/          # NEW: presentational fallback UI
│   │   ├── DownloadPage.tsx
│   │   ├── DownloadPage.module.css
│   │   └── index.ts
│   └── ...
└── constants/
    └── links.ts               # EXISTING: APP_STORE_LINK + GOOGLE_PLAY_LINK already defined
```

### Structure Rationale

- **middleware.ts:** The redirect must happen in middleware, not in the page, so mobile users never render the page at all. Middleware runs before any rendering, before the React tree, and before the component imports — this is the earliest possible interception point, which also means zero JS hydration cost for redirected users.
- **download/page.tsx as a Server Component:** The fallback page for desktop/unknown users has no client state requirements. Exporting `metadata` from a Server Component is idiomatic Next.js 15 and ensures OG tags are rendered as static HTML in the `<head>`.
- **DownloadPage component folder:** Follows the existing component convention (`ComponentName/ComponentName.tsx`, `.module.css`, `index.ts`). Keeping it as a separate component makes it testable and reusable.
- **constants/links.ts:** URLs are already centralised. The middleware and the page both import from the same source. No duplication.

## Architectural Patterns

### Pattern 1: Middleware-First Device Redirect

**What:** Intercept /download in `middleware.ts` before the page renders. Use `request.headers.get('user-agent')` to detect iOS vs Android and redirect immediately with `NextResponse.redirect()`.

**When to use:** Any time you need a redirect decision that depends on request headers. Middleware is the only place in Next.js where you can read raw request headers and redirect before any rendering occurs.

**Trade-offs:**
- PROS: Zero cost for redirected users (no page render, no React, no JS download). Redirect runs at the Edge if deployed to Vercel Edge Network. Googlebot (desktop UA) hits the fallback page and indexes it correctly.
- CONS: User-agent spoofing is trivially possible, but this is acceptable for a soft redirect to a store — it is not a security boundary.

**Example:**
```typescript
// src/middleware.ts (modified)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { APP_STORE_LINK, GOOGLE_PLAY_LINK } from '@/constants/links';

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';
  const { pathname } = request.nextUrl;

  // --- /download: smart app store redirect ---
  if (pathname === '/download') {
    const isIOS = /iPhone|iPad|iPod/i.test(userAgent);
    const isAndroid = /Android/i.test(userAgent);

    if (isIOS) {
      return NextResponse.redirect(APP_STORE_LINK, { status: 302 });
    }
    if (isAndroid) {
      return NextResponse.redirect(GOOGLE_PLAY_LINK, { status: 302 });
    }
    // Desktop / unknown: fall through to page
    return NextResponse.next();
  }

  // --- existing: /truck/:id deep link for Universal Links ---
  const truckMatch = pathname.match(/^\/truck\/([^\/]+)$/);
  if (truckMatch && /iPhone|iPad|iPod|Android/i.test(userAgent)) {
    const truckId = truckMatch[1];
    const url = request.nextUrl.clone();
    url.pathname = `/m/truck/${truckId}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/download', '/truck/:path*'],
};
```

**Note on importing from constants in middleware:** Next.js middleware runs in the Edge Runtime (or Node.js runtime from v15.2+). `src/constants/links.ts` is a pure string constant file with no browser APIs or Node-only imports, so it is safe to import from middleware.

### Pattern 2: Server Component Page with Static Metadata

**What:** The fallback page at `/download` is a Server Component that exports a `metadata` constant and renders the `DownloadPage` component. No client state is needed because the page is purely presentational.

**When to use:** Any page where content is static and you need metadata (OG tags, Twitter cards, canonical URL) rendered in server-side HTML.

**Trade-offs:**
- PROS: OG tags are in static HTML — no client-side scripting needed for social sharing to work. Next.js generates the `<head>` tags from the `metadata` export automatically.
- CONS: None for this use case. The page has no dynamic server data.

**Example:**
```typescript
// src/app/download/page.tsx
import type { Metadata } from 'next';
import { DownloadPage } from '@/components/DownloadPage';

export const metadata: Metadata = {
  title: 'Download StreetFeast',
  description: 'Download the StreetFeast app on iOS or Android. Discover the best food trucks, street vendors, and pop-up restaurants near you.',
  openGraph: {
    title: 'Download StreetFeast',
    description: 'Discover amazing street food near you. Available on iOS and Android.',
    url: 'https://streetfeastapp.com/download',
    images: [
      {
        url: '/social-media-logo.png',
        width: 1352,
        height: 632,
        alt: 'StreetFeast App',
      },
    ],
  },
};

export default function DownloadRoute() {
  return <DownloadPage />;
}
```

### Pattern 3: Purely Presentational Fallback Component

**What:** `DownloadPage` component renders both app store badges using the existing badge assets (`/app-store-badge.svg`, `/google-play-badge.png`) and the existing `APP_STORE_LINK` / `GOOGLE_PLAY_LINK` constants. No hooks, no state, no client boundary needed.

**When to use:** When a component is purely declarative — renders fixed content derived from constants, not user or server data.

**Trade-offs:**
- PROS: Renders entirely on the server as part of the Server Component tree. Smallest possible JS bundle contribution. Matches existing `HeroHeader` pattern for badge rendering.
- CONS: None. If future interactivity is needed (e.g. QR code generation on hover), a `"use client"` boundary can be added at that time.

**Example:**
```typescript
// src/components/DownloadPage/DownloadPage.tsx
import Image from 'next/image';
import { APP_STORE_LINK, GOOGLE_PLAY_LINK } from '@/constants/links';
import styles from './DownloadPage.module.css';

export default function DownloadPage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Download StreetFeast</h1>
      <p className={styles.description}>
        Discover the best food trucks and street vendors near you.
      </p>
      <div className={styles.badges}>
        <a href={APP_STORE_LINK} target="_blank" rel="noopener noreferrer">
          <Image src="/app-store-badge.svg" alt="Download on the App Store" width={180} height={63} />
        </a>
        <a href={GOOGLE_PLAY_LINK} target="_blank" rel="noopener noreferrer">
          <Image src="/google-play-badge.png" alt="Get it on Google Play" width={180} height={63} />
        </a>
      </div>
    </main>
  );
}
```

## Data Flow

### Request Flow: Mobile User

```
GET /download (iPhone UA)
    ↓
middleware.ts runs
    ↓
/iPhone|iPad|iPod/i test → true
    ↓
NextResponse.redirect(APP_STORE_LINK, { status: 302 })
    ↓
Browser follows 302 → App Store product page
```

### Request Flow: Desktop or Unknown User Agent

```
GET /download (desktop UA or no UA)
    ↓
middleware.ts runs
    ↓
iOS test: false, Android test: false
    ↓
NextResponse.next()
    ↓
src/app/download/page.tsx (Server Component renders)
    ↓
Static HTML + metadata <head> tags returned to browser
    ↓
User sees fallback page with both store badges
```

### Request Flow: Googlebot / Crawler

```
GET /download (Googlebot desktop UA)
    ↓
middleware.ts: no iOS/Android match → NextResponse.next()
    ↓
page.tsx renders with metadata export
    ↓
Crawler indexes /download with correct title, description, OG tags
    ↓
/download appears in search results (SEO preserved)
```

### Key Data Flows

1. **Store URLs:** `src/constants/links.ts` → imported by both `middleware.ts` (for redirect targets) and `DownloadPage` (for badge hrefs). Single source of truth.
2. **Device signal:** HTTP `User-Agent` header → read in middleware → drives redirect vs. pass-through decision. Never reaches client JavaScript.
3. **Metadata:** Exported `metadata` object in `page.tsx` → Next.js App Router injects into `<head>` during SSR. No runtime work needed.

## Integration Points

### Modified Files

| File | Change | Rationale |
|------|--------|-----------|
| `src/middleware.ts` | Add `/download` to `matcher`, add iOS/Android redirect logic | Redirect must happen pre-render |
| `src/app/sitemap.ts` | Add `/download` URL entry (priority 0.8, changeFrequency: 'monthly') | Ensures search engines discover and index the page |

### New Files

| File | Purpose |
|------|---------|
| `src/app/download/page.tsx` | Route entrypoint, metadata export, renders DownloadPage |
| `src/components/DownloadPage/DownloadPage.tsx` | Fallback UI with store badges |
| `src/components/DownloadPage/DownloadPage.module.css` | Styles matching site design system |
| `src/components/DownloadPage/index.ts` | Re-export following component convention |

### Unchanged Files

| File | Why Untouched |
|------|---------------|
| `src/constants/links.ts` | App store URLs already defined and correct |
| `src/app/layout.tsx` | Root layout is shared — download page inherits Header/Footer via LayoutContent if needed, or opts out |
| `src/app/robots.ts` | No change needed — /download should be crawlable (default allow) |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| `middleware.ts` ↔ `constants/links.ts` | Direct import (compile-time) | Safe — links.ts has no browser or Node-only APIs |
| `download/page.tsx` ↔ `DownloadPage/` | React component import | Server Component consuming another Server Component — no client boundary needed |
| `DownloadPage` ↔ `constants/links.ts` | Direct import (compile-time) | Same pattern as existing `HeroHeader` |
| `download/page.tsx` ↔ `layout.tsx` | Next.js App Router parent-child | DownloadPage inherits root layout automatically |

## SEO Considerations

### Why 302 (Temporary) Not 301 (Permanent)

Use `{ status: 302 }` for the app store redirect. The `/download` URL should remain indexable — crawlers (which use desktop user agents) will follow the middleware's `NextResponse.next()` path and index the fallback page. A 301 permanent redirect would tell search engines to update their index to the App Store URL, which would drop /download from search results entirely.

HIGH confidence. Source: Next.js documentation confirms `NextResponse.redirect()` defaults to 307 (temporary, method-preserving). Explicitly pass `{ status: 302 }` for a standard temporary redirect. Both 302 and 307 preserve the /download URL in the search index.

### Googlebot Behavior

Googlebot identifies as a desktop browser. The middleware iOS/Android regex will not match Googlebot's user agent. Googlebot will receive `NextResponse.next()`, reach `page.tsx`, and index the static HTML with the correct `<title>`, `<meta description>`, and OG tags. This is the desired behavior.

### Sitemap Entry

The `/download` page must be added to `sitemap.ts` so search engines discover it during crawl. Priority 0.8 is appropriate (below the homepage at 1.0, above legal pages at 0.5).

## Build Order and Dependencies

Dependencies are minimal. This is a contained addition.

### Step 1: Modify middleware.ts (no dependencies)

Add `/download` to the `matcher` array and insert the iOS/Android detection block before the existing truck redirect logic. This is a pure extension — no existing behavior changes.

Verify by running `npm run dev` and accessing `/download` from a desktop browser (should render 404 until step 2 is done) and from a mobile device browser or with a spoofed iOS user-agent (should redirect to App Store).

### Step 2: Create DownloadPage component (depends on: constants/links.ts — already exists)

Build the fallback UI. Follows the identical pattern of `HeroHeader` — imports badge assets from `public/`, imports store URLs from `constants/links.ts`, uses CSS Modules. No new patterns introduced.

### Step 3: Create download/page.tsx (depends on: DownloadPage component from step 2)

Wire up the page route with the metadata export and render `<DownloadPage />`. At this point the full flow works: desktop gets the fallback page, mobile redirects to the store.

### Step 4: Update sitemap.ts (depends on: page existing from step 3)

Add the `/download` URL to ensure crawlers find and index it. This is a one-liner addition to the existing sitemap array.

## Anti-Patterns

### Anti-Pattern 1: Device Detection in the Page Component Instead of Middleware

**What people do:** Import `headers()` from `next/headers` inside `page.tsx`, read the user-agent, then call `redirect()` from `next/navigation` inside the Server Component.

**Why it is wrong:**
- The page still renders its import graph before the redirect fires — Next.js executes the Server Component tree to find the `redirect()` call. This wastes server work.
- More importantly, calling `headers()` inside a Server Component opts that page into **dynamic rendering** (Next.js cannot statically cache it). Middleware runs before rendering and does not carry this cost.
- The middleware approach means zero rendering cost for redirected mobile users.

**Do this instead:** Keep device-based redirects in `middleware.ts`. Reserve `headers()` in Server Components for cases where you need the user-agent to influence rendered content (not when you are redirecting away entirely).

### Anti-Pattern 2: Client-Side Device Detection with useEffect

**What people do:** Use `navigator.userAgent` inside a `useEffect` hook in a Client Component to detect device type, then redirect with `window.location.href = APP_STORE_LINK`.

**Why it is wrong:**
- User sees the page render and flash before the redirect fires (poor UX).
- Requires shipping a Client Component boundary and JavaScript to the browser just to redirect away from the page.
- Crawlers see the full page HTML but the redirect never fires (crawlers do not execute JS reliably), which is actually correct in this case — but the architecture is fragile and the UX is bad.

**Do this instead:** Middleware redirect — zero flash, zero JS, crawler-safe.

### Anti-Pattern 3: Hardcoding App Store URLs in middleware.ts

**What people do:** Copy the App Store and Google Play URLs directly into `middleware.ts` as string literals.

**Why it is wrong:**
- When URLs change, there are now two places to update.
- Existing `src/constants/links.ts` is the established single source of truth.
- Inconsistency between middleware and page badge hrefs becomes possible.

**Do this instead:** Import `APP_STORE_LINK` and `GOOGLE_PLAY_LINK` from `@/constants/links` in middleware. This is safe — `links.ts` is a pure constant module with no Node or browser dependencies.

### Anti-Pattern 4: Adding /download to an Existing Universal Links / AASA Scope

**What people do:** Assume `/download` should be listed in the `apple-app-site-association` or `assetlinks.json` file because it is "related to the app."

**Why it is wrong:**
- Universal Links and App Links are for deep-linking into an already-installed app. `/download` is for redirecting users who may not have the app installed.
- Adding `/download` to the AASA scope would cause iOS to intercept the URL and try to open the app directly — bypassing the App Store redirect for users who don't have the app, which is the opposite of the goal.

**Do this instead:** Keep `/download` out of AASA/assetlinks scope. The middleware handles the redirect. The existing `/m/` route handles Universal Links.

## Sources

**Next.js 15 Official Documentation (HIGH confidence):**
- [Functions: userAgent — Next.js](https://nextjs.org/docs/app/api-reference/functions/userAgent)
- [Functions: headers — Next.js](https://nextjs.org/docs/app/api-reference/functions/headers)
- [Middleware / Proxy file convention — Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/proxy)

**Community Patterns (MEDIUM confidence — verified against Next.js docs):**
- [Redirecting mobile users to App or Play Store in NextJS — DEV Community](https://dev.to/andreasbergstrom/redirecting-mobile-users-to-app-or-play-store-using-nextjs-3pp1)
- [User-Agent Based Rendering — Vercel Templates](https://vercel.com/templates/next.js/edge-functions-user-agent-based-rendering)

**SEO redirect status codes (MEDIUM confidence):**
- [301 vs 302 vs 307: Which Redirect is Best for SEO? — seo.ai](https://seo.ai/blog/301-vs-302-vs-307)

---
*Architecture research for: Smart App Download Page — Next.js 15 App Router integration*
*Researched: 2026-02-27*
