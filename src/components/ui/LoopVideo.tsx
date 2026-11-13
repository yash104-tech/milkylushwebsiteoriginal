import { useEffect, useRef } from 'react'

/**
 * Muted, looping, inline video that only plays while on screen (saves battery and bandwidth),
 * and stays paused on its first frame for visitors who prefer reduced motion or have Data Saver on.
 */
export function LoopVideo({ src, label, className = '', style }: { src: string; label: string; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = ref.current
    if (!v || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // Data Saver on: don't stream the clip; the first frame stays as a still.
    if ((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {})
        else v.pause()
      },
      { threshold: 0.25 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])

  // <video> can't take role="img", so the clip is hidden from assistive tech and described in text instead.
  return (
    <>
      <video ref={ref} src={src} muted loop playsInline preload="metadata" aria-hidden className={className} style={style} />
      <span className="sr-only">{label}</span>
    </>
  )
}
