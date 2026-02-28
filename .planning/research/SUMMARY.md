# Project Research Summary

**Project:** StreetFeast Website Frontend — Smart App Download Page (v1.1)
**Domain:** Next.js 15 smart download page with device detection, app store redirect, and SEO
**Researched:** 2026-02-27
**Confidence:** HIGH

## Executive Summary

This project adds a `/download` route to the existing StreetFeast Next.js 15 website. The page serves one primary job: get mobile visitors to the right app store immediately, while giving desktop users and search crawlers a proper landing page. All four research streams agree on a two-layer architecture — middleware handles the redirect before any rendering occurs, and a static server component fallback serves desktop users and bots. No new dependencies are required; every capability needed already exists in Next.js 15.5.7 and in the current codebase.

The recommended approach extends the existing `src/middleware.ts` with a `/download` matcher and iOS/Android regex detection (the same pattern the project already uses for truck profile deep links). The fallback `src/app/download/page.tsx` is a pure server component that exports metadata and renders both store badges using assets already present in `/public/`. The only genuinely new files are the download route, the `DownloadPage` presentational component, and one entry added to `sitemap.ts`. Implementation scope is deliberately small.

The critical risk is architectural: placing redirect logic in the page component instead of middleware. This causes Googlebot to be redirected to the App Store, removing `/download` from Google's index entirely. A secondary risk is using a permanent redirect (308) to the app store, which browsers cache indefinitely and cannot be undone. Both risks are avoided entirely by committing to the middleware-redirect pattern from the start. A known browser limitation — iPadOS 13+ reports itself as macOS — means iPad users will see the desktop fallback page rather than auto-redirecting; this is documented as acceptable behavior since both store badges remain available.

---

## Key Findings

### Recommended Stack

The stack requires zero new npm packages. Next.js 15.5.7 built-ins cover every requirement. The project's existing middleware pattern, metadata export pattern, and CSS Modules conventions are directly reused. The only "new" capability is an inline JSON-LD `<script>` block in the server component, which is a trivial addition using Next.js's documented pattern.

**Core technologies:**
- **Next.js Middleware (existing):** Device detection and redirect — runs at the edge before any React rendering, zero cost for redirected users
- **Next.js `metadata` export (existing):** OG tags, Twitter card, canonical URL, iOS Smart App Banner — already used across all pages
- **Next.js JSON-LD inline script (new, trivial):** `MobileApplication` structured data for Google rich results — three lines, no library needed
- **CSS Modules (existing):** Fallback page styles — matches site-wide pattern
- **`src/constants/links.ts` (existing):** `APP_STORE_LINK` and `GOOGLE_PLAY_LINK` already defined — single source of truth for both middleware and page

### Expected Features

**Must have (table stakes):**
- Middleware device detection with auto-redirect to iOS App Store or Google Play — users expect a "download" link to send them directly to the store
- Fallback page with both store badges for desktop and unknown devices — required for desktop users, QR code scanners, and Googlebot
- SEO metadata (title, OG tags, Twitter card, canonical) — shareable URL must preview correctly in iMessage, Slack, and social apps

**Should have (competitive):**
- Sitemap entry for `/download` — ensures Google indexes the page; add immediately after the page exists, not a v2 item
- MobileApplication JSON-LD structured data — enables Google rich results for app search queries; low effort, add in same milestone
- StreetFeast branding on fallback page — builds trust for users arriving without the app installed

**Defer (v2+):**
- Escape hatch via `?skip=1` param to bypass redirect — only if user research shows friction
- Deferred deep linking (open specific in-app screen after install) — requires Branch or Appsflyer, significant dependency

### Architecture Approach

The architecture follows a strict two-layer separation: middleware intercepts at the edge before any React rendering and routes mobile users to the appropriate store, while the page component serves as a purely static fallback. The `DownloadPage` component is presentational only — no state, no effects, no client boundary. Store URLs flow from a single constant source (`links.ts`) to both middleware and the page component, ensuring no duplication. Googlebot, which uses a desktop user-agent, naturally passes through middleware and indexes the full fallback HTML.

