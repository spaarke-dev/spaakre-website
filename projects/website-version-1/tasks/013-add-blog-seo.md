# Task 013: Add Blog SEO (OpenGraph, Twitter Cards, JSON-LD)

**Phase:** 1 - Blog System
**Status:** not-started
**Estimated:** 2 hours
**Dependencies:** 012
**Tags:** seo, blog, metadata, nextjs

## Goal

Full SEO metadata on blog post pages: OpenGraph tags, Twitter card tags, JSON-LD BlogPosting schema, and canonical URLs.

## Context

Blog posts need rich metadata for social sharing and search engines. OpenGraph/Twitter tags generate previews when shared on social media. JSON-LD helps search engines understand the content structure.

## Steps

1. Create `src/lib/seo.ts` with helper functions:
   - `generateBlogPostMetadata(post)` - returns Next.js Metadata object with OG + Twitter tags
   - `generateBlogJsonLd(post)` - returns JSON-LD BlogPosting schema object
2. Update `app/blog/[slug]/page.tsx`:
   - Use `generateBlogPostMetadata` in `generateMetadata()`
   - Include OpenGraph: title, description, type, image, url
   - Include Twitter: card, title, description, image
   - Add canonical URL
3. Add JSON-LD script tag to blog post pages (BlogPosting schema)
4. Add a static placeholder OG image at `/public/images/og-default.jpg`
5. Update blog index page metadata with OG tags too
6. Verify metadata in browser dev tools (inspect `<head>`)
7. Update TASK-INDEX.md: mark this task complete

## Expected Outputs

- `src/lib/seo.ts`
- Updated `app/blog/[slug]/page.tsx`
- Updated `app/blog/page.tsx`
- `public/images/og-default.jpg` (placeholder)

## Acceptance Criteria

- [ ] Blog posts have OpenGraph tags (title, description, type, image, url)
- [ ] Blog posts have Twitter card tags (card, title, description, image)
- [ ] Blog posts have canonical URLs
- [ ] Blog posts have JSON-LD BlogPosting schema in `<head>`
- [ ] Blog index page has appropriate OG tags
- [ ] Static OG image is served correctly

## Notes

- JSON-LD schema for BlogPosting: include headline, datePublished, author, description
- OG image can be the post's heroImage if available, falling back to the default
