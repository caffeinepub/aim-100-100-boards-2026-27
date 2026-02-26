import { useState, useEffect, useRef, useCallback } from 'react';

export interface Lap {
  id: number;
  time: number;
  split: number;
}

export function useStopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [laps, setLaps] = useState<Lap[]>([]);
  const startTimeRef = useRef<number | null>(null);
  const baseElapsedRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  const tick = useCallback(() => {
    if (startTimeRef.current !== null) {
      setElapsed(baseElapsedRef.current + (Date.now() - startTimeRef.current));
      rafRef.current = requestAnimationFrame(tick);
    }
  }, []);

  const start = useCallback(() => {
    startTimeRef.current = Date.now();
    setIsRunning(true);
    rafRef.current = requestAnimationFrame(tick);
  }, [tick]);

  const pause = useCallback(() => {
    if (startTimeRef.current !== null) {
      baseElapsedRef.current += Date.now() - startTimeRef.current;
      startTimeRef.current = null;
    }
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    startTimeRef.current = null;
    baseElapsedRef.current = 0;
    setIsRunning(false);
    setElapsed(0);
    setLaps([]);
  }, []);

  const lap = useCallback(() => {
    setLaps(prev => {
      const lastLapTime = prev.length > 0 ? prev[prev.length - 1].time : 0;
      return [...prev, { id: prev.length + 1, time: elapsed, split: elapsed - lastLapTime }];
    });
  }, [elapsed]);

  useEffect(() => {
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  const formatTime = (ms: number): string => {
    const h = Math.floor(ms / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    const cs = Math.floor((ms % 1000) / 10);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(cs).padStart(2, '0')}`;
  };

  return { isRunning, elapsed, laps, start, pause, reset, lap, formatTime };
}
