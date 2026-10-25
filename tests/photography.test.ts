// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import provenance from '../concept-provenance.json';
describe('supplied concept image delivery', () => {
  it('ships exactly five concepts in two responsive sizes with six alpha-bearing garment WebPs', () => {
    expect(provenance.assets).toHaveLength(5);
    expect(provenance.assets.flatMap((a) => a.variants).filter((v) => v.alpha)).toHaveLength(6);
    expect(
      readdirSync('public/media')
        .filter((f) => f.endsWith('.webp'))
        .sort(),
    ).toEqual(
      provenance.assets.flatMap((a) => a.variants.map((v) => v.file.split('/').pop())).sort(),
    );
    for (const asset of provenance.assets) {
      expect(asset.mediaStatus).toBe('ai-concept');
      expect(asset.variants).toHaveLength(2);
      for (const record of asset.variants) {
        const bytes = readFileSync(record.file);
        expect(bytes.subarray(0, 4).toString()).toBe('RIFF');
        expect(bytes.subarray(8, 12).toString()).toBe('WEBP');
        expect(bytes.length).toBe(record.bytes);
        if (record.alpha) expect(bytes.includes(Buffer.from('ALPH'))).toBe(true);
      }
    }
  });
});
