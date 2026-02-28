---
phase: quick-2
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/app/privacy/page.tsx
  - src/app/privacy/page.module.css
autonomous: true
requirements: [QUICK-2]

must_haves:
  truths:
    - "Privacy policy page content matches the Final txt file exactly"
    - "All 21 sections are present with correct numbering (1-21)"
    - "Section 14 contains all 22 state-specific privacy rights subsections (14.1-14.22)"
    - "Section 6.2 Data Processing Inventory lists all 14 service providers with nested details"
    - "Section 10 has both 10.1 Overview and 10.2 Cookies Policy subsections"
    - "All external links are clickable and open in new tabs"
    - "Page builds without errors and passes lint"
  artifacts:
    - path: "src/app/privacy/page.tsx"
      provides: "Complete privacy policy page matching Final txt"
      contains: "Section 21"
    - path: "src/app/privacy/page.module.css"
      provides: "Styles including nested data processing inventory layout"
      contains: "dataProcessingEntry"
  key_links:
    - from: "src/app/privacy/page.tsx"
      to: "src/app/privacy/page.module.css"
      via: "CSS Module import"
      pattern: "styles\\."
---

<objective>
Rewrite the privacy policy page to match the final legal document exactly.

Purpose: The current privacy policy page (19 sections) is outdated. The finalized legal document has 21 sections with significantly expanded content including: a data processing inventory (section 6.2) with 14 service providers, state-specific privacy rights for 22 US states/jurisdictions (section 14), new sections for Terms of Service (17) and Waiver (20), expanded cookies policy (10.2), and numerous wording changes throughout every section.

Output: Updated `src/app/privacy/page.tsx` and `src/app/privacy/page.module.css` with content matching the Final txt file exactly.
</objective>

<execution_context>
@/Users/jacobfinn/.claude/get-shit-done/workflows/execute-plan.md
@/Users/jacobfinn/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@src/app/privacy/page.tsx
@src/app/privacy/page.module.css
@src/app/privacy/Privacy Policy - StreetFeastapp - Final.txt
</context>

<tasks>

<task type="auto">
  <name>Task 1: Rewrite privacy policy page.tsx to match Final txt exactly</name>
  <files>src/app/privacy/page.tsx, src/app/privacy/page.module.css</files>
  <action>
Completely rewrite `src/app/privacy/page.tsx` to render the content from `src/app/privacy/Privacy Policy - StreetFeastapp - Final.txt` EXACTLY. Read the txt file thoroughly as the source of truth.

CRITICAL CONTENT DIFFERENCES from current page (non-exhaustive -- the executor MUST read the full txt file):

**Section structure (21 sections, not 19):**
1. Introduction (expanded -- adds binding agreement paragraph, entity representation paragraph)
2. Definitions (minor wording changes -- "including but not limited to")
3. Information We Collect (expanded -- adds "Information You Provide" bullet, "OTP code", "encrypted" not "hashed", "photographs, images", "payment data", Device Info adds "platform, App version, system timezone, firebase installation ID, Android ID", third-party adds "and/or Apple Maps Platform")
4. Legal Bases for Processing (minor wording: "including but not limited to")
5. How We Use Your Information (5.1 is "Services Provision" not "Service Provision", minor wording throughout, Apple Maps added)
6. How We Share Your Information (MAJOR: adds section 6.2 "Data Processing Inventory" with detailed entries for 14 services: Supabase, Sentry, PostHog, Firebase Cloud Messaging, Apple StoreKit, Google Play Billing, RevenueCat, Twilio, Resend, Google Maps Platform, Mapbox, Azure Blob Storage, Expo Services. Each has: Service Category, Purpose, Data Actively Sent, Data Auto-Collected, Categories of Data Subjects, Data Storage Location, Retention Period, Sub-Processors, Notes. Section numbering shifts: old 6.2->6.3 Vendors, old 6.3->6.4, old 6.4->6.5, old 6.5->6.6, old 6.6->6.7. Google reCAPTCHA no longer says "StreetFeast is the data controller". Apple Maps Platform added.)
7. Data Retention (minor: "including but not limited to")
8. Data Security (adds "organizational", "PERFECT OR IMPENETRABLE", "PROMISE OR GUARANTEE", "YOU SHOULD ONLY ACCESS THE SERVICES WITHIN A SECURE ENVIRONMENT", "IMMEDIATELY NOTIFY US IMMEDIATELY" -- keep as-is from source)
9. Your Rights and Choices (9.1 references "Section 21" not "Section 16". 9.3 references "Section 21". 9.9 expanded with fee language, authorized agent paragraph, jurisdictions reference to Section 14)
10. Cookies Policy, Local Storage, and Tracking Technologies (EXPANDED: adds 10.1 Overview and 10.2 Cookies Policy subsections with cookie types: Strictly Necessary, Performance, Functional, Unclassified. Adds allaboutcookies.org and aboutads.info links)
11. Third-Party Analytics (expanded: Google services paragraph reworded to include Apple Maps and Google Terms of Service link)
12. Children's Privacy (adds "solicit Personal Information from or market to", "age of thirteen (13)" repeated, "deactivate the account and" before delete)
13. Geographic Scope (expanded: "United States of America" not "United States", adds "no representation" paragraph, adds "compliance with applicable local laws" sentence)
14. State Specific Privacy Rights (COMPLETELY REWRITTEN: was "California Privacy Rights (CCPA/CPRA)" with subsections 14.1-14.8. Now has 22 state subsections: 14.1 California, 14.2 Colorado, 14.3 Connecticut, 14.4 Delaware, 14.5 Florida, 14.6 Indiana, 14.7 Iowa, 14.8 Kentucky, 14.9 Maryland, 14.10 Minnesota, 14.11 Montana, 14.12 Nebraska, 14.13 Nevada, 14.14 New Hampshire, 14.15 New Jersey, 14.16 Oregon, 14.17 Rhode Island, 14.18 Tennessee, 14.19 Texas, 14.20 Utah, 14.21 Virginia, 14.22 Other Jurisdictions. California section is expanded with sub-subsections 14.1.1-14.1.8. Other states follow similar pattern with state-specific act names and abbreviations. Each has rights list, no-sell statement, and exercise instructions.)
15. Data Breach Notification (minor: "United States of America")
16. Updates to This Privacy Policy (was section 17, minor: "App and Site" not "App and Website", "immediately discontinue")
17. Terms of Service (NEW SECTION: references ToS, incorporation by reference)
18. Severability (was section 18, minor: "court or arbitrator", "modified and interpreted to accomplish the objectives", "rhe" typo in source -- reproduce exactly)
19. Entire Agreement (was section 19, expanded: adds "policies, or guidelines", "sole and entire", "understandings, representations, warranties, and/or agreements")
20. Waiver (NEW SECTION: no failure/delay waiver, single/partial exercise, writing requirement)
21. Contact Us (was section 16, simplified: removes the "For data protection inquiries" second paragraph)

