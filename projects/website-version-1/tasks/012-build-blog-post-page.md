# Task 012: Build Blog Post Page

**Phase:** 1 - Blog System
**Status:** not-started
**Estimated:** 3 hours
**Dependencies:** 010
**Tags:** blog, mdx, react, tailwind, nextjs

## Goal

Individual blog post page at `/blog/[slug]` that renders MDX content with proper typography, post header, and metadata.

## Context

Each blog post needs a dedicated page with the full MDX content rendered beautifully. This includes a post header (title, date, author, tags), a prose wrapper for typography, and hero image support.

## Steps

1. Create `src/components/PostHeader.tsx` - title, date, author, tags, hero image
2. Create `src/components/Prose.tsx` - MDX typography wrapper (Tailwind Typography plugin or custom styles)
3. Install `@tailwindcss/typography` plugin if not already installed
4. Update `app/blog/[slug]/page.tsx`:
   - Fetch post by slug using `getPostBySlug()`
   - Render PostHeader + MDX content wrapped in Prose
   - Generate static params for all posts (for static generation)
   - Return 404 for unknown slugs
5. Add `generateMetadata()` for dynamic page metadata (title, description from frontmatter)
6. Test with both sample posts
7. Verify MDX elements render correctly: headings, paragraphs, code blocks, images, links, lists
8. Update TASK-INDEX.md: mark this task complete

## Expected Outputs

- `src/components/PostHeader.tsx`
- `src/components/Prose.tsx`
- Updated `app/blog/[slug]/page.tsx`

## Acceptance Criteria

- [ ] Blog posts render with correct title, date, author, tags
- [ ] MDX content renders with proper typography (headings, code, lists, links)
- [ ] Hero image displays if specified in frontmatter
- [ ] Unknown slugs return 404
- [ ] Page metadata matches post frontmatter
- [ ] `generateStaticParams` generates paths for all posts

## Notes

- Use `@tailwindcss/typography` for the `prose` class - it handles most MDX styling
- Consider supporting custom MDX components (e.g., callout boxes) in the future
