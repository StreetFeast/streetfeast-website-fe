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

### Active

- [ ] Smart app download page at /download with device detection and auto-redirect
- [ ] Fallback landing page with both store badges when device is undetected
- [ ] SEO-optimized metadata and OG tags for the download page

### Out of Scope

- Backend changes — frontend-only
- App store submission or mobile app changes — website only
- Custom app store badge design — use official Apple/Google badges

## Current Milestone: v1.1 App Download Page

**Goal:** Provide a shareable, SEO-optimized download page that auto-redirects mobile users to the correct app store and shows a fallback page with both store badges for desktop/unknown devices.

**Target features:**
- Device detection via user-agent with auto-redirect to iOS App Store or Google Play
- Minimal fallback page with StreetFeast branding and both store badge buttons
- SEO optimization (metadata, OG tags, structured data)
- Clean shareable URL at /download

## Context

- App store URLs centralized in `src/constants/links.ts`
- Existing `/m/` route handles deep links for Universal Links / App Links
- Site uses Next.js 15 App Router with server-side rendering
- Existing SEO patterns: sitemap.ts, robots.ts, metadata exports in page files
- Cookie consent banner and conditional script loading already implemented (v1.0)

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
| Auto-redirect for /download on mobile | Fastest path to app store for mobile users | — Pending |
| Fallback page with both store badges | Covers desktop and hidden user-agent cases | — Pending |
| User-agent detection for device routing | Standard approach, with fallback when undetectable | — Pending |

---
*Last updated: 2026-02-27 after milestone v1.1 started*
