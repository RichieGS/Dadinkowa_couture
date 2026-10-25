// @vitest-environment jsdom
import React from 'react';
import { act, fireEvent, render, renderHook, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import './setup';
import { useStagedHero } from '../src/hooks/useStagedHero';
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
const photo = () => document.querySelector('.hero-slide img')?.getAttribute('src');
const phase = () => document.querySelector('.hero-art')?.getAttribute('data-phase');
const advance = (ms: number) => act(() => vi.advanceTimersByTime(ms));

describe('single-photograph staged hero state, not rendered animation quality', () => {
  it('connects hero navigation to decoded-image readiness before covering the current image', async () => {
    vi.useFakeTimers();
    const resolve: Array<() => void> = [];
    vi.stubGlobal(
      'Image',
      class {
        sizes = '';
        srcset = '';
        src = '';
        decode() {
          return new Promise<void>((done) => resolve.push(done));
        }
      },
    );
    mount();
    fireEvent.click(screen.getByRole('button', { name: 'Show hero photograph 2' }));
    expect(phase()).toBe('waiting');
    expect(photo()).toBe(media.hero[0].src);
    await act(async () => resolve[1]());
    expect(phase()).toBe('covering');
    advance(motion.heroCover);
    expect(photo()).toBe(media.hero[1].src);
  });

  it('keeps the current garment while decoding and ignores stale readiness promises', async () => {
    vi.useFakeTimers();
    const resolve: Array<() => void> = [];
    const pending = [0, 1, 2].map(
      (_, index) =>
        new Promise<void>((done) => {
          resolve[index] = done;
        }),
    );
    const prepare = (index: number) => pending[index];
    const hook = renderHook(() => useStagedHero(3, false, prepare));
    act(() => hook.result.current.request(1));
    expect(hook.result.current.phase).toBe('waiting');
    expect(hook.result.current.displayed).toBe(0);
    act(() => hook.result.current.request(2));
    await act(async () => resolve[1]());
    expect(hook.result.current.phase).toBe('waiting');
    await act(async () => resolve[2]());
    expect(hook.result.current.phase).toBe('covering');
    advance(motion.heroCover);
    expect(hook.result.current.displayed).toBe(2);
    advance(motion.heroTransition - motion.heroCover);
    expect(hook.result.current.phase).toBe('settled');
  });

  it('covers before changing the sole image and holds for 9 seconds after settling', () => {
    vi.useFakeTimers();
    mount();
    advance(motion.heroHold - 1);
    expect(phase()).toBe('settled');
    expect(photo()).toBe(media.hero[0].src);
    advance(1);
    expect(phase()).toBe('covering');
    expect(photo()).toBe(media.hero[0].src);
    expect(selected(2)).toBe('true');
    expect(document.querySelectorAll('.hero-art img')).toHaveLength(1);
    advance(motion.heroCover - 1);
    expect(photo()).toBe(media.hero[0].src);
    advance(1);
    expect(phase()).toBe('revealing');
    expect(photo()).toBe(media.hero[1].src);
    expect(document.querySelectorAll('.hero-art img')).toHaveLength(1);
    advance(motion.heroTransition - motion.heroCover);
    expect(phase()).toBe('settled');
    advance(motion.heroHold - 1);
    expect(phase()).toBe('settled');
    advance(1);
    expect(phase()).toBe('covering');
    expect(selected(3)).toBe('true');
  });
  it('replaces rapid requests without stacking slides, stale callbacks or partial final states', () => {
    vi.useFakeTimers();
    mount();
    fireEvent.click(screen.getByRole('button', { name: 'Show hero photograph 2' }));
    advance(100);
    fireEvent.click(screen.getByRole('button', { name: 'Show hero photograph 3' }));
    advance(motion.heroCover);
    expect(photo()).toBe(media.hero[2].src);
    expect(phase()).toBe('revealing');
    fireEvent.click(screen.getByRole('button', { name: 'Previous hero photograph' }));
    advance(motion.heroTransition);
    expect(photo()).toBe(media.hero[1].src);
    expect(phase()).toBe('settled');
    expect(document.querySelectorAll('.hero-art img')).toHaveLength(1);
    advance(heroCycle * 3);
    expect(photo()).toBe(media.hero[1].src);
    expect(phase()).toBe('settled');
  });
  it('cancels a pending request when the current photograph is selected again', () => {
    vi.useFakeTimers();
    mount();
    fireEvent.click(screen.getByRole('button', { name: 'Show hero photograph 2' }));
    fireEvent.click(screen.getByRole('button', { name: 'Show hero photograph 1' }));
    advance(heroCycle);
    expect(photo()).toBe(media.hero[0].src);
    expect(phase()).toBe('settled');
  });
  it('pauses and resumes from a settled reading period using the visible pointer control', () => {
    vi.useFakeTimers();
    mount();
    const pause = screen.getByRole('button', { name: 'Pause slideshow' });
    fireEvent.pointerDown(pause);
    fireEvent.click(pause);
    advance(heroCycle);
    expect(selected(1)).toBe('true');
    const play = screen.getByRole('button', { name: 'Play slideshow' });
    fireEvent.pointerDown(play);
    fireEvent.click(play);
    advance(motion.heroHold);
    expect(phase()).toBe('covering');
    advance(motion.heroTransition);
    expect(photo()).toBe(media.hero[1].src);
  });
  it('stops automatic advance after a wheel interaction elsewhere on the page', () => {
    vi.useFakeTimers();
    mount();
    fireEvent.wheel(document.body);
    advance(heroCycle * 3);
    expect(selected(1)).toBe('true');
  });
  it('stops when a visitor focuses a CTA', () => {
    vi.useFakeTimers();
    mount();
    fireEvent.focus(screen.getByRole('link', { name: /Explore the edit/ }));
    advance(heroCycle * 2);
    expect(selected(1)).toBe('true');
  });
  it('settles an in-flight wipe when the tab is hidden and requires explicit restart', () => {
    vi.useFakeTimers();
    mount();
    advance(motion.heroHold);
    expect(phase()).toBe('covering');
    vi.spyOn(document, 'hidden', 'get').mockReturnValue(true);
    fireEvent(document, new Event('visibilitychange'));
    expect(phase()).toBe('settled');
    expect(photo()).toBe(media.hero[1].src);
    advance(heroCycle * 3);
    expect(photo()).toBe(media.hero[1].src);
    expect(screen.getByRole('button', { name: 'Play slideshow' })).toBeTruthy();
  });
  it('provides immediate static manual navigation and no automatic schedule under reduced motion', () => {
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
    advance(heroCycle * 3);
    expect(selected(1)).toBe('true');
    expect(
      (screen.getByRole('button', { name: 'Play slideshow' }) as HTMLButtonElement).disabled,
    ).toBe(true);
    fireEvent.click(screen.getByRole('button', { name: 'Next hero photograph' }));
    expect(phase()).toBe('settled');
    expect(photo()).toBe(media.hero[1].src);
  });
  it('allows another photograph to recover after an image-loading failure', () => {
    vi.useFakeTimers();
    mount();
    fireEvent.error(document.querySelector('.hero-art img')!);
    expect(screen.getByText('Photography unavailable')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Next hero photograph' }));
    advance(motion.heroTransition);
    expect(photo()).toBe(media.hero[1].src);
    expect(screen.queryByText('Photography unavailable')).toBeNull();
  });
});
