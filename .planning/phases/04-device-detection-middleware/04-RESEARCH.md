# Phase 4: Device Detection & Middleware - Research

**Researched:** 2026-02-27
**Domain:** Next.js middleware, user agent parsing, device detection, HTTP redirects
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- Bot & crawler scope: All bots bypass the redirect — search engines (Googlebot, Bingbot) AND social media crawlers (Facebook, Twitter/X, Slack, iMessage link previews)
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

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| RDIR-01 | iOS user visiting /download is auto-redirected to the App Store via 307 temporary redirect | `userAgent(request)` device.type='mobile' + UA regex for iPhone/iPod; `NextResponse.redirect(APP_STORE_LINK, 307)` |
| RDIR-02 | Android user visiting /download is auto-redirected to Google Play via 307 temporary redirect | `userAgent(request)` device.type='mobile' + UA regex for Android; `NextResponse.redirect(GOOGLE_PLAY_LINK, 307)` |
| RDIR-03 | Search engine crawlers (Googlebot, etc.) bypass redirect and see the fallback page | `isBot` from `userAgent()` + supplemental BOT_PATTERNS regex in `constants/bots.ts` |
| RDIR-04 | iPadOS users (macOS user-agent) see the fallback page with both store options | iPadOS 13+ reports `Macintosh` UA → device.type is `undefined` → falls into desktop/fallback path; no special logic needed |
| RDIR-05 | Device detection runs in Next.js middleware before page renders | Middleware runs before all rendering; add `/download` to existing `src/middleware.ts` matcher |
</phase_requirements>

---

## Summary

This phase adds `/download` route handling to the existing `src/middleware.ts` file. The middleware must detect iOS and Android phone users and issue a 307 temporary redirect to the respective app store, while desktop users, iPadOS users, and all bots/crawlers pass through to the fallback page.

Next.js 15.5.7 ships a built-in `userAgent` helper (imported from `next/server`) that parses the User-Agent header and returns a structured object including `isBot` (boolean) and `device.type` (string enum or `undefined`). This is the primary tool for device classification. However, the built-in `isBot` has a confirmed coverage gap for some Google bots, so the locked decision to maintain a custom `BOT_PATTERNS` regex in `constants/bots.ts` is the correct approach.

iPadOS 13+ defaults to "Request Desktop Website" mode, causing Safari on iPad to send a `Macintosh` User-Agent string. The `userAgent()` helper therefore reports `device.type === undefined` for iPads — which means they naturally fall through to the desktop/fallback path with no special logic required. This is an accepted limitation documented in project decisions.

The existing `src/middleware.ts` already handles `/truck/:path*` mobile redirects; the `/download` logic must be added to the same file by extending the `matcher` array and adding a new detection block.

**Primary recommendation:** Extend existing `src/middleware.ts` with a `/download` block using `userAgent()` for device + bot detection, backed by a new `src/constants/bots.ts` file, and import store URLs from the existing `src/constants/links.ts`.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `next/server` — `userAgent` | Built into Next.js 15.5.7 | Parse UA string into structured `device`, `isBot`, `browser`, `os` | Official API, no npm install, always current with Next.js version |
| `next/server` — `NextResponse` | Built into Next.js 15.5.7 | Issue 307 redirects and pass-through responses | Official API, only way to control middleware responses |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `src/constants/bots.ts` (new file) | n/a | Custom `BOT_PATTERNS` regex covering bots the built-in `isBot` misses | Required by locked decision; ensures Googlebot-Mobile and social crawlers are caught |
| `src/constants/links.ts` (existing) | n/a | `APP_STORE_LINK` and `GOOGLE_PLAY_LINK` string constants | Already exists; safe to import in Edge Runtime (pure string exports, no Node.js APIs) |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| `userAgent()` from `next/server` | Raw `request.headers.get('user-agent')` regex | Raw regex is viable but more brittle; `userAgent()` uses ua-parser-js internally for structured results |
| Custom `BOT_PATTERNS` in `constants/bots.ts` | `isbot` npm package | `isbot` is more comprehensive but adds a dependency; for this use case a curated regex list is sufficient and easier to audit |
| Extending existing `middleware.ts` | Creating a separate utility function | Both work; keeping logic inline in the download block is simpler for a focused use case |

**Installation:** No additional packages required.

---

## Architecture Patterns

