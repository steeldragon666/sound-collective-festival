export interface FaqChipGroup {
  label: string;
  items: string[];
}

export interface FaqEntry {
  id: string;
  question: string;
  answer: string[];
  chips?: FaqChipGroup[];
}

export interface FaqTab {
  value: string;
  label: string;
  items: FaqEntry[];
}

export const FAQ_TABS: FaqTab[] = [
  {
    value: 'ticketing',
    label: 'Ticketing',
    items: [
      {
        id: 't-1',
        question: 'How much are tickets?',
        answer: [
          '1st Release $169.90 · 2nd Release $189.90 · 3rd Release $209.90 · VIP $269.90. All tickets via Megatix.',
        ],
      },
      {
        id: 't-2',
        question: 'Is the event 18+?',
        answer: [
          'Yes, strictly 18+. Valid photo ID required on arrival — see Conditions of Entry for accepted ID.',
        ],
      },
      {
        id: 't-3',
        question: 'What does VIP include?',
        answer: [
          'Front-of-stage exclusive area · VIP express entry lane · private bar, food and toilets.',
        ],
      },
      {
        id: 't-4',
        question: 'When do tickets go on sale?',
        answer: [
          'Presale: Thursday 17 September 2026, 9am local. General release: Friday 18 September 2026, 9am local. All tickets via Megatix.',
        ],
      },
      {
        id: 't-5',
        question: 'How do I win the prize pack?',
        answer: [
          "Register for presale and you're in the draw to win 2× VIP tickets, 2 nights' accommodation, $250 bar spend and side-of-stage access. Registering is the only required step — optionally reserve tickets at the same time. Presale opens 17 September, 9am.",
        ],
      },
      {
        id: 't-6',
        question: 'How do I register for presale?',
        answer: ["Via Megatix Reserve — the festival's presale reservation system."],
      },
      {
        id: 't-7',
        question: 'What is Megatix Reserve?',
        answer: [
          "Request the tickets you want before the presale. A reservation is not a purchase until confirmed, and you're only charged if your reservation is successful — no holds, no pre-authorisations. You'll be notified by email.",
        ],
      },
      {
        id: 't-8',
        question: 'Can I cancel or update my reservation?',
        answer: [
          'Yes — cancel anytime via My Orders on Megatix, and update your payment details there too. If a payment fails, Megatix will email you to retry; the reservation may be cancelled if unresolved. Help: megatix.com.au/support.',
        ],
      },
      {
        id: 't-9',
        question: 'When will I receive my ticket?',
        answer: [
          'Tickets are issued once the general release is on sale — find them in your Megatix account.',
        ],
      },
      {
        id: 't-10',
        question: 'Can I pay in instalments?',
        answer: ['Yes — PayPal Pay In 4 is available from presale.'],
      },
      {
        id: 't-11',
        question: 'Can I get a refund or resell my ticket?',
        answer: [
          "The event is non-refundable. You can resell safely via Tixel, the official resale partner. Tickets bought outside Megatix or Tixel can't be verified.",
        ],
      },
      {
        id: 't-12',
        question: 'What is X Cover Ticket Insurance?',
        answer: [
          'An optional add-on covering illness, injury and emergencies. Claims are made via X Cover. T&Cs and exclusions apply.',
        ],
      },
    ],
  },
  {
    value: 'getting-there',
    label: 'Getting There',
    items: [
      {
        id: 'g-1',
        question: "What's the best way to get to the festival?",
        answer: ['We strongly recommend public transport.'],
      },
      {
        id: 'g-2',
        question: 'By tram',
        answer: [
          'Take the G:Link to Parklands or Southport South stations, then use the Ada Bell Way crossing to the festival entry.',
        ],
      },
      {
        id: 'g-3',
        question: 'By bus',
        answer: ['Catch a bus to Australia Fair, then use the Ada Bell Way crossing.'],
      },
      {
        id: 'g-4',
        question: 'By ferry',
        answer: ['Hop off at Southport Pier, turn left and walk through Broadwater Parklands.'],
      },
      {
        id: 'g-5',
        question: 'Are there road crossings?',
        answer: [
          'Yes — traffic controllers will be at the Gold Coast Hwy / Ada Bell Way and Gold Coast Hwy / Marine Parade crossings.',
        ],
      },
      {
        id: 'g-6',
        question: 'How do I get home?',
        answer: [
          'Uber and rideshare pickup zone is in front of the Entry Marquee. Police and security will direct crowds to public transport.',
        ],
      },
    ],
  },
  {
    value: 'conditions-of-entry',
    label: 'Conditions of Entry',
    items: [
      {
        id: 'c-1',
        question: 'What do I need to bring to get in?',
        answer: ['The event is strictly 18+ — bring your ticket and valid photo ID.'],
      },
      {
        id: 'c-2',
        question: 'What ID is accepted?',
        answer: [
          'AU drivers/riders licence · AU learners permit · AU passport · foreign passport · Proof of Age card (any state/territory) · Keypass (over 18) from Australia Post.',
        ],
      },
      {
        id: 'c-3',
        question: 'What ID is NOT accepted?',
        answer: [
          'School IDs · expired IDs · birth certificates · DHS cards · photocopies · fake IDs · international drivers licences.',
        ],
      },
      {
        id: 'c-4',
        question: 'What are the house rules?',
        answer: [
          'Security and bag searches on entry · no passouts (no re-entry) · respect our neighbours when leaving · zero-tolerance for bad behaviour — removal without refund · zero-tolerance drug policy · if you need help, ask any security staff.',
        ],
      },
      {
        id: 'c-5',
        question: "What's prohibited?",
        answer: [
          'The following items are not permitted inside the festival. Additional items may be refused at staff discretion.',
        ],
        chips: [
          { label: 'Substances', items: ['Prohibited substances'] },
          { label: 'Food & Drink', items: ['External food', 'External drink'] },
          {
            label: 'Containers',
            items: [
              'Glass containers',
              'Metal containers',
              'Empty plastic bottles OK',
              'Approved hydration packs OK',
            ],
          },
          { label: 'Weapons & Flammables', items: ['Weapons of any kind', 'Flammable items'] },
          { label: 'Animals', items: ['Animals', 'Accredited assistance animals with ID excepted'] },
          { label: 'Furniture', items: ['Furniture'] },
          { label: 'Bags', items: ['Large bags over 40×40cm'] },
          { label: 'Vehicles & Tech', items: ['Drones', 'Bikes', 'Skateboards', 'Scooters'] },
          {
            label: 'Professional Photo Gear',
            items: ['Lenses over 5cm', 'Detachable lenses', 'Tripods', 'Selfie sticks'],
          },
          {
            label: 'Apparel',
            items: [
              'Motorcycle / criminal-org apparel',
              'Culturally inappropriate costumes',
              'Chains, spikes & masks',
              'Hi-vis',
              'Studs',
            ],
          },
          { label: 'Promotional', items: ['Unauthorised promotional materials'] },
          {
            label: 'Miscellaneous',
            items: [
              'Umbrellas',
              'Poles',
              'Banners',
              'Flags',
              'Stuffed animals',
              'Markers',
              'Spray paint',
              'Confetti',
              'Kites',
              'Sky lanterns',
              'Political signage',
              'Instruments',
              'Noise-makers',
            ],
          },
        ],
      },
      {
        id: 'c-6',
        question: 'What should I bring?',
        answer: [
          'Good vibes · ticket · photo ID · card (cashless site) · sun protection · empty reusable plastic water bottle · small bag · wet-weather gear (no umbrellas) · sensible shoes · charged phone + power bank · prescription meds.',
        ],
      },
      {
        id: 'c-7',
        question: 'Can I bring prescription medicine?',
        answer: [
          'Yes — original packaging showing your name and dosage, plus a copy of the prescription (digital OK). Only bring what you need for the day. Medical equipment and mobility aids are permitted.',
        ],
      },
    ],
  },
  {
    value: 'general-event-info',
    label: 'General Event Info',
    items: [
      {
        id: 'i-1',
        question: 'When and where is Sound Collective?',
        answer: [
          'Saturday 20 February 2027 at Broadwater Parklands, Gold Coast. Gates 11:00am, music 11:15am – 10:00pm.',
        ],
      },
      {
        id: 'i-2',
        question: 'Is the event 18+ and cashless?',
        answer: [
          'Yes — strictly 18+ with valid photo ID, and the whole site is cashless (cards only).',
        ],
      },
      {
        id: 'i-3',
        question: 'What food and drinks are available?',
        answer: [
          'A range of cuisines with dietary requirements covered; bars serving beer, champagne, wine and spirits plus non-alcoholic options; free water stations. No external food or drink.',
        ],
      },
      {
        id: 'i-4',
        question: 'Will there be merchandise?',
        answer: ['Yes — official festival and artist merch with card facilities.'],
      },
      {
        id: 'i-5',
        question: 'How can my band play the festival?',
        answer: [
          'We\'re running a local artist competition for the opening slot ("Local Comp Winner" on the lineup). Apply with your details and links to your music — see the Lineup page.',
        ],
      },
    ],
  },
  {
    value: 'accessibility',
    label: 'Accessibility',
    items: [
      {
        id: 'a-1',
        question: 'Is the festival accessible?',
        answer: [
          "We're committed to a welcoming, inclusive and accessible festival for everyone.",
        ],
      },
      {
        id: 'a-2',
        question: 'Companion Card / carer tickets?',
        answer: [
          'One free carer ticket per paid ticket with a valid Companion Card — arrange via Megatix support and present the card at entry.',
        ],
      },
      {
        id: 'a-3',
        question: 'Accessible parking?',
        answer: [
          'Carey Park Car Park is opposite the site (public car park, not event-managed); drop off/pick up available; use the Ada Bell Way crossing.',
        ],
      },
      {
        id: 'a-4',
        question: 'Accessible entry?',
        answer: ['A dedicated entry lane is available for Disability and Companion Card holders.'],
      },
      {
        id: 'a-5',
        question: "What's the site like?",
        answer: [
          'Flat and wheelchair accessible, with PWD-compliant temporary sanitation and tracked pathways over soft ground.',
        ],
      },
      {
        id: 'a-6',
        question: 'What if I need help on the day?',
        answer: ['Medical services are on site — ask any staff or security for assistance.'],
      },
    ],
  },
];

/** Flat searchable text for one entry (question + answer + chips). */
function searchableText(entry: FaqEntry): string {
  const chipText = (entry.chips ?? [])
    .map((g) => `${g.label} ${g.items.join(' ')}`)
    .join(' ');
  return `${entry.question} ${entry.answer.join(' ')} ${chipText}`.toLowerCase();
}

export function entryMatches(entry: FaqEntry, query: string): boolean {
  return searchableText(entry).includes(query.trim().toLowerCase());
}

export interface FaqSearchGroup {
  tab: FaqTab;
  items: FaqEntry[];
}

/** Cross-tab search: returns matching entries grouped by tab. */
export function searchFaq(query: string): FaqSearchGroup[] {
  const q = query.trim();
  if (!q) return [];
  return FAQ_TABS.map((tab) => ({
    tab,
    items: tab.items.filter((entry) => entryMatches(entry, q)),
  })).filter((group) => group.items.length > 0);
}

export function countResults(groups: FaqSearchGroup[]): number {
  return groups.reduce((sum, g) => sum + g.items.length, 0);
}
