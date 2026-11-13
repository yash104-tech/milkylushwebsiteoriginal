import { motion } from 'motion/react'
import { founders } from '../../config/site'
import { Picture } from '../ui/Picture'
import { Reveal } from '../ui/Reveal'
import { SplitWords } from '../ui/SplitWords'

const asset = (name: string) => ({ name, widths: [400, 800] as const, width: 800, height: 1000 })

export function FoundersStory() {
  return (
    <section id="founders" aria-labelledby="founders-title" className="relative overflow-hidden bg-ivory py-24 sm:py-32">
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-12">
          <p className="eyebrow text-forest lg:col-span-3 lg:pt-5">The story behind MilkyLush</p>
          <h2 id="founders-title" className="text-[clamp(2.4rem,5.6vw,4.8rem)] font-[340] text-ink lg:col-span-9">
            <SplitWords text="Two friends." wordClass="" /> <br />
            <em className="font-[300] text-forest">One simple idea.</em>
          </h2>
        </div>

        <div className="mt-14 grid items-start gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-14">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:col-span-6">
            {founders.map((f, i) => (
              <motion.figure
                key={f.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 1.1, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
                className={`group ${i === 1 ? 'mt-10 sm:mt-14' : ''}`}
              >
                <motion.div
                  initial={{ clipPath: 'inset(12% 8% 12% 8% round 26px)' }}
                  whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 26px)' }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 1.1, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
                  className="relative aspect-[4/5] overflow-hidden rounded-[26px] bg-beige"
                >
                  <Picture
                    {...asset(f.photo)}
                    alt={f.alt}
                    sizes="(min-width: 1024px) 24vw, 44vw"
                    className="size-full object-cover transition-transform duration-[1.4s] ease-[var(--ease-silk)] group-hover:scale-[1.05]"
                  />
                </motion.div>
                <figcaption className="mt-4">
                  <span className="block font-serif text-[1.35rem] leading-tight text-ink sm:text-[1.6rem]">{f.name}</span>
                  <span className="mt-1 block text-xs font-bold uppercase tracking-[0.18em] text-[#4a7432]">Co-founder</span>
                </figcaption>
              </motion.figure>
            ))}
          </div>

          <div className="space-y-6 text-[1.075rem] leading-relaxed text-ink-soft lg:col-span-6">
            <Reveal>
              <p>
                Yashwanth Kumar J and Gokul Kumar E grew up together as childhood friends, sharing a belief that even small choices can
                make a big impact.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p>
                As young people who cared about health and the environment, they noticed how much plastic had quietly entered everyday
                life — right down to the milk packet on the kitchen counter. They were determined to do something about it in Bangalore,
                the city they call home.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p>
                Instead of building just another dairy brand, they built one that puts purity and community ahead of profit: fresh milk
                from village producers, delivered in reusable glass bottles that come back, get cleaned and go out again. It began as a
                student idea. Today it is MilkyLush.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
