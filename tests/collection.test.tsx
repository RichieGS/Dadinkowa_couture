// @vitest-environment jsdom
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useLocation } from 'react-router-dom';
import './setup';
import { App } from '../src/App';
import { categories, looks, filterLooks, enquiryLabel, isGarment } from '../src/data';
function Probe() {
  const location = useLocation();
  return (
    <output data-testid="route">
      {location.pathname}
      {location.search}
    </output>
  );
}
const mount = (path = '/lookbook') =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
      <Probe />
    </MemoryRouter>,
  );
describe('complete inspiration collection', () => {
  it('contains 35 unique IDs, references and single-source concepts with seven in each category', () => {
    expect(looks).toHaveLength(35);
    for (const key of ['id', 'slug'] as const)
      expect(new Set(looks.map((l) => l[key])).size).toBe(35);
    expect(new Set(looks.map((l) => l.images[0].src)).size).toBe(35);
    for (const category of categories.slice(1)) expect(filterLooks(category)).toHaveLength(7);
    for (const look of looks) {
      expect(look.mediaStatus).toBe('ai-concept');
      expect(look.images).toHaveLength(1);
      expect(look.images[0].alt.length).toBeGreaterThan(20);
      expect(look.images[0].srcSet).toContain('500w');
      expect(look).not.toHaveProperty('price');
      expect(look).not.toHaveProperty('stock');
    }
  });
  it('provides counted filters and a shareable category query when clicked', async () => {
    mount();
    expect(screen.getAllByRole('button', { name: /^View look:/ })).toHaveLength(35);
    expect(screen.getByRole('button', { name: 'All (35)' })).toBeTruthy();
    await userEvent.click(screen.getByRole('button', { name: 'Wristwatches (7)' }));
    expect(screen.getByTestId('route').textContent).toBe('/lookbook?category=Wristwatches');
    expect(screen.getAllByRole('button', { name: /^View look:/ })).toHaveLength(7);
  });
  it.each(categories.slice(1))(
    'opens direct %s URLs with seven usable concepts and correct enquiries',
    async (category) => {
      const view = mount(`/lookbook?category=${encodeURIComponent(category)}`);
      expect(
        screen.getByRole('button', { name: `${category} (7)` }).getAttribute('aria-pressed'),
      ).toBe('true');
      expect(screen.getAllByRole('button', { name: /^View look:/ })).toHaveLength(7);
      const look = filterLooks(category)[0];
      await userEvent.click(screen.getByRole('button', { name: `View look: ${look.title}` }));
      const dialog = screen.getByRole('dialog');
      await userEvent.click(
        within(dialog).getByRole('link', { name: new RegExp(enquiryLabel(category)) }),
      );
      expect((screen.getByLabelText(/Lookbook reference/) as HTMLSelectElement).value).toBe(
        look.slug,
      );
      const open = vi.spyOn(window, 'open').mockImplementation(() => null);
      await userEvent.type(
        screen.getByLabelText('Your message'),
        'Please advise on similar options.',
      );
      await userEvent.click(screen.getByRole('button', { name: /Continue on WhatsApp/ }));
      const text = new URL(open.mock.calls[0][0] as string).searchParams.get('text')!;
      expect(text).toContain(category);
      expect(text).toContain(look.id);
      expect(text).toContain(look.title);
      expect(text).toContain('AI-generated style concept');
      expect(text).toContain(
        isGarment(category)
          ? 'Could your team create something similar?'
          : 'Could you advise on similar available options?',
      );
      view.unmount();
    },
  );
});
