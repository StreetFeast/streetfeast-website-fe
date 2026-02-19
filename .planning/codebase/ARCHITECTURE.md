# Architecture

**Analysis Date:** 2026-02-19

## Pattern Overview

**Overall:** Next.js App Router with Client Components and Centralized State Management

**Key Characteristics:**
- Frontend-only landing and profile application (no server-side backend code)
- Client components handle most page rendering and interactivity
- Zustand-based global state for authentication and user profile data
- Supabase integration for authentication and user management
- Backend API communication via Axios with automatic token refresh
- CSS Modules for scoped component styling without external UI library

## Layers

**Presentation (UI Components):**
- Purpose: Render user interface and handle user interactions
- Location: `src/components/`
- Contains: React functional components with TypeScript, CSS Module styles
- Depends on: Hooks, Store, Utils, Types
- Used by: Page routes in `src/app/`
- Examples: `FormInput`, `PasswordInput`, `Header`, `Footer`, `ProfileSidebar`

**Page Routes:**
- Purpose: Define Next.js App Router routes and page-level layouts
- Location: `src/app/`
- Contains: File-based routing following Next.js conventions
- Depends on: Presentation components, Hooks, Utils, Store
- Used by: Next.js router
- Key pages: Homepage (`page.tsx`), Truck profiles (`truck/[truckId]/page.tsx`), Auth flows (`register-truck/page.tsx`, `login-truck/page.tsx`), Profile dashboard (`profile/*/page.tsx`)

**State Management:**
- Purpose: Centralize and persist user authentication and profile state
- Location: `src/store/`
- Contains: Zustand stores with localStorage persistence
- Examples:
  - `authStore.ts`: User, tokens, email verification status
  - `profileStore.ts`: User profile data, loading states, errors
- Used by: Hooks, Components, Pages for auth state access

**Custom Hooks:**
- Purpose: Encapsulate stateful logic and side effects
- Location: `src/hooks/`
- Contains: Form state management, authentication guards, data fetching helpers
- Examples:
  - `useRegisterTruckForm`: Handles truck registration form with validation
  - `useRequireAuth`: Guards routes that require authentication
  - `useContactForm`: Manages contact form state
- Used by: Page components for complex interactions

**Business Logic & Utilities:**
- Purpose: Pure functions for validation, formatting, API communication, authentication helpers
- Location: `src/utils/`
- Contains:
  - `api.ts`: API endpoint wrappers
  - `validation.ts`: Password and form validation
  - `auth.ts`: User verification and email status checks
  - `axiosConfig.ts`: HTTP client configuration with interceptors
  - `tokenRefresh.ts`: Token refresh logic
- Used by: Hooks, Components, Store

**External Services:**
- Purpose: Configure third-party library connections
- Location: `src/lib/`
- Contains: Supabase client initialization
- Example: `supabase.ts` - Creates and exports configured Supabase client

**Types:**
- Purpose: TypeScript type definitions for API responses and domain models
- Location: `src/types/`
- Contains:
  - `api.ts`: Response types from backend (User, Truck, TruckOccurrence, etc.)
  - `zipcodes.d.ts`: Type definitions for zipcodes library

**Constants:**
- Purpose: Shared constants across application
- Location: `src/constants/`
- Contains: Color definitions, tutorial data

## Data Flow

**Authentication Flow:**

1. User registers/logs in on `/register-truck` or `/login-truck`
2. Custom hook (`useRegisterTruckForm`) collects and validates form data
3. Hook calls Supabase Auth via `supabase.auth.signUp()` or `signIn()`
4. On success, `authStore.setAuth()` updates global state with user and tokens
5. State is persisted to localStorage via Zustand persist middleware
6. Auth token is automatically included in all API requests via Axios interceptor
7. Token expiration triggers automatic refresh via `tokenRefresh.ts`

**Truck Profile Display Flow:**

1. User navigates to `/truck/[truckId]` page (dynamic route)
2. Page component resolves dynamic params
3. `useEffect` calls `getTruckDetails()` and `getTruckOccurrences()` from `src/utils/api.ts`
4. Axios client includes auth token automatically via interceptor
5. Data is stored in component-local state
6. Components render schedule cards, menu items, map with fetched data
7. User interactions (date selection, tab switching) update local state

**Form Submission Flow:**

1. Custom hook manages form state (data, validation errors, loading)
2. `onChange` handler validates incrementally as user types
3. `onBlur` handler re-validates critical fields (passwords)
4. `isFormValid()` gates submit button availability
5. `handleSubmit()` calls external API (Supabase or backend)
6. On success: redirect or update store; on error: display error message

**State Management:**
- Authentication state persisted in `authStore` with localStorage
- Profile data cached in `profileStore` with Zustand
- Form data typically local to component/hook to avoid global bloat
- Page-level state (tabs, selections) lives in component state

## Key Abstractions

**FormInput Component:**
- Purpose: Reusable controlled text input with validation display
- Location: `src/components/FormInput/FormInput.tsx`
- Pattern: Presentational component - receives data via props, emits via onChange callback
- Used by: Registration and login forms

**PasswordInput Component:**
- Purpose: Specialized input for passwords with strength requirements display
- Location: `src/components/PasswordInput/`
- Pattern: Similar to FormInput but with password-specific features
- Used by: Truck registration, password reset flows

