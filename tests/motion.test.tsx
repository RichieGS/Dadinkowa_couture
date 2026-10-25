// @vitest-environment jsdom
import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import './setup';
import { Hero } from '../src/components/Hero';
const mount = () =>
  render(
    <MemoryRouter>
      <Hero />
    </MemoryRouter>,
  );
const selected = (number: number) =>
  screen
    .getByRole('button', { name: `Show hero photograph ${number}` })
    .getAttribute('aria-pressed');

describe('hero motion scheduling in DOM simulation', () => {
  it('advances at 6.5 seconds and pauses after manual slide selection', () => {
    vi.useFakeTimers();
    mount();
    expect(selected(1)).toBe('true');
    act(() => vi.advanceTimersByTime(6500));
    expect(selected(2)).toBe('true');
    fireEvent.click(screen.getByRole('button', { name: 'Show hero photograph 3' }));
    act(() => vi.advanceTimersByTime(20000));
    expect(selected(3)).toBe('true');
    expect(screen.getByRole('button', { name: 'Play slideshow' })).toBeTruthy();
  });
  it('pauses and resumes using the visible control including pointer interaction', () => {
    vi.useFakeTimers();
    mount();
    const pause = screen.getByRole('button', { name: 'Pause slideshow' });
    fireEvent.pointerDown(pause);
    fireEvent.click(pause);
    act(() => vi.advanceTimersByTime(6500));
    expect(selected(1)).toBe('true');
    const play = screen.getByRole('button', { name: 'Play slideshow' });
    fireEvent.pointerDown(play);
    fireEvent.click(play);
    act(() => vi.advanceTimersByTime(6500));
    expect(selected(2)).toBe('true');
  });
  it('stops when the visitor focuses a CTA', () => {
    vi.useFakeTimers();
    mount();
    fireEvent.focus(screen.getByRole('link', { name: /Explore the edit/ }));
    act(() => vi.advanceTimersByTime(13000));
    expect(selected(1)).toBe('true');
  });
  it('stops on hidden tabs and requires an explicit restart', () => {
    vi.useFakeTimers();
    mount();
    vi.spyOn(document, 'hidden', 'get').mockReturnValue(true);
    fireEvent(document, new Event('visibilitychange'));
    act(() => vi.advanceTimersByTime(13000));
    expect(selected(1)).toBe('true');
    expect(screen.getByRole('button', { name: 'Play slideshow' })).toBeTruthy();
  });
  it('disables auto-advance and the play control for reduced motion', () => {
    vi.useFakeTimers();
    window.matchMedia = vi.fn((query) => ({
      matches: query.includes('prefers-reduced-motion'),
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
    mount();
    act(() => vi.advanceTimersByTime(20000));
    expect(selected(1)).toBe('true');
    expect(
      (screen.getByRole('button', { name: 'Play slideshow' }) as HTMLButtonElement).disabled,
    ).toBe(true);
    fireEvent.click(screen.getByRole('button', { name: 'Next hero photograph' }));
    expect(selected(2)).toBe('true');
  });
});
