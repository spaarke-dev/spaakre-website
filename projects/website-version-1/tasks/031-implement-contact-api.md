# Task 031: Implement Contact API Endpoint

**Phase:** 3 - Contact Form + API
**Status:** not-started
**Estimated:** 3 hours
**Dependencies:** 030
**Tags:** api, azure-functions, validation, nextjs, typescript

## Goal

`POST /api/contact` endpoint with server-side validation, honeypot check, and structured error responses.

## Context

The contact form needs a backend endpoint to receive submissions. This task implements the API route with validation only - persistence and email are added in subsequent tasks.

## Steps

1. Create `app/api/contact/route.ts` (Next.js Route Handler)
2. Implement request body parsing and validation:
   - Validate required fields: name (1-100 chars), email (valid format, 3-254 chars), message (1-5000 chars)
   - Validate optional fields: company, reason (must be one of: Demo, Partnership, Support, Other, or null)
   - Trim and normalize all string inputs
3. Implement honeypot check:
   - If `hp` field is non-empty, return `{ ok: true }` silently (don't reveal detection)
4. Create validation utility in `src/lib/contact.ts`:
   - `validateContactForm(data)` - returns validation result with field-level errors
   - Email validation regex or library
5. Return structured responses:
   - Success: `{ ok: true }` (200)
   - Validation error: `{ ok: false, error: "VALIDATION_ERROR", fields: {...} }` (400)
   - Rate limited: `{ ok: false, error: "RATE_LIMITED" }` (429) - placeholder for now
   - Server error: `{ ok: false, error: "INTERNAL_ERROR" }` (500)
6. Add request logging (console.log for now; App Insights later)
7. Test with valid and invalid payloads
8. Update TASK-INDEX.md: mark this task complete

## Expected Outputs

- `app/api/contact/route.ts`
- `src/lib/contact.ts`

## Acceptance Criteria

- [ ] POST `/api/contact` accepts valid submissions and returns `{ ok: true }`
- [ ] Invalid submissions return 400 with field-level errors
- [ ] Honeypot-filled submissions return `{ ok: true }` (silent rejection)
- [ ] All inputs are trimmed and normalized
- [ ] Non-POST methods return 405
- [ ] TypeScript types are strict for request/response

## Notes

- Persistence (Table Storage) and email (SendGrid) are separate tasks
- For now, a successful validated submission just returns ok:true without saving
- Rate limiting is a separate task (034)
