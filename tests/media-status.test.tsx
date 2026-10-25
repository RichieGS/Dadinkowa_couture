// @vitest-environment jsdom
import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import './setup';
import { mediaCopy, type MediaStatus } from '../src/media';
import { business, looks, whatsappUrl } from '../src/data';
import { LookCard } from '../src/components/LookCard';
import { LookDialog } from '../src/components/LookDialog';

const statuses: MediaStatus[] = ['illustration', 'stock-reference', 'approved-brand'];
describe.each(statuses)('%s media status', (status) => {
  it('uses its own disclosure on the card', () => {
    const { container } = render(
      <MemoryRouter>
        <LookCard look={{ ...looks[0], mediaStatus: status }} onOpen={() => {}} />
      </MemoryRouter>,
    );
    const notice = mediaCopy(status).disclosure;
    expect(container.querySelector('.media-label')?.textContent ?? '').toBe(notice);
    if (status === 'approved-brand')
      expect(container.textContent).not.toMatch(/illustrati|stock|reference photography/i);
  });
  it('uses its own notice in the detail viewer', () => {
    render(
      <MemoryRouter>
        <LookDialog look={{ ...looks[0], mediaStatus: status }} onClose={() => {}} />
      </MemoryRouter>,
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog.querySelector('.media-label')?.textContent ?? '').toBe(
      mediaCopy(status).disclosure,
    );
  });
  it('builds a correctly qualified and encoded WhatsApp reference', () => {
    const url = new URL(
      whatsappUrl({
        interest: 'Caps & Accessories',
        reference: 'Àṣọ + fit #1',
        mediaStatus: status,
        message: 'Blue & cream?\nNext line',
      }),
    );
    expect(url.origin + url.pathname).toBe(business.whatsapp);
    const text = url.searchParams.get('text')!;
    expect(text).toContain(mediaCopy(status).reference);
    expect(text).toContain('Àṣọ + fit #1');
    expect(text).toContain('Blue & cream?\nNext line');
    if (status === 'approved-brand')
      expect(text).not.toMatch(/illustrati|stock-reference|reference photography|not a Dadinkowa/i);
  });
});
it('does not invent stock, price, or multi-view details', () => {
  for (const look of looks) {
    expect(look.mediaStatus).toBe('stock-reference');
    expect(look.images).toHaveLength(1);
    expect(look).not.toHaveProperty('price');
    expect(look).not.toHaveProperty('stock');
  }
});
