import { useCallback, useState } from "react";

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null;
  totalDays: number;
  activeDates: string[];
}

export function useStudyStreak() {
  const [streakData, setStreakData] = useState<StreakData>(() => {
    const stored = localStorage.getItem("aim100-streak");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Ensure activeDates exists for backwards compatibility
        if (!parsed.activeDates) parsed.activeDates = [];
        return parsed;
      } catch {
        /* ignore */
      }
    }
    return {
      currentStreak: 0,
      longestStreak: 0,
      lastActiveDate: null,
      totalDays: 0,
      activeDates: [],
    };
  });

  const save = (data: StreakData) => {
    localStorage.setItem("aim100-streak", JSON.stringify(data));
    setStreakData(data);
  };

  const recordActivity = useCallback(() => {
    const today = new Date().toDateString();
    setStreakData((prev) => {
      if (prev.lastActiveDate === today) return prev;
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const isConsecutive = prev.lastActiveDate === yesterday.toDateString();
      const newStreak = isConsecutive ? prev.currentStreak + 1 : 1;
      // Add today to activeDates if not already present
      const activeDates = prev.activeDates.includes(today)
        ? prev.activeDates
        : [...prev.activeDates, today];
      const newData: StreakData = {
        currentStreak: newStreak,
        longestStreak: Math.max(prev.longestStreak, newStreak),
        lastActiveDate: today,
        totalDays: prev.totalDays + 1,
        activeDates,
      };
      localStorage.setItem("aim100-streak", JSON.stringify(newData));
      return newData;
    });
  }, []);

  const checkStreak = useCallback(() => {
    const today = new Date().toDateString();
    setStreakData((prev) => {
      if (prev.lastActiveDate === today) return prev;
      if (!prev.lastActiveDate) return prev;
      const lastDate = new Date(prev.lastActiveDate);
      const todayDate = new Date(today);
      const diffDays = Math.floor(
        (todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24),
      );
      if (diffDays > 1) {
        const newData = { ...prev, currentStreak: 0 };
        localStorage.setItem("aim100-streak", JSON.stringify(newData));
        return newData;
      }
      return prev;
    });
  }, []);

  const tickToday = useCallback((): {
    success: boolean;
    alreadyTicked: boolean;
  } => {
    const today = new Date().toDateString();
    // Read the latest persisted state directly from localStorage to avoid stale closure
    let current: StreakData = streakData;
    try {
      const stored = localStorage.getItem("aim100-streak");
      if (stored) current = { activeDates: [], ...JSON.parse(stored) };
    } catch {
      /* ignore */
    }

    if (current.lastActiveDate === today) {
      return { success: false, alreadyTicked: true };
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const isConsecutive = current.lastActiveDate === yesterday.toDateString();
    const newStreak = isConsecutive ? current.currentStreak + 1 : 1;
    const activeDates = current.activeDates.includes(today)
      ? current.activeDates
      : [...current.activeDates, today];
    const newData: StreakData = {
      currentStreak: newStreak,
      longestStreak: Math.max(current.longestStreak, newStreak),
      lastActiveDate: today,
      totalDays: current.totalDays + 1,
      activeDates,
    };
    localStorage.setItem("aim100-streak", JSON.stringify(newData));
    setStreakData(newData);
    return { success: true, alreadyTicked: false };
  }, [streakData]);

  return { ...streakData, recordActivity, checkStreak, save, tickToday };
}
