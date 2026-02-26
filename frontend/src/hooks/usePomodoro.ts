import { useState, useEffect, useRef, useCallback } from 'react';

type PomodoroMode = 'focus' | 'break' | 'longBreak';

interface PomodoroState {
  mode: PomodoroMode;
  sessionCount: number;
  isRunning: boolean;
  focusDuration: number;
  breakDuration: number;
  longBreakDuration: number;
}

export function usePomodoro(onSessionEnd?: () => void) {
  const [state, setState] = useState<PomodoroState>({
    mode: 'focus',
    sessionCount: 0,
    isRunning: false,
    focusDuration: 25 * 60,
    breakDuration: 5 * 60,
    longBreakDuration: 15 * 60,
  });
  const [remaining, setRemaining] = useState(25 * 60);
  const targetEndRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const getDuration = (mode: PomodoroMode, s: PomodoroState) => {
    if (mode === 'focus') return s.focusDuration;
    if (mode === 'longBreak') return s.longBreakDuration;
    return s.breakDuration;
  };

  const tick = useCallback(() => {
    if (targetEndRef.current !== null) {
      const rem = Math.max(0, Math.ceil((targetEndRef.current - Date.now()) / 1000));
      setRemaining(rem);
      if (rem <= 0) {
        targetEndRef.current = null;
        setState(prev => {
          const newSessionCount = prev.mode === 'focus' ? prev.sessionCount + 1 : prev.sessionCount;
          const nextMode: PomodoroMode = prev.mode === 'focus'
            ? (newSessionCount % 4 === 0 ? 'longBreak' : 'break')
            : 'focus';
          const nextDuration = getDuration(nextMode, prev);
          setRemaining(nextDuration);
          onSessionEnd?.();
          return { ...prev, mode: nextMode, sessionCount: newSessionCount, isRunning: false };
        });
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [onSessionEnd]);

  const start = useCallback(() => {
    targetEndRef.current = Date.now() + remaining * 1000;
    setState(prev => ({ ...prev, isRunning: true }));
    rafRef.current = requestAnimationFrame(tick);
  }, [remaining, tick]);

  const pause = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    targetEndRef.current = null;
    setState(prev => ({ ...prev, isRunning: false }));
  }, []);

  const reset = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    targetEndRef.current = null;
    setState(prev => {
      setRemaining(getDuration(prev.mode, prev));
      return { ...prev, isRunning: false };
    });
  }, []);

  const skip = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    targetEndRef.current = null;
    setState(prev => {
      const newSessionCount = prev.mode === 'focus' ? prev.sessionCount + 1 : prev.sessionCount;
      const nextMode: PomodoroMode = prev.mode === 'focus'
        ? (newSessionCount % 4 === 0 ? 'longBreak' : 'break')
        : 'focus';
      const nextDuration = getDuration(nextMode, prev);
      setRemaining(nextDuration);
      return { ...prev, mode: nextMode, sessionCount: newSessionCount, isRunning: false };
    });
  }, []);

  const setDurations = useCallback((focus: number, brk: number, longBrk: number) => {
    setState(prev => {
      const updated = { ...prev, focusDuration: focus, breakDuration: brk, longBreakDuration: longBrk };
      setRemaining(getDuration(prev.mode, updated));
      return updated;
    });
  }, []);

  useEffect(() => {
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  const totalDuration = getDuration(state.mode, state);
  const progress = totalDuration > 0 ? ((totalDuration - remaining) / totalDuration) * 100 : 0;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return { ...state, remaining, progress, start, pause, reset, skip, setDurations, formatTime };
}
