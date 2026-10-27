import {
  useEffect,
  useRef,
  useState,
  type RefObject,
  type SyntheticEvent,
  type MouseEvent,
} from 'react';
import { useReducedMotion } from './useMotion';
import { motion } from '../motion';

// Keep the native modal open during its exit animation so focus containment
// and scroll locking last until the content has actually left the screen.
export function useDialog(
  open: boolean,
  ref: RefObject<HTMLDialogElement | null>,
  onClose: () => void,
) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState('closed');
  const trigger = useRef<HTMLElement | null>(null);
  const overflow = useRef<string | null>(null);
  const position = useRef<{ x: number; y: number } | null>(null);
  const finish = (restoreScroll = true) => {
    ref.current?.close();
    if (overflow.current !== null) document.body.style.overflow = overflow.current;
    overflow.current = null;
    if (trigger.current?.isConnected) trigger.current.focus({ preventScroll: true });
    trigger.current = null;
    if (position.current && restoreScroll)
      window.scrollTo({ left: position.current.x, top: position.current.y, behavior: 'instant' });
    position.current = null;
  };
  const finishRef = useRef(finish);
  finishRef.current = finish;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (open) {
      if (!element.open) {
        trigger.current = document.activeElement as HTMLElement;
        position.current = { x: window.scrollX, y: window.scrollY };
        overflow.current = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        element.showModal();
      }
      setPhase('open');
      return;
    }
    if (!element.open) return;
    setPhase('closing');
    const timer = window.setTimeout(
      () => {
        finishRef.current();
        setPhase('closed');
      },
      reduced ? 0 : motion.detailExit,
    );
    return () => window.clearTimeout(timer);
  }, [open, ref, reduced]);

  useEffect(() => () => finishRef.current(), []);
  return {
    phase,
    dismissForNavigation: () => {
      finishRef.current(false);
      setPhase('closed');
      onClose();
    },
    onCancel: (event: SyntheticEvent) => {
      event.preventDefault();
      onClose();
    },
    onClick: (event: MouseEvent<HTMLDialogElement>) => {
      if (event.target !== ref.current) return;
      const bounds = ref.current.getBoundingClientRect();
      if (
        event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom
      )
        onClose();
    },
  };
}
