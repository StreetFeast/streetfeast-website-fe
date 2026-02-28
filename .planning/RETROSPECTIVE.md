# Project Retrospective

*A living document updated after each milestone. Lessons feed forward into future planning.*

## Milestone: v1.1 — App Download Page

**Shipped:** 2026-02-28
**Phases:** 3 | **Plans:** 3 | **Sessions:** 2

### What Was Built
- Edge middleware device detection with bot-first gate for /download route (307 redirects to correct app store)
- Zero-JS server component fallback page with both app store badges and Apple Smart App Banner
- Full SEO suite: OG/Twitter metadata, canonical URL, MobileApplication JSON-LD, sitemap entry
- LayoutContent launch gate bypass so /download works in pre-launch production

### What Worked
- Bot-first middleware pattern: checking crawlers before device detection prevented all crawler-redirect edge cases
- Pure server component approach: 0 B first load JS confirmed in build output — no hydration complexity
- Milestone audit caught SEO requirements gap — Phase 6 was added as gap closure before milestone completion
- Consistent plan execution: all 3 plans executed with zero deviations

### What Was Inefficient
- Initial roadmap had only 2 phases (device detection + fallback page) — SEO requirements were orphaned until audit caught them
- Could have planned SEO as part of the fallback page phase rather than needing a separate gap-closure phase

### Patterns Established
- Bot patterns file (`src/constants/bots.ts`): Edge Runtime-compatible pure RegExp for supplemental crawler detection
- JSON-LD pattern: define object in server component function body, inject via native `<script>` with XSS mitigation
- Metadata inheritance: rely on `metadataBase` from root layout, use relative URLs in page-level metadata

### Key Lessons
1. Always include SEO/discoverability requirements upfront — they were missed in initial requirements and caught only by milestone audit
2. Middleware-first redirect is the correct pattern for device routing — avoids flash of content, preserves crawler access
3. 307 temporary redirects are correct for app store routing — 301/308 would cache in browsers permanently

### Cost Observations
- Model mix: balanced profile (sonnet agents, opus orchestration)
- Sessions: 2
- Notable: All 3 plans completed in under 4 minutes each — well-scoped atomic plans

---

## Cross-Milestone Trends

### Process Evolution

| Milestone | Sessions | Phases | Key Change |
|-----------|----------|--------|------------|
| v1.0 | 3 | 3 | Established GSD workflow, consent store + banner + script gating |
| v1.1 | 2 | 3 | Added milestone audit step, caught orphaned requirements |

### Top Lessons (Verified Across Milestones)

1. Atomic plans (1-2 tasks each) execute cleanly with zero deviations — keep plans small
2. Milestone audit is essential — catches gaps that slip through planning
3. Pure server components where possible — simpler, faster, no hydration issues