**Major components:**
1. `src/middleware.ts` (modified) — reads User-Agent, redirects iOS to App Store and Android to Google Play via 307, passes desktop and bots through
2. `src/app/download/page.tsx` (new) — exports static `metadata`, renders `DownloadPage` component; no dynamic APIs called
3. `src/components/DownloadPage/` (new) — purely presentational fallback UI with both store badges; follows existing component folder convention
4. `src/app/sitemap.ts` (modified) — add `/download` entry at priority 0.8
5. `src/constants/links.ts` (unchanged) — existing `APP_STORE_LINK` and `GOOGLE_PLAY_LINK` remain the single source of truth

### Critical Pitfalls

1. **Redirect logic in page component instead of middleware** — causes Googlebot to be redirected to the App Store, removing `/download` from Google's index; keep all device-based redirects in `middleware.ts`
2. **Permanent redirect (308) to app store** — browsers cache this indefinitely; if the app store URL ever changes, mobile users are stranded with a cached redirect to a dead link; always use 307 for external app store redirects
3. **`device.type === 'desktop'` condition** — `ua-parser-js` never returns `'desktop'`; desktop is represented as `undefined`; use the `device.type || 'desktop'` pattern or check for absence of mobile/tablet type
4. **Skipping `isBot` check in middleware** — redirecting Googlebot to the App Store kills SEO for the page; check `isBot` from `userAgent(request)` and call `NextResponse.next()` for all bots
5. **iPadOS 13+ reported as macOS** — iPad users will see the desktop fallback instead of auto-redirecting; document this as an intentional design decision, not a bug, so future developers do not attempt to "fix" it and introduce complexity

---

## Implications for Roadmap

Based on research, this feature is a single, coherent milestone with clear internal ordering. The dependency chain is tight and short: middleware must be aware of the route before the route exists, but the route must exist for the fallback to render. The suggested implementation order follows these dependencies.

### Phase 1: Middleware Extension and Route Scaffold

**Rationale:** Middleware must be extended first so that when the page is created, mobile redirect behavior is already in place. This also forces a conscious decision about the `isBot` check and redirect status code (307 vs 308) before any UI work begins — getting these decisions right at the start avoids the most severe pitfalls.

**Delivers:** Working mobile redirect for iOS and Android; desktop and bot traffic falls through to a 404 until Phase 2 is complete

**Addresses:** Device detection and auto-redirect (table stakes P1 feature)

**Avoids:** Permanent redirect pitfall, bot redirect pitfall, `userAgent()` misuse pitfall

**Implementation details:**
- Extend `src/middleware.ts`: add `/download` to `matcher`, add iOS/Android detection block with `isBot` guard and 307 status
- Import `APP_STORE_LINK` and `GOOGLE_PLAY_LINK` from `src/constants/links.ts` (verify no Node-only imports that break Edge Runtime)
- Use regex `request.headers.get('user-agent')` pattern matching the existing truck redirect — not `device.type` from `userAgent()` helper, which returns `undefined` for desktop

### Phase 2: Fallback Page and Component

**Rationale:** With middleware in place, the fallback page can be built as a pure static server component. The DownloadPage component follows the established component folder convention (`ComponentName/ComponentName.tsx`, `.module.css`, `index.ts`) and reuses existing badge assets from `/public/`.

**Delivers:** Complete user-facing flow — mobile redirects to correct store, desktop sees both badges with StreetFeast branding

**Addresses:** Fallback page with store badges (P1), StreetFeast branding on fallback (P2)

**Avoids:** Client-side flash pitfall, `headers()` in page forcing dynamic render, `'use client'` on a stateless component

**Implementation details:**
- Create `src/components/DownloadPage/DownloadPage.tsx` — renders both badge images using existing `/public/app-store-badge.svg` and `/public/google-play-badge.png`
- Create `src/components/DownloadPage/DownloadPage.module.css` — Lexend font, existing color palette, no new CSS variables
- Create `src/components/DownloadPage/index.ts` — re-export
- Create `src/app/download/page.tsx` — server component, no `headers()` or dynamic APIs, renders `<DownloadPage />`

