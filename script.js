/* Freshkite — vanilla JS */
(function(){
  const D = window.SITE_DATA;
  const ARROW = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const ICONS = [
    '<svg width="42" height="42" viewBox="0 0 24 24" fill="none"><path d="M3 3h2l2.4 12.1a2 2 0 0 0 2 1.6h8.7a2 2 0 0 0 2-1.5L22 7H6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="9" cy="20" r="1.4" stroke="currentColor" stroke-width="1.5"/><circle cx="18" cy="20" r="1.4" stroke="currentColor" stroke-width="1.5"/></svg>',
    '<svg width="42" height="42" viewBox="0 0 24 24" fill="none"><path d="M3 21h18M6 17V10M11 17V6M16 17v-8M21 17v-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    '<svg width="42" height="42" viewBox="0 0 24 24" fill="none"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" stroke="currentColor" stroke-width="1.5"/><path d="M7 13h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    '<svg width="42" height="42" viewBox="0 0 24 24" fill="none"><path d="M4 13a8 8 0 0 1 16 0v4a3 3 0 0 1-3 3h-1v-6h4M4 13v4a3 3 0 0 0 3 3h1v-6H4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    '<svg width="42" height="42" viewBox="0 0 24 24" fill="none"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    '<svg width="42" height="42" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5ZM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  ];

  // ===== NAV =====
  function renderNav(dark){
    const links = [
      {label:'Services', href:'index.html#services'},
      {label:'Why Us', href:'index.html#why-us'},
      {label:'Contact', href:'contact.html'}
    ];
    const nav = document.createElement('nav');
    nav.className = 'nav' + (dark?' dark':'');
    nav.innerHTML = `
      <div class="nav-inner">
        <a href="index.html" class="nav-logo"><img src="assets/logo.svg" alt="Freshkite"></a>
        <div class="nav-links">
          ${links.map(l=>`<a href="${l.href}" class="nav-link">${l.label}</a>`).join('')}
        </div>
        <a href="contact.html" class="btn nav-cta">Start a project ${ARROW}</a>
        <button class="hamburger" aria-label="Toggle navigation"><span></span><span></span><span></span></button>
      </div>`;
    document.body.appendChild(nav);

    const mobile = document.createElement('div');
    mobile.className = 'mobile-nav';
    mobile.innerHTML = `
      <nav>
        ${links.map(l=>`<a href="${l.href}" class="mobile-nav-link">${l.label}</a>`).join('')}
        <a href="contact.html" class="mobile-nav-cta btn">Start a project ${ARROW}</a>
      </nav>`;
    document.body.appendChild(mobile);

    const hb = nav.querySelector('.hamburger');
    hb.addEventListener('click', ()=>{
      const open = mobile.classList.toggle('open');
      hb.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden':'';
    });
    window.addEventListener('scroll', ()=>{
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }, {passive:true});
  }

  // ===== REVEAL =====
  function setupReveals(){
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(es=>es.forEach(e=>{
      if(e.isIntersecting){
        const d = parseInt(e.target.dataset.delay||0,10);
        setTimeout(()=>e.target.classList.add('in'), d);
        io.unobserve(e.target);
      }
    }), {threshold:0, rootMargin:'0px 0px -4% 0px'});
    els.forEach(el=>io.observe(el));
  }

  // ===== HERO =====
  function renderHero(){
    const root = document.getElementById('hero'); if(!root) return;
    const h = D.hero;
    const wordStyles = [{},{},{},{cls:'teal'},{},{},{},{cls:'grad'}];
    const words = h.headline.split(' ');
    let gi = 0;
    const headlineHTML = words.map((w,wi)=>{
      const ws = wordStyles[wi]||{};
      const letters = Array.from(w).map(ch=>{
        const delay = 80 + (gi++)*28;
        return `<span class="hero-letter ${ws.cls||''}" style="transition-delay:${delay}ms,${delay}ms">${ch}</span>`;
      }).join('');
      return `<span style="display:inline-block;white-space:nowrap">${wi>0?'<span style="display:inline-block;width:.28em"> </span>':''}<span style="display:inline-block;position:relative">${letters}</span></span>`;
    }).join('');

    const sub = h.subheadline.includes('We power the growth,')
      ? h.subheadline.replace('We power the growth,', '<span class="accent">We power the growth,</span>')
      : h.subheadline;

    root.innerHTML = `
      <canvas class="hero-canvas" aria-hidden="true"></canvas>
      <div class="hero-grid" aria-hidden="true"></div>
      <div class="hero-vignette" aria-hidden="true"></div>
      <span class="hero-crosshair" style="top:96px;left:24px"></span>
      <span class="hero-crosshair" style="top:96px;right:24px"></span>
      <span class="hero-crosshair" style="bottom:24px;left:24px"></span>
      <span class="hero-crosshair" style="bottom:24px;right:24px"></span>
      <div class="hero-scan" aria-hidden="true"></div>
      <svg class="hero-ring" viewBox="0 0 900 900" aria-hidden="true">
        <defs>
          <path id="ringPath" d="M 450,450 m -340,0 a 340,340 0 1,1 680,0 a 340,340 0 1,1 -680,0"/>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#1565E0"/><stop offset="100%" stop-color="#00C4A0"/></linearGradient>
        </defs>
        <circle cx="450" cy="450" r="340" fill="none" stroke="url(#ringGrad)" stroke-width="1" stroke-dasharray="2 14" opacity="0.7"/>
        <text font-family="JetBrains Mono, monospace" font-size="11" letter-spacing="6" fill="#1A2D5E" opacity="0.5"><textPath href="#ringPath">FRESHKITE · OPERATIONS · MAURITIUS · ENGINEERED IN ISLAND TIME · FRESHKITE · OPERATIONS · MAURITIUS · ENGINEERED IN ISLAND TIME · </textPath></text>
      </svg>
      <div class="container hero-content">
        <div class="hero-pill"><span class="live"><span class="dot"></span>LIVE</span><span>Now onboarding Q3 partners</span></div>
        <h1 class="hero-title" aria-label="${h.headline}">${headlineHTML}</h1>
        <p class="hero-sub">${sub}</p>
        <div class="hero-cta-wrap"><a href="contact.html" class="btn hero-cta">${h.ctaLabel} <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a></div>
        <div class="hero-trust"><span>40+ partners</span><span class="d1"></span><span>EN · FR fluent</span><span class="d2"></span><span>UTC+4 · Port Louis</span></div>
      </div>
      <div class="scroll-ind"><span>SCROLL</span><div class="bar"><i></i></div></div>`;

    // animate letters in
    requestAnimationFrame(()=>{
      root.querySelectorAll('.hero-letter').forEach(el=>el.classList.add('in'));
    });

    // canvas backdrop
    const canvas = root.querySelector('.hero-canvas');
    const grid = root.querySelector('.hero-grid');
    const ctx = canvas.getContext('2d');
    const DPR = Math.min(window.devicePixelRatio||1, 2);
    let w=0,h2=0;
    const resize = ()=>{
      const r = canvas.getBoundingClientRect();
      w=r.width; h2=r.height;
      canvas.width=Math.floor(w*DPR); canvas.height=Math.floor(h2*DPR);
      ctx.setTransform(DPR,0,0,DPR,0,0);
    };
    resize();
    new ResizeObserver(resize).observe(canvas);
    const blobs = [
      {x:.22,y:.30,r:.55,c:'rgba(21,101,224,0.55)',ph:0,sp:.45},
      {x:.78,y:.62,r:.60,c:'rgba(0,196,160,0.50)',ph:1.7,sp:.38},
      {x:.55,y:.18,r:.45,c:'rgba(120,80,255,0.32)',ph:3.1,sp:.52},
      {x:.40,y:.85,r:.50,c:'rgba(26,45,94,0.45)',ph:4.6,sp:.33},
      {x:.90,y:.10,r:.35,c:'rgba(0,196,160,0.35)',ph:5.9,sp:.60}
    ];
    let mx=.5,my=.5;
    window.addEventListener('mousemove', e=>{
      const r = canvas.getBoundingClientRect();
      mx = (e.clientX-r.left)/r.width;
      my = (e.clientY-r.top)/r.height;
      grid.style.setProperty('--mx', (mx*100)+'%');
      grid.style.setProperty('--my', (my*100)+'%');
    });
    const start = performance.now();
    function tick(now){
      const t = (now-start)/1000;
      ctx.clearRect(0,0,w,h2);
      const g = ctx.createLinearGradient(0,0,0,h2);
      g.addColorStop(0,'#F4F8FF'); g.addColorStop(1,'#FFFFFF');
      ctx.fillStyle=g; ctx.fillRect(0,0,w,h2);
      ctx.globalCompositeOperation='multiply';
      for(const b of blobs){
        const ox = Math.sin(t*b.sp + b.ph)*0.08;
        const oy = Math.cos(t*b.sp*1.1 + b.ph*1.3)*0.08;
        const cx = (b.x+ox+(mx-.5)*.04)*w;
        const cy = (b.y+oy+(my-.5)*.04)*h2;
        const rad = b.r*Math.max(w,h2);
        const rg = ctx.createRadialGradient(cx,cy,0,cx,cy,rad);
        rg.addColorStop(0,b.c); rg.addColorStop(1,'rgba(255,255,255,0)');
        ctx.fillStyle=rg; ctx.fillRect(0,0,w,h2);
      }
      ctx.globalCompositeOperation='source-over';
      const sx=mx*w, sy=my*h2, sr=Math.min(w,h2)*.45;
      const sg = ctx.createRadialGradient(sx,sy,0,sx,sy,sr);
      sg.addColorStop(0,'rgba(255,255,255,0.42)'); sg.addColorStop(1,'rgba(255,255,255,0)');
      ctx.fillStyle=sg; ctx.fillRect(0,0,w,h2);
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // ===== CAPABILITIES =====
  function renderCaps(){
    const root = document.getElementById('caps'); if(!root) return;
    const c = D.capabilities;
    root.innerHTML = `
      <div class="caps-bg1" aria-hidden="true"></div>
      <div class="caps-bg2" aria-hidden="true"></div>
      <div class="container-wide" style="position:relative;z-index:2">
        <div class="reveal caps-header">
          <div>
            <span class="eyebrow">${c.eyebrow}</span>
            <h2 class="font-heading">${c.heading.replace('under one roof.','')}<span class="italic-serif grad-text">under one roof.</span></h2>
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;min-width:220px">
            <span class="mono" style="font-size:11px;letter-spacing:.16em;color:var(--muted-2)">SERVICES</span>
            <p style="font-size:14px;color:#000;max-width:300px">${c.subtext}</p>
          </div>
        </div>
      </div>
      <div class="caps-track-outer">
        <div class="caps-track no-scrollbar">
          <div class="caps-row">
            ${c.cards.map((card,i)=>`
              <article class="cap-teaser" style="animation-delay:${i*80}ms">
                <div class="cap-top-bar" style="background:linear-gradient(90deg,transparent 10%,rgba(${card.aR},0.45) 40%,rgba(${card.aR},0.45) 60%,transparent 90%)"></div>
                <div class="cap-icon" style="background:rgba(${card.aR},0.10);border:1px solid rgba(${card.aR},0.22);color:${card.accent};box-shadow:0 6px 22px rgba(${card.aR},0.18),inset 0 1px 0 rgba(255,255,255,0.7)">${ICONS[i%ICONS.length]}</div>
                <div style="position:relative;z-index:1;width:100%">
                  <div class="cap-title">${card.title}</div>
                  <div class="cap-tag">${card.tagline}</div>
                </div>
              </article>
            `).join('')}
          </div>
        </div>
      </div>`;

    const outer = root.querySelector('.caps-track-outer');
    new IntersectionObserver((es,io)=>es.forEach(e=>{if(e.isIntersecting){outer.classList.add('visible');io.disconnect()}}),{threshold:.15}).observe(outer);

    // drag scroll
    const track = root.querySelector('.caps-track');
    let down=false, sx=0, sl=0;
    track.addEventListener('mousedown',e=>{down=true;track.classList.add('dragging');sx=e.pageX-track.offsetLeft;sl=track.scrollLeft});
    ['mouseup','mouseleave'].forEach(ev=>track.addEventListener(ev,()=>{down=false;track.classList.remove('dragging')}));
    track.addEventListener('mousemove',e=>{if(!down)return;e.preventDefault();track.scrollLeft=sl-(e.pageX-track.offsetLeft-sx)*1.5});

    // 3D tilt
    root.querySelectorAll('.cap-teaser').forEach(card=>{
      card.addEventListener('mousemove',e=>{
        const r=card.getBoundingClientRect();
        const x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
        card.style.transform=`perspective(900px) rotateX(${-y*9}deg) rotateY(${x*9}deg) translateY(-6px) scale(1.02)`;
        card.style.transition='transform .1s ease';
      });
      card.addEventListener('mouseleave',()=>{card.style.transform='';card.style.transition='transform .55s cubic-bezier(.2,.8,.2,1)'});
    });
  }

  // ===== LANGUAGE =====
  function renderLang(){
    const root = document.getElementById('lang'); if(!root) return;
    const l = D.language;
    root.innerHTML = `
      <div class="container">
        <div class="lang-fluency-grid">
          <div class="reveal">
            <span class="eyebrow">02 — Fluency</span>
            <h2 style="font-size:clamp(28px,5vw,54px);line-height:1.05;letter-spacing:-.025em;font-weight:600;margin-top:14px">${l.heading.replace('Both of them.','')}<span class="italic-serif grad-text">Both of them.</span></h2>
            <p style="max-width:480px;margin-top:20px;font-size:15.5px;line-height:1.65;color:#000">${l.body}</p>
            <div style="display:flex;gap:14px;margin-top:28px;flex-wrap:wrap">
              ${[{k:'EN',v:'English',sub:'Native-level'},{k:'FR',v:'Français',sub:'Natif'}].map(x=>`
                <div class="glass" style="padding:12px 16px;border-radius:16px;min-width:130px;flex:1 1 130px;max-width:200px">
                  <div class="italic-serif grad-text" style="font-size:26px;line-height:1.15">${x.k}</div>
                  <div style="font-size:13px;color:var(--ink);margin-top:6px;font-weight:500">${x.v}</div>
                  <div style="font-size:11px;color:var(--muted)">${x.sub}</div>
                </div>`).join('')}
            </div>
          </div>
          <div class="reveal" data-delay="150">
            <div class="card-brand lang-flip-card" id="flipCard">
              <div class="lang-toggle"><div class="pill"></div><span class="en">EN</span><span class="fr">FR</span></div>
              <div class="lang-phrase-wrap">
                <div class="lang-phrase en">${l.enPhrase}</div>
                <div class="lang-phrase fr">${l.frPhrase}</div>
              </div>
              <div class="lang-hint">Hover / tap to translate</div>
            </div>
          </div>
        </div>

        <div class="lang-tz-grid">
          <div class="reveal" id="tzChart">
            ${[
              {key:'freshkite',label:'Freshkite',sub:'UTC +4',s:4,e:16,g:'linear-gradient(90deg,#1565E0 0%,#00C4A0 55%,#1A2D5E 100%)',tag:'YOUR TEAM'},
              {key:'europe',label:'Europe',sub:'UTC +1',s:8,e:17,g:'linear-gradient(90deg,#00C4A0 0%,#1565E0 100%)'},
              {key:'usEast',label:'US East',sub:'UTC −5',s:13,e:22,g:'linear-gradient(90deg,#1A2D5E 0%,#0D1B3B 100%)'}
            ].map((r,i)=>`
              <div class="tz-row">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
                  <span style="font-size:13px;font-weight:600;color:var(--ink)">${r.label}</span>
                  <span style="font-size:11px;color:var(--muted-2)">${r.sub}</span>
                  ${r.tag?`<span style="font-size:8.5px;font-weight:600;padding:2px 7px;border-radius:6px;background:var(--ink);color:#fff;letter-spacing:.04em">${r.tag}</span>`:''}
                  <span style="margin-left:auto;font-size:11px;color:var(--muted)">${r.s}h – ${r.e}h</span>
                </div>
                <div class="tz-bar" data-i="${i}" data-s="${r.s}" data-e="${r.e}"><i style="left:${r.s/24*100}%;background:${r.g}"></i></div>
              </div>`).join('')}
            <div class="tz-coverage">
              <div class="eyebrow" style="margin-bottom:12px">Continuous Coverage (UTC)</div>
              <div style="display:flex;flex-direction:column;gap:8px;font-size:13px">
                <div style="display:flex;gap:10px"><span style="width:8px;height:8px;border-radius:999px;background:#00C4A0;margin-top:4px"></span><span style="color:var(--ink-2);line-height:1.5"><b>Freshkite × Europe</b> — 08h–16h UTC = <span style="color:#00C4A0;font-style:italic">8h together</span></span></div>
                <div style="display:flex;gap:10px"><span style="width:8px;height:8px;border-radius:999px;background:#1565E0;margin-top:4px"></span><span style="color:var(--ink-2);line-height:1.5"><b>Freshkite × US East</b> — 13h–16h UTC = <span style="color:#1565E0;font-style:italic">3h together</span></span></div>
                <div style="display:flex;gap:10px"><span style="width:8px;height:8px;border-radius:999px;background:#1A2D5E;margin-top:4px"></span><span style="color:var(--ink-2);line-height:1.5">Total: <b>04h–22h UTC</b> = <span style="color:#1A2D5E;font-style:italic">18h continuous</span></span></div>
              </div>
            </div>
          </div>
          <div class="reveal" data-delay="150">
            <h3 style="font-size:clamp(26px,4vw,48px);line-height:1.05;letter-spacing:-.025em;font-weight:600">More hours in your day. <span class="italic-serif grad-text">By design.</span></h3>
            <ul style="list-style:none;padding:0;margin:20px 0 0;display:flex;flex-direction:column;gap:12px">
              ${l.timezonePoints.map(t=>`<li style="display:flex;gap:12px;align-items:flex-start;color:#000;font-size:15px;line-height:1.55"><span style="margin-top:7px;width:5px;height:5px;border-radius:999px;background:linear-gradient(135deg,#1565E0,#00C4A0);flex:0 0 auto"></span><span>${t}</span></li>`).join('')}
            </ul>
          </div>
        </div>
      </div>`;

    const card = root.querySelector('#flipCard');
    const setFr = v=>card.classList.toggle('fr', v);
    card.addEventListener('mouseenter',()=>setFr(true));
    card.addEventListener('mouseleave',()=>setFr(false));
    card.addEventListener('click',()=>card.classList.toggle('fr'));

    const chart = root.querySelector('#tzChart');
    const animate = ()=>chart.querySelectorAll('.tz-bar').forEach((bar,i)=>{
      const s=+bar.dataset.s, e=+bar.dataset.e;
      setTimeout(()=>{
        bar.classList.add('in');
        bar.querySelector('i').style.width = ((e-s)/24*100)+'%';
      }, i*140);
    });
    new IntersectionObserver((es,io)=>es.forEach(e=>{if(e.isIntersecting){animate();io.disconnect()}}),{threshold:.2}).observe(chart);
  }

  // ===== WHY US =====
  function renderWhy(){
    const root = document.getElementById('why'); if(!root) return;
    const w = D.whyUs;
    root.innerHTML = `
      <div class="container-wide">
        <div class="reveal why-head">
          <h2 class="font-heading">${w.heading.replace('quietly felt.','')}<span class="italic-serif grad-text">quietly felt.</span></h2>
          <span class="eyebrow">04 — Why Us</span>
        </div>
        <div class="why-grid">
          ${w.items.map((it,i)=>`
            <div class="reveal" data-delay="${i*80}">
              <div class="glass" style="padding:28px;border-radius:22px;height:100%">
                <div class="italic-serif" style="font-size:32px;line-height:1.05;letter-spacing:-.02em;color:#000">${it.big}</div>
                <div style="height:1px;background:var(--grad-accent-text);opacity:.25;margin:18px 0"></div>
                <p style="font-size:14px;line-height:1.6;color:#000">${it.sub}</p>
              </div>
            </div>`).join('')}
        </div>
      </div>`;
  }

  // ===== CTA + FOOTER =====
  function renderCta(){
    const root = document.getElementById('cta'); if(!root) return;
    const c = D.cta, f = D.footer;
    const heading = c.heading.includes('quietly working')
      ? c.heading.replace('quietly working','<span class="italic-serif">quietly working</span>')
      : c.heading;
    const body = c.body.includes('No commitment')
      ? c.body.replace('No commitment','<span style="color:#00C4A0;font-weight:500">No commitment</span>')
      : c.body;
    root.innerHTML = `
      <div class="container-wide">
        <div class="reveal">
          <div class="card-brand cta-card">
            <span class="eyebrow" style="color:rgba(255,255,255,.7)">05 Contact</span>
            <h2 class="font-heading">${heading}</h2>
            <p>${body}</p>
            <a href="contact.html" class="btn">${c.buttonLabel} ${ARROW}</a>
          </div>
        </div>
        <div class="reveal footer">
          <div class="foot-grid">
            <div>
              <span style="font-weight:700;font-size:15px;letter-spacing:.14em;color:#1565E0">FRESHKITE</span>
              <p style="margin-top:14px;max-width:340px;font-size:13.5px;color:#000">${f.tagline.replace('Built in Mauritius,','<span style="color:#00C4A0;font-weight:500">Built in Mauritius,</span>')}</p>
            </div>
            <div class="reveal" data-delay="60">
              <div class="eyebrow" style="margin-bottom:14px">Studio</div>
              <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:10px">
                <li><a href="index.html#services" class="link-under" style="color:#000;font-size:14px">Services</a></li>
                <li><a href="index.html#why-us" class="link-under" style="color:#000;font-size:14px">Why Us</a></li>
                <li><a href="contact.html" class="link-under" style="color:#000;font-size:14px">Contact</a></li>
              </ul>
            </div>
          </div>
          <div class="foot-bottom">
            <span>${f.copyright}</span>
            <span style="display:flex;gap:18px">
              <span style="display:inline-flex;align-items:center;gap:6px"><span style="width:6px;height:6px;border-radius:999px;background:#16A34A"></span> All systems operational</span>
              <span>UTC+4 · Port Louis</span>
            </span>
          </div>
        </div>
      </div>`;
  }

  // ===== CONTACT PAGE =====
  function renderContact(){
    const root = document.getElementById('contact-root'); if(!root) return;
    const c = D.contact, f = D.footer;
    const wa = c.whatsapp.replace(/\D/g,'');
    root.innerHTML = `
      <div class="contact-bg-mouse" id="contactBg"></div>
      <div style="position:absolute;inset:0;pointer-events:none;z-index:0">
        <div class="contact-blob-a"></div>
        <div class="contact-blob-b"></div>
      </div>
      <div class="contact-hero">
        <div class="container">
          <div class="contact-pill"><span class="b">Get in touch</span><span>We're ready when you are</span>${ARROW}</div>
          <h1>${c.heading}</h1>
          <p>${c.subheading}</p>
        </div>
      </div>
      <div style="position:relative;z-index:2;padding-bottom:100px;flex:1">
        <div class="container">
          <div class="contact-grid">
            <div class="contact-card">
              <div class="icon" style="background:rgba(0,196,160,.14);border:1px solid rgba(0,196,160,.28);color:#00C4A0;box-shadow:0 4px 18px rgba(0,196,160,.22)">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </div>
              <h3>WhatsApp</h3>
              <div class="desc">Message us directly for a quick response. We typically reply within the hour.</div>
              <div class="ctas">
                <a href="https://wa.me/${wa}" target="_blank" rel="noopener" style="color:#00C4A0"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>${c.whatsapp}</a>
              </div>
            </div>
            <div class="contact-card">
              <div class="icon" style="background:rgba(21,101,224,.14);border:1px solid rgba(21,101,224,.28);color:#1565E0;box-shadow:0 4px 18px rgba(21,101,224,.22)">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <h3>Email us</h3>
              <div class="desc">For proposals, partnerships, or general enquiries. We respond within 24 hours.</div>
              <div class="ctas">
                <a href="mailto:${c.emailBd}" style="color:#1565E0"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>${c.emailBd}</a>
                <a href="mailto:${c.emailDirect}" style="color:#1565E0"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>${c.emailDirect}</a>
              </div>
            </div>
          </div>
          <p style="text-align:center;margin-top:52px;color:rgba(255,255,255,.22);font-size:12px;letter-spacing:.06em;font-family:'JetBrains Mono',monospace">WHATSAPP — SAME DAY &nbsp;·&nbsp; EMAIL — WITHIN 24H</p>
        </div>
      </div>
      <footer class="contact-foot">
        <div class="contact-foot-inner">
          <div style="display:flex;align-items:center;gap:8px"><span style="font-weight:700;color:rgba(255,255,255,.80);font-size:13px;letter-spacing:.10em">FRESHKITE</span><span>— ${f.copyright}</span></div>
          <a href="index.html" style="color:rgba(255,255,255,.32);display:inline-flex;align-items:center;gap:6px;font-size:13px"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M5 12L11 18M5 12L11 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>Back to home</a>
        </div>
      </footer>`;

    const bg = root.querySelector('#contactBg');
    window.addEventListener('mousemove', e=>{
      const x = (e.clientX/window.innerWidth)*100;
      const y = (e.clientY/window.innerHeight)*100;
      bg.style.background = `radial-gradient(ellipse 75% 65% at ${x}% ${y}%,rgba(21,101,224,0.26) 0%,rgba(0,196,160,0.14) 38%,transparent 68%),radial-gradient(ellipse 55% 48% at ${100-x}% ${100-y}%,rgba(0,196,160,0.18) 0%,rgba(21,101,224,0.10) 42%,transparent 66%)`;
    });
  }

  // ===== BOOT =====
  document.addEventListener('DOMContentLoaded', ()=>{
    const isContact = document.body.dataset.page === 'contact';
    renderNav(isContact);
    if(isContact){ renderContact(); }
    else { renderHero(); renderCaps(); renderLang(); renderWhy(); renderCta(); }
    setupReveals();
  });
})();
