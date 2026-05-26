/* global React, motion */
const { useEffect, useRef, useState, useMemo } = React;
const M = window.motion || {};
const m = (M.motion) || {};

/* -----------------------------
   Icons (inline SVG, no lib)
-------------------------------- */
const Icon = {
  arrow: (p={}) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  arrowL: (p={}) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M19 12H5M5 12L11 18M5 12L11 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  arrowR: (p={}) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  cart: (p={}) => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M3 3h2l2.4 12.1a2 2 0 0 0 2 1.6h8.7a2 2 0 0 0 2-1.5L22 7H6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="9" cy="20" r="1.6" stroke="currentColor" strokeWidth="1.6"/>
      <circle cx="18" cy="20" r="1.6" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
  ),
  chart: (p={}) => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M3 21h18M6 17V10M11 17V6M16 17v-8M21 17v-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
    </svg>
  ),
  folder: (p={}) => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M7 12h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  head: (p={}) => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M4 13a8 8 0 0 1 16 0v4a3 3 0 0 1-3 3h-1v-6h4M4 13v4a3 3 0 0 0 3 3h1v-6H4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  brain: (p={}) => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M8 3a3 3 0 0 0-3 3v1a3 3 0 0 0-2 3v2a3 3 0 0 0 2 3v1a3 3 0 0 0 3 3M16 3a3 3 0 0 1 3 3v1a3 3 0 0 1 2 3v2a3 3 0 0 1-2 3v1a3 3 0 0 1-3 3M12 3v18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  spark: (p={}) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...p}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  dot: (p={}) => (
    <svg width="8" height="8" viewBox="0 0 10 10" fill="currentColor" {...p}><circle cx="5" cy="5" r="3"/></svg>
  ),
  globe: (p={}) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...p}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
  ),
};

/* -----------------------------
   Accent — gradient italic, descender-safe
-------------------------------- */
const Accent = ({children}) => (
  <span className="italic-serif grad-text" style={{display:'inline-block', paddingBottom:'0.15em', marginBottom:'-0.15em'}}>{children}</span>
);

/* -----------------------------
   Reveal wrapper (IntersectionObserver)
-------------------------------- */
const Reveal = ({children, delay=0, as="div", className="", style={}}) => {
  const ref = useRef(null);
  useEffect(()=>{
    const el = ref.current; if(!el) return;
    let done = false;
    const fire = ()=>{
      if (done) return;
      done = true;
      setTimeout(()=>{ if(el) el.classList.add('in'); }, delay);
    };
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ fire(); io.disconnect(); } });
    }, { threshold: 0, rootMargin: '0px 0px -4% 0px' });
    io.observe(el);
    /* If already in viewport (e.g. above fold), fire immediately */
    requestAnimationFrame(()=>{
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.98 && r.bottom > 0){ fire(); io.disconnect(); }
    });
    const t = setTimeout(()=>{ fire(); io.disconnect(); }, 1200);
    return ()=>{ io.disconnect(); clearTimeout(t); };
  }, [delay]);
  const Tag = as;
  return <Tag ref={ref} className={`reveal ${className}`} style={style}>{children}</Tag>;
};

/* -----------------------------
   BlurText — word by word
-------------------------------- */
const BlurText = ({ text, className="", delay=80, as="h1" }) => {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  useEffect(()=>{
    const el = ref.current; if(!el) return;
    let done = false;
    const fire = ()=>{ if(done) return; done = true; setShow(true); };
    const io = new IntersectionObserver(es=>es.forEach(e=>{
      if(e.isIntersecting){ fire(); io.disconnect(); }
    }), { threshold: 0, rootMargin: '0px 0px -5% 0px' });
    io.observe(el);
    requestAnimationFrame(()=>{
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0){ fire(); io.disconnect(); }
    });
    const t = setTimeout(()=>{ fire(); io.disconnect(); }, 250);
    return ()=>{ io.disconnect(); clearTimeout(t); };
  }, []);
  const words = useMemo(()=>text.split(/(\s+)/), [text]);
  const Tag = as;
  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((w,i)=>{
        if(/^\s+$/.test(w)) return <span key={i}>{w}</span>;
        return (
          <span key={i} className="blur-word"
            style={{
              transition: 'opacity .7s ease, transform .7s cubic-bezier(.2,.8,.2,1)',
              transitionDelay: `${i*delay}ms`,
              opacity: show ? 1 : 0,
              transform: show ? 'translateY(0)' : 'translateY(16px)',
            }}>
            {w}
          </span>
        );
      })}
    </Tag>
  );
};

