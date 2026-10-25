import inventory from './photo-inventory.json';
import { mediaCopy, type MediaStatus } from './media';
declare global {
  interface Window {
    __DADINKOWA_ASSETS__?: Record<string, string>;
  }
}
export const asset = (path: string) => window.__DADINKOWA_ASSETS__?.[path] ?? path;
export const business = {
  name: 'Dadinkowa Couture',
  address: 'Olofa Way, Ijagbo Offa 250101, Kwara, Nigeria',
  phone: '+234 803 389 5505',
  phoneRaw: '+2348033895505',
  whatsapp: 'https://wa.me/2348033895505',
  map: 'https://www.google.com/maps/place/DADINKOWA+COUTURE/data=!4m2!3m1!1s0x0:0x638bc22a40291caa?sa=X&ved=1t:2428&ictx=111',
  socials: {
    Instagram: 'https://www.instagram.com/dadinkowacouture/',
    Facebook: 'https://www.facebook.com/p/Dadinkowa-couture-100076521817343/',
    TikTok: 'https://www.tiktok.com/@dadin.kowa.couture',
  },
};

export const site = {
  previewMode: true,
  headline: 'Considered style. Personal expression.',
  theme: { ink: '#111111', ivory: '#F5F1E9', stone: '#D8D0C4' },
};
export const categories = [
  'All',
  'Tailoring',
  'Ready-to-Wear',
  'Fabrics',
  'Caps & Accessories',
] as const;
export type Category = (typeof categories)[number];
export type Photo = {
  src: string;
  srcSet?: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  position?: string;
  mobilePosition?: string;
  fit?: 'cover' | 'contain';
  background?: string;
  available?: boolean;
  slot?: string;
};
export type Look = {
  id: string;
  slug: string;
  title: string;
  category: Exclude<Category, 'All'>;
  description: string;
  images: Photo[];
  mediaStatus: MediaStatus;
  source: string;
};
const installed = inventory as { photos: Record<string, { width: number; height: number }> };
const photo = (name: string, alt: string, position = '50% 35%'): Photo => ({
  available: !!installed.photos[name],
  slot: name,
  width: installed.photos[name]?.width ?? 1000,
  height: installed.photos[name]?.height ?? 1400,
  src: asset(`/media/${name}-1400.webp`),
  srcSet: `${asset(`/media/${name}-700.webp`)} 700w, ${asset(`/media/${name}-1400.webp`)} 1400w`,
  alt,
  position,
  caption: 'Enquire for current options and pricing.',
});
export const photos = {
  portrait: photo(
    'portrait',
    'Reference portrait of a Nigerian man wearing patterned traditional attire',
  ),
  cap: photo(
    'cap-portrait',
    'Reference rear three-quarter portrait of a man in a striped cap and patterned tunic',
  ),
  burgundy: photo(
    'agbada-burgundy',
    'Reference portrait of a man in a burgundy tunic, sunglasses and baseball cap',
  ),
  blue: photo('agbada-blue', 'Reference portrait of a Nigerian man in blue Agbada'),
  kaftan: photo(
    'kaftan-sand',
    'Reference portrait of a man in a sand-toned kaftan with a visible clothing tag',
  ),
  everyday: photo(
    'kaftan-earth',
    'Reference portrait of a man wearing earth-toned Nigerian attire',
  ),
  fabrics: photo('fabric-stack', 'Reference photograph of folded fabrics on a shelf'),
  sewing: {
    ...photo('sewing', 'Reference close-up of a sewing machine stitching cloth'),
    width: 1400,
    height: 788,
  },
  texture: photo('fabric-bronze', 'Reference close-up of brown cloth folds'),
};
Object.assign(photos.portrait, {
  fit: 'contain',
  position: '50% 50%',
  mobilePosition: '50% 50%',
  background: '#d9d1c5',
});
Object.assign(photos.cap, {
  fit: 'contain',
  position: '50% 50%',
  mobilePosition: '50% 50%',
  background: '#d3c3b3',
});
Object.assign(photos.burgundy, {
  fit: 'contain',
  position: '50% 50%',
  mobilePosition: '50% 50%',
  background: '#aaa0d2',
});
Object.assign(photos.blue, {
  fit: 'contain',
  position: '50% 50%',
  mobilePosition: '50% 50%',
  background: '#e2e5df',
});
Object.assign(photos.kaftan, {
  fit: 'contain',
  position: '50% 50%',
  mobilePosition: '50% 50%',
  background: '#c19970',
});
Object.assign(photos.everyday, {
  fit: 'contain',
  position: '50% 50%',
  mobilePosition: '50% 50%',
  background: '#b1a58f',
});
Object.assign(photos.sewing, { fit: 'cover', position: '57% 58%', mobilePosition: '57% 58%' });
Object.assign(photos.fabrics, { fit: 'cover', position: '35% 50%', mobilePosition: '35% 50%' });
Object.assign(photos.texture, { fit: 'cover', position: '50% 50%', mobilePosition: '50% 50%' });
export const looks: Look[] = [
  {
    id: '01',
    slug: 'senator-study',
    title: 'A presence in burgundy',
    category: 'Tailoring',
    description:
      'A bold silhouette, a quiet confidence. Bring your preferred native style to the conversation and discuss fabric, fit and timing with the team.',
    images: [photos.burgundy],
    mediaStatus: 'stock-reference',
    source: 'mk_photoz / Pexels 37766536',
  },
  {
    id: '02',
    slug: 'fabric-rhythm',
    title: 'A rhythm in cloth',
    category: 'Fabrics',
    description:
      'Tone, texture and possibility. Start with your colour palette, then ask the team about current fabric choices and pricing.',
    images: [photos.fabrics],
    mediaStatus: 'stock-reference',
    source: 'Tima Miroshnichenko / Pexels 6766360',
  },
  {
    id: '03',
    slug: 'agbada-study',
    title: 'Room for expression',
    category: 'Tailoring',
    description:
      'A fresh perspective on Agbada. Explore your preferred silhouette and ask which fabrics are available to bring your idea to life.',
    images: [photos.blue],
    mediaStatus: 'stock-reference',
    source: 'Taiye Salawu / Pexels 37320670',
  },
  {
    id: '04',
    slug: 'everyday-study',
    title: 'Everyday, considered',
    category: 'Ready-to-Wear',
    description:
      'Ease with intention. Ask for the current ready-to-wear selection, sizes and prices directly from the team.',
    images: [photos.everyday],
    mediaStatus: 'stock-reference',
    source: 'Taiye Salawu / Pexels 38188493',
  },
  {
    id: '05',
    slug: 'finishing-note',
    title: 'The finishing note',
    category: 'Caps & Accessories',
    description:
      'A cap can change the whole conversation. Explore current caps, watches and accessories with Dadinkowa Couture.',
    images: [photos.cap],
    mediaStatus: 'stock-reference',
    source: 'Chidera Faustina Okeke / Unsplash xZpVJsIcaiM',
  },
  {
    id: '06',
    slug: 'ease-in-sand',
    title: 'Ease in sand',
    category: 'Ready-to-Wear',
    description:
      'A pared-back direction for everyday dressing. Use this as a style reference and enquire about the current range.',
    images: [photos.kaftan],
    mediaStatus: 'stock-reference',
    source: 'Skylight Views / Pexels 34362606',
  },
];
export const media = {
  logo: {
    src: asset('/media/logo-draft.png'),
    source: 'User-supplied recreated-logo-draft.png',
    approvalStatus: 'Provisional reconstruction; owner review required',
  },
  hero: [photos.portrait, photos.blue, photos.kaftan],
  approvalStatus: 'Temporary licensed reference photography; not brand products',
};
export const socialPosts = [
  {
    title: 'From the fabric sample book',
    description: 'Explore the brand’s fabric conversation.',
    url: 'https://www.tiktok.com/@dadin.kowa.couture/video/7700201929229487367',
    label: 'FABRIC NOTE / 01',
  },
  {
    title: 'A conversation about craft',
    description: 'Follow the brand’s notes on sourcing and workmanship.',
    url: 'https://www.tiktok.com/@dadin.kowa.couture/video/7693194083077983496',
    label: 'ATELIER NOTE / 02',
  },
];
export function filterLooks(category: Category, items = looks) {
  return category === 'All' ? items : items.filter((look) => look.category === category);
}
export function whatsappUrl({
  interest = '',
  reference = '',
  mediaStatus = 'stock-reference',
  message = '',
}: { interest?: string; reference?: string; mediaStatus?: MediaStatus; message?: string } = {}) {
  const parts = [
    'Hello Dadinkowa Couture,',
    interest && `I am interested in ${interest}.`,
    reference && `Look reference: ${reference} (${mediaCopy(mediaStatus).reference}).`,
    message.trim(),
    'Please share current availability and pricing.',
  ];
  return `${business.whatsapp}?text=${encodeURIComponent(parts.filter(Boolean).join('\n'))}`;
}
