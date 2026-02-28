# Phase 4: Device Detection & Middleware - Context

**Gathered:** 2026-02-27
**Status:** Ready for planning

<domain>
## Phase Boundary

Middleware that detects device type on `/download` and auto-redirects mobile users (iOS, Android) to the correct app store via 307 temporary redirect. Desktop users, iPadOS users, and bots/crawlers pass through to see the fallback page. Runs in Next.js middleware before any React rendering.

</domain>

<decisions>
## Implementation Decisions

### Bot & crawler scope
- All bots bypass the redirect — search engines (Googlebot, Bingbot) AND social media crawlers (Facebook, Twitter/X, Slack, iMessage link previews)
- Permissive detection: maintain a known-bot pattern list; unrecognized user-agents go through normal device detection
- Bot detection takes priority over device detection — even mobile-class bots (e.g., Googlebot-Mobile) see the page, never get redirected
- Bot patterns extracted into a dedicated constants file (e.g., `constants/bots.ts`) for easy updates without touching middleware logic

### Claude's Discretion
- User-agent parsing strategy for iOS vs Android vs iPadOS vs desktop
- Edge device handling (Android tablets, Windows phones, other unusual devices) — redirect or fallback
- Store URL sourcing (use existing `constants/links.ts` or create new)
- Redirect path scope (exact `/download` match vs subpaths, query parameter passthrough)
- Middleware matcher configuration
- Error handling for missing or malformed user-agent strings

</decisions>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches. Requirements (RDIR-01 through RDIR-05) are clear and specific about the expected behavior.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 04-device-detection-middleware*
*Context gathered: 2026-02-27*
