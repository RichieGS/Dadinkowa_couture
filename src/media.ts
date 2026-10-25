export type MediaStatus = 'illustration' | 'stock-reference' | 'approved-brand';

export function mediaCopy(status: MediaStatus) {
  switch (status) {
    case 'illustration':
      return {
        short: 'Illustrative preview',
        disclosure: 'Illustrative preview — not a Dadinkowa product.',
        reference: 'illustrative, not confirmed stock',
      };
    case 'stock-reference':
      return {
        short: 'Style inspiration',
        disclosure: 'Style inspiration — reference photography, not Dadinkowa products.',
        reference:
          'style inspiration — reference photography, not a Dadinkowa product or confirmed stock',
      };
    case 'approved-brand':
      return {
        short: 'Dadinkowa Couture',
        disclosure: '',
        reference: 'Dadinkowa Couture look; availability to be confirmed',
      };
  }
}
