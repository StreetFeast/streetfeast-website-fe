# Roadmap: StreetFeast Cookie Consent

## Overview

This roadmap delivers GDPR-compliant cookie consent for StreetFeast's Next.js website by implementing a custom consent banner, persistent state management, and conditional script loading that blocks reCAPTCHA and FingerprintJS until user approval. The three-phase journey builds from legal compliance foundation (state management, privacy updates) through user-facing consent UI to technical enforcement that prevents third-party scripts from executing before consent is granted.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: State Management Foundation** - Zustand consent store with cookie persistence and SSR hydration handling
- [ ] **Phase 2: Banner UI & User Controls** - Cookie consent banner with equal-prominence buttons, preference center, and accessibility
- [ ] **Phase 3: Script Blocking & Form Gating** - Conditional loading of reCAPTCHA and FingerprintJS based on consent state

## Phase Details

### Phase 1: State Management Foundation
**Goal**: Consent state is managed, persisted, and accessible throughout the application without SSR/hydration errors

**Depends on**: Nothing (first phase)

**Requirements**: BNRR-05

**Success Criteria** (what must be TRUE):
  1. User's consent choice (accept/reject/unset) persists across browser sessions via cookie storage
  2. Application can read consent state on both server and client without hydration mismatch errors
  3. Privacy policy is updated to reflect Google's April 2, 2026 data controller shift for reCAPTCHA compliance
  4. Zustand consent store integrates with existing state management patterns (matches authStore architecture)

**Plans**: TBD

Plans:
- [ ] 01-01: TBD during planning

### Phase 2: Banner UI & User Controls
**Goal**: Users see a compliant cookie consent banner on first visit and can manage preferences anytime

**Depends on**: Phase 1

**Requirements**: BNRR-01, BNRR-02, BNRR-03, BNRR-04, BNRR-06, BNRR-07, A11Y-01, A11Y-02, A11Y-03

**Success Criteria** (what must be TRUE):
  1. User sees bottom-bar cookie banner on first visit before any non-essential scripts load
  2. User can click "Accept All" or "Reject All" with equal visual prominence (identical size, color, position)
  3. User can navigate the banner using keyboard only (Tab, Enter, Escape) with proper focus management
  4. User sees clear, plain language explaining reCAPTCHA and FingerprintJS purposes (spam prevention)
  5. User can reopen the banner via "Cookie Preferences" link in the footer to change their mind
  6. Banner is fully responsive on mobile without obscuring primary page content
  7. Banner text meets WCAG 2.2 AA contrast requirements (4.5:1 minimum ratio)

**Plans**: TBD

Plans:
- [ ] 02-01: TBD during planning

### Phase 3: Script Blocking & Form Gating
**Goal**: Third-party tracking scripts only load after user consent, and contact form provides alternative when consent is declined

**Depends on**: Phase 2

**Requirements**: SCRP-01, SCRP-02, SCRP-03

**Success Criteria** (what must be TRUE):
  1. When user declines cookies, no reCAPTCHA or FingerprintJS scripts load (verified in browser Network tab)
  2. When user accepts cookies, GoogleReCaptchaProvider mounts and reCAPTCHA scripts load successfully
  3. When user declines cookies, contact form shows email link alternative instead of form (no cookie wall)
  4. When user accepts cookies, contact form loads with full reCAPTCHA and FingerprintJS spam prevention
  5. Application handles missing executeRecaptcha context gracefully without crashes when provider isn't mounted

**Plans**: TBD

Plans:
- [ ] 03-01: TBD during planning

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. State Management Foundation | 0/TBD | Not started | - |
| 2. Banner UI & User Controls | 0/TBD | Not started | - |
| 3. Script Blocking & Form Gating | 0/TBD | Not started | - |

---
*Roadmap created: 2026-02-19*
*Last updated: 2026-02-19*
