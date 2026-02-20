# Testing Patterns

**Analysis Date:** 2026-02-19

## Test Framework

**Runner:** Not detected

**Status:** No test framework (Jest, Vitest, or other) is configured in this project.

**Why No Testing:**
The codebase uses:
- TypeScript for compile-time type safety
- ESLint for code quality
- React hooks for encapsulated logic
- Zustand for predictable state management
- No automated test runner in package.json

This is a small frontend codebase focused on landing pages and forms, where testing infrastructure is not currently prioritized.

**Run Commands:**
```bash
npm run lint              # Check ESLint violations only
npm run build             # Build without tests
npm run dev               # Start development server
```

## Test File Organization

**No test files exist.** If testing were to be added:

**Expected Location Pattern:**
- Colocate with components: `src/components/FormInput/__tests__/FormInput.test.tsx`
- Or separate directory: `src/__tests__/components/FormInput.test.tsx`
- Hook tests: `src/__tests__/hooks/useRegisterTruckForm.test.ts`
- Utility tests: `src/__tests__/utils/validation.test.ts`

**Naming:**
- `*.test.ts` for utility tests
- `*.test.tsx` for component tests
- `*.spec.ts` or `*.spec.tsx` as alternative

## What Should Be Tested

Based on code review, these areas have testable logic:

### 1. Validation Utilities (`src/utils/validation.ts`)

**Critical:** Password validation has strict requirements:
```typescript
export const validatePassword = (password: string): string => {
  if (password.length < 10) {
    return "Password must be at least 10 characters long";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter";
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return "Password must contain at least one special character";
  }
  if (!/\d/.test(password)) {
    return "Password must contain at least one number";
  }
  return "";
};
```

**Test Scenarios:**
- Valid password: `TestPassword123!` → ""
- Too short: `Abc1!` → error message
- No uppercase: `testpassword123!` → error message
- No lowercase: `TESTPASSWORD123!` → error message
- No special character: `TestPassword123` → error message
- No number: `TestPassword!` → error message
- Empty string: "" → error message

**Auth utilities** (`src/utils/auth.ts`):
- `isEmailVerified(user)` with null, undefined, and verified/unverified users
- `getUserEmail(user)` with various user objects

### 2. Custom Hooks

**Form Hooks** - Complex state and validation logic:

`src/hooks/useRegisterTruckForm.ts`:
- Form field validation (phone, zipcode, password)
- Form field preprocessing (phone formatting, zipcode filtering)
- Password matching validation
- Form validation state management
- Error clearing on user input
- Form submission with Supabase auth

`src/hooks/useContactForm.ts`:
- Form data state management
- Status state transitions (idle → loading → success/error)
- Form field changes
- reCAPTCHA integration
- Fingerprinting integration
- Error handling and timeout management

`src/hooks/useRequireAuth.ts`:
- Authentication state checking
- Email verification requirement
- Redirect logic
- Hydration state management

**Test Scenarios:**
- Initial state
- Field changes and validations
- Error state transitions
- Form submission
- Loading states
- Error recovery

### 3. State Management (`src/store/`)

`src/store/authStore.ts` (Zustand):
- State initialization
- Setting auth with user, access token, refresh token
- Clearing auth
- Email verification flag derivation
- Hydration state tracking
- Persistence behavior

`src/store/profileStore.ts` (Zustand):
- Setting profile data
- Setting/clearing loading state
- Error state management
- Profile clearing

**Test Scenarios:**
- Initial state
- State mutations
- Hydration
- Persistence (if enabled)
- Concurrent updates

### 4. API Client (`src/utils/axiosConfig.ts`)

**Token Refresh Interceptor:**
- Request interceptor adds Authorization header
- Response interceptor handles 401 responses
- Token refresh flow with subscriber pattern
- Retry mechanism for original request
- Multiple simultaneous requests during refresh

**Test Scenarios:**
- Successful request with valid token
- Failed request with expired token
- Token refresh success and retry
- Token refresh failure and redirect
- Multiple simultaneous 401 responses
- Non-401 errors pass through

### 5. Components

**Form Components** - Input handling and validation display:

`src/components/FormInput/FormInput.tsx`:
- Renders label, input, error message
- Error styling applied when error prop present
- onChange and onBlur handlers
- Disabled state
- Required indicator

`src/components/PasswordInput/PasswordInput.tsx`:
- Password visibility toggle
- Shows/hides requirements text
- Error display
- Eye icon toggle
- Type switching between text and password

**Header Component** (`src/components/Header/Header.tsx`):
- Mobile menu open/close toggle
- Menu items rendered based on auth state
- Close menu on navigation
- Skip link accessibility

**Test Scenarios:**
- Rendering with/without errors
- User interactions (typing, focus, blur)
- Disabled state
- Accessibility attributes
- Conditional rendering based on props
- Event handlers called correctly

## Testing Recommendations

**If testing were to be implemented, use:**
- **Test Runner:** Vitest (fastest for Next.js, better than Jest for modern projects)
- **Testing Library:** React Testing Library for component tests
- **Assertion Library:** Vitest built-in or Chai
- **Mocking:** Vitest mocks, or MSW for API mocking

**Sample Setup:**

```json
{
  "devDependencies": {
    "vitest": "^1.0.0",
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.0.0",
    "@vitest/ui": "^1.0.0"
  },
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

**vitest.config.ts:**
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/test/']
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
```

## Manual Testing Checklist

Since automated tests are not present, manual testing areas:

**Form Validation:**
- Register truck form with invalid inputs (phone, zipcode, password)
- Password must meet all 5 requirements
- Form submission with valid data
- Error messages clear when user corrects input
- Form fields disabled during submission

**Authentication:**
- Login and registration flow
- Email verification required
- Token refresh on expired session
- Logout clears auth state
- Protected routes redirect to login

**Contact Form:**
- Submitting valid contact message
- reCAPTCHA validation
- Honeypot field blocks submission
- Success/error messaging
- Form disabled during submission

**Responsive Design:**
- Desktop and mobile navigation
- Mobile menu opens/closes
- Form layout on various screen sizes
- Image loading and optimization

## Coverage Goals

**No automated coverage tracking** currently. If implementing:
- Aim for 80%+ coverage on utilities and hooks
- Aim for 60%+ coverage on components (UI interactions harder to test)
- 100% coverage on validation logic (business critical)
- 100% coverage on auth logic (security critical)

---

*Testing analysis: 2026-02-19*
