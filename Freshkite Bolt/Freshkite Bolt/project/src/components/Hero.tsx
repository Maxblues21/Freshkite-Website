import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Reveal } from './Reveal'
import type { SiteData } from '../hooks/useSiteData'

const WORD_STYLES: Array<{ color?: string; grad?: boolean }> = [
  {}, {}, {}, { color: '#00C4A0' }, {}, {}, {}, { grad: true },
]

export function Hero({ data }: { data: SiteData['hero'] }) {
  const [mouse, setMouse] = useState({ x: 50, y: 42 })
  const [show, setShow] = useState(false)

  useEffect(() => {
    const fn = (e: MouseEvent) => setMouse({ x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 })
    window.addEventListener('mousemove', fn)
    return () => window.removeEventListener('mousemove', fn)
  }, [])

  useEffect(() => { const t = setTimeout(() => setShow(true), 120); return () => clearTimeout(t) }, [])

  const words = data.headline.split(' ')

  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: 100, paddingBottom: 80, overflow: 'hidden', maxWidth: '100vw' }}>
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse 90% 75% at ${mouse.x}% ${mouse.y}%,rgba(21,101,224,0.18) 0%,rgba(0,196,160,0.12) 38%,rgba(26,45,94,0.06) 62%,transparent 82%),radial-gradient(ellipse 60% 45% at ${100 - mouse.x}% ${100 - mouse.y}%,rgba(0,196,160,0.10) 0%,rgba(21,101,224,0.05) 45%,transparent 70%)`,
        transition: 'background 0.18s ease',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <h1 className="hero-title" aria-label={data.headline} style={{
          margin: '28px auto 0', fontFamily: "'Inter',system-ui,sans-serif", fontWeight: 700,
          fontSize: 'clamp(44px,7.4vw,108px)', lineHeight: 1.02, letterSpacing: '-0.035em', maxWidth: '14ch',
        }}>
          {words.map((w, i) => {
            const ws = WORD_STYLES[i] ?? {}
            const delay = `${i * 72}ms`
            const anim: React.CSSProperties = { display: 'inline-block', opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(18px)', filter: show ? 'blur(0px)' : 'blur(5px)', transition: `opacity .75s ease ${delay},transform .75s cubic-bezier(.2,.8,.2,1) ${delay},filter .6s ease ${delay}` }
            if (ws.grad) return <span key={i}>{i > 0 ? ' ' : ''}<span style={{ ...anim, background: 'linear-gradient(90deg,#1565E0 0%,#00C4A0 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', color: 'transparent', paddingBottom: '0.08em', marginBottom: '-0.08em' }}>{w}</span></span>
            return <span key={i}>{i > 0 ? ' ' : ''}<span style={{ ...anim, color: ws.color ?? '#000' }}>{w}</span></span>
          })}
        </h1>

        <Reveal delay={700}>
          <p style={{ margin: '28px auto 0', maxWidth: 580, fontSize: 'clamp(15px,2.2vw,17.5px)', lineHeight: 1.65, color: '#000', padding: '0 4px' }}>
            {data.subheadline.includes('We power the growth,')
              ? <>{data.subheadline.split('We power the growth,')[0]}<span style={{ color: '#00C4A0', fontWeight: 500 }}>We power the growth,</span>{data.subheadline.split('We power the growth,')[1]}</>
              : data.subheadline}
          </p>
        </Reveal>

        <Reveal delay={950}>
          <div style={{ display: 'flex', marginTop: 36, justifyContent: 'center' }}>
            <Link to="/contact" className="btn" style={{ background: 'linear-gradient(135deg,#1565E0 0%,#00C4A0 100%)', color: 'white', padding: '14px 28px', fontSize: 15, fontWeight: 500, boxShadow: '0 10px 30px rgba(21,101,224,0.35),inset 0 1px 0 rgba(255,255,255,0.35)', display: 'inline-flex', alignItems: 'center', gap: '.55rem' }}>
              {data.ctaLabel}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
