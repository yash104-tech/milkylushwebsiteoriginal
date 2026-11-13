import { motion } from 'motion/react'
import { House, Leaf, Milk, Recycle } from 'lucide-react'

const items = [
  { Icon: Milk, title: 'Fresh Cow Milk', note: 'Bottled and delivered fresh' },
  { Icon: Leaf, title: 'No Unnecessary Processing', note: 'Kept simple, as milk should be' },
  { Icon: Recycle, title: 'Reusable Glass Bottles', note: 'Returned, cleaned, reused' },
  { Icon: House, title: 'Convenient Doorstep Delivery', note: 'Every morning, at your door' },
]

export function TrustStrip() {
  return (
    <section id="principles" aria-label="Our principles" className="relative border-y border-forest/10 bg-ivory">
      <ul className="container-x grid grid-cols-2 lg:grid-cols-4">
        {items.map(({ Icon, title, note }, i) => (
          <motion.li
            key={title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className={`group flex flex-col gap-3 py-7 sm:flex-row sm:items-center sm:gap-4 sm:py-8 ${
              i % 2 === 1 ? 'pl-4 sm:pl-6' : 'pr-4'
            } ${i > 0 ? 'lg:border-l lg:border-forest/10 lg:pl-8' : ''} ${i % 2 === 1 ? 'border-l border-forest/10 lg:border-l' : ''} ${
              i < 2 ? 'border-b border-forest/10 lg:border-b-0' : ''
            }`}
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-forest/15 text-forest transition-colors duration-500 group-hover:bg-forest group-hover:text-ivory">
              <Icon className="size-5" strokeWidth={1.5} aria-hidden />
            </span>
            <span>
              <span className="block font-serif text-[1.05rem] leading-snug text-ink sm:text-[1.15rem]">{title}</span>
              <span className="mt-0.5 block text-[0.82rem] text-ink-soft">{note}</span>
            </span>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}
