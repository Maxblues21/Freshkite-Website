import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export function Nav({ dark = false }: { dark?: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { document.body.style.overflow = menuOpen ? 'hidden' : ''; return () => { document.body.style.overflow = '' } }, [menuOpen])
  useEffect(() => setMenuOpen(false), [location])

  const links = [
    { label: 'Services', href: '/#services' },
    { label: 'Why Us',   href: '/#why-us' },
    { label: 'Contact',  href: '/contact' },
  ]

  return (
    <>
      {menuOpen && (
        <div className="mobile-nav-overlay">
          <button onClick={() => setMenuOpen(false)} style={{ position: 'absolute', top: 28, right: 24, background: 'none', border: 'none', cursor: 'pointer', fontSize: 22, color: '#1A2D5E', lineHeight: 1, padding: 8 }}>✕</button>
          <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, height: '100%' }}>
            {links.map(l => <a key={l.label} href={l.href} className="mobile-nav-link" onClick={() => setMenuOpen(false)}>{l.label}</a>)}
            <Link to="/contact" className="mobile-nav-cta btn" onClick={() => setMenuOpen(false)} style={{ marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: '.55rem' }}>
              Start a project <ArrowIcon />
            </Link>
          </nav>
        </div>
      )}

      <nav style={{ position: 'fixed', top: 18, left: 0, right: 0, zIndex: 50, display: 'flex', justifyContent: 'center', padding: '0 22px', pointerEvents: 'none' }}>
        <div style={{
          pointerEvents: 'auto', borderRadius: 999, padding: '6px 8px 6px 20px',
          display: 'flex', alignItems: 'center', gap: 14,
          transition: 'transform .3s ease, background .3s ease, box-shadow .3s ease',
          transform: scrolled ? 'scale(0.985)' : 'scale(1)',
          background: dark ? (scrolled ? 'rgba(5,13,31,0.95)' : 'rgba(5,13,31,0.72)') : (scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.76)'),
          backdropFilter: 'blur(32px) saturate(180%)', WebkitBackdropFilter: 'blur(32px) saturate(180%)',
          border: dark ? '1px solid rgba(255,255,255,0.10)' : '1px solid rgba(21,101,224,0.09)',
          boxShadow: dark ? 'inset 0 1px 0 rgba(255,255,255,0.12),0 20px 60px rgba(0,0,0,0.40)' : 'inset 0 1px 0 rgba(255,255,255,0.95),0 20px 60px rgba(21,101,224,0.10)',
          maxWidth: '100%',
        }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', paddingRight: 12, borderRight: `1px solid ${dark ? 'rgba(255,255,255,0.14)' : 'rgba(21,101,224,0.12)'}` }}>
            <img src="/assets/logo.svg" alt="Freshkite" style={{ height: 26, width: 'auto', display: 'block' }} />
          </Link>

          <div className="nav-links-desktop" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {links.map(l => (
              <a key={l.label} href={l.href} className="nav-link-glass" style={{
                padding: '8px 14px', borderRadius: 999,
                color: dark ? 'rgba(255,255,255,0.60)' : 'rgba(26,45,94,0.55)',
                fontSize: 13.5, fontWeight: 450, transition: 'color .2s ease, background .2s ease',
              }}>{l.label}</a>
            ))}
          </div>

          <Link to="/contact" className="btn nav-cta-desktop" style={{
            padding: '9px 16px', fontSize: 13,
            background: 'linear-gradient(135deg,#1565E0 0%,#00C4A0 100%)',
            color: 'white', borderRadius: 999, fontWeight: 500,
            boxShadow: '0 4px 14px rgba(21,101,224,0.30)',
            display: 'inline-flex', alignItems: 'center', gap: '.55rem',
          }}>
            Start a project <ArrowIcon />
          </Link>

          <button className={`hamburger${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(o => !o)} aria-label="Toggle navigation">
            <span /><span /><span />
          </button>
        </div>
      </nav>
    </>
  )
}
