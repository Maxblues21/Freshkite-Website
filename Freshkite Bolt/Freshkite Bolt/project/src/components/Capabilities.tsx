import { useEffect, useRef, useState } from 'react'
import { Reveal } from './Reveal'
import type { SiteData } from '../hooks/useSiteData'

const ICONS = [
  <svg key="0" width="42" height="42" viewBox="0 0 24 24" fill="none"><path d="M3 3h2l2.4 12.1a2 2 0 0 0 2 1.6h8.7a2 2 0 0 0 2-1.5L22 7H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="20" r="1.4" stroke="currentColor" strokeWidth="1.5"/><circle cx="18" cy="20" r="1.4" stroke="currentColor" strokeWidth="1.5"/></svg>,
  <svg key="1" width="42" height="42" viewBox="0 0 24 24" fill="none"><path d="M3 21h18M6 17V10M11 17V6M16 17v-8M21 17v-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  <svg key="2" width="42" height="42" viewBox="0 0 24 24" fill="none"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" stroke="currentColor" strokeWidth="1.5"/><path d="M7 13h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  <svg key="3" width="42" height="42" viewBox="0 0 24 24" fill="none"><path d="M4 13a8 8 0 0 1 16 0v4a3 3 0 0 1-3 3h-1v-6h4M4 13v4a3 3 0 0 0 3 3h1v-6H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  <svg key="4" width="42" height="42" viewBox="0 0 24 24" fill="none"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  <svg key="5" width="42" height="42" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5ZM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
]

