// @vitest-environment jsdom
import React from 'react';
import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { BrowserRouter, HashRouter, useLocation } from 'react-router-dom';
import './setup';
import { App } from '../src/App';
function Probe() {
  const location = useLocation();
  return (
    <output data-testid="location">
      {location.pathname}
      {location.hash}
    </output>
  );
}

describe.each(['browser', 'hash'])('%s routing', (mode) => {
  const mount = (path = '/') => {
    window.history.replaceState({}, '', mode === 'hash' ? `/#${path}` : path);
    const Router = mode === 'hash' ? HashRouter : BrowserRouter;
    return render(
      <Router>
        <App />
        <Probe />
      </Router>,
    );
  };
  it('skips to content without replacing the router fragment', () => {
    mount('/lookbook');
    const before = window.location.href;
    fireEvent.click(screen.getByRole('link', { name: 'Skip to content' }));
    expect(screen.getByTestId('location').textContent).toBe('/lookbook');
    expect(window.location.href).toBe(before);
    expect(document.activeElement?.id).toBe('main');
  });
  it('scrolls to collections without navigating to a missing route', () => {
    mount();
    fireEvent.click(screen.getByRole('link', { name: /Explore the collection/ }));
    expect(screen.getByTestId('location').textContent).toBe('/');
    expect(document.activeElement?.id).toBe('collections');
    expect(document.activeElement?.scrollIntoView).toHaveBeenCalled();
    expect(screen.queryByText('This page could not be found.')).toBeNull();
  });
  it('reaches Atelier from another route', async () => {
    mount('/contact');
    fireEvent.click(
      within(screen.getByRole('navigation', { name: 'Main navigation' })).getByRole('link', {
        name: 'Atelier',
      }),
    );
    await waitFor(() => expect(document.activeElement?.id).toBe('atelier'));
    expect(screen.getByTestId('location').textContent).toBe('/#atelier');
    expect(screen.getByRole('heading', { level: 1 }).textContent).toContain('DADINKOWA COUTURE');
  });
});
