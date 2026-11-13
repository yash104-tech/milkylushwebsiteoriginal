/**
 * Single source of truth for brand facts, links and copy that may change.
 * Everything here was taken from milkylush.com (Oct 2026) or the project brief.
 * Items marked VERIFY should be confirmed by the MilkyLush team before launch.
 */

const WHATSAPP_NUMBER = '919902882332'
const WHATSAPP_MESSAGE = "Hi MilkyLush! I'd like to check delivery availability and request a free milk sample."

export const whatsappLink = (message = WHATSAPP_MESSAGE) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

export const site = {
  name: 'MilkyLush',
  tagline: 'Flavour of Purity',
  url: 'https://milkylush.com',
  displayUrl: 'milkylush.com',
  phoneDisplay: '+91 99028 82332',
  phoneHref: 'tel:+919902882332',
  email: 'milkylushorganic@gmail.com',
  address: 'Off Hosur Road, Near Electronic City, Bengaluru 560100',
  whatsapp: whatsappLink(),
  /**
   * FSSAI licence / registration number. Food businesses selling online must display it.
   * REQUIRED BEFORE LAUNCH: add the 14-digit number here and it appears in the footer. Left empty, nothing is shown.
   */
  fssaiLicense: '' as string,
  /**
   * The MilkyLush app. milkylush.com mentions "our App" but publishes no store link, so both are empty for now.
   * Fill these in and the site routes automatically:
   *   Android → androidUrl (Google Play listing), iPhone → WhatsApp (iosUrl, if an iOS app ever exists).
   * While empty, the "Download the App" and order buttons open WhatsApp so they never lead nowhere.
   */
  app: {
    androidUrl: 'https://play.google.com/store/search?q=milkylush&c=apps' as string, // swap for the direct listing (…/store/apps/details?id=<package>) when known
    iosUrl: '' as string, // e.g. https://apps.apple.com/app/id1234567890
  },
  /**
   * This site replaces the old milkylush.com pages. Shop and contact are sections of the landing page;
   * the old shop.html, contact.html, blog.html, trial.html and Aboutus.html URLs 301-redirect here (netlify.toml).
   */
  pages: {
    shop: '#shop',
    contact: '#contact',
    /** Both are pages of this site (see privacy/ and terms/, copy in config/legal.ts). */
    privacy: '/privacy/',
    terms: '/terms/',
  },
  socials: [
    { name: 'Instagram', href: 'https://www.instagram.com/milkylush_organic' },
    { name: 'Facebook', href: 'https://www.facebook.com/share/1G6nBxd3vt/' },
    { name: 'YouTube', href: 'https://youtube.com/@milkylush' },
  ],
} as const

export const navLinks = [
  { label: 'Home', href: '#top' },
  { label: 'Products', href: '#shop' },
  { label: 'Glass Bottles', href: '#bottle-return' },
  { label: 'About Us', href: '#about' },
  { label: 'Journey', href: '#journey' },
  { label: 'FAQ', href: '#faq' },
] as const

export type Product = {
  id: string
  name: string
  eyebrow: string
  description: string
  details: string[]
  image: { name: string; widths: number[]; width: number; height: number; alt: string } | 'bottle'
  /** Second image revealed on hover (4:5 card asset, see scripts/optimize-images.mjs). */
  hoverImage: { name: string; alt: string; position?: string }
  cta: string
  href: string
  /** Availability as listed on milkylush.com — update when it changes. */
  status?: string
  tone: string
}