### Phase 3: Metadata, SEO, and Structured Data

**Rationale:** Metadata and JSON-LD are added to the page component created in Phase 2. This is grouped separately because it is distinct from the UI work and has its own verification requirements (Google Search Console, social preview tools). Adding it after the page exists means it can be tested against the live route.

**Delivers:** Correct social previews when `/download` is shared; Google rich result eligibility; canonical URL set to prevent duplicate content

**Addresses:** SEO metadata (P1), MobileApplication JSON-LD (P2), canonical tag, iOS Smart App Banner via `itunes.appId`

**Avoids:** Missing OG metadata pitfall, bot redirect killing SEO

**Implementation details:**
- Add `export const metadata: Metadata` to `src/app/download/page.tsx`: title, description, `openGraph`, `twitter`, `alternates.canonical`, `itunes.appId: '6749815073'`
- Add inline JSON-LD `<script>` block in page component with `MobileApplication` schema, `applicationCategory: 'FoodApplication'`, `offers.price: '0'`
- Reuse existing `/public/social-media-logo.png` (1352x632) as OG image

### Phase 4: Sitemap Update and Verification

**Rationale:** The sitemap update is the final step because it signals to crawlers that the page is ready to index. Adding it before the page and metadata are complete would cause crawlers to index an incomplete page. Verification confirms all pitfalls have been avoided before the milestone is closed.

**Delivers:** Google-discoverable `/download` page; complete "looks done but isn't" checklist verified

**Addresses:** Sitemap inclusion (P1), discoverability

**Avoids:** Page never being indexed because sitemap entry is missing

**Implementation details:**
- Add `/download` to `src/app/sitemap.ts` at priority 0.8, changeFrequency: 'monthly'
- Verify via Google Search Console URL Inspection that Googlebot sees the fallback page (not a redirect)
- Test both app store URLs resolve to the correct app on real iOS and Android devices
- Confirm middleware matcher excludes `_next/static`, `_next/image`, `favicon.ico` to avoid unnecessary overhead

### Phase Ordering Rationale

- Middleware-first ordering prevents the worst pitfall (Googlebot redirect) from ever shipping, even briefly
- Component before metadata ensures there is a rendered page to attach metadata to, and that social preview testing can be done against real rendered HTML
- Sitemap last ensures crawlers are only directed to a complete, correct page
- The four phases map to four logical commits, each independently verifiable

### Research Flags

No phases require deeper research during planning. The research is comprehensive enough to implement directly.

Phases with well-documented patterns (no additional research needed):
- **Phase 1 (Middleware):** Exact code pattern is documented in official Next.js docs and already exists in this codebase for truck deep links; copy and adapt
- **Phase 2 (Fallback Page):** Follows identical pattern to existing `HeroHeader` component; badge assets already in `/public/`; no new patterns introduced
- **Phase 3 (Metadata):** Pattern is established in `src/app/layout.tsx` and existing privacy/terms pages; JSON-LD pattern is documented in Next.js official guides
- **Phase 4 (Sitemap):** One-liner addition to existing `sitemap.ts`

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All sources are official Next.js 15 documentation verified 2026-02-27; zero new packages means zero dependency uncertainty |
| Features | HIGH | Feature set is minimal and well-understood; app store badge guidelines verified against official Apple and Google documentation |
| Architecture | HIGH | Two-layer middleware + server component pattern is Next.js's canonical approach, documented in official guides with working code examples |
| Pitfalls | HIGH | Pitfalls sourced from official docs, confirmed GitHub issues, and a critical CVE (patched in current version 15.5.7) |

**Overall confidence:** HIGH

### Gaps to Address

