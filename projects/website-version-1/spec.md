# Spaarke Marketing Website (v1) - AI Implementation Specification

> **Status**: Ready for Implementation
> **Created**: 2026-02-05
> **Source**: design.md

## Executive Summary

Build a simple, SEO-friendly marketing website for Spaarke using Next.js (TypeScript) deployed to Azure Static Web Apps. The MVP delivers three core features: a homepage with intro video and CTAs, a Git-based blog system using MDX, and a contact form with email notifications and submission persistence. The site prioritizes fast delivery, minimal operational overhead, and strong SEO.

## Scope

### In Scope

- **Homepage** (`/`): Hero section, intro video (embed or self-hosted MP4), feature/value blocks, CTAs
- **Video hosting**: Azure Blob Storage for self-hosted MP4 video, optionally behind Azure CDN/Front Door
- **Blog system** (`/blog`, `/blog/[slug]`): MDX-in-repo content, tag filtering, RSS feed, sitemap integration, JSON-LD structured data
- **Contact form** (`/contact`): Form with validation, honeypot spam control, rate limiting, Azure Table Storage persistence, SendGrid email notifications
- **Privacy & Terms pages** (`/privacy`, `/terms`): Static legal content pages
- **SEO**: Per-page metadata, OpenGraph/Twitter cards, canonical URLs, sitemap.xml, robots.txt
- **Azure deployment**: SWA hosting, PR preview environments, CI/CD from GitHub
- **Observability**: Application Insights for API logging and basic telemetry

### Out of Scope

- No CRM/sales system integration (HubSpot, Salesforce, etc.)
- No user accounts, logins, paid tiers, or gated content
- No marketing automation (drip campaigns, segmentation)
- No complex analytics/attribution system
- No multi-language/i18n
- No blog pagination (defer to post-MVP)
- No related posts feature (defer to post-MVP)
- No dynamic OG image generation (defer)
- No CAPTCHA (add only if spam becomes a problem)

### Affected Areas

- `app/` - Next.js pages and routing (App Router)
- `src/components/` - React components (Hero, VideoEmbed, ContactForm, etc.)
- `src/lib/` - Utility functions (blog loading, SEO helpers, contact API logic)
- `content/blog/` - MDX blog content files
- `public/` - Static assets (images, video posters)
- `staticwebapp.config.json` - Azure SWA configuration

## Requirements

### Functional Requirements

1. **FR-01**: Homepage renders hero section with value proposition and CTAs - Acceptance: Page loads with hero, feature blocks, and at least one CTA linking to /contact
2. **FR-02**: Homepage displays intro video with two supported modes: (A) YouTube/Vimeo embed, (B) self-hosted MP4 from Azure Blob Storage. Both modes support lazy loading and poster image - Acceptance: Video loads only on interaction/scroll, does not degrade LCP significantly; mode switchable via `VIDEO_MODE` env var
3. **FR-03**: Blog index page lists all published posts with title, date, description, and tags - Acceptance: Draft posts (draft: true) are excluded; posts sorted by date descending
4. **FR-04**: Blog post pages render MDX content with proper typography - Acceptance: Headings, code blocks, images, and links render correctly
5. **FR-05**: Blog posts include required frontmatter: title, description, date, author, tags, draft, heroImage (optional) - Acceptance: Build fails or warns if required frontmatter is missing
6. **FR-06**: RSS feed available at `/blog/rss.xml` - Acceptance: Feed validates with an RSS validator; includes all published posts
7. **FR-07**: Sitemap at `/sitemap.xml` includes all pages and published blog posts - Acceptance: Sitemap is valid XML and includes correct URLs
8. **FR-08**: Contact form collects name (required), email (required), company (optional), message (required), reason (optional enum) - Acceptance: Client-side and server-side validation enforced
9. **FR-09**: Contact submissions persist to Azure Table Storage - Acceptance: Every valid submission creates a row with all fields + timestamp + IP hash
10. **FR-10**: Contact form sends email notification via SendGrid to configured inbox - Acceptance: Email sent on successful submission with all form fields in body
11. **FR-11**: Contact form includes honeypot field for spam prevention - Acceptance: Submissions with non-empty honeypot field are silently rejected
12. **FR-12**: Contact API rate limits by IP - Acceptance: Excessive submissions from same IP return 429 status
13. **FR-13**: If email notification fails, submission is still persisted and error is logged - Acceptance: User receives success response; error appears in Application Insights
14. **FR-14**: Privacy page renders static content at `/privacy` - Acceptance: Page is accessible and linked from footer
15. **FR-15**: Terms page renders static content at `/terms` - Acceptance: Page is accessible and linked from footer
16. **FR-16**: Site header includes navigation: Home, Blog, Contact, and primary CTA button - Acceptance: Responsive, works on mobile with hamburger/collapse pattern
17. **FR-17**: Site footer includes links to Privacy, Terms, contact email, and social links - Acceptance: Links are functional and footer renders on all pages

