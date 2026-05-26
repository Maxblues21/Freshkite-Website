/* global React, Reveal, BlurText, Nav, Icon */
const { useState } = React;

const people = [
  { name:'Aanya Ramgoolam',  role:'Head of Operations',    dept:'Leadership',      loc:'Port Louis',           bio:'Orchestrates the full ops machine. 10 years building high-performance remote teams across Mauritius and Europe.', color:'#7C3AED', aR:'124,58,237',  initials:'AR' },
  { name:'Hugo Béranger',    role:'Data Lead',              dept:'Technology',      loc:'Curepipe · Paris',     bio:'Turns messy pipelines into clean decisions. Previously at Ubisoft and BNP Paribas data teams.',                  color:'#22D3EE', aR:'34,211,238',  initials:'HB' },
  { name:'Kiran Soobroydoo', role:'Project Director',       dept:'Operations',      loc:'Mahébourg',            bio:'Certified PMP with a bias for action. Keeps 15+ concurrent sprints on track without breaking a sweat.',           color:'#14B8A6', aR:'20,184,166',  initials:'KS' },
  { name:'Louise Cadet',     role:'Client Partner',         dept:'Client & Growth', loc:'Lyon · MU',            bio:'Your main point of contact and strategic partner. Fluent in French and English, expert at translating vision.',    color:'#6366F1', aR:'99,102,241',  initials:'LC' },
  { name:'Priya Nundlall',   role:'E-commerce Lead',        dept:'Operations',      loc:'Rose Hill',            bio:'Shopify and custom storefronts specialist. Scaled 30+ merchant brands across EU and US markets.',                color:'#A855F7', aR:'168,85,247', initials:'PN' },
  { name:'Matteo Ferrara',   role:'Tech Support Lead',      dept:'Technology',      loc:'Quatre Bornes · Milan',bio:'Bilingual Tier 1–3 support architect. Obsessed with SLAs and never misses a resolution target.',                color:'#0EA5E9', aR:'14,165,233',  initials:'MF' },
  { name:'Chloé Martin',     role:'Growth Ops Strategist',  dept:'Client & Growth', loc:'Ebène',                bio:'Lifecycle and retention engineer. Runs A/B programmes that compound wins quietly in the background.',             color:'#F472B6', aR:'244,114,182', initials:'CM' },
  { name:'Ravi Lutchmanen',  role:'Intelligence Analyst',   dept:'Operations',      loc:'Vacoas',               bio:'Competitive intelligence and market research. Converts noise into the signal your leadership actually needs.',     color:'#34D399', aR:'52,211,153',  initials:'RL' },
];

const filters = ['All', 'Leadership', 'Operations', 'Technology', 'Client & Growth'];

