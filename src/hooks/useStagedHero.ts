import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from '../motion';

// Only one photograph is mounted. An opaque curtain covers the source change;
// replacing a request cancels both scheduled phases instead of queuing them.
export function useStagedHero(
  count: number,
  reduced: boolean,
  prepare?: (index: number) => Promise<void> | undefined,
) {
  const [displayed, setDisplayed] = useState(0);
  const [selected, setSelected] = useState(0);
  const [phase, setPhase] = useState<'settled' | 'waiting' | 'covering' | 'revealing'>('settled');
  const [cycle, setCycle] = useState(0);
  const target = useRef(0);
  const timers = useRef<number[]>([]);
  const generation = useRef(0);
  const clear = useCallback(() => {
    generation.current += 1;
    timers.current.forEach((timer) => window.clearTimeout(timer));
    timers.current = [];
  }, []);
  const settle = useCallback(() => {
    clear();
    setDisplayed(target.current);
    setPhase('settled');
  }, [clear]);
  const request = useCallback(
    (index: number) => {
      const next = (index + count) % count;
      clear();
      target.current = next;
      setSelected(next);
      if (reduced || next === displayed) {
        setDisplayed(next);
        setPhase('settled');
        return;
      }
      const token = generation.current;
      const begin = () => {
        if (token !== generation.current) return;
        setCycle((value) => value + 1);
        setPhase('covering');
        timers.current.push(
          window.setTimeout(() => {
            setDisplayed(target.current);
            setPhase('revealing');
          }, motion.heroCover),
        );
        timers.current.push(
          window.setTimeout(() => {
            setPhase('settled');
          }, motion.heroTransition),
        );
      };
      const ready = prepare?.(next);
      if (ready) {
        setPhase('waiting');
        void ready.then(begin);
      } else begin();
    },
    [clear, count, displayed, prepare, reduced],
  );
  useEffect(() => {
    if (reduced) settle();
  }, [reduced, settle]);
  useEffect(() => clear, [clear]);
  return { displayed, selected, phase, cycle, request, settle };
}
