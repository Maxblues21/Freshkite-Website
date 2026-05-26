import { Link } from 'react-router-dom'
import { Reveal } from './Reveal'
import type { SiteData } from '../hooks/useSiteData'

const ArrowIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>

export function CTAFooter({ cta, footer }: { cta: SiteData['cta']; footer: SiteData['footer'] }) {
  return (
    <section id="contact" className="section" style={{ paddingTop: 20 }}>
      <div className="container-wide">
        <Reveal>
          <div className="card-brand" style={{ padding: 'clamp(48px,7vw,96px) clamp(40px,6vw,80px)', borderRadius: 32, textAlign: 'center' }}>
            <span className="eyebrow" style={{ color: 'rgba(255,255,255,0.7)' }}>05 Contact</span>
            <h2 className="font-heading" style={{ fontSize: 'clamp(28px,5.5vw,80px)', lineHeight: 1, letterSpacing: '-0.03em', color: 'white', marginTop: 16, maxWidth: 820, margin: '16px auto 0', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
              {cta.heading.replace('quietly working', '')}<span className="italic-serif">quietly working</span>{cta.heading.split('quietly working')[1]}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.88)', fontSize: 17, marginTop: 22, maxWidth: 500, margin: '22px auto 0' }}>
              {cta.body.includes('No commitment') ? <>{cta.body.split('No commitment')[0]}<span style={{ color: '#00C4A0', fontWeight: 500 }}>No commitment</span>{cta.body.split('No commitment')[1]}</> : cta.body}
            </p>
            <div style={{ display: 'flex', marginTop: 36, justifyContent: 'center' }}>
              <Link to="/contact" className="btn" style={{ background: 'white', color: 'var(--ink)', padding: '14px 28px', fontSize: 15, display: 'inline-flex', alignItems: 'center', gap: '.55rem' }}>
                {cta.buttonLabel} <ArrowIcon />
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="footer">
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 40, alignItems: 'flex-start' }} className="foot-grid">
              <div>
                <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: '0.14em', color: '#1565E0' }}>FRESHKITE</span>
                <p style={{ marginTop: 14, maxWidth: 340, fontSize: 13.5, color: '#000' }}>
                  {footer.tagline.includes('Built in Mauritius,') ? <>{footer.tagline.split('Built in Mauritius,')[0]}<span style={{ color: '#00C4A0', fontWeight: 500 }}>Built in Mauritius,</span>{footer.tagline.split('Built in Mauritius,')[1]}</> : footer.tagline}
                </p>
              </div>
              <Reveal delay={60}>
                <div>
                  <div className="eyebrow" style={{ marginBottom: 14 }}>Studio</div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {[
                    { label: 'Services', href: '/#services' },
                    { label: 'Why Us',   href: '/#why-us' },
                    { label: 'Contact',  href: '/contact' },
                  ].map(x => <li key={x.label}><a href={x.href} className="link-under" style={{ color: '#000', fontSize: 14 }}>{x.label}</a></li>)}
                  </ul>
                </div>
              </Reveal>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 48, paddingTop: 22, borderTop: '1px solid var(--line)', fontSize: 12.5, color: 'var(--muted)' }} className="foot-bottom">
              <span>{footer.copyright}</span>
              <span style={{ display: 'flex', gap: 18 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 6, height: 6, borderRadius: 999, background: '#16A34A' }} /> All systems operational</span>
                <span>UTC+4 · Port Louis</span>
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
