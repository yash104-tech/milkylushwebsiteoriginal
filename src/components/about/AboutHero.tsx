import { motion } from 'motion/react'
import { appTarget, usePlatform } from '../../lib/platform'
import { site } from '../../config/site'
import { Smartphone } from 'lucide-react'
import { useLive } from '../../hooks/useLive'
import { gsap, useGsap } from '../../lib/gsap'
import { MilkBottle } from '../MilkBottle'
import { ButtonLink } from '../ui/Button'
import { LoopVideo } from '../ui/LoopVideo'
import { SplitWords } from '../ui/SplitWords'

const ease = [0.22, 1, 0.36, 1] as const

export function AboutHero() {
  const platform = usePlatform()
  const live = useLive<HTMLElement>()
  // Headline words rise out of their masks (skipped automatically for reduced motion).
  useGsap(live, ({ root }) => {
    gsap.from(root.querySelectorAll('.sw'), { yPercent: 110, rotate: 3, duration: 1.1, stagger: 0.08, ease: 'power4.out', delay: 0.15 })
  })
  return (
    <section
      id="top"
      ref={live}
      aria-labelledby="about-title"
      className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#f7f3e6_0%,#faf8f1_100%)] pb-20 pt-32 sm:pt-36 lg:pb-28"
    >
      <div aria-hidden className="pointer-events-none absolute -right-[15%] -top-[25%] -z-10 size-[70vmax] rounded-full bg-[radial-gradient(circle,rgba(255,236,190,0.8),rgba(250,248,241,0)_62%)]" />
      <div className="container-x grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="eyebrow flex items-center gap-3 text-forest"
          >
            <span className="h-px w-8 bg-forest/50" /> About MilkyLush
          </motion.p>
          <h1 id="about-title" className="mt-6 text-[clamp(2.9rem,8vw,6.4rem)] font-[340] leading-[0.98] text-ink">
            <SplitWords text="Our journey" /> <br />
            <em className="font-[300] text-forest"><SplitWords text="to purity." /></em>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease }}
            className="mt-7 max-w-lg text-lg leading-relaxed text-ink-soft"
          >
            From a student idea to a movement against plastic — fresh milk, delivered in glass, to homes across Bangalore.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.65, ease }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <ButtonLink href={appTarget(platform).href} data-cta="about-app" target="_blank" icon={<Smartphone className="size-5" aria-hidden />}>
              {appTarget(platform).label}
            </ButtonLink>
            <ButtonLink href={site.whatsapp} target="_blank" variant="ghost">
              Get a Free Sample
            </ButtonLink>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.3, ease }}
          className="relative mx-auto w-full max-w-[400px] lg:col-span-5 lg:max-w-none"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[28px] bg-beige shadow-[0_40px_80px_-40px_rgba(23,75,53,0.5)]">
            <LoopVideo
              src="/videos/village-calves.mp4"
              label="Close-up of young village calves in soft morning light"
              className="size-full object-cover"
              style={{ objectPosition: '50% 40%' }}
            />
          </div>
          <div className="ambient absolute -bottom-8 -left-4 h-[46%] drop-shadow-[0_24px_24px_rgba(20,40,30,0.3)] sm:-left-10" style={{ animation: 'bob 7s ease-in-out infinite' }}>
            <MilkBottle animatedMilk={false} className="h-full w-auto" title="A MilkyLush glass milk bottle" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
