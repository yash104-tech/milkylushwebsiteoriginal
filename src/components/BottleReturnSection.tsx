import { useRef, useState } from 'react'
import { gsap, useGsap } from '../lib/gsap'
import { MilkBottle } from './MilkBottle'
import { ButtonLink } from './ui/Button'

const steps = [
  { key: 'Delivery', text: 'Your milk arrives in a clean glass bottle, early in the morning.' },
  { key: 'Enjoy', text: 'Pour, boil and enjoy it with your household through the day.' },
  { key: 'Return', text: 'Rinse the empty bottle and keep it ready for your next delivery.' },
  { key: 'Reuse', text: 'We wash it with hot water and sanitise it, ready to be filled again.' },
]

const C = 200
const R = 150
const point = (deg: number) => {
  const a = (deg * Math.PI) / 180
  return { x: C + R * Math.cos(a), y: C + R * Math.sin(a) }
}
const nodeAngles = [-90, 0, 90, 180]

export function BottleReturnSection() {
  const root = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)

  useGsap(root, ({ root }) => {
    const q = gsap.utils.selector(root)
    const ring = q('.loop-ring')[0] as unknown as SVGCircleElement
    const len = 2 * Math.PI * R
    const dot = q('.loop-dot')[0]
    const bottle = q('.loop-bottle')[0]
    const state = { p: 0 }
    gsap.set(ring, { strokeDasharray: len, strokeDashoffset: len })
    gsap.set(q('.loop-sketch'), { strokeDasharray: 400, strokeDashoffset: 400 })

    gsap.to(q('.loop-sketch'), {
      strokeDashoffset: 0,
      duration: 2.2,
      stagger: 0.15,
      ease: 'power2.inOut',
      scrollTrigger: { trigger: root, start: 'top 70%' },
    })

    gsap.to(state, {
      p: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: q('.loop-stage')[0],
        start: 'top 75%',
        end: 'bottom 25%',
        scrub: 0.7,
      },
      onUpdate: () => {
        const p = state.p
        gsap.set(ring, { strokeDashoffset: len * (1 - p) })
        const { x, y } = point(-90 + p * 360)
        gsap.set(dot, { attr: { cx: x, cy: y } })
        gsap.set(bottle, { rotate: -10 + p * 20 })
        setActive(Math.min(3, Math.floor(p * 4 + 0.02)))
      },
    })
  })

  return (
    <section id="bottle-return" ref={root} aria-labelledby="bottle-title" className="relative overflow-hidden bg-sand py-24 sm:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <p className="eyebrow text-forest">The reusable glass bottle</p>
          <h2 id="bottle-title" className="mt-4 text-[clamp(2.4rem,5vw,4.4rem)] font-[340] text-ink">
            A Bottle Worth <em className="font-[300] text-forest">Bringing Back.</em>
          </h2>
          <p className="mt-6 max-w-md text-[1.075rem] leading-relaxed text-ink-soft">
            We use reusable glass bottles to help reduce dependence on disposable packaging. Enjoy your milk, return your
            bottle, and let it be used again.
          </p>

          <ol className="mt-10 flex flex-col gap-1" aria-label="Bottle return cycle">
            {steps.map((s, i) => (
              <li key={s.key}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-current={active === i ? 'step' : undefined}
                  className={`flex w-full cursor-pointer items-start gap-4 rounded-2xl px-4 py-3 text-left transition-colors duration-300 ${
                    active === i ? 'bg-white/80 shadow-[0_10px_30px_-20px_rgba(23,75,53,0.6)]' : 'hover:bg-white/40'
                  }`}
                >
                  <span
                    className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-colors duration-300 ${
                      active === i ? 'border-forest bg-forest text-ivory' : 'border-forest/25 text-forest'
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span>
                    <span className="block font-serif text-xl text-ink">{s.key}</span>
                    {/* CSS-only expand (grid rows 0fr → 1fr): no JS height measuring, which would interrupt smooth scrolling */}
                    <span
                      className={`grid text-[0.95rem] text-ink-soft transition-[grid-template-rows,opacity] duration-400 ease-[var(--ease-silk)] ${
                        active === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                      aria-hidden={active !== i}
                    >
                      <span className="block overflow-hidden">
                        <span className="block pt-1">{s.text}</span>
                      </span>
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ol>

          <ButtonLink href="#faq-bottle-return" variant="ghost" className="mt-10">
            Discover Our Bottle Return Process
          </ButtonLink>
        </div>

        <div className="loop-stage relative mx-auto w-full max-w-[520px] lg:col-span-6 lg:col-start-7">
          <svg viewBox="-40 -6 480 412" className="block h-auto w-full overflow-visible" role="img" aria-label="A circular journey: delivery, enjoy, return, reuse">
            {/* Botanical line drawings */}
            <g fill="none" stroke="#8EBB70" strokeWidth="1.3" strokeLinecap="round">
              <path className="loop-sketch" d="M24 360 C40 320 70 300 96 296 M52 330 c-8 -14 -4 -26 6 -32 M70 314 c4 -14 16 -20 26 -18" />
              <path className="loop-sketch" d="M378 46 C356 78 330 92 302 96 M352 70 c10 12 8 26 -2 32 M330 86 c-6 12 -18 16 -28 12" />
            </g>
            <circle cx={C} cy={C} r={R} fill="none" stroke="#174B35" strokeOpacity="0.12" strokeWidth="1.5" strokeDasharray="2 6" />
            <circle
              className="loop-ring"
              cx={C}
              cy={C}
              r={R}
              fill="none"
              stroke="#174B35"
              strokeWidth="2"
              strokeLinecap="round"
              transform={`rotate(-90 ${C} ${C})`}
            />
            {nodeAngles.map((deg, i) => {
              const { x, y } = point(deg)
              const on = active >= i
              const lx = deg === 0 ? x + 18 : deg === 180 ? x - 18 : x
              const ly = deg === -90 ? y - 20 : deg === 90 ? y + 30 : y + 5
              const anchor = deg === 0 ? 'start' : deg === 180 ? 'end' : 'middle'
              return (
                <g key={deg}>
                  <circle cx={x} cy={y} r="11" fill={on ? '#174B35' : '#FAF8F1'} stroke="#174B35" strokeWidth="1.5" style={{ transition: 'fill .4s' }} />
                  <text x={x} y={y + 4} textAnchor="middle" fontSize="10" fontWeight="700" fill={on ? '#FAF8F1' : '#174B35'} fontFamily="Manrope">
                    {i + 1}
                  </text>
                  <text x={lx} y={ly} textAnchor={anchor} fontSize="17" fill="#202720" fontFamily="Fraunces, serif">
                    {steps[i].key}
                  </text>
                </g>
              )
            })}
            <circle className="loop-dot" cx={C} cy={C - R} r="7" fill="#8EBB70" stroke="#fff" strokeWidth="3" />
          </svg>
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="absolute size-[38%] rounded-full bg-[radial-gradient(circle,rgba(142,187,112,0.35),rgba(142,187,112,0))]" />
            <div className="loop-bottle h-[44%]">
              <MilkBottle animatedMilk={false} className="h-full w-auto" title="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
