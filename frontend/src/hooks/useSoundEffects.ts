import { useCallback, useRef } from 'react';

function createBeep(frequency: number, duration: number, type: OscillatorType = 'sine', volume = 0.3): () => void {
  return () => {
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      oscillator.frequency.value = frequency;
      oscillator.type = type;
      gainNode.gain.setValueAtTime(volume, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch { /* ignore audio errors */ }
  };
}

function createChime(notes: number[], duration: number): () => void {
  return () => {
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      notes.forEach((freq, i) => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        oscillator.frequency.value = freq;
        oscillator.type = 'sine';
        const startTime = ctx.currentTime + i * 0.15;
        gainNode.gain.setValueAtTime(0.3, startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
      });
    } catch { /* ignore */ }
  };
}

export function useSoundEffects() {
  const soundsEnabled = useRef(true);

  const playClick = useCallback(() => {
    if (!soundsEnabled.current) return;
    createBeep(800, 0.05, 'square', 0.1)();
  }, []);

  const playSuccess = useCallback(() => {
    if (!soundsEnabled.current) return;
    createChime([523, 659, 784], 0.4)();
  }, []);

  const playAlarm = useCallback(() => {
    if (!soundsEnabled.current) return;
    createChime([880, 1100, 880, 1100], 0.5)();
  }, []);

  const playFanfare = useCallback(() => {
    if (!soundsEnabled.current) return;
    createChime([523, 659, 784, 1047, 784, 1047], 0.6)();
  }, []);

  const toggleSounds = useCallback(() => {
    soundsEnabled.current = !soundsEnabled.current;
  }, []);

  return { playClick, playSuccess, playAlarm, playFanfare, toggleSounds };
}
