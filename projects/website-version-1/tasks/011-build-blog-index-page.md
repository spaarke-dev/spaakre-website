# Task 011: Build Blog Index Page

**Phase:** 1 - Blog System
**Status:** not-started
**Estimated:** 2 hours
**Dependencies:** 010
**Tags:** blog, react, tailwind, nextjs

## Goal

Blog index page at `/blog` showing all published posts with title, date, description, and tags.

## Context

With the MDX loading pipeline in place, we need the blog index page to list posts. Each post should be a clickable card linking to the full post. Tags should be displayed as pills/badges.

## Steps

1. Create `src/components/PostCard.tsx` - card component showing title, date, description, tags
2. Create `src/components/TagPills.tsx` - inline tag badges
3. Update `app/blog/page.tsx`:
   - Call `getAllPosts()` to fetch posts
   - Render list of `PostCard` components
   - Add page metadata (title: "Blog | Spaarke", description)
4. Style with Tailwind for clean, readable layout
5. Verify draft posts are excluded from listing
6. Test responsive layout (cards stack on mobile, grid on desktop)
7. Update TASK-INDEX.md: mark this task complete

## Expected Outputs

- `src/components/PostCard.tsx`
- `src/components/TagPills.tsx`
- Updated `app/blog/page.tsx`

## Acceptance Criteria

- [ ] Blog index lists all published posts
- [ ] Posts are sorted by date (newest first)
- [ ] Draft posts do not appear
- [ ] Each post card links to `/blog/[slug]`
- [ ] Tags render as styled pills/badges
- [ ] Responsive layout works on mobile and desktop

## Notes

- No pagination needed for MVP - show all posts on one page
- PostCard should show: title, date, description snippet, tags
