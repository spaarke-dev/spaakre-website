# Spaarke Marketing Website (Next.js on Azure) — design.md

**Purpose:** Implementation-grade design for Claude Code to scaffold and build Spaarke’s marketing website MVP.

**Status:** Draft (v1)  
**Last updated:** 2026-02-05  
**Source of truth for blog:** GitHub (MDX-in-repo)

---

## 1) Executive summary

Build a simple, SEO-friendly marketing website using **Next.js (TypeScript)** deployed to **Azure Static Web Apps** with a lightweight serverless API for the contact form. Blog/articles will be **Git-based** (content stored in the repository) and can be extended later (e.g., Keystatic, SharePoint, or headless CMS) without re-architecting.

**MVP features**
1. Homepage with intro video + positioning + CTA
2. Blog/Articles (GitHub-based content)
3. Contact form (email notification + submission persistence; no CRM)

---

## 2) Goals and non-goals

### 2.1 Goals
- Ship fast with minimal operational overhead.
- Strong SEO + social previews (OpenGraph/Twitter).
- Git-based content workflow (PR-based).
- Secure contact form with spam controls and reliable persistence.
- Azure-first architecture; third-party services optional.

### 2.2 Non-goals (v1)
- No CRM/sales system integration (HubSpot/Salesforce/etc.).
- No user accounts, logins, paid tiers, or gated content.
- No marketing automation (drip, segmentation).
- No complex analytics/attribution system (basic analytics optional).
- No multi-language/i18n (unless explicitly added later).

---

## 3) Requirements

### 3.1 Functional requirements

#### Pages
- `/` Home
  - Hero + value prop
  - Intro video section
  - Feature/value blocks (3–5)
  - CTA(s): “Request demo” / “Contact”
- `/blog` Blog index
  - List of posts with tags
  - Optional: pagination
- `/blog/[slug]` Blog post
  - MDX rendering + typography
  - Metadata: title, description, date, author, tags
  - Social preview metadata
- `/contact` Contact
  - Form + success/error states
- Optional: `/privacy`, `/terms`

#### Intro video
Support two modes:
- **Mode A (default):** YouTube/Vimeo embed
- **Mode B (Azure):** MP4 hosted in Azure Blob Storage, optionally behind Front Door/CDN

Constraints:
- Responsive sizing
- Lazy-load
- Poster image
- Must not significantly degrade LCP

#### Blog/articles (GitHub-based)
- Source of truth: `/content/blog/*.mdx`
- Required frontmatter:
  - `title` (string)
  - `description` (string)
  - `date` (ISO string)
  - `author` (string)
  - `tags` (string[])
  - `draft` (boolean, default false)
  - `heroImage` (string path, optional)
- Capabilities:
  - RSS: `/blog/rss.xml`
  - Sitemap includes posts
  - Optional: related posts by tag overlap

#### Contact form
Fields:
- Name (required)
- Email (required)
- Company (optional)
- Message (required)
- Reason (optional enum: Demo | Partnership | Support | Other)

Behavior:
- Client-side validation + server-side validation
- Spam controls:
  - Honeypot
  - Rate limiting per IP
  - Optional CAPTCHA (defer until spam appears)
- On submit:
  1. Persist submission (append-only)
  2. Send notification email to configured inbox
  3. Return success response

No CRM integration in v1.

---

### 3.2 Non-functional requirements
- Lighthouse targets (desktop):
  - Performance ≥ 90
  - Accessibility ≥ 95
  - Best Practices ≥ 95
  - SEO ≥ 95
- SEO:
  - per-page metadata + canonical
  - OpenGraph/Twitter tags
  - `sitemap.xml` + `robots.txt`
  - JSON-LD for BlogPosting
- Security:
  - server-side validation
  - rate limit
  - security headers (CSP/HSTS/etc.)
  - secrets not exposed to client
- Reliability:
  - If email fails, submission must still be saved and error logged

---

## 4) Architecture

### 4.1 Recommended baseline
- **Frontend:** Next.js (TypeScript), App Router
- **Hosting:** Azure Static Web Apps (SWA)
- **API:** Azure Functions integrated with SWA (recommended)
- **Persistence:** Azure Storage (Table or Blob append log)
- **Secrets:** Azure Key Vault (preferred) + app settings
- **Observability:** Application Insights

### 4.2 Hosting decision (with fallback)

**Option A — Azure Static Web Apps (SWA)**
- Pros: global static hosting, easy GitHub CI/CD, PR preview environments, low ops
- Cons: platform constraints may appear depending on Next.js features (treat as “supported but evolving”)

