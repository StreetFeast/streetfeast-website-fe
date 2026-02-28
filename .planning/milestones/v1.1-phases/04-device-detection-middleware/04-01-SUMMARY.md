---
phase: 04-device-detection-middleware
plan: 01
subsystem: infra
tags: [middleware, next.js, device-detection, edge-runtime, redirect]

# Dependency graph
requires:
  - phase: existing
    provides: src/constants/links.ts with APP_STORE_LINK and GOOGLE_PLAY_LINK
provides:
  - BOT_PATTERNS RegExp for supplemental crawler detection (src/constants/bots.ts)
  - /download route device detection and 307 redirect logic in middleware.ts
  - Edge Runtime compatible bot/crawler allowlist covering Google inspection tools and social crawlers
affects:
  - 04-02 (download page — /download fallback page served when middleware passes through)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Bot-first middleware: check isBot || BOT_PATTERNS before any device-based redirect"
    - "307 temporary redirects to app stores (never 301/308 — prevents browser cache lock-in)"
    - "device.type === 'mobile' + secondary UA regex for store selection (excludes tablets and iPadOS)"

key-files:
  created:
    - src/constants/bots.ts
  modified:
    - src/middleware.ts

key-decisions:
  - "Bot check runs before device detection — even mobile-class crawlers like Googlebot-Mobile see the page, never get redirected"
  - "device.type === 'mobile' as primary gate excludes iPadOS (type=undefined) and Android tablets (type=tablet) without any special-casing"
  - "Secondary UA regex (/iPhone|iPod/ vs /Android/) selects the correct app store after mobile gate passes"
  - "BOT_PATTERNS supplements isBot to cover Next.js isBot gaps (GitHub #75032) and social media preview crawlers (Slack, Discord, Twitter, Facebook)"

patterns-established:
  - "Supplemental bot pattern file: keep EdgeRuntime-compatible pure RegExp in src/constants/bots.ts, import alongside isBot"
  - "Middleware variable naming: use 'ua' for raw header string to avoid shadowing the userAgent() import"

requirements-completed: [RDIR-01, RDIR-02, RDIR-03, RDIR-04, RDIR-05]

# Metrics
duration: 4min
completed: 2026-02-27
---

# Phase 4 Plan 01: Device Detection Middleware Summary

**Next.js Edge middleware with bot-first /download redirect: iOS phones to App Store, Android phones to Google Play via 307, crawlers and desktop pass through**

## Performance

- **Duration:** 4 min
- **Started:** 2026-02-28T00:48:36Z
- **Completed:** 2026-02-28T00:52:00Z
- **Tasks:** 2
- **Files modified:** 2

## Accomplishments
- Created `src/constants/bots.ts` exporting `BOT_PATTERNS` RegExp covering 18 crawler/preview bot patterns supplementing Next.js's `isBot`
- Updated `src/middleware.ts` to detect device type on `/download` using `userAgent()` helper with bot-first gate
- iOS phones (device.type=mobile + iPhone|iPod UA) get 307 redirect to App Store; Android phones get 307 to Google Play
- All other visitors (desktop, iPadOS, tablets, crawlers) pass through to the fallback page
- Existing `/truck/:path*` mobile redirect logic preserved unchanged

## Task Commits

Each task was committed atomically:

1. **Task 1: Create bot patterns constants file** - `ee93dc3` (feat)
2. **Task 2: Add /download device detection and redirect to middleware** - `d025340` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified
- `src/constants/bots.ts` - Pure RegExp export of BOT_PATTERNS for supplemental crawler detection (Edge Runtime compatible)
- `src/middleware.ts` - Added /download route handler with bot-first device detection and 307 redirects; added /download to config.matcher

## Decisions Made
- Bot check runs before device detection — Googlebot-Mobile and similar mobile-class crawlers should never be redirected to app stores
- Used `device.type === 'mobile'` as the primary gate for redirect eligibility — this naturally excludes iPadOS (sends Macintosh UA, type=undefined) and Android tablets (type=tablet) without special-casing
- Secondary UA regex distinguishes iOS from Android to select the correct store URL
- BOT_PATTERNS supplements Next.js isBot to cover confirmed gaps and social media preview crawlers essential for link previews in Slack, Discord, Twitter, Facebook

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None — lint and build both passed on the first attempt.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness
- Middleware is ready; the `/download` route fallback page (served to non-mobile and non-redirected users) still needs to be created
- Verify APP_STORE_LINK and GOOGLE_PLAY_LINK resolve to live apps on real devices before launch (noted blocker in STATE.md)

---
*Phase: 04-device-detection-middleware*
*Completed: 2026-02-27*
