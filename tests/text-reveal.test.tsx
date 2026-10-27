// @vitest-environment jsdom
import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import './setup';
import { TextReveal, RevealHeading, measureRevealLines } from '../src/components/TextReveal';
function Harness() {
  return (
    <TextReveal>
      <RevealHeading as="h2">
        Cloth. Form. <i>Identity.</i>
      </RevealHeading>
      <p>Readable supporting copy.</p>
      <button>Immediate control</button>
    </TextReveal>
  );
}
function setup(top = 900) {
  let position = top;
  let callback: IntersectionObserverCallback = () => {};
  const observe = vi.fn(),
    unobserve = vi.fn();
  let options: IntersectionObserverInit | undefined;
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(() => ({
    top: position,
    bottom: position + 100,
    left: 0,
    right: 300,
    width: 300,
    height: 100,
    x: 0,
    y: position,
    toJSON() {},
  }));
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      constructor(cb: IntersectionObserverCallback, opts: IntersectionObserverInit) {
        callback = cb;
        options = opts;
      }
      observe = observe;
      unobserve = unobserve;
      disconnect() {}
    },
  );
  const view = render(<Harness />);
  const group = view.container.querySelector('.text-reveal') as HTMLElement;
  const heading = screen.getByRole('heading');
  return {
    ...view,
    group,
    heading,
    observe,
    unobserve,
    options,
    get callback() {
      return callback;
    },
    move(y: number, intersects = true) {
      position = y;
      act(() =>
        callback(
          [
            {
              target: heading,
              isIntersecting: intersects,
              boundingClientRect: heading.getBoundingClientRect(),
            } as IntersectionObserverEntry,
          ],
          {} as IntersectionObserver,
        ),
      );
    },
  };
}
describe('single-copy line reveal lifecycle (not visual pacing)', () => {
  it('observes the heading at 83%, preserves spaces/italics and leaves controls outside animation', () => {
    const v = setup();
    expect(v.observe).toHaveBeenCalledWith(v.heading);
    expect(v.options?.rootMargin).toBe('0px 0px -17% 0px');
    expect(v.group.dataset.textState).toBe('pending');
    expect(v.heading.textContent).toBe('Cloth. Form. Identity.');
    expect(v.heading.querySelector('i')?.textContent).toBe('Identity.');
    expect(v.heading.querySelector('[aria-hidden]')).toBeNull();
    expect(screen.getAllByText('Identity.')).toHaveLength(1);
    expect(screen.getByRole('button').hasAttribute('disabled')).toBe(false);
  });
  it('assigns a shared delay to each rendered line and caps long sequences at 1800ms', () => {
    const v = setup();
    const words = [...v.heading.querySelectorAll<HTMLElement>('.text-mask')];
    words.forEach((word, i) =>
      Object.defineProperty(word, 'offsetTop', { configurable: true, value: i < 2 ? 0 : 60 }),
    );
    measureRevealLines(v.heading);
    expect(words.map((w) => w.style.getPropertyValue('--line-delay'))).toEqual([
      '0ms',
      '0ms',
      '200ms',
    ]);
  });
  it('enters once, survives same-width resize and finishes permanently after 1.8 seconds', () => {
    vi.useFakeTimers();
    const v = setup();
    v.move(400);
    expect(v.group.dataset.textState).toBe('entering');
    fireEvent.resize(window);
    expect(v.group.dataset.textState).toBe('entering');
    act(() => vi.advanceTimersByTime(1800));
    expect(v.group.dataset.textState).toBe('complete');
    v.move(900, false);
    v.move(400);
    expect(v.group.dataset.textState).toBe('complete');
    expect(v.unobserve).toHaveBeenCalledWith(v.heading);
  });
  it('shows final state when an observer reports the heading already above the viewport', () => {
    const v = setup();
    v.move(-200, false);
    expect(v.group.dataset.textState).toBe('complete');
  });
  it('finishes an active reveal on a real width change without hiding it again', () => {
    const v = setup();
    v.move(400);
    Object.defineProperty(v.heading, 'clientWidth', { configurable: true, value: 250 });
    fireEvent.resize(window);
    expect(v.group.dataset.textState).toBe('complete');
    fireEvent.resize(window);
    expect(v.group.dataset.textState).toBe('complete');
  });
  it('finishes immediately when reduced motion changes while open and never re-arms', () => {
    let reduced = false;
    let change = () => {};
    window.matchMedia = vi.fn(() => ({
      get matches() {
        return reduced;
      },
      media: '',
      onchange: null,
      addEventListener: (_type: string, fn: () => void) => {
        change = fn;
      },
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
    const v = setup();
    v.move(400);
    act(() => {
      reduced = true;
      change();
    });
    expect(v.group.dataset.textState).toBe('complete');
    act(() => {
      reduced = false;
      change();
    });
    expect(v.group.dataset.textState).toBe('complete');
  });
  it('leaves unenhanced text visible without IntersectionObserver or on construction failure', () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    let v = render(<Harness />);
    expect(v.container.querySelector('.text-reveal')?.hasAttribute('data-text-state')).toBe(false);
    v.unmount();
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor() {
          throw Error('unavailable');
        }
      },
    );
    v = render(<Harness />);
    expect(v.container.querySelector('.text-reveal')?.getAttribute('data-text-state')).toBe(
      'complete',
    );
  });
  it('resolves a fast scroll jump to the final state even before observer delivery', () => {
    const v = setup();
    v.move(400, false);
    vi.stubGlobal('scrollY', 2000);
    fireEvent.scroll(window);
    expect(v.group.dataset.textState).toBe('complete');
  });
  it('remeasures after font readiness without cancelling an unchanged initial entrance', async () => {
    let resolve = () => {};
    const ready = new Promise<void>((done) => {
      resolve = done;
    });
    let loaded = () => {};
    vi.stubGlobal('document', document);
    Object.defineProperty(document, 'fonts', {
      configurable: true,
      value: {
        ready,
        addEventListener: (_type: string, fn: () => void) => {
          loaded = fn;
        },
        removeEventListener: vi.fn(),
      },
    });
    const v = setup(400);
    await act(async () => resolve());
    expect(v.group.dataset.textState).toBe('entering');
    const word = v.heading.querySelector('.text-mask')!;
    Object.defineProperty(word, 'offsetTop', { configurable: true, value: 80 });
    act(() => loaded());
    // Moving a single word to a new line changes grouping and resolves the animation.
    expect(v.group.dataset.textState).toBe('complete');
    delete (document as unknown as { fonts?: unknown }).fonts;
  });
});
