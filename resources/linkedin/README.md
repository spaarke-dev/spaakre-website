# Spaarke LinkedIn brand assets

Two banner designs for the Spaarke LinkedIn **Company Page**, sized to
the native LinkedIn company-page banner spec and built from the same
design system as [spaarke.com](https://spaarke.com).

| File | Theme | Use when |
|---|---|---|
| `banner-dark.svg` | Dark (`#0a0a0a`) | Default. Matches the website's primary dark palette. |
| `banner-light.svg` | Light (`#f6f6f4`) | Optional alt — matches the cream Section 3 / Capabilities slab on the website. |

## Dimensions

- **Native canvas:** 1128 × 191 px (LinkedIn Company Page banner)
- **Aspect:** ~5.9 : 1
- **Resolution-independent:** the SVGs use a `viewBox`, so they scale up cleanly. Render at 2× (2256 × 382) for retina displays.

> LinkedIn personal profile banners are 1584 × 396 (4 : 1) — that's a different aspect than this. If you ever need a personal-profile banner, treat these as design references and rebuild on the 4 : 1 canvas.

## Profile-circle vs banner — the laser question

You asked whether the laser belongs in both the profile circle and the
banner. Recommendation: **don't repeat it.**

- **Profile circle:** the laser mark is iconic and instantly recognizable at small sizes — that's where it earns its keep.
- **Banner:** carry the **wordmark** ("spaarke") plus the category headline. Wordmark + headline is more discoverable in feed previews and avoids visual redundancy when the profile circle overlaps the banner.

These banners follow that recommendation — wordmark on the right, no
laser. If you ever want a more decorative version, the laser PNG sits at
`resources/hero/laser-logo.png`.

## Design system applied

| Token | Dark banner | Light banner |
|---|---|---|
| Background | `#0a0a0a` | `#f6f6f4` |
| Headline | `#f5f5f5` Inter Tight 500, -0.025em | `#0a0a0a` Inter Tight 500, -0.025em |
| Accent ("Intelligence.") | `#5078DC` (cta-blue / hero glow) | `#4060DC` (cta-blue, slightly deeper for AA contrast on cream) |
| Subhead | `rgba(245, 245, 245, 0.70)` Inter 400 | `rgba(10, 10, 10, 0.62)` Inter 400 |
| Glow | Soft white-blue radial at center-right (matches home hero) | Cool blue wash, lower intensity |
| Wordmark | Inlined from `public/brand/logos/spaarke-white-word-logo.svg` | Inlined from `resources/logos/spaarke-black-word-logo.svg` |

Headline is `Legal Operations Intelligence.` — the canonical category
phrase from the brand vocabulary (per the home-page creative brief
v1.4). The period is intentional and matches the home hero treatment.
"Intelligence." is the only colored word; if you'd rather keep the
headline pure white/black, swap `class="accent"` to `class="headline"`
on the `<tspan>` in the SVG.

## Rendering to PNG

LinkedIn requires PNG/JPG upload. Pick one of these paths:

### Option 1 — Browser screenshot (no tooling)

1. Open `banner-dark.svg` (or `-light.svg`) in Chrome/Safari/Firefox.
2. The `@import` for Inter Tight loads automatically.
3. Resize the window to 1128 × 191 (or 2256 × 382 for 2×) and take a screenshot of the page.
4. Crop to the SVG bounds in any image tool.

### Option 2 — One-line CLI

If you have ImageMagick or Inkscape installed:

```bash
# ImageMagick (decent for non-text SVGs; web-fonts may fall back)
magick -density 300 -background none banner-dark.svg banner-dark.png

# Inkscape (best for typography because it understands the @import font-face)
inkscape --export-type=png --export-width=2256 banner-dark.svg
```

If the rendered output uses a fallback font (Helvetica) instead of
Inter Tight, install Inter Tight locally or use Option 3.

### Option 3 — Headless Chrome (most reliable for typography)

```bash
# requires Node 20+; one-time install:
npx -y playwright install chromium

# then:
npx -y playwright screenshot --viewport-size=1128,191 \
  --full-page resources/linkedin/banner-dark.svg \
  resources/linkedin/banner-dark.png
```

Headless Chrome respects the SVG's web-font import, so the rendered PNG
has Inter Tight pixel-perfect.

## Other LinkedIn surfaces you'll want later

| Surface | Spec | Notes |
|---|---|---|
| Company logo (square) | 300 × 300 px | Use the laser-on-dark profile mark you already have. |
| Company tagline | 120 chars | Suggest "The shared platform for legal — built on Microsoft 365." (matches the website footer positioning) |
| Personal profile banner | 1584 × 396 (4 : 1) | Different aspect; rebuild on the wider canvas if/when needed. |
| Sponsored ad creative | 1200 × 627 | Different aspect; rebuild for ads. |

## Editing

- The headline and subhead live as `<text>` elements at the top of each SVG — edit them directly.
- The wordmark is a nested `<svg>` block; don't edit the path data, but you can change `width`/`height`/`x`/`y` to reposition or resize.
- The radial glow lives in `<defs>` as `id="hero-glow"` — adjust `cx` / stop colors to push the glow left/right or change its intensity.