### Non-Functional Requirements

- **NFR-01**: Lighthouse Performance score >= 90 (desktop)
- **NFR-02**: Lighthouse Accessibility score >= 95 (desktop)
- **NFR-03**: Lighthouse Best Practices score >= 95 (desktop)
- **NFR-04**: Lighthouse SEO score >= 95 (desktop)
- **NFR-05**: Every page has unique meta title, description, canonical URL, and OpenGraph/Twitter tags
- **NFR-06**: Blog posts include JSON-LD BlogPosting schema
- **NFR-07**: Security headers configured: HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, CSP
- **NFR-08**: No secrets exposed in client bundles; all API keys in Azure Key Vault or app settings
- **NFR-09**: Mobile-first responsive design; all pages usable on 320px+ viewports
- **NFR-10**: Keyboard navigation and focus states on all interactive elements; ARIA labels where needed
- **NFR-11**: Application Insights captures API request logs: request ID, duration, status, error codes
- **NFR-12**: robots.txt present and correctly configured

## Technical Constraints

### Tech Stack

- **Framework**: Next.js (App Router, TypeScript)
- **Styling**: Tailwind CSS
- **Content**: MDX (files in `/content/blog/`)
- **Hosting**: Azure Static Web Apps
- **API**: Azure Functions (SWA integrated)
- **Persistence**: Azure Table Storage (contact form)
- **Video Storage**: Azure Blob Storage (self-hosted MP4), optionally behind Azure CDN
- **Email**: SendGrid
- **Secrets**: Azure Key Vault (preferred) or SWA app settings
- **Observability**: Application Insights
- **CI/CD**: GitHub Actions -> Azure SWA (automatic with SWA)

### Key Architectural Decisions

1. **SWA-first with App Service fallback**: Start with Azure Static Web Apps for simplicity. If SWA constraints block required Next.js features, migrate to App Service. Keep code portable (no SWA-specific coupling).
2. **Git-based content**: Blog content lives in the repo as MDX files. No external CMS. Future extension points: Keystatic, SharePoint, or headless CMS.
3. **Persist-first contact flow**: Always save to Table Storage before attempting email. User gets success response regardless of email outcome.
4. **Spam controls without CAPTCHA**: Honeypot + rate limiting for MVP. CAPTCHA only if spam becomes a real problem.
5. **Dual video modes**: `VideoEmbed` component supports both YouTube/Vimeo embed and self-hosted MP4 from Azure Blob Storage. Mode controlled by `VIDEO_MODE` env var. MP4 served from Blob Storage with optional CDN for edge caching.

### Folder Structure

```
/app
  layout.tsx
  page.tsx              # Homepage
  /blog
    page.tsx            # Blog index
    /[slug]
      page.tsx          # Blog post
  /contact
    page.tsx            # Contact form
  /privacy
    page.tsx            # Privacy policy
  /terms
    page.tsx            # Terms of service
  sitemap.ts
  robots.ts

/content
  /blog
    2026-02-01-sample-post.mdx

/src
  /components           # React components
  /lib                  # Utility functions (blog, seo, contact)
  /styles               # Global styles

/public
  /images               # Static images, OG images
  /video                # Poster images (MP4 served from Azure Blob, not stored in repo)

staticwebapp.config.json
```

## Success Criteria

