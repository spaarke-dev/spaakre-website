# Task 015: Integrate Blog Posts into Sitemap

**Phase:** 1 - Blog System
**Status:** not-started
**Estimated:** 1 hour
**Dependencies:** 010, 003
**Tags:** blog, seo, sitemap, nextjs

## Goal

Sitemap at `/sitemap.xml` includes all static pages AND all published blog post URLs with lastmod dates.

## Context

The sitemap skeleton was created in Task 003 with static pages only. Now we need to add all published blog posts dynamically so search engines can discover them.

## Steps

1. Update `app/sitemap.ts`:
   - Keep existing static page entries
   - Call `getAllPosts()` to get all published posts
   - Add each post as a sitemap entry with URL and lastmod (from post date)
   - Set appropriate changefreq and priority values
2. Verify `/sitemap.xml` output includes both static pages and blog posts
3. Validate XML structure
4. Update TASK-INDEX.md: mark this task complete

## Expected Outputs

- Updated `app/sitemap.ts`

## Acceptance Criteria

- [ ] Sitemap includes all static pages (/, /blog, /contact, /privacy, /terms)
- [ ] Sitemap includes all published blog post URLs
- [ ] Each entry has a lastmod date
- [ ] Sitemap XML is valid
- [ ] Draft posts are excluded

## Notes

- Next.js App Router has built-in sitemap support via `sitemap.ts` exports
- Blog posts should have priority lower than the homepage but higher than legal pages
