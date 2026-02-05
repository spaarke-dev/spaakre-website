# Task 001: Scaffold Next.js Project

**Phase:** 0 - Scaffold and Shell
**Status:** not-started
**Estimated:** 2 hours
**Dependencies:** none
**Tags:** nextjs, typescript, tailwind, config

## Goal

A working Next.js project with TypeScript, Tailwind CSS, and ESLint configured. The app runs locally with `npm run dev`.

## Context

This is the foundation task. Every subsequent task depends on a properly scaffolded project. We need Next.js App Router with TypeScript, Tailwind CSS for styling, and a clean project structure matching the spec.

## Steps

1. Initialize Next.js project with TypeScript and App Router (`npx create-next-app@latest`)
2. Verify Tailwind CSS is included (create-next-app offers this option)
3. Set up the folder structure from spec.md:
   - `/app` - pages and routing
   - `/src/components` - React components
   - `/src/lib` - utility functions
   - `/src/styles` - global styles
   - `/content/blog` - MDX content (create directory)
   - `/public/images` - static images
   - `/public/video` - video poster images
4. Create `.env.local.example` with all env vars from spec (no real values)
5. Add `staticwebapp.config.json` skeleton for Azure SWA
6. Verify `npm run dev`, `npm run build`, and `npm run lint` all work
7. Update TASK-INDEX.md: mark this task complete

## Expected Outputs

- `package.json` - with Next.js, TypeScript, Tailwind dependencies
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind configuration
- `app/layout.tsx` - root layout (minimal)
- `app/page.tsx` - homepage (placeholder)
- `.env.local.example` - environment variable template
- `staticwebapp.config.json` - Azure SWA config skeleton
- `/content/blog/` - empty directory for MDX content
- `/src/components/` - empty directory for components
- `/src/lib/` - empty directory for utilities

## Acceptance Criteria

- [ ] `npm run dev` starts the dev server without errors
- [ ] `npm run build` completes without errors
- [ ] `npm run lint` passes
- [ ] TypeScript compilation succeeds
- [ ] Tailwind CSS is functional (utility classes work)
- [ ] Folder structure matches spec.md

## Notes

- Use the latest stable Next.js version (15.x as of Feb 2026)
- Choose App Router (not Pages Router) when prompted by create-next-app
- The root of the Next.js project should be the repo root (not a subdirectory)
