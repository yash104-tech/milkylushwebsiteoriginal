import { motion } from 'motion/react'
import { CalendarClock, Smartphone, Sunrise, MessageCircle } from 'lucide-react'
import { appTarget, usePlatform } from '../lib/platform'
import { site } from '../config/site'
import { ButtonLink } from './ui/Button'
import { Picture } from './ui/Picture'
import { Reveal } from './ui/Reveal'

const points = [
  { Icon: CalendarClock, text: 'Pause, resume or change your quantity whenever you need to.' },
  { Icon: Sunrise, text: 'Fresh milk at your door every morning, with our 7:30 AM delivery promise.' },
  { Icon: MessageCircle, text: 'Prefer to chat? Everything works on WhatsApp too.' },
]

/** The app pitch: one clear job — get the visitor to download it (or, on iPhone, to order on WhatsApp). */
export function AppSection() {
  const platform = usePlatform()
  const app = appTarget(platform)
  return (
    <section id="app" aria-labelledby="app-title" className="relative overflow-hidden bg-sand py-24 sm:py-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <p className="eyebrow text-forest">The MilkyLush app</p>
          <h2 id="app-title" className="mt-4 text-[clamp(2.3rem,4.8vw,4.2rem)] font-[340] text-ink">
            Your morning milk, <em className="font-[300] text-forest">in your pocket.</em>
          </h2>
          <p className="mt-5 max-w-lg text-[1.075rem] leading-relaxed text-ink-soft">
            Order milk, ghee and more, and manage your daily delivery in a few taps.
          </p>
          <ul className="mt-8 flex flex-col gap-4">
            {points.map(({ Icon, text }) => (
              <li key={text} className="flex items-start gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-forest text-ivory">
                  <Icon className="size-[1.15rem]" strokeWidth={1.7} aria-hidden />
                </span>
                <span className="pt-1.5 text-[1rem] leading-snug text-ink">{text}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href={app.href} target="_blank" data-cta="app-section-app" icon={<Smartphone className="size-5" aria-hidden />}>
              {app.label}
            </ButtonLink>
            <ButtonLink href={site.whatsapp} target="_blank" variant="ghost" data-cta="app-section-sample">
              Claim a Free Sample
            </ButtonLink>
          </div>
        </Reveal>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:col-span-6"
        >
          {/* Only the photo is clipped by the reveal, so the badge below it is never cut off */}
          <motion.div
            initial={{ clipPath: 'inset(8% 6% 8% 6% round 28px)' }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 28px)' }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto aspect-[4/5] max-w-[30rem] overflow-hidden rounded-[28px] bg-beige shadow-[0_40px_80px_-40px_rgba(23,75,53,0.5)]"
          >
            <Picture
              name="app-doorstep"
              widths={[640, 1024]}
              width={1024}
              height={1280}
              alt="A MilkyLush glass bottle of fresh cow milk and a jar of pure cow ghee on a doorstep"
              sizes="(min-width: 1024px) 30rem, 100vw"
              className="size-full object-cover"
            />
          </motion.div>
          <div className="absolute -bottom-5 left-5 flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-forest shadow-[0_14px_30px_-14px_rgba(23,75,53,0.5)] sm:left-8">
            <Sunrise className="size-4 text-leaf" aria-hidden /> Delivered every morning
          </div>
        </motion.div>
      </div>
    </section>
  )
}
