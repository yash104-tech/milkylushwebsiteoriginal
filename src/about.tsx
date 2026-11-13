import { MotionConfig } from 'motion/react'
import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ScrollTrigger } from './lib/gsap'
import { bindAnchorLinks, initSmoothScroll, scrollToHash } from './lib/smooth-scroll'
import { ScrollProgress } from './components/ScrollProgress'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton'
import { StickyCtaBar } from './components/StickyCtaBar'
import { initCtaTracking } from './lib/track'
import { AboutHero } from './components/about/AboutHero'
import { WhoWeAre } from './components/about/WhoWeAre'
import { Differences } from './components/about/Differences'
import { FoundersStory } from './components/about/FoundersStory'
import { MissionVision } from './components/about/MissionVision'
import { Values } from './components/about/Values'
import { JoinMovement } from './components/about/JoinMovement'

function AboutApp() {
  useEffect(() => {
    const stopSmooth = initSmoothScroll()
    const unbind = bindAnchorLinks()
    const untrack = initCtaTracking()
    ScrollTrigger.refresh()
    if (location.hash) requestAnimationFrame(() => scrollToHash(location.hash, { push: false }))
    return () => {
      stopSmooth()
      unbind()
      untrack()
    }
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      <Navbar ready home={false} />
      <main id="main" tabIndex={-1}>
        <AboutHero />
        <WhoWeAre />
        <Differences />
        <FoundersStory />
        <MissionVision />
        <Values />
        <JoinMovement />
      </main>
      <Footer home={false} />
      <StickyCtaBar />
      <WhatsAppFloatingButton />
    </MotionConfig>
  )
}

if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AboutApp />
  </StrictMode>,
)
