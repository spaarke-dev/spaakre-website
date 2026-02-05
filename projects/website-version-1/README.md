# Spaarke Marketing Website (v1)

> **Status**: In Progress
> **Started**: 2026-02-05
> **Phase**: 0 - Scaffold and Shell
> **Progress**: 0%

## Overview

Simple, SEO-friendly marketing website for Spaarke built with Next.js (TypeScript) and deployed to Azure Static Web Apps. MVP delivers a homepage with intro video, a Git-based blog (MDX), and a contact form with email notifications.

## Tech Stack

- **Framework**: Next.js (App Router, TypeScript)
- **Styling**: Tailwind CSS
- **Content**: MDX (Git-based blog)
- **Hosting**: Azure Static Web Apps
- **API**: Azure Functions (SWA integrated)
- **Storage**: Azure Table Storage (contacts) + Blob Storage (video)
- **Email**: SendGrid
- **Observability**: Application Insights

## Local Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build
npm run build

# Lint
npm run lint

# Type check
npm run typecheck
```

## Environment Variables

Create `.env.local` for local development:

```env
SITE_URL=http://localhost:3000
VIDEO_MODE=embed
VIDEO_EMBED_URL=https://www.youtube.com/embed/YOUR_VIDEO_ID
VIDEO_MP4_URL=
VIDEO_POSTER_URL=
CONTACT_EMAIL_TO=hello@spaarke.com
EMAIL_PROVIDER=sendgrid
SENDGRID_API_KEY=your-key-here
STORAGE_ACCOUNT_CONNECTION=your-connection-string
RATE_LIMIT_PER_MINUTE=5
```

## Deployment

Site deploys automatically via Azure Static Web Apps:
- `main` branch -> production
- Pull requests -> preview environments

Azure resources required:
1. Azure Static Web Apps (hosting)
2. Azure Storage Account (Table Storage + Blob Storage)
3. SendGrid account (email notifications)
4. Application Insights (observability)
5. Azure Key Vault (optional, for secrets)

## Adding a Blog Post

1. Create a new `.mdx` file in `/content/blog/`
2. Add required frontmatter:
   ```yaml
   ---
   title: "Your Post Title"
   description: "Brief description for SEO"
   date: "2026-02-05"
   author: "Author Name"
   tags: ["tag1", "tag2"]
   draft: false
   heroImage: "/images/blog/your-image.jpg"  # optional
   ---
   ```
3. Write content in MDX (Markdown + JSX)
4. Create a PR - preview will be available automatically
5. Merge to `main` to publish

## Contact Form Submissions

Submissions are persisted to Azure Table Storage:
- **Table**: `ContactSubmissions`
- **Fields**: name, email, company, reason, message, timestamp, IP hash
- **Monitoring**: Application Insights logs all API requests

Email notifications sent via SendGrid to the configured `CONTACT_EMAIL_TO` address.

## Project Links

- [Implementation Plan](plan.md)
- [Specification](spec.md)
- [Original Design](design.md)
- [Task Index](tasks/TASK-INDEX.md)
