# Feature Research

**Domain:** Cookie Consent / Privacy Compliance
**Researched:** 2026-02-19
**Confidence:** HIGH

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist. Missing these = product feels incomplete or creates legal liability.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Banner on First Visit | Legal requirement (GDPR, ePrivacy) - consent needed before tracking | LOW | Must appear before any non-essential cookies/tracking |
| Accept All Button | Required one-click consent path | LOW | Must be equally prominent to Reject |
| Reject All Button | Mandatory one-click rejection (2026 enforcement) | LOW | Must be same size/color/prominence as Accept |
| Customize/Manage Preferences | Granular consent requirement | MEDIUM | Must allow category-by-category selection |
| Equal Visual Prominence | Austria high court ruling 2025 - button parity required | LOW | "Accept" and "Reject" must be identical in size, color, contrast |
| Persistent Preferences Link | Users must be able to change consent anytime | LOW | Typically in footer, reopens preference center |
| Cookie Categories | Granular consent by purpose (GDPR requirement) | MEDIUM | Minimum: Necessary, Analytics, Marketing/Advertising |
| Prior Consent Blocking | Non-essential cookies/scripts blocked until consent given | HIGH | Must prevent reCAPTCHA/Fingerprint from loading pre-consent |
| Consent Persistence | Remember user choice across sessions | LOW | Use localStorage (not cookies) to avoid circular dependency |
| Clear Language | Plain language explanations (not legalese) | LOW | 2026 trend away from legal jargon toward conversational |
| Mobile Responsive | Mobile-first design is compliance requirement | MEDIUM | Different layouts for mobile vs desktop |
| Withdraw Consent | As easy to withdraw as to give (GDPR Article 7.3) | MEDIUM | Via preference center, must delete/block tracking immediately |
| Information About Tracking | Users must know what's tracked and why (informed consent) | MEDIUM | List services: reCAPTCHA, FingerprintJS, Supabase auth |
| WCAG 2.2 Accessibility | European Accessibility Act requirement (June 28, 2025) | MEDIUM | Keyboard nav, 4.5:1 contrast, screen reader support |

### Differentiators (Competitive Advantage)

Features that set the product apart. Not required, but valuable.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| No Banner for Non-Tracking Users | Better UX - if user never visits Contact page, no banner needed | MEDIUM | Route-based banner triggering (show only before Contact form) |
| Privacy-First Messaging | Build trust by explaining why we need specific tracking | LOW | "We use reCAPTCHA to prevent spam" rather than generic privacy text |
| Contextual Consent | Ask for consent when relevant, not on homepage | MEDIUM | Show banner when user navigates to Contact page |
| Minimal Cookie Categories | Only categories actually used (not a long list) | LOW | 2 categories: Necessary (Supabase), Analytics/Security (reCAPTCHA + Fingerprint) |
| Smooth Animation | Professional feel with subtle fade-in (not aggressive popup) | LOW | Bottom-aligned banner that doesn't cover primary content |
| No Cookie Wall | Allow browsing without consent (only block Contact form) | LOW | Better UX than blocking entire site |
| Transparent Service List | Explicitly name third parties (Google reCAPTCHA, FingerprintJS) | LOW | Builds trust vs vague "partners" language |
| Quick Accept Flow | Accept All → instant dismissal, no unnecessary steps | LOW | Optimize for users who just want to proceed |
| Preference Memory Indicator | Subtle visual cue that preferences are remembered | LOW | Small checkmark or text "Your privacy choices are saved" |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but create problems.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Pre-ticked Checkboxes | Faster to implement, higher consent rates | Illegal under GDPR - consent must be affirmative action | All checkboxes unchecked by default |
| Colored Accept vs Gray Reject | Marketing wants higher accept rates | Austria high court ruled this violates GDPR button parity | Equal visual styling for both buttons |
| Hide Reject Button | Desire for higher consent rates | Dark pattern - violates GDPR "freely given" requirement | First-layer Reject All button |
| Bundled Consent | One toggle for all tracking | Violates "specific" consent requirement | Category-by-category toggles |
| Cookie Walls | Force consent to view site | Violates "freely given" - coercion invalidates consent | Allow browsing, block only features requiring tracking |
| Assume Consent from Browsing | Simpler implementation | Invalid under GDPR - requires affirmative action | Explicit Accept/Reject buttons |
| Full-Screen Modal | Grabs attention effectively | Pressure tactic, accessibility issues, poor mobile UX | Bottom banner or top bar |
| Guilt-Trip Language | "Help us improve" instead of "Marketing" | Deceptive - violates "informed" consent requirement | Clear, honest category labels |
| Multi-Step Reject Process | Protects acceptance rates | Dark pattern - withdrawal must be "as easy" as giving consent | One-click Reject All on first layer |
| Auto-Consent After Timer | "Deemed accepted" after countdown | Invalid consent - must be explicit action | No timer, wait for user action |
| Consent via Close Button | Assume X button means consent | Invalid - must be affirmative, unambiguous action | X button dismisses without saving choice |
| Detailed Preference Center Only | Full cookie policy in modal | Overwhelming, reduces informed consent in practice | Simple first layer + optional details link |

