# Task 041: Create Azure Static Web Apps Resource and Link to GitHub

**Phase:** 4 - Azure Deployment
**Status:** not-started
**Estimated:** 2 hours
**Dependencies:** 040, 003
**Tags:** azure, swa, deploy, ci-cd

## Goal

Azure Static Web Apps resource created, linked to the GitHub repo, with automatic CI/CD deploying from `main` and PR previews enabled.

## Context

Azure SWA provides hosting, CI/CD, and PR preview environments. Linking it to the GitHub repo sets up a GitHub Actions workflow that builds and deploys automatically on push/PR.

## Steps

1. Create Azure Static Web Apps resource in the Azure portal or CLI:
   - Link to GitHub repo: `spaarke-dev/spaakre-website`
   - Branch: `main`
   - Build preset: Next.js
   - App location: `/`
   - API location: (SWA managed functions or leave blank)
   - Output location: (per Next.js SWA docs)
2. SWA will auto-create a GitHub Actions workflow file (`.github/workflows/`)
3. Review and adjust the generated workflow if needed
4. Verify `staticwebapp.config.json` has correct settings:
   - Navigation fallback
   - Security headers (HSTS, X-Content-Type-Options, etc.)
   - Route rules if needed
5. Push to `main` and verify the first deployment succeeds
6. Create a test PR and verify preview environment is created
7. Update TASK-INDEX.md: mark this task complete

## Expected Outputs

- Azure SWA resource (in Azure)
- `.github/workflows/azure-static-web-apps-*.yml` (auto-generated)
- Updated `staticwebapp.config.json`

## Acceptance Criteria

- [ ] SWA resource exists and is linked to the GitHub repo
- [ ] Push to `main` triggers automatic deployment
- [ ] Site is accessible at the SWA default URL
- [ ] PR preview environments are created automatically
- [ ] Security headers are configured in `staticwebapp.config.json`
- [ ] GitHub Actions workflow runs successfully

## Notes

- The SWA auto-generated workflow usually works well for Next.js
- If Next.js features aren't supported by SWA, this is where we'd discover it and consider the App Service fallback
- Custom domain is a separate task (043)