1. [ ] Homepage renders with hero, video (both embed and MP4 modes), feature blocks, and CTAs - Verify: Visual inspection + Lighthouse; test both VIDEO_MODE values
2. [ ] Blog system renders MDX posts with correct metadata and typography - Verify: At least 2 sample posts render correctly
3. [ ] Blog RSS feed validates - Verify: Run through RSS validator
4. [ ] Sitemap includes all pages and blog posts - Verify: Validate XML, check all URLs present
5. [ ] Contact form submits successfully, persists to Table Storage, sends email - Verify: End-to-end test submission
6. [ ] Spam controls work (honeypot rejects, rate limiting enforces) - Verify: Test with filled honeypot, rapid submissions
7. [ ] All pages have correct SEO metadata and OpenGraph tags - Verify: Inspect HTML head on each page
8. [ ] Lighthouse desktop scores meet targets (Perf >= 90, A11y >= 95, BP >= 95, SEO >= 95) - Verify: Run Lighthouse
9. [ ] Site deploys to Azure SWA from main branch - Verify: Successful production deployment
10. [ ] PR preview environments work - Verify: Open PR, check preview URL
11. [ ] Contact form works in production (not just local) - Verify: Submit form on deployed site
12. [ ] Security headers present in responses - Verify: Check response headers in browser dev tools
13. [ ] No secrets in client bundle - Verify: Inspect built JS output

## Dependencies

### Prerequisites

- Azure subscription with permissions to create resources
- GitHub repository (already created)
- Node.js 20+ and npm installed locally
- Azure CLI or SWA CLI for local development

### External Dependencies

- **SendGrid account**: API key for email notifications (free tier: 100 emails/day)
- **Azure Static Web Apps resource**: For hosting (created in Phase 4)
- **Azure Storage Account**: For Table Storage (contact persistence) and Blob Storage (video assets) - created in Phase 4
- **Azure Key Vault** (optional): For secret management
- **Application Insights resource**: For observability (created in Phase 4)
- **Custom domain + DNS** (optional for MVP): Can use SWA default domain initially

## Owner Clarifications

| Topic | Question | Answer | Impact |
|-------|----------|--------|--------|
| Email provider | Which provider for contact notifications? | SendGrid | Use `@sendgrid/mail` SDK; store API key in Key Vault |
| Styling | Tailwind CSS or CSS Modules? | Tailwind CSS | Use `tailwindcss` with Next.js; utility-first approach |
| Optional scope | Which optional features to include? | Privacy + Terms pages only | Add /privacy and /terms routes; defer pagination and related posts |
| Video scope | Include MP4/Blob Storage in MVP? | Yes - building intro video for first release | Implement both embed and MP4 modes; provision Azure Blob Storage in Phase 4 |

## Assumptions

- **Video storage**: MP4 files uploaded to Azure Blob Storage manually (no upload UI). Blob container configured with public read access or SAS tokens. Optional Azure CDN for performance but not required for MVP launch.
- **Email failure behavior**: Return `ok: true` to user when email fails but submission is persisted. Log error to Application Insights. User doesn't need to know email failed.
- **Analytics**: Add basic Application Insights client telemetry. No custom event tracking beyond API logs.
- **OG images**: Use a static placeholder OG image per page type (homepage, blog post, contact). Replace with branded assets when available. Dynamic OG generation deferred.
- **Blog content**: Ship with 2 sample/placeholder MDX posts for testing. Real content added later.
- **Contact form "reason" field**: Implement as an optional dropdown with values: Demo, Partnership, Support, Other.
- **Rate limiting**: Default to 5 submissions per minute per IP. Configurable via `RATE_LIMIT_PER_MINUTE` env var.
- **Privacy/Terms content**: Placeholder text initially; real legal content added later.

## Unresolved Questions

- [ ] Does Spaarke have existing brand assets (logo, colors, fonts) to use? - Blocks: Visual design/styling decisions in Phase 0
- [ ] What is the SendGrid "from" email address? - Blocks: Email implementation in Phase 3 (can use placeholder initially)
- [ ] Are there specific social media links for the footer? - Blocks: Footer implementation in Phase 0 (can add placeholder links)
- [ ] Is there an intro video ready (MP4 file or YouTube/Vimeo URL)? - Blocks: Video section in Phase 2 (can use placeholder)
- [ ] Custom domain name for the site? - Blocks: DNS configuration in Phase 4 (can deploy to SWA default domain initially)

---

*AI-optimized specification. Original design: design.md*
