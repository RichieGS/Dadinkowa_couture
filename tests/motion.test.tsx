// @vitest-environment jsdom
import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import './setup';
import { Hero } from '../src/components/Hero';
import { media } from '../src/data';
import { heroCycle, motion } from '../src/motion';
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
  it('holds for 9 seconds after the 1.6-second transition and stops after manual selection', () => {
    vi.useFakeTimers();
    mount();
    expect(selected(1)).toBe('true');
    expect(document.querySelector('.hero-slide.is-active img')?.getAttribute('src')).toBe(
      media.hero[0].src,
    );
    act(() => vi.advanceTimersByTime(motion.heroTransition + motion.heroHold - 1));
    expect(selected(1)).toBe('true');
    act(() => vi.advanceTimersByTime(1));
    expect(selected(2)).toBe('true');
    expect(document.querySelector('.hero-slide.is-active img')?.getAttribute('src')).toBe(
      media.hero[1].src,
    );
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
    act(() => vi.advanceTimersByTime(heroCycle));
    expect(selected(1)).toBe('true');
    const play = screen.getByRole('button', { name: 'Play slideshow' });
    fireEvent.pointerDown(play);
    fireEvent.click(play);
    act(() => vi.advanceTimersByTime(heroCycle));
    expect(selected(2)).toBe('true');
  });
  it('stops after a wheel interaction elsewhere on the page', () => {
    vi.useFakeTimers();
    mount();
    fireEvent.wheel(document.body);
    act(() => vi.advanceTimersByTime(heroCycle * 3));
    expect(selected(1)).toBe('true');
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
