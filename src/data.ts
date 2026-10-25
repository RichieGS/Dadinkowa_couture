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
  headline: 'Cloth. Form. Identity.',
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
const concept = (name: string, alt: string, transparent = true): Photo => ({
  src: asset(`/media/concept-${name}-${transparent ? 1000 : 1400}.webp`),
  srcSet: transparent
    ? `${asset(`/media/concept-${name}-500.webp`)} 500w, ${asset(`/media/concept-${name}-1000.webp`)} 1000w`
    : `${asset(`/media/concept-${name}-700.webp`)} 700w, ${asset(`/media/concept-${name}-1400.webp`)} 1400w`,
  width: transparent ? 1000 : 1400,
  height: transparent ? 1500 : name === 'folds' ? 525 : 933,
  alt,
  fit: transparent ? 'contain' : 'cover',
  position: '50% 50%',
  caption: 'AI-generated style concept—not an actual Dadinkowa product.',
});
export const concepts = {
  burgundy: concept(
    'burgundy',
    'AI concept: sculptural burgundy Agbada with tonal geometric embroidery',
  ),
  ivory: concept('ivory', 'AI concept: ivory Senator-style tunic and trousers'),
  midnight: concept('midnight', 'AI concept: midnight-blue Agbada with a sweeping silhouette'),
  folds: concept('folds', 'AI-generated conceptual burgundy fabric folds in warm light', false),
  embroidery: concept(
    'embroidery',
    'AI-generated conceptual geometric burgundy embroidery detail',
    false,
  ),
};
export const looks: Look[] = [
  {
    id: '01',
    slug: 'burgundy-concept',
    title: 'Burgundy / Form',
    category: 'Tailoring',
    description:
      'Broad folds and a tonal geometric centre create a sculptural burgundy silhouette.',
    images: [concepts.burgundy],
    mediaStatus: 'ai-concept',
    source: 'User-supplied AI concept / New_designs.zip',
  },
  {
    id: '02',
    slug: 'ivory-concept',
    title: 'Ivory / Line',
    category: 'Tailoring',
    description:
      'A pale palette, a straight tunic and a quiet vertical line. An ivory Senator-style concept.',
    images: [concepts.ivory],
    mediaStatus: 'ai-concept',
    source: 'User-supplied AI concept / New_designs.zip',
  },
  {
    id: '03',
    slug: 'midnight-concept',
    title: 'Midnight / Volume',
    category: 'Tailoring',
    description: 'Midnight blue, broad sleeves and sweeping folds explore volume and shadow.',
    images: [concepts.midnight],
    mediaStatus: 'ai-concept',
    source: 'User-supplied AI concept / New_designs.zip',
  },
];
export const media = {
  logo: {
    src: asset('/media/logo-draft.png'),
    source: 'User-supplied recreated-logo-draft.png',
    approvalStatus: 'Provisional reconstruction; owner review required',
  },
  hero: [concepts.burgundy],
  approvalStatus: 'AI-generated style concepts—not actual Dadinkowa products',
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
    mediaStatus === 'ai-concept' && reference
      ? 'Could your team create something similar? Please advise what is feasible, possible fabrics, timing and an estimate. I understand this is a concept; availability and exact reproduction are not implied.'
      : 'Please share current availability and pricing.',
  ];
  return `${business.whatsapp}?text=${encodeURIComponent(parts.filter(Boolean).join('\n'))}`;
}
