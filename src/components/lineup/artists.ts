export interface LineupArtist {
  /** Anchor id slug, e.g. "maoli" → #artist-maoli */
  id: string;
  name: string;
  image: string;
  /** Tag chip, e.g. "HEADLINER · REGGAE" */
  tag: string;
  /** 2–3 sentence bio for the dialog */
  bio: string;
}

export const ARTISTS: LineupArtist[] = [
  {
    id: 'maoli',
    name: 'MAOLI',
    image: '/artists/maoli.jpg',
    tag: 'HEADLINER · REGGAE',
    bio: "Island reggae heavyweights bringing the aloha to the Gold Coast. Hawaii's chart-topping crew headlines Sound Collective with a catalogue of feel-good anthems built for a sunset main stage. Main stage · set time TBA.",
  },
  {
    id: 'stan-walker',
    name: 'STAN WALKER',
    image: '/artists/stan-walker.jpg',
    tag: 'SOUL · ROOTS',
    bio: "One of Australasia's most powerful voices. Stan Walker brings soul, roots and a lifetime of anthems to the Broadwater — a voice made for big open-air moments. Main stage · set time TBA.",
  },
  {
    id: 'katchafire',
    name: 'KATCHAFIRE',
    image: '/artists/katchafire.jpg',
    tag: 'ROOTS REGGAE',
    bio: "Aotearoa's legendary roots crew. Katchafire have carried New Zealand reggae around the world for two decades, and their live show is pure fire. Main stage · set time TBA.",
  },
  {
    id: 'soja',
    name: 'SOJA',
    image: '/artists/soja.jpg',
    tag: 'REGGAE ROCK',
    bio: 'Grammy-winning reggae from Arlington, Virginia. SOJA blend rock, roots and conscious lyricism into one of the biggest live reggae shows on the planet. Main stage · set time TBA.',
  },
  {
    id: 'arrested-development',
    name: 'ARRESTED DEVELOPMENT',
    image: '/artists/arrested-development.jpg',
    tag: 'HIP-HOP',
    bio: 'Progressive hip-hop pioneers, still uplifting. The multi-platinum, Grammy-winning collective brings three decades of conscious classics and pure party energy. Main stage · set time TBA.',
  },
  {
    id: 'art',
    name: 'A.R.T',
    image: '/artists/art.jpg',
    tag: 'LIVE',
    bio: "Gold Coast's own, bringing the local heat. A.R.T reps the 07 with a high-energy live set built on homegrown sounds and hometown pride. Main stage · set time TBA.",
  },
  {
    id: 'bradamon',
    name: 'BRADAMON',
    image: '/artists/bradamon.jpg',
    tag: 'SINGER-SONGWRITER',
    bio: 'Coastal songwriting, sun-soaked sounds. Bradamon writes the kind of songs that sound like a Gold Coast afternoon — warm, honest and easy to sing along to. Main stage · set time TBA.',
  },
  {
    id: 'riah',
    name: 'RIAH',
    image: '/artists/riah.jpg',
    tag: 'R&B · SOUL',
    bio: 'Rising voice you need to know. RIAH pairs silky R&B vocals with serious stage presence — catch her now before everyone else claims they did. Main stage · set time TBA.',
  },
];
