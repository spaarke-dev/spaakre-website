# Task 034: Add Rate Limiting to Contact API

**Phase:** 3 - Contact Form + API
**Status:** not-started
**Estimated:** 1.5 hours
**Dependencies:** 031
**Tags:** api, security, typescript

## Goal

Contact API rate limits submissions per IP to prevent abuse.

## Context

Without rate limiting, a bad actor could flood the contact form with submissions, filling up Table Storage and triggering excessive emails. Rate limiting by IP prevents this.

## Steps

1. Implement rate limiting in `src/lib/rate-limit.ts`:
   - In-memory store (Map) tracking submissions per IP hash
   - Configurable window: `RATE_LIMIT_PER_MINUTE` env var (default: 5)
   - Sliding window or fixed window approach
   - Clean up expired entries periodically
2. Update `app/api/contact/route.ts`:
   - Check rate limit BEFORE validation (save processing time)
   - If rate limited: return `{ ok: false, error: "RATE_LIMITED" }` with 429 status
   - Include `Retry-After` header
3. Update `src/components/ContactForm.tsx`:
   - Handle 429 response: show "Too many submissions. Please try again later."
4. Test rate limiting: submit rapidly and verify 429 after threshold
5. Update TASK-INDEX.md: mark this task complete

## Expected Outputs

- `src/lib/rate-limit.ts`
- Updated `app/api/contact/route.ts`
- Updated `src/components/ContactForm.tsx`

## Acceptance Criteria

- [ ] Submissions beyond the limit return 429 status
- [ ] Rate limit is per-IP (hashed)
- [ ] Limit is configurable via `RATE_LIMIT_PER_MINUTE` env var
- [ ] Expired entries are cleaned up (no memory leak)
- [ ] Form UI shows appropriate message on 429
- [ ] `Retry-After` header is included in 429 response

## Notes

- In-memory rate limiting works for SWA/single-instance. If scaling becomes a concern, move to Azure Table Storage or Redis-based rate limiting
- Rate limit check should happen before validation and persistence to minimize server work
- The IP should be hashed the same way as in storage.ts
