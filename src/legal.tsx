import { MotionConfig } from 'motion/react'
import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { bindAnchorLinks, initSmoothScroll, scrollToHash } from './lib/smooth-scroll'
import { privacy, terms } from './config/legal'
import { ScrollProgress } from './components/ScrollProgress'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { LegalPage } from './components/LegalPage'
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton'
import { initCtaTracking } from './lib/track'

/** One entry for both /privacy/ and /terms/ — the page's <div id="root" data-doc="…"> picks the document. */
const root = document.getElementById('root')!
const isTerms = root.dataset.doc === 'terms'

function LegalApp() {
  useEffect(() => {
    const stopSmooth = initSmoothScroll()
    const unbind = bindAnchorLinks()
    const untrack = initCtaTracking()
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
        <LegalPage
          doc={isTerms ? terms : privacy}
          other={isTerms ? { label: 'Privacy Policy', href: '/privacy/' } : { label: 'Terms of Service', href: '/terms/' }}
        />
      </main>
      <Footer home={false} />
      <WhatsAppFloatingButton />
    </MotionConfig>
  )
}

if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

createRoot(root).render(
  <StrictMode>
    <LegalApp />
  </StrictMode>,
)
