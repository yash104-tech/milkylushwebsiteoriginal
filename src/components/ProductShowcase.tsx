import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { Check, Images } from 'lucide-react'
import { useRef, useState, type PointerEvent as RPointerEvent } from 'react'
import { products, site, type Product } from '../config/site'
import { gsap, useGsap } from '../lib/gsap'
import { MilkBottle } from './MilkBottle'
import { ButtonLink } from './ui/Button'
import { Picture } from './ui/Picture'
import { orderTarget, usePlatform } from '../lib/platform'
import { SwapMedia } from './ui/SwapMedia'

function TiltMedia({ product }: { product: Product }) {
  const reduce = useReducedMotion()
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 16 })
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 16 })
  const glareX = useTransform(px, [-0.5, 0.5], ['20%', '80%'])
  const glare = useTransform(glareX, (x) => `radial-gradient(60% 50% at ${x} 20%, rgba(255,255,255,0.55), transparent 70%)`)

  const onMove = (e: RPointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }
  const reset = () => (px.set(0), py.set(0))
  const [swapped, setSwapped] = useState(false)

  return (
    <div className="[perspective:1200px]" onPointerMove={onMove} onPointerLeave={reset}>
      <motion.div
        style={{ rotateX: rx, rotateY: ry }}
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative aspect-[4/5] overflow-hidden rounded-[32px] bg-white/50 shadow-[0_40px_80px_-40px_rgba(40,40,20,0.45)] [transform-style:preserve-3d] sm:aspect-[5/5] lg:aspect-auto lg:h-[min(60vh,600px)]"
      >
        <SwapMedia
          className="size-full"
          sizes="(min-width: 1024px) 45vw, 100vw"
          swapped={swapped}
          hover={product.hoverImage.name}
          hoverAlt={product.hoverImage.alt}
          hoverPosition={product.hoverImage.position}
          primary={
            <>
              {product.image === 'bottle' ? (
                <div className="relative size-full bg-[radial-gradient(90%_70%_at_50%_30%,#ffffff_0%,#f3efe2_55%,#e4dcc7_100%)]">
                  <div className="absolute left-1/2 top-[18%] size-[60%] -translate-x-1/2 rounded-full bg-leaf/25 blur-3xl" />
                  <svg aria-hidden viewBox="0 0 400 120" className="absolute inset-x-0 bottom-0 w-full" preserveAspectRatio="none">
                    <path d="M0 50 Q200 10 400 50 V120 H0Z" fill="#ddd2bb" />
                  </svg>
                  <MilkBottle className="absolute bottom-[9%] left-1/2 h-[82%] w-auto -translate-x-1/2 drop-shadow-[0_30px_30px_rgba(40,40,20,0.25)]" />
                </div>
              ) : (
                <Picture
                  {...product.image}
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="size-full object-cover"
                />
              )}
            </>
          }
        />
        <button
          type="button"
          onClick={() => setSwapped((v) => !v)}
          aria-pressed={swapped}
          className="absolute bottom-4 left-4 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-white/85 px-4 text-xs font-semibold text-forest backdrop-blur-sm"
        >
          <Images className="size-4" aria-hidden /> {swapped ? 'Show product' : 'See it at home'}
        </button>
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-soft-light"
          style={{ background: glare }}
        />
        {product.status && (
          <span className="absolute right-5 top-5 rounded-full bg-forest px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-ivory">
            {product.status}
          </span>
        )}
      </motion.div>
    </div>
  )
}

