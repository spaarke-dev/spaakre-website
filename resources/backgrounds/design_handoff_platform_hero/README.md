# Handoff: Platform page hero

## Overview
Hero section for a new "Platform" page on the Spaarke marketing site. Pairs a static dark headline ("One platform. / All sides. / Every matter.") on the left with an animated **isometric tile scroller** as a decorative backdrop, biased toward the upper-right. The scroller cycles through nine light-mode product screenshots at a fixed 3D rotation, scrolling infinitely on three parallax bands.

## About the design files
The files in this bundle are **design references created in HTML+JSX** (React loaded inline via Babel-Standalone, no build step). They are prototypes showing the intended look, layout, and motion — not production code to copy verbatim.

The job is to **recreate this design in your live website's existing environment** (likely Next.js / a real React app with bundling), using its established patterns, design tokens, and component conventions. Treat the JSX in this bundle as a faithful spec for structure, styling, and behavior — port the markup and CSS, then wire it into the codebase's normal asset pipeline, font system, and routing.

## Fidelity
**High-fidelity.** Final colors, type, spacing, and motion. Recreate pixel-for-pixel.

## Files in this bundle
| File | Purpose |
|---|---|
| `platform.html` | Entry point. Loads React + Babel inline, mounts the page. Use as a visual reference; not the production shell. |
| `PlatformHeroV2.jsx` | The hero section component. **Primary deliverable.** |
| `IsometricScrollerV2.jsx` | The animated 3D tile scroller used as the hero backdrop. **Primary deliverable.** |
| `SiteHeaderV2.jsx` | Sticky dark header. Already exists on the home page; reuse. |
| `NotificationBarV2.jsx` | Top "Now accepting early access partners" bar. Already exists; reuse. |
| `FooterV2.jsx` | Footer. Already exists; reuse. |
| `v2.css` | Design tokens (colors, type, spacing) used across the v2 site. |
| `brand/colors_and_type.css` | Canonical brand variables imported by `v2.css`. |
| `brand/spaarke-logo-white.svg` | Header logo. |
| `assets/*.png` | Product screenshots used by the scroller (light theme only). |

---

## Layout

### Section
- **Component:** `<PlatformHeroV2 />`
- **Background:** `#f6f6f4` (warm off-white)
- **Min-height:** `clamp(580px, 82vh, 880px)`
- **Stacking:** `position: relative; isolation: isolate; overflow: hidden;`
- Two layered children: animated backdrop (z-index 0) + foreground content (z-index 2).

### Foreground (headline)
- Top-aligned (`align-items: flex-start`) inside a flex column.
- Padding: `clamp(48px, 7vh, 112px)` top, `clamp(60px, 9vh, 120px)` bottom, horizontal `--v2-pad-x` (`clamp(24px, 6vw, 120px)`).
- Single `<h1>` with hard line-breaks:
  ```
  One platform.
  All sides.
  Every matter.
  ```
- **Type:**
  - font-family: `Inter Tight` (var `--v2-display`)
  - font-size: `clamp(56px, 7vw, 112px)`
  - font-weight: 600
  - line-height: 0.98
  - letter-spacing: -0.025em
  - color: `#0a0a0a`
  - max-width: `14ch`

### Backdrop (animated scroller)
- Wrapped in `<div style="position:absolute; inset:0; z-index:0;">`.
- Inner: `<IsometricScrollerV2 theme="light" height="100%" anchor="top-right" />`
- A **left-edge wash** sits over the scroller to keep the headline readable:
  ```css
  background: linear-gradient(90deg,
    #f6f6f4 0%,
    rgba(246,246,244,0.9) 18%,
    rgba(246,246,244,0.4) 38%,
    rgba(246,246,244,0) 58%);
  ```

---

## The isometric scroller

The scroller is the decorative engine. It builds three horizontal bands of product-screenshot tiles, then tilts the whole stage with a 3D rotation matrix to give it the isometric / floating-cards feel.

### Visual recipe
- 3D transform on the stage: `perspective(1400px) rotateX(38deg) rotateZ(18deg) scale(1.18)`
- Three rows, each a flex row with `gap: 80px`, looping infinitely via CSS keyframe `translateX 0 → -50%` (the tile array is doubled so the loop is seamless).
- Row speeds (parallax):
  - Row 1 (`iso-row-l`): 60s left-scrolling
  - Row 2 (`iso-row-r`): 75s right-scrolling
  - Row 3 (`iso-row-l`, `speedMod=0.85`): ~51s left-scrolling
- Two overlay layers stacked above the rows:
  - **Bloom**: `radial-gradient(40% 50% at 50% 60%, rgba(78,108,255,0.10), transparent 70%)` — cool blue/purple wash.
  - **Vignette**: `radial-gradient(60% 70% at 50% 50%, rgba(246,246,244,0) 0%, rgba(246,246,244,0.55) 60%, rgba(246,246,244,0.85) 100%)` — fades edges to bg.

### `anchor` prop
Controls where the iso-stage's bounding box sits inside its container:
- `center` (default) — `inset: -10% -10%`, content centered.
- `top` — `top: -55%; bottom: 35%;` — content biased upward.
- `top-right` — `top: -35%; bottom: 15%; left: 5%; right: -25%; transform-origin: 70% 50%;` — content biased upper-right. **Used by the platform hero.**

### Tiles (light theme)
The scroller cycles through 9 product screenshots, distributed across the three rows:
- Row 1: `workspace-light.png`, `screen-matter-record.png`, `screen-document-intelligence.png`
- Row 2: `screen-ai-workflows.png`, `screen-performance.png`, `screen-outside-counsel.png`
- Row 3: `screen-workspace-v2.png`, `screen-corporate-workspace.png`, `screen-external-access.png`