**Option B — Azure App Service (fallback)**
- Pros: full Node runtime compatibility for all Next.js features
- Cons: higher ops/cost vs SWA, but still straightforward

**Decision for MVP:** Start with SWA. If platform constraints block required features, migrate to App Service without major code changes.

---

## 5) Azure services

### 5.1 Required (MVP)
1. **Azure Static Web Apps**
   - Prod from `main`
   - Preview per PR
2. **Azure DNS** (or external DNS) for custom domain
3. **Azure Key Vault**
   - email provider API key (if using SendGrid/Postmark/ACS Email)
4. **Application Insights**
   - API logs + basic app telemetry
5. **Azure Storage Account**
   - contact submission persistence
   - optional: video assets (Mode B)

### 5.2 Optional
- **Azure Front Door** (WAF, caching, single edge entry)
- **Azure CDN** (if serving large media from Blob without Front Door)

---

## 6) Third-party services (optional; no CRM)

### 6.1 Video
- YouTube or Vimeo (embed) — recommended for v1 speed

### 6.2 Email notifications (pick one)
- SendGrid
- Postmark
- Azure Communication Services Email

---

## 7) Content system (GitHub-based)

### 7.1 Baseline (MVP): MDX-in-repo
- Authors create/edit MDX via GitHub PRs
- Zero additional infrastructure
- Recommended: keep images in `/public/images/blog` and reference them in MDX

### 7.2 Future extension points (no action in MVP)
- Keystatic (GitHub-backed editing UI)
- SharePoint Online list/pages as a “headless” content source
- Traditional headless CMS (Strapi/Directus) if needed

---

## 8) UX / UI requirements

### 8.1 Global
- Clean, minimal, modern aesthetic
- Mobile-first responsive design
- Accessibility: keyboard navigation, focus states, ARIA labels

### 8.2 Navigation
Header:
- Product (or Platform)
- Blog
- Contact
- Optional: Company
- Primary CTA button (Contact)

Footer:
- Privacy / Terms (optional)
- Contact email
- Social links

---

## 9) Component requirements (implementation inventory)

### 9.1 Layout / Shell
- `SiteHeader`
- `SiteFooter`
- `Container`
- `Prose` (MDX typography wrapper)

### 9.2 Homepage components
- `Hero`
- `VideoEmbed`
  - supports: `mode="embed" | "mp4"`
  - props:
    - `embedUrl` (YouTube/Vimeo)
    - `mp4Url` + `posterUrl`
- `FeatureGrid`
- `CallToAction`

### 9.3 Blog components
- `PostCard`
- `TagPills`
- `PostHeader`
- `MDXRenderer`
- `RelatedPosts` (optional)

### 9.4 Contact components
- `ContactForm`
- `FormField` (input/textarea)
- `InlineAlert` / `Toast` for feedback

---

## 10) Data + APIs

### 10.1 Contact API endpoint
**Endpoint:** `POST /api/contact`

Request body:
```json
{
  "name": "string",
  "email": "string",
  "company": "string | null",
  "message": "string",
  "reason": "Demo | Partnership | Support | Other | null",
  "hp": "string | null"
}
```

Response:
```json
{ "ok": true }
```

Error response:
```json
{ "ok": false, "error": "VALIDATION_ERROR | RATE_LIMITED | INTERNAL_ERROR" }
```

### 10.2 Validation rules
- `name`: 1–100 chars
- `email`: valid format, 3–254 chars
- `message`: 1–5000 chars
- `hp` honeypot: must be empty
- Normalize/trim inputs

### 10.3 Persistence (Azure Storage)
Choose one:

**Option A (recommended): Table Storage**
- PartitionKey: `contact`
- RowKey: `{timestamp}-{random}`
- Fields: name, email, company, reason, message, userAgent, ipHash, createdAt

**Option B: Blob append log**
- Append JSON lines to a blob; simpler but harder to query.

Decision: Table Storage unless cost/complexity pushes to Blob append.

### 10.4 Email notification
- Trigger after successful persistence write
- Subject: `[Spaarke] New website inquiry — {reason}`
- Body: all fields + timestamp
- If email fails:
  - log error to App Insights
  - keep submission persisted
  - return `ok: true` (or `ok: true` with warning; decide)

---

## 11) Security requirements

### 11.1 Spam controls
- Honeypot field
- Rate limit by IP (and/or IP hash)
- Optional CAPTCHA later

### 11.2 Security headers
Configure at host level (SWA/App Service):
- HSTS
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy
- CSP (start permissive; tighten after assets known)

### 11.3 Secrets
- Never ship secrets in client bundles
- Store provider keys in Key Vault (preferred) or app settings

