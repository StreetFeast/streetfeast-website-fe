# Download Page Attribution via PostHog

## Problem

Mobile users hitting `/download` get 307-redirected to App Store / Google Play in middleware. The PostHog client SDK never loads, so we have zero attribution data for these users.

Desktop/tablet users see the download page and are tracked normally by the client SDK.

## Solution

Fire a `download_redirect` event to PostHog via the Capture API (HTTP POST) in middleware, right before issuing the redirect. This runs in the Edge runtime where `posthog-node` is unavailable, so we use a raw `fetch` call.

## Event Specification

**Event name:** `download_redirect`

**Properties:**

| Property       | Source                              | Example                          |
| -------------- | ----------------------------------- | -------------------------------- |
| `platform`     | Derived from user-agent             | `"ios"` or `"android"`           |
| `redirect_url` | The store link being redirected to  | `"https://apps.apple.com/..."` |
| `referrer`     | `Referer` request header            | `"https://instagram.com"`        |
| `utm_source`   | URL search param                    | `"instagram"`                    |
| `utm_medium`   | URL search param                    | `"social"`                       |
| `utm_campaign` | URL search param                    | `"summer_launch"`                |
| `utm_content`  | URL search param                    | `"bio_link"`                     |
| `utm_term`     | URL search param                    | `"food_trucks"`                  |
| `$current_url` | Full request URL                    | `"https://streetfeastapp.com/download?utm_source=ig"` |

## Identity

The PostHog middleware seeds a distinct ID cookie on every request. We read this cookie from the response to identify the user. If no cookie exists (edge case on very first request), we generate a UUID as fallback.

## Blocking Mode Toggle

A `FIRE_AND_FORGET` boolean in `src/lib/posthog.ts` controls whether the capture call blocks the redirect:

- `false` (default): `await` the fetch — redirect waits for PostHog confirmation (~50-100ms added latency)
- `true`: use `waitUntil` from `next/server` — no added latency, but event could be lost if the edge function terminates early

## File Changes

### `src/lib/posthog.ts`

Add:
- `POSTHOG_API_HOST` constant (`'https://us.i.posthog.com'`)
- `FIRE_AND_FORGET` toggle (default `false`)
- `captureEdgeEvent(distinctId, event, properties)` — POSTs to `${POSTHOG_API_HOST}/capture/` with the PostHog key, returns a Promise

### `src/middleware.ts`

Restructure the `/download` handler:

1. Run `postHogMiddleware` first to seed the identity cookie on the response
2. For `/download` with a mobile user-agent:
   - Read distinct ID from the PostHog cookie on the response (or generate UUID)
   - Extract UTM params and referrer from the request
   - Call `captureEdgeEvent` with `download_redirect` event
   - Return 307 redirect to the appropriate store

The early-return redirects for `/truck/:id` remain unchanged (no attribution needed there).

## What This Does NOT Cover

- App-side install attribution (that's a separate mobile SDK concern)
- Modifying the download page itself (desktop users are tracked by client SDK already)
- A/B testing store links or landing page variants
