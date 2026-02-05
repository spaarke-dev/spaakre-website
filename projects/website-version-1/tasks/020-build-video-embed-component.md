# Task 020: Build VideoEmbed Component

**Phase:** 2 - Video Section
**Status:** not-started
**Estimated:** 3 hours
**Dependencies:** 003
**Tags:** react, video, tailwind, nextjs

## Goal

A `VideoEmbed` component supporting two modes: YouTube/Vimeo iframe embed and self-hosted MP4 via HTML5 `<video>`. Includes lazy loading, poster image, and responsive sizing.

## Context

Spaarke is creating an intro video for the website's first release. The component needs to support both embed (YouTube/Vimeo) and self-hosted MP4 (served from Azure Blob Storage). Mode is controlled by the `VIDEO_MODE` env var.

## Steps

1. Create `src/components/VideoEmbed.tsx` with props:
   - `mode`: `"embed" | "mp4"` (from env var)
   - `embedUrl`: YouTube/Vimeo embed URL
   - `mp4Url`: URL to self-hosted MP4 file
   - `posterUrl`: poster image URL
   - `title`: accessible title for the video
2. Implement embed mode:
   - Render responsive iframe with `loading="lazy"`
   - Support YouTube and Vimeo embed URLs
   - Show poster image as placeholder until user clicks to load iframe (facade pattern for performance)
3. Implement MP4 mode:
   - Render HTML5 `<video>` element with `controls`, `preload="none"`, poster
   - Responsive sizing (100% width, 16:9 aspect ratio)
   - Lazy load: don't load video until in viewport or user interaction
4. Add responsive container (16:9 aspect ratio maintained at all sizes)
5. Style with Tailwind (rounded corners, shadow, responsive margins)
6. Test both modes with placeholder URLs
7. Verify component does not significantly impact LCP when poster is used
8. Update TASK-INDEX.md: mark this task complete

## Expected Outputs

- `src/components/VideoEmbed.tsx`

## Acceptance Criteria

- [ ] Embed mode renders YouTube/Vimeo iframe correctly
- [ ] MP4 mode renders HTML5 video player with controls
- [ ] Poster image displays before video loads in both modes
- [ ] Video is lazy-loaded (does not block initial page render)
- [ ] Responsive: maintains 16:9 aspect ratio from 320px to 1920px+
- [ ] Mode is switchable via props (driven by env var at page level)
- [ ] Accessible: has title/aria-label

## Notes

- The "lite YouTube embed" / facade pattern is recommended for embed mode to avoid loading the full YouTube iframe on page load
- For MP4 mode, `preload="none"` with poster ensures no video data is fetched until the user hits play
- ENV vars: `VIDEO_MODE`, `VIDEO_EMBED_URL`, `VIDEO_MP4_URL`, `VIDEO_POSTER_URL`