## Feature Dependencies

```
[Banner Display]
    └──requires──> [Consent State Management] (check localStorage)
                       └──requires──> [Cookie Categories Definition]

[Accept All]
    └──triggers──> [Set All Categories to Accepted]
                       └──triggers──> [Allow Scripts to Load]

[Reject All]
    └──triggers──> [Set All Non-Essential to Rejected]
                       └──triggers──> [Block Scripts from Loading]

[Customize Preferences]
    └──requires──> [Preference Center Component]
                       └──requires──> [Category-by-Category Toggles]
                       └──requires──> [Save Preferences Action]

[Prior Consent Blocking] ──requires──> [Script Wrapper/Gate]
                                    └──prevents──> [reCAPTCHA Load]
                                    └──prevents──> [FingerprintJS Load]

[Withdraw Consent] ──requires──> [Persistent Preferences Link]
                               └──triggers──> [Delete Tracking Cookies]
                               └──triggers──> [Block Scripts]

[Contact Form Access] ──requires──> [Consent Check]
                                 └──if_rejected──> [Replacement Screen]
                                                       └──requires──> [Re-consent Flow]
                                                       └──requires──> [ToS Acknowledgment]
```

### Dependency Notes

- **Banner Display requires Consent State Management:** Must check localStorage on page load to determine if banner should show
- **Prior Consent Blocking requires Script Wrapper:** Cannot use standard script tags - need conditional loading based on consent state
- **Contact Form Access requires Consent Check:** If user previously rejected, show replacement screen asking them to reconsider
- **Preference Center enhances all flows:** Provides granular control for power users while simple users use Accept/Reject All
- **Persistent Link conflicts with "hide forever":** Must always be accessible, cannot be permanently dismissed

## MVP Definition

### Launch With (v1)

Minimum viable product — what's needed to validate the concept and maintain legal compliance.

- [x] **Banner on First Visit** — Legal requirement, must block tracking before consent
- [x] **Accept All Button** — Required consent path, equal prominence
- [x] **Reject All Button** — Mandatory one-click rejection (2026 enforcement)
- [x] **Equal Visual Prominence** — Austria ruling compliance, prevents dark patterns
- [x] **Consent Persistence in localStorage** — Remember user choice across sessions
- [x] **Cookie Categories (2 minimum)** — Necessary (Supabase), Analytics/Security (reCAPTCHA + Fingerprint)
- [x] **Prior Consent Blocking** — Block reCAPTCHA and FingerprintJS until consent given
- [x] **Persistent Footer Link** — Allow users to change preferences anytime
- [x] **Clear Service Disclosure** — List reCAPTCHA and FingerprintJS by name with purposes
- [x] **Preference Center** — Category-by-category toggles with descriptions
- [x] **Mobile Responsive Design** — Mobile-first compliance requirement
- [x] **Contact Form Gating** — If rejected, show replacement screen with re-consent flow
- [x] **Basic Accessibility** — Keyboard navigation, screen reader support

### Add After Validation (v1.x)

Features to add once core is working and if user feedback indicates need.

