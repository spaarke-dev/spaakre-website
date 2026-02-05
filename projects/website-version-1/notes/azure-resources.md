# Azure Resource Inventory

> **Status**: Pending provisioning
> **Script**: `infra/provision.sh`

## Resources

| Resource | Name | Type | Notes |
|----------|------|------|-------|
| Resource Group | `rg-spaarke-website` | Resource Group | East US 2 |
| Storage Account | `stspaarkewebsite` | StorageV2, Standard_LRS | Table + Blob |
| Blob Container | `videos` | Public read (blob) | For MP4 video hosting |
| Table | `ContactSubmissions` | Table Storage | Contact form persistence |
| App Insights | `appi-spaarke-website` | Web, Application Insights | API observability |
| Static Web App | (TBD) | Azure SWA Free tier | Linked to GitHub repo |

## Environment Variables

| Variable | Source | Type |
|----------|--------|------|
| `SITE_URL` | Manual | Config |
| `VIDEO_MODE` | Manual | Config |
| `VIDEO_EMBED_URL` | Manual | Config |
| `VIDEO_MP4_URL` | Blob Storage URL | Config |
| `VIDEO_POSTER_URL` | Blob Storage URL | Config |
| `CONTACT_EMAIL_TO` | Manual | Config |
| `SENDGRID_API_KEY` | SendGrid | Secret |
| `SENDGRID_FROM_EMAIL` | Manual | Config |
| `STORAGE_ACCOUNT_CONNECTION` | Storage Account | Secret |
| `RATE_LIMIT_PER_MINUTE` | Manual (default: 5) | Config |
| `APPLICATIONINSIGHTS_CONNECTION_STRING` | App Insights | Secret |

## Connection Strings

> **DO NOT** store connection strings or API keys in this file.
> Store them in `.env.local` (local dev) or SWA app settings (production).
