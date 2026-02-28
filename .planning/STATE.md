# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-27)

**Core value:** Food truck owners can register, manage their profiles, and be discovered by hungry customers through a polished, fast web experience.
**Current focus:** Phase 4 — Device Detection & Middleware (v1.1)

## Current Position

Phase: 4 of 6 (Device Detection & Middleware)
Plan: 1 of TBD in current phase
Status: In progress
Last activity: 2026-02-27 — 04-01 complete: /download device detection middleware with bot-first redirects

Progress: [████░░░░░░] 35% (v1.0 complete, Phase 4 plan 1 done)

## Performance Metrics

**Velocity:**
- Total plans completed: 4
- Average duration: 1.5 min
- Total execution time: 0.1 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01-state-management-foundation | 1 | 1 min | 1 min |
| 02-banner-ui-user-controls | 1 | 2 min | 2 min |
| 03-script-blocking-form-gating | 2 | 3 min | 1.5 min |
| 04-device-detection-middleware | 1 | 4 min | 4 min |

**Recent Trend:**
- Last 5 plans: 01-01 (1 min), 02-01 (2 min), 03-01 (2 min), 03-02 (1 min), 04-01 (4 min)
- Trend: Stable ~1-4 min/plan

*Updated after each plan completion*

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- [v1.1]: Middleware-first — redirect logic lives in middleware.ts, never in page component; keeps Googlebot from being sent to App Store
- [v1.1]: 307 temporary redirects to app stores — never 308; permanent redirects cache in browsers and cannot be undone
- [v1.1]: iPadOS sees fallback page — iPad reports macOS user-agent (iPadOS 13+); accepted limitation, both badges remain available
- [v1.1]: Fallback page is pure server component — no client JS, no useEffect, no hydration, no flash of content
- [04-01]: Bot-first gate in middleware — isBot || BOT_PATTERNS.test(ua) runs before device detection so crawlers always see page HTML
- [04-01]: device.type === 'mobile' as primary redirect gate — naturally excludes iPadOS (type=undefined) and tablets (type=tablet)
- [04-01]: BOT_PATTERNS supplements isBot to cover Next.js isBot gaps (GitHub #75032) and social media preview crawlers (Slack, Discord, etc.)

### Pending Todos

None.

### Blockers/Concerns

- [Phase 4]: Confirm APP_STORE_LINK and GOOGLE_PLAY_LINK resolve to live app on real devices before launch
- Note: src/constants/links.ts Edge Runtime safety confirmed — build passed successfully with the import

### Quick Tasks Completed

| # | Description | Date | Commit | Directory |
|---|-------------|------|--------|-----------|
| 1 | Fix truck profile rendering: header image, report button, menu, menu item photos, website/social links | 2026-02-20 | c1a3039 | [1-fix-truck-profile-rendering-header-image](./quick/1-fix-truck-profile-rendering-header-image/) |
| 2 | Update privacy policy page to match finalized legal document | 2026-02-26 | e6742ca | [2-update-privacy-policy-page-to-match-fina](./quick/2-update-privacy-policy-page-to-match-fina/) |

## Session Continuity

Last session: 2026-02-27
Stopped at: Completed 04-01-PLAN.md — /download device detection middleware with bot-first 307 redirects
Resume file: None

---
*State initialized: 2026-02-19*
*Last updated: 2026-02-27 (04-01 complete: device detection middleware)*
