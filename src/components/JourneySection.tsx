import { useRef } from 'react'
import { gsap, useGsap } from '../lib/gsap'
import { Picture } from './ui/Picture'

/**
 * Only steps that reflect how MilkyLush actually works: milk is sourced from
 * village milk producers (no owned farm or in-house plant is depicted).
 */
const steps = [
  {
    title: 'Milk sourcing',
    body: 'Fresh milk is collected from milk producers in villages on the city’s outskirts.',
    photo: { name: 'journey-sourcing', widths: [384, 768], width: 768, height: 576 },
    alt: 'A village milk producer pouring fresh milk into a steel can held by a MilkyLush team member, with cows behind them',
    pos: '50% 50%',
  },
  {
    title: 'Careful handling & bottling',
    body: 'The milk is chilled and filled into glass bottles that have been washed and sanitised.',
    photo: { name: 'journey-bottling', widths: [384, 768], width: 768, height: 576 },
    alt: 'A team member in a hairnet and gloves filling clean glass bottles with chilled milk on a bottling line',
    pos: '50% 50%',
  },
  {
    title: 'Delivery preparation',
    body: 'Bottles are sealed with their green caps and packed into insulated bags for the morning route.',
    photo: { name: 'journey-prep', widths: [384, 768], width: 768, height: 576 },
    alt: 'A MilkyLush delivery partner packing a green-capped glass bottle of milk into an insulated delivery bag',
    pos: '50% 50%',
  },
  {
    title: 'Arrival at your doorstep',
    body: 'Our delivery partner brings your milk to your door in the early morning.',
    // Supplied image of a delivery partner handing a bottle to a customer — replace with a real photo if you shoot one.
    photo: { name: 'journey-doorstep', widths: [384, 768], width: 768, height: 576 },
    alt: 'A MilkyLush delivery partner in a green uniform handing a bottle of fresh cow milk to a smiling customer at her front door',
    pos: '60% 50%',
  },
]

export function JourneySection() {
  const root = useRef<HTMLElement>(null)

  useGsap(root, ({ isDesktop, root }) => {
    const q = gsap.utils.selector(root)
    const tl = gsap.timeline({
      scrollTrigger: { trigger: q('.journey-steps')[0], start: 'top 75%', end: 'bottom 60%', scrub: 0.6 },
    })
    // The connecting line draws across (desktop) or down (mobile), lighting each step as it passes.
    tl.fromTo(q('.journey-line'), isDesktop ? { scaleX: 0 } : { scaleY: 0 }, { scaleX: 1, scaleY: 1, ease: 'none', duration: steps.length })
    q('.journey-step').forEach((el, i) => {
      const ring = el.querySelector('.j-ring')
      tl.fromTo(ring, { strokeDashoffset: 126 }, { strokeDashoffset: 0, ease: 'none', duration: 0.8 }, i)
      tl.fromTo(el.querySelector('.j-dot'), { scale: 0 }, { scale: 1, ease: 'back.out(3)', duration: 0.3 }, i + 0.5)
    })
    q('.journey-step').forEach((el) => {
      gsap.from(el.querySelectorAll('.j-media, .j-copy'), {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%' },
      })
    })
  })

  return (
    <section id="journey" ref={root} aria-labelledby="journey-title" className="relative overflow-hidden bg-ivory py-24 sm:py-32">
      <div className="container-x">
        <div className="max-w-3xl">
          <p className="eyebrow text-forest">From village to home</p>
          <h2 id="journey-title" className="mt-4 text-[clamp(2.4rem,5vw,4.4rem)] font-[340] text-ink">
            The short journey of every bottle.
          </h2>
        </div>

        <ol className="journey-steps relative mt-16 grid gap-12 pl-14 lg:mt-20 lg:grid-cols-4 lg:gap-8 lg:pl-0 lg:pt-16">
          {/* Track + animated line */}
          <span aria-hidden className="absolute bottom-0 left-[19px] top-0 w-px bg-forest/12 lg:left-0 lg:right-0 lg:top-[19px] lg:h-px lg:w-auto lg:bg-forest/12" />
          <span aria-hidden className="journey-line absolute bottom-0 left-[19px] top-0 w-px origin-top bg-forest lg:left-0 lg:right-0 lg:top-[19px] lg:h-px lg:w-auto lg:origin-left" />

          {steps.map((s, i) => (
            <li key={s.title} className="journey-step relative">
              <span aria-hidden className="absolute -left-14 top-0 flex size-10 items-center justify-center lg:-top-16 lg:left-0">
                <svg viewBox="0 0 44 44" className="absolute inset-0 size-full -rotate-90">
                  <circle cx="22" cy="22" r="20" fill="#FAF8F1" stroke="#174B35" strokeOpacity="0.15" strokeWidth="1.5" />
                  <circle className="j-ring" cx="22" cy="22" r="20" fill="none" stroke="#174B35" strokeWidth="1.5" strokeDasharray="126" />
                </svg>
                <span className="j-dot relative size-2.5 rounded-full bg-leaf" />
              </span>
              <div className="j-media relative aspect-[4/3] overflow-hidden rounded-3xl bg-beige">
                <Picture
                  {...s.photo}
                  alt={s.alt}
                  sizes="(min-width: 1024px) 24vw, 90vw"
                  className="size-full object-cover transition-transform duration-[1.2s] ease-[var(--ease-silk)] hover:scale-105"
                  style={{ objectPosition: s.pos }}
                />
              </div>
              <div className="j-copy mt-5">
                <p className="text-xs font-bold tracking-[0.2em] text-[#4a7432]">STEP 0{i + 1}</p>
                <h3 className="mt-2 font-serif text-[1.55rem] leading-tight text-ink">{s.title}</h3>
                <p className="mt-2 text-[0.97rem] leading-relaxed text-ink-soft">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
