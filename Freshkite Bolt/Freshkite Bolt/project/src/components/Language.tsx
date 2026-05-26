import { useEffect, useRef, useState } from 'react'
import { Reveal } from './Reveal'
import type { SiteData } from '../hooks/useSiteData'

function TimeChart() {
  const chartRef = useRef<HTMLDivElement>(null)
  const barRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const ROWS = [
    { key: 'freshkite', label: 'Freshkite', sub: 'UTC +4', startH: 4,  endH: 16, grad: 'linear-gradient(90deg,#1565E0 0%,#00C4A0 55%,#1A2D5E 100%)', tag: 'YOUR TEAM' },
    { key: 'europe',    label: 'Europe',    sub: 'UTC +1', startH: 8,  endH: 17, grad: 'linear-gradient(90deg,#00C4A0 0%,#1565E0 100%)' },
    { key: 'usEast',    label: 'US East',   sub: 'UTC −5', startH: 13, endH: 22, grad: 'linear-gradient(90deg,#1A2D5E 0%,#0D1B3B 100%)' },
  ]

  useEffect(() => {
    const el = chartRef.current; if (!el) return
    let fired = false
    const run = () => {
      if (fired) return; fired = true
      ROWS.forEach(({ key, startH, endH }, i) => {
        const bar = barRefs.current[key]; if (!bar) return
        setTimeout(() => {
          if (bar) { bar.style.width = `${((endH - startH) / 24) * 100}%`; bar.style.opacity = '1' }
        }, i * 140)
      })
    }
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { run(); io.disconnect() } }), { threshold: 0.2 })
    io.observe(el)
    const t = setTimeout(() => { run(); io.disconnect() }, 1200)
    return () => { io.disconnect(); clearTimeout(t) }
  }, [])

  return (
    <div ref={chartRef} style={{ position: 'relative' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {ROWS.map((r) => (
          <div key={r.key}>
            {/* Label row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)', lineHeight: 1 }}>{r.label}</span>
              <span style={{ fontSize: 11, color: 'var(--muted-2)' }}>{r.sub}</span>
              {r.tag && (
                <span style={{ fontSize: 8.5, fontWeight: 600, padding: '2px 7px', borderRadius: 6, background: 'var(--ink)', color: 'white', letterSpacing: '.04em' }}>{r.tag}</span>
              )}
              <span style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--muted)', whiteSpace: 'nowrap' }}>{r.startH}h – {r.endH}h</span>
            </div>
            {/* Bar */}
            <div style={{ position: 'relative', height: 36, borderRadius: 999, background: 'rgba(21,101,224,0.07)', overflow: 'hidden' }}>
              <div
                ref={el => { barRefs.current[r.key] = el }}
                style={{
                  position: 'absolute', top: 0, bottom: 0,
                  left: `${(r.startH / 24) * 100}%`,
                  width: 0, opacity: 0,
                  borderRadius: 999, background: r.grad,
                  boxShadow: '0 4px 18px rgba(0,0,0,0.12)',
                  transition: 'width 0.9s cubic-bezier(0.22,1,0.36,1), opacity 0.5s ease',
                  willChange: 'width,opacity',
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Coverage summary */}
      <Reveal delay={250}>
        <div style={{ marginTop: 28, padding: '16px 18px', borderRadius: 16, background: 'rgba(21,101,224,0.04)', border: '1px solid rgba(21,101,224,0.08)' }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Continuous Coverage (UTC)</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13 }}>
            {[
              { dot: '#00C4A0', text: <><b>Freshkite × Europe</b> — 08h–16h UTC = <span style={{ color: '#00C4A0', fontStyle: 'italic' }}>8h together</span></> },
              { dot: '#1565E0', text: <><b>Freshkite × US East</b> — 13h–16h UTC = <span style={{ color: '#1565E0', fontStyle: 'italic' }}>3h together</span></> },
              { dot: '#1A2D5E', text: <>Total: <b>04h–22h UTC</b> = <span style={{ color: '#1A2D5E', fontStyle: 'italic' }}>18h continuous</span></> },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: item.dot, flexShrink: 0, marginTop: 4 }} />
                <span style={{ color: 'var(--ink-2)', lineHeight: 1.5 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  )
}

export function Language({ data }: { data: SiteData['language'] }) {
  const [fr, setFr] = useState(false)

  return (
    <section className="section" style={{ paddingTop: 40 }}>
      <div className="container">

        {/* ── Fluency block ── */}
        <div className="lang-fluency-grid">
          {/* Left: copy */}
          <Reveal>
            <span className="eyebrow">02 — Fluency</span>
            <h2 style={{
              fontSize: 'clamp(28px, 5vw, 54px)',
              lineHeight: 1.05, letterSpacing: '-0.025em',
              fontWeight: 600, marginTop: 14, color: '#000',
              wordBreak: 'break-word', overflowWrap: 'break-word',
            }}>
              {data.heading.replace('Both of them.', '')}
              <span className="italic-serif grad-text" style={{ display: 'inline-block', paddingBottom: '0.1em', marginBottom: '-0.1em', paddingRight: '0.1em' }}>
                Both of them.
              </span>
            </h2>
            <p style={{ maxWidth: 480, marginTop: 20, fontSize: 15.5, lineHeight: 1.65, color: '#000' }}>{data.body}</p>

            {/* EN / FR badges */}
            <div style={{ display: 'flex', gap: 14, marginTop: 28, flexWrap: 'wrap' }}>
              {[{ k: 'EN', v: 'English', sub: 'Native-level' }, { k: 'FR', v: 'Français', sub: 'Natif' }].map(l => (
                <div key={l.k} className="glass" style={{ padding: '12px 16px', borderRadius: 16, minWidth: 130, flex: '1 1 130px', maxWidth: 200 }}>
                  <div className="italic-serif grad-text" style={{ fontSize: 26, lineHeight: 1.15 }}>{l.k}</div>
                  <div style={{ fontSize: 13, color: 'var(--ink)', marginTop: 6, fontWeight: 500 }}>{l.v}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>{l.sub}</div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Right: flip card */}
          <Reveal delay={150}>
            <div
              className="card-brand lang-flip-card"
              style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', padding: 'clamp(20px,4vw,32px)' }}
              onMouseEnter={() => setFr(true)} onMouseLeave={() => setFr(false)}
              onClick={() => setFr(x => !x)}
            >
              {/* Toggle pill */}
              <div style={{ display: 'inline-flex', alignSelf: 'center', gap: 0, padding: 4, borderRadius: 999, background: 'rgba(255,255,255,0.18)', position: 'relative', border: '1px solid rgba(255,255,255,0.25)' }}>
                <div style={{ position: 'absolute', top: 4, bottom: 4, left: fr ? '50%' : 4, width: 'calc(50% - 4px)', background: 'rgba(255,255,255,0.95)', borderRadius: 999, transition: 'left .5s cubic-bezier(.6,.1,.2,1)' }} />
                {['EN', 'FR'].map((t, i) => (
                  <span key={t} style={{ position: 'relative', zIndex: 1, padding: '6px 20px', fontSize: 12, fontWeight: 600, letterSpacing: '.05em', color: (i === 1) === fr ? '#1A2D5E' : 'rgba(255,255,255,0.9)', transition: 'color .4s ease' }}>{t}</span>
                ))}
              </div>

              {/* Phrase */}
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(16px,4vw,24px) 0', position: 'relative', minHeight: 80 }}>
                {[{ lang: 'en', text: data.enPhrase }, { lang: 'fr', text: data.frPhrase }].map((row, i) => {
                  const active = (i === 1) === fr
                  return (
                    <div key={row.lang} className="italic-serif" style={{
                      position: 'absolute', inset: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 'clamp(15px, 2.4vw, 24px)',
                      color: 'white', textAlign: 'center', padding: '0 8px',
                      transform: active ? 'translateY(0)' : (fr ? 'translateY(-120%)' : 'translateY(120%)'),
                      opacity: active ? 1 : 0,
                      filter: active ? 'blur(0)' : 'blur(6px)',
                      transition: 'transform .6s cubic-bezier(.6,.1,.2,1), opacity .5s ease, filter .5s ease',
                    }}>{row.text}</div>
                  )
                })}
              </div>

              <div style={{ textAlign: 'center', fontSize: 10, letterSpacing: '.22em', color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', fontFamily: 'JetBrains Mono,monospace' }}>
                {fr ? 'Tap to switch' : 'Hover / tap to translate'}
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── Timezone block ── */}
        <div className="lang-tz-grid" style={{ marginTop: 'clamp(48px,8vw,90px)' }}>
          <Reveal><TimeChart /></Reveal>
          <Reveal delay={150}>
            <h3 style={{
              fontSize: 'clamp(26px,4vw,48px)', lineHeight: 1.05,
              letterSpacing: '-0.025em', color: '#000', fontWeight: 600,
            }}>
              More hours in your day.{' '}
              <span className="italic-serif grad-text">By design.</span>
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {data.timezonePoints.map(t => (
                <li key={t} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', color: '#000', fontSize: 15, lineHeight: 1.55 }}>
                  <span style={{ marginTop: 7, width: 5, height: 5, borderRadius: 999, background: 'linear-gradient(135deg,#1565E0,#00C4A0)', flex: '0 0 auto' }} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

      </div>
    </section>
  )
}
