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