### Recommended Project Structure

```
src/
├── middleware.ts           # Existing — add /download block here
├── constants/
│   ├── links.ts           # Existing — APP_STORE_LINK, GOOGLE_PLAY_LINK (import as-is)
│   ├── bots.ts            # NEW — BOT_PATTERNS regex constant
│   └── colors.ts          # Existing — untouched
```

### Pattern 1: Extending the Existing Middleware Matcher

**What:** Add `/download` to the existing `matcher` array in `middleware.ts` so the middleware runs on both `/truck/:path*` and `/download`.

**When to use:** Always — middleware config `matcher` is the only way to scope which routes trigger middleware in Next.js.

**Example:**
```typescript
// Source: https://nextjs.org/docs/15/app/api-reference/file-conventions/middleware
export const config = {
  matcher: [
    '/truck/:path*',
    '/download',  // Added: exact match only, no subpaths
  ],
};
```

The `matcher` values must be static string literals — they are statically analyzed at build time and dynamic variables are ignored.

### Pattern 2: Bot-First Detection with userAgent()

**What:** Check `isBot` and `BOT_PATTERNS` BEFORE checking device type. A bot that matches a mobile UA (e.g., Googlebot-Mobile) must see the fallback page, never the app store redirect.

**When to use:** Any time redirect logic exists alongside bot-detection requirements.

**Example:**
```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/userAgent
import { NextRequest, NextResponse, userAgent } from 'next/server';
import { APP_STORE_LINK, GOOGLE_PLAY_LINK } from '@/constants/links';
import { BOT_PATTERNS } from '@/constants/bots';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Existing /truck logic ...

  if (pathname === '/download') {
    const ua = request.headers.get('user-agent') || '';
    const { isBot, device } = userAgent(request);

    // 1. Bot check first — bots always see the page
    if (isBot || BOT_PATTERNS.test(ua)) {
      return NextResponse.next();
    }

    // 2. iOS phone (iPhone, iPod Touch) → App Store
    // device.type === 'mobile' catches iPhone; iPadOS reports undefined (desktop)
    if (device.type === 'mobile' && /iPhone|iPod/i.test(ua)) {
      return NextResponse.redirect(APP_STORE_LINK, 307);
    }

    // 3. Android phone → Google Play
    // "Android" + "Mobile" distinguishes phones from Android tablets
    if (device.type === 'mobile' && /Android/i.test(ua)) {
      return NextResponse.redirect(GOOGLE_PLAY_LINK, 307);
    }

    // 4. Everyone else (desktop, iPadOS, Android tablet, unknown) → fallback page
    return NextResponse.next();
  }

  return NextResponse.next();
}
```

### Pattern 3: BOT_PATTERNS Constants File

**What:** A dedicated `src/constants/bots.ts` exporting a single compiled `RegExp` that covers known bot UAs beyond the built-in `isBot`.

**When to use:** As the locked decision specifies — so middleware logic doesn't need to change when the bot list needs updating.

**Example:**
```typescript
// src/constants/bots.ts
// Covers gaps in Next.js built-in isBot:
// - Google-InspectionTool, Google-CloudVertexBot, Google-Other (confirmed gap, GitHub issue #75032)
// - Social media crawlers: Facebook, Twitter/X, Slack, Discord, WhatsApp, Telegram
// - Apple iMessage link preview
// - Other link preview bots
export const BOT_PATTERNS = /bot|crawler|spider|slurp|curl|wget|archiver|
  facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|Slackbot|
  Discordbot|WhatsApp|TelegramBot|Applebot|SkypeUriPreview|redditbot|
  Google-InspectionTool|Google-CloudVertexBot|Google-Other|
  vkShare|quora link preview|bitlybot/i;
```

Note: This is a starting list. The file can be updated independently of middleware logic.

### Anti-Patterns to Avoid