/* -----------------------------
   Nav — liquid glass blue
-------------------------------- */
const Nav = () => {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(()=>{
    const onScroll = ()=> setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return ()=>window.removeEventListener('scroll', onScroll);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(()=>{
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return ()=>{ document.body.style.overflow = ''; };
  }, [menuOpen]);

  const _home    = window.FRESHKITE_HOME    || '/';
  const _contact = window.FRESHKITE_CONTACT || '/contact/';
  const navLinks = [
    {label:'Services',  href: _home + '#services'},
    {label:'Partners',  href: _home + '#partners'},
    {label:'Why Us',    href: _home + '#why-us'},
    {label:'Contact',   href: _contact},
  ];

  return (
    <>
      {/* ── Mobile fullscreen overlay ── */}
      {menuOpen && (
        <div className="mobile-nav-overlay" style={{animation:'mobileMenuIn .32s cubic-bezier(.2,.8,.2,1) both'}}>
          {/* Close button */}
          <button
            onClick={()=>setMenuOpen(false)}
            aria-label="Close menu"
            style={{
              position:'absolute', top:28, right:24,
              background:'none', border:'none', cursor:'pointer',
              fontSize:22, color:'#1A2D5E', lineHeight:1, padding:8,
            }}>✕</button>
          {/* Links */}
          <nav style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:8, height:'100%'}}>
            {navLinks.map(l=>(
              <a key={l.label} href={l.href} className="mobile-nav-link" onClick={()=>setMenuOpen(false)}>{l.label}</a>
            ))}
            <a href={window.FRESHKITE_CONTACT || '/contact/'} className="mobile-nav-cta btn" onClick={()=>setMenuOpen(false)}
               style={{marginTop:12, display:'inline-flex', alignItems:'center', gap:'.55rem'}}>
              Start a project <Icon.arrow/>
            </a>
          </nav>
        </div>
      )}

      <nav style={{
        position:'fixed', top:18, left:0, right:0, zIndex:50,
        display:'flex', justifyContent:'center', padding: '0 22px',
        pointerEvents: 'none'
      }}>
        <div style={{
          pointerEvents:'auto',
          borderRadius: 999,
          padding: '6px 8px 6px 20px',
          display:'flex', alignItems:'center', gap: 14,
          transition:'transform .3s ease, background .3s ease, box-shadow .3s ease',
          transform: scrolled ? 'scale(0.985)' : 'scale(1)',
          background: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.76)',
          backdropFilter: 'blur(32px) saturate(180%)',
          WebkitBackdropFilter: 'blur(32px) saturate(180%)',
          border: '1px solid rgba(21,101,224,0.09)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -1px 0 rgba(21,101,224,0.04), 0 20px 60px rgba(21,101,224,0.10)',
          maxWidth: '100%'
        }}>
          {/* Logo */}
          <a href={window.FRESHKITE_HOME || '/'} style={{display:'flex', alignItems:'center', paddingRight: 12, borderRight:'1px solid rgba(21,101,224,0.12)', textDecoration:'none'}}>
            <img src={(window.FRESHKITE_URI || '') + '/assets/logo.svg'} alt="Freshkite" style={{height: 26, width:'auto', display:'block'}}/>
          </a>

          {/* Desktop Links */}
          <div className="nav-links-desktop" style={{display:'flex', alignItems:'center', gap: 4}}>
            {navLinks.map(l => (
              <a key={l.label} href={l.href}
                className="nav-link-glass"
                style={{
                  padding:'8px 14px', borderRadius: 999,
                  color:'rgba(26,45,94,0.55)', textDecoration:'none',
                  fontSize: 13.5, fontWeight: 450,
                  transition: 'color .2s ease, background .2s ease',
                }}>{l.label}</a>
            ))}
          </div>

          {/* Desktop CTA */}
          <a href={window.FRESHKITE_CONTACT || '/contact/'} className="btn nav-cta-desktop" style={{
            padding:'9px 16px', fontSize:13,
            background:'linear-gradient(135deg,#1565E0 0%,#00C4A0 100%)',
            color:'white', border:'none',
            display:'inline-flex', alignItems:'center', gap:'.55rem',
            borderRadius:999, fontWeight:500, cursor:'pointer',
            boxShadow:'0 4px 14px rgba(21,101,224,0.30)',
            transition:'box-shadow .2s ease, transform .2s ease',
            textDecoration:'none',
          }}>
            Start a project <Icon.arrow/>
          </a>

          {/* Hamburger */}
          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            onClick={()=>setMenuOpen(o=>!o)}
            aria-label="Toggle navigation"
          >
            <span/><span/><span/>
          </button>
        </div>

        <style>{`
          .nav-link-glass:hover{ color: var(--ink) !important; background: rgba(21,101,224,0.06); }
          @media (max-width: 860px){
            .nav-links-desktop{ display:none !important; }
            .nav-cta-desktop{ display:none !important; }
            .hamburger{ display:flex !important; }
          }
        `}</style>
      </nav>
    </>
  );
};

window.Nav = Nav;
window.BlurText = BlurText;
window.Reveal = Reveal;
window.Accent = Accent;
window.Icon = Icon;
