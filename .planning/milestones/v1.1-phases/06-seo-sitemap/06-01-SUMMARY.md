---
phase: 06-seo-sitemap
plan: 01
subsystem: seo
tags: [next.js, metadata, open-graph, twitter-card, json-ld, structured-data, sitemap, schema-org]

# Dependency graph
requires:
  - phase: 05-fallback-page-component
    provides: /download page component and route that this plan adds SEO metadata to

provides:
  - OG/Twitter card metadata on /download for rich social previews
  - Canonical URL tag at https://streetfeastapp.com/download
  - MobileApplication JSON-LD structured data for Google rich results
  - /download entry in sitemap.xml with priority 0.8
  - /download in LayoutContent allowedPaths (launch gate bypass)

affects: [any future page seo, social-sharing, search-indexing]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Next.js Metadata API with metadataBase inheritance from root layout
    - JSON-LD structured data via dangerouslySetInnerHTML with XSS mitigation (.replace(/</g, '\\u003c'))
    - MobileApplication schema.org type for app download pages

key-files:
  created: []
  modified:
    - src/app/download/page.tsx
    - src/app/sitemap.ts
    - src/components/LayoutContent/LayoutContent.tsx

key-decisions:
  - "OG type stays 'website' not MobileApplication — OG protocol has no MobileApplication type; JSON-LD carries the structured app data"
  - "metadataBase not redefined in download/page.tsx — inherited from root layout (https://streetfeastapp.com)"
  - "Relative URLs (/download, /social-media-logo.png) in metadata — resolve to absolute via metadataBase inheritance"
  - "native <script> tag for JSON-LD not next/script — next/script is for external scripts only"
  - "/download priority 0.8 in sitemap — primary CTA page, more important than legal (0.5) but less than homepage (1.0)"

patterns-established:
  - "JSON-LD pattern: define jsonLd object inside server component function body, inject via script dangerouslySetInnerHTML with XSS mitigation"
  - "Metadata pattern: extend page-level Metadata export with alternates/openGraph/twitter, rely on metadataBase from root layout"

requirements-completed: [SEO-01, SEO-02, SEO-03, SEO-04]

# Metrics
duration: 2min
completed: 2026-02-28
---

# Phase 6 Plan 1: SEO and Sitemap for /download Summary

**OG tags, Twitter card, canonical URL, MobileApplication JSON-LD, and sitemap entry added to /download page; launch gate bypass via LayoutContent allowedPaths**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-28T06:24:00Z
- **Completed:** 2026-02-28T06:24:44Z
- **Tasks:** 2
- **Files modified:** 3

## Accomplishments
- Extended `/download` metadata export with OpenGraph (title, description, image 1352x632, locale, url, type), Twitter card (summary_large_image), and canonical URL
- Added MobileApplication JSON-LD structured data block inside the DownloadPage component JSX with schema.org MobileApplication type, iOS/Android download URLs, and free pricing offer
- Added `/download` entry to sitemap.ts with priority 0.8 and monthly changeFrequency
- Added `/download` to LayoutContent allowedPaths so the page renders its content (not ComingSoon) regardless of NEXT_PUBLIC_IS_LAUNCHED setting

## Task Commits

Each task was committed atomically:

1. **Task 1: Add OG, Twitter, canonical metadata and JSON-LD to download page** - `e29960f` (feat)
2. **Task 2: Add /download to sitemap and LayoutContent allowedPaths** - `dfb455f` (feat)

## Files Created/Modified
- `src/app/download/page.tsx` - Extended metadata export with alternates/openGraph/twitter; added MobileApplication JSON-LD script block
- `src/app/sitemap.ts` - Added /download entry with priority 0.8 and monthly changeFrequency
- `src/components/LayoutContent/LayoutContent.tsx` - Added '/download' to allowedPaths array

## Decisions Made
- OG type stays `'website'` not `MobileApplication` — the OG protocol has no MobileApplication type; the JSON-LD block carries the structured app data for Google rich results
- `metadataBase` not redefined in page.tsx — inherited from root layout which already sets `new URL('https://streetfeastapp.com')`
- Used native `<script>` tag for JSON-LD rather than `next/script` — `next/script` is for external scripts; inline structured data belongs in native script tag
- Priority 0.8 for /download — primary CTA page is more important than legal pages (0.5) but below homepage (1.0)
- XSS mitigation applied: `.replace(/</g, '\\u003c')` on JSON.stringify output per Next.js JSON-LD guide

## Deviations from Plan

None - plan executed exactly as written. All required metadata fields, JSON-LD schema, sitemap entry, and LayoutContent allowedPaths additions were present and committed before summary creation.

## Issues Encountered

None - both tasks were already committed when execution began (e29960f and dfb455f). Build passes with no errors; lint shows 3 pre-existing warnings unrelated to this plan (GoogleMap useEffect deps, unused axios import in useContactForm).

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- /download page is fully SEO-ready: rich social previews, canonical URL, structured data, sitemap inclusion
- Page is accessible in pre-launch production (not gated by ComingSoon)
- Verify APP_STORE_LINK and GOOGLE_PLAY_LINK resolve to live app on real devices before launch (existing concern from Phase 4)
- Use Google Rich Results Test to validate MobileApplication JSON-LD after deployment

---
*Phase: 06-seo-sitemap*
*Completed: 2026-02-28*