- **Device detection via client `useEffect`:** Causes flash of content before redirect, breaks SEO. Out of scope per REQUIREMENTS.md.
- **301/308 permanent redirects to app stores:** Browsers cache these; if the store URL changes, users are permanently stuck. Requirements specify 307 only.
- **Checking for "iPad" in the UA string to detect iPadOS:** iPadOS 13+ does NOT include "iPad" in its default UA. The correct behavior (pass through to fallback page) happens automatically because `device.type` is `undefined`.
- **Putting redirect logic in the page component:** Violates RDIR-05 — detection must run in middleware before rendering.
- **Importing modules that use Node.js APIs in Edge Runtime middleware:** The existing `middleware.ts` runs on Edge Runtime. Only import files that export pure strings, arrays, or RegExp. The existing `links.ts` is safe (pure string exports). Avoid importing from `src/lib/` (Supabase) or any module that calls `require('fs')`, `require('path')`, etc.
- **Using `device.type === 'mobile'` alone without a secondary UA check:** `device.type === 'mobile'` could theoretically match non-phone form factors. The secondary `/iPhone|iPod/i` and `/Android/i` checks add specificity and are the authoritative signal.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| UA parsing into structured device/OS/browser | Custom regex parser | `userAgent()` from `next/server` | ua-parser-js covers thousands of UA variants; custom regex misses edge cases |
| Bot detection | Single-pattern regex | `isBot` from `userAgent()` + `BOT_PATTERNS` supplemental | Built-in covers Googlebot, Bingbot, DuckDuckBot, Facebookbot, Twitterbot, Slackbot, Discordbot, WhatsApp, and ~30 others. Supplement for confirmed gaps only. |
| HTTP redirect response | Manual `new Response(null, { status: 307, headers: { Location: url } })` | `NextResponse.redirect(url, 307)` | Official API, handles URL construction correctly |

