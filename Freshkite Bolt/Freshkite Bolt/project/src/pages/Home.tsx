import { Nav } from '../components/Nav'
import { Hero } from '../components/Hero'
import { Capabilities } from '../components/Capabilities'
import { Language } from '../components/Language'
import { WhyUs } from '../components/WhyUs'
import { CTAFooter } from '../components/CTAFooter'
import { useSiteData } from '../hooks/useSiteData'

export function Home() {
  const { data } = useSiteData()
  return (
    <>
      <Nav />
      <div className="stacker">
        <div className="stack-layer" data-layer="0"><Hero data={data.hero} /></div>
        <div className="stack-layer" data-layer="1"><Capabilities data={data.capabilities} /></div>
        <div className="stack-layer" data-layer="2"><Language data={data.language} /></div>

        <div className="stack-layer" data-layer="4"><WhyUs data={data.whyUs} /></div>

        <div className="stack-layer" data-layer="6"><CTAFooter cta={data.cta} footer={data.footer} /></div>
      </div>
    </>
  )
}
