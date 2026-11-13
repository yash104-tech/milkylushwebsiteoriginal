import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { appTarget, usePlatform } from '../lib/platform'
import { site } from '../config/site'
import { Fragment, useEffect, useRef } from 'react'
import { Gift, Milk, Recycle, Smartphone, Truck } from 'lucide-react'
import { gsap, useGsap, EASE } from '../lib/gsap'
import { useLive } from '../hooks/useLive'
import { MilkBottle } from './MilkBottle'
import { ButtonLink } from './ui/Button'

const particles = Array.from({ length: 10 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  bottom: `${(i * 23) % 40}%`,
  size: 2 + ((i * 7) % 4),
  delay: -((i * 1.7) % 12),
  duration: 11 + ((i * 5) % 9),
  dx: `${((i % 5) - 2) * 14}px`,
}))

const labels = [
  { text: 'Fresh Cow Milk', Icon: Milk, pos: 'xl:-left-[4%] xl:top-[8%]' },
  { text: 'Reusable Glass Bottle', Icon: Recycle, pos: 'xl:-right-[4%] xl:top-[22%]' },
  { text: 'Delivered to Your Door', Icon: Truck, pos: 'xl:bottom-[3%] xl:left-1/2 xl:-translate-x-1/2' },
]

const headline: { w: string; em?: boolean }[][] = [
  [{ w: 'Pure' }, { w: 'Milk.' }],
  [{ w: 'A' }, { w: 'More' }, { w: 'Beautiful', em: true }],
  [{ w: 'Everyday.' }],
]

