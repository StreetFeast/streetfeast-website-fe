# Pitfalls Research

**Domain:** Smart App Download Page with Device Detection (Next.js 15 + App Router)
**Researched:** 2026-02-27
**Confidence:** HIGH

## Critical Pitfalls

### Pitfall 1: `device.type` Is `undefined` for Desktop — Treated as Unknown Device

**What goes wrong:**
The Next.js `userAgent()` helper (backed by `ua-parser-js`) never returns `"desktop"` as a device type. `device.type` is `undefined` for all desktop browsers — including Safari on Mac with Apple Silicon. Code that checks `if (device.type === 'desktop')` never matches. Code that treats `undefined` as "fallback/unknown" accidentally shows the "I can't detect your device" fallback to all desktop users, making the page appear broken.

**Why it happens:**
The `ua-parser-js` library underlying `userAgent()` only reports device types it can positively identify: `mobile`, `tablet`, `console`, `smarttv`, `wearable`, `embedded`. Desktop is the absence of a known mobile type, not a type itself. The Next.js docs show `device.type || 'desktop'` as the canonical pattern, but developers sometimes miss that this means undefined === desktop, not that desktop is explicitly returned. A confirmed open GitHub issue (#87236) documents this behavior.

**How to avoid:**
Use the `|| 'desktop'` pattern exactly as documented. Treat `undefined` as desktop/fallback, never as error:
```typescript
import { userAgent } from 'next/server';
// In middleware only (not server component):
const { device, os } = userAgent(request);
const deviceType = device.type || 'desktop'; // 'mobile' | 'tablet' | 'desktop'

if (deviceType === 'mobile') {
  // Route to app store based on OS
  const isIOS = os.name === 'iOS';
  return NextResponse.redirect(isIOS ? IOS_URL : ANDROID_URL);
}
// Otherwise fall through to the /download page with both badges
```

**Warning signs:**
- `device.type === 'desktop'` condition in code (will never be true)
- Desktop users see "device not detected" fallback UI instead of both badge buttons
- `console.log(device.type)` returns `undefined` for Mac/Windows browsers

**Phase to address:**
Implementation phase — get the condition logic right before first deploy.

---

### Pitfall 2: iPadOS 13+ Reports Itself as macOS — iOS Redirect Misses iPad Users

**What goes wrong:**
Since iPadOS 13, Safari on iPad sends a macOS desktop user-agent string. `device.type` returns `undefined` (treated as desktop) and `os.name` returns `"Mac OS"` instead of `"iOS"`. iPadOS users are shown the desktop fallback page with both store badges instead of being auto-redirected to the iOS App Store. This affects all iPads running iPadOS 13 and later — effectively all active iPads in circulation.

**Why it happens:**
Apple deliberately changed iPadOS to request desktop sites by default, making iPad's user-agent indistinguishable from macOS in standard parsing. This is not a bug in `ua-parser-js` or Next.js — it is intentional behavior from Apple. Most device detection libraries were broken by this change and have never fully recovered.

**How to avoid:**
Two options:

Option A — Accept the limitation and treat it as a design decision. iPad users see the fallback page with both badges, which still works correctly (they can tap the App Store badge). This is the pragmatic choice for a simple download page.

Option B — Check for platform-specific touch support on the client side after server-side detection:
```typescript
// Client-side supplement (in a "use client" component)
// Only runs after server delivers the fallback page to iPad
const isIpadOS = navigator.maxTouchPoints > 0 && /Mac/.test(navigator.platform);
```
Use client-side JavaScript as a secondary detection layer for iPad-specific flows.

For this project, Option A is recommended. The fallback page showing both badges handles iPad correctly without complexity.

**Warning signs:**
- Analytics shows iPad users (from other data sources) are not converting from the `/download` page at iOS rates
- Team assumes "iOS detection works for all Apple devices"
- No mention of iPad detection limitation in code comments

**Phase to address:**
Implementation phase — document the limitation in code comments so future developers don't "fix" the undefined behavior and break it.

---

### Pitfall 3: Server-Side Redirect to App Store Breaks SEO — Googlebot Gets No Content

**What goes wrong:**
Implementing the `/download` page as a pure server-side redirect (e.g., using `redirect()` from `next/navigation` in a Server Component based on user-agent) causes Googlebot to receive a 307 or 308 redirect to the iOS App Store or Google Play Store. Googlebot cannot follow those external redirects meaningfully. The `/download` URL disappears from Google's index entirely — it cannot be shared or found via search because there is no indexable content at the URL.

**Why it happens:**
Developers conflate "user-agent detection for redirect" with "the page itself is just a redirect." The `/download` URL should be a real page with real content for bots and desktop users. Only mobile browsers should be redirected — bots and desktop should receive the full fallback page HTML.

**How to avoid:**
Use middleware for the redirect decision, not Server Component `redirect()`. The middleware runs before the page renders, checks the user-agent, and redirects only genuine mobile browsers:

```typescript
// middleware.ts
import { NextResponse, userAgent } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname !== '/download') return NextResponse.next();

  const { device, os, isBot } = userAgent(request);

  // Never redirect bots — let them index the page content
  if (isBot) return NextResponse.next();

  const isMobile = device.type === 'mobile';
  if (isMobile) {
    const isIOS = os.name === 'iOS';
    const destination = isIOS ? APP_STORE_URL : GOOGLE_PLAY_URL;
    return NextResponse.redirect(destination, { status: 307 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/download',
};
```

The `/download` page itself then always renders the fallback UI with both badges — bots and desktop users see real HTML content.

**Warning signs:**
- `redirect()` from `next/navigation` used in `page.tsx` based on user-agent (wrong layer)
- Google Search Console shows `/download` as "Redirect" rather than "Indexed"
- The `/download` page has no indexable text content, only redirect logic
- Sitemap includes `/download` but Google Search Console shows it as 307/308

**Phase to address:**
Implementation phase — the architecture of redirect-in-middleware + fallback-in-page must be decided before any code is written.

---

### Pitfall 4: Using `permanentRedirect` (308) to App Store — Browsers Cache It Permanently

**What goes wrong:**
Using `permanentRedirect()` or a 308 status code to redirect to the iOS App Store or Google Play causes browsers to cache the redirect indefinitely. The next time the user visits `/download`, their browser skips the page entirely and goes directly to the App Store — no server request, no middleware, no user-agent check. If the app store URL ever changes (e.g., the app is renamed, republished, or the URL structure changes), mobile users are stuck with a cached redirect to a dead link.

**Why it happens:**
Developers use `permanentRedirect` because it seems "more correct" for a stable URL. But app store URLs are external URLs outside your control. The 308 vs 307 distinction matters enormously for external redirects that might change.

**How to avoid:**
Always use temporary redirects (307) for external app store URLs. App store URLs must be treated as potentially changeable, even if they seem stable:
```typescript
return NextResponse.redirect(destination, { status: 307 });
```

**Warning signs:**
- `permanentRedirect()` or `{ status: 308 }` used for app store URLs
- No cache-control headers on the redirect response
- Team has no plan for "what if our App Store URL changes"

**Phase to address:**
Implementation phase — a one-line choice with long-term consequences.

---

### Pitfall 5: `userAgent()` Only Available in Middleware — Not in Server Components

**What goes wrong:**
The `userAgent()` helper from `next/server` only accepts a `NextRequest` object (available in middleware). Server Components use `headers()` from `next/headers` and receive a standard `ReadonlyHeaders` object — `userAgent()` cannot be called with it. Attempting to call `userAgent()` in a Server Component either throws a type error or requires awkward workarounds. Developers who want to do device detection in a Server Component end up writing their own partial user-agent parsing that's less reliable.

**Why it happens:**
`next/server` and `next/headers` are two different APIs for two different contexts. The official `userAgent()` docs only show middleware examples. The separation isn't obvious to developers who haven't read the docs carefully.

**How to avoid:**
Do all device-based redirect logic in `middleware.ts`. If you need OS detection in a Server Component (for conditional rendering, not redirect), parse the user-agent string directly:
```typescript
// In a Server Component (if needed for rendering, NOT redirect)
import { headers } from 'next/headers';

const headersList = await headers();
const ua = headersList.get('user-agent') || '';
const isIOS = /iPhone|iPad|iPod/.test(ua);
// Note: This does NOT handle iPadOS 13+ correctly for iPad detection
```

**Warning signs:**
- `import { userAgent } from 'next/server'` appears in a file under `app/` (not `middleware.ts`)
- TypeScript errors about incompatible Request types
- User-agent parsing duplicated in multiple places

**Phase to address:**
Implementation phase — understand the API split before writing any device detection code.

---

### Pitfall 6: `headers()` in Server Component Forces the Page Out of Static Rendering

**What goes wrong:**
Calling `headers()` from `next/headers` inside the `/download` page Server Component makes the entire page dynamically rendered on every request (no static generation, no CDN caching). This is correct for this specific page, but it can surprise developers who expect the page to be cacheable like other static marketing pages. Additionally, if middleware is handling the redirect, the Server Component may not need `headers()` at all — calling it unnecessarily just for a fallback render adds latency.

**Why it happens:**
Next.js 15 treats any call to `headers()`, `cookies()`, or similar Dynamic APIs as an opt-out of static rendering. The page becomes a fully dynamic route. For a `/download` fallback page (shown to desktop/bots), the content is actually static — both store badges don't change. Calling `headers()` in the page file when middleware is already handling detection is redundant work.

**How to avoid:**
Keep the `/download` page Server Component as a pure static fallback — no `headers()`, no `userAgent()` calls. Let middleware handle all detection and redirect. The page renders its static HTML (both store badges, StreetFeast branding) and does nothing dynamic. Only middleware runs on every request:
```typescript
// app/download/page.tsx — NO headers() call needed
export const metadata = { title: 'Download StreetFeast' };

export default function DownloadPage() {
  // Static content only — middleware already handled mobile redirect
  return <DownloadFallbackUI />;
}
```

**Warning signs:**
- `headers()` or `cookies()` imported in `app/download/page.tsx`
- `export const dynamic = 'force-dynamic'` added to the download page unnecessarily
- User-agent parsing duplicated in both middleware.ts and page.tsx

**Phase to address:**
Implementation phase — keep the architecture clean from the start.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Client-side-only device detection (`"use client"` + `navigator.userAgent`) | No middleware needed, simpler setup | Bots see the client shell with no content, SEO suffers, mobile users see a flash of the fallback page before redirect | Never for a page intended for SEO and sharing |
| Hardcoding `os.name === 'Android'` without fallback | Simple readable check | Android forks (Samsung Internet, MIUI Browser) may report different OS names; misses some devices | Only acceptable if non-Android redirect is the fallback behavior anyway |
| Skipping `isBot` check in middleware | Slightly less code | Googlebot receives redirect to App Store, page disappears from index | Never |
| Using 308 permanent redirect to app store | Signals stability to bots | Cached forever in user browsers, impossible to update without users clearing cache | Never for external URLs |
| Omitting `/download` from sitemap | Less sitemap maintenance | Google de-prioritizes the page without explicit sitemap signal | Only acceptable if SEO for `/download` is not a goal |
| Inline `navigator.userAgent` regex instead of using structured parsing | No library needed | Brittle, misses edge cases, iPadOS/Samsung Browser/etc. not handled correctly | Only for throwaway prototypes |

---

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Apple App Store URL (`apps.apple.com`) | Using `itms-apps://` URL scheme for web redirect | Use the HTTPS `https://apps.apple.com/...` URL — it opens the App Store app on iOS Safari and works as a web fallback on other platforms. `itms-apps://` has no official support guarantee and Apple has removed docs for it |
| Google Play Store URL | Using `market://` scheme in server redirect | Use the HTTPS `https://play.google.com/store/apps/details?id=...` URL — browser-safe and works across all Android browsers. `market://` only works when the Play Store app intercepts it and fails in many browsers (Opera, some WebViews) |
| `links.ts` constants | Importing `APP_STORE_LINK` / `GOOGLE_PLAY_LINK` from `src/constants/links.ts` in middleware | Middleware runs in Edge Runtime which cannot import from all modules. Keep URLs as string literals or in a middleware-safe constants file (no Node.js imports). Verify the constants file has no Node.js-only dependencies |
| OG image for `/download` page | Reusing the generic `social-media-logo.png` | The `/download` URL will be shared specifically to prompt downloads. Consider a dedicated OG image with "Download StreetFeast" copy and both platform badges visible — higher click-through when shared on messaging apps |
| Next.js `sitemap.ts` | Forgetting to add `/download` to the sitemap | The existing `sitemap.ts` only includes home, privacy, and terms. Add `/download` with appropriate `priority` and `changeFrequency` values — without it, Google is slower to index the new page |
| `robots.ts` | `/download` is already allowed by the wildcard `allow: '/'` rule | No change needed to `robots.ts`, but verify the existing Googlebot rule doesn't accidentally block `/download` — currently it does not |
| Smart App Banner meta tag (`apple-itunes-app`) | Relying on this as the primary download mechanism | The `<meta name="apple-itunes-app">` tag shows a non-dismissible system banner in iOS Safari. Use it as a supplement to the `/download` page, not a replacement. It requires the app's App Store ID, not the full URL |

---

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Middleware running on all routes by default | Every page load in the app includes middleware execution even for non-download routes | Always include a `matcher` in middleware config: `matcher: '/download'`. Without it, middleware runs on every request including static assets | Immediately — every request incurs middleware overhead |
| Fetching app store metadata server-side | Download page loads slowly while server fetches App Store API data to display rating/reviews | Don't fetch external data for the `/download` page. Store badge images and a static CTA are sufficient | Any use of external API on this path |
| Missing `Vary: User-Agent` header | CDN or proxy caches the mobile-redirected response and serves it to desktop users, or vice versa | Since middleware handles redirect before the page renders, the response to mobile is a redirect — CDNs typically don't cache redirects. But if served through a custom CDN, add `Vary: User-Agent` | Any CDN layer that aggressively caches based on URL only |

---

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| Open redirect via query parameter | If the redirect destination is ever taken from a query parameter (e.g., `/download?next=https://evil.com`), attackers can craft phishing URLs using your domain | Never use query parameters to determine the redirect destination. The iOS/Android URL must be hardcoded in `links.ts` and read only from there in middleware |
| CVE-2025-29927: Middleware bypass via `x-middleware-subrequest` header | This critical Next.js vulnerability (CVSS 9.1, affects versions before 15.2.3) allowed attackers to send a crafted `x-middleware-subrequest` header to skip middleware execution. For a download page this means the device-detection redirect could be bypassed | Update to Next.js 15.2.3 or later. The project is currently on 15.5.7 which is patched. Verify hosting platform (if self-hosted) blocks the `x-middleware-subrequest` header at the proxy layer |

---

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| No transition delay before auto-redirect on mobile | Users see a blank page or flash of content for 100-300ms before the App Store opens, feels broken | Render a minimal loading state ("Redirecting you to the App Store...") that appears instantly while the redirect occurs. Since middleware redirects happen server-side, users see the App Store immediately — no client-side delay needed |
| Fallback page has no visual hierarchy | Desktop users land on a page with two equal-sized badges and no guidance — unclear which to tap | Show both badges but guide the user: "Download on iPhone" / "Get it on Android" with iconography, not just generic badge images. Match existing site styling (Lexend font, existing color palette) |
| Deep link goes to App Store homepage instead of app page | If app store URL is malformed or app is not yet published, users land on the App Store homepage with no context | Verify `APP_STORE_LINK` and `GOOGLE_PLAY_LINK` in `src/constants/links.ts` resolve to the actual app pages before launch. Test both URLs on real devices |
| Missing fallback when app is not yet in store | Redirect fires correctly, but App Store shows "Not Available in Your Region" or 404 | Test both app store URLs resolve correctly before launching the download page. Consider whether the app is live in all target regions |
| No analytics on which store badge was tapped | Cannot measure iOS vs Android install intent from the fallback page | Add `data-*` attributes or a lightweight click handler on each badge button for analytics integration. Since consent banner is already in place, ensure tracking respects cookie consent |
| `/download` linked from nav/hero but page is unindexed | Users click, get redirected, never bookmark the page — SEO value of inbound links lost | Ensure `/download` is in sitemap, has proper metadata, and canonical URL is set correctly so Google indexes it and inbound links carry PageRank |

---

## "Looks Done But Isn't" Checklist

- [ ] **iPad redirect:** Confirmed that iPad users correctly reach the iOS App Store — or the decision to show the fallback page to iPadOS is explicitly documented as intentional
- [ ] **Bot detection:** Verified Googlebot does NOT get redirected — confirm with `isBot` check in middleware and Google Search Console URL Inspection tool
- [ ] **App store URLs:** Both `APP_STORE_LINK` and `GOOGLE_PLAY_LINK` open the correct app pages on a real iOS device and a real Android device (not just the browser version)
- [ ] **Sitemap:** `/download` added to `sitemap.ts` with appropriate priority so Google indexes it
- [ ] **Redirect status code:** Using 307 (not 308) for both app store redirects
- [ ] **Middleware matcher:** `matcher: '/download'` (or appropriate pattern) configured so middleware doesn't run on every route
- [ ] **OG metadata:** `/download` page has unique `title`, `description`, and `openGraph` metadata — not inheriting generic layout metadata
- [ ] **Canonical tag:** `/download` page has canonical set to `https://streetfeastapp.com/download` to prevent duplicate content issues if shared via redirects
- [ ] **No middleware on static assets:** Verify middleware matcher excludes `_next/static`, `_next/image`, `favicon.ico`
- [ ] **Fallback page styled correctly:** Fallback page uses Lexend font and existing CSS module patterns — no inline styles or new CSS variables introduced
- [ ] **`links.ts` importable from middleware:** Verified that importing from `src/constants/links.ts` in `middleware.ts` doesn't pull in Node.js-only modules that break Edge Runtime

---

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| `/download` not indexed by Google (redirect-only page) | MEDIUM | 1) Move redirect logic to middleware.ts 2) Add static fallback content to page.tsx 3) Add `/download` to sitemap.ts 4) Request re-indexing via Google Search Console URL Inspection |
| Permanent redirect (308) cached in user browsers | HIGH | 1) Impossible to clear cached redirects in user browsers 2) Must deploy redirect to a new URL 3) Add `Cache-Control: no-store` to redirect responses going forward 4) Use 307 from the start — there is no recovery from a cached 308 |
| iPad users not reaching App Store (iPadOS as macOS) | LOW | 1) Add client-side supplement: check `navigator.maxTouchPoints > 0 && /Mac/.test(navigator.platform)` 2) Render an additional "iOS App" button for Mac-detected users who have touch points 3) Or accept the fallback page behavior as documented |
| `links.ts` import fails in middleware Edge Runtime | LOW | 1) Extract app store URLs into a separate `src/constants/app-store-links.ts` with no imports 2) Import from that file in middleware 3) Import from the original `links.ts` in page components |
| Middleware running on all routes (forgot matcher) | LOW | 1) Add `export const config = { matcher: '/download' }` to middleware.ts 2) Deploy immediately — easy fix |
| App store URL changes / app republished with new ID | LOW if planned | 1) Update `APP_STORE_LINK` in `links.ts` 2) Deploy — 307 temporary redirects don't cache, so users immediately get new URL |