**Keep existing:** metadata export, Link import, styles import, nav with back link, CSS module import pattern, page.module.css existing styles.

**Add to CSS:** New styles for the Data Processing Inventory (section 6.2) which has deeply nested content. Add a `dataProcessingEntry` class for each service entry and a `dataProcessingDetails` class for the nested bullet details (Service Category, Purpose, Data Actively Sent, etc.). These should render as styled sub-sections with slight indent and visual separation.

**Effective Date:** The txt says "Effective Date: ___________________, 2026" -- use the same placeholder approach but set the date variable to match. Since the current page uses `const lastUpdated = "February 19, 2026"` and the txt has a blank date, keep a reasonable date. Use the current date format but leave it as a fillable value -- set `const lastUpdated = "February 26, 2026"` (today's date per the instructions).

**HTML entity handling:** Use `&ldquo;` and `&rdquo;` for smart quotes, `&apos;` for apostrophes in JSX, just like the current page does.

**Link handling:** All URLs (https://...) should be rendered as `<a>` tags with `target="_blank" rel="noopener noreferrer"`. Email addresses as `mailto:` links. The "Delete My Data" reference should use Next.js `<Link href="/delete-my-data">`. The "Terms of Service" in section 17 should link to `/terms`.

**For Section 6.2 Data Processing Inventory:** Render each service as:
- Service name as a bold heading (h4 or strong)
- Nested details as a definition-list-style layout using paragraphs or a structured div
- Each detail field (Service Category, Purpose, Data Actively Sent, etc.) as strong label + text

**For Section 14 State Privacy Rights:** Each state subsection follows a consistent pattern. Use the same JSX structure for each: h3 for state name, intro paragraph, rights list (ul), no-sell paragraph, exercise paragraph. Virginia (14.21) has extra definitions before the rights list.
  </action>
  <verify>
    <automated>cd /Users/jacobfinn/Desktop/Projects/streetfeast-website-fe && npm run build 2>&1 | tail -5 && npm run lint 2>&1 | tail -5</automated>
    <manual>Visit http://localhost:3000/privacy and verify all 21 sections render, section 6.2 data processing inventory shows all 14 services with nested details, section 14 shows all 22 state privacy rights subsections, all links are clickable</manual>
  </verify>
  <done>Privacy policy page renders all 21 sections matching the Final txt content exactly. Build succeeds. Lint passes. All links work. Section 6.2 shows complete data processing inventory. Section 14 shows all 22 state-specific privacy rights. New sections 17 (Terms of Service) and 20 (Waiver) present.</done>
</task>

</tasks>

<verification>
- `npm run build` completes without errors
- `npm run lint` passes
- All 21 section headings present in correct order
- Section 6.2 Data Processing Inventory lists: Supabase, Sentry, PostHog, Firebase Cloud Messaging, Apple StoreKit, Google Play Billing, RevenueCat, Twilio, Resend, Google Maps Platform, Mapbox, Azure Blob Storage, Expo Services
- Section 14 lists all 22 state subsections (California through Other Jurisdictions)
- Contact section references Section 21
- All external URLs render as clickable links opening in new tabs
</verification>

<success_criteria>
- Privacy policy page content matches `Privacy Policy - StreetFeastapp - Final.txt` exactly
- Page builds and lints cleanly
- All styles render properly including nested data processing inventory
- No broken links or missing sections
</success_criteria>

<output>
After completion, create `.planning/quick/2-update-privacy-policy-page-to-match-fina/2-SUMMARY.md`
</output>
