# Task 043: Upload Intro Video to Blob Storage

**Phase:** 4 - Azure Deployment
**Status:** not-started
**Estimated:** 1 hour
**Dependencies:** 040
**Tags:** azure, storage, video

## Goal

Intro video MP4 uploaded to Azure Blob Storage and accessible via URL. Optionally configure CDN for edge caching.

## Context

Spaarke is creating an intro video for the first release. The MP4 file needs to be hosted in Azure Blob Storage so the VideoEmbed component can serve it in MP4 mode.

## Steps

1. Upload MP4 file to the `videos` Blob container (Azure Portal, CLI, or Storage Explorer):
   - `az storage blob upload --container-name videos --file intro-video.mp4 --name intro-video.mp4`
2. Set blob content type to `video/mp4`
3. Verify the blob URL is accessible (if container is public read) or generate SAS token
4. Test the URL in a browser - video should play
5. Optionally enable Azure CDN on the Storage Account for edge caching:
   - Create CDN profile and endpoint pointing to the Blob Storage
   - Note the CDN URL
6. Update `VIDEO_MP4_URL` env var in SWA (and `.env.local`) with the blob/CDN URL
7. Upload poster image to the same container if needed
8. Update TASK-INDEX.md: mark this task complete

## Expected Outputs

- Video file in Azure Blob Storage
- URL documented in env vars
- Optional: CDN endpoint configured

## Acceptance Criteria

- [ ] MP4 file is accessible via URL
- [ ] Content-Type is `video/mp4`
- [ ] Video plays in the VideoEmbed component on the deployed site
- [ ] URL is configured in SWA env vars

## Notes

- If the video isn't ready yet, upload a placeholder and update later
- CDN is optional for MVP but recommended for performance if the video is large
- Keep video file size reasonable (<50MB ideally) for fast loading
- Poster image should be uploaded alongside the video
