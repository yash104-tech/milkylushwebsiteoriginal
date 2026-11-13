import { motion } from 'motion/react'
import type { ReactNode } from 'react'

/** Fade-and-rise on scroll, once. Motion's MotionConfig handles reduced-motion preferences. */
export function Reveal({ children, delay = 0, y = 32, className = '' }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
