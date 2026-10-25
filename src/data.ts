declare global { interface Window { __DADINKOWA_ASSETS__?: Record<string,string> } }
const asset = (path:string) => window.__DADINKOWA_ASSETS__?.[path] ?? path;
export const business = {
  name: 'Dadinkowa Couture', address: 'Olofa Way, Ijagbo Offa 250101, Kwara, Nigeria',
  phone: '+234 803 389 5505', phoneRaw: '+2348033895505', whatsapp: 'https://wa.me/2348033895505',
  map: 'https://www.google.com/maps/place/DADINKOWA+COUTURE/data=!4m2!3m1!1s0x0:0x638bc22a40291caa?sa=X&ved=1t:2428&ictx=111',
  socials: { Instagram:'https://www.instagram.com/dadinkowacouture/', Facebook:'https://www.facebook.com/p/Dadinkowa-couture-100076521817343/', TikTok:'https://www.tiktok.com/@dadin.kowa.couture' },
};
export const site = { previewMode: true, headline: 'Considered style. Personal expression.', theme: { ink:'#111111', ivory:'#F5F1E9', stone:'#D8D0C4' } };
export const categories = ['All', 'Tailoring', 'Ready-to-Wear', 'Fabrics', 'Caps & Accessories'] as const;
export type Category = typeof categories[number];
export type Look = { id:string; slug:string; title:string; category:Exclude<Category,'All'>; description:string; images:{src:string;alt:string;caption:string}[]; mediaStatus:'illustration'|'approved'; source:string; };
const picture = (name:string,alt:string,caption='Original editorial illustration; not a Dadinkowa product.') => ({src:asset(`/media/${name}.svg`),alt,caption});
export const looks:Look[] = [
 {id:'01',slug:'senator-study',title:'The Senator study',category:'Tailoring',description:'A visual starting point for a conversation about native styles. Ask the team about fabrics, your preferred silhouette and current tailoring options.',images:[picture('senator','Illustration of an olive native menswear tunic'),picture('senator-detail','Enlarged neckline and pocket of the same tunic illustration','Detail of the same illustration; not evidence of brand workmanship.')],mediaStatus:'illustration',source:'Original SVG created for this preview'},
 {id:'02',slug:'fabric-rhythm',title:'A rhythm in cloth',category:'Fabrics',description:'An abstract cloth study inspired by the fabric category. Discuss available fabrics and colours directly with the team; no composition or stock is implied.',images:[picture('fabric','Abstract illustration of folded cloth in muted green tones')],mediaStatus:'illustration',source:'Original SVG created for this preview'},
 {id:'03',slug:'agbada-study',title:'Room for expression',category:'Tailoring',description:'An illustrative Agbada silhouette. The business publicly discusses fabrics for Agbada looks; ask which options are available for your idea.',images:[picture('agbada','Illustration of a wide cream Agbada silhouette'),picture('agbada-detail','Enlarged neckline of the same Agbada illustration','Detail of the same illustration; proposed styling only.')],mediaStatus:'illustration',source:'Original SVG created for this preview'},
 {id:'04',slug:'everyday-study',title:'An everyday perspective',category:'Ready-to-Wear',description:'An illustrative everyday menswear direction. Ready-to-wear is an advertised category; ask the team for its current range, sizing and pricing.',images:[picture('everyday','Illustration of an earth-brown tunic'),picture('everyday-detail','Enlarged neckline of the same brown tunic illustration','Detail of the same illustration; no product specifications implied.')],mediaStatus:'illustration',source:'Original SVG created for this preview'},
 {id:'05',slug:'finishing-note',title:'The finishing note',category:'Caps & Accessories',description:'A cap illustration to introduce the accessories conversation. Public captions mention Fila Gobi, caps, watches and accessories. Enquire for the current selection.',images:[picture('cap','Illustration of a brown cap with a patterned band'),picture('cap-detail','Enlarged band of the same cap illustration','Detail of the same illustration; not a stocked item.')],mediaStatus:'illustration',source:'Original SVG created for this preview'},
];
export const media = { logo:{src:asset('/media/logo-draft.png'),source:'User-supplied recreated-logo-draft.png',approvalStatus:'Provisional reconstruction; owner review required'}, hero:looks[0].images[0], approvalStatus:'All garment visuals are original illustrations, not brand products' };
export const socialPosts = [
 {title:'From the fabric sample book',description:'A business post featuring a fabric sample book and Senator / Agbada fabric captions.',url:'https://www.tiktok.com/@dadin.kowa.couture/video/7700201929229487367',label:'FABRIC NOTE / 01'},
 {title:'A conversation about craft',description:'A post caption about sourcing and workmanship. Footage has not been independently reviewed.',url:'https://www.tiktok.com/@dadin.kowa.couture/video/7693194083077983496',label:'ATELIER NOTE / 02'},
];
export function filterLooks(category:Category,items=looks){return category==='All'?items:items.filter(look=>look.category===category);}
export function whatsappUrl({interest='',reference='',message=''}:{interest?:string;reference?:string;message?:string}={}){
 const parts=['Hello Dadinkowa Couture,', interest && `I am interested in ${interest}.`,reference && `Preview reference: ${reference} (illustrative, not confirmed stock).`,message.trim(), 'Please share current availability and pricing.'];
 return `${business.whatsapp}?text=${encodeURIComponent(parts.filter(Boolean).join('\n'))}`;
}
