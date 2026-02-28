# Milestones: StreetFeast Website Frontend

## v1.0 — Cookie Consent

**Completed:** 2026-02-19
**Phases:** 1–3

**What shipped:**
- Zustand consent store with localStorage persistence and SSR hydration handling
- Cookie consent banner with equal-prominence accept/reject buttons
- Keyboard-navigable, WCAG 2.2 AA compliant banner
- Conditional reCAPTCHA and FingerprintJS loading based on consent
- Contact form gating with no-consent email alternative
- Footer "Cookie Preferences" link for re-consent
- Privacy policy updated for Google reCAPTCHA data controller shift

**Requirements delivered:** 13/13 (BNRR-01–07, SCRP-01–03, A11Y-01–03)

**Quick tasks:**
- Fix truck profile rendering (header image, report button, menu, photos, links)
- Update privacy policy page to match finalized legal document

---
*Last phase completed: Phase 3*

## v1.1 — App Download Page

**Completed:** 2026-02-28
**Phases:** 4–6

**What shipped:**
- Edge middleware device detection with bot-first gate — iOS phones redirect to App Store, Android phones to Google Play via 307
- Zero-JS server component fallback page with both app store badges for desktop/unknown users
- Apple Smart App Banner meta tag for iOS Safari users
- OG/Twitter card metadata, canonical URL, and rich social preview cards
- MobileApplication JSON-LD structured data for Google rich results
- Sitemap entry and LayoutContent launch gate bypass for /download

**Requirements delivered:** 13/13 (RDIR-01–05, PAGE-01–04, SEO-01–04)

---
*Last phase completed: Phase 6*

