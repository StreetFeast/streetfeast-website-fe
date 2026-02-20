# Coding Conventions

**Analysis Date:** 2026-02-19

## Naming Patterns

**Files:**
- Components: PascalCase with .tsx extension (e.g., `FormInput.tsx`, `Header.tsx`)
- Hooks: camelCase with use prefix (e.g., `useRegisterTruckForm.ts`, `useContactForm.ts`)
- Utilities: camelCase with descriptive names (e.g., `validation.ts`, `api.ts`, `axiosConfig.ts`)
- Styles: Component name + `.module.css` (e.g., `FormInput.module.css`)
- Pages: lowercase with hyphens for multi-word routes (e.g., `register-truck/page.tsx`, `forgot-password/page.tsx`)
- Types: PascalCase with Suffix pattern (e.g., `UserResponse`, `TruckDetailResponse`, `FormData`)

**Functions:**
- camelCase for all functions
- Prefix `use` for React hooks
- Prefix `get` for query/fetch functions (e.g., `getUserProfile`, `getTruckDetails`)
- Prefix `validate` for validation functions (e.g., `validatePassword`)
- Prefix `is` or `has` for boolean-returning functions (e.g., `isEmailVerified`, `isFormValid`)
- Handler functions: `handle` + action (e.g., `handleChange`, `handleSubmit`, `handleBlur`)
- Event handlers attached to JSX: `onClick={handleClick}`, `onChange={handleChange}`

**Variables:**
- camelCase for all variables and constants
- Boolean variables: prefix with `is`, `has`, `can`, or `should` (e.g., `isLoading`, `isFormValid`, `isHydrated`)
- State variables: descriptive camelCase (e.g., `formData`, `errors`, `status`)
- Private/module-level constants: UPPERCASE with underscores (e.g., `API_BASE_URL`)

**Types:**
- Interfaces: PascalCase with optional Interface suffix (e.g., `FormInputProps`, `AuthState`, `RegisterTruckFormData`)
- Type unions: PascalCase (e.g., `FormStatus` = `'idle' | 'loading' | 'success' | 'error'`)
- Metadata response types: PascalCase with Suffix (e.g., `UserProfileMetadataSupabaseResponse`)
- Enums: PascalCase (rarely used, prefer union types)

## Code Style

**Formatting:**
- ESLint 9 with Next.js and TypeScript configuration
- Configured via `eslint.config.mjs`
- Run `npm run lint` to check
- No automatic formatter configured (relies on ESLint)

**Linting:**
- Tool: ESLint 9
- Config: `eslint.config.mjs` using flat config format
- Rules extend: `next/core-web-vitals` and `next/typescript`
- Ignored directories: `node_modules/`, `.next/`, `out/`, `build/`
- Strict TypeScript mode enabled in `tsconfig.json`

**TypeScript:**
- Strict mode enabled: `"strict": true`
- Target: ES2017
- Module resolution: bundler
- Path alias configured: `@/*` maps to `./src/*`

## Import Organization

**Order:**
1. React and Next.js imports (e.g., `import { useState } from 'react'`, `import Link from 'next/link'`)
2. Third-party imports (e.g., `import axios from 'axios'`, `import { create } from 'zustand'`)
3. Internal imports using path alias (e.g., `import { FormInput } from '@/components/FormInput'`)
4. Relative imports for style sheets (e.g., `import styles from './FormInput.module.css'`)

Example from `src/app/register-truck/page.tsx`:
```typescript
'use client';

import Image from "next/image";
import { useRegisterTruckForm } from "@/hooks/useRegisterTruckForm";
import { FormInput } from "@/components/FormInput";
import { PasswordInput } from "@/components/PasswordInput";
import styles from "./page.module.css";
```

**Path Aliases:**
- Use `@/` for all internal imports (configured in `tsconfig.json`)
- Never use relative paths like `../../../`
- Import pattern: `@/components`, `@/hooks`, `@/utils`, `@/store`, `@/lib`, `@/types`

## Error Handling

**Patterns:**
- Form validation errors: Store in component state as `errors` object mapping field names to error strings
- API errors: Catch try-catch blocks and set error state for display to user
- Token refresh: Axios interceptor handles 401 responses automatically via `refreshAccessToken()`
- Silent error recovery: Use fallbacks where appropriate (e.g., `process.env.NEXT_PUBLIC_DOMAIN || 'https://streetfeastapp.com'`)