export const products: Product[] = [
  {
    id: 'milk',
    name: 'Fresh Cow Milk',
    eyebrow: '01 — The signature',
    description:
      'Fresh cow milk in our branded reusable glass bottle with its clear green cap. Chilled, bottled and brought to your door in the morning.',
    details: ['500 ml & 1 L glass bottles', 'Reusable bottle, returned & cleaned', 'Boil before drinking'],
    image: 'bottle',
    hoverImage: {
      name: 'hover-milk',
      alt: 'A MilkyLush glass bottle of fresh cow milk on a kitchen table beside a glass of milk and a breakfast bowl',
      position: '50% 20%', // keeps the cap and label in view in the wider product frame
    },
    cta: 'Explore Milk',
    href: site.pages.shop,
    tone: '#F4F1E6',
  },
  {
    id: 'ghee',
    name: 'Pure Ghee',
    eyebrow: '02 — Golden & slow',
    description:
      'Rich golden ghee in a glass jar — the kind of jar that lives beside the stove and makes everyday cooking a little more special.',
    details: ['250 ml & 500 ml glass jars', 'Glass packaging'],
    image: {
      name: 'ghee',
      widths: [640, 1024],
      width: 1024,
      height: 1024,
      alt: 'A glass jar of MilkyLush Pure Cow Ghee, 500 g, with a green and cream label',
    },
    hoverImage: { name: 'hover-ghee', alt: 'Golden ghee being spooned over a crisp dosa, with a jar of MilkyLush Pure Cow Ghee beside the plate' },
    cta: 'Explore Ghee',
    href: site.pages.shop,
    tone: '#EFE3C4',
  },
  {
    id: 'curd',
    name: 'Traditional Curd',
    eyebrow: '03 — Homestyle',
    description:
      'Thick, creamy, homestyle curd made the traditional way, with live cultures and no preservatives — the way it has been set in Indian kitchens for generations.',
    details: ['Live cultures', 'No preservatives', '500 ml'],
    image: {
      name: 'curd',
      widths: [640, 1024],
      width: 1024,
      height: 1024,
      alt: 'A tub of MilkyLush Traditional Curd beside a terracotta bowl of thick white curd',
    },
    hoverImage: { name: 'hover-curd', alt: 'A wooden spoon scooping thick curd from an earthen pot' },
    cta: 'Explore Curd',
    href: site.pages.shop,
    status: 'Coming soon',
    tone: '#E8DDC9',
  },
  {
    id: 'coconut-oil',
    name: 'Wood Pressed Coconut Oil',
    eyebrow: '04 — Cold & slow',
    description: 'Coconut oil pressed the slow, traditional way and bottled in glass — for cooking, for hair, for everyday kitchen use.',
    details: ['Wood pressed', '1 L glass bottle'],
    image: {
      name: 'coconut-oil',
      widths: [640, 1024],
      width: 1024,
      height: 1024,
      alt: 'A glass bottle of MilkyLush wood pressed coconut oil',
    },
    hoverImage: { name: 'hover-coconut-oil', alt: 'Coconut oil being poured into a brass bowl beside halved coconuts' },
    cta: 'Explore Coconut Oil',
    href: site.pages.shop,
    tone: '#E9EBD9',
  },
  {
    id: 'groundnut-oil',
    name: 'Wood Pressed Groundnut Oil',
    eyebrow: '05 — Rich & nutty',
    description: 'Groundnut oil pressed slowly in a wooden press and bottled in glass, with the full, nutty aroma that everyday Indian cooking calls for.',
    details: ['Wood pressed', '1 L glass bottle'],
    image: {
      name: 'groundnut-oil',
      widths: [640, 1024],
      width: 1024,
      height: 1024,
      alt: 'A glass bottle of MilkyLush wood pressed groundnut oil',
    },
    hoverImage: { name: 'hover-groundnut-oil', alt: 'Golden groundnut oil in a bowl beside groundnuts on a wooden board' },
    cta: 'Explore Groundnut Oil',
    href: site.pages.shop,
    tone: '#EEE2C2',
  },
]

/** Founders, as named on milkylush.com. The site gives no formal titles, so both are listed as co-founders. */
export const founders = [
  {
    id: 'yashwanth',
    name: 'Yashwanth Kumar J',
    photo: 'founder-yashwanth',
    alt: 'Yashwanth Kumar J, co-founder of MilkyLush, smiling in a grey blazer at a podcast microphone',
  },
  {
    id: 'gokul',
    name: 'Gokul Kumar E',
    photo: 'founder-gokul',
    alt: 'Gokul Kumar E, co-founder of MilkyLush, in a navy blazer with arms crossed',
  },
] as const

/**
 * Glass bottle vs plastic packet — every MilkyLush-side line comes from milkylush.com (FAQ, blog, reels).
 * VERIFY before launch: the reuse count and the delivery window are the brand's own figures. Keep the
 * comparison about packaging and delivery; do not add health or safety claims about other products.
 */
