import { motion } from 'motion/react'
import { Smartphone } from 'lucide-react'
import { site } from '../config/site'
import { appTarget, usePlatform } from '../lib/platform'
import { ButtonLink } from './ui/Button'
import { WhatsAppIcon } from './ui/BrandIcons'

const steps = [
  { n: '01', title: 'Message Us Your Address', body: 'Send your full address on WhatsApp and we’ll confirm we deliver to you.' },
  { n: '02', title: 'Request a Free Sample', body: 'Message us on WhatsApp and we’ll arrange a 500 ml trial bottle.' },
  { n: '03', title: 'Experience MilkyLush at Home', body: 'Taste it with your family, then choose a plan if you love it.' },
]

export function GetStarted() {
  const platform = usePlatform()

  return (
    <section id="get-started" aria-labelledby="start-title" className="relative overflow-hidden bg-ivory py-24 sm:py-32">
      <div className="container-x">
        <div className="max-w-3xl">
          <p className="eyebrow text-forest">How to get started</p>
          <h2 id="start-title" className="mt-4 text-[clamp(2.4rem,5vw,4.4rem)] font-[340] text-ink">
            Three steps to your first bottle.
          </h2>
        </div>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-[28px] border border-forest/10 bg-forest/10 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="bg-ivory p-7 sm:p-9"
            >
              <span className="font-serif text-5xl font-[300] text-leaf">{s.n}</span>
              <h3 className="mt-6 font-serif text-2xl text-ink">{s.title}</h3>
              <p className="mt-2 text-ink-soft">{s.body}</p>
            </motion.li>
          ))}
        </ol>

        <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <ButtonLink href={site.whatsapp} target="_blank" variant="primary" data-cta="checker-sample-whatsapp" icon={<WhatsAppIcon className="size-5" />}>
            Request a Free Sample on WhatsApp
          </ButtonLink>
          <ButtonLink href={appTarget(platform).href} target="_blank" variant="ghost" data-cta="checker-app" icon={<Smartphone className="size-5" aria-hidden />}>
            {appTarget(platform).label}
          </ButtonLink>
          <span className="text-sm text-ink-soft sm:ml-2">Or call {site.phoneDisplay}</span>
        </div>
      </div>
    </section>
  )
}
