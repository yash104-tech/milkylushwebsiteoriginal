import { motion } from 'motion/react'
import { comparison } from '../config/site'
import { Picture } from './ui/Picture'

const ease = [0.22, 1, 0.36, 1] as const

const photos = {
  packet: { name: 'malai-packet', alt: 'A pouch of toned packet milk beside a glass bowl of boiled milk with a thin malai layer, zoomed in on the cream' },
  lush: { name: 'malai-lush', alt: 'A MilkyLush bottle of fresh cow milk beside a glass bowl of boiled milk with a thick malai layer, zoomed in on the cream' },
} as const

export function MalaiIllustration() {
  const { malai } = comparison
  return (
    <figure className="mx-auto mt-16 max-w-6xl rounded-[28px] border border-forest/10 bg-sand/70 p-6 sm:p-10 lg:mt-24">
      <div className="mx-auto max-w-2xl text-center">
        <h3 className="font-serif text-[clamp(1.8rem,3.4vw,2.6rem)] leading-tight text-ink">{malai.title}</h3>
        <p className="mt-3 text-ink-soft">{malai.intro}</p>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-6">
        {([
          ['packet', malai.packet],
          ['lush', malai.lush],
        ] as const).map(([tone, item], i) => (
          <motion.div
            key={tone}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9, delay: i * 0.12, ease }}
            className="flex flex-col overflow-hidden rounded-3xl bg-ivory text-center"
          >
            <Picture
              name={photos[tone].name}
              widths={[640, 1024, 1536]}
              width={1536}
              height={1024}
              alt={photos[tone].alt}
              sizes="(min-width: 1152px) 540px, (min-width: 768px) 45vw, 100vw"
              className="aspect-[3/2] w-full object-cover"
            />
            <div className="p-6 sm:p-8">
              <p className="font-serif text-xl text-ink">{item.label}</p>
              <p className="mx-auto mt-2 max-w-sm text-[0.95rem] leading-relaxed text-ink-soft">{item.body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </figure>
  )
}
