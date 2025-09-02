# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is the StreetFeast website frontend - a Next.js landing page for a mobile app that helps users discover street food vendors, food trucks, and pop-up restaurants.

## Commands

### Development
- `npm run dev` - Start development server with Turbopack on port 3000
- `npm run build` - Build production bundle
- `npm run lint` - Run ESLint checks
- `npm run start` - Start production server

### Task Completion Checklist
Always run these commands after making changes:
1. `npm run lint` - Fix any ESLint errors
2. `npm run build` - Ensure production build succeeds

## Architecture

### Tech Stack
- Next.js 15.5.2 with App Router and Turbopack
- TypeScript with strict mode
- CSS Modules for styling
- No external UI libraries

### Project Structure
- `/src/app/` - Next.js App Router pages using file-based routing
- `/src/components/` - React components with corresponding .module.css files
- `/src/constants/` - Shared constants like colors
- Path alias: `@/*` maps to `./src/*`

### Code Conventions
- Components: Functional with default exports, PascalCase naming
- Styling: CSS Modules imported as `styles`, accessed via `styles.className`
- Client components: Mark with "use client" when using browser APIs or state
- Forms: Use React hooks (useState) for form handling