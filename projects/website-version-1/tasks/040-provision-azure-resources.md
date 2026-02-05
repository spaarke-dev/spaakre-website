# Task 040: Provision Azure Resources

**Phase:** 4 - Azure Deployment
**Status:** not-started
**Estimated:** 2 hours
**Dependencies:** 001
**Tags:** azure, infra, storage, config

## Goal

Azure resource group with Storage Account (Table Storage + Blob Storage) and Application Insights provisioned and ready.

## Context

The site needs Azure resources for persistence (Table Storage), video hosting (Blob Storage), and observability (Application Insights). These should be created before deploying the site so environment variables can be configured.

## Steps

1. Create Azure resource group (e.g., `rg-spaarke-website`)
2. Create Azure Storage Account:
   - Enable Table Storage (for contact submissions)
   - Create Blob container for video assets (e.g., `videos`)
   - Configure Blob container access level (public read for video, or SAS tokens)
   - Note the connection string for env vars
3. Create Application Insights resource:
   - Note the instrumentation key / connection string
4. Optionally create Azure Key Vault:
   - Store SendGrid API key
   - Store Storage Account connection string
5. Document all resource names and connection strings securely
6. Add configuration notes to `projects/website-version-1/notes/azure-resources.md`
7. Update TASK-INDEX.md: mark this task complete

## Expected Outputs

- Azure resources provisioned (not code files)
- `projects/website-version-1/notes/azure-resources.md` - resource inventory (no secrets!)

## Acceptance Criteria

- [ ] Resource group exists in Azure
- [ ] Storage Account created with Table Storage enabled
- [ ] Blob container for video assets created
- [ ] Application Insights resource created
- [ ] Connection strings documented securely (NOT in repo)
- [ ] Resources are in appropriate Azure region

## Notes

- Can use Azure Portal, Azure CLI, or Bicep/ARM templates
- Keep resource naming consistent (e.g., `st-spaarke-website`, `appi-spaarke-website`)
- Never commit connection strings or keys to the repo
- This task can be done in parallel with coding tasks (no code dependency)