function ProductPanel({ product, index }: { product: Product; index: number }) {
  // Android → the app, iPhone → WhatsApp, desktop → the web shop
  const order = orderTarget(usePlatform(), { product: product.name, webUrl: product.href })
  const item = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } },
  }
  return (
    <article
      aria-labelledby={`p-${product.id}`}
      data-tone={product.tone}
      className="product-panel flex w-full shrink-0 items-center py-16 lg:h-full lg:w-screen lg:py-0"
    >
      <div className="container-x grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6 lg:col-start-1">
          <TiltMedia product={product} />
        </div>
        <motion.div
          className="lg:col-span-5"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ staggerChildren: 0.09 }}
        >
          <motion.p variants={item} className="eyebrow text-[#4a7432]">
            {product.eyebrow}
          </motion.p>
          <motion.h3 variants={item} id={`p-${product.id}`} className="mt-4 text-[clamp(2.6rem,5vw,4.6rem)] font-[340] text-ink">
            {product.name}
          </motion.h3>
          <motion.p variants={item} className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-ink-soft">
            {product.description}
          </motion.p>
          <motion.ul variants={item} className="mt-7 flex flex-col gap-2.5">
            {product.details.map((d) => (
              <li key={d} className="flex items-center gap-3 text-[0.95rem] text-ink">
                <span className="flex size-5 items-center justify-center rounded-full bg-forest/10 text-forest">
                  <Check className="size-3" strokeWidth={2.5} aria-hidden />
                </span>
                {d}
              </li>
            ))}
          </motion.ul>
          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            {product.id === 'milk' ? (
              <>
                <ButtonLink href={site.whatsapp} target="_blank" data-cta="product-sample">
                  Claim Your Free Sample
                </ButtonLink>
                <ButtonLink href={order.href} target="_blank" variant="ghost" data-cta="product-milk-order" aria-label={`${order.label ?? 'Order'}: ${product.name}`}>
                  {order.label ?? 'Order Milk'}
                </ButtonLink>
              </>
            ) : (
              <ButtonLink href={order.href} target="_blank" data-cta={`product-${product.id}-order`} aria-label={`${order.label ?? product.cta}: ${product.name}`}>
                {order.label ?? product.cta}
              </ButtonLink>
            )}
            <span className="text-sm text-ink-soft">
              0{index + 1} / 0{products.length}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </article>
  )
}

export function ProductShowcase() {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useGsap(root, ({ isDesktop, root }) => {
    const panels = gsap.utils.toArray<HTMLElement>('.product-panel', root)
    const tones = panels.map((p) => p.dataset.tone!)

    if (isDesktop && track.current) {
      // Pinned horizontal gallery. Normal vertical scrolling drives it — nothing is hijacked.
      const t = track.current
      const distance = () => t.scrollWidth - window.innerWidth
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.querySelector('.product-pin'),
          pin: true,
          start: 'top top',
          end: () => `+=${distance()}`,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })
      tl.to(t, { x: () => -distance(), ease: 'none', duration: panels.length - 1 }, 0)
      tones.slice(1).forEach((tone, i) => tl.to(root, { backgroundColor: tone, ease: 'none', duration: 1 }, i))
      tl.to(root.querySelector('.product-progress'), { scaleX: 1, ease: 'none', duration: panels.length - 1 }, 0)
    } else {
      panels.forEach((p, i) => {
        if (i === 0) return
        gsap.to(root, {
          backgroundColor: tones[i],
          ease: 'none',
          scrollTrigger: { trigger: p, start: 'top 70%', end: 'top 30%', scrub: true },
        })
      })
    }
  })

  return (
    <section id="products" ref={root} aria-label="Our products" className="relative bg-[#F4F1E6]">
      <div className="product-pin relative lg:flex lg:h-[100svh] lg:flex-col lg:overflow-hidden">
        <div className="container-x relative z-10 hidden justify-end pt-24 lg:flex">
          <div className="flex w-56 items-center gap-3" aria-hidden>
            <span className="relative h-px flex-1 bg-forest/15">
              <span className="product-progress absolute inset-0 origin-left scale-x-0 bg-forest" />
            </span>
            <span className="text-xs font-semibold tracking-[0.2em] text-forest/70">SCROLL</span>
          </div>
        </div>
        <div ref={track} className="flex flex-col lg:min-h-0 lg:flex-1 lg:flex-row lg:will-change-transform">
          {products.map((p, i) => (
            <ProductPanel key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
