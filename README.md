# MilkyLush — Landing Page

The animated landing page for MilkyLush ("Flavour of Purity"), a fresh cow milk delivery service in Bangalore.

**Stack:** React 19 · Vite · TypeScript · Tailwind CSS v4 · GSAP + ScrollTrigger · Motion for React · Lenis · Lucide

```bash
npm install
npm run dev               # http://localhost:5173
npm run build             # production build in dist/
npm run images            # re-crop/re-encode photos from _source-assets/ → public/images
npm run meta-assets       # rebuild the 1200×630 share image and app icons
```

## Before launch: things to set up or confirm

The full audit, test results and launch checklist are in [LAUNCH-AUDIT.md](LAUNCH-AUDIT.md).

| # | Item | Where |
|---|------|-------|
| 1 | **Domain.** This site replaces the old site at `https://milkylush.com` (apex; `www` 301-redirects to it). Point the domain at this Netlify site. | `netlify.toml`, every page's `<head>`, `public/sitemap.xml` |
| 2 | **Old pages.** The old `Aboutus.html`, `privacy.html`, `shop.html`, `contact.html`, `trial.html` and `blog.html` 301-redirect to their closest section here. The two blog articles were not migrated: add them as pages if they bring in visitors. | `netlify.toml` → `[[redirects]]` |
| 3 | **FSSAI licence number.** Must be shown by food businesses selling online. Add it and it appears in the footer. | `src/config/site.ts` → `fssaiLicense` |
| 4 | **Facts to confirm:** 7:30 AM delivery, free sample "delivered the next morning", 5 km delivery radius, 30–40 reuses per bottle, "within hours of milking", and the curd tub claims (live cultures, no preservatives). | `src/config/site.ts`, `src/components/HeroSection.tsx` |
| 5 | **Bottle return steps.** The FAQ answer is a reasonable draft. Confirm it with the delivery team. | `src/config/site.ts` → `faqs` (`bottle-return`) |
| 6 | **Testimonial consent.** Both quotes are real and published on milkylush.com. Confirm the customers are happy for them to be reused. | `src/config/site.ts` → `testimonials` |
| 7 | **Legal copy.** `/privacy/` and `/terms/` are drafts written for this site. Have a lawyer review them (entity name, refunds, payments, grievance contact). | `src/config/legal.ts` |
| 8 | **Play Store link.** Currently a Play Store *search* for "milkylush". Swap in the direct listing URL. | `src/config/site.ts` → `app.androidUrl` |

## Assets that need replacing

| Asset | Currently | Replace with |
|-------|-----------|--------------|
| Milk bottle (hero, product panel, bottle-return loop, subscription, About, comparison) and the milk card in the shop row | The real 1 litre product photo (`_source-assets/product-1l-photo.webp`), cut out by `scripts/cut-hero-bottle.mjs` into `public/images/hero-bottle.*`. Its label shows "No hormones", "No added preservatives" and "Natural 100% product" claims — confirm they are true before launch | Re-run the script after replacing the source photo. The older 500 ml cut-out is kept in `_source-assets/generated/` for the doorstep and pouring composites |
| Wordmark | A typographic recreation (`src/components/ui/Logo.tsx`) | The official SVG logo (the supplied logo is a PNG on white) |
| Photography | Supplied images from milkylush.com, cropped to remove baked-in text | Higher-resolution originals without text overlays. Some are under 1024 px wide and are reused across sections |

| Product hover images (`hover-*`) | **AI-generated** lifestyle shots made with Figma AI (`_source-assets/generated/`) | Real photos of each product in use |
| Milk card photo (`card-milk`) | **AI-generated** studio shot of a bottle labelled "MILKY LUSH" | A real studio photo of the bottle |


## Product hover swap and Instagram reels

Both patterns are modelled on doodhvalefarms.com.

**Product hover swap** (`src/components/ui/SwapMedia.tsx`)
- Used on the signature-product panels and on the new "Shop our bestsellers" row (`ShopRange.tsx`).
- On hover or keyboard focus, the product shot fades out and a lifestyle image fades in from a slight zoom.
- In the shop row, a "View in shop" button also slides up.
- On touch screens a small tap button toggles between the two images.
- Products live in `range` in `site.ts`.

**Instagram reels** (`InstagramReels.tsx`)
- Vertical 9:16 story cards with a story ring, a play button, the reel title and a "Featured" product tag.
- On hover, the card lifts, the cover zooms and the other cards dim.
- Clicking opens a full-screen story viewer that embeds the real reel from Instagram. It has progress segments, prev/next (also ← / →), Esc to close and an "Open on Instagram" link.
- Reels live in `reels` in `site.ts`. Each card can use a muted preview clip that plays on hover (the `preview` field). None are included yet.

