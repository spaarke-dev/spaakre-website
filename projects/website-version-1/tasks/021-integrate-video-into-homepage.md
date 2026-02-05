# Task 021: Integrate Video Section into Homepage

**Phase:** 2 - Video Section
**Status:** not-started
**Estimated:** 2 hours
**Dependencies:** 020, 002
**Tags:** react, video, tailwind, nextjs

## Goal

Homepage displays the intro video section using the `VideoEmbed` component, positioned according to the design (below hero, above feature blocks).

## Context

With the VideoEmbed component built, we need to integrate it into the homepage layout. The video section should sit between the hero and the feature/value blocks. Configuration comes from environment variables.

## Steps

1. Create `src/components/Hero.tsx` - hero section with value proposition and CTA
2. Create `src/components/FeatureGrid.tsx` - 3-5 feature/value blocks
3. Create `src/components/CallToAction.tsx` - CTA section ("Request demo" / "Contact")
4. Update `app/page.tsx` to compose the full homepage:
   - Hero section
   - VideoEmbed section (configured from env vars)
   - FeatureGrid section
   - CallToAction section
5. Read `VIDEO_MODE`, `VIDEO_EMBED_URL`, `VIDEO_MP4_URL`, `VIDEO_POSTER_URL` from env
6. Add a section wrapper around VideoEmbed with heading (e.g., "See Spaarke in Action")
7. Test homepage layout with video in both modes
8. Verify responsive behavior across breakpoints
9. Update TASK-INDEX.md: mark this task complete

## Expected Outputs

- `src/components/Hero.tsx`
- `src/components/FeatureGrid.tsx`
- `src/components/CallToAction.tsx`
- Updated `app/page.tsx`

## Acceptance Criteria

- [ ] Homepage shows Hero -> Video -> Features -> CTA in correct order
- [ ] Video section reads configuration from env vars
- [ ] Hero has clear value proposition and CTA button
- [ ] Feature grid shows 3-5 value blocks
- [ ] Bottom CTA links to /contact
- [ ] Responsive layout works on all breakpoints
- [ ] Page loads without LCP degradation from video

## Notes

- Use placeholder text for hero/features/CTA until real copy is available
- Feature blocks can use icons or emoji as placeholders
- The video section should have some visual separation (padding, background) from surrounding sections
