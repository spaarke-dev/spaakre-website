# Task 044: Configure Custom Domain and TLS

**Phase:** 4 - Azure Deployment
**Status:** not-started
**Estimated:** 1.5 hours
**Dependencies:** 041
**Tags:** azure, swa, dns, deploy

## Goal

Custom domain configured on Azure SWA with automatic TLS certificate.

## Context

The site should be accessible at the custom domain (e.g., www.spaarke.com) with HTTPS. Azure SWA provides free TLS certificates for custom domains.

## Steps

1. Add custom domain to Azure SWA resource (Azure Portal or CLI)
2. Configure DNS records:
   - CNAME record pointing to the SWA default hostname
   - Or: TXT record for domain validation + A record
3. Wait for DNS propagation and TLS certificate provisioning
4. Verify site is accessible at `https://yourdomain.com`
5. Verify HTTPS redirect works (HTTP -> HTTPS)
6. Update `SITE_URL` env var to the custom domain
7. Update sitemap and canonical URLs to use the custom domain
8. Update TASK-INDEX.md: mark this task complete

## Expected Outputs

- DNS records configured
- Custom domain active on SWA
- TLS certificate provisioned

## Acceptance Criteria

- [ ] Site accessible at custom domain with HTTPS
- [ ] HTTP requests redirect to HTTPS
- [ ] TLS certificate is valid
- [ ] `SITE_URL` env var updated
- [ ] Sitemap URLs use the custom domain

## Notes

- If custom domain is not ready yet, this task can be deferred
- SWA provides free managed TLS certificates
- DNS propagation can take up to 48 hours (usually much faster)
- This task is independent of code changes
