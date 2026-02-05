# Task 033: Integrate SendGrid Email Notifications

**Phase:** 3 - Contact Form + API
**Status:** not-started
**Estimated:** 2 hours
**Dependencies:** 032
**Tags:** api, email, sendgrid, typescript

## Goal

After a contact submission is persisted, send an email notification via SendGrid to the configured inbox.

## Context

Email notifications alert the team to new contact submissions. Per the spec, email is sent AFTER persistence - if email fails, the submission is still saved and the user still gets a success response.

## Steps

1. Install `@sendgrid/mail` SDK
2. Create `src/lib/email.ts`:
   - Initialize SendGrid with API key (env var: `SENDGRID_API_KEY`)
   - `sendContactNotification(data)` function:
     - To: `CONTACT_EMAIL_TO` env var
     - From: configured sender (env var: `SENDGRID_FROM_EMAIL`)
     - Subject: `[Spaarke] New website inquiry - {reason}`
     - Body: formatted with all form fields + timestamp
   - Return success/failure (don't throw on failure)
3. Update `app/api/contact/route.ts`:
   - After successful persistence, call `sendContactNotification()`
   - If email fails: log error, but still return `{ ok: true }` to user
   - If email succeeds: return `{ ok: true }`
4. Test with SendGrid (requires API key in `.env.local`)
5. Verify error handling: email failure should not affect user response
6. Update TASK-INDEX.md: mark this task complete

## Expected Outputs

- `src/lib/email.ts`
- Updated `app/api/contact/route.ts`

## Acceptance Criteria

- [ ] Successful submission sends email to configured inbox
- [ ] Email includes all form fields and timestamp
- [ ] Email subject includes the reason category
- [ ] Email failure does not return error to user
- [ ] Email failure is logged (console for now; App Insights later)
- [ ] SendGrid API key is read from env var (not hardcoded)

## Notes

- SendGrid free tier: 100 emails/day - sufficient for MVP
- The "from" email needs to be verified in SendGrid (Single Sender Verification or Domain Authentication)
- Test email sending locally with a real SendGrid API key