export const comparison = {
  reuse: { glass: 35, label: '30–40', plastic: 1 },
  rows: [
    {
      aspect: 'The packaging',
      packet: 'A single-use plastic packet.',
      lush: 'A reusable glass bottle with a green cap.',
    },
    {
      aspect: 'Plastic and your milk',
      packet: 'Plastic can shed tiny particles (microplastics). Scientists are still studying what that means for our health.',
      lush: 'Your milk sits in glass, so there is no single-use plastic packaging around it.',
    },
    {
      aspect: 'How the milk is treated',
      packet: 'Usually pasteurised and standardised so it keeps for longer on the shelf.',
      lush: 'Raw (unpasteurised) milk, chilled and delivered within hours of milking. Always boil it before drinking.',
    },
    {
      aspect: 'After the last drop',
      packet: 'Thrown away with the rest of the household plastic.',
      lush: 'Collected from your door, washed in hot water, sanitised and filled again.',
    },
    {
      aspect: 'From milking to your door',
      packet: 'Packed for a long shelf life, so it can travel and wait.',
      lush: 'Delivered fresh in the early morning, within hours of milking.',
    },
  ],
  footnote:
    'This compares how MilkyLush packages and treats its milk with typical packet milk. Pasteurised milk is a common, safe choice; raw milk is not pasteurised, so boil it before drinking. Other brands vary.',
  /** The malai (cream layer) comparison — images in public/images (malai-packet / malai-lush). */
  malai: {
    title: 'And the malai?',
    intro: 'Boil milk, let it cool, and a cream layer called malai forms on top. How thick it gets depends on the fat in the milk.',
    packet: {
      label: 'Typical packet milk',
      body: 'Often homogenised and standardised, which spreads the fat through the milk — so the cream layer is usually thinner.',
    },
    lush: {
      label: 'MilkyLush raw cow milk',
      body: 'Raw milk keeps its natural cream, so it can form a thicker, richer malai once boiled and cooled.',
    },
  },
} as const

export type RangeItem = {
  id: string
  name: string
  size: string
  /** Base names of the 4:5 card images in public/images (…-400 / …-800 .avif/.webp). */
  image: string
  hover: string
  alt: string
  hoverAlt: string
  /** One-line description shown on the card. */
  blurb: string
  href: string
  /** Availability as listed on milkylush.com — update when it changes. */
  status?: string
}

/** Full range as listed on milkylush.com/shop.html (Oct 2026). Prices intentionally omitted. */
export const range: RangeItem[] = [
  { id: 'milk', name: 'Fresh Cow Milk', size: '500 ml · 1 L glass bottle', image: 'card-milk', hover: 'hover-milk', alt: 'MilkyLush fresh cow milk in a glass bottle with a green cap', hoverAlt: 'A MilkyLush glass bottle of fresh cow milk on a kitchen table beside a glass of milk and a breakfast bowl', blurb: 'Fresh cow milk, chilled and delivered in a reusable glass bottle. Boil before drinking.', href: site.pages.shop },
  { id: 'ghee', name: 'Desi Ghee', size: '250 ml · 500 ml glass jar', image: 'card-ghee', hover: 'hover-ghee', alt: 'A glass jar of MilkyLush Pure Cow Ghee, 500 g', hoverAlt: 'Ghee being spooned over a crisp dosa beside a jar of MilkyLush Pure Cow Ghee', blurb: 'Golden cow ghee in a glass jar, for tadka, rotis and festive sweets.', href: site.pages.shop },
  { id: 'paneer', name: 'Fresh Paneer', size: '200 g', image: 'card-paneer', hover: 'hover-paneer', alt: 'A glass jar of MilkyLush Paneer, 200 g, with a gold lid and a green and cream label', hoverAlt: 'Soft paneer cubes in a ceramic bowl with mint leaves', blurb: 'Soft fresh paneer for curries, bhurji and snacks.', href: site.pages.shop },
  { id: 'curd', name: 'Curd', size: '500 ml', image: 'card-curd', hover: 'hover-curd', alt: 'A tub of MilkyLush Traditional Curd', hoverAlt: 'A wooden spoon scooping thick curd from an earthen pot', blurb: 'Thick, creamy homestyle curd with live cultures.', href: site.pages.shop, status: 'Coming soon' },
  { id: 'coconut-oil', name: 'Wood Pressed Coconut Oil', size: '1 L', image: 'card-coconut-oil', hover: 'hover-coconut-oil', alt: 'MilkyLush wood pressed coconut oil in a glass bottle', hoverAlt: 'Coconut oil being poured into a brass bowl beside halved coconuts', blurb: 'Coconut oil pressed slowly in a wooden press, bottled in glass.', href: site.pages.shop },
  { id: 'groundnut-oil', name: 'Wood Pressed Groundnut Oil', size: '1 L', image: 'card-groundnut-oil', hover: 'hover-groundnut-oil', alt: 'MilkyLush wood pressed groundnut oil in a glass bottle', hoverAlt: 'Golden groundnut oil in a bowl beside groundnuts on a wooden board', blurb: 'Nutty, aromatic groundnut oil from a traditional wooden press.', href: site.pages.shop },
]

