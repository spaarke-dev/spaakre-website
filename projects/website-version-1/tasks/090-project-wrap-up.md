# Task 090: Project Wrap-up

**Phase:** Wrap-up
**Status:** not-started
**Estimated:** 3 hours
**Dependencies:** 001, 002, 003, 010, 011, 012, 013, 014, 015, 020, 021, 030, 031, 032, 033, 034, 040, 041, 042, 043, 044, 045
**Tags:** testing, performance, accessibility, seo, docs

## Goal

All spec.md success criteria verified, Lighthouse audit passing, security headers confirmed, and project documentation updated to "Complete".

## Context

This is the final task. All features are built and deployed. This task runs final quality checks, verifies everything works end-to-end in production, and closes out the project.

## Steps

1. Run Lighthouse audit on all pages (desktop):
   - `/` - Homepage
   - `/blog` - Blog index
   - `/blog/{sample-slug}` - Blog post
   - `/contact` - Contact form
   - Verify targets: Performance >= 90, Accessibility >= 95, Best Practices >= 95, SEO >= 95
2. Verify all success criteria from spec.md:
   - [ ] Homepage renders correctly with video, hero, features, CTAs
   - [ ] Blog system works (posts render, metadata correct)
   - [ ] RSS feed validates
   - [ ] Sitemap includes all pages and posts
   - [ ] Contact form works end-to-end in production
   - [ ] Spam controls work
   - [ ] SEO metadata and OpenGraph tags correct on all pages
   - [ ] Security headers present
   - [ ] No secrets in client bundle
   - [ ] PR preview environments work
3. Verify security headers in browser dev tools:
   - HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, CSP
4. Check browser console for errors on all pages
5. Test on mobile device (or mobile emulation)
6. Update project README.md:
   - Status: "Complete"
   - Progress: 100%
   - Add completion date
7. Update plan.md:
   - All milestones marked complete
8. Document lessons learned in `notes/lessons-learned.md` (if any)
9. Update TASK-INDEX.md: mark this task and all remaining tasks complete

## Expected Outputs

- Updated `README.md` (status: Complete)
- Updated `plan.md` (milestones: Complete)
- `notes/lessons-learned.md` (optional)
- All TASK-INDEX.md entries marked complete

## Acceptance Criteria

- [ ] All Lighthouse targets met on all pages
- [ ] All 13 success criteria from spec.md verified
- [ ] No console errors on any page
- [ ] Security headers confirmed in production
- [ ] Mobile experience verified
- [ ] README.md shows "Complete" status
- [ ] All tasks in TASK-INDEX.md are complete

## Notes

- If any Lighthouse score is below target, fix the issue before marking complete
- If any success criterion fails, create a note documenting the gap and fix it
- This task is the last one - after this, the project is done
