# Task 045: Enable Application Insights

**Phase:** 4 - Azure Deployment
**Status:** not-started
**Estimated:** 1.5 hours
**Dependencies:** 040, 031
**Tags:** azure, observability, api, config

## Goal

Application Insights enabled for API logging with request tracking, error logging, and basic metrics.

## Context

Application Insights provides observability for the contact API - tracking requests, errors, and performance. This is essential for monitoring the contact form in production and debugging issues.

## Steps

1. Install Application Insights SDK (if needed for custom logging):
   - `applicationinsights` npm package or use Azure Functions built-in integration
2. Update `app/api/contact/route.ts` to log structured data:
   - Request received (with sanitized fields - no PII in logs)
   - Validation result
   - Persistence result
   - Email send result
   - Error details on failure
3. Configure `APPLICATIONINSIGHTS_CONNECTION_STRING` env var in SWA
4. Verify logs appear in Application Insights in Azure Portal:
   - Transaction search: find contact API requests
   - Failures: see any errors
5. Set up basic alerts (optional):
   - High 5xx rate on `/api/contact`
   - Email provider failures
6. Update TASK-INDEX.md: mark this task complete

## Expected Outputs

- Updated `app/api/contact/route.ts` (structured logging)
- Application Insights configured and receiving data

## Acceptance Criteria

- [ ] API requests appear in Application Insights
- [ ] Request details include: status, duration, error code
- [ ] Errors are logged with useful context
- [ ] No PII (email addresses, messages) in logs
- [ ] Connection string configured in SWA env vars

## Notes

- Be careful not to log PII (names, emails, messages) to Application Insights
- Log sanitized data: request ID, status, reason category, error type
- SWA integrated functions may auto-report to App Insights if configured