---

## 12) SEO requirements

- Per-page metadata
- OpenGraph + Twitter card tags
- Canonical URLs
- `sitemap.xml`
- `robots.txt`
- Blog post JSON-LD schema
- OG image strategy:
  - MVP: static OG image per page/post
  - Later: dynamic OG generation

---

## 13) Observability

- Application Insights for API logging:
  - request id, duration, status, error code
- Metrics:
  - contact submissions/day
  - error rate on `/api/contact`
  - P95 latency
- Optional alerts:
  - high 5xx rate
  - email provider failures

---

## 14) DevOps

### 14.1 Repo strategy
Preferred: dedicated repo `spaarke-marketing` (or `apps/marketing` in monorepo)

### 14.2 CI/CD
- GitHub → Azure Static Web Apps
- PR previews enabled
- Required checks:
  - lint
  - typecheck
  - tests (basic)

### 14.3 Environments
- `main` → production
- PR → preview
- optional `develop` → staging

---

## 15) Implementation details

### 15.1 Tech stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS (recommended for MVP speed) OR CSS Modules
- MDX for blog posts

### 15.2 Suggested folder structure
```
/app
  layout.tsx
  page.tsx
  /blog
    page.tsx
    /[slug]
      page.tsx
  /contact
    page.tsx
  sitemap.ts
  robots.ts

/content
  /blog
    2026-02-01-sample-post.mdx

/src
  /components
  /lib
    blog.ts
    seo.ts
    contact.ts
  /styles

/public
  /images
  /video (posters only; avoid large binaries unless needed)

staticwebapp.config.json
```

### 15.3 Scripts
- `dev`
- `build`
- `start`
- `lint`
- `typecheck`
- `test` (optional)
- `format` (optional)

---

## 16) Delivery plan (Claude Code execution order)

### Phase 0 — Scaffold and shell
- Scaffold Next.js App Router + TS
- Add styling system (Tailwind recommended)
- Implement header/footer/layout
- Create pages: `/`, `/blog`, `/contact` with placeholders

**Acceptance**
- Runs locally
- Responsive nav and footer
- Clean baseline layout

### Phase 1 — Blog system (MDX)
- Implement MDX loading and post routing
- `/blog` list + tags
- `/blog/[slug]` render with typography
- Add metadata + OG tags + JSON-LD
- Add RSS + sitemap

**Acceptance**
- At least 2 posts render correctly
- sitemap includes posts
- RSS validates

### Phase 2 — Video section
- Implement `VideoEmbed` with embed mode default
- Support MP4 mode behind config
- Ensure lazy load + poster

**Acceptance**
- Responsive
- Does not block initial render significantly

### Phase 3 — Contact form + API
- Build form UI + validation
- Implement `/api/contact`
- Persist to Storage
- Send email notification
- Add honeypot + rate limit

**Acceptance**
- Successful submission is saved + email sent
- Spam controls work
- Errors logged to App Insights

### Phase 4 — Azure deployment
- Create SWA resource and link repo
- Configure env vars + Key Vault secrets
- Custom domain + TLS
- Enable App Insights

**Acceptance**
- Production deploy works
- PR previews work
- Contact form works in production

---

## 17) Configuration (env vars)

- `SITE_URL`
- `VIDEO_MODE` = `embed|mp4`
- `VIDEO_EMBED_URL`
- `VIDEO_MP4_URL` (optional)
- `VIDEO_POSTER_URL` (optional)

Contact:
- `CONTACT_EMAIL_TO`
- `EMAIL_PROVIDER` = `sendgrid|postmark|acs_email`
- `EMAIL_PROVIDER_API_KEY` (secret)
- `STORAGE_ACCOUNT_CONNECTION` (secret) OR managed identity configuration
- `RATE_LIMIT_PER_MINUTE`

---

## 18) Risks and mitigations

- **SWA Next.js feature constraints**
  - Mitigation: keep code portable to App Service; avoid platform-specific coupling.
- **Spam on contact form**
  - Mitigation: honeypot + rate limiting; add CAPTCHA only if needed.
- **Email deliverability**
  - Mitigation: reputable provider + monitoring; persist first, email second.

---

## 19) Claude Code instructions (what to produce)

Claude Code must produce:
- A working Next.js site implementing pages/components above
- MDX blog system with SEO + RSS + sitemap
- Contact endpoint with persistence + email notification + spam controls
- Azure-ready configuration files:
  - `staticwebapp.config.json`
  - environment variable list in README
- Minimal README with:
  - local run steps
  - deployment steps
  - how to add a blog post
  - how contact submissions are stored/monitored
