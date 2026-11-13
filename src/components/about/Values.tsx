import { motion } from 'motion/react'
import { Eye, Handshake, Leaf, Recycle } from 'lucide-react'
import { about } from '../../config/site'
import { Reveal } from '../ui/Reveal'

const icons = { leaf: Leaf, eye: Eye, recycle: Recycle, handshake: Handshake }

export function Values() {
  return (
    <section id="values" aria-labelledby="values-title" className="relative bg-sand py-24 sm:py-32">
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-forest">Our core values</p>
          <h2 id="values-title" className="mt-4 text-[clamp(2.3rem,4.8vw,4rem)] font-[340] text-ink">
            What we won’t <em className="font-[300] text-forest">compromise on.</em>
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {about.values.map((v, i) => {
            const Icon = icons[v.icon]
            return (
              <motion.li
                key={v.title}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-[24px] bg-ivory p-7 transition-[transform,box-shadow] duration-500 ease-[var(--ease-silk)] hover:-translate-y-1.5 hover:shadow-[0_30px_50px_-30px_rgba(23,75,53,0.5)]"
              >
                <span className="flex size-12 items-center justify-center rounded-full bg-forest text-ivory transition-transform duration-500 group-hover:rotate-[-8deg]">
                  <Icon className="size-5" strokeWidth={1.6} aria-hidden />
                </span>
                <h3 className="mt-8 font-serif text-[1.5rem] leading-tight text-ink">{v.title}</h3>
                <p className="mt-3 text-[0.97rem] leading-relaxed text-ink-soft">{v.body}</p>
                <span aria-hidden className="absolute inset-x-7 bottom-0 h-0.5 origin-left scale-x-0 bg-leaf transition-transform duration-700 ease-[var(--ease-silk)] group-hover:scale-x-100" />
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
