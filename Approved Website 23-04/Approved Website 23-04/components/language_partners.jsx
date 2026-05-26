/* global React, Reveal, Accent, Icon */

/* =============================
   LANGUAGE + TIMEZONE
   ============================= */
const Language = () => {
  const [fr, setFr] = useState(false);
  return (
    <section className="section" style={{paddingTop: 40}}>
      <div className="container-wide">
        <div style={{display:'grid', gridTemplateColumns:'1.1fr 1fr', gap: 40, alignItems:'center'}} className="lang-grid">
          <Reveal>
            <span className="eyebrow">02 — Fluency</span>
            <h2 className="font-heading" style={{fontSize:'clamp(34px, 4.5vw, 58px)', lineHeight: 1, letterSpacing:'-0.025em', marginTop: 14}}>
              We work in your language. <Accent>Both of them.</Accent>
            </h2>
            <p style={{maxWidth: 480, marginTop: 22, fontSize: 16.5, lineHeight: 1.6, color:'#000000'}}>
              Our team operates fluently in{' '}
              <span style={{color:'#1565E0', fontWeight:500}}>English</span> and{' '}
              <span style={{color:'#00C4A0', fontWeight:500}}>French</span>,
              ensuring nothing gets lost in translation — from discovery calls to final delivery. Hover the card to switch.
            </p>
            <div style={{display:'flex', gap: 20, marginTop: 32}}>
              {[
                {k:'EN', v:'English', sub:'Native-level'},
                {k:'FR', v:'Français', sub:'Natif'},
              ].map(l=>(
                <div key={l.k} className="glass" style={{padding:'14px 18px', borderRadius: 18, minWidth: 150, overflow:'visible'}}>
                  <div className="italic-serif grad-text" style={{fontSize: 28, lineHeight: 1.15, paddingLeft:'0.05em', paddingRight:'0.15em', overflow:'visible'}}>{l.k}</div>
                  <div style={{fontSize: 13.5, color:'var(--ink)', marginTop: 6, fontWeight: 500}}>{l.v}</div>
                  <div style={{fontSize: 11.5, color:'var(--muted)'}}>{l.sub}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div
              className="card-brand"
              style={{
                aspectRatio:'16/10',
                padding: '28px 30px',
                display:'flex', flexDirection:'column',
                cursor: 'pointer',
                minHeight: 260,
              }}
              onMouseEnter={()=>setFr(true)}
              onMouseLeave={()=>setFr(false)}
              onClick={()=>setFr(x=>!x)}
            >
              <div style={{
                display:'inline-flex', alignSelf:'center', gap: 0, padding: 4, borderRadius: 999,
                background:'rgba(255,255,255,0.18)', position:'relative', backdropFilter:'blur(10px)',
                border:'1px solid rgba(255,255,255,0.25)',
              }}>
                <div style={{
                  position:'absolute', top: 4, bottom: 4,
                  left: fr ? '50%' : 4,
                  width: 'calc(50% - 4px)',
                  background:'rgba(255,255,255,0.95)',
                  borderRadius: 999,
                  transition:'left .5s cubic-bezier(.6,.1,.2,1)',
                }}/>
                {['EN','FR'].map((t, i)=>(
                  <span key={t} style={{
                    position:'relative', zIndex: 1,
                    padding:'6px 22px', fontSize: 12.5, fontWeight: 600, letterSpacing: '.05em',
                    color: (i===1)===fr ? '#1A2D5E' : 'rgba(255,255,255,0.9)',
                    transition:'color .4s ease'
                  }}>{t}</span>
                ))}
              </div>

              <div style={{
                flex: 1,
                display:'flex', alignItems:'center', justifyContent:'center',
                position:'relative', overflow:'hidden', padding: '20px 0'
              }}>
                <div style={{position:'relative', width:'100%', height: 70}}>
                  {[
                    { lang:'en', text:'Delivering results that drive real growth' },
                    { lang:'fr', text:'Des résultats qui propulsent la croissance' }
                  ].map((row, i)=>{
                    const active = (i===1) === fr;
                    return (
                      <div key={row.lang} className="italic-serif" style={{
                        position:'absolute', inset: 0,
                        display:'flex', alignItems:'center', justifyContent:'center',
                        fontSize: 'clamp(18px, 2.2vw, 26px)',
                        color: 'white', textAlign:'center',
                        padding:'0 10px',
                        transform: active ? 'translateY(0)' : (fr ? 'translateY(-120%)' : 'translateY(120%)'),
                        opacity: active ? 1 : 0,
                        filter: active ? 'blur(0)' : 'blur(6px)',
                        transition: 'transform .6s cubic-bezier(.6,.1,.2,1), opacity .5s ease, filter .5s ease'
                      }}>
                        {row.text}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{
                textAlign:'center', fontSize: 10.5, letterSpacing:'.22em',
                color:'rgba(255,255,255,0.7)', textTransform:'uppercase', fontFamily:'JetBrains Mono, monospace'
              }}>
                {fr ? 'Survolez pour revenir' : 'Hover to translate'}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Timezone chart */}
        <div style={{display:'grid', gridTemplateColumns:'1.3fr 1fr', gap: 60, alignItems:'center', marginTop: 90}} className="lang-grid">
          <Reveal>
            <TimeChart/>
          </Reveal>
          <Reveal delay={150}>
            <h3 className="font-heading" style={{fontSize:'clamp(30px, 4vw, 50px)', lineHeight: 1, letterSpacing:'-0.025em', color:'#000000'}}>
              More hours in your day. <Accent>By design.</Accent>
            </h3>
            <ul style={{listStyle:'none', padding: 0, margin: '22px 0 0', display:'flex', flexDirection:'column', gap: 12}}>
              {[
                'Overlap with European mornings and US afternoons',
                'Work progresses while you sleep',
                'Real-time collaboration when it matters',
                'Faster turnaround, longer effective working day',
              ].map(t=>(
                <li key={t} style={{display:'flex', gap: 12, alignItems:'flex-start', color:'#000000', fontSize: 15}}>
                  <span style={{
                    marginTop: 8, width: 5, height: 5, borderRadius: 999,
                    background:'var(--grad-accent-text)', flex:'0 0 auto'
                  }}/>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px){
          .lang-grid{ grid-template-columns: 1fr !important; gap: 30px !important;}
        }
        @media (max-width: 560px){
          .tz-row { grid-template-columns: 72px 1fr !important; gap: 8px !important; }
          .tz-time { display: none !important; }
          .tz-label div:first-child { font-size: 11.5px !important; }
        }
      `}</style>
    </section>
  );
};

const TimeChart = () => {
  const chartRef    = useRef(null);
  const tracksRef   = useRef(null);   // the column that holds all three tracks
  const nowRef      = useRef(null);   // the "Now" vertical line
  const barRefs     = useRef({});
  const [tooltip, setTooltip] = useState(null);  // {x, y, times}

  /* ── helpers ────────────────────────────── */
  const utcNow = () => {
    const d = new Date();
    return d.getUTCHours() + d.getUTCMinutes() / 60;
  };

  const localTimesAt = (utcH) => {
    const fmt = (off) => {
      const h = ((Math.floor(utcH) + off) % 24 + 24) % 24;
      const m = String(Math.round((utcH % 1) * 60)).padStart(2,'0');
      return `${h}:${m}`;
    };
    return { freshkite: fmt(4), europe: fmt(1), usEast: fmt(-5) };
  };

  /* ── GSAP entry animation (fires once on scroll) ── */
  useEffect(() => {
    const el = chartRef.current; if (!el) return;
    let fired = false;
    const run = () => {
      if (fired) return; fired = true;
      const rows = [
        { key:'freshkite', startH:4,  endH:16  },
        { key:'europe',    startH:8,  endH:17  },
        { key:'usEast',    startH:13, endH:22  },
      ];
      rows.forEach(({ key, startH, endH }, i) => {
        const bar = barRefs.current[key]; if (!bar) return;
        const targetW = `${((endH - startH) / 24) * 100}%`;
        if (window.gsap) {
          gsap.fromTo(bar,
            { width: 0, opacity: 0 },
            { width: targetW, opacity: 1,
              duration: 0.9, delay: i * 0.14,
              ease: 'power3.out' }
          );
        } else {
          bar.style.width = targetW;
          bar.style.opacity = 1;
        }
      });
    };
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { run(); io.disconnect(); }
    }), { threshold: 0.35 });
    io.observe(el);
    const t = setTimeout(() => { run(); io.disconnect(); }, 1200);
    return () => { io.disconnect(); clearTimeout(t); };
  }, []);

  /* ── "Now" indicator — updates every 60 s ── */
  useEffect(() => {
    const place = () => {
      const el = nowRef.current; if (!el) return;
      const pct = (utcNow() / 24) * 100;
      el.style.left = `${pct}%`;
    };
    place();
    const iv = setInterval(place, 60000);
    return () => clearInterval(iv);
  }, []);

  /* ── Hover row glow ── */
  const onRowEnter = (key) => {
    const bar = barRefs.current[key]; if (!bar || !window.gsap) return;
    gsap.to(bar, { filter:'brightness(1.22)', duration:0.18 });
  };
  const onRowLeave = () => {
    Object.values(barRefs.current).forEach(b => {
      if (b && window.gsap) gsap.to(b, { filter:'brightness(1)', duration:0.22 });
    });
  };

  /* ── Cursor tooltip ── */
  const onMouseMove = (e) => {
    const track = tracksRef.current; if (!track) return;
    const r = track.getBoundingClientRect();
    const x = e.clientX - r.left;
    if (x < 0 || x > r.width) { setTooltip(null); return; }
    const utcH = (x / r.width) * 24;
    setTooltip({ x: e.clientX - chartRef.current.getBoundingClientRect().left, times: localTimesAt(utcH) });
  };
  const onMouseLeave = () => setTooltip(null);

  /* ── Row data ── */
  const ROWS = [
    { key:'freshkite', label:'Freshkite', sub:'UTC +4',   startH:4,  endH:16, grad:'linear-gradient(90deg,#1565E0 0%,#00C4A0 55%,#1A2D5E 100%)', tag:'YOUR TEAM' },
    { key:'europe',    label:'Europe',    sub:'UTC +1',   startH:8,  endH:17, grad:'linear-gradient(90deg,#00C4A0 0%,#1565E0 100%)'               },
    { key:'usEast',    label:'US East',   sub:'UTC −5',   startH:13, endH:22, grad:'linear-gradient(90deg,#1A2D5E 0%,#0D1B3B 100%)'               },
  ];

  return (
    <div ref={chartRef} style={{position:'relative', userSelect:'none'}}>

      {/* ── rows ── */}
      <div style={{display:'flex', flexDirection:'column', gap:12}}
           onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>

        {/* Track area wrapper — needed to anchor the "Now" line */}
        <div style={{position:'relative'}}>

          {/* "Now" vertical line — spans all rows */}
          <div ref={nowRef} aria-hidden="true" style={{
            position:'absolute', top:0, bottom:0,
            left:`${(utcNow()/24)*100}%`,
            width:2, zIndex:20, pointerEvents:'none',
            background:'rgba(21,101,224,0.70)',
            borderRadius:999,
            boxShadow:'0 0 0 3px rgba(255,255,255,0.65)',
          }}/>

          {ROWS.map((r, i) => {
            const leftPct  = (r.startH / 24) * 100;
            return (
              <div key={r.key}
                className="tz-row"
                style={{display:'grid', gridTemplateColumns:'100px 1fr 80px',
                        alignItems:'center', gap:12,
                        marginBottom: i < ROWS.length-1 ? 10 : 0 }}
                onMouseEnter={() => onRowEnter(r.key)}
                onMouseLeave={onRowLeave}
              >
                {/* Label */}
                <div className="tz-label">
                  <div style={{fontSize:12.5, fontWeight:500, color:'var(--ink)', lineHeight:1.2, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{r.label}</div>
                  <div style={{fontSize:10.5, color:'var(--muted-2)', marginTop:2}}>{r.sub}</div>
                  {r.tag && (
                    <span style={{display:'inline-block', marginTop:4, fontSize:8.5, fontWeight:600,
                      padding:'2px 6px', borderRadius:6,
                      background:'var(--ink)', color:'white', letterSpacing:'.04em'}}>
                      {r.tag}
                    </span>
                  )}
                </div>

                {/* Track + pill bar */}
                <div style={{
                  position:'relative', height:38, borderRadius:999,
                  background:'rgba(21,101,224,0.055)',
                  minWidth:0,
                }}>
                  <div
                    ref={el => barRefs.current[r.key] = el}
                    style={{
                      position:'absolute', top:0, bottom:0,
                      left:`${leftPct}%`,
                      width:0, opacity:0,
                      borderRadius:999,
                      background: r.grad,
                      boxShadow:`0 4px 18px rgba(0,0,0,0.12)`,
                      willChange:'width,opacity',
                    }}
                  />
                </div>

                {/* Time range */}
                <div className="tz-time" style={{fontSize:10.5, color:'var(--muted)', textAlign:'right', lineHeight:1.5, whiteSpace:'nowrap'}}>
                  {r.startH}h–{r.endH}h<br/>
                  <span style={{color:'var(--muted-2)', fontSize:9.5}}>local</span>
                </div>
              </div>
            );
          })}

          {/* Invisible overlay to capture mouse for tooltip */}
          <div ref={tracksRef} style={{
            position:'absolute', inset:0, pointerEvents:'none',
          }}/>
        </div>
      </div>

      {/* ── Cursor tooltip ── */}
      {tooltip && (
        <div style={{
          position:'absolute', top:-56,
          left: tooltip.x, transform:'translateX(-50%)',
          background:'rgba(21,101,224,0.92)', color:'white',
          borderRadius:10, padding:'8px 13px',
          fontSize:11.5, fontFamily:'JetBrains Mono,monospace',
          whiteSpace:'nowrap', pointerEvents:'none',
          border:'1px solid rgba(255,255,255,0.15)',
          backdropFilter:'blur(10px)',
          boxShadow:'0 8px 24px rgba(21,101,224,0.35)',
          zIndex:50,
        }}>
          <div style={{opacity:0.6, fontSize:9.5, marginBottom:5, letterSpacing:'.06em'}}>LOCAL TIMES</div>
          <div>🇲🇺 {tooltip.times.freshkite} &nbsp; 🇪🇺 {tooltip.times.europe} &nbsp; 🇺🇸 {tooltip.times.usEast}</div>
        </div>
      )}

      {/* ── Coverage summary ── */}
      <Reveal delay={250}>
        <div style={{marginTop:24, padding:'16px 20px', borderRadius:16,
          background:'rgba(21,101,224,0.03)', border:'1px solid rgba(21,101,224,0.07)'}}>
          <div className="eyebrow" style={{marginBottom:10}}>Continuous Coverage (UTC)</div>
          <div style={{display:'flex', flexDirection:'column', gap:6, fontSize:13}}>
            {[
              { dot:'#00C4A0', text:<>Freshkite × Europe → overlap <b>08h–16h UTC</b> = <span className="italic-serif" style={{color:'#00C4A0'}}>8h together</span></> },
              { dot:'#1565E0', text:<>Freshkite × US East → overlap <b>13h–16h UTC</b> = <span className="italic-serif" style={{color:'#1565E0'}}>3h together</span></> },
              { dot:'#1A2D5E', text:<>Total coverage: <b>04h–22h UTC</b> = <span className="italic-serif" style={{color:'#1A2D5E'}}>18h of continuous productivity</span></> },
            ].map((item, i) => (
              <div key={i} style={{display:'flex', alignItems:'center', gap:10}}>
                <span style={{width:8, height:8, borderRadius:999, background:item.dot, flexShrink:0}}/>
                <span style={{color:'var(--ink-2)'}}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
};

/* =============================
   PARTNERS — real logos only
   ============================= */
const Partners = () => {
  const _uri = window.FRESHKITE_URI || '';
  const partners = [
    { name:'Freshop',   src: _uri + '/assets/partner-freshop.png' },
    { name:'NCR Voyix', src: _uri + '/assets/partner-ncr-voyix.png' },
    { name:'Forage',    src: _uri + '/assets/partner-forage.png' },
  ];

  return (
    <section id="partners" style={{padding: '90px 0 100px', position:'relative'}}>
      <div className="container-wide" style={{textAlign:'center'}}>
        <Reveal>
          <div className="eyebrow" style={{letterSpacing:'.28em', fontSize: 12}}>03 — Partners</div>
          <h2 className="font-heading" style={{
            fontSize:'clamp(32px, 4.2vw, 56px)',
            lineHeight: 1.05, letterSpacing:'-0.025em', marginTop: 14, color:'#000000',
          }}>
            Who we partner <span className="italic-serif grad-text">with.</span>
          </h2>
          <div style={{width: 44, height: 2, background:'var(--grad-accent-text)', margin:'18px auto 0', borderRadius: 999}}/>
        </Reveal>

        <Reveal delay={150}>
          <div style={{
            display:'flex', gap: 80,
            alignItems:'center', justifyContent:'center',
            marginTop: 56, flexWrap:'wrap',
          }}>
            {partners.map((p)=>(
              <div key={p.name} title={p.name} className="partner-logo" style={{
                height: 70, display:'flex', alignItems:'center', justifyContent:'center',
                filter:'grayscale(0.15)', opacity: 0.88,
                transition:'opacity .3s ease, filter .3s ease, transform .4s ease',
              }}>
                <img src={p.src} alt={p.name} style={{maxWidth: 180, maxHeight: 58, objectFit:'contain'}}/>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
      <style>{`.partner-logo:hover{ filter: none; opacity: 1; transform: translateY(-3px); }`}</style>
    </section>
  );
};

/* =============================
   WHY US
   ============================= */
const WhyUs = () => {
  const items = [
    { big:'No handoffs',            bigColor:'#000000', sub:'Your operators and ours move as one team — same Slack, same rituals, same urgency.' },
    { big:'Long-term by default',   bigColor:'#000000', sub:'Average engagement runs 2+ years. We learn your business so you don\'t repeat yourself.' },
    { big:'Priced for leverage',    bigColor:'#000000', sub:'Flat monthly pricing. Scale capacity without scaling headcount, vendors, or contracts.' },
    { big:'Built on islands, not silos', bigColor:'#000000', sub:'Mauritius time, European rhythm, global fluency — a calm place to run serious ops.' },
  ];
  return (
    <section id="why-us" className="section" style={{paddingTop: 20}}>
      <div className="container-wide">
        <Reveal>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', flexWrap:'wrap', gap: 30}}>
            <h2 className="font-heading" style={{fontSize:'clamp(34px, 4.8vw, 64px)', lineHeight: 1.05, letterSpacing:'-0.025em', color:'#000000'}}>
              The difference,{' '}
              <span className="italic-serif" style={{
                background:'var(--grad-accent-text)',
                WebkitBackgroundClip:'text', backgroundClip:'text',
                WebkitTextFillColor:'transparent', color:'transparent',
                display:'inline-block',
                paddingBottom:'0.2em', marginBottom:'-0.2em',
                paddingRight:'0.08em',
              }}>quietly felt.</span>
            </h2>
            <span className="eyebrow">04 — Why Us</span>
          </div>
        </Reveal>
        <Reveal>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap: 18, marginTop: 48}}>
            {items.map((it, i)=>(
              <Reveal key={it.big} delay={i*80}>
                <div className="glass" style={{padding: 28, borderRadius: 22, height: '100%'}}>
                  <div className="italic-serif" style={{fontSize: 32, lineHeight: 1.05, letterSpacing:'-0.02em', color: it.bigColor || '#000000'}}>{it.big}</div>
                  <div style={{height: 1, background:'var(--grad-accent-text)', backgroundSize:'100% 100%', opacity:0.25, margin:'18px 0'}}/>
                  <p style={{fontSize: 14, lineHeight: 1.6, color:'#000000'}}>{it.sub}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

/* =============================
   TEAM
   ============================= */
const Team = () => {
  const people = [
    { name:'Aanya Ramgoolam', role:'Head of Ops', loc:'Port Louis', color:'#1565E0' },
    { name:'Hugo Béranger', role:'Data Lead', loc:'Curepipe · Paris', color:'#00C4A0' },
    { name:'Kiran Soobroydoo', role:'Project Director', loc:'Mahébourg', color:'#00C4A0' },
    { name:'Louise Cadet', role:'Client Partner', loc:'Lyon · MU', color:'#1565E0' },
  ];
  return (
    <section id="team" className="section" style={{paddingTop: 60}}>
      <div className="container-wide">
        <Reveal>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', flexWrap:'wrap', gap: 30}}>
            <h2 className="font-heading" style={{fontSize:'clamp(34px, 4.8vw, 64px)', lineHeight: 1, letterSpacing:'-0.025em'}}>
              A team of operators, <Accent>not contractors.</Accent>
            </h2>
            <span className="eyebrow">05 — Team</span>
          </div>
        </Reveal>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(230px, 1fr))', gap: 18, marginTop: 48}}>
          {people.map((p,i)=>(
            <Reveal key={p.name} delay={i*80}>
              <div className="glass" style={{padding: 22, borderRadius: 22, height: '100%'}}>
                <div style={{
                  aspectRatio:'1', borderRadius: 16,
                  background: `
                    radial-gradient(120% 80% at 30% 20%, ${p.color}55, transparent 60%),
                    radial-gradient(120% 80% at 80% 80%, rgba(0,196,160,0.33), transparent 60%),
                    linear-gradient(135deg, #EFF4FF, #E8F2FF)
                  `,
                  marginBottom: 16, position:'relative', overflow:'hidden',
                  display:'flex', alignItems:'flex-end', padding: 14,
                }}>
                  <span className="eyebrow" style={{color:'var(--ink)'}}>{p.loc}</span>
                </div>
                <div style={{fontSize: 16, fontWeight: 500, color:'#000000'}}>{p.name}</div>
                <div style={{fontSize: 12.5, color:'#555555', marginTop: 2}}>{p.role}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* =============================
   CTA + FOOTER
   ============================= */
const CTAFooter = () => {
  return (
    <section id="contact" className="section" style={{paddingTop: 20}}>
      <div className="container-wide">
        <Reveal>
          <div className="card-brand" style={{padding: 'clamp(48px, 7vw, 96px) clamp(40px, 6vw, 80px)', borderRadius: 32, textAlign:'center'}}>
            <span className="eyebrow" style={{color:'rgba(255,255,255,0.7)'}}>05 — Contact</span>
            <h2 className="font-heading" style={{
              fontSize:'clamp(40px, 5.5vw, 80px)',
              lineHeight: .95, letterSpacing:'-0.03em',
              color:'white', marginTop: 16, maxWidth: 820, margin:'16px auto 0',
            }}>
              Your ops, <span className="italic-serif">quietly working</span> —<br/>
              while you take the stage.
            </h2>
            <p style={{color:'rgba(255,255,255,0.88)', fontSize: 17, marginTop: 22, maxWidth: 500, margin:'22px auto 0'}}>
              Tell us what you're building. We'll tell you how we'd run the ops behind it.{' '}
              <span style={{color:'#00C4A0', fontWeight:500}}>No commitment, no pitch deck</span> — just a conversation.
            </p>
            <div style={{display:'flex', marginTop: 36, justifyContent:'center'}}>
              <a href={window.FRESHKITE_CONTACT || '/contact/'} className="btn" style={{background:'white', color:'var(--ink)', padding:'14px 28px', fontSize: 15, textDecoration:'none'}}>
                Start a project <Icon.arrow/>
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="footer">
            <div style={{display:'grid', gridTemplateColumns:'1.4fr 1fr 1fr 1fr', gap: 40, alignItems:'flex-start'}} className="foot-grid">
              <Reveal>
                <div>
                  <div style={{display:'flex', alignItems:'center'}}>
                    <span style={{fontWeight:700, fontSize:15, letterSpacing:'0.14em', color:'#1565E0'}}>FRESHKITE</span>
                  </div>
                  <p style={{marginTop: 14, maxWidth: 340, fontSize: 13.5, color:'#000000'}}>
                    Operational backbone for modern teams.{' '}
                    <span style={{color:'#00C4A0', fontWeight:500}}>Built in Mauritius,</span> trusted worldwide.
                  </p>
                </div>
              </Reveal>
              {[
                {h:'Studio', l:['Services','Partners','Team','Contact']},
                {h:'Company', l:['About','Playbook','Journal','Careers']},
                {h:'Legal', l:['Privacy','Terms','Security','Cookies']},
              ].map((col, i)=>(
                <Reveal key={col.h} delay={i*60}>
                  <div>
                    <div className="eyebrow" style={{marginBottom: 14}}>{col.h}</div>
                    <ul style={{listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap: 10}}>
                      {col.l.map(x=><li key={x}><a href="#" className="link-under" style={{color:'#000000', textDecoration:'none', fontSize: 14}}>{x}</a></li>)}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
            <div style={{display:'flex', justifyContent:'space-between', marginTop: 48, paddingTop: 22, borderTop:'1px solid var(--line)', fontSize: 12.5, color:'var(--muted)'}} className="foot-bottom">
              <span>© 2026 Freshkite Ltd. Registered in Quatre Bornes, Mauritius.</span>
              <span style={{display:'flex', gap: 18}}>
                <span style={{display:'inline-flex', alignItems:'center', gap: 6}}>
                  <span style={{width: 6, height: 6, borderRadius: 999, background:'#16A34A'}}/> All systems operational
                </span>
                <span>UTC+4 · Port Louis</span>
              </span>
            </div>
          </div>
        </Reveal>
      </div>
      <style>{`
        @media (max-width: 900px){
          .cta-grid{ grid-template-columns: 1fr !important; }
          .foot-grid{ grid-template-columns: 1fr 1fr !important;}
          .foot-bottom{ flex-direction: column; gap: 10px;}
        }
      `}</style>
    </section>
  );
};

window.Language = Language;
window.Partners = Partners;
window.WhyUs = WhyUs;
window.Team = Team;
window.CTAFooter = CTAFooter;
