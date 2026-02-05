# Task 010: Implement MDX Loading and Frontmatter Parsing

**Phase:** 1 - Blog System
**Status:** not-started
**Estimated:** 3 hours
**Dependencies:** 003
**Tags:** mdx, blog, content, nextjs, typescript

## Goal

A blog utility module that reads MDX files from `/content/blog/`, parses frontmatter, validates required fields, and provides typed helper functions for listing and fetching posts.

## Context

The blog system uses Git-based MDX content. We need a loading pipeline that reads `.mdx` files, extracts and validates frontmatter metadata, and exposes functions for the blog pages to consume. Draft posts (draft: true) should be excluded from public listings.

## Steps

1. Install MDX dependencies (e.g., `next-mdx-remote` or `@next/mdx`, `gray-matter` for frontmatter)
2. Create TypeScript types for blog post frontmatter in `src/lib/blog.ts`:
   - `title` (string, required)
   - `description` (string, required)
   - `date` (ISO string, required)
   - `author` (string, required)
   - `tags` (string[], required)
   - `draft` (boolean, default false)
   - `heroImage` (string, optional)
3. Implement `getAllPosts()` - returns all published posts sorted by date descending
4. Implement `getPostBySlug(slug)` - returns single post with compiled MDX content
5. Implement `getAllTags()` - returns unique tags across all posts
6. Add frontmatter validation: warn/error on missing required fields
7. Create 2 sample MDX posts in `/content/blog/` for testing
8. Verify posts load correctly with a simple test (console.log or temp page)
9. Update TASK-INDEX.md: mark this task complete

## Expected Outputs

- `src/lib/blog.ts` - Blog utility functions and types
- `content/blog/2026-02-01-welcome-to-spaarke.mdx` - Sample post 1
- `content/blog/2026-02-03-building-with-nextjs.mdx` - Sample post 2

## Acceptance Criteria

- [ ] `getAllPosts()` returns posts sorted by date, excludes drafts
- [ ] `getPostBySlug()` returns post content and metadata
- [ ] `getAllTags()` returns deduplicated tag list
- [ ] Missing required frontmatter triggers a warning
- [ ] Sample posts have valid frontmatter with all required fields
- [ ] TypeScript types are strict and exported

## Notes

- Slug is derived from filename (strip date prefix and `.mdx` extension)
- Consider using `next-mdx-remote` for server-side MDX compilation
- Keep the API simple - we can extend later for pagination, filtering, etc.
