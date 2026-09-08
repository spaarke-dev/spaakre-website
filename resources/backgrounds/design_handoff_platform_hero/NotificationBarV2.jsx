// NotificationBarV2.jsx
function NotificationBarV2({ onDismiss = () => {} }) {
  return (
    <div style={{
      position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '10px 40px', background: '#000', color: 'var(--v2-fg-mid)',
      fontFamily: 'var(--v2-body)', fontSize: '13px',
      borderBottom: '1px solid var(--v2-line)'
    }}>
      <span>Now accepting early access partners&nbsp;—&nbsp;</span>
      <a href="#" style={{ color: 'var(--v2-fg)', textDecoration: 'underline', textUnderlineOffset: '3px', textDecorationColor: 'var(--v2-line-2)' }}>
        request access today
      </a>
      <button onClick={onDismiss} aria-label="Dismiss" style={{
        position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
        border: 0, background: 'transparent', color: 'var(--v2-fg-low)', padding: '4px',
        fontSize: '14px'
      }}>✕</button>
    </div>
  );
}
window.NotificationBarV2 = NotificationBarV2;
