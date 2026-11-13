/**
 * Copy for /privacy/ and /terms/. Written for this landing page and based on the facts published on milkylush.com
 * (contact details, ordering via WhatsApp / the app, the delivery area, reusable bottles, raw milk).
 * VERIFY with a lawyer before launch — in particular the legal entity name, the grievance officer, and anything
 * about payments, refunds and subscriptions that your ordering flow handles differently.
 */
import { site } from './site'

export const legalUpdated = '26 October 2026'

export type LegalSection = { id: string; title: string; body: (string | { list: string[] })[] }
export type LegalDoc = { title: string; intro: string; sections: LegalSection[] }

const contact = `${site.name}, ${site.address}. Phone / WhatsApp: ${site.phoneDisplay}. Email: ${site.email}.`

export const privacy: LegalDoc = {
  title: 'Privacy Policy',
  intro: `This policy explains what personal information ${site.name} ("we", "us") collects when you use this website, how we use it, and the choices you have. We keep it short because we collect very little on this site.`,
  sections: [
    {
      id: 'what-we-collect',
      title: 'What we collect',
      body: [
        'This landing page does not have an account system, and it does not ask you to type personal details into a form on the page. We only receive information you choose to send us, plus basic technical data.',
        {
          list: [
            'Information you send us. When you message us on WhatsApp, call, email, or use the MilkyLush app, we receive what you share — typically your name, phone number, delivery address, apartment name, the products or sample you want, and your message.',
            'Order and subscription details. If you place an order or start a subscription: the products, quantities, delivery schedule, bottle returns and payment status.',
            'Basic technical data. Like any website, our hosting provider may log your IP address, browser type, device and the pages you request, for security and to keep the site running.',
            'Anonymous usage counts. The site can record that a button such as “Request a Free Sample” was clicked. This happens in your browser and is only sent to an analytics service if one is switched on (see Cookies and third parties).',
          ],
        },
      ],
    },
    {
      id: 'how-we-use',
      title: 'How we use it',
      body: [
        {
          list: [
            'To reply to you, check whether we deliver to your address, and arrange your free 500 ml sample.',
            'To take and deliver orders, run subscriptions, collect empty glass bottles and send delivery updates.',
            'To provide customer support and handle complaints.',
            'To understand which parts of the site are useful and to improve the site, our products and our service.',
            'To meet legal, tax and safety obligations.',
          ],
        },
        'We only send you marketing messages if you have asked for them, and you can ask us to stop at any time.',
      ],
    },
    {
      id: 'legal-basis',
      title: 'Why we may use your information',
      body: [
        'We use your information because you asked us to (for example, to arrange a sample or a delivery), because it is needed to carry out an order, because you gave your consent, or because we have a legitimate interest in running and improving a safe, reliable service. Where the law requires consent, we ask for it and you may withdraw it at any time.',
      ],
    },
    {
      id: 'sharing',
      title: 'Who we share it with',
      body: [
        'We do not sell your personal information. We share it only where needed:',
        {
          list: [
            'Delivery partners and staff who need your name, address and phone number to deliver and collect bottles.',
            'Service providers that help us operate: for example WhatsApp (Meta) for messaging, payment providers for payments, the host of this website, and analytics providers if enabled.',
            'Authorities, when we are required to by law or to protect our rights, customers or the public.',
          ],
        },
      ],
    },
    {
      id: 'third-parties',
      title: 'Cookies and third parties on this site',
      body: [
        'This site itself does not set advertising cookies, and its typefaces and images are served from our own website. A few features load content from other companies, who may receive your IP address and device details when they load:',
        {
          list: [
            'Instagram, which supplies the reels. Instagram content loads only when you open a reel, and Instagram’s own policy then applies.',
            'WhatsApp, Google Play and our social media pages, which open when you tap their buttons. Their privacy policies apply once you leave this site.',
          ],
        },
        'If we add analytics or advertising tools later, we will update this page and, where required, ask for your consent first.',
      ],
    },
    {
      id: 'retention',
      title: 'How long we keep it',
      body: [
        'We keep your information only as long as we need it for the purposes above — for example while you are an active customer, and afterwards for as long as needed to resolve disputes, keep accounting records or meet legal requirements. After that we delete it or make it anonymous.',
      ],
    },
    {
      id: 'security',
      title: 'Security',
      body: [
        'We use reasonable technical and organisational measures to protect your information, and we limit who can see it. No method of storage or transmission is completely secure, so we cannot guarantee absolute security. Please do not send card numbers, OTPs or passwords in chat.',
      ],
    },
    {
      id: 'rights',
      title: 'Your rights and choices',
      body: [
        'Under Indian law, including the Digital Personal Data Protection Act, 2023, you may ask us to:',
        {
          list: [
            'tell you what personal information we hold about you and why;',
            'correct anything that is wrong or out of date;',
            'delete your information, where we have no legal reason to keep it;',
            'stop contacting you, and withdraw any consent you gave; and',
            'nominate someone to exercise these rights for you, and have a complaint heard.',
          ],
        },
        'To make a request, contact us using the details below. We will reply within a reasonable time and may need to confirm who you are first.',
      ],
    },
    {
      id: 'children',
      title: 'Children',
      body: [
        'Our services are meant for adults who place orders for their households. We do not knowingly collect personal information from children under 18 without a parent or guardian’s involvement. If you believe a child has sent us information, contact us and we will delete it.',
      ],
    },
    {
      id: 'changes',
      title: 'Changes to this policy',
      body: [`We may update this policy from time to time. The date at the top shows when it was last changed. If the changes are significant we will make that clear on this site.`],
    },
    {
      id: 'contact',
      title: 'Contact us',
      body: [`For questions, requests or complaints about your personal information, contact: ${contact}`],
    },
  ],
}

