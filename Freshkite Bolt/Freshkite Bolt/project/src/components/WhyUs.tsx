import { Reveal } from './Reveal'
import type { SiteData } from '../hooks/useSiteData'

export function WhyUs({ data }: { data: SiteData['whyUs'] }) {
  return (
    <section id="why-us" className="section" style={{ paddingTop: 20 }}>
      <div className="container-wide">
        <Reveal>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 30 }}>
            <h2 className="font-heading" style={{ fontSize: 'clamp(26px,4.8vw,64px)', lineHeight: 1.05, letterSpacing: '-0.025em', color: '#000', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
              {data.heading.replace('quietly felt.', '')}<span className="italic-serif" style={{ background: 'var(--grad-accent-text)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', color: 'transparent', display: 'inline-block', paddingBottom: '0.2em', marginBottom: '-0.2em', paddingRight: '0.08em' }}>quietly felt.</span>
            </h2>
            <span className="eyebrow">04 — Why Us</span>
          </div>
        </Reveal>
        <Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 18, marginTop: 48 }}>
            {data.items.map((it, i) => (
              <Reveal key={it.big} delay={i * 80}>
                <div className="glass" style={{ padding: 28, borderRadius: 22, height: '100%' }}>
                  <div className="italic-serif" style={{ fontSize: 32, lineHeight: 1.05, letterSpacing: '-0.02em', color: '#000' }}>{it.big}</div>
                  <div style={{ height: 1, background: 'var(--grad-accent-text)', opacity: 0.25, margin: '18px 0' }} />
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: '#000' }}>{it.sub}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
