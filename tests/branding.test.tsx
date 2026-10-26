// @vitest-environment jsdom
import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import './setup';
import { App } from '../src/App';
const mount = () =>
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
describe('brand-led identity without duplicate announcements', () => {
  it('has one semantic brand H1 with an intact name and a separate editorial tagline', () => {
    const { container } = mount();
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('DADINKOWA COUTURE');
    expect(container.querySelector('.hero-brand-name')?.textContent).toBe('DADINKOWA');
    expect(
      container.querySelector('.hero-brand-name')?.querySelectorAll('.text-mask'),
    ).toHaveLength(1);
    expect(screen.getByText('Cloth. Form. Identity.').closest('h1')).toBeNull();
    expect(screen.getByRole('heading', { level: 1 }).querySelector('[aria-hidden]')).toBeNull();
  });
  it('names the home link once while keeping the signature immediate and logo unchanged', () => {
    mount();
    const home = screen.getByRole('link', { name: 'Dadinkowa Couture home' });
    expect(home.getAttribute('href')).toBe('/');
    expect(home.closest('.text-reveal')).toBeNull();
    expect(home.querySelector('img')?.getAttribute('src')).toBe('/media/logo-draft.png');
    expect(home.querySelector('img')?.alt).toBe('');
    expect(home.querySelector('.brand-wordmark')?.getAttribute('aria-hidden')).toBe('true');
    expect(within(home).queryByRole('img')).toBeNull();
  });
  it('identifies the edit, atelier and footer without changing essential actions', () => {
    const { container } = mount();
    expect(screen.getByRole('heading', { name: 'The Dadinkowa Edit' })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Inside Dadinkowa Couture' })).toBeTruthy();
    expect(container.querySelector('.footer-wordmark')?.textContent).toBe('DADINKOWA COUTURE');
    expect(screen.getByRole('link', { name: /Explore the collection/ })).toBeTruthy();
    expect(screen.getAllByRole('link', { name: /Discuss this style/ })).toHaveLength(3);
  });
});