const TeamPage = () => {
  const [active, setActive] = useState('All');
  const visible = active === 'All' ? people : people.filter(p => p.dept === active);

  return (
    <>
      <Nav/>
      <main style={{paddingTop:120, paddingBottom:120, minHeight:'100vh'}}>
        <div className="container-wide">

          <Reveal>
            <span className="eyebrow">05 — Team</span>
            <BlurText as="h1" delay={60} text="Operators, not contractors." className="team-title"/>
            <style>{`
              h1.team-title{ margin:16px 0 0; font-weight:700; font-size:clamp(40px,6vw,88px); line-height:1.02; letter-spacing:-0.035em; max-width:18ch; color:var(--ink); }
            `}</style>
            <p style={{maxWidth:580, marginTop:22, fontSize:17, lineHeight:1.6, color:'var(--muted)'}}>
              A tight-knit team embedded in your operations — not a vendor pool, not a call centre.
              Every person here has skin in the game.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div style={{display:'flex', gap:10, flexWrap:'wrap', marginTop:44}}>
              {filters.map(f => (
                <button key={f} onClick={() => setActive(f)} style={{
                  padding:'9px 18px', borderRadius:999,
                  border: active===f ? '1px solid rgba(124,58,237,0.35)' : '1px solid rgba(10,22,40,0.10)',
                  background: active===f ? 'linear-gradient(135deg,rgba(124,58,237,0.12),rgba(20,184,166,0.10))' : 'rgba(255,255,255,0.60)',
                  backdropFilter:'blur(12px)', WebkitBackdropFilter:'blur(12px)',
                  color: active===f ? 'var(--violet)' : 'var(--muted)',
                  fontSize:13.5, fontWeight: active===f ? 600 : 450,
                  cursor:'pointer', transition:'all .25s ease', fontFamily:'inherit',
                  boxShadow: active===f ? '0 4px 16px rgba(124,58,237,0.15)' : 'none',
                }}>{f}</button>
              ))}
            </div>
          </Reveal>

          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:20, marginTop:52}}>
            {visible.map((p, i) => (
              <Reveal key={p.name} delay={i*70}>
                <div className="team-card" style={{
                  borderRadius:22, overflow:'hidden', position:'relative',
                  background:'linear-gradient(155deg,rgba(255,255,255,0.88) 0%,rgba(255,255,255,0.65) 100%)',
                  backdropFilter:'blur(20px) saturate(160%)', WebkitBackdropFilter:'blur(20px) saturate(160%)',
                  border:`1px solid rgba(${p.aR},0.18)`,
                  boxShadow:`inset 0 1px 0 rgba(255,255,255,0.95),0 8px 30px rgba(10,22,40,0.08),0 0 0 0.5px rgba(${p.aR},0.10)`,
                  transition:'transform 0.35s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.35s ease',
                }}>
                  <div style={{
                    height:200, position:'relative',
                    background:`radial-gradient(120% 80% at 30% 20%,rgba(${p.aR},0.45),transparent 55%),radial-gradient(100% 70% at 80% 80%,rgba(20,184,166,0.30),transparent 55%),linear-gradient(160deg,#EEF2FF 0%,#F5F3FF 100%)`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                  }}>
                    <div style={{
                      width:72, height:72, borderRadius:999,
                      background:`rgba(${p.aR},0.15)`, border:`1.5px solid rgba(${p.aR},0.30)`,
                      backdropFilter:'blur(8px)',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontSize:22, fontWeight:600, color:p.color,
                    }}>{p.initials}</div>
                    <div style={{
                      position:'absolute', top:14, right:14,
                      padding:'4px 10px', borderRadius:999,
                      background:'rgba(255,255,255,0.75)', backdropFilter:'blur(10px)',
                      border:`1px solid rgba(${p.aR},0.20)`,
                      fontSize:10.5, fontWeight:600, letterSpacing:'.06em', textTransform:'uppercase',
                      color:p.color, fontFamily:'JetBrains Mono, monospace',
                    }}>{p.dept}</div>
                    <div style={{
                      position:'absolute', bottom:12, left:14,
                      display:'flex', alignItems:'center', gap:5,
                      fontSize:11, color:'rgba(10,22,40,0.55)', fontWeight:500,
                    }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="currentColor" opacity=".5"/>
                        <circle cx="12" cy="9" r="2.5" fill="currentColor"/>
                      </svg>
                      {p.loc}
                    </div>
                  </div>
                  <div style={{padding:'18px 20px 22px'}}>
                    <div style={{fontSize:16.5, fontWeight:600, color:'var(--ink)', letterSpacing:'-0.015em'}}>{p.name}</div>
                    <div style={{fontSize:12.5, color:p.color, fontWeight:500, marginTop:3}}>{p.role}</div>
                    <div style={{height:1, background:`rgba(${p.aR},0.12)`, margin:'14px 0'}}/>
                    <p style={{fontSize:13, lineHeight:1.55, color:'var(--muted)', margin:0}}>{p.bio}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={300}>
            <div style={{
              marginTop:80, padding:'clamp(36px,5vw,60px)', borderRadius:28,
              background:'var(--grad-brand)', position:'relative', overflow:'hidden',
              boxShadow:'var(--shadow-float)',
              display:'flex', alignItems:'center', justifyContent:'space-between', gap:32, flexWrap:'wrap',
            }}>
              <div style={{position:'absolute',inset:0,background:'radial-gradient(600px 200px at 20% 0%,rgba(255,255,255,0.30),transparent 60%)',pointerEvents:'none'}}/>
              <div style={{position:'relative',zIndex:1}}>
                <h2 className="font-heading" style={{fontSize:'clamp(26px,3.5vw,48px)',lineHeight:1.05,color:'white',letterSpacing:'-0.025em'}}>Want to work with us?</h2>
                <p style={{color:'rgba(255,255,255,0.80)',fontSize:15.5,marginTop:10,maxWidth:480}}>We're always looking for sharp operators who take ownership. No big org politics — just real work.</p>
              </div>
              <a href={window.FRESHKITE_CONTACT || '/contact/'} className="btn" style={{position:'relative',zIndex:1,background:'white',color:'var(--ink)',padding:'14px 26px',fontSize:15,fontWeight:500,textDecoration:'none',flexShrink:0,boxShadow:'0 8px 24px rgba(10,22,40,0.20)'}}>
                Get in touch <Icon.arrow/>
              </a>
            </div>
          </Reveal>

        </div>
      </main>

      <footer style={{borderTop:'1px solid var(--line)',padding:'28px 0',fontSize:12.5,color:'var(--muted)'}}>
        <div className="container-wide" style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:16}}>
          <a href={window.FRESHKITE_HOME || '/'} style={{color:'var(--muted)',textDecoration:'none',display:'flex',alignItems:'center',gap:8}}>
            <span style={{width:22,height:22,borderRadius:8,background:'var(--grad-brand)',display:'inline-flex',alignItems:'center',justifyContent:'center'}}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M12 2 L20 9 L12 22 L4 9 Z" fill="white"/></svg>
            </span>
            Back to home
          </a>
          <span>© 2026 Freshkite Ltd. · Port Louis, Mauritius</span>
        </div>
      </footer>

      <style>{`
        .team-card:hover{ transform:translateY(-5px); box-shadow:0 20px 50px rgba(10,22,40,0.12),0 0 0 0.5px rgba(124,58,237,0.15) !important; }
        @media(max-width:640px){ h1.team-title{ font-size:clamp(36px,9vw,56px); } }
      `}</style>
    </>
  );
};

window.TeamPage = TeamPage;
