import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './gsap'

let lenis: Lenis | null = null

const NAV_OFFSET = 72

/**
 * Lenis smooth scrolling, synced to GSAP's ticker so ScrollTrigger stays exact.
 * It still uses the native scrollbar and scroll position, so find-in-page,
 * keyboard scrolling and history behave as normal. Skipped for reduced motion
 * and on touch devices (native momentum is better there).
 */
export function initSmoothScroll() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const coarse = window.matchMedia('(pointer: coarse)').matches
  if (reduce || coarse) return () => {}

  lenis = new Lenis({ lerp: 0.11, smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  const tick = (time: number) => lenis?.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)

  return () => {
    gsap.ticker.remove(tick)
    lenis?.destroy()
    lenis = null
  }
}

/** Scrolls to an in-page anchor, updates the URL and moves focus for keyboard and screen-reader users. */
export function scrollToHash(hash: string, { push = true } = {}) {
  const id = decodeURIComponent(hash.replace(/^#/, ''))
  const target = id ? document.getElementById(id) : document.body
  if (!target) return false
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (lenis) {
    lenis.scrollTo(target, { offset: -NAV_OFFSET, duration: 1.2 })
  } else {
    const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
    window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' })
  }
  if (push && location.hash !== `#${id}`) history.pushState(null, '', `#${id}`)
  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
  target.focus({ preventScroll: true })
  window.dispatchEvent(new HashChangeEvent('hashchange'))
  return true
}

/** Delegated handler so every same-page `<a href="#…">` gets offset-aware scrolling + history. */
export function bindAnchorLinks() {
  const onClick = (e: MouseEvent) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    const a = (e.target as HTMLElement).closest('a')
    const href = a?.getAttribute('href')
    if (!a || !href || !href.startsWith('#') || href.length < 2) return
    if (scrollToHash(href)) e.preventDefault()
  }
  const onPop = () => location.hash && scrollToHash(location.hash, { push: false })
  document.addEventListener('click', onClick)
  window.addEventListener('popstate', onPop)
  return () => {
    document.removeEventListener('click', onClick)
    window.removeEventListener('popstate', onPop)
  }
}