Example from `src/hooks/useRegisterTruckForm.ts`:
```typescript
try {
  const { data: supabaseData, error: supabaseError } = await supabase.auth.signUp({...});

  if (supabaseError) {
    setError(supabaseError.message);
    setIsLoading(false);
    return;
  }

  if (!supabaseData.user) {
    setError("Failed to create user account");
    setIsLoading(false);
    return;
  }
} catch {
  setError("An unexpected error occurred. Please try again.");
  setIsLoading(false);
}
```

## Logging

**Framework:** `console` object (no external logging library)

**Patterns:**
- Use `console.error()` for error conditions (e.g., `console.error('Error submitting form:', error)`)
- Use `console.log()` sparingly for debugging
- Avoid logging in production unless necessary
- Include context in error logs: `console.error('Component name - specific error:', error)`

Example from `src/hooks/useContactForm.ts`:
```typescript
if (!executeRecaptcha) {
  console.error('reCAPTCHA not available');
  setStatus('error');
  return;
}
```

## Comments

**When to Comment:**
- Complex business logic or validation rules
- Non-obvious algorithm implementations
- Integration details (e.g., how Supabase auth works)
- Security-related decisions
- Workarounds or temporary solutions

**JSDoc/TSDoc:**
- Use for public utility functions and hooks
- Document parameters with `@param` tags
- Document return values
- Include usage context

Example from `src/utils/api.ts`:
```typescript
/**
 * Fetches the user profile from the backend API
 * The access token is automatically included via axios interceptor
 * If the token is expired, it will be automatically refreshed
 */
export const getUserProfile = async (): Promise<UserResponse> => {
  const response = await apiClient.get<UserResponse>('/api/v1/User/Profile');
  return response.data;
};
```

## Function Design

**Size:**
- Keep functions small and focused (under 50 lines preferred)
- Complex form handlers may exceed this for readability (see `useRegisterTruckForm.ts`)
- Break down large functions into smaller helper functions

**Parameters:**
- Use destructuring for object parameters
- Prefer options object for multiple optional parameters
- Type all parameters explicitly with TypeScript

Example from `src/hooks/useRequireAuth.ts`:
```typescript
interface UseRequireAuthOptions {
  requireEmailVerified?: boolean;
  redirectTo?: string;
}

export const useRequireAuth = (options: UseRequireAuthOptions = {}) => {
  const {
    requireEmailVerified = true,
    redirectTo = '/login-truck',
  } = options;
```

**Return Values:**
- Return typed objects from hooks and utilities
- Use object destructuring in component usage
- Avoid returning null without documentation (prefer returning empty objects or false for booleans)

Example from `src/hooks/useContactForm.ts`:
```typescript
return {
  formData,
  status,
  handleChange,
  handleSubmit
};
```

## Module Design

**Exports:**
- Use default exports for page components and full-page layouts
- Use named exports for reusable components, hooks, and utilities
- Each component folder has an `index.ts` that exports the main component

Example structure from `src/components/FormInput/`:
```
FormInput/
├── FormInput.tsx       // export const FormInput: React.FC<FormInputProps>
├── FormInput.module.css
└── index.ts            // export { FormInput }
```

**Barrel Files:**
- Use `index.ts` files in component and hook directories for clean imports
- Example: `import { FormInput } from '@/components/FormInput'` instead of `@/components/FormInput/FormInput`

Example from `src/components/FormInput/index.ts`:
```typescript
export { FormInput } from './FormInput';
```

## Client vs Server Components

**Client Components:**
- Mark with `'use client'` when using React hooks or browser APIs
- Page components are server components by default
- Example: `src/components/ContactForm/ContactForm.tsx` uses `'use client'` because it uses hooks

**Server Components:**
- Default in Next.js App Router
- Used for metadata, page layouts, and rendering static content
- Example: `src/app/layout.tsx` is a server component

## Styling Conventions

**CSS Modules:**
- Import as `import styles from './ComponentName.module.css'`
- Access classes via `styles.className`
- Use kebab-case for class names in CSS files

Example from `src/components/FormInput/FormInput.tsx`:
```typescript
import styles from "./FormInput.module.css";

// Usage
<div className={styles.formGroup}>
  <label htmlFor={id} className={styles.label}>
```

**Global CSS:**
- Use `src/app/globals.css` for global styles
- Google font imported in layout via `next/font/google`

**Responsive Design:**
- No explicit breakpoint system configured
- Use CSS media queries directly in module.css files
- Mobile-first approach

---

*Convention analysis: 2026-02-19*
