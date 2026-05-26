/* global React, Reveal, BlurText, Accent, Icon */

/* =============================
   HERO — full-page, mouse-reactive gradient
   ============================= */
const Hero = () => {
  const [mouse, setMouse] = useState({ x: 50, y: 42 });
  const [show,  setShow]  = useState(false);

  /* Track mouse across viewport */
  useEffect(() => {
    const onMove = (e) => setMouse({
      x: (e.clientX / window.innerWidth)  * 100,
      y: (e.clientY / window.innerHeight) * 100,
    });
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  /* Trigger word entrance */
  useEffect(() => { const t = setTimeout(() => setShow(true), 120); return () => clearTimeout(t); }, []);

  /* Per-word styling: null color = black */
  const WORDS = [
    { t: 'We' },
    { t: 'run' },
    { t: 'the' },
    { t: 'ops,',    color: '#00C4A0' },   /* teal accent */
    { t: 'you' },
    { t: 'run' },
    { t: 'the' },
    { t: 'vision.', grad: true },          /* brand gradient */
  ];

  return (
    <section className="hero-section" style={{
      position:'relative', minHeight:'100vh',
      display:'flex', flexDirection:'column', justifyContent:'center',
      paddingTop:100, paddingBottom:80, overflow:'hidden',
    }}>

      {/* ── Mouse-reactive gradient backdrop ── */}
      <div aria-hidden="true" className="mouse-gradient" style={{
        position:'absolute', inset:0, pointerEvents:'none',
        background:`
          radial-gradient(ellipse 90% 75% at ${mouse.x}% ${mouse.y}%,
            rgba(21,101,224,0.18) 0%,
            rgba(0,196,160,0.12) 38%,
            rgba(26,45,94,0.06) 62%,
            transparent 82%
          ),
          radial-gradient(ellipse 60% 45% at ${100 - mouse.x}% ${100 - mouse.y}%,
            rgba(0,196,160,0.10) 0%,
            rgba(21,101,224,0.05) 45%,
            transparent 70%
          )
        `,
        transition:'background 0.18s ease',
      }}/>

      <div className="container" style={{position:'relative', zIndex:2, textAlign:'center'}}>

        {/* ── Word-by-word animated headline ── */}
        <h1 className="hero-title" aria-label="We run the ops, you run the vision.">
          {WORDS.map((w, i) => {
            const delay = `${i * 72}ms`;
            const anim = {
              display:'inline-block',
              opacity: show ? 1 : 0,
              transform: show ? 'translateY(0)' : 'translateY(18px)',
              filter: show ? 'blur(0px)' : 'blur(5px)',
              transition:`opacity .75s ease ${delay}, transform .75s cubic-bezier(.2,.8,.2,1) ${delay}, filter .6s ease ${delay}`,
            };
            if (w.grad) return (
              <React.Fragment key={i}>
                {' '}
                <span style={{
                  ...anim,
                  background:'linear-gradient(90deg,#1565E0 0%,#00C4A0 100%)',
                  WebkitBackgroundClip:'text', backgroundClip:'text',
                  WebkitTextFillColor:'transparent', color:'transparent',
                  paddingBottom:'0.08em', marginBottom:'-0.08em',
                }}>{w.t}</span>
              </React.Fragment>
            );
            return (
              <React.Fragment key={i}>
                {i > 0 ? ' ' : ''}
                <span style={{...anim, color: w.color || '#000000'}}>{w.t}</span>
              </React.Fragment>
            );
          })}
        </h1>

        <style>{`
          h1.hero-title{
            margin:28px auto 0;
            font-family:'Inter',system-ui,sans-serif;
            font-weight:700;
            font-size:clamp(44px,7.4vw,108px);
            line-height:1.02;
            letter-spacing:-0.035em;
            max-width:14ch;
            text-wrap:balance;
          }
        `}</style>

        <Reveal delay={700}>
          <p style={{margin:'28px auto 0', maxWidth:580, fontSize:17.5, lineHeight:1.65, color:'#000000'}}>
            A Mauritius-based backbone, delivering seamless support &amp; operational intelligence.{' '}
            <span style={{color:'#00C4A0', fontWeight:500}}>We power the growth,</span> you take the credit.
          </p>
        </Reveal>

        <Reveal delay={950}>
          <div style={{display:'flex', marginTop:36, justifyContent:'center'}}>
            <a href={window.FRESHKITE_CONTACT || '/contact/'} className="btn" style={{
              background:'linear-gradient(135deg,#1565E0 0%,#00C4A0 100%)',
              color:'white', padding:'14px 28px', fontSize:15, fontWeight:500,
              boxShadow:'0 10px 30px rgba(21,101,224,0.35),inset 0 1px 0 rgba(255,255,255,0.35)',
              textDecoration:'none',
            }}>Start a project</a>
          </div>
        </Reveal>

      </div>
    </section>
  );
};

/* =============================
   CAPABILITIES — white bg, dark glass slider, full-bleed
   ============================= */
const Capabilities = () => {
  const trackRef = useRef(null);
  const outerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  /* Trigger card animations on scroll-into-view */
  useEffect(() => {
    const el = outerRef.current; if (!el) return;
    let done = false;
    const fire = () => {
      if (done) return; done = true;
      el.classList.add('visible');
    };
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { fire(); io.disconnect(); } }),
      { threshold: 0.15 }
    );
    io.observe(el);
    /* fallback */
    const t = setTimeout(() => { fire(); io.disconnect(); }, 1000);
    return () => { io.disconnect(); clearTimeout(t); };
  }, []);

  const onMouseDown = (e) => {
    setIsDragging(true);
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeft.current = trackRef.current.scrollLeft;
  };
  const onMouseUp = () => setIsDragging(false);
  const onMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    trackRef.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.5;
  };
  const onTouchStart = (e) => {
    startX.current = e.touches[0].pageX - trackRef.current.offsetLeft;
    scrollLeft.current = trackRef.current.scrollLeft;
  };
  const onTouchMove = (e) => {
    const x = e.touches[0].pageX - trackRef.current.offsetLeft;
    trackRef.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.5;
  };

  /* Parallax tilt per card */
  const handleCardMove = (e) => {
    if (isDragging) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(900px) rotateX(${-y * 9}deg) rotateY(${x * 9}deg) translateY(-6px) scale(1.02)`;
    card.style.transition = 'transform 0.1s ease';
  };
  const handleCardLeave = (e) => {
    e.currentTarget.style.transform = '';
    e.currentTarget.style.transition = 'transform 0.55s cubic-bezier(0.2,0.8,0.2,1)';
  };

  const cards = [
    { title:'E-commerce',        tagline:'Storefronts built to convert.',        accent:'#1565E0', aR:'21,101,224',
      icon:<svg width="42" height="42" viewBox="0 0 24 24" fill="none"><path d="M3 3h2l2.4 12.1a2 2 0 0 0 2 1.6h8.7a2 2 0 0 0 2-1.5L22 7H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="20" r="1.4" stroke="currentColor" strokeWidth="1.5"/><circle cx="18" cy="20" r="1.4" stroke="currentColor" strokeWidth="1.5"/></svg> },
    { title:'Data Ops',           tagline:'Decisions driven by real data.',       accent:'#00C4A0', aR:'0,196,160',
      icon:<svg width="42" height="42" viewBox="0 0 24 24" fill="none"><path d="M3 21h18M6 17V10M11 17V6M16 17v-8M21 17v-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg> },
    { title:'Project Management', tagline:'Delivered on time, every time.',       accent:'#1A2D5E', aR:'26,45,94',
      icon:<svg width="42" height="42" viewBox="0 0 24 24" fill="none"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" stroke="currentColor" strokeWidth="1.5"/><path d="M7 13h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg> },
    { title:'Tech Support',       tagline:'Always on, so you never go down.',     accent:'#00C4A0', aR:'0,196,160',
      icon:<svg width="42" height="42" viewBox="0 0 24 24" fill="none"><path d="M4 13a8 8 0 0 1 16 0v4a3 3 0 0 1-3 3h-1v-6h4M4 13v4a3 3 0 0 0 3 3h1v-6H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { title:'Content Authoring',  tagline:'Words and visuals that move people.',  accent:'#1565E0', aR:'21,101,224',
      icon:<svg width="42" height="42" viewBox="0 0 24 24" fill="none"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { title:'Web3 Ready',         tagline:'Blockchain-native ops, no friction.',  accent:'#00C4A0', aR:'0,196,160',
      icon:<svg width="42" height="42" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5ZM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  ];

  return (
    <section id="services" style={{
      position:'relative', paddingTop:96, paddingBottom:120,
      background:'#F0F4FF',
      overflow:'hidden',
    }}>

      {/* ── Slowly-drifting gradient layer (glass shimmer effect) ── */}
      <div aria-hidden="true" style={{
        position:'absolute', inset:0, pointerEvents:'none',
        background:`
          radial-gradient(ellipse 80% 60% at 20% 30%, rgba(21,101,224,0.13) 0%, transparent 60%),
          radial-gradient(ellipse 70% 55% at 80% 70%, rgba(0,196,160,0.12) 0%, transparent 60%),
          radial-gradient(ellipse 60% 50% at 55% 15%, rgba(26,45,94,0.07) 0%, transparent 55%)
        `,
        animation:'capGradDrift 16s ease-in-out infinite alternate',
      }}/>
      {/* Dot grid overlay for texture */}
      <div aria-hidden="true" style={{
        position:'absolute', inset:0, pointerEvents:'none',
        backgroundImage:'radial-gradient(circle, rgba(21,101,224,0.05) 1.5px, transparent 0)',
        backgroundSize:'26px 26px',
      }}/>

      {/* Soft blobs behind glass cards */}
      <div aria-hidden="true" style={{position:'absolute',inset:0,pointerEvents:'none',overflow:'hidden'}}>
        <div style={{position:'absolute',left:'-8%',top:'5%',width:680,height:680,background:'radial-gradient(circle,rgba(21,101,224,0.12),transparent 65%)',filter:'blur(70px)',animation:'blobFloat1 20s ease-in-out infinite alternate'}}/>
        <div style={{position:'absolute',right:'4%',top:'2%',width:580,height:580,background:'radial-gradient(circle,rgba(0,196,160,0.11),transparent 65%)',filter:'blur(70px)',animation:'blobFloat2 24s ease-in-out infinite alternate'}}/>
        <div style={{position:'absolute',left:'36%',bottom:'5%',width:500,height:500,background:'radial-gradient(circle,rgba(26,45,94,0.08),transparent 65%)',filter:'blur(60px)',animation:'blobFloat1 18s ease-in-out infinite alternate-reverse'}}/>
      </div>

      {/* Heading — inside container */}
      <div className="container-wide" style={{position:'relative',zIndex:2}}>
        <Reveal>
          <div className="caps-header" style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',gap:48,marginBottom:52,flexWrap:'wrap'}}>
            <div style={{maxWidth:780}}>
              <span className="eyebrow">01 — Capabilities</span>
              <h2 className="font-heading" style={{fontSize:'clamp(32px,4.2vw,56px)',lineHeight:1.08,letterSpacing:'-0.028em',marginTop:16,color:'#000000',fontWeight:600}}>
                Every capability your business needs,{' '}
                <span className="italic-serif grad-text" style={{display:'inline-block',paddingBottom:'0.1em',marginBottom:'-0.1em',paddingRight:'0.1em'}}>under one roof.</span>
              </h2>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:6,minWidth:220}}>
              <span className="mono" style={{fontSize:11,letterSpacing:'.16em',color:'var(--muted-2)'}}>SERVICES — 06</span>
              <p style={{fontSize:14,lineHeight:1.55,color:'#000000',margin:0,maxWidth:300}}>
                Pick one. Pick all. Our teams work as an extension of yours —{' '}
                <span style={{color:'#00B5AD',fontWeight:500}}>no seat-counts, no rigid scopes.</span>
              </p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Full-bleed slider — true centering via padding-inline */}
      <div ref={outerRef} className="caps-track-outer" style={{position:'relative',width:'100%',zIndex:2}}>
        <div
          ref={trackRef}
          className="no-scrollbar caps-track"
          style={{
            overflowX:'auto',
            cursor: isDragging ? 'grabbing' : 'grab',
            userSelect:'none', WebkitUserSelect:'none',
          }}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseUp}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
        >
          {/* Inner flex row — margin:auto centers it when narrower than viewport */}
          <div className="caps-row">
            {cards.map((c, idx) => (
              <article
                key={c.title}
                className="cap-teaser"
                onMouseMove={handleCardMove}
                onMouseLeave={handleCardLeave}
                style={{
                  animationDelay:`${idx * 80}ms`,
                  flex:'0 0 260px', height:320, borderRadius:28,
                  padding:'28px 20px',
                  position:'relative', overflow:'hidden',
                  display:'flex', flexDirection:'column',
                  alignItems:'center', justifyContent:'center',
                  textAlign:'center', gap:20,
                  /* Deep Apple liquid glass */
                  background:'rgba(255,255,255,0.62)',
                  backdropFilter:'blur(56px) saturate(220%) brightness(1.06)',
                  WebkitBackdropFilter:'blur(56px) saturate(220%) brightness(1.06)',
                  border:'1px solid rgba(255,255,255,0.92)',
                  boxShadow:[
                    'inset 0 2px 0 rgba(255,255,255,1)',
                    'inset 0 -1px 0 rgba(21,101,224,0.06)',
                    'inset 1px 0 0 rgba(255,255,255,0.7)',
                    '0 4px 8px rgba(21,101,224,0.04)',
                    '0 12px 40px rgba(21,101,224,0.10)',
                    '0 2px 12px rgba(0,0,0,0.04)',
                  ].join(','),
                  willChange:'transform',
                }}>

                {/* Top specular shine */}
                <div aria-hidden="true" style={{
                  position:'absolute', top:0, left:'12%', right:'12%', height:1,
                  background:`linear-gradient(90deg,transparent,rgba(255,255,255,1) 40%,rgba(255,255,255,1) 60%,transparent)`,
                  borderRadius:999,
                }}/>
                {/* Inner gradient highlight — simulates curved glass surface */}
                <div aria-hidden="true" style={{
                  position:'absolute', inset:0, borderRadius:26, pointerEvents:'none',
                  background:'linear-gradient(170deg,rgba(255,255,255,0.52) 0%,rgba(255,255,255,0.18) 38%,transparent 65%)',
                }}/>
                {/* Accent colour rim at very top */}
                <div aria-hidden="true" style={{
                  position:'absolute', top:0, left:0, right:0, height:2, borderRadius:'26px 26px 0 0',
                  background:`linear-gradient(90deg,transparent 10%,rgba(${c.aR},0.45) 40%,rgba(${c.aR},0.45) 60%,transparent 90%)`,
                }}/>

                {/* Large centred icon */}
                <div style={{
                  width:88, height:88, borderRadius:26,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  background:`rgba(${c.aR},0.10)`,
                  border:`1px solid rgba(${c.aR},0.22)`,
                  color:c.accent,
                  boxShadow:`0 6px 22px rgba(${c.aR},0.18), inset 0 1px 0 rgba(255,255,255,0.7)`,
                  position:'relative', zIndex:1,
                  flexShrink:0,
                }}>{c.icon}</div>

                {/* Title + tagline — centred below icon */}
                <div style={{position:'relative', zIndex:1, width:'100%'}}>
                  <div style={{fontSize:16, fontWeight:600, letterSpacing:'-0.015em', color:'#000000', lineHeight:1.25}}>{c.title}</div>
                  <div className="italic-serif" style={{fontSize:12.5, marginTop:7, color:'#555555', lineHeight:1.45}}>{c.tagline}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes capGradDrift {
          0%   { opacity: 0.7; transform: scale(1) translate(0%, 0%); }
          33%  { opacity: 1;   transform: scale(1.08) translate(3%, -2%); }
          66%  { opacity: 0.85; transform: scale(1.04) translate(-2%, 3%); }
          100% { opacity: 0.9; transform: scale(1.1) translate(2%, 1%); }
        }
        @keyframes blobFloat1 {
          0%   { transform: translate(0,0) scale(1); }
          50%  { transform: translate(40px,-30px) scale(1.08); }
          100% { transform: translate(-20px,20px) scale(0.95); }
        }
        @keyframes blobFloat2 {
          0%   { transform: translate(0,0) scale(1); }
          50%  { transform: translate(-50px,25px) scale(1.06); }
          100% { transform: translate(30px,-15px) scale(1.02); }
        }

        .caps-track { width: 100%; }
        .caps-row {
          display: flex;
          gap: 20px;
          width: max-content;
          min-width: 100%;
          justify-content: center;
          padding: 16px 44px 36px;
          box-sizing: border-box;
        }

        @keyframes cardRise {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        .cap-teaser { opacity: 0; }
        .caps-track-outer.visible .cap-teaser {
          animation: cardRise 0.60s cubic-bezier(0.22,1,0.36,1) both;
        }

        /* Hover: lift + blue glow */
        .cap-teaser:hover {
          box-shadow:
            inset 0 2px 0 rgba(255,255,255,1),
            inset 0 -1px 0 rgba(21,101,224,0.08),
            0 24px 70px rgba(21,101,224,0.16),
            0 8px 24px rgba(0,0,0,0.06) !important;
        }

        @media (max-width:680px){ .caps-header{flex-direction:column;align-items:flex-start !important;} }
        @media (max-width:600px){
          .caps-row{ justify-content:flex-start; padding: 12px 16px 24px; gap: 12px; }
          .cap-teaser{
            flex: 0 0 200px !important;
            height: 260px !important;
            padding: 20px 16px !important;
            border-radius: 22px !important;
          }
          .cap-teaser svg { width: 32px !important; height: 32px !important; }
        }
      `}</style>
    </section>
  );
};

window.Hero = Hero;
window.Capabilities = Capabilities;
