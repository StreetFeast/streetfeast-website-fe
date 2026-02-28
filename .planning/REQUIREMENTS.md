# Requirements: StreetFeast App Download Page

**Defined:** 2026-02-27
**Core Value:** Food truck owners can register, manage their profiles, and be discovered by hungry customers through a polished, fast web experience.

## v1.1 Requirements

Requirements for milestone v1.1. Each maps to roadmap phases.

### Device Detection & Redirect

- [x] **RDIR-01**: iOS user visiting /download is auto-redirected to the App Store via 307 temporary redirect
- [x] **RDIR-02**: Android user visiting /download is auto-redirected to Google Play via 307 temporary redirect
- [x] **RDIR-03**: Search engine crawlers (Googlebot, etc.) bypass redirect and see the fallback page
- [x] **RDIR-04**: iPadOS users (macOS user-agent) see the fallback page with both store options
- [x] **RDIR-05**: Device detection runs in Next.js middleware before page renders

### Fallback Page

- [x] **PAGE-01**: Desktop/unknown users see a minimal page with StreetFeast branding and both App Store and Google Play badges
- [x] **PAGE-02**: Page renders as a pure server component with no client-side JavaScript
- [x] **PAGE-03**: Page includes Apple Smart App Banner meta tag for iOS Safari users
- [x] **PAGE-04**: Page uses existing badge assets from /public/ and store URLs from constants/links.ts

### SEO & Discoverability

- [ ] **SEO-01**: Page exports Next.js metadata with title, description, and OG tags
- [ ] **SEO-02**: Page has canonical URL and Twitter card meta tags
- [ ] **SEO-03**: Page includes inline JSON-LD MobileApplication structured data
- [ ] **SEO-04**: /download is added to sitemap.ts with appropriate priority

## Future Requirements

Deferred to future release. Tracked but not in current roadmap.

### Enhanced Download Experience

- **DL-01**: Custom OG image with app screenshots for better social sharing CTR
- **DL-02**: App store rating display pulled dynamically
- **DL-03**: Download count or social proof indicators
- **DL-04**: QR code for desktop users to scan with phone

## Out of Scope

| Feature | Reason |
|---------|--------|
| Client-side device detection via useEffect | Causes flash of content and breaks SEO — middleware is correct approach |
| 301/308 permanent redirects | Would remove /download from search index permanently |
| Per-category cookie-style granular detection | Simple iOS/Android/unknown is sufficient |
| App store deep links (itms-apps://, market://) | HTTPS links work universally and avoid browser compatibility issues |
| Backend changes | Frontend-only milestone |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| RDIR-01 | Phase 4 | Complete |
| RDIR-02 | Phase 4 | Complete |
| RDIR-03 | Phase 4 | Complete |
| RDIR-04 | Phase 4 | Complete |
| RDIR-05 | Phase 4 | Complete |
| PAGE-01 | Phase 5 | Complete |
| PAGE-02 | Phase 5 | Complete |
| PAGE-03 | Phase 5 | Complete |
| PAGE-04 | Phase 5 | Complete |
| SEO-01 | Phase 6 | Pending |
| SEO-02 | Phase 6 | Pending |
| SEO-03 | Phase 6 | Pending |
| SEO-04 | Phase 6 | Pending |

**Coverage:**
- v1.1 requirements: 13 total
- Mapped to phases: 13
- Unmapped: 0

---
*Requirements defined: 2026-02-27*
*Last updated: 2026-02-27 — traceability complete (phases 4–6 assigned)*