## About page (`/about/`)

A second page, built as its own Vite entry (`about/index.html` → `src/about.tsx`) and sharing the Navbar and Footer. The `home` prop makes section links point back to `/#…`. Sections: hero, who we are, what makes us different, the founders' story, mission and vision, values and a join-the-movement call to action.
- The content is in `about` and `founders` in `src/config/site.ts`.
- The founders appear only here. The landing page links to this page from the nav and footer.
- Deliberately left out: "tons of plastic prevented" and "thousands of families", because no figures are published. VERIFY the reuse figure (30–40×) and the 7:30 AM delivery time.
- Non-founder team members have initials instead of photos until you supply photos.
- On static hosting, make sure `/about/` serves `about/index.html`. Most hosts do this by default.

## What the page is for

This is a landing page with two goals: **claim the free sample** and **download the app**. The structure follows from that:
- Order: hero → trust strip → **free-sample flow** (location check + WhatsApp) → products → **app section** → shop row → proof (journey, comparison, reels, stories) → **final sample + app band** → FAQ.
- Both goals appear in the hero, the navigation (desktop "Get the App" + "Free Sample"), the free-sample section, the app section, the product panels, the final band and, on phones, a **sticky bottom bar**.
- Product buttons no longer lead to the external shop: milk is "Claim Your Free Sample", other products order through the app (Android) or WhatsApp (everyone else). The web shop is only in the footer.
- **Click tracking:** every goal button has a `data-cta` name (`hero-sample`, `hero-app`, `sticky-app`, `final-sample`, …). Clicks push `{ event: 'cta_click', cta, page }` to `window.dataLayer`, so Google Tag Manager or GA4 can count sample and app clicks once you add a tag (`src/lib/track.ts`). Nothing is sent anywhere until you do.

## Order and app routing (by device)

Every "buy / order" and "Download the App" button picks its destination from the visitor's device (`src/lib/platform.ts`). On iPhone the app button reads "Order on WhatsApp", because there is no iPhone app:
- **Android** → the MilkyLush app on Google Play. The buttons read "Order in the app".
- **iPhone / iPad** → WhatsApp, with the order message prefilled ("Order on WhatsApp").
- **Desktop and everything else** → WhatsApp (and "Download the App" opens WhatsApp until the Play link is set).

Set the Google Play link in `site.app.androidUrl` in `src/config/site.ts` (and `iosUrl` if an iOS app ever exists). Until the Play link is set, Android falls back to WhatsApp so nothing is a dead end.

## Architecture

```
src/
  config/site.ts          ← all brand facts, links, products, FAQs, testimonials (edit here)
  lib/gsap.ts             ← GSAP + ScrollTrigger, useGsap() (auto-disabled for reduced motion)
  lib/smooth-scroll.ts    ← Lenis (desktop only) + anchor links with history & focus management
  components/             ← Navbar, HeroSection, TrustStrip, ProductShowcase,
                            BottleReturnSection, JourneySection, WhyMilkyLush, Testimonials,
                            GetStarted, SubscriptionCTA, FAQ, Footer, WhatsAppFloatingButton,
                            Preloader, ScrollProgress, MilkBottle, ui/*
```

**Animation split:** GSAP handles scroll-driven storytelling (the hero timeline and parallax, the pinned horizontal product gallery, the bottle-loop progress, the journey line). Motion handles component-level animation (nav, mobile menu, accordion, carousel, icon drawing).

**Accessibility:**
- `prefers-reduced-motion` turns off every GSAP timeline (through `gsap.matchMedia`), the preloader, Lenis and the CSS loops.
- Ambient loops pause when they are off-screen.
- The page has a skip link, a focus-trapped mobile menu and a keyboard-operable accordion and carousel.
- Focus states are visible, and in-page links update history and move focus to their target.
- Headings follow a proper hierarchy.

## Facts used (from milkylush.com, Oct 2026)

- Contact: phone/WhatsApp +91 99028 82332, email milkylushorganic@gmail.com.
- Address: Off Hosur Road, Near Electronic City, Bengaluru 560100.
- Socials: Instagram, Facebook and YouTube.
- Sourcing: milk comes from village producers on the city's outskirts. No owned farm or in-house plant is depicted.
- Free 500 ml trial is arranged over WhatsApp.
- Bottles are washed with hot water and sanitised.
- Customers are advised to boil the milk before drinking.

No prices, certifications, awards, health claims or ratings are shown.