---

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| `device.type === undefined` for desktop misidentification | Implementation — redirect logic | Manually test: desktop browser hits `/download` and sees the fallback page with both badges |
| iPadOS reported as macOS | Implementation — document as known limitation | Test with an iPad device or Chrome DevTools iPad emulation — result is the fallback page (both badges), which is acceptable |
| Bot redirect kills SEO | Implementation — middleware architecture | Google Search Console URL Inspection confirms `/download` is indexable, not a redirect |
| Permanent redirect (308) to app store | Implementation — one line: use 307 | Check `status` in middleware redirect call |
| `userAgent()` misused in Server Component | Implementation — API boundary awareness | No `userAgent` import in any `app/` directory file |
| `headers()` in page forcing dynamic render unnecessarily | Implementation — keep page static | Verify `app/download/page.tsx` has no `headers()` or `cookies()` import |
| `market://` or `itms-apps://` URL schemes | Implementation — use HTTPS URLs from `links.ts` | `APP_STORE_LINK` and `GOOGLE_PLAY_LINK` start with `https://` |
| `/download` missing from sitemap | Implementation — sitemap update | `sitemap.ts` includes `/download` entry |
| Middleware running on all routes | Implementation — matcher config | Confirm middleware.ts has `export const config = { matcher: ... }` |
| OG metadata missing for `/download` | Implementation — metadata export | Page exports `metadata` with unique title, description, og:image |

