// FooterV2.jsx
function FooterV2() {
  const COLS = [
    { h: 'Platform', items: ['Workspace', 'Finance Intelligence', 'Performance Assessment', 'Knowledge & Search', 'AI for legal'] },
    { h: 'Company',  items: ['About', 'Contact'] },
    { h: 'Legal',    items: ['Privacy', 'Terms'] }
  ];
  return (
    <footer style={{
      borderTop: '1px solid var(--v2-line)',
      padding: '80px var(--v2-pad-x) 32px'
    }}>
      <div style={{
        display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1.4fr', gap: '48px',
        paddingBottom: '64px'
      }}>
        {COLS.map(c => (
          <div key={c.h}>
            <p className="v2-eyebrow" style={{ marginBottom: '20px' }}>{c.h}</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {c.items.map(it => (
                <li key={it}>
                  <a href="#" style={{ color: 'var(--v2-fg-mid)', fontSize: '14px', transition: 'color 160ms' }}
                     onMouseOver={e => e.currentTarget.style.color = 'var(--v2-fg)'}
                     onMouseOut={e => e.currentTarget.style.color = 'var(--v2-fg-mid)'}>{it}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div style={{
          background: 'var(--v2-bg-elev)', border: '1px solid var(--v2-line)',
          borderRadius: 'var(--v2-radius-lg)', padding: '32px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
        }}>
          <p style={{
            fontFamily: 'var(--v2-display)', fontWeight: 500,
            fontSize: '18px', lineHeight: 1.4, letterSpacing: '-0.01em',
            color: 'var(--v2-fg)', maxWidth: '32ch'
          }}>
            The shared system of record for legal departments and their outside counsel.
          </p>
          <a href="#" className="v2-btn v2-btn-primary" style={{ alignSelf: 'flex-start', marginTop: '24px' }}>Get access</a>
        </div>
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        paddingTop: '32px', borderTop: '1px solid var(--v2-line)',
        flexWrap: 'wrap', gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <img src="../../brand/assets/spaarke-icon.svg" alt="" style={{ height: '14px', width: '14px', opacity: 0.5 }}/>
          <span style={{ fontFamily: 'var(--v2-display)', fontWeight: 500, fontSize: '13px', color: 'var(--v2-fg-mid)' }}>spaarke</span>
          <span style={{ fontFamily: 'var(--v2-mono)', fontSize: '11px', color: 'var(--v2-fg-low)' }}>© 2026 Spaarke. All rights reserved.</span>
        </div>
        <a href="#" style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          color: 'var(--v2-fg-mid)', fontSize: '13px'
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
window.FooterV2 = FooterV2;
