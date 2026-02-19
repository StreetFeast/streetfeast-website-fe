# StreetFeast Website Frontend

## What This Is

A Next.js landing page and business portal for StreetFeast, a mobile app that helps users discover street food vendors, food trucks, and pop-up restaurants. The website serves as a marketing landing page, truck owner registration/login portal, truck profile display, and business contact point.

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

### Active

- [ ] Cookie consent banner for reCAPTCHA 3 and FingerprintJS
- [ ] Cookie preference persistence in localStorage
- [ ] Contact Us form disabled when cookies are declined
- [ ] Modal overlay on Contact Us requiring cookie acceptance and ToS acknowledgment
- [ ] Cookie Preferences link in footer to re-open consent banner
- [ ] Conditional loading of reCAPTCHA and FingerprintJS based on cookie consent

### Out of Scope

- Backend changes — frontend-only cookie consent implementation
- GDPR-level cookie management with per-category granular controls — simple accept/decline is sufficient
- Third-party cookie consent platforms (OneTrust, CookieBot) — building in-house to match existing design

## Context

- reCAPTCHA v3 is currently always loaded via `GoogleReCaptchaProvider` in `Providers.tsx`
- FingerprintJS is loaded on-demand in `useContactForm.ts` when the contact form is submitted
- Both are used exclusively for the Contact Us form (`POST /api/v1/Business/ContactUs`)
- The existing Providers component wraps the entire app with reCAPTCHA — this will need to become conditional based on cookie consent
- There is an existing Terms of Service page at `/terms`
- The Footer component exists and will need a "Cookie Preferences" link added

## Constraints

- **Tech stack**: Next.js 15 with App Router, TypeScript, CSS Modules — no external UI libraries
- **Design**: Must match existing site styling (Lexend font, existing color palette, CSS Modules pattern)
- **Component pattern**: Each component in its own folder with `.tsx`, `.module.css`, `index.ts`
- **State**: Cookie consent state managed via Zustand store with localStorage persistence (matching existing auth store pattern)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Bottom bar banner (not modal) | Non-blocking UX, user can browse while deciding | — Pending |
| localStorage for persistence | Matches existing Zustand + localStorage pattern in authStore | — Pending |
| Replace form entirely when cookies declined | Cleaner UX than grayed-out form behind modal | — Pending |
| Footer link for re-consent | Users can change their mind without clearing browser data | — Pending |
| ToS link in modal (no checkbox) | Simpler UX — clicking "Accept" implies agreement | — Pending |

---
*Last updated: 2026-02-19 after initialization*
