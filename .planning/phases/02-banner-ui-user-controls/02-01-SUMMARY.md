---
phase: 02-banner-ui-user-controls
plan: 01
subsystem: ui
tags: [cookie-consent, wcag, accessibility, zustand, next.js, css-modules]

# Dependency graph
requires:
  - phase: 01-state-management-foundation
    provides: consentStore with hasConsented tri-state, setConsent, clearConsent, isHydrated
provides:
  - CookieBanner component with hydration guard, ARIA role=dialog, focus management, scroll-padding-bottom, Escape dismiss
  - CookiePrefsButton footer client component calling clearConsent
  - WCAG 2.2 AA compliant cookie consent UI with equal-prominence Accept All / Reject All buttons
  - Footer Legal column extended with re-consent link (footer remains server component)
  - CookieBanner rendered in root layout
affects:
  - 02-02 (Phase 3 conditional script loading depends on consent state UI being in place)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Hydration guard pattern: all hooks called unconditionally, early return null placed after all hook calls, effects gated with shouldShow check
    - Server component + client island: Footer.tsx (server) imports CookiePrefsButton.tsx ('use client') — avoids marking whole footer as client
    - ResizeObserver for dynamic scroll-padding-bottom to prevent fixed banner obscuring focused content (WCAG 2.4.11)
    - Equal-prominence consent buttons: both Accept All and Reject All use identical CSS class per ICO guidelines

key-files:
  created:
    - src/components/CookieBanner/CookieBanner.tsx
    - src/components/CookieBanner/CookieBanner.module.css
    - src/components/CookieBanner/index.ts
    - src/components/Footer/CookiePrefsButton.tsx
  modified:
    - src/app/layout.tsx
    - src/components/Footer/Footer.tsx
    - src/components/Footer/Footer.module.css

key-decisions:
  - "Hydration guard uses shouldShow computed after all hooks, not early return before hooks — prevents Rules of Hooks violation on re-render"
  - "Button text color #1E1E1F on #ED6A00 orange (5.28:1 contrast passes AA) — white text fails at 3.07:1 so dark text required"
  - "Escape key sets local dismissed state (not clearConsent) — banner returns next page load, no consent change recorded"
  - "CookiePrefsButton extracted as separate 'use client' file inside Footer folder — keeps Footer.tsx as server component"

patterns-established:
  - "Client island pattern: extract 'use client' slice into co-located file (e.g., CookiePrefsButton.tsx) rather than marking parent server component"
  - "Hooks-first hydration guard: declare all hooks, compute shouldShow, return null at JSX level, gate effects internally"

# Metrics
duration: 2min
completed: 2026-02-20
---

# Phase 2 Plan 01: Cookie Banner UI & Footer Re-consent Summary

**Fixed-bottom WCAG 2.2 AA cookie consent banner with equal-prominence Accept/Reject buttons, Escape dismiss, focus management, scroll-padding-bottom via ResizeObserver, and footer re-consent link using Zustand consentStore**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-20T00:26:27Z
- **Completed:** 2026-02-20T00:28:28Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments
- CookieBanner renders only when `isHydrated && hasConsented === null && !dismissed` — no hydration flash, no premature render
- Full keyboard navigation: focus moves to Accept button on mount (WCAG 2.4.3), Tab cycles buttons, Enter activates, Escape dismisses for session
- WCAG 2.2 AA contrast verified: #FCFCFC on #1E1E1F banner text (16.24:1), #C6C6C6 description (9.75:1), #1E1E1F on #ED6A00 buttons (5.28:1)
- Footer Legal column gains "Cookie Preferences" button styled as text-link; Footer.tsx remains a server component via client island pattern

## Task Commits

Each task was committed atomically:

1. **Task 1: Create CookieBanner component and render in root layout** - `7c4a3e7` (feat)
2. **Task 2: Add Cookie Preferences button to Footer** - `db6fd2e` (feat)

**Plan metadata:** (recorded below in final commit)

## Files Created/Modified
- `src/components/CookieBanner/CookieBanner.tsx` - Client component: hydration guard, ARIA role=dialog, focus, ResizeObserver scroll-padding, Escape dismiss, equal-prominence buttons
- `src/components/CookieBanner/CookieBanner.module.css` - Fixed bottom-bar styles with WCAG-compliant colors and 640px mobile breakpoint
- `src/components/CookieBanner/index.ts` - Default re-export for clean imports
- `src/components/Footer/CookiePrefsButton.tsx` - Client island calling clearConsent on click
- `src/app/layout.tsx` - Added CookieBanner import and render after Providers
- `src/components/Footer/Footer.tsx` - Added CookiePrefsButton import and render in Legal column
- `src/components/Footer/Footer.module.css` - Added cookiePrefsButton style matching link appearance, with responsive overrides at 768px and 480px

## Decisions Made
- Used `shouldShow` computed flag after all hooks; return null at JSX level (not before hooks) — prevents React Rules of Hooks violation
- Dark text (#1E1E1F) on orange buttons — white text on #ED6A00 fails WCAG AA (3.07:1), dark text passes (5.28:1)
- Escape sets local `dismissed` state only — hasConsented stays null so banner reappears on next page load
- CookiePrefsButton extracted as separate 'use client' file co-located in Footer folder — preserves Footer.tsx as server component

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Cookie consent banner UI is complete and functional
- consentStore integration is live; hasConsented is persisted in localStorage
- Phase 3 (02-02) can now implement conditional script loading gated on hasConsented value
- No blockers identified for Phase 3

## Self-Check: PASSED

All 8 files confirmed present on disk. Both task commits (7c4a3e7, db6fd2e) confirmed in git log.

---
*Phase: 02-banner-ui-user-controls*
*Completed: 2026-02-20*