export const terms: LegalDoc = {
  title: 'Terms of Service',
  intro: `These terms apply when you use this website (${site.displayUrl}) and request products or a free sample from ${site.name} through it. By using the site you agree to them. If you do not agree, please do not use the site.`,
  sections: [
    {
      id: 'about',
      title: 'About this website',
      body: [
        `This site introduces ${site.name} — fresh cow milk and other farm products in reusable glass bottles, delivered in Bengaluru. It is for general information. Ordering and delivery are arranged with us on WhatsApp, by phone, or in the MilkyLush app, and each order is confirmed by us directly.`,
      ],
    },
    {
      id: 'eligibility',
      title: 'Who can use it',
      body: ['You must be 18 or older, or use the site with a parent or guardian, to place an order with us. You agree to give us accurate delivery and contact details.'],
    },
    {
      id: 'delivery-area',
      title: 'Delivery area and availability',
      body: [
        'We deliver only to areas we currently serve, around our delivery hub near Electronic City, Bengaluru. Being able to message us does not guarantee that we can deliver to you; we confirm availability for your address. Products, sizes and availability may change, and some items may be marked “coming soon”.',
      ],
    },
    {
      id: 'free-sample',
      title: 'Free 500 ml sample',
      body: [
        'We offer a free 500 ml trial bottle to eligible new households in our delivery area. It is limited to one per household and subject to availability. We may decline or withdraw the offer, including where we suspect misuse. There is no obligation to buy anything after your sample.',
      ],
    },
    {
      id: 'orders',
      title: 'Orders, prices and payment',
      body: [
        'An order is accepted only when we confirm it. Prices and any delivery charges are the ones we confirm to you at the time of ordering and may change for future orders. Payment is taken as we agree with you at the time (for example through the MilkyLush app or another method we offer). Subscriptions can be paused, changed or cancelled by messaging us, within the cut-off time we tell you for the next delivery.',
      ],
    },
    {
      id: 'glass-bottles',
      title: 'Reusable glass bottles',
      body: [
        'Our milk and ghee come in reusable glass. Please rinse empty bottles and keep them ready for collection at your next delivery. Bottles remain our property. We may ask you to return them or, where bottles are not returned or are damaged beyond normal use, to pay a reasonable replacement amount that we will tell you about in advance.',
      ],
    },
    {
      id: 'food-safety',
      title: 'Food safety and raw milk',
      body: [
        'Our milk is raw (unpasteurised) cow milk. You must boil it before drinking, as you would any fresh milk, and refrigerate it as soon as it arrives. Raw milk may not suit infants, pregnant women, older people or anyone with a weakened immune system unless it has been properly boiled. If you have any allergy or medical condition, please check with a doctor before use.',
        'Information on this site is not medical advice. Comparisons between glass and plastic packaging, or between raw and pasteurised milk, describe how we package and treat our products and are not claims about other brands.',
      ],
    },
    {
      id: 'complaints',
      title: 'Quality, refunds and complaints',
      body: [
        'If something is wrong with your delivery — a damaged bottle, a missed delivery or a quality problem — tell us on WhatsApp or by phone as soon as you can, ideally the same day and with a photo if possible. We will look into it and, where appropriate, replace the item, credit your account or refund you. Nothing in these terms limits your rights under the Consumer Protection Act, 2019.',
      ],
    },
    {
      id: 'acceptable-use',
      title: 'Using the site',
      body: [
        'Please do not misuse the site: do not try to break or overload it, attempt to access it without permission, copy it in bulk by automated means, or use it to send us anything unlawful or harmful.',
      ],
    },
    {
      id: 'ip',
      title: 'Our content',
      body: [
        `The ${site.name} name, logo, bottle design, photographs, illustrations, text and this site’s design belong to us or our licensors and are protected by law. You may view and share the site for personal, non-commercial use, but you may not copy or reuse our content without our written permission. Instagram reels shown on the site belong to their creators.`,
      ],
    },
    {
      id: 'third-party-links',
      title: 'Links to other sites',
      body: ['This site links to WhatsApp, Google Play, Instagram, Facebook, YouTube and our main website. We do not control those services and are not responsible for their content or policies.'],
    },
    {
      id: 'liability',
      title: 'Our responsibility',
      body: [
        'We take care to keep this site accurate and available, but we provide it “as is”, and it may occasionally be unavailable or contain errors. To the extent the law allows, we are not liable for indirect or consequential losses arising from use of this site, and our total liability for any claim relating to an order is limited to the amount you paid for that order. Nothing here excludes liability that cannot be excluded by law.',
      ],
    },
    {
      id: 'privacy',
      title: 'Your information',
      body: ['How we handle personal information is described in our Privacy Policy, which forms part of these terms.'],
    },
    {
      id: 'law',
      title: 'Governing law',
      body: ['These terms are governed by the laws of India. Courts in Bengaluru, Karnataka have jurisdiction over any dispute, without affecting any consumer rights you have to bring a claim elsewhere under law. We would always like the chance to resolve a problem with you directly first.'],
    },
    {
      id: 'changes',
      title: 'Changes to these terms',
      body: ['We may update these terms from time to time. The date at the top shows the latest version. By continuing to use the site after a change, you accept the updated terms.'],
    },
    {
      id: 'contact',
      title: 'Contact us',
      body: [`Questions about these terms? Contact: ${contact}`],
    },
  ],
}
