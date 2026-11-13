import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Logo } from './ui/Logo'

/**
 * Brief cream curtain that reveals the wordmark, then lifts away.
 * Kept short (~1.3s) and skipped on repeat visits within a session and for reduced motion.
 */
export function Preloader({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion()
  const [show, setShow] = useState(() => {
    try {
      return !sessionStorage.getItem('ml-intro')
    } catch {
      return true
    }
  })

  useEffect(() => {
    if (!show || reduce) {
      setShow(false)
      onDone()
      return
    }
    // Wait for the web fonts so the headline doesn't jump, but never longer than 1.2s on a slow connection.
    const fontsReady = Promise.race([document.fonts?.ready ?? Promise.resolve(), new Promise((r) => setTimeout(r, 1200))])
    const minTime = new Promise((r) => setTimeout(r, 550))
    let cancelled = false
    Promise.all([fontsReady, minTime]).then(() => {
      if (cancelled) return
      try {
        sessionStorage.setItem('ml-intro', '1')
      } catch {
        /* storage unavailable — fine */
      }
      setShow(false)
      // Start the hero as the curtain lifts, not after it has finished.
      onDone()
    })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AnimatePresence>
      {show && !reduce && (
        <motion.div
          key="preloader"
          aria-hidden
          className="fixed inset-0 z-[100] flex items-center justify-center bg-cream"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="grain" />
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col items-center gap-6"
          >
            <Logo className="text-[1.75rem] sm:text-[2.25rem]" />
            <span className="relative block h-px w-40 overflow-hidden bg-forest/15">
              <motion.span
                className="absolute inset-y-0 left-0 w-full origin-left bg-forest"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
              />
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