- [ ] **Route-Based Banner Triggering** — Show banner only when user navigates to Contact page (defer if simple always-show works)
- [ ] **Consent Analytics** — Track accept/reject rates to optimize messaging (only if compliance team requests)
- [ ] **Multi-Language Support** — Translate banner for international users (add when traffic shows need)
- [ ] **Advanced Animations** — Polished transitions and micro-interactions (defer for speed)
- [ ] **Cookie Scanner** — Automated detection of cookies being set (only if adding more tracking)

### Future Consideration (v2+)

Features to defer until product-market fit is established or regulatory environment changes.

- [ ] **Consent Audit Logs** — Store consent records with timestamps, IP, device info (only if enterprise customers/audit requirement)
- [ ] **Geolocation-Based Rules** — Different banners for EU vs US vs other regions (defer - serve strictest standard globally for now)
- [ ] **IAB TCF 2.3 Compliance** — Transparency & Consent Framework for ad tech (not relevant - no programmatic ads)
- [ ] **Consent API Integration** — Browser-native consent signals (emerging standard, not stable yet)
- [ ] **A/B Testing Framework** — Test different consent messaging (dangerous - could violate compliance)

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Banner on First Visit | HIGH | LOW | P1 |
| Accept All Button | HIGH | LOW | P1 |
| Reject All Button | HIGH | LOW | P1 |
| Equal Visual Prominence | HIGH | LOW | P1 |
| Prior Consent Blocking | HIGH | HIGH | P1 |
| Cookie Categories | HIGH | MEDIUM | P1 |
| Preference Center | HIGH | MEDIUM | P1 |
| Consent Persistence | HIGH | LOW | P1 |
| Persistent Footer Link | HIGH | LOW | P1 |
| Mobile Responsive | HIGH | MEDIUM | P1 |
| Contact Form Gating | MEDIUM | MEDIUM | P1 |
| Clear Service Disclosure | MEDIUM | LOW | P1 |
| WCAG Accessibility | MEDIUM | MEDIUM | P1 |
| Route-Based Triggering | MEDIUM | MEDIUM | P2 |
| Privacy-First Messaging | MEDIUM | LOW | P2 |
| Smooth Animation | LOW | LOW | P2 |
| Consent Analytics | LOW | MEDIUM | P2 |
| Multi-Language Support | LOW | HIGH | P3 |
| Consent Audit Logs | LOW | HIGH | P3 |
| Geolocation Rules | LOW | HIGH | P3 |
| IAB TCF Compliance | LOW | HIGH | P3 |

**Priority key:**
- P1: Must have for launch (legal compliance + core UX)
- P2: Should have, add when possible (UX improvements, not legally required)
- P3: Nice to have, future consideration (enterprise features, emerging standards)

## Competitor Feature Analysis

| Feature | OneTrust (Enterprise) | CookieYes (Mid-Market) | Our Approach (Lean Startup) |
|---------|----------------------|------------------------|------------------------------|
| Banner Display | Auto-scan all cookies, highly configurable | Template-based, limited customization | Hardcoded categories for known services |
| Granular Controls | Vendor-level granularity (100+ vendors) | Category-level (4-6 categories) | 2 categories only (minimal but compliant) |
| Consent Records | Full audit logs, 5-year retention, encrypted | Basic logs, 1-year retention | No logs initially (defer to v2+ unless audited) |
| Geolocation | Region-specific rules, 100+ jurisdictions | EU vs non-EU toggle | Single strict standard globally |
| Script Blocking | Tag manager integration, automatic blocking | Manual script wrapper implementation | Manual conditional loading |
| Preference Center | Multi-layer with vendor lists | Single-layer category toggles | Single-layer, 2 categories |
| Analytics Dashboard | Consent rate tracking, A/B testing | Basic consent metrics | None initially (defer) |
| Cost | $15K-100K+/year | $99-299/year | $0 (build in-house) |
| Implementation | Complex, requires dedicated team | Medium, 1-2 day integration | Simple, hardcoded for exact use case |

**Our competitive advantage:** Minimal implementation focused on exact use case (reCAPTCHA + FingerprintJS only), avoiding over-engineering while maintaining full compliance. Trade configurability for simplicity.