export type Reel = {
  /** Instagram reel shortcode (instagram.com/reel/<id>/) */
  id: string
  title: string
  cover: string
  coverAlt: string
  /** Optional muted preview clip in /public/reels (e.g. '/reels/glass.mp4') — plays on hover like a story card. */
  preview?: string
  /** One-line caption shown under the card. */
  description: string
  product: string
}

/** Reels linked from milkylush.com. Titles paraphrase each reel's caption. Covers are stand-ins (see README). */
export const reels: Reel[] = [
  { id: 'DUqMVJJFa4M', title: 'How we built MilkyLush', cover: 'ig-DUqMVJJFa4M', coverAlt: 'Cows grazing in a village at sunrise beside a steel milk can', description: 'The story behind MilkyLush: honest milk from the village, brought to your door.', product: 'Fresh Cow Milk' },
  { id: 'DU8hUa4FBhE', title: 'Sealed in glass, at your door', cover: 'ig-DU8hUa4FBhE', coverAlt: 'Two glass milk bottles on a doormat outside an apartment door at dawn', description: 'Farm fresh milk in a reusable glass bottle, delivered to your doorstep every morning.', product: 'Fresh Cow Milk' },
  { id: 'DTaSXUDE7Hj', title: 'Creamy, and kid-approved', cover: 'ig-DTaSXUDE7Hj', coverAlt: 'A child’s hands holding a glass of milk at the breakfast table', description: 'A family taste test: creamy milk the little ones ask for again.', product: 'Free 500 ml sample' },
  { id: 'DVQn__SjDqv', title: 'Why we choose glass', cover: 'ig-DVQn__SjDqv', coverAlt: 'A glass milk bottle being scrubbed clean by gloved hands', description: 'Why every MilkyLush bottle is glass, and how each one is washed and reused.', product: 'Reusable glass bottle' },
  { id: 'DVlWieHEb7p', title: 'Glass over plastic', cover: 'ig-DVlWieHEb7p', coverAlt: 'A MilkyLush bottle pouring milk into a glass', description: 'Glass bottles over plastic packets, and how you can order yours.', product: 'Fresh Cow Milk' },
]

/** Real customer quotes published on milkylush.com. VERIFY: confirm consent to reuse before launch. */
export const testimonials: { quote: string; name: string; place: string; placeholder?: boolean }[] = [
  {
    quote: 'Finally, a brand that cares about plastic pollution. The milk quality is thick and pure.',
    name: 'Anjali Menon',
    place: 'Bengaluru',
  },
  {
    quote:
      'I was skeptical about raw milk initially, but Milky Lush changed my mind. The taste reminds me of my childhood.',
    name: 'Priya S.',
    place: 'Electronic City',
  },
]

