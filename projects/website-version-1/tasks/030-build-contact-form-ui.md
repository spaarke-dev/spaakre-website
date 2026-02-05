# Task 030: Build Contact Form UI

**Phase:** 3 - Contact Form + API
**Status:** not-started
**Estimated:** 3 hours
**Dependencies:** 003
**Tags:** forms, react, tailwind, validation, contact

## Goal

Contact form at `/contact` with all fields, client-side validation, success/error states, and honeypot field.

## Context

The contact form is a core MVP feature. It needs to collect name, email, company (optional), message, and reason (optional dropdown). Client-side validation provides instant feedback; the honeypot field is hidden from users but catches bots.

## Steps

1. Create `src/components/FormField.tsx` - reusable input/textarea component with label, error display
2. Create `src/components/ContactForm.tsx`:
   - Fields: name (required), email (required), company (optional), message (required, textarea), reason (optional select: Demo/Partnership/Support/Other)
   - Hidden honeypot field (visually hidden, no autocomplete)
   - Client-side validation:
     - name: 1-100 chars
     - email: valid email format, 3-254 chars
     - message: 1-5000 chars
   - Submit button with loading state
   - Success state: "Thank you! We'll be in touch."
   - Error state: display error message with retry option
3. Create `src/components/InlineAlert.tsx` - success/error feedback component
4. Update `app/contact/page.tsx` to render ContactForm with page metadata
5. Wire form submission to POST `/api/contact` (API doesn't exist yet - handle gracefully)
6. Test validation: required fields, email format, character limits
7. Test honeypot: verify hidden field is not visible but present in DOM
8. Verify accessibility: labels, aria attributes, focus management on submit
9. Update TASK-INDEX.md: mark this task complete

## Expected Outputs

- `src/components/FormField.tsx`
- `src/components/ContactForm.tsx`
- `src/components/InlineAlert.tsx`
- Updated `app/contact/page.tsx`

## Acceptance Criteria

- [ ] All form fields render with labels
- [ ] Required fields show validation errors when empty
- [ ] Email field validates format
- [ ] Honeypot field is hidden but present in form data
- [ ] Submit button shows loading state during submission
- [ ] Success message displays after successful submission
- [ ] Error message displays with retry option on failure
- [ ] Form is accessible (labels, focus management, aria)
- [ ] Responsive layout works on mobile and desktop

## Notes

- Use uncontrolled form with FormData or controlled form with React state - either approach is fine
- The API endpoint doesn't exist yet; the form should handle a network error gracefully
- Input trimming/normalization can happen client-side before submit
