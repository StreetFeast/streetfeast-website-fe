# StreetFeast Website Frontend

## What This Is

A Next.js landing page and business portal for StreetFeast, a mobile app that helps users discover street food vendors, food trucks, and pop-up restaurants. The website serves as a marketing landing page, truck owner registration/login portal, truck profile display, business contact point, and smart app download page with device-aware store routing.

## Core Value

Food truck owners can register, manage their profiles, and be discovered by hungry customers through a polished, fast web experience.

## Requirements

### Validated

- ✓ Landing page with hero, features showcase, app download links — existing
- ✓ Truck owner registration with email/password via Supabase Auth — existing
- ✓ Truck owner login with session persistence — existing
- ✓ Email verification flow — existing
- ✓ Password reset flow — existing
- ✓ Dynamic truck profile pages with schedule, menu, map — existing
- ✓ Contact form with reCAPTCHA v3 and FingerprintJS spam prevention — existing
- ✓ Protected profile dashboard (home, contact, subscription, tutorials) — existing
- ✓ Mobile app deep link redirects — existing
- ✓ SEO optimization (sitemap, robots, OG tags) — existing
- ✓ Privacy policy and Terms of Service pages — existing
- ✓ GDPR data deletion page — existing
- ✓ Cookie consent banner with accept/reject and conditional script loading — v1.0
- ✓ Cookie preference persistence via Zustand + localStorage — v1.0
- ✓ Contact form gating with no-consent email alternative — v1.0
- ✓ Footer "Cookie Preferences" link for re-consent — v1.0
- ✓ Conditional reCAPTCHA/FingerprintJS loading based on consent — v1.0
- ✓ Device-aware /download page with middleware auto-redirect to app stores — v1.1
- ✓ Zero-JS fallback page with both app store badges — v1.1
- ✓ SEO-optimized download page (OG, Twitter, JSON-LD, sitemap) — v1.1

### Active

(None — planning next milestone)

### Out of Scope

- Backend changes — frontend-only
- App store submission or mobile app changes — website only
- Custom app store badge design — use official Apple/Google badges
- Client-side device detection via useEffect — middleware is correct approach
- 301/308 permanent redirects for /download — would remove from search index

## Context

Shipped v1.1 with 16,182 LOC TypeScript.
Tech stack: Next.js 15, TypeScript, CSS Modules, Zustand, Supabase Auth.
App store URLs centralized in `src/constants/links.ts`.
Existing `/m/` route handles deep links for Universal Links / App Links.
Cookie consent banner and conditional script loading (v1.0).
Device-aware /download page with middleware redirects and SEO (v1.1).

## Constraints

- **Tech stack**: Next.js 15 with App Router, TypeScript, CSS Modules — no external UI libraries
- **Design**: Must match existing site styling (Lexend font, existing color palette, CSS Modules pattern)
- **Component pattern**: Each component in its own folder with `.tsx`, `.module.css`, `index.ts`
- **State**: Cookie consent state managed via Zustand store with localStorage persistence (matching existing auth store pattern)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Bottom bar banner (not modal) | Non-blocking UX, user can browse while deciding | ✓ Good |
| localStorage for persistence | Matches existing Zustand + localStorage pattern in authStore | ✓ Good |
| Replace form entirely when cookies declined | Cleaner UX than grayed-out form behind modal | ✓ Good |
| Footer link for re-consent | Users can change their mind without clearing browser data | ✓ Good |
| ToS link in no-consent alternative (not banner) | Simpler UX — shown only in relevant context | ✓ Good |
| Auto-redirect for /download on mobile | Fastest path to app store for mobile users | ✓ Good |
| Fallback page with both store badges | Covers desktop and hidden user-agent cases | ✓ Good |
| User-agent detection for device routing | Standard approach, with fallback when undetectable | ✓ Good |
| Bot-first gate in middleware | Crawlers always see page HTML, never get redirected | ✓ Good |
| 307 temporary redirects to app stores | Prevents browser cache lock-in from permanent redirects | ✓ Good |
| Pure server component for /download | Zero client JS, no hydration, no flash of content | ✓ Good |
| JSON-LD for structured data (not OG type) | OG protocol has no MobileApplication type | ✓ Good |

---
*Last updated: 2026-02-28 after v1.1 milestone*
