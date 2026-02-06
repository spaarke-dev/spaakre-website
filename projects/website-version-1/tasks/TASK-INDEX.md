# Task Index - Spaarke Marketing Website (v1)

> **Total Tasks**: 20
> **Completed**: 20 / 20
> **Current Phase**: 4 - Deploy

## All Tasks

| ID | Title | Phase | Status | Dependencies |
|----|-------|-------|--------|--------------|
| 001 | Scaffold Next.js project | 0 | done | none |
| 002 | Implement site layout (header, footer, container) | 0 | done | 001 |
| 003 | Create page shells and SEO basics | 0 | done | 002 |
| 010 | Implement MDX loading and frontmatter parsing | 1 | done | 003 |
| 011 | Build blog index page | 1 | done | 010 |
| 012 | Build blog post page with MDX rendering | 1 | done | 010 |
| 013 | Add blog SEO (OpenGraph, Twitter, JSON-LD) | 1 | done | 012 |
| 014 | Implement RSS feed | 1 | done | 010 |
| 015 | Integrate blog posts into sitemap | 1 | done | 010, 003 |
| 020 | Build VideoEmbed component (embed + MP4 modes) | 2 | done | 003 |
| 021 | Integrate video section into homepage | 2 | done | 020, 002 |
| 030 | Build contact form UI with validation | 3 | done | 003 |
| 031 | Implement contact API endpoint | 3 | done | 030 |
| 032 | Add Azure Table Storage persistence | 3 | done | 031 |
| 033 | Integrate SendGrid email notifications | 3 | done | 032 |
| 034 | Add rate limiting to contact API | 3 | done | 031 |
| 040 | Provision Azure resources (Storage, App Insights) | 4 | done | 001 |
| 041 | Create Azure SWA and link to GitHub | 4 | done | 040, 003 |
| 042 | Configure env vars and secrets | 4 | done | 041, 040 |
| 043 | Upload intro video to Blob Storage | 4 | deferred | 040 |
| 044 | Configure custom domain and TLS | 4 | deferred | 041 |
| 045 | Enable Application Insights | 4 | done | 040, 031 |
| 090 | Project wrap-up | Wrap-up | not-started | all |

## Phase Summary

| Phase | Tasks | Description |
|-------|-------|-------------|
| 0 - Scaffold | 001-003 | Next.js setup, layout, page shells |
| 1 - Blog | 010-015 | MDX loading, blog pages, SEO, RSS, sitemap |
| 2 - Video | 020-021 | VideoEmbed component, homepage integration |
| 3 - Contact | 030-034 | Form UI, API, persistence, email, rate limiting |
| 4 - Deploy | 040-045 | Azure resources, SWA, env vars, domain |
| Wrap-up | 090 | Lighthouse audit, verification, docs |

## Execution Order

**Sequential (must follow order):**
- 001 -> 002 -> 003 (Phase 0 is strictly sequential)

**After Phase 0, these can run in parallel:**
- Phase 1 (010-015) - Blog system
- Phase 2 (020-021) - Video section
- Phase 3 (030-034) - Contact form
- Task 040 (Azure resource provisioning)

**Phase 4 (041-045)** depends on Phase 0-3 code + Task 040 resources.

**Task 090** runs last after everything else.

## Notes

- Tasks 040, 043, 044 are Azure Portal/CLI tasks (no code changes)
- Phase 1, 2, and 3 are independent of each other and can be built in any order after Phase 0
- Task 040 (Azure provisioning) can be done early, in parallel with coding
