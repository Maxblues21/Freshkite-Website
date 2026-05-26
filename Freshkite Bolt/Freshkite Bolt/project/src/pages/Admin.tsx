import { useState, useEffect } from 'react'
import type { SiteData } from '../hooks/useSiteData'
import { DEFAULT_DATA } from '../hooks/useSiteData'

type Section = 'hero' | 'capabilities' | 'language' | 'partners' | 'whyUs' | 'team' | 'cta' | 'footer' | 'contact'
const SECTIONS: { key: Section; label: string }[] = [
  { key: 'hero', label: 'Hero' }, { key: 'capabilities', label: 'Capabilities' },
  { key: 'language', label: 'Language & Timezone' }, { key: 'partners', label: 'Partners' },
  { key: 'whyUs', label: 'Why Us' }, { key: 'team', label: 'Team' },
  { key: 'cta', label: 'CTA' }, { key: 'footer', label: 'Footer' }, { key: 'contact', label: 'Contact' },
]

function Field({ label, value, onChange, multiline = false }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean }) {
  const base: React.CSSProperties = { width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #E2E8F0', fontSize: 14, fontFamily: 'inherit', color: '#1A2D5E', background: '#F8FAFF', outline: 'none', transition: 'border-color .2s', boxSizing: 'border-box' }
  const focus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => (e.target.style.borderColor = '#1565E0')
  const blur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => (e.target.style.borderColor = '#E2E8F0')
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 11, fontWeight: 600, color: '#718096', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{label}</label>
      {multiline
        ? <textarea value={value} onChange={e => onChange(e.target.value)} rows={3} style={{ ...base, resize: 'vertical' }} onFocus={focus} onBlur={blur} />
        : <input value={value} onChange={e => onChange(e.target.value)} style={base} onFocus={focus} onBlur={blur} />}
    </div>
  )
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: 'white', borderRadius: 16, padding: 24, boxShadow: '0 1px 3px rgba(21,101,224,0.06),0 8px 24px rgba(21,101,224,0.06)', marginBottom: 20 }}>
      <h3 style={{ fontSize: 14, fontWeight: 600, color: '#1A2D5E', margin: '0 0 18px', letterSpacing: '-0.01em' }}>{title}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>{children}</div>
    </div>
  )
}

const PASS = 'freshkite2026'