## Sources

### Legal Requirements & Compliance
- [Cookie Banner Design 2026 | Compliance & UX Best Practices](https://secureprivacy.ai/blog/cookie-banner-design-2026)
- [GDPR Cookie Consent: A Complete 2026 Guide for Compliance & Optimization](https://geotargetly.com/blog/gdpr-cookie-consent-a-complete-guide-for-compliance)
- [Cookie Consent Implementation: 2026 and Beyond Step-by-Step Guide](https://secureprivacy.ai/blog/cookie-consent-implementation)
- [5 GDPR-compliant Cookie Banner Guidelines from the EDPB](https://www.onetrust.com/resources/5-gdpr-compliant-cookie-banner-guidelines-from-the-edpb-infographic/)
- [Cookie banner requirements by country (EU overview 2026)](https://cookiebanner.com/blog/cookie-banner-requirements-by-country-eu-overview-2026/)

### Dark Patterns & Enforcement
- [Dark Pattern Avoidance 2026 Checklist | UX & Compliance Guide](https://secureprivacy.ai/blog/dark-pattern-avoidance-2026-checklist)
- [Global Cookie Consent Trends 2026 | Future of Consent](https://secureprivacy.ai/blog/global-cookie-consent-trends-2026)
- [Dark Patterns in Cookie Consent: How to Avoid Them](https://www.cookieyes.com/blog/dark-patterns-in-cookie-consent/)
- [Cookie Compliance in 2026: Where GDPR Enforcement Stands Now](https://www.gerrishlegal.com/blog/cookie-compliance-in-2026-where-gdpr-enforcement-stands-now)

### Technical Implementation
- [What are cookies, local storage and session storage from a privacy law perspective?](https://www.clym.io/blog/what-are-cookies-local-storage-and-session-storage-from-a-privacy-law-perspective)
- [Cookie Preference Center | Consent Management Platform Guide](https://secureprivacy.ai/blog/cookie-preference-center-guide)
- [JavaScript Cookie Consent Implementation: Complete Guide](https://etch1.com/cookie-banner/javascript-cookie-consent/)

### reCAPTCHA & Fingerprinting
- [reCAPTCHA Privacy – How to Stay GDPR Compliant in 2026](https://capmonster.cloud/en/blog/recaptcha-privacy-how-to-stay-gdpr-compliant-in-2026)
- [Google reCAPTCHA Cookies: Are They GDPR Compliant?](https://www.gdprregister.eu/gdpr/google-recaptcha-cookies/)
- [Is Google reCAPTCHA GDPR Compliant?](https://friendlycaptcha.com/insights/recaptcha-gdpr/)
- [Google's ReCAPTCHA v3: What you need for GDPR compliance](https://usercentrics.com/knowledge-hub/googles-recaptcha-what-you-need-to-know-to-be-gdpr-compliant/)

### Consent Withdrawal & Records
- [Withdrawal of Consent: A Tactical Guide](https://www.termsfeed.com/blog/cookie-consent-withdrawal/)
- [Are Consent Logs Required? How to Comply With Cookie Consent Laws](https://www.termsfeed.com/blog/cookie-consent-log/)
- [Automating Proof of Consent: Record User Consent and Audit Trails](https://cookie-script.com/guides/automating-proof-of-consent)
- [GDPR Cookie Consent: 8 Requirements and Critical Compliance Tips](https://www.exabeam.com/explainers/gdpr-compliance/gdpr-cookie-consent-8-requirements-and-critical-compliance-tips/)

### UX & Accessibility
- [GDPR Cookie Consent UX in 2025: Banners and Preference Centers](https://germainux.com/2025/11/30/gdpr-cookie-consent-ux-in-2025-banners-and-preference-centers-that-comply-without-killing-engagement/)
- [Cookie Banner 101: From Legal Requirements to UX Best Practices](https://transcend.io/blog/cookie-banner-101)
- [UX Patterns for High Consent Rates (That Are Still Legal)](https://cookie-script.com/guides/ux-patterns-for-high-consent-rates)

---
*Feature research for: Cookie Consent / Privacy Compliance*
*Researched: 2026-02-19*
