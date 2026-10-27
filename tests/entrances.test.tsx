// @vitest-environment jsdom
import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import './setup';
import { useEditorialMotion } from '../src/hooks/useMotion';
function Harness() {
  useEditorialMotion('/');
  return (
    <section data-sequence>
      <div data-sequence-part="image">Reference image</div>
      <h2 data-sequence-part="heading">Heading</h2>
      <p data-sequence-part="copy" data-reveal="text">
        Readable copy
      </p>
    </section>
  );
}
describe('coordinated entrance initialization', () => {
  it('observes one useful section portion and triggers all parts as a single persistent sequence', () => {
    let callback: IntersectionObserverCallback = () => {};
    const observe = vi.fn(),
      unobserve = vi.fn();
    let options: IntersectionObserverInit | undefined;
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
    const { container } = render(<Harness />);
    const section = container.querySelector('section')!;
    expect(observe).toHaveBeenCalledTimes(1);
    expect(observe).toHaveBeenCalledWith(section);
    expect(options?.threshold).toBe(0.22);
    expect(screen.getByText('Readable copy')).toBeTruthy();
    expect(section.className).toBe('');
    act(() =>
      callback(
        [{ target: section, isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      ),
    );
    expect(section.classList.contains('is-entered')).toBe(true);
    expect(unobserve).toHaveBeenCalledWith(section);
  });
  it('keeps content accessible when observation is unavailable', () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    const { container } = render(<Harness />);
    expect(screen.getByText('Readable copy')).toBeTruthy();
    expect(container.querySelector('section')?.getAttribute('style')).toBeNull();
  });
  it('keeps content accessible if observer construction fails', () => {
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor() {
          throw new Error('Unavailable observer');
        }
      },
    );
    render(<Harness />);
    expect(screen.getByText('Readable copy')).toBeTruthy();
  });
  it('does not initialize entrance observation when reduced motion is requested', () => {
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
    const constructor = vi.fn();
    vi.stubGlobal('IntersectionObserver', constructor);
    render(<Harness />);
    expect(constructor).not.toHaveBeenCalled();
    expect(screen.getByText('Readable copy')).toBeTruthy();
  });
});
