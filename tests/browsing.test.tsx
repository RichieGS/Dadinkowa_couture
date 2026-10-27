// @vitest-environment jsdom
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, HashRouter, MemoryRouter, useLocation } from 'react-router-dom';
import './setup';
import { App } from '../src/App';
import { filterLooks } from '../src/data';
function Probe() {
  const location = useLocation();
  return (
    <output data-testid="browse-route">
      {location.pathname}
      {location.search}
    </output>
  );
}

describe.each(['browser', 'hash'])('%s collection history and stable results', (mode) => {
  it('keeps counts/URL/back-forward in sync without replacing surviving cards', async () => {
    window.history.replaceState({}, '', mode === 'hash' ? '/#/lookbook' : '/lookbook');
    const Router = mode === 'hash' ? HashRouter : BrowserRouter;
    const view = render(
      <Router>
        <App />
        <Probe />
      </Router>,
    );
    const grid = view.container.querySelector('.lookbook-grid');
    const first = view.container.querySelector('.look-card');
    await userEvent.click(screen.getByRole('button', { name: 'Agbada (7)' }));
    expect(screen.getByTestId('browse-route').textContent).toBe('/lookbook?category=Agbada');
    expect(view.container.querySelector('.lookbook-grid') === grid).toBe(true);
    expect(view.container.querySelector('.look-card') === first).toBe(true);
    expect(document.activeElement).toBe(
      screen.getByRole('heading', { name: 'Agbada', exact: true }),
    );
    expect(document.activeElement?.scrollIntoView).toHaveBeenCalled();
    fireEvent.change(screen.getByLabelText('Collection category'), { target: { value: 'Caps' } });
    expect(screen.getAllByRole('button', { name: /^View look:/ })).toHaveLength(7);
    expect(screen.getByTestId('browse-route').textContent).toBe('/lookbook?category=Caps');
    window.history.back();
    await waitFor(() =>
      expect(screen.getByTestId('browse-route').textContent).toBe('/lookbook?category=Agbada'),
    );
    expect((screen.getByLabelText('Collection category') as HTMLSelectElement).value).toBe(
      'Agbada',
    );
    window.history.forward();
    await waitFor(() =>
      expect(screen.getByTestId('browse-route').textContent).toBe('/lookbook?category=Caps'),
    );
    expect(screen.getByRole('button', { name: 'Caps (7)' }).getAttribute('aria-pressed')).toBe(
      'true',
    );
  });
});

it('keeps close/enquiry outside scrolling content, deduplicates notices and restores category/focus/position', async () => {
  const view = render(
    <MemoryRouter initialEntries={['/lookbook?category=Caps']}>
      <App />
      <Probe />
    </MemoryRouter>,
  );
  const look = filterLooks('Caps')[0];
  const trigger = screen.getByRole('button', { name: `View look: ${look.title}` });
  vi.stubGlobal('scrollY', 912);
  vi.stubGlobal('scrollX', 0);
  await userEvent.click(trigger);
  const dialog = screen.getByRole('dialog');
  const close = within(dialog).getByRole('button', { name: 'Close look details' });
  const enquiry = within(dialog).getByRole('link', { name: /Enquire about similar options/ });
  expect(close.closest('.dialog-header')).toBeTruthy();
  expect(enquiry.closest('.dialog-footer')).toBeTruthy();
  expect(dialog.querySelector('.dialog-scroll-body')?.contains(close)).toBe(false);
  expect(dialog.querySelector('.dialog-scroll-body')?.contains(enquiry)).toBe(false);
  expect(
    within(dialog).getAllByText('AI-generated style concept—not an actual Dadinkowa product.'),
  ).toHaveLength(1);
  expect(within(dialog).queryByRole('button', { name: 'Previous image' })).toBeNull();
  expect(within(dialog).queryByRole('button', { name: 'Next image' })).toBeNull();
  expect(dialog.querySelector('.image-caption')).toBeNull();
  expect(document.body.style.overflow).toBe('hidden');
  const scroller = dialog.querySelector('.dialog-scroll-body')!;
  scroller.scrollTop = 400;
  fireEvent.scroll(scroller);
  await userEvent.click(close);
  await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
  expect(document.activeElement).toBe(trigger);
  expect(document.body.style.overflow).toBe('');
  expect(window.scrollTo).toHaveBeenLastCalledWith({ left: 0, top: 912, behavior: 'instant' });
  expect(screen.getByTestId('browse-route').textContent).toBe('/lookbook?category=Caps');
  const card = view.container.querySelector('.look-card');
  fireEvent.scroll(window);
  fireEvent.scroll(window);
  expect(view.container.querySelector('.look-card') === card).toBe(true);
  expect(card?.hasAttribute('data-reveal')).toBe(false);
});
