import { useEffect, useRef } from 'react'

/** Adds `.is-live` to the element while it is on screen so CSS ambient loops pause off-screen. */
export function useLive<T extends HTMLElement>(margin = '0px') {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => el.classList.toggle('is-live', e.isIntersecting), { rootMargin: margin })
    io.observe(el)
    return () => io.disconnect()
  }, [margin])
  return ref
}
