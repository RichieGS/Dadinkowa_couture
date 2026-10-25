// @vitest-environment jsdom
import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import './setup';
import { GarmentGallery, galleryLooks } from '../src/components/GarmentGallery';

const mount = () => {
  const open = vi.fn();
  const view = render(<GarmentGallery onOpen={open} />);
  return {
    ...view,
    open,
    region: view.container.querySelector('#garment-gallery')!,
    stage: view.container.querySelector('.gallery-stage')!,
  };
};
const current = () =>
  document.querySelector('.gallery-panel[data-position=current] img')?.getAttribute('src');

describe('manual Garment Gallery', () => {
  it('starts with a large central photo and recessed neighbours; captions stay outside all tilting layers', () => {
    const { container } = mount();
    expect(container.querySelectorAll('.gallery-panel')).toHaveLength(3);
    expect(current()).toBe(galleryLooks[1].images[0].src);
    expect(container.querySelector('.gallery-photo .gallery-caption')).toBeNull();
    expect(container.querySelector('.gallery-caption .gallery-controls')).toBeTruthy();
    expect(screen.getByText(/One reference view per look/)).toBeTruthy();
  });
  it('moves immediately with previous/next controls, wraps and opens the correct look', () => {
    const { open } = mount();
    fireEvent.click(screen.getByRole('button', { name: 'Next gallery look' }));
    expect(current()).toBe(galleryLooks[2].images[0].src);
    fireEvent.click(screen.getByRole('button', { name: 'Next gallery look' }));
    expect(current()).toBe(galleryLooks[0].images[0].src);
    fireEvent.click(screen.getByRole('button', { name: 'Previous gallery look' }));
    expect(current()).toBe(galleryLooks[2].images[0].src);
    fireEvent.click(screen.getByRole('button', { name: /Explore this look/ }));
    expect(open).toHaveBeenCalledWith(galleryLooks[2]);
  });
  it('brings a clicked neighbour to the front without opening an unrelated view', () => {
    const { open } = mount();
    fireEvent.click(screen.getByRole('button', { name: `Bring ${galleryLooks[0].title} forward` }));
    expect(current()).toBe(galleryLooks[0].images[0].src);
    expect(open).not.toHaveBeenCalled();
  });
  it('supports Arrow keys, Home and End while keeping focus on the control', () => {
    const { region } = mount();
    const next = screen.getByRole('button', { name: 'Next gallery look' });
    next.focus();
    fireEvent.keyDown(next, { key: 'ArrowRight' });
    expect(current()).toBe(galleryLooks[2].images[0].src);
    expect(document.activeElement).toBe(next);
    fireEvent.keyDown(region, { key: 'Home' });
    expect(current()).toBe(galleryLooks[0].images[0].src);
    fireEvent.keyDown(region, { key: 'End' });
    expect(current()).toBe(galleryLooks[2].images[0].src);
    fireEvent.keyDown(region, { key: 'ArrowLeft' });
    expect(current()).toBe(galleryLooks[1].images[0].src);
  });
  it('supports horizontal touch swipes without intercepting vertical scrolling', () => {
    const { stage, open } = mount();
    fireEvent.touchStart(stage, { touches: [{ clientX: 250, clientY: 100 }] });
    fireEvent.touchEnd(stage, { changedTouches: [{ clientX: 120, clientY: 108 }] });
    expect(current()).toBe(galleryLooks[2].images[0].src);
    fireEvent.click(document.querySelector('.gallery-panel[data-position=current]')!, {
      detail: 1,
    });
    expect(open).not.toHaveBeenCalled();
    fireEvent.touchStart(stage, { touches: [{ clientX: 200, clientY: 100 }] });
    fireEvent.touchEnd(stage, { changedTouches: [{ clientX: 180, clientY: 280 }] });
    expect(current()).toBe(galleryLooks[2].images[0].src);
  });
  it('has no automatic rotation and keeps the current look stationary while reading', () => {
    vi.useFakeTimers();
    mount();
    vi.advanceTimersByTime(120000);
    expect(current()).toBe(galleryLooks[1].images[0].src);
  });
  it('disables spatial effects and neighbour focus under reduced motion while keeping manual controls', () => {
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
    const { region, container } = mount();
    expect(region.getAttribute('data-reduced')).toBe('true');
    for (const panel of container.querySelectorAll('.gallery-panel:not([data-position=current])')) {
      expect(panel.getAttribute('tabindex')).toBe('-1');
      expect(panel.getAttribute('aria-hidden')).toBe('true');
    }
    fireEvent.click(screen.getByRole('button', { name: 'Next gallery look' }));
    expect(current()).toBe(galleryLooks[2].images[0].src);
    const panel = container.querySelector('.gallery-panel[data-position=current]')!;
    fireEvent.pointerMove(panel, { pointerType: 'mouse', clientX: 300, clientY: 100 });
    expect(
      container
        .querySelector('.gallery-panel[data-position=current] .gallery-photo')
        ?.getAttribute('style'),
    ).not.toContain('4deg');
  });
});