export const faqs: { id: string; q: string; a: string }[] = [
  {
    id: 'free-sample',
    q: 'How can I request a free milk sample?',
    a: 'Message us your address on WhatsApp at +91 99028 82332. If your home is within our delivery area, we will arrange a free 500 ml trial bottle — no commitment needed.',
  },
  {
    id: 'apartment',
    q: 'Do you deliver to my apartment?',
    a: 'Yes, if your apartment is within our delivery area. Share your apartment name and address on WhatsApp, and let us know about any gate or security instructions.',
  },
  {
    id: 'service-area',
    q: 'What is your delivery service area?',
    a: 'We currently deliver to eligible locations within 5 km of our delivery hub near Electronic City, Bangalore. Message us your address on WhatsApp and we will confirm. If you are just outside, message us — we are always looking to grow.',
  },
  {
    // VERIFY: confirm the exact collection steps with the delivery team.
    id: 'bottle-return',
    q: 'How does the glass bottle return system work?',
    a: 'Enjoy your milk, give the empty bottle a quick rinse, and keep it ready for your delivery partner to collect at your next delivery. Every returned bottle is washed with hot water and sanitised before it is used again.',
  },
  {
    id: 'subscription',
    q: 'How can I start a subscription?',
    a: 'Message us on WhatsApp or visit our shop page to choose the quantity that suits your household. You can pause, resume or change your quantity through WhatsApp whenever you need to.',
  },
  {
    id: 'delivery-time',
    q: 'What time is milk delivered?',
    a: 'Milk is delivered in the early morning, by 7:30 AM, so it is at your door before the day begins. Let us know about any gate or security instructions when you sign up.',
  },
  {
    id: 'products',
    q: 'Do you sell ghee, paneer and other products?',
    a: 'Yes. Alongside fresh cow milk, we offer desi ghee in glass jars, fresh paneer, and wood-pressed coconut and groundnut oils. Curd is coming soon. Ask on WhatsApp or in the app for what is available this week.',
  },
  {
    id: 'price',
    q: 'How much does MilkyLush milk cost?',
    a: 'Prices depend on the product and bottle size. Message us on WhatsApp or check the MilkyLush app for current prices before you start — and the first 500 ml sample bottle is free.',
  },
  {
    id: 'storage',
    q: 'How should I store and use the milk?',
    a: 'Refrigerate your milk as soon as it arrives and boil it before drinking, as you would with any fresh milk.',
  },
  {
    id: 'contact',
    q: 'How do I contact MilkyLush?',
    a: 'WhatsApp or call us on +91 99028 82332, or email milkylushorganic@gmail.com. You can also find us on Instagram at @milkylush_organic.',
  },
]

/**
 * Content for the /about/ page. Everything here comes from milkylush.com/Aboutus.html, reworded.
 * Deliberately left out: "tons of plastic prevented" and "thousands of families" (no figures are
 * published) and any health claims about plastic. VERIFY the reuse figure and delivery time.
 */
export const about = {
  values: [
    { icon: 'leaf', title: 'Purity first', body: 'No preservatives or artificial ingredients. Milk kept simple, the way it should be.' },
    { icon: 'eye', title: 'Transparency', body: 'You should know where your milk comes from. We believe in honesty and traceability.' },
    { icon: 'recycle', title: 'Sustainability', body: 'Our glass bottles are sterilised and reused, so there is less single-use plastic.' },
    { icon: 'handshake', title: 'Community', body: 'Fair pricing for local dairy farmers and ethical treatment of livestock.' },
  ],
  differences: [
    {
      kicker: 'Glass, not plastic',
      title: 'Every delivery comes in glass.',
      body: 'Milk and ghee reach you in glass. Empty bottles come back to us, get washed with hot water and sanitised, then go out again — so one bottle replaces a great many plastic ones.',
      photo: 'washing',
      alt: 'Gloved hands scrubbing a glass milk bottle beside MilkyLush crates',
    },
    {
      kicker: 'Village sourcing',
      title: 'Milk from the village, not the warehouse.',
      body: 'We source from milk producers on the outskirts of the city, where animals graze in open fields. Short routes mean fresh milk and fair prices for the people who produce it.',
      photo: 'village',
      alt: 'Cows grazing on green pasture at sunrise in a village',
    },
    {
      kicker: 'Every morning',
      title: 'At your door before the day starts.',
      body: 'Our delivery team brings your bottles in the early morning, and you can pause, resume or change your quantity with a WhatsApp message.',
      photo: 'delivery',
      alt: 'A MilkyLush delivery partner loading glass bottles into an insulated bag',
    },
  ],
  facts: [
    { value: '30–40×', label: 'each glass bottle is reused, on average' },
    { value: '7:30 AM', label: 'our morning delivery promise' },
    { value: 'Glass', label: 'bottles and jars for our milk, ghee, paneer and oils' },
  ],
  steps: ['A cleaner environment', 'Less plastic pollution', 'A better future for the next generation'],
  /** Website by — credited on milkylush.com's team page. */
  tech: { name: 'OG Space', href: 'https://ogspace.in' },
} as const
