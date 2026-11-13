import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, ChevronLeft, ChevronRight, LoaderCircle, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { reels, site, type Reel } from '../config/site'
import { Picture } from './ui/Picture'
import { InstagramIcon } from './ui/BrandIcons'

const instagram = site.socials.find((s) => s.name === 'Instagram')!.href
const reelUrl = (id: string) => `https://www.instagram.com/reel/${id}/`
/** The original Instagram thumbnails (360×640). */
const coverAsset = (name: string) => ({ name, widths: [360] as const, width: 360, height: 640 })

/** Story-style reel card: cover zooms and the preview clip (if supplied) plays on hover/focus. */
function ReelCard({ reel, index, onOpen }: { reel: Reel; index: number; onOpen: () => void }) {
  const video = useRef<HTMLVideoElement>(null)
  const play = () => {
    if (!video.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    video.current.play().catch(() => {})
  }
  const stop = () => {
    if (!video.current) return
    video.current.pause()
    video.current.currentTime = 0
  }

  return (
    <motion.li
      initial={{ opacity: 0, y: 50, rotate: index % 2 ? 1.5 : -1.5 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="reel-card w-[64%] shrink-0 snap-center pb-4 transition-opacity duration-500 sm:w-[36%] md:w-[28%] lg:w-[calc((100%-96px)/5)] [@media(hover:hover)]:group-hover/reels:opacity-55 [@media(hover:hover)]:hover:!opacity-100"
    >
      <div className="relative">
        <button
          type="button"
          data-reel={index}
          onClick={onOpen}
          onMouseEnter={play}
          onMouseLeave={stop}
          onFocus={play}
          onBlur={stop}
          className="group/reel relative block aspect-[9/16] w-full cursor-pointer overflow-hidden rounded-[22px] bg-forest-deep text-left shadow-[0_30px_60px_-30px_rgba(15,52,36,0.6)] transition-transform duration-500 ease-[var(--ease-silk)] hover:-translate-y-1.5"
        >
          <Picture
            {...coverAsset(reel.cover)}
            alt=""
            sizes="(min-width: 1024px) 18vw, (min-width: 640px) 34vw, 64vw"
            className="absolute inset-0 size-full object-cover transition-transform duration-[1.4s] ease-[var(--ease-silk)] group-hover/reel:scale-[1.08] group-focus-visible/reel:scale-[1.08]"
          />
          {reel.preview && (
            <video
              ref={video}
              src={reel.preview}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden
              className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-500 group-hover/reel:opacity-100"
            />
          )}
          <span className="sr-only">
            {reel.title} — play Instagram reel
          </span>
        </button>

        <a
          href={reelUrl(reel.id)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 block rounded-lg px-1 outline-offset-4 hover:[&_.reel-user]:underline"
        >
          <span className="reel-user flex items-center gap-1.5 text-[0.8rem] font-bold text-forest">
            <InstagramIcon className="size-3.5" /> @milkylush_organic
          </span>
          <span className="mt-1.5 block font-serif text-[1.05rem] leading-snug text-ink">{reel.title}</span>
          <span className="mt-1 block text-[0.85rem] leading-relaxed text-ink-soft">{reel.description}</span>
          <span className="sr-only"> (opens Instagram in a new tab)</span>
        </a>
      </div>
    </motion.li>
  )
}

/** Full-screen story viewer with the real Instagram reel embedded. */
function ReelViewer({ index, onClose, onStep }: { index: number; onClose: () => void; onStep: (dir: 1 | -1) => void }) {
  const reel = reels[index]
  const [loaded, setLoaded] = useState(false)
  const dialog = useRef<HTMLDivElement>(null)
  const current = useRef(index)
  current.current = index

  useEffect(() => setLoaded(false), [index])

  useEffect(() => {
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onStep(1)
      if (e.key === 'ArrowLeft') onStep(-1)
      if (e.key === 'Tab' && dialog.current) {
        const items = [...dialog.current.querySelectorAll<HTMLElement>('button, a, iframe')]
        const [f, l] = [items[0], items[items.length - 1]]
        if (e.shiftKey && document.activeElement === f) (e.preventDefault(), l.focus())
        else if (!e.shiftKey && document.activeElement === l) (e.preventDefault(), f.focus())
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = overflow
      document.removeEventListener('keydown', onKey)
      // Return focus to the card of the reel that was showing last.
      document.querySelector<HTMLElement>(`[data-reel="${current.current}"]`)?.focus({ preventScroll: true })
    }
  }, [onClose, onStep])

  return (
    <motion.div
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-label={`Instagram reel: ${reel.title}`}
      className="on-dark fixed inset-0 z-[80] flex items-center justify-center bg-[rgba(10,24,17,0.92)] p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <button
        type="button"
        data-autofocus
        onClick={onClose}
        className="absolute right-4 top-4 flex size-12 cursor-pointer items-center justify-center rounded-full border border-ivory/25 text-ivory hover:bg-ivory/10"
      >
        <X className="size-5" aria-hidden />
        <span className="sr-only">Close reel</span>
      </button>

      <div className="relative flex w-full max-w-[440px] flex-col items-center gap-4">
        {/* story progress segments */}
        <div className="flex w-full gap-1.5" aria-hidden>
          {reels.map((r, i) => (
            <span key={r.id} className="h-[3px] flex-1 overflow-hidden rounded-full bg-ivory/20">
              <motion.span
                className="block h-full origin-left bg-ivory"
                initial={false}
                animate={{ scaleX: i < index ? 1 : i === index ? 1 : 0, opacity: i === index ? 1 : 0.6 }}
                transition={{ duration: 0.5 }}
              />
            </span>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={reel.id}
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[min(78vh,720px)] w-full overflow-hidden rounded-[22px] bg-white"
          >
            {!loaded && (
              <div className="absolute inset-0">
                <Picture {...coverAsset(reel.cover)} alt="" sizes="440px" className="size-full object-cover opacity-60" />
                <LoaderCircle className="absolute left-1/2 top-1/2 size-8 -translate-x-1/2 -translate-y-1/2 animate-spin text-forest" aria-hidden />
              </div>
            )}
            <iframe
              src={`${reelUrl(reel.id)}embed/`}
              title={`Instagram reel by MilkyLush: ${reel.title}`}
              className="relative size-full border-0"
              allow="autoplay; encrypted-media; picture-in-picture; clipboard-write"
              allowFullScreen
              onLoad={() => setLoaded(true)}
            />
          </motion.div>
        </AnimatePresence>

        <div className="flex w-full items-center justify-between gap-3 text-ivory">
          <p className="min-w-0 truncate font-serif text-lg">{reel.title}</p>
          <a
            href={reelUrl(reel.id)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 shrink-0 items-center gap-1.5 text-sm font-semibold text-leaf hover:underline"
          >
            Open on Instagram <ArrowUpRight className="size-4" aria-hidden />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onStep(-1)}
        className="absolute left-3 top-1/2 flex size-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-ivory/10 text-ivory hover:bg-ivory/20 sm:left-8"
      >
        <ChevronLeft className="size-6" aria-hidden />
        <span className="sr-only">Previous reel</span>
      </button>
      <button
        type="button"
        onClick={() => onStep(1)}
        className="absolute right-3 top-1/2 flex size-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-ivory/10 text-ivory hover:bg-ivory/20 sm:right-8"
      >
        <ChevronRight className="size-6" aria-hidden />
        <span className="sr-only">Next reel</span>
      </button>
    </motion.div>
  )
}

export function InstagramReels() {
  const [open, setOpen] = useState<number | null>(null)
  const close = useCallback(() => setOpen(null), [])
  const step = useCallback((dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + reels.length) % reels.length)), [])

  return (
    <section id="reels" aria-labelledby="reels-title" className="relative overflow-hidden bg-ivory py-24 sm:py-28">
      <div className="container-x">
        <div className="flex flex-col items-center text-center">
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="eyebrow inline-flex min-h-11 items-center gap-2 text-forest hover:underline"
          >
            <InstagramIcon className="size-4" /> @milkylush_organic
            <span className="sr-only">(opens Instagram in a new tab)</span>
          </a>
          <h2 id="reels-title" className="mt-3 text-[clamp(2.3rem,4.6vw,3.8rem)] font-[340] text-ink">
            Rooted in purity, <em className="font-[300] text-forest">take a look.</em>
          </h2>
          <p className="mt-3 max-w-md text-ink-soft">Mornings, bottles and village farms. Straight from our Instagram.</p>
        </div>

        <ul
          aria-label="MilkyLush Instagram reels"
          className="group/reels -mx-4 mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-6 pt-2 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {reels.map((r, i) => (
            <ReelCard key={r.id} reel={r} index={i} onOpen={() => setOpen(i)} />
          ))}
        </ul>
      </div>

      <AnimatePresence>{open !== null && <ReelViewer index={open} onClose={close} onStep={step} />}</AnimatePresence>
    </section>
  )
}
