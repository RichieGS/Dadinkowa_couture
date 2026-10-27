// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import provenance from '../concept-provenance.json';
import generated from '../generation-provenance.json';
describe('supplied concept image delivery', () => {
  it('ships exactly five concepts in two responsive sizes with six alpha-bearing garment WebPs', () => {
    expect(provenance.assets).toHaveLength(5);
    expect(provenance.assets.flatMap((a) => a.variants).filter((v) => v.alpha)).toHaveLength(6);
    expect(
      readdirSync('public/media')
        .filter((f) => f.endsWith('.webp'))
        .sort(),
    ).toEqual(
      [
        ...provenance.assets.flatMap((a) => a.variants.map((v) => v.file.split('/').pop())),
        ...generated.assets.flatMap((a) => a.variants.map((v) => v.path.split('/').pop())),
      ].sort(),
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

it('delivers 32 newly generated individual concepts with unique source hashes and two intact variants each', () => {
  expect(generated.assets).toHaveLength(32);
  expect(new Set(generated.assets.map((a) => a.sourceSha256)).size).toBe(32);
  const counts = Object.fromEntries(
    ['Agbada', 'Ready-to-wear', 'Fabrics', 'Caps', 'Wristwatches'].map((c) => [
      c,
      generated.assets.filter((a) => a.category === c).length,
    ]),
  );
  expect(counts).toEqual({ Agbada: 5, 'Ready-to-wear': 6, Fabrics: 7, Caps: 7, Wristwatches: 7 });
  for (const entry of generated.assets) {
    expect(entry.tool).toBe('image_gen.imagegen');
    expect(entry.prompt.length).toBeGreaterThan(100);
    expect(entry.variants).toHaveLength(2);
    for (const variant of entry.variants) {
      const bytes = readFileSync(variant.path);
      expect(bytes.length).toBe(variant.bytes);
      expect(bytes.subarray(8, 12).toString()).toBe('WEBP');
    }
  }
});
