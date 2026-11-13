import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useEffect, type RefObject } from 'react'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

export const MOTION_OK = '(prefers-reduced-motion: no-preference)'
export const EASE = 'power3.out'

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

/**
 * Scoped GSAP setup. The callback runs inside gsap.matchMedia so every tween and
 * ScrollTrigger only exists when the visitor has not asked for reduced motion,
 * and is reverted automatically on unmount.
 */
export function useGsap(
  scope: RefObject<HTMLElement | null>,
  setup: (ctx: { isDesktop: boolean; root: HTMLElement }) => void | (() => void),
  deps: unknown[] = [],
) {
  useIsoLayoutEffect(() => {
    const root = scope.current
    if (!root) return
    const mm = gsap.matchMedia(root)
    mm.add({ ok: MOTION_OK, isDesktop: '(min-width: 1024px)' }, (c) => {
      if (!c.conditions?.ok) return
      return setup({ isDesktop: Boolean(c.conditions.isDesktop), root })
    })
    return () => mm.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
