# Requirements: StreetFeast Cookie Consent

**Defined:** 2026-02-19
**Core Value:** Food truck owners can register, manage their profiles, and be discovered by hungry customers through a polished, fast web experience.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Consent Banner

- [ ] **BNRR-01**: User sees a bottom-bar cookie consent banner on first visit before any non-essential scripts load
- [ ] **BNRR-02**: User can click "Accept All" to enable reCAPTCHA and FingerprintJS
- [ ] **BNRR-03**: User can click "Reject All" to decline non-essential cookies
- [ ] **BNRR-04**: Accept and Reject buttons have equal visual prominence (same size, color, position)
- [ ] **BNRR-05**: User's consent choice persists across sessions via localStorage
- [ ] **BNRR-06**: Banner is mobile responsive and doesn't obscure primary content
- [ ] **BNRR-07**: User can reopen the banner via a "Cookie Preferences" link in the footer

### Script Blocking

- [ ] **SCRP-01**: GoogleReCaptchaProvider only mounts when user has accepted cookies (no reCAPTCHA scripts load before consent)
- [ ] **SCRP-02**: FingerprintJS only loads when user has accepted cookies
- [ ] **SCRP-03**: Contact Us form is replaced with a prompt requiring cookie acceptance and ToS acknowledgment when cookies are declined

### Accessibility

- [ ] **A11Y-01**: Banner uses clear, plain language explaining what cookies are used for
- [ ] **A11Y-02**: Banner is keyboard navigable (Tab, Enter, Escape)
- [ ] **A11Y-03**: Banner meets WCAG 2.2 contrast requirements (4.5:1 ratio)

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Preference Management

- **PREF-01**: User can manage granular cookie categories (Necessary vs Analytics/Security)
- **PREF-02**: Preference center with category-by-category toggles and descriptions
- **PREF-03**: Transparent service list naming reCAPTCHA and FingerprintJS with purposes

### UX Enhancements

- **UX-01**: Smooth fade-in animation for banner appearance
- **UX-02**: Privacy-first messaging explaining why specific tracking is needed
- **UX-03**: Route-based banner triggering (show only before Contact page)

### Enterprise Compliance

- **COMP-01**: Consent audit logs with timestamps and device info
- **COMP-02**: Geolocation-based consent rules (EU vs US)
- **COMP-03**: Multi-language support for banner text

## Out of Scope

| Feature | Reason |
|---------|--------|
| Third-party consent platforms (OneTrust, CookieBot) | Over-engineered for 2 tracking services, building in-house matches existing design |
| IAB TCF 2.3 compliance | No programmatic advertising on this site |
| Cookie scanner / auto-detection | Only 2 known services, hardcoded is simpler |
| Consent analytics dashboard | Defer unless compliance team requests |
| Backend API changes for form without reCAPTCHA | Frontend-only scope, backend accepts or rejects |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| BNRR-01 | Phase 2 | Pending |
| BNRR-02 | Phase 2 | Pending |
| BNRR-03 | Phase 2 | Pending |
| BNRR-04 | Phase 2 | Pending |
| BNRR-05 | Phase 1 | Pending |
| BNRR-06 | Phase 2 | Pending |
| BNRR-07 | Phase 2 | Pending |
| SCRP-01 | Phase 3 | Pending |
| SCRP-02 | Phase 3 | Pending |
| SCRP-03 | Phase 3 | Pending |
| A11Y-01 | Phase 2 | Pending |
| A11Y-02 | Phase 2 | Pending |
| A11Y-03 | Phase 2 | Pending |

**Coverage:**
- v1 requirements: 13 total
- Mapped to phases: 13
- Unmapped: 0

---
*Requirements defined: 2026-02-19*
*Last updated: 2026-02-19 after roadmap creation*
