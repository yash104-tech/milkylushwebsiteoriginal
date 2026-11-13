import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { Menu, Smartphone, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { navLinks, site } from '../config/site'
import { Logo } from './ui/Logo'
import { ButtonLink } from './ui/Button'
import { WhatsAppIcon } from './ui/BrandIcons'
import { appTarget, usePlatform } from '../lib/platform'
import { scrollToHash } from '../lib/smooth-scroll'

/** On the landing page (home) section links are in-page anchors; elsewhere they point back to the landing page. */
const resolve = (href: string, home: boolean) =>
  home || !href.startsWith('#') ? href : href === '#top' ? '/' : href === '#about' ? '/about/' : `/${href}`

export function Navbar({ ready, home = true }: { ready: boolean; home?: boolean }) {
  const { scrollY } = useScroll()
  const app = appTarget(usePlatform())
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const menuBtn = useRef<HTMLButtonElement>(null)
  const panel = useRef<HTMLDivElement>(null)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 24)
    setHidden(y > 640 && y > prev && !open)
  })

  // Mobile menu: lock scroll, close on Escape, keep focus inside, restore focus on close.
  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const first = panel.current?.querySelector<HTMLElement>('a,button')
    first?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
      if (e.key === 'Tab' && panel.current) {
        const items = [...panel.current.querySelectorAll<HTMLElement>('a,button')]
        const [f, l] = [items[0], items[items.length - 1]]
        if (e.shiftKey && document.activeElement === f) (e.preventDefault(), l.focus())
        else if (!e.shiftKey && document.activeElement === l) (e.preventDefault(), f.focus())
      }
    }
    document.addEventListener('keydown', onKey)
    const btn = menuBtn.current
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
      // Return focus to the toggle unless a menu link already moved focus to its target section.
      const a = document.activeElement
      if (!a || a === document.body || panel.current?.contains(a)) btn?.focus()
    }
  }, [open])

  return (
    <>
      <a href="#main" className="sr-only z-[90] rounded-full bg-forest px-5 py-3 text-ivory focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={ready ? { y: hidden ? -96 : 0, opacity: 1 } : undefined}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: ready && !scrolled ? 0.4 : 0 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
            scrolled ? 'bg-ivory/85 shadow-[0_1px_0_rgba(23,75,53,0.08)] backdrop-blur-md' : 'bg-transparent'
          }`}
        >
          <nav aria-label="Primary" className="container-x flex h-[72px] items-center justify-between gap-6">
            <a href={home ? '#top' : '/'} className="shrink-0 rounded-md" aria-label={home ? 'MilkyLush — back to top' : 'MilkyLush — home'}>
              <Logo className="text-[1.05rem] sm:text-[1.15rem]" />
            </a>

            <ul className="hidden items-center gap-1 lg:flex">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={resolve(l.href, home)}
                    aria-current={(home && l.href === '#top') || (!home && l.href === '#about') ? 'page' : undefined}
                    className="group relative rounded-full px-4 py-2 text-[0.9rem] font-medium text-ink/80 transition-colors hover:text-forest"
                  >
                    {l.label}
                    <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-forest transition-transform duration-500 ease-[var(--ease-silk)] group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <ButtonLink
                href={app.href}
                target="_blank"
                variant="ghost"
                arrow={false}
                icon={<Smartphone className="size-4" aria-hidden />}
                data-cta="nav-app"
                className="max-xl:hidden !min-h-11 !px-4 !text-[0.88rem]"
              >
                {app.short}
              </ButtonLink>
              <ButtonLink href={site.whatsapp} target="_blank" data-cta="nav-sample" className="max-sm:hidden !min-h-11 !px-5 !text-[0.88rem]">
                Free Sample
              </ButtonLink>
              <button
                ref={menuBtn}
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                className="inline-flex size-12 cursor-pointer items-center justify-center rounded-full border border-forest/15 bg-ivory/70 text-forest lg:hidden"
              >
                <span className="sr-only">Open menu</span>
                <Menu className="size-5" />
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-[65] flex flex-col bg-forest text-ivory lg:hidden on-dark"
            initial={{ clipPath: 'circle(0% at calc(100% - 40px) 36px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 40px) 36px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 40px) 36px)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="container-x flex h-[72px] items-center justify-between">
              <Logo tone="ivory" className="text-[1.05rem]" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex size-12 cursor-pointer items-center justify-center rounded-full border border-ivory/20 text-ivory"
              >
                <X className="size-5" />
                <span className="sr-only">Close menu</span>
              </button>
            </div>
            <nav aria-label="Mobile" className="container-x flex flex-1 flex-col justify-center gap-2 pb-10">
              {navLinks.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={resolve(l.href, home)}
                  onClick={(e) => {
                    setOpen(false)
                    // In-page anchors: close first (releases the scroll lock), then scroll. Other pages navigate normally.
                    if (l.href.startsWith('#') && home) {
                      e.preventDefault()
                      setTimeout(() => scrollToHash(l.href), 60)
                    }
                  }}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12, transition: { duration: 0.15 } }}
                  transition={{ delay: 0.18 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-baseline gap-4 border-b border-ivory/10 py-3 font-serif text-[2rem] leading-tight"
                >
                  <span className="font-sans text-xs tracking-widest text-leaf">0{i + 1}</span>
                  {l.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-8 flex flex-col gap-3"
              >
                <ButtonLink
                  href={site.whatsapp}
                  target="_blank"
                  variant="light"
                  data-cta="menu-sample"
                  onClick={() => setOpen(false)}
                >
                  Get Your Free Sample
                </ButtonLink>
                <ButtonLink
                  href={app.href}
                  target="_blank"
                  variant="outline-light"
                  arrow={false}
                  icon={<Smartphone className="size-5" aria-hidden />}
                  data-cta="menu-app"
                >
                  {app.label}
                </ButtonLink>
              </motion.div>
              <motion.a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8 inline-flex items-center gap-3 text-ivory/80"
              >
                <WhatsAppIcon className="size-5 text-leaf" /> {site.phoneDisplay}
                <span className="sr-only">(WhatsApp, opens in a new tab)</span>
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
