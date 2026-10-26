import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  type ReactNode,
  type CSSProperties,
} from 'react';

// Each word stays in the single semantic heading. Words sharing a rendered line
// receive the same timing: no duplicate text, ARIA layer or per-word sequence.
function maskedWords(children: ReactNode): ReactNode {
  return Children.map(children, (child) => {
    if (typeof child === 'string' || typeof child === 'number')
      return String(child)
        .split(/(\s+)/)
        .map((part, index) =>
          /\S/.test(part) ? (
            <span className="text-mask" key={index}>
              <span className="text-rise">{part}</span>
            </span>
          ) : (
            part
          ),
        );
    if (isValidElement<{ children?: ReactNode }>(child) && child.props.children)
      return cloneElement(child, {}, maskedWords(child.props.children));
    return child;
  });
}
export function RevealHeading({
  as: Tag = 'h2',
  children,
  ...props
}: {
  as?: 'h1' | 'h2' | 'h3';
  children: ReactNode;
  className?: string;
}) {
  return (
    <Tag {...props} data-reveal-heading>
      {maskedWords(children)}
    </Tag>
  );
}

export function measureRevealLines(heading: HTMLElement) {
  const words = [...heading.querySelectorAll<HTMLElement>('.text-mask')];
  const tops: number[] = [];
  words.forEach((word) => {
    const top = word.offsetTop;
    let line = tops.findIndex((value) => Math.abs(value - top) < 4);
    if (line < 0) {
      line = tops.length;
      tops.push(top);
    }
    word.style.setProperty('--line-delay', `${Math.min(line * 200, 700)}ms`);
  });
  return `${heading.clientWidth}:${words.map((word) => word.style.getPropertyValue('--line-delay')).join(',')}`;
}

export function TextReveal({
  children,
  className = '',
  hero = false,
  style,
}: {
  children: ReactNode;
  className?: string;
  hero?: boolean;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const group = ref.current;
    const heading = group?.querySelector<HTMLElement>('[data-reveal-heading]');
    if (!group || !heading) return;
    let observer: IntersectionObserver | undefined;
    let resize: ResizeObserver | undefined;
    let frame = 0,
      timer = 0;
    let disposed = false;
    let previousScroll = window.scrollY;
    let layout = '';
    const query = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const finish = () => {
      if (disposed) return;
      group.dataset.textState = 'complete';
      window.clearTimeout(timer);
      observer?.unobserve(heading);
    };
    const enter = () => {
      if (group.dataset.textState !== 'pending') return;
      group.dataset.textState = 'entering';
      observer?.unobserve(heading);
      timer = window.setTimeout(finish, 1800);
    };
    const inspect = (fast = false) => {
      const bounds = heading.getBoundingClientRect();
      if (bounds.bottom < 0 || (fast && bounds.top < window.innerHeight * 0.83)) finish();
      else if (group.dataset.textState === 'pending' && bounds.top <= window.innerHeight * 0.83)
        enter();
    };
    const remeasure = () => {
      if (disposed) return;
      // Never restart an entrance or hide already-read text on reflow.
      const next = measureRevealLines(heading);
      if (next !== layout && group.dataset.textState === 'entering') finish();
      layout = next;
      inspect();
    };
    const preference = () => {
      if (query?.matches) finish();
    };
    const scroll = () => {
      const fast = Math.abs(window.scrollY - previousScroll) > window.innerHeight * 0.65;
      previousScroll = window.scrollY;
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        frame = 0;
        inspect(fast);
      });
    };
    try {
      layout = measureRevealLines(heading);
      if (query?.matches || typeof IntersectionObserver !== 'function') return;
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.boundingClientRect.bottom < 0) finish();
            else if (entry.isIntersecting) inspect();
          });
        },
        { threshold: 0, rootMargin: '0px 0px -17% 0px' },
      );
      observer.observe(heading);
      group.dataset.textState = 'pending';
      inspect();
      window.addEventListener('scroll', scroll, { passive: true });
      window.addEventListener('resize', remeasure);
      query?.addEventListener('change', preference);
      if (typeof ResizeObserver === 'function') {
        resize = new ResizeObserver(remeasure);
        resize.observe(heading);
      }
      void document.fonts?.ready.then(remeasure).catch(finish);
      document.fonts?.addEventListener('loadingdone', remeasure);
    } catch {
      finish();
    }
    return () => {
      disposed = true;
      observer?.disconnect();
      resize?.disconnect();
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scroll);
      window.removeEventListener('resize', remeasure);
      query?.removeEventListener('change', preference);
      document.fonts?.removeEventListener('loadingdone', remeasure);
    };
  }, []);
  return (
    <div
      ref={ref}
      className={`text-reveal ${className}`}
      data-hero-text={hero || undefined}
      style={style}
    >
      {children}
    </div>
  );
}
