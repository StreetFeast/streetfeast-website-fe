---
phase: 03-script-blocking-form-gating
plan: 01
subsystem: ui
tags: [gdpr, recaptcha, cookie-consent, fingerprintjs, zustand, next.js]

# Dependency graph
requires:
  - phase: 01-state-management-foundation
    provides: useConsentStore with hasConsented tri-state and isHydrated flag
  - phase: 02-banner-ui-user-controls
    provides: clearConsent action wired to Footer CookiePrefsButton for re-consent flow

provides:
  - reCAPTCHA provider scoped to contact page only (removed from global Providers.tsx)
  - Consent-gated GoogleReCaptchaProvider on contact page (mounts only when isHydrated && hasConsented === true)
  - ContactForm consent branching: ContactFormFull (full form + reCAPTCHA) vs NoConsentAlternative (email link + re-consent)
  - No-consent alternative UI with mailto link, clearConsent button, and ToS link

affects: [contact-form, gdpr-compliance, spam-prevention]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Page-level provider scoping: mount third-party providers only on the pages that use them, not globally"
    - "Consent-branching component split: separate inner components (ContactFormFull, NoConsentAlternative) to avoid conditional hook calls"
    - "Optimistic hydration pattern: render functional default (ContactFormFull) before hydration; switch to alternative after hydration confirms decline"

key-files:
  created: []
  modified:
    - src/components/Providers/Providers.tsx
    - src/app/contact/page.tsx
    - src/components/ContactForm/ContactForm.tsx
    - src/components/ContactForm/ContactForm.module.css

key-decisions:
  - "Page-level provider over global: GoogleReCaptchaProvider moved from app-wide Providers.tsx to contact page only — reCAPTCHA is contact-specific, no need to load on every page"
  - "Split ContactForm into ContactFormFull + NoConsentAlternative: useGoogleReCaptcha hook inside useContactForm cannot be called conditionally (Rules of Hooks), so split into two components"
  - "Optimistic render strategy: show ContactFormFull before hydration (hasConsented !== false) — safe because no scripts load without mounted provider"

patterns-established:
  - "Consent-gated provider pattern: isHydrated && hasConsented === true guard before mounting third-party script providers"
  - "Component-split for conditional hooks: when a hook must be in a provider tree, extract to a child component rather than calling conditionally"

# Metrics
duration: 2min
completed: 2026-02-20
---

# Phase 3 Plan 01: Script Blocking & Form Gating Summary

**GoogleReCaptchaProvider scoped to contact page with tri-state consent gating, and ContactForm split into full form vs. email-alternative branches using Zustand consent store**

## Performance

- **Duration:** ~2 min
- **Started:** 2026-02-20T00:47:38Z
- **Completed:** 2026-02-20T00:49:16Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Removed GoogleReCaptchaProvider from global Providers.tsx — reCAPTCHA scripts no longer load on every page
- Contact page now conditionally mounts GoogleReCaptchaProvider only when `isHydrated && hasConsented === true`
- ContactForm splits into `ContactFormFull` (reCAPTCHA-enabled form) vs `NoConsentAlternative` (email link + re-consent) based on consent state
- FingerprintJS gating achieved by structural isolation: only reachable via `handleSubmit` inside `ContactFormFull`

## Task Commits

Each task was committed atomically:

1. **Task 1: Gate reCAPTCHA provider to contact page** - `2c53ef5` (feat)
2. **Task 2: Add consent-branching ContactForm with no-consent alternative** - `55afb27` (feat)

**Plan metadata:** (docs commit follows)

## Files Created/Modified
- `src/components/Providers/Providers.tsx` - Removed GoogleReCaptchaProvider; now wraps children in Fragment with ToastContainer only
- `src/app/contact/page.tsx` - Converted to client component; reads consent store; conditionally mounts GoogleReCaptchaProvider around ContactForm
- `src/components/ContactForm/ContactForm.tsx` - Split into ContactFormFull (existing form logic), NoConsentAlternative (email + re-consent UI), and ContactForm (branching router)
- `src/components/ContactForm/ContactForm.module.css` - Added `.alternative`, `.emailLink`, `.consentButton`, `.consentPrompt` classes with responsive overrides

## Decisions Made
- Page-level provider scoping over global: reCAPTCHA is only needed on `/contact`, so scoping to the page avoids loading scripts on all routes
- Two-component split for consent branching: React Rules of Hooks prevents calling `useGoogleReCaptcha` conditionally; splitting into `ContactFormFull` and `NoConsentAlternative` keeps each component's hook calls unconditional
- Optimistic hydration: `ContactFormFull` renders when `!isHydrated` (before consent is known) — safe because the GoogleReCaptchaProvider won't mount without confirmed consent, so no third-party scripts load during the indeterminate window

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- GDPR script blocking for reCAPTCHA and FingerprintJS is fully implemented
- All three SCRP requirements met: SCRP-01 (reCAPTCHA gating), SCRP-02 (FingerprintJS gating via structural isolation), SCRP-03 (form replacement with functional email alternative)
- Phase 3 complete — no further plans planned in ROADMAP

## Self-Check: PASSED

All files verified present. Both task commits confirmed in git log.

---
*Phase: 03-script-blocking-form-gating*
*Completed: 2026-02-20*
