# Task 002: Implement Site Layout

**Phase:** 0 - Scaffold and Shell
**Status:** done
**Estimated:** 3 hours
**Dependencies:** 001
**Tags:** nextjs, react, tailwind, responsive, ui

## Goal

Responsive site layout with header (navigation + CTA), footer (links + social), and a reusable container component. Works on mobile (320px+) and desktop.

## Context

The layout wraps all pages and provides consistent navigation and branding. The header needs a mobile hamburger menu pattern. The footer includes links to Privacy, Terms, contact email, and social media placeholders.

## Steps

1. Create `src/components/SiteHeader.tsx`:
   - Logo/brand name linking to `/`
   - Navigation links: Home, Blog, Contact
   - Primary CTA button ("Contact" or "Get in Touch") linking to `/contact`
   - Mobile hamburger menu (collapse/expand on small screens)
2. Create `src/components/SiteFooter.tsx`:
   - Links: Privacy (`/privacy`), Terms (`/terms`)
   - Contact email (placeholder)
   - Social media links (placeholder URLs)
   - Copyright notice
3. Create `src/components/Container.tsx`:
   - Max-width wrapper with responsive padding
4. Update `app/layout.tsx` to include SiteHeader, SiteFooter, and wrap children in Container
5. Add basic Tailwind theme customizations if needed (colors, fonts) in `tailwind.config.ts`
6. Test responsive behavior: mobile (320px), tablet (768px), desktop (1280px)
7. Verify keyboard navigation and focus states on all interactive elements
8. Update TASK-INDEX.md: mark this task complete

## Expected Outputs

- `src/components/SiteHeader.tsx`
- `src/components/SiteFooter.tsx`
- `src/components/Container.tsx`
- Updated `app/layout.tsx`

## Acceptance Criteria

- [x] Header renders with nav links and CTA on all pages
- [x] Footer renders with links on all pages
- [x] Mobile hamburger menu works (toggle open/close)
- [x] Layout is responsive from 320px to 1920px+
- [x] Keyboard navigation works on all header/footer links
- [x] Focus states are visible on interactive elements

## Notes

- Use placeholder text for logo/brand until brand assets are available
- Social links can use `#` as href for now
- Keep the design clean and minimal per spec UX requirements
