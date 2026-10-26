// @vitest-environment jsdom
import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import './setup';
import { Home } from '../src/pages/Home';
import { concepts, looks, categoryPreviews, isGarment, whatsappUrl } from '../src/data';
const mount = () => {
  const onOpen = vi.fn();
  const view = render(
    <MemoryRouter>
      <Home onOpen={onOpen} />
    </MemoryRouter>,
  );
  return { ...view, onOpen };
};
describe('Living Atelier concept composition', () => {
  it('keeps spaced accessible headline and both actions as real HTML', () => {
    mount();
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('DADINKOWA COUTURE');
    expect(
      screen.getByText('Tailoring, fabrics and personal expression. Offa, Nigeria.'),
    ).toBeTruthy();
    expect(screen.getByRole('link', { name: /Explore the collection/ }).getAttribute('href')).toBe(
      '/#collections',
    );
    expect(screen.getByRole('heading', { name: /The art is in the detail/ })).toBeTruthy();
  });
  it('layers separate cloth and garment imagery without a flattened mockup or carousel', () => {
    const { container } = mount();
    expect(container.querySelector('.living-fabric img')?.getAttribute('src')).toBe(
      concepts.folds.src,
    );
    expect(container.querySelector('.living-garment img')?.getAttribute('src')).toBe(
      concepts.burgundy.src,
    );
    expect(container.querySelector('.living-detail-image img')?.getAttribute('src')).toBe(
      concepts.embroidery.src,
    );
    expect(container.querySelector('.hero-controls, .gallery-stage')).toBeNull();
    expect(container.querySelectorAll('.living-look')).toHaveLength(5);
    expect(new Set(looks.map((l) => l.images[0].src)).size).toBe(35);
  });
  it('has no automatic garment replacement or repeating presentation timers', () => {
    vi.useFakeTimers();
    const { container } = mount();
    const before = container.querySelector('.living-garment img')?.getAttribute('src');
    act(() => vi.advanceTimersByTime(180000));
    expect(container.querySelector('.living-garment img')?.getAttribute('src')).toBe(before);
  });
  it('opens the corresponding concept and carries it to a nearby enquiry', () => {
    const { onOpen } = mount();
    for (const look of categoryPreviews) {
      fireEvent.click(screen.getByRole('button', { name: `View concept: ${look.title}` }));
      expect(onOpen).toHaveBeenLastCalledWith(look);
    }
    const links = screen.getAllByRole('link', {
      name: /^Explore (Agbada|Ready-to-wear|Fabrics|Caps|Wristwatches)/,
    });
    links.forEach((link, i) =>
      expect(link.getAttribute('href')).toBe(
        `/lookbook?category=${encodeURIComponent(categoryPreviews[i].category)}`,
      ),
    );
  });
  it('discloses AI origin and asks about feasibility without implying stock or reproduction', () => {
    mount();
    expect(
      screen.getAllByText('AI-generated style concept—not an actual Dadinkowa product.'),
    ).toHaveLength(7);
    for (const look of looks) {
      const text = new URL(
        whatsappUrl({
          interest: look.category,
          reference: look.title,
          mediaStatus: look.mediaStatus,
        }),
      ).searchParams.get('text')!;
      expect(text).toContain(look.title);
      expect(text).toContain(
        isGarment(look.category)
          ? 'Could your team create something similar?'
          : 'Could you advise on similar available options?',
      );
      expect(text).toContain('exact reproduction');
      expect(text).not.toContain('Please share current availability');
    }
  });
});