**Key insight:** The `userAgent()` helper is purpose-built for this exact use case in Next.js middleware. The only reason to supplement it with `BOT_PATTERNS` is the confirmed coverage gap for specific Google inspection bots (GitHub issue #75032, January 2025) — not a reason to abandon it entirely.

---

## Common Pitfalls

### Pitfall 1: iPadOS Detection Confusion

**What goes wrong:** Developer adds `|| /iPad/i.test(ua)` to the iOS redirect condition, accidentally redirecting iPads to the App Store instead of the fallback page.

**Why it happens:** Pre-iPadOS 13 iPads did include "iPad" in their UA. Since iPadOS 13 (2019), Safari's default mode is "Request Desktop Website" and the UA becomes `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15...`. The `device.type` is `undefined` and no "iPad" string is present in the default UA.

**How to avoid:** Never include `iPad` in the redirect condition. Trust that `device.type === 'mobile'` will be `false` for iPadOS desktop-mode requests. The requirements explicitly accept this limitation — iPadOS users see the fallback page.

**Warning signs:** If iPad users report being sent to the App Store, check for "iPad" in redirect conditions.

### Pitfall 2: Missing the Android Tablet / Desktop Android Case

**What goes wrong:** Using only `/Android/i.test(ua)` sends Android tablet users to Google Play. Android tablets send "Android" in their UA but NOT "Mobile".

**Why it happens:** Android phone UAs contain both `Android` and `Mobile` keywords (e.g., `Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36...Mobile Safari/537.36`). Android tablet UAs contain `Android` but NOT `Mobile`.

**How to avoid:** The `device.type === 'mobile'` check from `userAgent()` already handles this — it will return `'tablet'` for Android tablets, not `'mobile'`. The `device.type === 'mobile' && /Android/i.test(ua)` double-check correctly excludes tablets.

**Warning signs:** Android tablet users reporting Google Play redirect.

### Pitfall 3: Built-in `isBot` Missing Social Crawlers

**What goes wrong:** Social media link previews (Slack, iMessage, Facebook) are not classified as bots by `isBot`, so they would get redirected to the app store instead of seeing the OG tags on the fallback page.

**Why it happens:** GitHub issue #75032 (January 2025) confirms that Next.js `isBot` misses some Google inspection bots. Additionally, social preview bots (Slackbot-LinkExpanding, facebookexternalhit, iMessageBot) may not be in the built-in list.

**How to avoid:** Use the `BOT_PATTERNS` supplemental regex in `constants/bots.ts`. Run `isBot || BOT_PATTERNS.test(ua)` — both must return false before any redirect happens.

**Warning signs:** Link previews in Slack/Discord showing the app store URL instead of the page OG image.

### Pitfall 4: Edge Runtime Import Violation

**What goes wrong:** Importing a module that uses Node.js APIs (e.g., `fs`, `path`, Supabase client) causes the middleware build to fail with an Edge Runtime compatibility error.

**Why it happens:** Next.js middleware defaults to Edge Runtime, which only supports Web APIs and pure JavaScript. Node.js built-in modules are unavailable.

**How to avoid:** Only import files that contain pure TypeScript/JavaScript with no Node.js dependencies. `src/constants/links.ts` and `src/constants/bots.ts` are safe (string and RegExp exports only). Never import from `src/lib/supabase.ts` or similar.

**Warning signs:** Build error mentioning "Edge Runtime" or "Module not found" for a Node.js built-in.

### Pitfall 5: Matcher Includes Subpaths When It Shouldn't

**What goes wrong:** Using `/download/:path*` in the matcher instead of `/download` causes middleware to run on hypothetical future sub-routes like `/download/ios`, which may have different intended behavior.

**Why it happens:** Copy-paste from the existing `/truck/:path*` pattern.

**How to avoid:** Use exact match `/download` in the matcher. The requirements specify `/download` only — not subpaths.

---

## Code Examples

Verified patterns from official sources:

### Complete `/download` middleware block

```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/userAgent
// Source: https://nextjs.org/docs/15/app/api-reference/file-conventions/middleware
import { NextRequest, NextResponse, userAgent } from 'next/server';
import { APP_STORE_LINK, GOOGLE_PLAY_LINK } from '@/constants/links';
import { BOT_PATTERNS } from '@/constants/bots';

export function middleware(request: NextRequest) {
  const userAgent_ = request.headers.get('user-agent') || '';
  const { pathname } = request.nextUrl;

  // --- Existing /truck logic (unchanged) ---
  const truckMatch = pathname.match(/^\/truck\/([^/]+)$/);
  const { device: truckDevice } = userAgent(request);
  if (truckMatch && /iPhone|iPad|iPod|Android/i.test(userAgent_)) {
    const truckId = truckMatch[1];
    const url = request.nextUrl.clone();
    url.pathname = `/m/truck/${truckId}`;
    return NextResponse.redirect(url);
  }

  // --- /download: device detection and redirect ---
  if (pathname === '/download') {
    const ua = userAgent_;
    const { isBot, device } = userAgent(request);

    // Bot check takes priority — bots always see the page
    if (isBot || BOT_PATTERNS.test(ua)) {
      return NextResponse.next();
    }

    // iOS phone (iPhone, iPod Touch) → App Store
    // device.type === 'mobile' is true for phones; iPadOS reports undefined
    if (device.type === 'mobile' && /iPhone|iPod/i.test(ua)) {
      return NextResponse.redirect(APP_STORE_LINK, 307);
    }

    // Android phone → Google Play
    // Android phones have "Mobile" in UA; tablets do not
    if (device.type === 'mobile' && /Android/i.test(ua)) {
      return NextResponse.redirect(GOOGLE_PLAY_LINK, 307);
    }

    // Desktop, iPadOS, Android tablet, unknown → fallback page
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/truck/:path*',
    '/download',
  ],
};
```

### `constants/bots.ts`

```typescript
// src/constants/bots.ts
// Supplemental bot detection for patterns missed by Next.js built-in isBot.
// Confirmed gap: Google-InspectionTool, Google-CloudVertexBot, Google-Other
// (Next.js GitHub issue #75032, January 2025)
// Additional coverage: social media link preview bots not always in isBot list.
export const BOT_PATTERNS =
  /Google-InspectionTool|Google-CloudVertexBot|Google-Other|
  facebookexternalhit|facebookcatalog|Twitterbot|LinkedInBot|
  Slackbot|Discordbot|WhatsApp|TelegramBot|Applebot|
  SkypeUriPreview|redditbot|vkShare|bitlybot|
  ia_archiver|Mediapartners-Google/i;
```

### `NextResponse.redirect` with explicit 307

```typescript
// Source: https://nextjs.org/docs/app/guides/redirecting (NextResponse.redirect section)
// Default is 307 but explicit is clearer
return NextResponse.redirect(APP_STORE_LINK, 307);
```

### `userAgent()` return shape

```typescript
// Source: https://nextjs.org/docs/app/api-reference/functions/userAgent
const { isBot, device, browser, os } = userAgent(request);
// device.type: 'mobile' | 'tablet' | 'console' | 'smarttv' | 'wearable' | 'embedded' | undefined
// isBot: boolean — true for known bots (Googlebot, Bingbot, DuckDuckBot, etc.)
// undefined device.type = desktop or iPadOS (no distinction needed — both go to fallback)
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `middleware.ts` | `proxy.ts` (Next.js 16 only) | Next.js 16, Oct 2025 | Project is on 15.5.7 — `middleware.ts` is current and correct; `proxy.ts` not available |
| Edge-runtime-only middleware | Node.js runtime middleware (`runtime: 'nodejs'` in config) | Next.js 15.2 experimental, 15.5 stable | No impact — this phase doesn't need Node.js APIs; Edge Runtime is fine |
| Manual UA regex parsing in middleware | `userAgent()` helper from `next/server` | Next.js 12.0 (stable in v12.2) | Use `userAgent()` — do not hand-roll UA parsing |

**Deprecated/outdated:**
- `middleware.ts` filename: Deprecated in Next.js 16 in favor of `proxy.ts`. Not relevant for this project on 15.5.7. Do not rename.
- 302 redirects from middleware: Replaced by 307 default since Next.js PR #33505. Always use 307 for temporary app store redirects.

---

## Open Questions

1. **Does `NextResponse.redirect` with an external URL (https://apps.apple.com/...) work from middleware?**
   - What we know: `NextResponse.redirect` accepts a URL string or URL object. The redirecting guide shows examples with internal URLs but the guides section mentions absolute URLs are supported.
   - What's unclear: Whether there are any CDN or platform-specific restrictions on external redirects from middleware.
   - Recommendation: This is standard behavior and widely used in production. Confidence is HIGH that it works. Verify manually by testing the deployed middleware with a real iOS device before launch (noted as a blocker in STATE.md).

2. **`APP_STORE_LINK` and `GOOGLE_PLAY_LINK` — are the URLs live?**
   - What we know: The URLs exist in `src/constants/links.ts` and point to real App Store / Google Play entries.
   - What's unclear: Whether the app listings are published and accessible at those URLs.
   - Recommendation: This is a pre-launch validation step (noted as a concern in STATE.md), not a code concern. The middleware code itself is correct.

3. **Should the middleware also handle `/download/` (trailing slash)?**
   - What we know: Next.js normalizes trailing slashes by default. A request to `/download/` will be normalized to `/download` before middleware runs.
   - What's unclear: Whether `skipTrailingSlashRedirect` is configured in `next.config.js`.
   - Recommendation: Check `next.config.js`. If not configured, trailing slash normalization is automatic and no special handling is needed.

---

## Sources

### Primary (HIGH confidence)

- `https://nextjs.org/docs/app/api-reference/functions/userAgent` — `userAgent()` API, `isBot`, `device.type` values, code examples
- `https://nextjs.org/docs/15/app/api-reference/file-conventions/middleware` — middleware.ts structure, matcher config, Edge Runtime, runtime options
- `https://nextjs.org/docs/app/api-reference/functions/next-response` — `NextResponse.redirect()` API
- `https://nextjs.org/docs/app/guides/redirecting` — `NextResponse.redirect` status codes, 307 vs 308
- `https://nextjs.org/blog/next-16` — proxy.ts vs middleware.ts deprecation timeline, confirms `middleware.ts` deprecated in 16 but still available
- `https://nextjs.org/docs/app/api-reference/edge` — Edge Runtime supported/unsupported APIs

### Secondary (MEDIUM confidence)

- GitHub issue #75032 (vercel/next.js) — Confirms built-in `isBot` misses Google-InspectionTool, Google-CloudVertexBot, Google-Other (January 2025, confirmed via WebSearch)
- Apple Developer Forums thread on iPadOS UA — Confirms iPadOS 13+ sends `Macintosh` UA by default (verified by multiple sources)
- Next.js PR #33505 — Confirms `NextResponse.redirect` default status changed to 307 (verified via WebSearch)

### Tertiary (LOW confidence)

- Medium articles on Next.js 16 proxy.ts migration — Corroborates but not verified against official source directly

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — confirmed from official Next.js docs for version 15.x
- Architecture: HIGH — based on official API docs and existing codebase patterns
- Pitfalls: HIGH (iPadOS, Edge Runtime) / MEDIUM (bot coverage gaps) — iPadOS behavior confirmed by multiple primary sources; bot gaps confirmed by GitHub issue

**Research date:** 2026-02-27
**Valid until:** 2026-03-27 (stable APIs, 30-day window)
