# Spaarke Marketing Website (v1) - Implementation Plan

> **Status**: In Progress
> **Created**: 2026-02-05

## Phase Breakdown

### Phase 0: Scaffold and Shell
**Goal**: Working Next.js app with layout, navigation, and page shells.

**Deliverables**:
- Next.js project scaffolded with TypeScript, Tailwind CSS, ESLint
- Site layout with responsive header and footer
- Page shells for all routes (/, /blog, /contact, /privacy, /terms)
- SEO utilities (metadata helpers, robots.txt, sitemap skeleton)
- Global styling foundation and Tailwind configuration

**Milestone**: App runs locally with responsive nav, footer, and placeholder pages.

---

### Phase 1: Blog System (MDX)
**Goal**: Fully functional blog with MDX content, SEO, and feeds.

**Deliverables**:
- MDX loading pipeline with frontmatter parsing and validation
- Blog index page with post listing, dates, descriptions, and tags
- Blog post page with MDX rendering and typography
- Per-post SEO: OpenGraph, Twitter cards, JSON-LD BlogPosting schema
- RSS feed at `/blog/rss.xml`
- Blog posts integrated into sitemap
- 2 sample MDX posts for testing

**Milestone**: At least 2 posts render correctly; sitemap includes posts; RSS validates.

**Dependencies**: Phase 0 complete (layout and routing in place).

---

### Phase 2: Video Section
**Goal**: Homepage video component supporting embed and self-hosted MP4 modes.

**Deliverables**:
- `VideoEmbed` component with embed mode (YouTube/Vimeo iframe)
- MP4 self-hosted mode (HTML5 `<video>` element)
- Mode switching via `VIDEO_MODE` env var
- Lazy loading, poster image support, responsive sizing
- Video section integrated into homepage

**Milestone**: Video renders in both modes; does not degrade LCP significantly.

**Dependencies**: Phase 0 complete (homepage shell exists).

---

### Phase 3: Contact Form + API
**Goal**: Working contact form with validation, persistence, email, and spam controls.

**Deliverables**:
- Contact form UI with client-side validation
- `/api/contact` endpoint with server-side validation
- Azure Table Storage persistence for submissions
- SendGrid email notification on submission
- Honeypot spam control
- Rate limiting per IP
- Success/error states in form UI

**Milestone**: Submissions persist to storage, email sends, spam controls work.

**Dependencies**: Phase 0 complete (contact page shell exists).

---

### Phase 4: Azure Deployment
**Goal**: Production deployment with all Azure resources provisioned.

**Deliverables**:
- Azure Storage Account (Table Storage + Blob Storage)
- Azure Static Web Apps resource linked to GitHub
- Environment variables and secrets configured
- Intro video uploaded to Blob Storage
- Application Insights enabled
- Custom domain + TLS (if domain available)
- PR preview environments verified

**Milestone**: Site live in production; contact form works end-to-end; video plays from Blob Storage.

**Dependencies**: Phases 0-3 complete (all features built locally).

---

### Wrap-up
**Goal**: Final verification, quality audit, and documentation.

**Deliverables**:
- Lighthouse audit passing all targets
- All acceptance criteria from spec.md verified
- Security headers confirmed
- README updated to "Complete" status
- Lessons learned documented

**Milestone**: All success criteria from spec.md checked off.

**Dependencies**: Phase 4 complete.

---

## Risks

| Risk | Mitigation |
|------|------------|
| SWA Next.js feature constraints | Keep code portable; fall back to App Service if needed |
| Spam on contact form | Honeypot + rate limiting; add CAPTCHA only if needed |
| Email deliverability | Use SendGrid with domain auth; persist first, email second |
| Lighthouse performance with video | Lazy load video; use poster image; defer loading |
| MDX build complexity | Use well-supported libraries (next-mdx-remote or similar) |
