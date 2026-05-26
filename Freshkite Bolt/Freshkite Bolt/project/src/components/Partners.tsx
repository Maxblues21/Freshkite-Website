import { Reveal } from './Reveal'
import type { SiteData } from '../hooks/useSiteData'

export function Partners({ data }: { data: SiteData['partners'] }) {
  return (
    <section id="partners" style={{ padding: '90px 0 100px', position: 'relative' }}>
      <div className="container-wide" style={{ textAlign: 'center' }}>
        <Reveal>
          <div className="eyebrow" style={{ letterSpacing: '.28em', fontSize: 12 }}>03 — Partners</div>
          <h2 className="font-heading" style={{ fontSize: 'clamp(26px,4.2vw,56px)', lineHeight: 1.05, letterSpacing: '-0.025em', marginTop: 14, color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
            {data.heading.replace('with.', '')}<span className="italic-serif grad-text">with.</span>
          </h2>
          <div style={{ width: 44, height: 2, background: 'var(--grad-accent-text)', margin: '18px auto 0', borderRadius: 999 }} />
        </Reveal>
        <Reveal delay={150}>
          <div style={{ display: 'flex', gap: 'clamp(32px,6vw,80px)', alignItems: 'center', justifyContent: 'center', marginTop: 56, flexWrap: 'wrap', rowGap: 36 }}>
            {data.logos.map(p => (
              <div key={p.name} title={p.name} className="partner-logo" style={{ height: 70, display: 'flex', alignItems: 'center', justifyContent: 'center', filter: 'grayscale(0.15)', opacity: 0.88, transition: 'opacity .3s ease,filter .3s ease,transform .4s ease' }}>
                <img src={p.src} alt={p.name} style={{ maxWidth: 180, maxHeight: 58, objectFit: 'contain' }} />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
