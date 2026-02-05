# Task 042: Configure Environment Variables and Secrets

**Phase:** 4 - Azure Deployment
**Status:** not-started
**Estimated:** 1.5 hours
**Dependencies:** 041, 040
**Tags:** azure, swa, config, security

## Goal

All environment variables and secrets configured in Azure SWA so the contact form and video work in production.

## Context

The site needs environment variables for SendGrid, Storage Account, video URLs, and Application Insights. Secrets must be stored securely (SWA app settings or Key Vault), never in code.

## Steps

1. Configure SWA application settings (via Azure Portal or CLI):
   - `SITE_URL` - production URL
   - `VIDEO_MODE` - `embed` or `mp4`
   - `VIDEO_EMBED_URL` - YouTube/Vimeo URL (if using embed mode)
   - `VIDEO_MP4_URL` - Blob Storage URL (if using mp4 mode)
   - `VIDEO_POSTER_URL` - poster image URL
   - `CONTACT_EMAIL_TO` - notification recipient email
   - `SENDGRID_API_KEY` - SendGrid API key (secret)
   - `SENDGRID_FROM_EMAIL` - verified sender email
   - `STORAGE_ACCOUNT_CONNECTION` - Azure Storage connection string (secret)
   - `RATE_LIMIT_PER_MINUTE` - rate limit threshold
   - `APPLICATIONINSIGHTS_CONNECTION_STRING` - App Insights connection string
2. Optionally link Azure Key Vault for secrets (SendGrid key, Storage connection)
3. Verify env vars are accessible in the deployed API functions
4. Verify secrets are NOT exposed in client-side bundles (check built JS)
5. Update `.env.local.example` in the repo with all variable names (no values)
6. Update TASK-INDEX.md: mark this task complete

## Expected Outputs

- Azure SWA app settings configured
- Updated `.env.local.example`

## Acceptance Criteria

- [ ] All required env vars are set in SWA app settings
- [ ] Secrets (API keys, connection strings) are not in client bundles
- [ ] Contact API works in production with configured secrets
- [ ] `.env.local.example` documents all required variables

## Notes

- SWA app settings are available as env vars in API functions
- For client-side env vars in Next.js, use `NEXT_PUBLIC_` prefix (only for non-secret values)
- Video URLs and site URL are safe as client-side vars; API keys must be server-only