export function Admin() {
  const [data, setData] = useState<SiteData>(DEFAULT_DATA)
  const [loaded, setLoaded] = useState(false)
  const [active, setActive] = useState<Section>('hero')
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null)
  const [authed, setAuthed] = useState(false)
  const [pass, setPass] = useState('')

  useEffect(() => {
    fetch('/site-data.json').then(r => r.json()).then(j => { setData(j); setLoaded(true) }).catch(() => setLoaded(true))
  }, [])

  if (!authed) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#F0F4FF,#E8F0FE)', fontFamily: "'Inter',system-ui,sans-serif" }}>
      <div style={{ background: 'white', borderRadius: 24, padding: '40px 40px 36px', width: 380, boxShadow: '0 8px 40px rgba(21,101,224,0.14)' }}>
        <img src="/assets/logo.svg" alt="Freshkite" style={{ height: 28, marginBottom: 24 }} />
        <div style={{ fontWeight: 700, fontSize: 20, color: '#1A2D5E', marginBottom: 6, letterSpacing: '-0.02em' }}>Admin Panel</div>
        <div style={{ fontSize: 13.5, color: '#718096', marginBottom: 28 }}>Enter your password to manage site content.</div>
        <input type="password" placeholder="Password" value={pass} onChange={e => setPass(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && pass === PASS) setAuthed(true) }} style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1px solid #E2E8F0', fontSize: 14, fontFamily: 'inherit', marginBottom: 12, outline: 'none', boxSizing: 'border-box' }} />
        <button onClick={() => { if (pass === PASS) setAuthed(true) }} style={{ width: '100%', padding: '13px', borderRadius: 999, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg,#1565E0,#00C4A0)', color: 'white', fontWeight: 600, fontSize: 14, fontFamily: 'inherit' }}>Sign in</button>
        {pass && pass !== PASS && <div style={{ color: '#E53E3E', fontSize: 12, marginTop: 10, textAlign: 'center' }}>Incorrect password.</div>}
      </div>
    </div>
  )

  if (!loaded) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter',system-ui,sans-serif", color: '#718096', fontSize: 14 }}>Loading…</div>

  const set = <K extends keyof SiteData>(section: K, patch: Partial<SiteData[K]>) =>
    setData(prev => ({ ...prev, [section]: { ...prev[section], ...patch } }))

  const save = async () => {
    setSaving(true)
    try {
      const res = await fetch('/save.php', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Admin-Secret': 'freshkite-admin-2026' }, body: JSON.stringify(data) })
      setToast({ msg: res.ok ? 'Saved successfully!' : 'Save failed — check server.', ok: res.ok })
    } catch { setToast({ msg: 'Cannot reach save.php — is this on a PHP server?', ok: false }) }
    setSaving(false)
    setTimeout(() => setToast(null), 3500)
  }

  const exportJSON = () => {
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }))
    a.download = 'site-data.json'; a.click()
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F0F4FF', fontFamily: "'Inter',system-ui,sans-serif" }}>
      {toast && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 999, padding: '14px 22px', borderRadius: 12, fontSize: 14, fontWeight: 500, background: toast.ok ? '#065F46' : '#7F1D1D', color: 'white', boxShadow: '0 8px 30px rgba(0,0,0,0.25)', animation: 'mobileMenuIn .3s ease' }}>{toast.msg}</div>
      )}

      {/* Header */}
      <div style={{ background: 'white', borderBottom: '1px solid #E2E8F0', padding: '0 28px', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <img src="/assets/logo.svg" alt="Freshkite" style={{ height: 24 }} />
            <div style={{ width: 1, height: 22, background: '#E2E8F0' }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: '#1A2D5E' }}>Site Admin</span>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={exportJSON} style={{ padding: '8px 16px', borderRadius: 999, border: '1px solid #E2E8F0', background: 'white', cursor: 'pointer', fontSize: 13, fontWeight: 500, color: '#4A5568', fontFamily: 'inherit' }}>Export JSON</button>
            <a href="/" target="_blank" style={{ padding: '8px 16px', borderRadius: 999, border: '1px solid #E2E8F0', background: 'white', fontSize: 13, fontWeight: 500, color: '#4A5568', display: 'inline-flex', alignItems: 'center' }}>Preview ↗</a>
            <button onClick={save} disabled={saving} style={{ padding: '8px 20px', borderRadius: 999, border: 'none', cursor: saving ? 'not-allowed' : 'pointer', background: 'linear-gradient(135deg,#1565E0,#00C4A0)', color: 'white', fontSize: 13, fontWeight: 600, fontFamily: 'inherit', opacity: saving ? 0.7 : 1 }}>
              {saving ? 'Saving…' : 'Save changes'}
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 28px', display: 'grid', gridTemplateColumns: '220px 1fr', gap: 28 }}>
        {/* Sidebar */}
        <div style={{ position: 'sticky', top: 88, alignSelf: 'start' }}>
          <div style={{ background: 'white', borderRadius: 16, padding: 8, boxShadow: '0 1px 3px rgba(21,101,224,0.06),0 8px 24px rgba(21,101,224,0.06)' }}>
            {SECTIONS.map(s => (
              <button key={s.key} onClick={() => setActive(s.key)} style={{ display: 'block', width: '100%', padding: '10px 14px', borderRadius: 10, border: 'none', cursor: 'pointer', background: active === s.key ? 'linear-gradient(135deg,rgba(21,101,224,0.10),rgba(0,196,160,0.08))' : 'transparent', color: active === s.key ? '#1565E0' : '#4A5568', fontSize: 13.5, fontWeight: active === s.key ? 600 : 450, textAlign: 'left', fontFamily: 'inherit', transition: 'all .2s' }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Panels */}
        <div>
          {active === 'hero' && (
            <Card title="Hero Section">
              <Field label="Headline" value={data.hero.headline} onChange={v => set('hero', { headline: v })} multiline />
              <Field label="Sub-headline" value={data.hero.subheadline} onChange={v => set('hero', { subheadline: v })} multiline />
              <Field label="CTA Button" value={data.hero.ctaLabel} onChange={v => set('hero', { ctaLabel: v })} />
            </Card>
          )}

          {active === 'capabilities' && <>
            <Card title="Section Header">
              <Field label="Eyebrow" value={data.capabilities.eyebrow} onChange={v => set('capabilities', { eyebrow: v })} />
              <Field label="Heading" value={data.capabilities.heading} onChange={v => set('capabilities', { heading: v })} multiline />
              <Field label="Sub-text" value={data.capabilities.subtext} onChange={v => set('capabilities', { subtext: v })} multiline />
            </Card>
            {data.capabilities.cards.map((card, i) => (
              <Card key={i} title={`Card ${i + 1}`}>
                <Field label="Title" value={card.title} onChange={v => set('capabilities', { cards: data.capabilities.cards.map((c, j) => j === i ? { ...c, title: v } : c) })} />
                <Field label="Tagline" value={card.tagline} onChange={v => set('capabilities', { cards: data.capabilities.cards.map((c, j) => j === i ? { ...c, tagline: v } : c) })} />
              </Card>
            ))}
          </>}

          {active === 'language' && (
            <Card title="Language & Timezone">
              <Field label="Heading" value={data.language.heading} onChange={v => set('language', { heading: v })} multiline />
              <Field label="Body text" value={data.language.body} onChange={v => set('language', { body: v })} multiline />
              <Field label="English phrase (flip card)" value={data.language.enPhrase} onChange={v => set('language', { enPhrase: v })} />
              <Field label="French phrase (flip card)" value={data.language.frPhrase} onChange={v => set('language', { frPhrase: v })} />
              {data.language.timezonePoints.map((pt, i) => (
                <Field key={i} label={`Timezone point ${i + 1}`} value={pt} onChange={v => set('language', { timezonePoints: data.language.timezonePoints.map((p, j) => j === i ? v : p) })} />
              ))}
            </Card>
          )}

          {active === 'partners' && (
            <Card title="Partners">
              <Field label="Heading" value={data.partners.heading} onChange={v => set('partners', { heading: v })} />
              {data.partners.logos.map((logo, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <Field label={`Logo ${i + 1} name`} value={logo.name} onChange={v => set('partners', { logos: data.partners.logos.map((l, j) => j === i ? { ...l, name: v } : l) })} />
                  <Field label={`Logo ${i + 1} image path`} value={logo.src} onChange={v => set('partners', { logos: data.partners.logos.map((l, j) => j === i ? { ...l, src: v } : l) })} />
                </div>
              ))}
            </Card>
          )}

          {active === 'whyUs' && (
            <Card title="Why Us">
              <Field label="Heading" value={data.whyUs.heading} onChange={v => set('whyUs', { heading: v })} multiline />
              {data.whyUs.items.map((item, i) => (
                <div key={i} style={{ padding: 16, borderRadius: 12, border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <Field label={`Item ${i + 1} — title`} value={item.big} onChange={v => set('whyUs', { items: data.whyUs.items.map((it, j) => j === i ? { ...it, big: v } : it) })} />
                  <Field label="Description" value={item.sub} onChange={v => set('whyUs', { items: data.whyUs.items.map((it, j) => j === i ? { ...it, sub: v } : it) })} multiline />
                </div>
              ))}
            </Card>
          )}

          {active === 'team' && (
            <Card title="Team">
              <Field label="Heading" value={data.team.heading} onChange={v => set('team', { heading: v })} multiline />
              {data.team.people.map((person, i) => (
                <div key={i} style={{ padding: 16, borderRadius: 12, border: '1px solid #E2E8F0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <Field label="Name" value={person.name} onChange={v => set('team', { people: data.team.people.map((p, j) => j === i ? { ...p, name: v } : p) })} />
                  <Field label="Role" value={person.role} onChange={v => set('team', { people: data.team.people.map((p, j) => j === i ? { ...p, role: v } : p) })} />
                  <Field label="Location" value={person.loc} onChange={v => set('team', { people: data.team.people.map((p, j) => j === i ? { ...p, loc: v } : p) })} />
                  <Field label="Accent colour (#hex)" value={person.color} onChange={v => set('team', { people: data.team.people.map((p, j) => j === i ? { ...p, color: v } : p) })} />
                </div>
              ))}
            </Card>
          )}

          {active === 'cta' && (
            <Card title="CTA Section">
              <Field label="Heading" value={data.cta.heading} onChange={v => set('cta', { heading: v })} multiline />
              <Field label="Body text" value={data.cta.body} onChange={v => set('cta', { body: v })} multiline />
              <Field label="Button label" value={data.cta.buttonLabel} onChange={v => set('cta', { buttonLabel: v })} />
            </Card>
          )}

          {active === 'footer' && (
            <Card title="Footer">
              <Field label="Tagline" value={data.footer.tagline} onChange={v => set('footer', { tagline: v })} multiline />
              <Field label="Copyright" value={data.footer.copyright} onChange={v => set('footer', { copyright: v })} />
            </Card>
          )}

          {active === 'contact' && (
            <Card title="Contact Page">
              <Field label="Heading" value={data.contact.heading} onChange={v => set('contact', { heading: v })} />
              <Field label="Sub-heading" value={data.contact.subheading} onChange={v => set('contact', { subheading: v })} multiline />
              <Field label="WhatsApp number" value={data.contact.whatsapp} onChange={v => set('contact', { whatsapp: v })} />
              <Field label="Business dev email" value={data.contact.emailBd} onChange={v => set('contact', { emailBd: v })} />
              <Field label="Direct email" value={data.contact.emailDirect} onChange={v => set('contact', { emailDirect: v })} />
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
