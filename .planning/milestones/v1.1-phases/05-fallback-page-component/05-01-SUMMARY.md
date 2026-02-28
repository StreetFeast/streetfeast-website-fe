---
phase: 05-fallback-page-component
plan: 01
subsystem: download-page
tags: [server-component, app-store, smart-app-banner, zero-js]
dependency_graph:
  requires: [04-01]
  provides: [download-page, AppStoreBadges-component]
  affects: [/download route, middleware fallback flow]
tech_stack:
  added: []
  patterns: [pure-server-component, css-modules, next-metadata-itunes]
key_files:
  created:
    - src/components/AppStoreBadges/AppStoreBadges.tsx
    - src/components/AppStoreBadges/AppStoreBadges.module.css
    - src/components/AppStoreBadges/index.ts
    - src/app/download/page.tsx
    - src/app/download/page.module.css
  modified: []
decisions:
  - "Metadata itunes.appId exported from page.tsx (not layout) so Smart App Banner only applies to /download route"
  - "AppStoreBadges accepts optional className prop for parent spacing control — avoids style leakage"
  - "No Header/Footer on download page — standalone minimal landing for non-redirected users"
metrics:
  duration: 2 min
  completed_date: "2026-02-28"
  tasks_completed: 2
  files_created: 5
  files_modified: 0
---

# Phase 05 Plan 01: /download Fallback Page Summary

**One-liner:** Zero-JS server component /download page with Apple Smart App Banner, store badges, and reusable AppStoreBadges component using next/image.

## What Was Built

The /download route serves as the fallback landing page for the Phase 4 middleware. Desktop users and undetected devices that are not redirected by the middleware reach this page, which presents both App Store and Google Play download options in a clean, branded layout.

### AppStoreBadges Component

`src/components/AppStoreBadges/` — Reusable server component following project conventions:

- Renders two `<a>` tags wrapping `next/image` badge images linked to `APP_STORE_LINK` and `GOOGLE_PLAY_LINK` from constants
- Accepts optional `className` prop for parent spacing control
- No `"use client"` directive — pure server component
- Barrel export via `index.ts`

### Download Page

`src/app/download/page.tsx` — Pure server component page:

- Exports `metadata` with `itunes.appId: '6749815073'` generating `<meta name="apple-itunes-app" content="app-id=6749815073">` for iOS Safari Smart App Banner
- Renders StreetFeast logo, heading, subheading, and `<AppStoreBadges />`
- No Header, Footer, Zustand, hooks, or browser APIs
- Builds as `○ (Static)` with `0 B` first load JS — confirmed in build output

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| Task 1: AppStoreBadges component | 35e7433 | feat(05-01): create reusable AppStoreBadges component |
| Task 2: /download page | ad41954 | feat(05-01): create /download fallback page with Smart App Banner |

## Verification Results

- `npm run build` — PASS. `/download` route listed as `○ (Static)` with `0 B` first load JS
- `npm run lint` — PASS. 0 errors (3 pre-existing warnings in unrelated files)
- No `"use client"` directive in page.tsx or AppStoreBadges.tsx
- `itunes.appId: '6749815073'` present in metadata export
- Both badge links use `APP_STORE_LINK` and `GOOGLE_PLAY_LINK` from `@/constants/links`

## Deviations from Plan

None — plan executed exactly as written.

## Decisions Made

1. **Metadata exported from page, not layout** — `itunes.appId` in `page.tsx` ensures the Smart App Banner meta tag only renders on `/download`. Safari reads this from initial server HTML and ignores client-side injection.

2. **AppStoreBadges className merging** — Used template literal with conditional to merge `styles.badges` and the optional `className` prop cleanly without unnecessary concatenation when no className is passed.

3. **No Header/Footer** — Per PAGE-01 requirement ("minimal page"), the download page is standalone with no navigation components.

## Self-Check: PASSED

Files confirmed created:
- src/components/AppStoreBadges/AppStoreBadges.tsx: FOUND
- src/components/AppStoreBadges/AppStoreBadges.module.css: FOUND
- src/components/AppStoreBadges/index.ts: FOUND
- src/app/download/page.tsx: FOUND
- src/app/download/page.module.css: FOUND

Commits confirmed:
- 35e7433: FOUND
- ad41954: FOUND