**Custom Form Hooks:**
- Purpose: Encapsulate complex form logic (validation, submission, state management)
- Examples: `useRegisterTruckForm`, `useContactForm`
- Pattern: Returns object with state (formData, errors) and handlers (handleChange, handleSubmit)
- Benefit: Separates form logic from presentation, enables reuse and testing

**API Layer (`src/utils/api.ts`):**
- Purpose: Single point for backend communication
- Pattern: Wraps Axios client with typed endpoints
- Automatically includes auth token (via interceptor)
- Handles token refresh transparently
- Returns strongly typed responses

**Zustand Stores:**
- Purpose: Centralized, persistent global state
- Pattern: Single store per domain (auth, profile)
- Includes loading/error states alongside data
- Persisted to localStorage for session continuity

## Entry Points

**Root Layout (`src/app/layout.tsx`):**
- Location: `src/app/layout.tsx`
- Triggers: Application startup
- Responsibilities:
  - Sets global metadata (title, description, OG tags)
  - Configures Google Fonts (Lexend)
  - Wraps app with Providers (GoogleReCaptcha, Toastify)
  - Renders LayoutContent for pre-launch gate
  - Sets up HTML structure

**Homepage (`src/app/page.tsx`):**
- Location: `src/app/page.tsx`
- Triggers: Navigation to `/`
- Responsibilities: Displays landing page with Header, HeroHeader, Footer

**Truck Registration (`src/app/register-truck/page.tsx`):**
- Location: `src/app/register-truck/page.tsx`
- Triggers: User click "Register Truck" or direct navigation
- Responsibilities:
  - Uses `useRegisterTruckForm` hook for state/validation
  - Renders multi-field form with live validation
  - Submits to Supabase Auth with truck metadata
  - Redirects to email verification on success

**Truck Profile (`src/app/truck/[truckId]/page.tsx`):**
- Location: `src/app/truck/[truckId]/page.tsx`
- Triggers: User navigates to truck detail page
- Responsibilities:
  - Fetches truck details and 30-day schedule
  - Displays truck info, hours, contact, menu
  - Interactive tabs (schedules, menu) with local state
  - Shows truck status (Open/Closed/Opening Soon)
  - Embeds Google Map with location

**Verify Email (`src/app/verify/page.tsx`):**
- Location: `src/app/verify/page.tsx`
- Triggers: After signup or manual email verification
- Responsibilities: Handles email verification flow

**Profile Dashboard (`src/app/profile/*/page.tsx`):**
- Location: `src/app/profile/` (multiple sub-routes)
- Triggers: Authenticated user navigation
- Responsibilities: User account management, subscription, settings
- Protected by: `useRequireAuth` hook (redirects if not authenticated)

## Error Handling

**Strategy:** Try-catch in async operations, state-based error display in UI, user-friendly error messages

**Patterns:**

**API Errors:**
```typescript
// In useRegisterTruckForm and similar hooks
const [error, setError] = useState("");
try {
  const { data, error: supabaseError } = await supabase.auth.signUp(...);
  if (supabaseError) {
    setError(supabaseError.message);
    return;
  }
} catch (err) {
  setError("An unexpected error occurred. Please try again.");
}
```

**Validation Errors:**
- Field-level errors stored in component state (e.g., `FormErrors` interface)
- Displayed below input via FormInput component
- Example: `useRegisterTruckForm` tracks phone, zipCode, password validation

**Route Protection:**
```typescript
// useRequireAuth hook
useEffect(() => {
  if (!user || !accessToken) {
    router.push(redirectTo); // Redirect to login
  }
  if (requireEmailVerified && !isEmailVerified(user)) {
    router.push('/verify'); // Require email verification
  }
}, [user, accessToken, isHydrated]);
```

**Network Error Fallback:**
- Pages display error UI (e.g., "Failed to load truck information")
- Modal prompts user to download app for core functionality

## Cross-Cutting Concerns

**Logging:**
- No structured logging library; uses `console.error()` for debugging
- Example: `console.error('Error fetching truck data:', err)` in truck profile page

**Validation:**
- Centralized in `src/utils/validation.ts`
- Example: `validatePassword()` checks length, uppercase, lowercase, special char, number
- Form hooks call validators on input change and blur

**Authentication:**
- Supabase Auth for user identity
- JWT tokens (access + refresh) stored in Zustand with localStorage
- Axios interceptor automatically includes token in all requests
- Expired tokens refreshed automatically via interceptor

**CORS & API:**
- Backend API at `https://api.streetfeastapp.com` (inferred from env config)
- Axios client created in `src/utils/axiosConfig.ts`
- All requests go through apiClient with interceptors

**Styling:**
- CSS Modules scoped to component folder
- Pattern: `ComponentName/ComponentName.module.css`
- Imported as `import styles from "./ComponentName.module.css"`
- Accessed via `styles.className`
- Global styles in `src/app/globals.css`

**Third-Party Integrations:**
- **GoogleReCaptcha**: Wrapped in Providers component, environment-gated
- **Toastify**: Toast notifications for user feedback (configured in Providers)
- **Google Maps**: Embedded in truck profile pages
- **Fingerprint JS**: Device fingerprinting (imported but usage not visible in sample)

---

*Architecture analysis: 2026-02-19*
