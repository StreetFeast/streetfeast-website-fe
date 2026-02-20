---
status: diagnosed
phase: 03-script-blocking-form-gating
source: [03-01-SUMMARY.md]
started: 2026-02-20T01:00:00Z
updated: 2026-02-20T01:15:00Z
---

## Current Test

[testing complete]

## Tests

### 1. Cookie banner appears on first visit
expected: Open the site in a fresh browser (or clear localStorage). A cookie consent banner should appear at the bottom of the page with "Accept All" and "Reject All" buttons of equal prominence.
result: pass

### 2. No reCAPTCHA scripts before consent
expected: With the cookie banner still showing (no choice made), open DevTools Network tab, navigate to /contact. Filter for "recaptcha" or "gstatic" — no reCAPTCHA scripts should appear in the network requests.
result: pass

### 3. Accept cookies loads reCAPTCHA on contact page
expected: Click "Accept All" on the cookie banner, then navigate to /contact. In DevTools Network tab, you should see reCAPTCHA scripts loading (requests to recaptcha.net or gstatic.com). The contact form should display with all form fields.
result: pass

### 4. Contact form works with consent accepted
expected: With cookies accepted, the contact form on /contact should show all fields (name, email, message). The form should be fully functional — you can type in fields and the submit button is present.
result: issue
reported: "If cookies aren't accepted, the form shows and it can be filled out. It should be blocked until cookies are accepted. When cookies are declined it does block properly and when accepted the form works."
severity: major

### 5. Reject cookies shows email alternative
expected: Clear localStorage and reload. Click "Reject All" on the cookie banner. Navigate to /contact. Instead of the contact form, you should see an email alternative with a "hello@streetfeastapp.com" mailto link and a message about updating cookie preferences.
result: pass

### 6. No reCAPTCHA scripts after rejecting cookies
expected: With cookies rejected, on the /contact page, check DevTools Network tab — no reCAPTCHA or gstatic scripts should appear. No FingerprintJS requests either.
result: pass

### 7. Re-consent button reopens cookie banner
expected: With cookies rejected, on the /contact no-consent alternative page, click the "update your cookie preferences" button. The cookie consent banner should reappear at the bottom of the page, allowing you to change your choice.
result: pass

### 8. Accept after re-consent loads contact form
expected: After clicking "update your cookie preferences" from the no-consent alternative, click "Accept All" on the reappearing banner. The contact page should now show the full contact form with reCAPTCHA loaded.
result: pass

## Summary

total: 8
passed: 7
issues: 1
pending: 0
skipped: 0

## Gaps

- truth: "Contact form should only be accessible after cookies are explicitly accepted — not when consent is undecided (null)"
  status: failed
  reason: "User reported: If cookies aren't accepted, the form shows and it can be filled out. It should be blocked until cookies are accepted. When cookies are declined it does block properly and when accepted the form works."
  severity: major
  test: 4
  root_cause: "ContactForm branching logic at line 124 uses `hasConsented !== false` which treats null (undecided) same as true (accepted). Condition should be `hasConsented === true` to only show form when explicitly accepted."
  artifacts:
    - path: "src/components/ContactForm/ContactForm.tsx"
      issue: "Line 124: `if (!isHydrated || hasConsented !== false)` should be `if (isHydrated && hasConsented === true)`"
  missing:
    - "Change ContactForm branching to show NoConsentAlternative for both null and false states, only showing ContactFormFull when hasConsented === true"
  debug_session: ""