export function Capabilities({ data }: { data: SiteData['capabilities'] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const outerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const startX = useRef(0); const scrollLeft = useRef(0)

  useEffect(() => {
    const el = outerRef.current; if (!el) return
    let done = false
    const fire = () => { if (done) return; done = true; el.classList.add('visible') }
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { fire(); io.disconnect() } }), { threshold: 0.15 })
    io.observe(el)
    const t = setTimeout(() => { fire(); io.disconnect() }, 1000)
    return () => { io.disconnect(); clearTimeout(t) }
  }, [])

  const onMD = (e: React.MouseEvent) => { if (!trackRef.current) return; setIsDragging(true); startX.current = e.pageX - trackRef.current.offsetLeft; scrollLeft.current = trackRef.current.scrollLeft }
  const onMU = () => setIsDragging(false)
  const onMM = (e: React.MouseEvent) => { if (!isDragging || !trackRef.current) return; e.preventDefault(); const x = e.pageX - trackRef.current.offsetLeft; trackRef.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.5 }
  const onTS = (e: React.TouchEvent) => { if (!trackRef.current) return; startX.current = e.touches[0].pageX - trackRef.current.offsetLeft; scrollLeft.current = trackRef.current.scrollLeft }
  const onTM = (e: React.TouchEvent) => { if (!trackRef.current) return; const x = e.touches[0].pageX - trackRef.current.offsetLeft; trackRef.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.5 }
  const onCM = (e: React.MouseEvent<HTMLElement>) => { if (isDragging) return; const c = e.currentTarget; const r = c.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - 0.5; const y = (e.clientY - r.top) / r.height - 0.5; c.style.transform = `perspective(900px) rotateX(${-y * 9}deg) rotateY(${x * 9}deg) translateY(-6px) scale(1.02)`; c.style.transition = 'transform 0.1s ease' }
  const onCL = (e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.transform = ''; e.currentTarget.style.transition = 'transform 0.55s cubic-bezier(0.2,0.8,0.2,1)' }

  return (
    <section id="services" style={{ position: 'relative', paddingTop: 96, paddingBottom: 120, background: '#F0F4FF', overflow: 'hidden', maxWidth: '100vw' }}>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 80% 60% at 20% 30%,rgba(21,101,224,0.13) 0%,transparent 60%),radial-gradient(ellipse 70% 55% at 80% 70%,rgba(0,196,160,0.12) 0%,transparent 60%)', animation: 'capGradDrift 16s ease-in-out infinite alternate' }} />
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'radial-gradient(circle,rgba(21,101,224,0.05) 1.5px,transparent 0)', backgroundSize: '26px 26px' }} />

      <div className="container-wide" style={{ position: 'relative', zIndex: 2 }}>
        <Reveal>
          <div className="caps-header" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, marginBottom: 52, flexWrap: 'wrap' }}>
            <div style={{ maxWidth: 780 }}>
              <span className="eyebrow">{data.eyebrow}</span>
              <h2 className="font-heading" style={{ fontSize: 'clamp(26px,4.2vw,56px)', lineHeight: 1.08, letterSpacing: '-0.028em', marginTop: 16, color: '#000', fontWeight: 600, wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                {data.heading.replace('under one roof.', '')}<span className="italic-serif grad-text" style={{ display: 'inline-block', paddingBottom: '0.1em', marginBottom: '-0.1em', paddingRight: '0.1em' }}>under one roof.</span>
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 220 }}>
              <span className="mono" style={{ fontSize: 11, letterSpacing: '.16em', color: 'var(--muted-2)' }}>SERVICES</span>
              <p style={{ fontSize: 14, lineHeight: 1.55, color: '#000', margin: 0, maxWidth: 300 }}>{data.subtext}</p>
            </div>
          </div>
        </Reveal>
      </div>

      <div ref={outerRef} className="caps-track-outer" style={{ position: 'relative', width: '100%', zIndex: 2 }}>
        <div ref={trackRef} className="no-scrollbar caps-track" style={{ overflowX: 'auto', cursor: isDragging ? 'grabbing' : 'grab', userSelect: 'none' }}
          onMouseDown={onMD} onMouseLeave={onMU} onMouseUp={onMU} onMouseMove={onMM} onTouchStart={onTS} onTouchMove={onTM}>
          <div className="caps-row">
            {data.cards.map((c, idx) => (
              <article key={c.title} className="cap-teaser" onMouseMove={onCM} onMouseLeave={onCL} style={{
                animationDelay: `${idx * 80}ms`, flex: '0 0 260px', height: 320, borderRadius: 28, padding: '28px 20px',
                position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 20,
                background: 'rgba(255,255,255,0.62)', backdropFilter: 'blur(56px) saturate(220%) brightness(1.06)', WebkitBackdropFilter: 'blur(56px) saturate(220%) brightness(1.06)',
                border: '1px solid rgba(255,255,255,0.92)', boxShadow: 'inset 0 2px 0 rgba(255,255,255,1),0 12px 40px rgba(21,101,224,0.10)', willChange: 'transform',
              }}>
                <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, borderRadius: '26px 26px 0 0', background: `linear-gradient(90deg,transparent 10%,rgba(${c.aR},0.45) 40%,rgba(${c.aR},0.45) 60%,transparent 90%)` }} />
                <div aria-hidden="true" style={{ position: 'absolute', inset: 0, borderRadius: 26, pointerEvents: 'none', background: 'linear-gradient(170deg,rgba(255,255,255,0.52) 0%,rgba(255,255,255,0.18) 38%,transparent 65%)' }} />
                <div style={{ width: 88, height: 88, borderRadius: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `rgba(${c.aR},0.10)`, border: `1px solid rgba(${c.aR},0.22)`, color: c.accent, boxShadow: `0 6px 22px rgba(${c.aR},0.18),inset 0 1px 0 rgba(255,255,255,0.7)`, position: 'relative', zIndex: 1, flexShrink: 0 }}>
                  {ICONS[idx % ICONS.length]}
                </div>
                <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
                  <div style={{ fontSize: 16, fontWeight: 600, letterSpacing: '-0.015em', color: '#000', lineHeight: 1.25 }}>{c.title}</div>
                  <div className="italic-serif" style={{ fontSize: 12.5, marginTop: 7, color: '#555', lineHeight: 1.45 }}>{c.tagline}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
