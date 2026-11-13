import { MotionConfig } from 'motion/react'
import { useEffect, useState } from 'react'
import { ScrollTrigger } from './lib/gsap'
import { bindAnchorLinks, initSmoothScroll, scrollToHash } from './lib/smooth-scroll'
import { ScrollProgress } from './components/ScrollProgress'
import { Navbar } from './components/Navbar'
import { HeroSection } from './components/HeroSection'
import { TrustStrip } from './components/TrustStrip'
import { AppSection } from './components/AppSection'
import { ShopRange } from './components/ShopRange'
import { InstagramReels } from './components/InstagramReels'
import { BottleReturnSection } from './components/BottleReturnSection'
import { AboutPreview } from './components/AboutPreview'
import { JourneySection } from './components/JourneySection'
import { VillageVideo } from './components/VillageVideo'
import { Comparison } from './components/Comparison'
import { WhyMilkyLush } from './components/WhyMilkyLush'
import { Testimonials } from './components/Testimonials'
import { GetStarted } from './components/GetStarted'
import { SubscriptionCTA } from './components/SubscriptionCTA'
import { FAQ } from './components/FAQ'
import { Footer } from './components/Footer'
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton'
import { StickyCtaBar } from './components/StickyCtaBar'
import { initCtaTracking } from './lib/track'

const STAGES = 5

/**
 * Renders the page below the first screen in small batches while the browser is idle (each within ~0.5s),
 * so no single long task blocks the main thread after the first paint. A deep link (e.g. /#faq) gets
 * everything straight away so its section exists to scroll to.
 */
function useStagedRender() {
  const [stage, setStage] = useState(() => (location.hash ? STAGES : 0))
  useEffect(() => {
    if (stage >= STAGES) return
    const next = () => setStage((s) => s + 1)
    // Safari has no requestIdleCallback: fall back to a short timeout.
    if (!('requestIdleCallback' in window)) {
      const t = setTimeout(next, 120)
      return () => clearTimeout(t)
    }
    const id = requestIdleCallback(next, { timeout: 500 })
    return () => cancelIdleCallback(id)
  }, [stage])
  return stage
}

export default function App() {
  // The hero intro starts on the first frame — no loading curtain in front of the page.
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const raf = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(raf)
  }, [])
  const stage = useStagedRender()
  const done = stage >= STAGES

  useEffect(() => {
    const stopSmooth = initSmoothScroll()
    const unbind = bindAnchorLinks()
    const untrack = initCtaTracking()
    return () => {
      stopSmooth()
      unbind()
      untrack()
    }
  }, [])

  useEffect(() => {
    if (!done) return
    // The full page is in place now — recalculate scroll positions, then honour any deep link.
    ScrollTrigger.refresh()
    if (location.hash) requestAnimationFrame(() => scrollToHash(location.hash, { push: false }))
  }, [done])

  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      <Navbar ready={ready} />
      <main id="main" tabIndex={-1}>
        {/* Conversion order: the two goals (free sample, app) come first and are repeated, proof follows */}
        <HeroSection ready={ready} />
        <TrustStrip />
        {stage >= 1 && (
          <>
            <GetStarted />
            <AppSection />
          </>
        )}
        {stage >= 2 && (
          <>
            <ShopRange />
            <BottleReturnSection />
          </>
        )}
        {stage >= 3 && (
          <>
            <AboutPreview />
            <JourneySection />
            <VillageVideo />
          </>
        )}
        {stage >= 4 && (
          <>
            <Comparison />
            <WhyMilkyLush />
          </>
        )}
        {stage >= 5 && (
          <>
            <InstagramReels />
            <Testimonials />
            <SubscriptionCTA />
            <FAQ />
          </>
        )}
      </main>
      {done && <Footer />}
      <StickyCtaBar />
      <WhatsAppFloatingButton />
    </MotionConfig>
  )
}
