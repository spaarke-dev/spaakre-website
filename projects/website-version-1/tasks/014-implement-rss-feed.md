# Task 014: Implement RSS Feed

**Phase:** 1 - Blog System
**Status:** not-started
**Estimated:** 1.5 hours
**Dependencies:** 010
**Tags:** blog, rss, seo, nextjs

## Goal

RSS feed at `/blog/rss.xml` that includes all published blog posts.

## Context

RSS enables readers and aggregators to subscribe to the blog. The feed should include all published posts with title, description, date, author, and link.

## Steps

1. Create RSS feed generation at `app/blog/rss.xml/route.ts` (Next.js Route Handler)
2. Fetch all posts using `getAllPosts()`
3. Generate valid RSS 2.0 XML with:
   - Channel: title, description, link, language
   - Items: title, description, pubDate, author, link, guid
4. Set correct `Content-Type: application/rss+xml` header
5. Test feed output in browser
6. Validate RSS with an online validator or XML parser
7. Add RSS `<link>` tag to site `<head>` (autodiscovery) in `app/layout.tsx`
8. Update TASK-INDEX.md: mark this task complete

## Expected Outputs

- `app/blog/rss.xml/route.ts`
- Updated `app/layout.tsx` (RSS autodiscovery link)

## Acceptance Criteria

- [ ] `/blog/rss.xml` returns valid RSS 2.0 XML
- [ ] Feed includes all published posts (excludes drafts)
- [ ] Each item has title, description, pubDate, link
- [ ] Content-Type header is `application/rss+xml`
- [ ] RSS autodiscovery `<link>` tag is in the site `<head>`

## Notes

- Can use a library like `rss` or build XML manually (it's simple enough)
- Ensure dates are in RFC 822 format for RSS