(There's a 10th asset, `screen-ai-playbook.png`, included for future use; the source defines a `LIGHT_SCREENS` pool of 10 and indexes `ws(0)..ws(8)`.)

Each tile:
- width: 720px
- height: ~62% of width (`Math.round(t.w * 0.62)` ≈ 446px)
- light-mode chrome: white background, 14px radius, 1px hairline border, layered drop shadow.

### Tile chrome CSS
```css
.iso-tile-light.workspace {
  border-radius: 14px;
  overflow: hidden;
  background: #ffffff;
  box-shadow:
    0 24px 60px -18px rgba(20,24,40,0.22),
    0 2px 6px -2px rgba(20,24,40,0.10),
    0 0 0 1px rgba(20,24,40,0.06);
}
```

### IMPORTANT: do **not** lazy-load tile images
The 3D transform pushes most tile bounding boxes off-screen, so `loading="lazy"` causes the browser to defer decode indefinitely → empty backdrop. The component intentionally omits `loading="lazy"`. Keep that.

---

## Colors
| Token | Value | Used for |
|---|---|---|
| `--v2-bg` | `#0a0a0a` | Site background (header, footer) |
| Section bg (this hero) | `#f6f6f4` | Hero surface |
| Headline | `#0a0a0a` | "One platform…" copy |
| `--v2-line` | `rgba(255,255,255,0.08)` | Header bottom border |
| `--v2-fg-mid` | `rgba(245,245,245,0.66)` | Header link rest state |
| `--v2-fg` | `#f5f5f5` | Header link hover |
| Bloom | `rgba(78,108,255,0.10)` | Blue/purple bloom under tiles |
| Vignette | `rgba(246,246,244, 0 → .85)` | Fade tiles into bg at edges |
| Left wash | `#f6f6f4` → `rgba(246,246,244,0)` | Behind headline |

## Typography
| Role | Family | Weight | Size | Letter-spacing | Line-height |
|---|---|---|---|---|---|
| H1 (hero) | Inter Tight | 600 | clamp(56px, 7vw, 112px) | -0.025em | 0.98 |
| Body / nav | Inter | 400/500 | 14–16px | -0.005em | 1.55 |
| Mono | JetBrains Mono | 400 | 11–13px | 0.16em (eyebrows) | — |

Fonts loaded via Google Fonts in `v2.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap');
```

## Spacing
- Horizontal page padding: `clamp(24px, 6vw, 120px)` (`--v2-pad-x`)
- Hero vertical padding: `clamp(48px, 7vh, 112px)` top / `clamp(60px, 9vh, 120px)` bottom

## Motion
- Tile rows: linear infinite scroll, `translate3d(0,0,0) ↔ translate3d(-50%,0,0)` over 60s/75s/~51s. Pure CSS keyframe — no JS frame loop.
- Respect `prefers-reduced-motion`: in production, gate the animation via `@media (prefers-reduced-motion: reduce) { .iso-row { animation: none; } }`. Not yet implemented in the prototype — add it when porting.
- All `transform: will-change: transform;` to keep rows on the compositor.

---

## Page composition (what `platform.html` renders)
```jsx
<div data-screen-label="Platform — page">
  {showBar && <NotificationBarV2 onDismiss={…} />}
  <SiteHeaderV2 />
  <PlatformHeroV2 />
  <FooterV2 />
</div>
```
- `NotificationBarV2` is dismissable; state is component-local.
- `SiteHeaderV2` "Platform" link points to `platform.html` (replace with your route in production, e.g. `/platform`).
- The home page (`index.html`, not in this bundle) lives at `/`. The header logo links back to `index.html`.

## Navigation hook-up
- The home-page header already includes `Platform | Why Spaarke | Insights` links. Wire `Platform` to your new platform route.

## Assets
All product screenshots are existing Spaarke product UI captures (light mode). They're committed to this bundle; in production they should live in your CDN / public assets folder. File names are referenced as `assets/<name>.png` from `IsometricScrollerV2.jsx` — adjust to your asset path conventions.

The `spaarke-logo-white.svg` ships with this bundle; it's the same logo used elsewhere on the site.

## Notes for the implementer
1. **Build step.** This prototype loads React via CDN + Babel-Standalone for fast iteration. In your real codebase, port these as proper React components (TS or JS, whatever your stack uses) and let your bundler handle JSX.
2. **Inline styles vs. CSS.** Component-level styles in the prototypes use inline `style={…}` for portability. If your codebase uses CSS Modules, Tailwind, styled-components, etc., translate to that idiom. The `iso-*` classes are defined inside a `<style>{}` block in `IsometricScrollerV2.jsx` — extract those into your CSS pipeline.
3. **Fonts.** The prototype imports Google Fonts directly. Use whatever font-loading strategy the site already has (next/font, self-hosted, etc.).
4. **Reduced motion.** Add a `prefers-reduced-motion` guard to disable the scroll animation.
5. **Image performance.** Don't add `loading="lazy"` to tile images (see warning above). Consider responsive `srcset` if your screenshots are very large.
6. **Z-stacking.** The hero's `isolation: isolate` keeps its stacking context contained — preserve this when porting so the absolute backdrop doesn't bleed through siblings.

## Open questions for product / design
- Should this hero include a CTA button under the headline (e.g., "Request access")? Currently no CTA.
- Is the screenshot pool fixed, or should it be content-managed?
- Do we want the same backdrop on a smaller mobile breakpoint, or hide the scroller below ~768px?
