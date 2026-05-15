# Download Attribution Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Capture a `download_redirect` PostHog event in middleware when mobile users are redirected from `/download` to the App Store or Google Play, preserving UTM params and referrer for attribution.

**Architecture:** Add a `captureEdgeEvent` helper in `src/lib/posthog.ts` that POSTs to the PostHog Capture API via `fetch`. Restructure `src/middleware.ts` so `postHogMiddleware` runs first (seeding the identity cookie), then the `/download` redirect handler reads the distinct ID from that cookie, fires the event, and redirects.

**Tech Stack:** Next.js Edge Middleware, PostHog Capture HTTP API, `@posthog/next` cookie utilities

---

### Task 1: Add `captureEdgeEvent` helper to `src/lib/posthog.ts`

**Files:**
- Modify: `src/lib/posthog.ts`

- [ ] **Step 1: Add the PostHog API host constant, fire-and-forget toggle, and `captureEdgeEvent` function**

Replace the entire contents of `src/lib/posthog.ts` with:

```ts
export const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_PUBLIC_KEY!
export const POSTHOG_API_HOST = 'https://us.i.posthog.com'

/**
 * When true, captureEdgeEvent returns immediately without awaiting the fetch.
 * Set to false (default) to block until PostHog confirms receipt.
 */
export const FIRE_AND_FORGET = false

/**
 * Sends a capture event to PostHog from the Edge runtime via the HTTP API.
 * Used in middleware where posthog-node is unavailable.
 */
export function captureEdgeEvent(
  distinctId: string,
  event: string,
  properties: Record<string, string | undefined> = {}
): Promise<Response> {
  const body = JSON.stringify({
    api_key: POSTHOG_KEY,
    distinct_id: distinctId,
    event,
    properties: {
      ...properties,
      $lib: 'posthog-edge-middleware',
    },
  })

  return fetch(`${POSTHOG_API_HOST}/capture/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  })
}
```

- [ ] **Step 2: Verify the project still builds**

Run: `npm run build 2>&1 | tail -5`
Expected: Build completes successfully

- [ ] **Step 3: Commit**

```bash
git add src/lib/posthog.ts
git commit -m "feat: add captureEdgeEvent helper for PostHog Edge runtime capture"
```

---

### Task 2: Restructure middleware to seed PostHog cookie before `/download` redirect

**Files:**
- Modify: `src/middleware.ts`

- [ ] **Step 1: Rewrite the middleware**

Replace the entire contents of `src/middleware.ts` with:

```ts
import { NextResponse, userAgent } from 'next/server';
import type { NextRequest } from 'next/server';
import { postHogMiddleware } from '@posthog/next';
import { APP_STORE_LINK, GOOGLE_PLAY_LINK } from '@/constants/links';
import { BOT_PATTERNS } from '@/constants/bots';
import { POSTHOG_KEY, FIRE_AND_FORGET, captureEdgeEvent } from '@/lib/posthog';

const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;

/**
 * Reads the PostHog distinct ID from the identity cookie on the response.
 * Cookie name follows the posthog-js convention: ph_{token}_posthog
 * Falls back to a generated UUID if the cookie is not present.
 */
function getDistinctId(response: NextResponse): string {
  const cookieName = `ph_${POSTHOG_KEY}_posthog`;
  const cookie = response.cookies.get(cookieName);
  if (cookie?.value) {
    try {
      const parsed = JSON.parse(cookie.value);
      if (parsed.distinct_id) return parsed.distinct_id;
    } catch {
      // malformed cookie, fall through to UUID
    }
  }
  return crypto.randomUUID();
}

/**
 * Extracts UTM parameters from the request URL search params.
 */
function getUtmParams(url: URL): Record<string, string | undefined> {
  const params: Record<string, string | undefined> = {};
  for (const key of UTM_PARAMS) {
    const value = url.searchParams.get(key);
    if (value) params[key] = value;
  }
  return params;
}

export async function middleware(request: NextRequest) {
  const ua = request.headers.get('user-agent') || '';
  const isMobile = /iPhone|iPad|iPod|Android/i.test(ua);
  const { pathname } = request.nextUrl;

  // Handle truck profile pages: /truck/{id}
  // Early return — no PostHog cookie needed for app deep links
  const truckMatch = pathname.match(/^\/truck\/([^\/]+)$/);
  if (truckMatch && isMobile) {
    const truckId = truckMatch[1];
    const url = request.nextUrl.clone();
    url.pathname = `/m/truck/${truckId}`;
    return NextResponse.redirect(url);
  }

  // Run PostHog middleware first to seed identity cookie on the response
  const response = NextResponse.next();
  const postHogResponse = await postHogMiddleware({ apiKey: POSTHOG_KEY, proxy: true, response })(request);

  // Handle /download: smart redirect for mobile app users
  if (pathname === '/download') {
    const { isBot: detectedBot, device } = userAgent(request);

    // Bots always see the page
    if (detectedBot || BOT_PATTERNS.test(ua)) {
      return postHogResponse;
    }

    let redirectUrl: string | null = null;
    let platform: string | null = null;

    if (device.type === 'mobile' && /iPhone|iPod/i.test(ua)) {
      redirectUrl = APP_STORE_LINK;
      platform = 'ios';
    } else if (device.type === 'mobile' && /Android/i.test(ua)) {
      redirectUrl = GOOGLE_PLAY_LINK;
      platform = 'android';
    }

    if (redirectUrl && platform) {
      const distinctId = getDistinctId(postHogResponse);
      const utmParams = getUtmParams(request.nextUrl);
      const referrer = request.headers.get('referer') || undefined;

      const capturePromise = captureEdgeEvent(distinctId, 'download_redirect', {
        platform,
        redirect_url: redirectUrl,
        referrer,
        $current_url: request.nextUrl.toString(),
        ...utmParams,
      });

      if (!FIRE_AND_FORGET) {
        await capturePromise;
      }

      return NextResponse.redirect(redirectUrl, 307);
    }

    // Desktop, iPadOS, Android tablet, unknown -> fallback page
    return postHogResponse;
  }

  return postHogResponse;
}

// Run on all routes for PostHog cookie seeding and proxy, excluding static assets
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
```

- [ ] **Step 2: Run lint**

Run: `npm run lint`
Expected: No new errors (pre-existing warnings are fine)

- [ ] **Step 3: Run build**

Run: `npm run build 2>&1 | tail -5`
Expected: Build completes successfully

- [ ] **Step 4: Commit**

```bash
git add src/middleware.ts
git commit -m "feat: capture download_redirect event in middleware before store redirect"
```