export function HeroSection({ ready }: { ready: boolean }) {
  const platform = usePlatform()
  const root = useLive<HTMLElement>()
  const tl = useRef<gsap.core.Timeline | null>(null)
  // The GSAP setup re-runs when the viewport crosses a breakpoint, so it must read the latest values
  // from refs rather than from the render it was created in (otherwise the intro never plays again).
  const readyRef = useRef(ready)
  const introPlayed = useRef(false)
  readyRef.current = ready
  const reduce = useReducedMotion()

  // Mouse-follow on the bottle (fine pointers only).
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 })
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 })
  const rotY = useTransform(sx, [-1, 1], [-7, 7])
  const rotX = useTransform(sy, [-1, 1], [5, -5])
  const tx = useTransform(sx, [-1, 1], [-14, 14])
  const ty = useTransform(sy, [-1, 1], [-10, 10])
  const lx = useTransform(sx, [-1, 1], [10, -10])

  useEffect(() => {
    const el = root.current
    if (!el || reduce || !window.matchMedia('(pointer: fine)').matches) return
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      mx.set(((e.clientX - r.left) / r.width) * 2 - 1)
      my.set(((e.clientY - r.top) / r.height) * 2 - 1)
    }
    const onLeave = () => (mx.set(0), my.set(0))
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [reduce, mx, my, root])

  useGsap(root, ({ root, isDesktop }) => {
    const q = gsap.utils.selector(root)
    const t = gsap.timeline({ paused: true, defaults: { ease: EASE } })
    t.from(q('.hw'), { yPercent: 110, rotate: 4, duration: 1.1, stagger: 0.07 })
      .from(q('.h-eyebrow'), { opacity: 0, y: 12, duration: 0.8 }, 0.1)
      .from(q('.h-sub'), { opacity: 0, y: 18, duration: 0.9 }, 0.55)
      .from(q('.h-cta'), { opacity: 0, y: 18, duration: 0.8, stagger: 0.08 }, 0.7)
      .from(q('.h-stone'), { opacity: 0, scaleX: 0.7, duration: 1.2, ease: 'expo.out' }, 0.2)
      // No fade on the bottle: it is the page's largest image (LCP), so it must be visible from the first frame.
      .from(q('.h-bottle'), { y: 60, scale: 0.92, duration: 1.5, ease: 'expo.out' }, 0.1)
      .from(q('.h-shadow'), { opacity: 0, scale: 0.4, duration: 1.4, ease: 'expo.out' }, 0.45)
      .from(q('.h-drop'), { opacity: 0, scale: 0, duration: 0.8, stagger: 0.06, ease: 'back.out(2)' }, 0.95)
      .from(q('.h-label'), { opacity: 0, y: 16, scale: 0.94, duration: 0.8, stagger: 0.12 }, 1.05)
      .from(q('.h-land'), { opacity: 0, y: 40, duration: 1.6, stagger: 0.1, ease: 'expo.out' }, 0)
      .from(q('.h-cue'), { opacity: 0, duration: 0.8 }, 1.4)
    tl.current = t
    if (readyRef.current) {
      // Re-created after the intro already ran (e.g. window resized): show the finished state.
      if (introPlayed.current) t.progress(1)
      else (introPlayed.current = true, t.play())
    }

    // Slow parallax as the hero scrolls away.
    const st = { trigger: root, start: 'top top', end: 'bottom top', scrub: true }
    gsap.to(q('.h-far'), { yPercent: 18, ease: 'none', scrollTrigger: st })
    gsap.to(q('.h-mid'), { yPercent: 10, ease: 'none', scrollTrigger: st })
    gsap.to(q('.h-sun'), { yPercent: 30, opacity: 0.4, ease: 'none', scrollTrigger: st })
    if (isDesktop) {
      gsap.to(q('.h-copy'), { y: -60, opacity: 0.35, ease: 'none', scrollTrigger: st })
      gsap.to(q('.h-visual'), { y: -90, ease: 'none', scrollTrigger: st })
    }
    return () => {
      tl.current = null
    }
  })

  useEffect(() => {
    if (ready && !introPlayed.current) {
      introPlayed.current = true
      tl.current?.play()
    }
  }, [ready])

  return (
    <section
      id="top"
      ref={root}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[linear-gradient(180deg,#f7f3e6_0%,#faf8f1_45%,#f1ecdc_100%)] pb-20 pt-28 lg:pb-16 lg:pt-24"
    >
      {/* Morning sun from the right + light rays */}
      <div aria-hidden className="h-sun pointer-events-none absolute -right-[20%] -top-[30%] -z-10 size-[90vmax]">
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,236,190,0.95)_0%,rgba(255,232,180,0.45)_28%,rgba(250,248,241,0)_62%)]" />
        <div
          className="absolute inset-0 opacity-80 [mask-image:radial-gradient(circle,black_20%,transparent_65%)]"
          style={{
            background:
              'repeating-conic-gradient(from 200deg at 50% 50%, rgba(255,240,205,0.55) 0deg 5deg, transparent 5deg 16deg)',
          }}
        />
      </div>

      {/* Landscape layers */}
      <svg aria-hidden className="h-land h-far pointer-events-none absolute inset-x-0 bottom-[16%] -z-10 h-[38%] w-full" viewBox="0 0 1440 400" preserveAspectRatio="none">
        <path d="M0 260 C180 190 330 210 520 170 C700 135 860 200 1040 160 C1200 125 1330 150 1440 130 V400 H0Z" fill="#dfe8cf" opacity="0.8" />
        <path d="M0 300 C220 250 420 280 640 235 C860 190 1050 260 1260 225 C1350 210 1400 215 1440 210 V400 H0Z" fill="#cbdcb3" opacity="0.75" />
      </svg>
      <svg aria-hidden className="h-land h-mid pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[34%] w-full" viewBox="0 0 1440 360" preserveAspectRatio="none">
        <path d="M0 150 C260 95 520 140 760 110 C1000 80 1220 130 1440 100 V360 H0Z" fill="#b4cf98" opacity="0.55" />
        <path d="M0 230 C300 180 560 220 840 190 C1080 165 1280 200 1440 185 V360 H0Z" fill="#9cc07e" opacity="0.45" />
        <path d="M0 290 C320 262 640 290 960 270 C1180 256 1340 268 1440 262 V360 H0Z" fill="#e9e2cf" />
      </svg>
      <div className="grain -z-10" />

      {/* Floating dust in the sunlight */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {particles.map((p, i) => (
          <span
            key={i}
            className="ambient absolute rounded-full bg-white shadow-[0_0_8px_rgba(255,236,190,0.9)]"
            style={{
              left: p.left,
              bottom: p.bottom,
              width: p.size,
              height: p.size,
              ['--dx' as string]: p.dx,
              ['--o' as string]: 0.8,
              animation: `float-up ${p.duration}s linear ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="container-x grid w-full items-center gap-10 lg:grid-cols-12 lg:gap-6">
        {/* Copy */}
        <div className="h-copy relative z-10 lg:col-span-7">
          <p className="h-eyebrow eyebrow mb-6 flex items-center gap-3 text-forest max-sm:gap-2 max-sm:text-[0.68rem] max-sm:tracking-[0.13em]">
            <span className="h-px w-8 bg-forest/50" /> Fresh cow milk · Electronic City, Bengaluru
          </p>
          <h1 id="hero-title" className="text-[clamp(2.9rem,8.4vw,6.9rem)] font-[340] leading-[0.98] text-ink">
            {/* One copy of the text with real spaces, so crawlers and screen readers read "Pure Milk. A More Beautiful Everyday." */}
            {headline.map((line, li) => (
              <span key={li} className="block">
                {line.map((t, i) => (
                  <Fragment key={i}>
                    <span className="word-mask">
                      <span className={`hw ${t.em ? 'font-[300] italic text-forest' : ''}`}>{t.w}</span>
                    </span>
                    {i < line.length - 1 ? ' ' : li < headline.length - 1 ? <span className="sr-only"> </span> : null}
                  </Fragment>
                ))}
              </span>
            ))}
          </h1>
          <p className="h-sub mt-7 max-w-[34rem] text-[1.075rem] leading-relaxed text-ink-soft sm:text-lg">
            Fresh cow milk in reusable glass bottles, delivered to your door every morning in and around Electronic City, Bengaluru.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href={site.whatsapp} target="_blank" data-cta="hero-sample" className="h-cta w-full sm:w-auto">
              Get Your Free Sample
            </ButtonLink>
            <ButtonLink
              href={appTarget(platform).href}
              data-cta="hero-app"
              target="_blank"
              variant="ghost"
              icon={<Smartphone className="size-5" aria-hidden />}
              className="h-cta w-full !bg-white/85 sm:w-auto"
            >
              {appTarget(platform).label}
            </ButtonLink>
          </div>
          {/* On a solid pill so it stays readable over the green hills behind */}
          <p className="h-cta mt-5 inline-flex max-w-full items-start gap-2.5 rounded-2xl border border-white bg-white/90 px-4 py-2.5 text-[0.92rem] font-medium leading-snug text-ink shadow-[0_10px_28px_-16px_rgba(23,75,53,0.5)]">
            <Gift className="mt-0.5 size-[1.05rem] shrink-0 text-forest" aria-hidden />
            Free 500 ml sample, delivered the next morning · No commitment
          </p>
        </div>

        {/* Visual */}
        <div className="h-visual relative mx-auto w-full max-w-[420px] lg:col-span-5 lg:max-w-none">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[460px] [perspective:1000px] lg:aspect-auto lg:h-[min(80vh,740px)] lg:max-w-[560px]">
            {/* Stone surface */}
            <svg aria-hidden className="h-stone absolute inset-x-[4%] bottom-[2%] h-[20%] w-[92%]" viewBox="0 0 400 110" preserveAspectRatio="none">
              <defs>
                <linearGradient id="stoneTop" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#ddd3c1" />
                  <stop offset="0.6" stopColor="#efe8da" />
                  <stop offset="1" stopColor="#f6f0e4" />
                </linearGradient>
                <linearGradient id="stoneFront" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#cfc3ad" />
                  <stop offset="1" stopColor="#a89a82" />
                </linearGradient>
                <filter id="stoneGrain">
                  <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" />
                  <feColorMatrix values="0 0 0 0 0.3  0 0 0 0 0.27  0 0 0 0 0.22  0 0 0 0.28 0" />
                  <feComposite in2="SourceGraphic" operator="in" />
                </filter>
              </defs>
              <path d="M12 32 V82 Q12 104 200 106 Q388 104 388 82 V32 Z" fill="url(#stoneFront)" />
              <path d="M12 32 V82 Q12 104 200 106 Q388 104 388 82 V32 Z" filter="url(#stoneGrain)" />
              <ellipse cx="200" cy="32" rx="188" ry="26" fill="url(#stoneTop)" />
              <ellipse cx="200" cy="32" rx="188" ry="26" filter="url(#stoneGrain)" opacity="0.7" />
              <path d="M60 14 Q200 2 360 18" stroke="#fff" strokeOpacity="0.8" strokeWidth="1.5" fill="none" />
            </svg>

            {/* Contact shadow + sun-cast shadow (light comes from the right) */}
            <div aria-hidden className="h-shadow absolute bottom-[13.6%] left-1/2 h-[4.5%] w-[34%] -translate-x-[58%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(48,40,26,0.42),rgba(48,40,26,0))]" />
            <div aria-hidden className="h-shadow absolute bottom-[14%] left-[16%] h-[3.5%] w-[36%] -skew-x-[30deg] rounded-[50%] bg-[radial-gradient(closest-side,rgba(48,40,26,0.18),rgba(48,40,26,0))]" />

            {/* Bottle */}
            <div className="h-bottle absolute bottom-[14.6%] left-1/2 h-[85%] -translate-x-1/2">
              <motion.div className="h-full" style={{ rotateY: rotY, rotateX: rotX, x: tx, y: ty }}>
                <MilkBottle priority className="h-full w-auto drop-shadow-[0_30px_40px_rgba(30,40,30,0.2)]" />
              </motion.div>
            </div>

            {/* Milk droplets */}
            <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ x: lx }}>
              {[
                { l: '22%', t: '30%', s: 14, d: 0 },
                { l: '74%', t: '22%', s: 10, d: -2 },
                { l: '79%', t: '66%', s: 16, d: -1 },
                { l: '17%', t: '62%', s: 9, d: -3 },
                { l: '66%', t: '10%', s: 7, d: -1.5 },
              ].map((d, i) => (
                <span key={i} className="h-drop absolute" style={{ left: d.l, top: d.t }}>
                  <svg viewBox="0 0 20 26" width={d.s} height={d.s * 1.3} className="ambient block" style={{ animation: `bob ${5 + i}s ease-in-out ${d.d}s infinite` }}>
                    <defs>
                      <radialGradient id={`drop${i}`} cx="0.35" cy="0.6" r="0.7">
                        <stop offset="0" stopColor="#ffffff" />
                        <stop offset="0.7" stopColor="#f6f2e7" />
                        <stop offset="1" stopColor="#d8cfba" />
                      </radialGradient>
                    </defs>
                    <path d="M10 1 C10 1 19 12 19 17 a9 9 0 0 1 -18 0 C1 12 10 1 10 1Z" fill={`url(#drop${i})`} />
                    <ellipse cx="7" cy="16" rx="2" ry="3" fill="#fff" />
                  </svg>
                </span>
              ))}
            </motion.div>

            {/* Grass tufts in front of the stone */}
            <svg aria-hidden className="h-stone pointer-events-none absolute -bottom-[1%] left-[-4%] h-[12%] w-[30%]" viewBox="0 0 120 50">
              <path d="M10 50 C14 30 12 18 6 6 C18 18 22 32 20 50Z M24 50 C26 34 32 20 44 10 C36 24 34 36 34 50Z M40 50 C40 38 38 28 30 20 C44 28 48 38 48 50Z M54 50 C58 36 66 26 80 22 C70 30 64 40 64 50Z" fill="#6f9a52" opacity="0.85" />
            </svg>
            <svg aria-hidden className="h-stone pointer-events-none absolute -bottom-[1%] right-[-2%] h-[10%] w-[24%]" viewBox="0 0 120 50">
              <path d="M30 50 C34 32 30 20 20 10 C36 20 40 34 40 50Z M50 50 C52 30 60 18 74 8 C64 24 60 36 60 50Z M70 50 C72 40 80 32 96 26 C86 34 80 42 80 50Z" fill="#8ebb70" opacity="0.85" />
            </svg>
          </div>

          {/* Labels: a tidy row under the bottle below xl, floating beside it from xl up (positions keep clear of the glass) */}
          <div className="mt-5 flex flex-wrap justify-center gap-2.5 xl:pointer-events-none xl:absolute xl:inset-0 xl:mt-0 xl:block">
            {labels.map(({ text, Icon, pos }) => (
              <div key={text} className={`h-label xl:absolute ${pos}`}>
                <div
                  className="ambient flex items-center gap-2 whitespace-nowrap rounded-full border border-white bg-white/90 py-2 pl-2 pr-4 text-[0.875rem] font-semibold text-forest shadow-[0_12px_30px_-14px_rgba(23,75,53,0.45)] xl:max-w-[9.5rem] xl:whitespace-normal xl:rounded-2xl xl:leading-tight"
                  style={{ animation: `bob ${6 + text.length / 6}s ease-in-out infinite` }}
                >
                  <span className="flex size-7 items-center justify-center rounded-full bg-leaf/25">
                    <Icon className="size-3.5" strokeWidth={2} aria-hidden />
                  </span>
                  {text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#principles"
        className="h-cue absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.25em] text-forest sm:flex"
      >
        Scroll
        <span className="relative block h-10 w-px overflow-hidden bg-forest/15">
          <span className="ambient absolute inset-x-0 top-0 h-1/2 bg-forest" style={{ animation: 'scroll-cue 2.2s cubic-bezier(.65,0,.35,1) infinite' }} />
        </span>
      </a>
    </section>
  )
}
