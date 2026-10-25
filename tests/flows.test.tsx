// @vitest-environment jsdom
import React, { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import './setup';
import { App } from '../src/App';
import { LookDialog } from '../src/components/LookDialog';
import { Photography } from '../src/components/Shared';
import { business, categories, filterLooks, looks, type Look } from '../src/data';
const mount = (path = '/') =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );

describe('working enquiry and browsing journeys', () => {
  it('filters all categories and handles empty source data', () => {
    expect(filterLooks('All')).toHaveLength(looks.length);
    for (const cat of categories.slice(1)) {
      expect(filterLooks(cat).every((look) => look.category === cat)).toBe(true);
      expect(filterLooks(cat).length).toBeGreaterThan(0);
    }
    expect(filterLooks('Fabrics', [])).toEqual([]);
  });
  it('filters the rendered lookbook and announces results', async () => {
    mount('/lookbook');
    expect(screen.getAllByRole('button', { name: /^View look:/ })).toHaveLength(looks.length);
    await userEvent.click(screen.getByRole('button', { name: 'Fabrics', exact: true }));
    expect(screen.getAllByRole('button', { name: /^View look:/ })).toHaveLength(1);
    expect(screen.getByRole('status').textContent).toContain('1 look · Fabrics');
  });
  it('enables installed-photo zoom and restores focus after animated closing', async () => {
    mount('/lookbook');
    const trigger = screen.getByRole('button', { name: `View look: ${looks[0].title}` });
    await userEvent.click(trigger);
    const dialog = screen.getByRole('dialog');
    expect(dialog.hasAttribute('open')).toBe(true);
    expect(
      (within(dialog).getByRole('button', { name: 'Next image' }) as HTMLButtonElement).disabled,
    ).toBe(true);
    await userEvent.click(within(dialog).getByRole('button', { name: '+ Zoom in' }));
    expect(
      within(dialog).getByRole('button', { name: '− Zoom out' }).getAttribute('aria-pressed'),
    ).toBe('true');
    fireEvent(dialog, new Event('cancel', { bubbles: false, cancelable: true }));
    expect(dialog.className).toContain('modal-closing');
    expect(dialog.hasAttribute('open')).toBe(true);
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
    expect(document.activeElement).toBe(trigger);
    expect(document.body.style.overflow).toBe('');
  });
  it('supports explicit and keyboard image navigation when a record has genuine multiple views', async () => {
    const fixture: Look = {
      ...looks[0],
      images: [
        { src: '/test/front.jpg', alt: 'Test garment front' },
        { src: '/test/detail.jpg', alt: 'Test garment matching detail' },
      ],
    };
    function Harness() {
      const [look, setLook] = useState<Look | null>(null);
      return (
        <>
          <button onClick={() => setLook(fixture)}>Open fixture</button>
          <LookDialog look={look} onClose={() => setLook(null)} />
        </>
      );
    }
    render(
      <MemoryRouter>
        <Harness />
      </MemoryRouter>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Open fixture' }));
    const dialog = screen.getByRole('dialog');
    await userEvent.click(within(dialog).getByRole('button', { name: 'Next image' }));
    expect(within(dialog).getByRole('img').getAttribute('alt')).toBe(
      'Test garment matching detail',
    );
    fireEvent.keyDown(dialog, { key: 'ArrowLeft' });
    expect(within(dialog).getByRole('img').getAttribute('alt')).toBe('Test garment front');
    await userEvent.click(within(dialog).getByRole('button', { name: '+ Zoom in' }));
    expect(
      within(dialog).getByRole('button', { name: '− Zoom out' }).getAttribute('aria-pressed'),
    ).toBe('true');
  });
  it('carries the selected stock reference into the WhatsApp draft', async () => {
    mount('/lookbook');
    await userEvent.click(screen.getByRole('button', { name: `View look: ${looks[0].title}` }));
    await userEvent.click(screen.getByRole('link', { name: /Enquire about this look/ }));
    expect((screen.getByLabelText(/Lookbook reference/) as HTMLSelectElement).value).toBe(
      looks[0].slug,
    );
    const open = vi.spyOn(window, 'open').mockImplementation(() => null);
    await userEvent.type(screen.getByLabelText('Your message'), 'Can we discuss an outfit?');
    await userEvent.click(screen.getByRole('button', { name: /Continue on WhatsApp/ }));
    const url = new URL(open.mock.calls[0][0] as string);
    expect(url.origin + url.pathname).toBe(business.whatsapp);
    expect(url.searchParams.get('text')).toContain(looks[0].title);
    expect(url.searchParams.get('text')).toContain(
      'reference photography, not a Dadinkowa product',
    );
    expect(screen.getByText(/Nothing has been sent/)).toBeTruthy();
    expect(document.body.style.overflow).toBe('');
  });
  it('rejects whitespace messages and never opens WhatsApp', async () => {
    mount('/contact');
    const open = vi.spyOn(window, 'open').mockImplementation(() => null);
    await userEvent.type(screen.getByLabelText('Your message'), '   ');
    fireEvent.submit(screen.getByRole('button', { name: /Continue on WhatsApp/ }).closest('form')!);
    expect(screen.getByRole('alert').textContent).toContain('Tell the team');
    expect(open).not.toHaveBeenCalled();
  });
  it('opens the menu and releases focus containment on navigation', async () => {
    mount();
    await userEvent.click(screen.getByRole('button', { name: /Menu/ }));
    const dialog = screen.getByRole('dialog');
    await userEvent.click(within(dialog).getByRole('link', { name: 'Collections' }));
    expect(screen.getByRole('heading', { level: 1 }).textContent).toContain('Cloth. Form.');
    expect(dialog.hasAttribute('open')).toBe(false);
    expect(document.body.style.overflow).toBe('');
  });
  it('shows an explicit pending slot without requesting a missing photograph', () => {
    const view = render(
      <Photography
        src="/pending.webp"
        alt="Expected photograph"
        available={false}
        slot="portrait"
      />,
    );
    expect(screen.getByText('Photography pending')).toBeTruthy();
    expect(view.container.querySelector('img')).toBeNull();
  });
  it('keeps a usable fallback when an installed photograph fails', () => {
    render(<Photography src="/broken.webp" alt="Expected photograph" />);
    fireEvent.error(screen.getByRole('img'));
    expect(screen.getByText('Photography unavailable')).toBeTruthy();
  });
  it('has one H1 and verified directions on every route', () => {
    for (const path of ['/', '/lookbook', '/contact']) {
      const view = mount(path);
      expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
      expect(
        screen.getAllByRole('link').some((link) => link.getAttribute('href') === business.map),
      ).toBe(true);
      view.unmount();
    }
  });
});
