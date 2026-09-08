// SiteHeaderV2.jsx — restrained, sticky, dark
function SiteHeaderV2() {
  const links = [
    { label: 'Platform', href: 'platform.html' },
    { label: 'Why Spaarke', href: '#' },
    { label: 'Insights', href: '#' }
  ];
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      borderBottom: '1px solid var(--v2-line)',
      background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(10px)'
    }}>
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '18px var(--v2-pad-x)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          <a href="index.html" style={{ display: 'flex', alignItems: 'center' }}>
            <img src="../../brand/assets/logos/spaarke-logo-white.svg" alt="spaarke" style={{ height: '38px', width: 'auto', display: 'block' }} />
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            {links.map(l => (
              <a key={l.label} href={l.href} style={{
                fontFamily: 'var(--v2-body)', fontSize: '14px',
                color: 'var(--v2-fg-mid)', transition: 'color 160ms'
              }}
              onMouseOver={e => e.currentTarget.style.color = 'var(--v2-fg)'}
              onMouseOut={e => e.currentTarget.style.color = 'var(--v2-fg-mid)'}>{l.label}</a>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          <a href="#" style={{
            fontFamily: 'var(--v2-body)', fontSize: '14px', color: 'var(--v2-fg-mid)', transition: 'color 160ms'
          }}
          onMouseOver={e => e.currentTarget.style.color = 'var(--v2-fg)'}
          onMouseOut={e => e.currentTarget.style.color = 'var(--v2-fg-mid)'}>Contact us</a>
          <a href="#" style={{
            fontFamily: 'var(--v2-body)', fontSize: '14px', color: 'var(--v2-fg-mid)', transition: 'color 160ms'
          }}
          onMouseOver={e => e.currentTarget.style.color = 'var(--v2-fg)'}
          onMouseOut={e => e.currentTarget.style.color = 'var(--v2-fg-mid)'}>Sign in</a>
        </div>
      </nav>
    </header>
  );
}
window.SiteHeaderV2 = SiteHeaderV2;
