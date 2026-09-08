// IsometricScrollerV2.jsx — animated decorative background.
// Renders a 3D-isometric tile bar (workspace screenshot + 6 Microsoft app
// logos) that scrolls infinitely across the section. Used as a section
// backdrop, with content layered on top.
//
// Pure CSS animation — no JS frame loop. Two duplicated tile rows scroll
// in opposite directions for parallax. The whole stage is tilted with a
// 3D rotation matrix to give it the isometric feel.

function IsometricScrollerV2({
  height = 'clamp(420px, 60vh, 720px)',
  background,
  theme = 'dark',
  tilt = true,
  anchor = 'center'   // 'center' | 'top' | 'top-right'
}) {
  const isLight = theme === 'light';
  const bg = background || (isLight ? '#f6f6f4' : '#0a0a0c');
  // Vignette + bloom colors tuned to the surface
  const vignetteRgb = isLight ? '246,246,244' : '10,10,12';
  const bloomColor = isLight
    ? 'rgba(78,108,255,0.10)'
    : 'rgba(78,108,255,0.18)';

  // Pool of workspace screenshots. Light theme alternates through several
  // product views; dark theme keeps the original dark screenshot.
  const LIGHT_SCREENS = [
    'assets/workspace-light.png',
    'assets/screen-matter-record.png',
    'assets/screen-document-intelligence.png',
    'assets/screen-ai-workflows.png',
    'assets/screen-performance.png',
    'assets/screen-outside-counsel.png',
    'assets/screen-workspace-v2.png',
    'assets/screen-corporate-workspace.png',
    'assets/screen-external-access.png',
    'assets/screen-ai-playbook.png'
  ];
  const DARK_SCREENS = ['assets/workspace.png'];
  const screens = isLight ? LIGHT_SCREENS : DARK_SCREENS;
  const ws = (i) => screens[i % screens.length];

  // dy = vertical stagger per tile so logos don't sit on a single straight line.
  const TILES = [
    { kind: 'workspace', src: ws(0), w: 720, dy: 0 },
    { kind: 'workspace', src: ws(1), w: 720, dy: 0 },
    { kind: 'workspace', src: ws(2), w: 720, dy: 0 }
  ];
  const TILES_B = [
    { kind: 'workspace', src: ws(3), w: 720, dy: 0 },
    { kind: 'workspace', src: ws(4), w: 720, dy: 0 },
    { kind: 'workspace', src: ws(5), w: 720, dy: 0 }
  ];
  const TILES_C = [
    { kind: 'workspace', src: ws(6), w: 720, dy: 0 },
    { kind: 'workspace', src: ws(7), w: 720, dy: 0 },
    { kind: 'workspace', src: ws(8), w: 720, dy: 0 }
  ];

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height,
        background: bg,
        overflow: 'hidden',
        isolation: 'isolate'
      }}
    >
      <style>{`
        @keyframes iso-scroll-l { from { transform: translate3d(0,0,0); } to { transform: translate3d(-50%, 0, 0); } }
        @keyframes iso-scroll-r { from { transform: translate3d(-50%, 0, 0); } to { transform: translate3d(0, 0, 0); } }
        .iso-stage {
          position: absolute;
          inset: -10% -10%;
          ${tilt ? 'transform: perspective(1400px) rotateX(38deg) rotateZ(18deg) scale(1.18);' : ''}
          transform-origin: 50% 50%;
        }
        .iso-stage--top {
          top: -55%;
          bottom: 35%;
        }
        .iso-stage--top-right {
          top: -35%;
          bottom: 15%;
          left: 5%;
          right: -25%;
          transform-origin: 70% 50%;
        }
        .iso-row {
          display: flex;
          align-items: center;
          gap: 80px;
          width: max-content;
          will-change: transform;
        }
        .iso-row-l { animation: iso-scroll-l 60s linear infinite; }
        .iso-row-r { animation: iso-scroll-r 75s linear infinite; }
        .iso-tile { flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
        .iso-tile img { display: block; max-width: 100%; height: auto; }
        .iso-tile-dark.workspace {
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 30px 80px -20px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.05);
          background: #111;
        }
        .iso-tile-light.workspace {
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 24px 60px -18px rgba(20,24,40,0.22), 0 2px 6px -2px rgba(20,24,40,0.10), 0 0 0 1px rgba(20,24,40,0.06);
          background: #ffffff;
        }
        .iso-tile-dark.logo {
          padding: 22px;
          border-radius: 18px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 18px 44px -12px rgba(0,0,0,0.55);
        }
        .iso-tile-light.logo {
          padding: 22px;
          border-radius: 18px;
          background: #ffffff;
          border: 1px solid rgba(20,24,40,0.06);
          box-shadow: 0 16px 36px -12px rgba(20,24,40,0.18), 0 1px 2px rgba(20,24,40,0.04);
        }
      `}</style>

      {/* Soft radial vignette so the centre stays readable for any overlay text */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
          background: `radial-gradient(60% 70% at 50% 50%, rgba(${vignetteRgb},0) 0%, rgba(${vignetteRgb},0.55) 60%, rgba(${vignetteRgb},0.85) 100%)`
        }}
      />
      {/* Cool blue/purple bloom under the scroller */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: `radial-gradient(40% 50% at 50% 60%, ${bloomColor}, transparent 70%)`
        }}
      />

      <div className={`iso-stage ${anchor === 'top' ? 'iso-stage--top' : ''} ${anchor === 'top-right' ? 'iso-stage--top-right' : ''}`}>
        <IsoRow tiles={TILES} className="iso-row-l" yOffset="-180px" theme={theme} />
        <IsoRow tiles={TILES_B} className="iso-row-r" yOffset="60px" theme={theme} />
        <IsoRow tiles={TILES_C} className="iso-row-l" yOffset="300px" speedMod={0.85} theme={theme} />
      </div>
    </div>
  );
}

function IsoRow({ tiles, className, yOffset, speedMod, theme }) {
  // Duplicate the array so the loop is seamless when translateX hits -50%.
  const doubled = [...tiles, ...tiles];
  return (
    <div
      className={`iso-row ${className}`}
      style={{
        position: 'absolute',
        left: 0,
        top: '50%',
        transform: `translateY(${yOffset})`,
        animationDuration: speedMod ? `${speedMod * (className.includes('-l') ? 60 : 75)}s` : undefined
      }}
    >
      {doubled.map((t, i) => (
        <div
          key={i}
          className={`iso-tile iso-tile-${theme} ${t.kind}`}
          style={{
            width: t.w,
            height: t.kind === 'workspace' ? Math.round(t.w * 0.62) : t.w,
            transform: t.dy ? `translateY(${t.dy}px)` : undefined
          }}
        >
          <img src={t.src} alt="" />
        </div>
      ))}
    </div>
  );
}

window.IsometricScrollerV2 = IsometricScrollerV2;
