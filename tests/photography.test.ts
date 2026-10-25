// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import inventory from '../src/photo-inventory.json';
import provenance from '../photo-provenance.json';
const names = [
  'portrait',
  'cap-portrait',
  'agbada-burgundy',
  'agbada-blue',
  'sewing',
  'fabric-stack',
  'kaftan-sand',
  'kaftan-earth',
  'fabric-bronze',
];

describe('uploaded photograph integrity', () => {
  it('matches all nine unique source IDs to the named slots', () => {
    expect(Object.keys(inventory.photos).sort()).toEqual(
      [...names, ...provenance.editorialCrops.map((crop) => crop.slot)].sort(),
    );
    expect(provenance.classification).toBe('stock-reference');
    expect(new Set(provenance.matches.map((record) => record.sourceId)).size).toBe(9);
    expect(provenance.matches.map((record) => record.slot).sort()).toEqual([...names].sort());
    for (const record of provenance.matches)
      expect(record.uploadedFilename).toContain(record.sourceId);
  });
  it('ships valid responsive WebP files with recorded dimensions and integrity hashes', () => {
    for (const name of [...names, ...provenance.editorialCrops.map((crop) => crop.slot)]) {
      for (const width of [700, 1400]) {
        const file = `public/media/${name}-${width}.webp`;
        const bytes = readFileSync(file);
        expect(bytes.subarray(0, 4).toString()).toBe('RIFF');
        expect(bytes.subarray(8, 12).toString()).toBe('WEBP');
        const record = provenance.optimised.find((record) => record.path === file)!;
        expect(record).toBeTruthy();
        expect(record.width).toBe(width);
        expect(record.bytes).toBe(bytes.length);
        expect(createHash('sha256').update(bytes).digest('hex')).toBe(record.sha256);
      }
    }
  });
});
