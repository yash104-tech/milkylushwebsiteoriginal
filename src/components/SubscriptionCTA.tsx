import { Gift, Smartphone } from 'lucide-react'
import { appTarget, usePlatform } from '../lib/platform'
import { useRef } from 'react'
import { site } from '../config/site'
import { gsap, useGsap } from '../lib/gsap'
import { useLive } from '../hooks/useLive'
import { MilkBottle } from './MilkBottle'
import { ButtonLink } from './ui/Button'
import { WhatsAppIcon } from './ui/BrandIcons'

export function SubscriptionCTA() {
  const platform = usePlatform()
  const live = useLive<HTMLElement>()
  const scope = useRef<HTMLElement | null>(null)

  useGsap(scope, ({ root }) => {
    const q = gsap.utils.selector(root)
    const st = { trigger: root, start: 'top bottom', end: 'bottom top', scrub: true }
    gsap.fromTo(q('.cta-bg'), { yPercent: -12 }, { yPercent: 12, ease: 'none', scrollTrigger: st })
    gsap.fromTo(q('.cta-bottle'), { y: 60, rotate: -6 }, { y: -40, rotate: 4, ease: 'none', scrollTrigger: st })
    gsap.from(q('.cta-copy > *'), {
      y: 36,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: root, start: 'top 70%' },
    })
  })

  return (
    <section
      id="subscribe"
      ref={(el) => {
        live.current = el
        scope.current = el
      }}
      aria-labelledby="sub-title"
      className="on-dark relative isolate overflow-hidden bg-forest py-24 text-cream sm:py-32"
    >
      {/* Parallax botanical backdrop */}
      <svg aria-hidden className="cta-bg absolute inset-x-0 -top-[15%] -z-10 h-[130%] w-full opacity-[0.14]" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <g fill="none" stroke="#8EBB70" strokeWidth="1.2">
          <path d="M-40 760 C200 600 420 640 640 520 S1040 300 1480 360" />
          <path d="M-40 820 C240 680 460 720 700 600 S1100 400 1480 450" />
          <path d="M120 900 C140 760 220 680 320 640 M220 720 c-30 -40 -20 -90 20 -110 M300 660 c10 -50 50 -70 90 -60" />
          <path d="M1240 120 C1200 220 1120 280 1020 300 M1160 220 c40 30 40 80 10 110 M1080 270 c-20 40 -60 50 -100 40" />
        </g>
      </svg>

      <div className="container-x grid items-center gap-14 lg:grid-cols-12">
        <div className="cta-copy lg:col-span-7">
          <p className="eyebrow text-leaf">Daily delivery</p>
          <h2 id="sub-title" className="mt-4 text-[clamp(2.6rem,6vw,5.2rem)] font-[320] text-cream">
            Make Purity Part of Your <em className="font-[300] text-leaf">Routine.</em>
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-cream/80">
            Claim a free 500 ml bottle at your door, then pause, resume or change your daily milk from the app.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={site.whatsapp} target="_blank" variant="light" data-cta="final-sample" icon={<Gift className="size-5" aria-hidden />}>
              Get Your Free Sample
            </ButtonLink>
            <ButtonLink href={appTarget(platform).href} target="_blank" variant="outline-light" data-cta="final-app" icon={<Smartphone className="size-5 text-leaf" aria-hidden />}>
              {appTarget(platform).label}
            </ButtonLink>
          </div>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="final-whatsapp"
            className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-cream/80 underline-offset-4 hover:text-leaf hover:underline"
          >
            <WhatsAppIcon className="size-4 text-leaf" /> or chat with us on WhatsApp
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>

        <div className="relative mx-auto flex h-[420px] w-full max-w-[360px] items-end justify-center sm:h-[520px] lg:col-span-5">
          <div
            aria-hidden
            className="ambient absolute left-1/2 top-1/2 size-[110%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(142,187,112,0.55)_0%,rgba(142,187,112,0.15)_40%,rgba(23,75,53,0)_68%)]"
            style={{ animation: 'glow-pulse 7s ease-in-out infinite' }}
          />
          <div aria-hidden className="absolute bottom-[4%] h-6 w-[46%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(0,0,0,0.45),rgba(0,0,0,0))]" />
          <div className="cta-bottle relative h-[92%]">
            <MilkBottle className="h-full w-auto" title="A MilkyLush glass milk bottle glowing softly" />
          </div>
        </div>
      </div>
    </section>
  )
}
