// PlatformHeroV2.jsx — Platform page hero.
// Headline (dark) anchored on the left, animated isometric scroller fills
// the right half of the section as a decorative backdrop.

function PlatformHeroV2() {
  return (
    <section
      style={{
        position: 'relative',
        background: '#f6f6f4',
        overflow: 'hidden',
        isolation: 'isolate',
        minHeight: 'clamp(580px, 82vh, 880px)'
      }}
    >
      {/* Animated background — fills the entire hero section, with content
          biased toward the upper-right via the scroller's anchor prop. */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0
        }}
      >
        <IsometricScrollerV2 theme="light" height="100%" anchor="top-right" />
        {/* Soft fade on the LEFT edge so the scroller dissolves into the
            page rather than ending at a hard line behind the headline. */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, #f6f6f4 0%, rgba(246,246,244,0.9) 18%, rgba(246,246,244,0.4) 38%, rgba(246,246,244,0) 58%)',
            pointerEvents: 'none'
          }}
        />
      </div>

      {/* Foreground content */}
      <div
        className="v2-shell"
        style={{
          position: 'relative',
          zIndex: 2,
          paddingTop: 'clamp(48px, 7vh, 112px)',
          paddingBottom: 'clamp(60px, 9vh, 120px)',
          minHeight: 'inherit',
          display: 'flex',
          alignItems: 'flex-start'
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--v2-display)',
            fontSize: 'clamp(56px, 7vw, 112px)',
            lineHeight: 0.98,
            letterSpacing: '-0.025em',
            fontWeight: 600,
            color: '#0a0a0a',
            margin: 0,
            maxWidth: '14ch'
          }}
        >
          One platform.<br/>
          All sides.<br/>
          Every matter.
        </h1>
      </div>
    </section>
  );
}

window.PlatformHeroV2 = PlatformHeroV2;