- **iPadOS detection decision:** Research recommends accepting the limitation (iPad users see the desktop fallback page) rather than adding client-side supplement logic. This should be explicitly confirmed as the product decision before implementation, so it is documented in code comments rather than discovered as a bug post-launch.
- **OG image specificity:** Reusing `/public/social-media-logo.png` is acceptable but a download-context-specific image (showing both platform badges) would improve conversion when the URL is shared. This is a design decision that needs input from the StreetFeast team if conversion optimization is a goal.
- **App store URL verification:** Both `APP_STORE_LINK` and `GOOGLE_PLAY_LINK` in `src/constants/links.ts` should be tested on real devices before launch to confirm they resolve to the live app, not a 404 or the store homepage.
- **`links.ts` Edge Runtime safety:** Verify that importing from `src/constants/links.ts` in middleware does not pull in any Node.js-only modules that would break the Edge Runtime. The file currently appears to be pure string constants, which is safe, but this should be confirmed.

---

## Sources

### Primary (HIGH confidence)

- [Next.js `userAgent` API Reference](https://nextjs.org/docs/app/api-reference/functions/userAgent) — `device.type` values, `isBot` field, middleware-only constraint; verified 2026-02-27
- [Next.js `generateMetadata` API Reference](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) — `itunes`, `alternates.canonical`, OG/Twitter metadata fields; verified 2026-02-27
- [Next.js JSON-LD Guide](https://nextjs.org/docs/app/guides/json-ld) — inline `<script>` pattern with XSS prevention; verified 2026-02-27
- [Next.js Redirecting Guide](https://nextjs.org/docs/app/guides/redirecting) — redirect methods, status codes, middleware vs server component; verified 2026-02-27
- [Next.js `headers()` API Reference](https://nextjs.org/docs/app/api-reference/functions/headers) — confirmed `headers()` is async in Next.js 15 and opts page into dynamic rendering; verified 2026-02-27
- [Google Structured Data: Software App](https://developers.google.com/search/docs/appearance/structured-data/software-app) — required fields for `MobileApplication`, `offers.price`; verified 2026-02-27
- [Google Spam Policies — cloaking definition](https://developers.google.com/search/docs/essentials/spam-policies) — confirmed that redirecting Googlebot differently from users is a spam violation; verified 2026-02-27
- [Apple App Store Marketing Guidelines](https://developer.apple.com/app-store/marketing/guidelines/) — official badge usage requirements
- [Google Play Badge Guidelines](https://partnermarketinghub.withgoogle.com/brands/google-play/visual-identity/badge-guidelines/) — official badge usage requirements
- [Apple Smart App Banners Documentation](https://developer.apple.com/documentation/webkit/promoting-apps-with-smart-app-banners) — `apple-itunes-app` meta tag and App ID format
- [GitHub Issue #87236](https://github.com/vercel/next.js/issues/87236) — confirms `device.type` is `undefined` for desktop (expected behavior, not a bug)
- [CVE-2025-29927](https://projectdiscovery.io/blog/nextjs-middleware-authorization-bypass) — middleware bypass vulnerability; confirmed patched in current version 15.5.7
- [iPadOS User-Agent — Apple Developer Forums](https://developer.apple.com/forums/thread/119186) — confirms iPadOS 13+ sends macOS user-agent

### Secondary (MEDIUM confidence)

- [DEV.to: Redirecting mobile users to App or Play Store in NextJS](https://dev.to/andreasbergstrom/redirecting-mobile-users-to-app-or-play-store-using-nextjs-3pp1) — community pattern; verified against official docs
- [Vercel Edge Functions User-Agent Template](https://vercel.com/templates/next.js/edge-functions-user-agent-based-rendering) — confirmed middleware approach
- [seo.ai: 301 vs 302 vs 307 redirects](https://seo.ai/blog/301-vs-302-vs-307) — SEO implications of redirect status codes
- [MobileApplication — Schema.org](https://schema.org/MobileApplication) — confirmed correct schema type for iOS/Android apps
- [GitHub Discussion #21413 — Redirect based on user-agent with ISR](https://github.com/vercel/next.js/discussions/21413) — community discussion on correct layer for UA-based redirects

---
*Research completed: 2026-02-27*
*Ready for roadmap: yes*
