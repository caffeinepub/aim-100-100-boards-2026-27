import { useState, useEffect } from 'react';

interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

export function useCountdown() {
  const [examDate, setExamDateState] = useState<string>(() => {
    return localStorage.getItem('aim100-examdate') || '2027-03-01';
  });

  const [countdown, setCountdown] = useState<CountdownValues>({ days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 });

  useEffect(() => {
    const calculate = () => {
      const target = new Date(examDate).getTime();
      const now = Date.now();
      const diff = Math.max(0, target - now);
      setCountdown({
        total: diff,
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [examDate]);

  const setExamDate = (date: string) => {
    localStorage.setItem('aim100-examdate', date);
    setExamDateState(date);
  };

  const getMilestoneMessage = (): string => {
    const { days } = countdown;
    if (days <= 0) return '🎓 Exam day is here! Give it your best!';
    if (days <= 7) return '🔥 Final week! Every hour counts!';
    if (days <= 30) return '⚡ One month left — push hard!';
    if (days <= 60) return '💪 60 days — stay consistent!';
    if (days <= 90) return '🚀 90 days — time to sprint!';
    if (days <= 180) return '📚 6 months — build strong foundations!';
    return '🌟 You have time — start strong, stay strong!';
  };

  return { countdown, examDate, setExamDate, getMilestoneMessage };
}
