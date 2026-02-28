# Feature Research

**Domain:** Smart app download page with device detection and auto-redirect
**Researched:** 2026-02-27
**Confidence:** HIGH

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist. Missing these = product feels incomplete.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Device detection and auto-redirect to correct store | Any link labeled "download" on mobile should go straight to the right store — friction at this point kills conversions | LOW | Use Next.js middleware with `userAgent` from `next/server`; regex on `os.name` for "iOS" or "Android"; redirect before page renders |
| Fallback page with both store badges for desktop/unknown | Desktop users and crawlers cannot be redirected to a store; they need a page with explicit badge links | LOW | Server component renders two badges; no client JS required; existing `/public/app-store-badge.svg` and `/public/google-play-badge.png` already in repo |
| SEO metadata for the /download route | Shareable URL must preview correctly in iMessage, Twitter, Slack; needs a title and image | LOW | `export const metadata` in `src/app/download/page.tsx` following existing pattern from `layout.tsx` and truck profile pages |
| Clean shareable URL at /download | Marketing materials, QR codes, social posts all need one stable URL | NONE | File-based routing: create `src/app/download/page.tsx` |
| Official store badge assets | Apple and Google mandate use of official badges; using unofficial images violates brand guidelines | NONE | Assets already exist: `/public/app-store-badge.svg` (Apple, 144x48), `/public/google-play-badge.png` (Google, 162x48) |

### Differentiators (Competitive Advantage)

Features that set the product apart. Not required, but valuable.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| MobileApplication JSON-LD structured data | Allows Google to display rich results for the app (name, rating, price); improves search appearance beyond just indexing the page | LOW | Add `<script type="application/ld+json">` block in the download page; schema.org `MobileApplication` type; required fields: `name`, `offers.price`; recommended: `operatingSystem`, `applicationCategory`, `aggregateRating` |
| StreetFeast branding on fallback page | Reinforces brand trust when user lands without the app installed; not just a generic store redirect | LOW | Use existing logo assets (`/public/streetfeastlogowhite.png`, `/public/logowithtext.png`); apply existing CSS Modules patterns |
| OG image tuned for "download" context | A screenshot or branded image with "Download StreetFeast" framing converts better when the URL is shared on social | LOW | `/public/social-media-logo.png` already exists and can be reused; or use `/public/app-screenshot.png` for higher conversion |
| Sitemap inclusion | Ensures Google indexes the page; supports discoverability for "streetfeast app download" searches | NONE | Add `/download` entry to `src/app/sitemap.ts` following the existing pattern |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but create problems.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Client-side JS redirect on the download page | Seems simpler — run navigator.userAgent check in a useEffect | Googlebot and social crawlers see a blank page before hydration; the fallback content they need to index is never rendered; also introduces a flash of content before redirect | Use Next.js middleware for server-side redirect; fallback page is a server component with no client JS |
| Redirect Googlebot to the App Store | Might seem like a good SEO signal | This is textbook cloaking — serving different destinations to crawlers vs users based on user-agent is a Google spam policy violation | Let Googlebot hit the fallback page normally via `isBot` check in middleware |
| Third-party smart link service (Branch, Appsflyer OneLink) | One URL handles everything including deferred deep linking | Adds external dependency, vendor lock-in, and a network round-trip; for a simple download redirect without deferred deep linking this is overengineering | Self-hosted middleware redirect is ~10 lines of code with no external dependency |
| User-agent-based redirect inside the page component (not middleware) | Seems like it avoids middleware complexity | User-agent via `headers()` in a server component works but fires after the route matches; middleware fires before any rendering and is the canonical Next.js pattern for this | Implement redirect in `middleware.ts` scoped to `matcher: '/download'` |
| Animated loading state while redirect happens | Makes the redirect feel polished | Redirect happens server-side before any HTML is sent; the user never sees a page render; adding a loading animation requires client JS and defeats the purpose | Server-side redirect is instantaneous; no loading state needed |
| "No thanks, stay on web" button on mobile | Gives user an escape hatch | The redirect happens before the page renders — there is no page to add a button to | If an escape hatch is desired later, append `?skip=1` param to bypass redirect in middleware; this is a v2 concern |

## Feature Dependencies

```
[Middleware redirect to correct store]
    └──requires──> [/download route file exists]
    └──requires──> [APP_STORE_LINK, GOOGLE_PLAY_LINK constants]
                       (already satisfied — src/constants/links.ts)

[Fallback page with store badges]
    └──requires──> [/download route exists as server component]
    └──requires──> [Badge assets in /public/]
                       (already satisfied — both badge files exist)

[SEO metadata for /download]
    └──requires──> [/download is a server component with metadata export]
    └──enhances──> [Fallback page with store badges]

[MobileApplication JSON-LD]
    └──requires──> [Fallback page is a server component]
    └──enhances──> [SEO metadata for /download]

[Sitemap inclusion]
    └──requires──> [/download route is indexable by Googlebot]
    └──requires──> [Middleware does NOT redirect Googlebot to App Store]
                       (middleware must use isBot check to pass crawlers through)
```

### Dependency Notes

- **Middleware requires the /download route file:** Middleware intercepts requests before the page renders, but `page.tsx` must exist so the fallback response has something to render for non-mobile visitors and bots.
- **MobileApplication JSON-LD requires server component:** JSON-LD structured data must be in the initial HTML, not injected by client JS; since the fallback page needs no interactivity, a server component is the right choice and makes this free.
- **Sitemap requires bot passthrough in middleware:** If middleware redirects all user-agents including Googlebot, the page will never be indexed. The middleware must check `userAgent(request).isBot` and let crawlers fall through to the page.

