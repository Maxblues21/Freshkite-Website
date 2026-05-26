<?php
/**
 * Freshkite — Contact Page Template
 *
 * Assign this template to the Contact page in the WordPress admin:
 *   Pages > Contact > Page Attributes > Template: "Contact Page"
 *
 * Template Name: Contact Page
 *
 * @package Freshkite
 */

// Override body background for the dark contact page.
add_action( 'wp_head', function() {
    echo '<style>body { background: #050D1F; margin: 0; }</style>' . "\n";
} );

get_header();
?>

<div id="root" style="position:relative; z-index:1;"></div>

<!-- Core components (Nav, Reveal, Icon, etc.) -->
<script type="text/babel" data-presets="react"
  src="<?php echo esc_url( get_template_directory_uri() ); ?>/components/core.jsx?v=16"></script>

<!-- Contact page component -->
<script type="text/babel" data-presets="react">

  const ContactPage = () => {
    const [mouse, setMouse] = React.useState({ x: 40, y: 38 });
    const [show,  setShow]  = React.useState(false);

    React.useEffect(() => {
      const onMove = (e) => setMouse({
        x: (e.clientX / window.innerWidth)  * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
      window.addEventListener('mousemove', onMove);
      return () => window.removeEventListener('mousemove', onMove);
    }, []);

    React.useEffect(() => {
      const t = setTimeout(() => setShow(true), 180);
      return () => clearTimeout(t);
    }, []);

    const methods = [
      {
        title: 'WhatsApp',
        desc: 'Message us directly for a quick response. We typically reply within the hour.',
        ctas: [{ label: '+230 598 96 888', href: 'https://wa.me/23059896888' }],
        accent: '#00C4A0',
        aR: '0,196,160',
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        ),
      },
      {
        title: 'Email us',
        desc: 'For proposals, partnerships, or general enquiries. We respond within 24 hours.',
        ctas: [
          { label: 'freshkite-business-development@freshkite.io', href: 'mailto:freshkite-business-development@freshkite.io' },
          { label: 'arshad@freshkite.io',                         href: 'mailto:arshad@freshkite.io' },
        ],
        accent: '#1565E0',
        aR: '21,101,224',
        icon: (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
        ),
      },
    ];

    return (
      <>
        {/* ── FULL-PAGE DARK WRAPPER with mouse-reactive gradient ── */}
        <div style={{
          minHeight: '100vh',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg,#050D1F 0%,#0B1A38 45%,#081630 100%)',
          overflow: 'hidden',
        }}>

          {/* Mouse-reactive gradient layer */}
          <div aria-hidden="true" style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
            background: `
              radial-gradient(ellipse 75% 65% at ${mouse.x}% ${mouse.y}%,
                rgba(21,101,224,0.26) 0%,
                rgba(0,196,160,0.14) 38%,
                transparent 68%
              ),
              radial-gradient(ellipse 55% 48% at ${100 - mouse.x}% ${100 - mouse.y}%,
                rgba(0,196,160,0.18) 0%,
                rgba(21,101,224,0.10) 42%,
                transparent 66%
              ),
              radial-gradient(ellipse 40% 35% at ${mouse.x * 0.6 + 20}% ${mouse.y * 0.6 + 20}%,
                rgba(26,45,94,0.35) 0%,
                transparent 60%
              )
            `,
            transition: 'background 0.22s ease',
          }}/>

          {/* Static ambient blobs for depth */}
          <div aria-hidden="true" style={{position:'absolute',inset:0,pointerEvents:'none',zIndex:0}}>
            <div style={{position:'absolute',left:'-5%',bottom:'10%',width:600,height:600,
              background:'radial-gradient(circle,rgba(0,196,160,0.12),transparent 65%)',
              filter:'blur(80px)',animation:'cBlobA 22s ease-in-out infinite alternate'}}/>
            <div style={{position:'absolute',right:'-8%',top:'5%',width:560,height:560,
              background:'radial-gradient(circle,rgba(21,101,224,0.18),transparent 65%)',
              filter:'blur(80px)',animation:'cBlobB 18s ease-in-out infinite alternate'}}/>
          </div>

          {/* ── NAV ── */}
          <Nav dark/>

          {/* ── HERO ── */}
          <div style={{position:'relative',zIndex:2,textAlign:'center',paddingTop:160,paddingBottom:72}}>
            <div className="container">
              <div style={{
                display:'inline-flex',alignItems:'center',gap:8,
                padding:'4px 14px 4px 4px',borderRadius:999,fontSize:12.5,
                background:'rgba(255,255,255,0.07)',
                border:'1px solid rgba(255,255,255,0.14)',
                backdropFilter:'blur(12px)',
                color:'rgba(255,255,255,0.72)',
                marginBottom:0,
                opacity: show ? 1 : 0,
                transform: show ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity .7s ease, transform .7s ease',
              }}>
                <span style={{
                  background:'linear-gradient(135deg,#1565E0,#00C4A0)',
                  color:'white',padding:'4px 10px',borderRadius:999,
                  fontSize:11,fontWeight:500,letterSpacing:'.02em'
                }}>Get in touch</span>
                <span>We're ready when you are</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              <h1 style={{
                fontFamily:"'Inter',system-ui,sans-serif",
                fontWeight:700,
                fontSize:'clamp(52px,8.5vw,116px)',
                lineHeight:0.95,
                letterSpacing:'-0.04em',
                color:'white',
                marginTop:28, marginBottom:0,
                maxWidth:'12ch',
                marginLeft:'auto', marginRight:'auto',
                textWrap:'balance',
                opacity: show ? 1 : 0,
                transform: show ? 'translateY(0)' : 'translateY(22px)',
                transition: 'opacity .85s ease .12s, transform .85s cubic-bezier(.2,.8,.2,1) .12s',
              }}>
                Let's start something.
              </h1>

              <p style={{
                color:'rgba(255,255,255,0.48)',
                fontSize:17, lineHeight:1.65, marginTop:26,
                maxWidth:500, marginLeft:'auto', marginRight:'auto',
                opacity: show ? 1 : 0,
                transform: show ? 'translateY(0)' : 'translateY(14px)',
                transition: 'opacity .8s ease .3s, transform .8s ease .3s',
              }}>
                No commitment, no pitch deck — just a conversation about what you're building and how we can run the ops behind it.
              </p>
            </div>
          </div>

          {/* ── CONTACT CARDS ── */}
          <div style={{position:'relative',zIndex:2,paddingBottom:100,flex:1}}>
            <div className="container">
              <div className="contact-grid" style={{
                display:'grid',
                gridTemplateColumns:'repeat(auto-fit,minmax(min(320px,100%),1fr))',
                gap:24, maxWidth:820, margin:'0 auto',
                opacity: show ? 1 : 0,
                transform: show ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity .9s ease .5s, transform .9s ease .5s',
              }}>
                {methods.map((m) => (
                  <div key={m.title} className="contact-card" style={{
                    borderRadius:26, padding:'36px 32px 32px',
                    background:'rgba(255,255,255,0.05)',
                    backdropFilter:'blur(48px) saturate(180%)',
                    WebkitBackdropFilter:'blur(48px) saturate(180%)',
                    border:'1px solid rgba(255,255,255,0.12)',
                    boxShadow:[
                      'inset 0 1.5px 0 rgba(255,255,255,0.20)',
                      'inset 0 -1px 0 rgba(0,0,0,0.14)',
                      `0 0 60px rgba(${m.aR},0.07)`,
                      '0 24px 60px rgba(0,0,0,0.35)',
                    ].join(','),
                    position:'relative', overflow:'hidden',
                    display:'flex', flexDirection:'column',
                  }}>
                    {/* Top edge specular */}
                    <div aria-hidden="true" style={{position:'absolute',top:0,left:0,right:0,height:1,
                      background:'linear-gradient(90deg,transparent 5%,rgba(255,255,255,0.36) 40%,rgba(255,255,255,0.36) 60%,transparent 95%)'}}/>
                    {/* Inner glass sheen */}
                    <div aria-hidden="true" style={{position:'absolute',inset:0,borderRadius:26,
                      background:'linear-gradient(155deg,rgba(255,255,255,0.10) 0%,transparent 50%)',
                      pointerEvents:'none'}}/>
                    {/* Accent glow at base */}
                    <div aria-hidden="true" style={{position:'absolute',bottom:0,left:0,right:0,height:80,
                      background:`radial-gradient(ellipse at 50% 100%,rgba(${m.aR},0.16),transparent 70%)`,
                      pointerEvents:'none'}}/>

                    {/* Icon */}
                    <div style={{
                      width:54,height:54,borderRadius:16,
                      display:'inline-flex',alignItems:'center',justifyContent:'center',
                      background:`rgba(${m.aR},0.14)`,
                      border:`1px solid rgba(${m.aR},0.28)`,
                      color:m.accent,
                      boxShadow:`0 4px 18px rgba(${m.aR},0.22)`,
                      position:'relative',zIndex:1,marginBottom:26,flexShrink:0,
                    }}>{m.icon}</div>

                    <div style={{position:'relative',zIndex:1,flex:1,display:'flex',flexDirection:'column'}}>
                      <div style={{fontSize:22,fontWeight:600,letterSpacing:'-0.018em',
                        color:'rgba(255,255,255,0.96)',marginBottom:10,lineHeight:1.2}}>{m.title}</div>
                      <div style={{fontSize:14.5,color:'rgba(255,255,255,0.50)',lineHeight:1.65,flex:1}}>{m.desc}</div>
                      <div style={{marginTop:26,display:'flex',flexDirection:'column',gap:10}}>
                        {m.ctas.map(cta => (
                          <a key={cta.href} href={cta.href}
                            target={cta.href.startsWith('mailto') ? undefined : '_blank'}
                            rel="noopener noreferrer"
                            style={{
                              display:'inline-flex',alignItems:'center',gap:8,
                              color:m.accent,fontSize:13.5,fontWeight:500,
                              textDecoration:'none',wordBreak:'break-all',
                              transition:'opacity .2s',
                            }}
                            onMouseEnter={e=>e.currentTarget.style.opacity='0.7'}
                            onMouseLeave={e=>e.currentTarget.style.opacity='1'}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{flexShrink:0}}>
                              <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            {cta.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p style={{
                textAlign:'center',marginTop:52,
                color:'rgba(255,255,255,0.22)',
                fontSize:12,letterSpacing:'.06em',
                fontFamily:'JetBrains Mono,monospace',
                opacity: show ? 1 : 0,
                transition: 'opacity 1s ease .8s',
              }}>
                WHATSAPP — SAME DAY &nbsp;·&nbsp; EMAIL — WITHIN 24H
              </p>
            </div>
          </div>

          {/* ── FOOTER ── */}
          <footer style={{
            position:'relative',zIndex:2,
            padding:'28px 28px 40px',
            borderTop:'1px solid rgba(255,255,255,0.08)',
          }}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',
              maxWidth:1240,margin:'0 auto',flexWrap:'wrap',gap:16,
              fontSize:13,color:'rgba(255,255,255,0.32)'}}>
              <div style={{display:'flex',alignItems:'center',gap:8}}>
                <span style={{fontWeight:700,color:'rgba(255,255,255,0.80)',fontSize:13,letterSpacing:'0.10em'}}>FRESHKITE</span>
                <span>— © 2026 Freshkite Ltd. Ebène, Mauritius.</span>
              </div>
              <a href="<?php echo esc_url( home_url( '/' ) ); ?>" style={{
                color:'rgba(255,255,255,0.32)',textDecoration:'none',
                display:'inline-flex',alignItems:'center',gap:6,
                transition:'color .2s ease',fontSize:13,
              }}
                onMouseEnter={e=>e.currentTarget.style.color='rgba(255,255,255,0.80)'}
                onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.32)'}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M19 12H5M5 12L11 18M5 12L11 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Back to home
              </a>
            </div>
          </footer>

        </div>

        <style>{`
          @keyframes cBlobA {
            0%   { transform: translate(0,0) scale(1); }
            100% { transform: translate(60px,-50px) scale(1.12); }
          }
          @keyframes cBlobB {
            0%   { transform: translate(0,0) scale(1); }
            100% { transform: translate(-50px,40px) scale(1.08); }
          }
          .contact-card {
            transition: transform 0.32s cubic-bezier(0.2,0.8,0.2,1),
                        box-shadow 0.32s ease;
            cursor: default;
          }
          .contact-card:hover {
            transform: translateY(-8px) scale(1.01);
            box-shadow:
              inset 0 1.5px 0 rgba(255,255,255,0.28),
              0 40px 80px rgba(0,0,0,0.45),
              0 0 80px rgba(21,101,224,0.12) !important;
          }
          @media (max-width:700px){
            .contact-card { margin-bottom:4px; }
          }
        `}</style>
      </>
    );
  };

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<ContactPage/>);
</script>

<?php get_footer(); ?>
