import { MapPin, Phone, Mail } from 'lucide-react'
import { site } from '../../config/site'
import { Reveal } from '../ui/Reveal'
import { ButtonLink } from '../ui/Button'
import { WhatsAppIcon } from '../ui/BrandIcons'

export function JoinMovement() {
  return (
    <section id="join" aria-labelledby="join-title" className="relative overflow-hidden bg-sand py-24 sm:py-32">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <p className="eyebrow text-forest">Join the movement</p>
          <h2 id="join-title" className="mt-4 text-[clamp(2.4rem,5.4vw,4.6rem)] font-[340] text-ink">
            Be part of a <em className="font-[300] text-forest">cleaner tomorrow.</em>
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-soft">
            We’re not just building a brand. We’re building a movement towards a cleaner, healthier and more sustainable tomorrow — and
            you’re invited. Start with a free 500 ml sample.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/#get-started">Get Started</ButtonLink>
            <ButtonLink href={site.whatsapp} target="_blank" variant="ghost" icon={<WhatsAppIcon className="size-5" />}>
              Request a Free Sample
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="lg:col-span-5">
          <address className="space-y-5 rounded-[28px] bg-ivory p-8 not-italic sm:p-10">
            <h3 className="font-serif text-2xl text-ink">Find us</h3>
            <p className="flex gap-3 text-ink-soft">
              <MapPin className="mt-1 size-5 shrink-0 text-forest" aria-hidden /> {site.address}
            </p>
            <p>
              <a href={site.phoneHref} className="inline-flex min-h-11 items-center gap-3 text-ink-soft hover:text-forest">
                <Phone className="size-5 text-forest" aria-hidden /> {site.phoneDisplay}
              </a>
            </p>
            <p>
              <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center gap-3 break-all text-ink-soft hover:text-forest">
                <Mail className="size-5 shrink-0 text-forest" aria-hidden /> {site.email}
              </a>
            </p>
          </address>
        </Reveal>
      </div>
    </section>
  )
}
