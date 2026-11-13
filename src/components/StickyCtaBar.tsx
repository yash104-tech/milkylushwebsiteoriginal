import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { Gift, Smartphone } from 'lucide-react'
import { useState } from 'react'
import { appTarget, usePlatform } from '../lib/platform'
import { site } from '../config/site'

/**
 * Phones only: a slim bar with the two things this page is for — claim the free sample, get the app.
 * It appears once the visitor has scrolled past the first screen, which already has both buttons.
 */
export function StickyCtaBar() {
  const platform = usePlatform()
  const app = appTarget(platform)
  const { scrollY } = useScroll()
  const [show, setShow] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => setShow(y > window.innerHeight * 0.7))

  const btn =
    'flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full px-4 text-[0.92rem] font-semibold transition-[transform,background-color] duration-200 active:scale-[0.97]'

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          // Same unit on both ends ('%'): mixing % and px makes Motion measure the page, which cancels smooth scrolling.
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-[55] border-t border-forest/10 bg-ivory/95 px-3 pt-2.5 shadow-[0_-12px_30px_-18px_rgba(23,75,53,0.45)] lg:hidden"
          style={{ paddingBottom: 'max(0.625rem, env(safe-area-inset-bottom))' }}
        >
          <div className="mx-auto flex max-w-md gap-2">
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" data-cta="sticky-sample" className={`${btn} bg-forest text-ivory`}>
              <Gift className="size-4" aria-hidden /> Free Sample
            </a>
            <a href={app.href} target="_blank" rel="noopener noreferrer" data-cta="sticky-app" className={`${btn} border border-forest/25 bg-white text-forest`}>
              <Smartphone className="size-4" aria-hidden /> {app.short}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
