import { motion } from 'motion/react'
import { LoopVideo } from './ui/LoopVideo'

const ease = [0.22, 1, 0.36, 1] as const

/** Home-page band for the village cow video (the clip is portrait, 478×850, so it sits in a tall frame beside the copy). */
export function VillageVideo() {
  return (
    <section id="village" aria-labelledby="village-title" className="relative overflow-hidden bg-sand py-24 sm:py-32">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease }}
          className="mx-auto w-full max-w-[380px] lg:order-2 lg:col-span-5 lg:max-w-[420px] lg:justify-self-center"
        >
          <div className="relative aspect-[9/16] overflow-hidden rounded-[32px] bg-forest-deep shadow-[0_40px_80px_-40px_rgba(23,75,53,0.55)]">
            <LoopVideo
              src="/videos/village-calves.mp4"
              label="Calves and cows in a village in soft morning light"
              className="size-full object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          className="lg:order-1 lg:col-span-7"
        >
          <p className="eyebrow text-forest">From the village</p>
          <h2 id="village-title" className="mt-4 text-[clamp(2.4rem,5.4vw,4.6rem)] font-[340] text-ink">
            Where your milk <em className="font-[300] text-forest">begins.</em>
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
            Your milk is collected from producers in villages on the outskirts of the city, where the animals graze in open fields. Short
            routes mean it reaches you fresh in the early morning, and the people who produce it are paid fairly.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
