import { useEffect, useRef, ReactNode } from 'react'

export function Reveal({ children, delay = 0, className = '', style = {} }: { children: ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    let done = false
    const fire = () => { if (done) return; done = true; setTimeout(() => el?.classList.add('in'), delay) }
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { fire(); io.disconnect() } }), { threshold: 0, rootMargin: '0px 0px -4% 0px' })
    io.observe(el)
    requestAnimationFrame(() => { const r = el.getBoundingClientRect(); if (r.top < window.innerHeight * 0.98 && r.bottom > 0) { fire(); io.disconnect() } })
    const t = setTimeout(() => { fire(); io.disconnect() }, 1200)
    return () => { io.disconnect(); clearTimeout(t) }
  }, [delay])
  return <div ref={ref} className={`reveal ${className}`} style={style}>{children}</div>
}
