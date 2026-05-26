import { Reveal } from './Reveal'
import type { SiteData } from '../hooks/useSiteData'

export function Team({ data }: { data: SiteData['team'] }) {
  return (
    <section id="team" className="section" style={{ paddingTop: 60 }}>
      <div className="container-wide">
        <Reveal>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 30 }}>
            <h2 className="font-heading" style={{ fontSize: 'clamp(26px,4.8vw,64px)', lineHeight: 1.05, letterSpacing: '-0.025em', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
              {data.heading.replace('not contractors.', '')}<span className="italic-serif grad-text">not contractors.</span>
            </h2>
            <span className="eyebrow">05 — Team</span>
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: 18, marginTop: 48 }}>
          {data.people.map((p, i) => (
            <Reveal key={p.name} delay={i * 80}>
              <div className="glass" style={{ padding: 22, borderRadius: 22, height: '100%' }}>
                <div style={{ aspectRatio: '1', borderRadius: 16, background: `radial-gradient(120% 80% at 30% 20%,${p.color}55,transparent 60%),radial-gradient(120% 80% at 80% 80%,rgba(0,196,160,0.33),transparent 60%),linear-gradient(135deg,#EFF4FF,#E8F2FF)`, marginBottom: 16, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'flex-end', padding: 14 }}>
                  <span className="eyebrow" style={{ color: 'var(--ink)' }}>{p.loc}</span>
                </div>
                <div style={{ fontSize: 16, fontWeight: 500, color: '#000' }}>{p.name}</div>
                <div style={{ fontSize: 12.5, color: '#555', marginTop: 2 }}>{p.role}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
