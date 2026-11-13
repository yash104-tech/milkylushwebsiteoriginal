import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useState } from 'react'
import { site } from '../config/site'
import { WhatsAppIcon } from './ui/BrandIcons'

export function WhatsAppFloatingButton() {
  const { scrollY } = useScroll()
  const [show, setShow] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => setShow(y > window.innerHeight * 0.8))

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={site.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="group fixed bottom-5 right-4 z-40 flex h-14 max-lg:hidden items-center gap-2 rounded-full bg-forest pl-4 pr-4 text-ivory shadow-[0_16px_40px_-12px_rgba(15,52,36,0.7)] sm:bottom-7 sm:right-7 sm:pr-5"
          style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
        >
          <WhatsAppIcon className="size-6 text-leaf" />
          <span className="hidden text-sm font-semibold sm:inline">Free sample</span>
          <span className="sr-only">Chat with MilkyLush on WhatsApp (opens in a new tab)</span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
