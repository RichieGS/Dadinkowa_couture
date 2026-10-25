export type MediaStatus = 'ai-concept' | 'illustration' | 'stock-reference' | 'approved-brand';

export function mediaCopy(status: MediaStatus) {
  switch (status) {
    case 'ai-concept':
      return {
        short: 'AI style concept',
        disclosure: 'AI-generated style concept—not an actual Dadinkowa product.',
        reference: 'AI-generated style concept—not an actual Dadinkowa product',
      };
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