---

## Sources

- [Next.js `userAgent` API Reference](https://nextjs.org/docs/app/api-reference/functions/userAgent) — Authoritative, confirms `device.type` values and that desktop is undefined
- [Next.js Redirecting Guide](https://nextjs.org/docs/app/guides/redirecting) — Covers all redirect methods, status codes, middleware vs Server Component
- [GitHub Issue #87236 — `device.type` undefined for macOS Apple Silicon](https://github.com/vercel/next.js/issues/87236) — Confirms this is expected behavior from `ua-parser-js`, not a bug
- [GitHub Discussion #21413 — Redirect based on user-agent with ISR](https://github.com/vercel/next.js/discussions/21413) — Community discussion on correct layer for UA-based redirects
- [CVE-2025-29927 — Next.js Middleware Authorization Bypass](https://projectdiscovery.io/blog/nextjs-middleware-authorization-bypass) — Critical middleware security vulnerability (patched in 15.2.3)
- [Vercel Postmortem on Next.js Middleware Bypass](https://vercel.com/blog/postmortem-on-next-js-middleware-bypass) — Official vulnerability response
- [iPadOS User-Agent — Apple Developer Forums](https://developer.apple.com/forums/thread/119186) — Confirms iPadOS 13+ sends macOS user-agent
- [iPadOS 13 Mobile-Detect Issue #795](https://github.com/serbanghita/Mobile-Detect/issues/795) — Community documentation of the iPad-as-Mac detection problem
- [Detect iPadOS 13 — ScientiaMobile](https://scientiamobile.com/detect-ipados-13/) — Workaround strategies for iPadOS detection
- [Google Mobile-First Indexing Best Practices](https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing) — SEO requirements for device-differentiated pages
- [Google Canonicalization Guide](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) — Canonical handling for redirect pages
- [Apple Marketing Resources and Badge Guidelines](https://developer.apple.com/app-store/marketing/guidelines/) — Official Apple badge usage rules
- [Google Play Badge Guidelines](https://partnermarketinghub.withgoogle.com/brands/google-play/visual-identity/badge-guidelines/) — Official Google badge usage rules
- [Apple Smart App Banners Documentation](https://developer.apple.com/documentation/webkit/promoting-apps-with-smart-app-banners) — `apple-itunes-app` meta tag reference
- [Android Central — Redirect to Google Play Browser Behavior](https://forums.androidcentral.com/threads/redirect-to-google-play-strange-behavior-of-some-browsers.886992/) — Documents `market://` vs HTTPS behavioral differences
- [Googlebot JavaScript Redirects Guide](https://koanthic.com/en/googlebot-javascript-redirects/) — SEO impact of redirect type choices
- [2025 List of Mobile Browser User-Agent Strings — DeviceAtlas](https://deviceatlas.com/blog/2025-list-mobile-browser-user-agent-strings) — Current UA string reference

---
*Pitfalls research for: Smart App Download Page with Device Detection (Next.js 15 App Router)*
*Researched: 2026-02-27*
