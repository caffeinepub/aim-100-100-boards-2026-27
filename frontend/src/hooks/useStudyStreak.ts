import { useState, useCallback } from 'react';

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null;
  totalDays: number;
}

export function useStudyStreak() {
  const [streakData, setStreakData] = useState<StreakData>(() => {
    const stored = localStorage.getItem('aim100-streak');
    if (stored) {
      try { return JSON.parse(stored); }
      catch { /* ignore */ }
    }
    return { currentStreak: 0, longestStreak: 0, lastActiveDate: null, totalDays: 0 };
  });

  const save = (data: StreakData) => {
    localStorage.setItem('aim100-streak', JSON.stringify(data));
    setStreakData(data);
  };

  const recordActivity = useCallback(() => {
    const today = new Date().toDateString();
    setStreakData(prev => {
      if (prev.lastActiveDate === today) return prev;
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const isConsecutive = prev.lastActiveDate === yesterday.toDateString();
      const newStreak = isConsecutive ? prev.currentStreak + 1 : 1;
      const newData: StreakData = {
        currentStreak: newStreak,
        longestStreak: Math.max(prev.longestStreak, newStreak),
        lastActiveDate: today,
        totalDays: prev.totalDays + 1,
      };
      localStorage.setItem('aim100-streak', JSON.stringify(newData));
      return newData;
    });
  }, []);

  const checkStreak = useCallback(() => {
    const today = new Date().toDateString();
    setStreakData(prev => {
      if (prev.lastActiveDate === today) return prev;
      if (!prev.lastActiveDate) return prev;
      const lastDate = new Date(prev.lastActiveDate);
      const todayDate = new Date(today);
      const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays > 1) {
        const newData = { ...prev, currentStreak: 0 };
        localStorage.setItem('aim100-streak', JSON.stringify(newData));
        return newData;
      }
      return prev;
    });
  }, []);

  return { ...streakData, recordActivity, checkStreak, save };
}
