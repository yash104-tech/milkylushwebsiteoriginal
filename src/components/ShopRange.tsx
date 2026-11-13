import { motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Images } from 'lucide-react'
import { useRef, useState } from 'react'
import { range, type RangeItem } from '../config/site'
import { ButtonLink } from './ui/Button'
import { Picture } from './ui/Picture'
import { appTarget, orderTarget, usePlatform } from '../lib/platform'
import { SwapMedia, cardAsset } from './ui/SwapMedia'

const SIZES = '(min-width: 1024px) 24vw, (min-width: 640px) 44vw, 78vw'

function RangeCard({ item, index }: { item: RangeItem; index: number }) {
  // Android → the app, iPhone → WhatsApp, desktop → the web shop
  const order = orderTarget(usePlatform(), { product: item.name, webUrl: item.href })
  // Touch screens have no hover, so a tap on the photo toggles to the second image.
  const [swapped, setSwapped] = useState(false)
  return (
    <motion.li
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group/swap w-[78%] shrink-0 snap-start sm:w-[44%] lg:w-[calc((100%-72px)/4)]"
    >
      <article className="flex h-full flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_1px_0_rgba(23,75,53,0.06)] transition-shadow duration-500 group-hover/swap:shadow-[0_30px_60px_-30px_rgba(23,75,53,0.45)]">
        <div className="relative">
          <SwapMedia
            className="aspect-[4/5] bg-[#f6f3ec]"
            sizes={SIZES}
            swapped={swapped}
            hover={item.hover}
            hoverAlt={item.hoverAlt}
            primary={<Picture {...cardAsset(item.image)} alt={item.alt} sizes={SIZES} className="size-full object-cover" />}
          />
          {item.status && (
            <span className="absolute left-4 top-4 rounded-full bg-forest px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-ivory">
              {item.status}
            </span>
          )}
          <button
            type="button"
            onClick={() => setSwapped((s) => !s)}
            aria-pressed={swapped}
            className="absolute right-3 top-3 flex size-10 cursor-pointer items-center justify-center rounded-full bg-white/85 text-forest shadow-sm backdrop-blur-sm [@media(hover:hover)]:hidden"
          >
            <Images className="size-4" aria-hidden />
            <span className="sr-only">{swapped ? `Show ${item.name} product photo` : `Show ${item.name} in use`}</span>
          </button>
          {/* Slide-up CTA on hover (desktop) */}
          <div className="pointer-events-none absolute inset-x-3 bottom-3 translate-y-[120%] opacity-0 transition-[transform,opacity] duration-500 ease-[var(--ease-silk)] group-hover/swap:pointer-events-auto group-hover/swap:translate-y-0 group-hover/swap:opacity-100 group-focus-within/swap:pointer-events-auto group-focus-within/swap:translate-y-0 group-focus-within/swap:opacity-100">
            <a
              href={order.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center justify-center gap-2 rounded-full bg-forest text-sm font-semibold text-ivory hover:bg-forest-deep"
            >
              {order.label ?? 'View in shop'} <ArrowUpRight className="size-4" aria-hidden />
              <span className="sr-only"> — {item.name} (opens in a new tab)</span>
            </a>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-1 px-5 pb-5 pt-4">
          <h3 className="font-serif text-[1.3rem] leading-snug text-ink">{item.name}</h3>
          <p className="text-sm font-semibold text-[#4a7432]">{item.size}</p>
          <p className="mt-1 text-[0.92rem] leading-relaxed text-ink-soft">{item.blurb}</p>
          <a
            href={order.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex min-h-11 items-center gap-1.5 pt-3 text-sm font-semibold text-forest underline-offset-4 hover:underline [@media(hover:hover)]:hidden"
          >
            {order.label ?? 'View in shop'} <ArrowUpRight className="size-4" aria-hidden />
            <span className="sr-only"> — {item.name} (opens in a new tab)</span>
          </a>
        </div>
      </article>
    </motion.li>
  )
}

export function ShopRange() {
  const platform = usePlatform()
  const scroller = useRef<HTMLUListElement>(null)
  const { scrollXProgress } = useScroll({ container: scroller })
  const progress = useSpring(scrollXProgress, { stiffness: 160, damping: 30 })
  const [edge, setEdge] = useState({ start: true, end: false })
  useMotionValueEvent(scrollXProgress, 'change', (p) => setEdge({ start: p < 0.01, end: p > 0.99 }))

  const page = (dir: 1 | -1) => {
    const el = scroller.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <section id="shop" aria-labelledby="shop-title" className="relative overflow-hidden bg-sand py-24 sm:py-28">
      <div className="container-x">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow text-forest">The MilkyLush range</p>
            <h2 id="shop-title" className="mt-4 text-[clamp(2.3rem,4.6vw,3.8rem)] font-[340] text-ink">
              Fresh dairy and wood-pressed oils.
            </h2>
            <p className="mt-3 max-w-md text-ink-soft">
              Milk, ghee, paneer, curd and wood-pressed oils from MilkyLush. Message us on WhatsApp or use the app for today’s prices and
              availability.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => page(-1)}
              disabled={edge.start}
              className="flex size-12 cursor-pointer items-center justify-center rounded-full border border-forest/20 text-forest transition-colors hover:bg-forest hover:text-ivory disabled:cursor-default disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-forest"
            >
              <ArrowLeft className="size-5" aria-hidden />
              <span className="sr-only">Previous products</span>
            </button>
            <button
              type="button"
              onClick={() => page(1)}
              disabled={edge.end}
              className="flex size-12 cursor-pointer items-center justify-center rounded-full border border-forest/20 text-forest transition-colors hover:bg-forest hover:text-ivory disabled:cursor-default disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-forest"
            >
              <ArrowRight className="size-5" aria-hidden />
              <span className="sr-only">Next products</span>
            </button>
          </div>
        </div>

        <ul
          ref={scroller}
          aria-label="MilkyLush products"
          className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {range.map((item, i) => (
            <RangeCard key={item.id} item={item} index={i} />
          ))}
        </ul>

        <div className="mt-6 flex items-center gap-6">
          <span aria-hidden className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-forest/10">
            <motion.span className="absolute inset-0 origin-left rounded-full bg-forest" style={{ scaleX: progress }} />
          </span>
          <ButtonLink href={appTarget(platform).href} target="_blank" variant="ghost" data-cta="shop-app" className="!min-h-11 !px-5 !text-sm">
            {appTarget(platform).label}
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
