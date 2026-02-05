# Task 032: Add Azure Table Storage Persistence

**Phase:** 3 - Contact Form + API
**Status:** not-started
**Estimated:** 2.5 hours
**Dependencies:** 031
**Tags:** azure, storage, api, typescript

## Goal

Contact form submissions are persisted to Azure Table Storage after validation.

## Context

Every valid contact submission must be saved before attempting email notification. This is the "persist-first" pattern - even if email fails, the submission is never lost.

## Steps

1. Install `@azure/data-tables` SDK
2. Create `src/lib/storage.ts`:
   - Initialize `TableClient` from connection string (env var: `STORAGE_ACCOUNT_CONNECTION`)
   - `saveContactSubmission(data)` function:
     - PartitionKey: `"contact"`
     - RowKey: `{timestamp}-{random}` (ensures uniqueness)
     - Fields: name, email, company, reason, message, userAgent, ipHash, createdAt
   - Hash the IP address (don't store raw IPs)
3. Update `app/api/contact/route.ts`:
   - After validation passes, call `saveContactSubmission()`
   - If storage fails, return 500 with `INTERNAL_ERROR`
   - If storage succeeds, return `{ ok: true }`
4. Add local development support:
   - Document how to use Azurite (local Azure Storage emulator) for testing
   - Or: use a real Azure Storage Account for dev (document in README)
5. Test submission persistence (verify row appears in Table Storage)
6. Update TASK-INDEX.md: mark this task complete

## Expected Outputs

- `src/lib/storage.ts`
- Updated `app/api/contact/route.ts`

## Acceptance Criteria

- [ ] Valid submissions are saved to Table Storage
- [ ] Each submission has a unique RowKey
- [ ] IP addresses are hashed (not stored in plaintext)
- [ ] Storage errors return 500 to the client
- [ ] Timestamp is recorded in ISO format
- [ ] Works with Azurite for local development (or documented alternative)

## Notes

- Use `STORAGE_ACCOUNT_CONNECTION` env var for the connection string
- The table name can be `ContactSubmissions` (create it automatically if it doesn't exist)
- IP hash: use a one-way hash (SHA-256) so we can detect duplicates but not identify users
