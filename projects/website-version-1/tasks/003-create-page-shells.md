# Task 003: Create Page Shells

**Phase:** 0 - Scaffold and Shell
**Status:** done
**Estimated:** 1.5 hours
**Dependencies:** 002
**Tags:** nextjs, react, tailwind

## Goal

All routes from the spec have placeholder pages with basic content and correct metadata.

## Context

With the layout in place, we need page shells for every route so we can build features into them in later phases. Each page should have proper metadata for SEO even at the placeholder stage.

## Steps

1. Update `app/page.tsx` (Homepage) - placeholder hero text, "Coming soon" sections
2. Create `app/blog/page.tsx` - "Blog coming soon" placeholder
3. Create `app/blog/[slug]/page.tsx` - placeholder for dynamic blog posts
4. Update `app/contact/page.tsx` - "Contact form coming soon" placeholder
5. Create `app/privacy/page.tsx` - "Privacy Policy" placeholder
6. Create `app/terms/page.tsx` - "Terms of Service" placeholder
7. Add basic metadata exports to each page (title, description)
8. Create `app/robots.ts` - robots.txt generation
9. Create `app/sitemap.ts` - sitemap.xml skeleton (static pages only for now)
10. Verify all routes are accessible and render without errors
11. Update TASK-INDEX.md: mark this task complete

## Expected Outputs

- `app/page.tsx` (updated)
- `app/blog/page.tsx`
- `app/blog/[slug]/page.tsx`
- `app/contact/page.tsx`
- `app/privacy/page.tsx`
- `app/terms/page.tsx`
- `app/robots.ts`
- `app/sitemap.ts`

## Acceptance Criteria

- [x] All 6 routes render without errors
- [x] Each page has a unique `<title>` and `<meta description>`
- [x] `/robots.txt` returns valid robots file
- [x] `/sitemap.xml` returns valid XML with all static page URLs
- [x] Navigation links in header correctly link to each page

## Notes

- Keep placeholder content minimal but informative
- Metadata helper utilities can be created in `src/lib/seo.ts` if useful