## MVP Definition

### Launch With (v1 — this milestone)

Minimum viable product for the /download page.

- [ ] Next.js middleware at `matcher: '/download'` that reads `userAgent(request)`, skips bots via `isBot`, redirects iOS to App Store, Android to Google Play, and passes desktop through — the primary purpose of the page
- [ ] Server component fallback page at `src/app/download/page.tsx` with both store badges and StreetFeast branding — required for desktop users, QR code scanners on undetected devices, and Googlebot
- [ ] `export const metadata` with title, description, OG tags, and Twitter card on the download page — shareable URL must preview correctly in social/messaging apps

### Add After Validation (v1.x)

Features to add once core is working.

- [ ] Sitemap entry for /download at `src/app/sitemap.ts` — low effort, ensures Google indexes the page; add immediately after the page exists
- [ ] MobileApplication JSON-LD structured data — add if SEO ranking for "streetfeast download" becomes a priority; low effort

### Future Consideration (v2+)

Features to defer until product-market fit is established.

- [ ] Escape hatch via `?skip=1` query param to bypass redirect — only if user research shows frustration with auto-redirect
- [ ] Deferred deep linking (open specific in-app screen after install) — requires Branch or Appsflyer; significant dependency; only relevant for targeted campaigns

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Middleware device detection + redirect | HIGH | LOW | P1 |
| Fallback page with both badges | HIGH | LOW | P1 |
| SEO metadata (title, OG tags, Twitter card) | HIGH | LOW | P1 |
| Sitemap inclusion for /download | MEDIUM | LOW | P1 (add immediately after page exists) |
| MobileApplication JSON-LD structured data | MEDIUM | LOW | P2 |
| App screenshot on fallback page | LOW | LOW | P2 |
| Escape hatch / skip redirect param | LOW | MEDIUM | P3 |

**Priority key:**
- P1: Must have for launch
- P2: Should have, add when possible
- P3: Nice to have, future consideration

## Competitor Feature Analysis

| Feature | Typical Approach | Our Approach |
|---------|-----------------|--------------|
| Device detection | Third-party services (Branch, Adjust, Appsflyer) or custom middleware | Custom Next.js middleware using built-in `userAgent()` — no external dependency |
| Bot passthrough | Often missed — bots get redirected to store, page is never indexed | `userAgent(request).isBot` check in middleware; bots see the fallback page |
| Fallback page design | Usually minimal: two badges on branded background | StreetFeast branding + two official badge assets already in /public/ |
| OG image | Usually the app icon or a screenshot | Reuse existing `/public/social-media-logo.png` or `/public/app-screenshot.png` |
| Structured data | Usually absent on download pages | Add MobileApplication JSON-LD as a P2 for Google rich results |

## Implementation Notes (Existing Codebase)

These observations come from reading the existing code and are relevant to avoiding rework:

- **User-agent detection already exists client-side** in `src/app/truck/[truckId]/page.tsx` (lines 40-48) using `navigator.userAgent` with `/iPad|iPhone|iPod/` and `/android/i` regex patterns. The middleware should use the same regex on the `ua` string from `userAgent(request)`, or check `os.name === 'iOS'` and `os.name === 'Android'`.
- **Store badge assets are already present:** `/public/app-store-badge.svg` (width 144, height 48) and `/public/google-play-badge.png` (width 162, height 48) — use the same dimensions as the truck profile modal for visual consistency.
- **Store link constants are centralized:** `APP_STORE_LINK` and `GOOGLE_PLAY_LINK` in `src/constants/links.ts` — both middleware and the fallback page should import from there.
- **Metadata pattern is established:** `src/app/layout.tsx` shows the full OG/Twitter pattern. The download page metadata export should follow that pattern with a download-specific title ("Download StreetFeast") and description.
- **Sitemap is at `src/app/sitemap.ts`** — adding `/download` is a one-liner addition.
- **No `middleware.ts` currently exists** in the project — this is a net-new file at the project root alongside `next.config.ts`.
- **Next.js 15.5.2 with default Edge Runtime** is sufficient for a simple user-agent regex redirect. No need to opt into Node.js runtime for middleware — the edge runtime supports `userAgent()` from `next/server` natively.

## Sources

- [Next.js userAgent API reference](https://nextjs.org/docs/app/api-reference/functions/userAgent) — HIGH confidence, checked 2026-02-27
- [Redirecting mobile users to App or Play Store using Next.js — DEV Community](https://dev.to/andreasbergstrom/redirecting-mobile-users-to-app-or-play-store-using-nextjs-3pp1) — MEDIUM confidence
- [Software app structured data — Google Search Central](https://developers.google.com/search/docs/appearance/structured-data/software-app) — HIGH confidence
- [MobileApplication — Schema.org](https://schema.org/MobileApplication) — HIGH confidence
- [Google Spam Policies — cloaking definition](https://developers.google.com/search/docs/essentials/spam-policies) — HIGH confidence
- [Apple App Store Marketing Guidelines](https://developer.apple.com/app-store/marketing/guidelines/) — HIGH confidence
- [Google Play Badge Guidelines](https://partnermarketinghub.withgoogle.com/brands/google-play/visual-identity/badge-guidelines/) — HIGH confidence
- [Next.js 15 middleware edge runtime limitations — GitHub Discussion](https://github.com/vercel/next.js/discussions/71727) — MEDIUM confidence

---
*Feature research for: smart app download page with device detection — StreetFeast v1.1*
*Researched: 2026-02-27*
