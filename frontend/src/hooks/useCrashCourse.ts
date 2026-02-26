import { useState, useCallback } from 'react';
import { crashCoursePlan } from '../data/crashCoursePlan';

interface TaskCompletion {
  [key: string]: boolean;
}

export function useCrashCourse() {
  const [completions, setCompletions] = useState<TaskCompletion>(() => {
    const stored = localStorage.getItem('aim100-crashcourse');
    if (stored) {
      try { return JSON.parse(stored); }
      catch { /* ignore */ }
    }
    return {};
  });

  const toggleTask = useCallback((weekIndex: number, dayIndex: number, taskIndex: number) => {
    const key = `${weekIndex}-${dayIndex}-${taskIndex}`;
    setCompletions(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      localStorage.setItem('aim100-crashcourse', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const isTaskCompleted = useCallback((weekIndex: number, dayIndex: number, taskIndex: number): boolean => {
    return !!completions[`${weekIndex}-${dayIndex}-${taskIndex}`];
  }, [completions]);

  const getOverallProgress = useCallback((): number => {
    let total = 0, completed = 0;
    crashCoursePlan.forEach((week, wi) => {
      week.days.forEach((day, di) => {
        day.tasks.forEach((_, ti) => {
          total++;
          if (completions[`${wi}-${di}-${ti}`]) completed++;
        });
      });
    });
    return total === 0 ? 0 : Math.round((completed / total) * 100);
  }, [completions]);

  const getWeekProgress = useCallback((weekIndex: number): number => {
    const week = crashCoursePlan[weekIndex];
    if (!week) return 0;
    let total = 0, completed = 0;
    week.days.forEach((day, di) => {
      day.tasks.forEach((_, ti) => {
        total++;
        if (completions[`${weekIndex}-${di}-${ti}`]) completed++;
      });
    });
    return total === 0 ? 0 : Math.round((completed / total) * 100);
  }, [completions]);

  return { completions, toggleTask, isTaskCompleted, getOverallProgress, getWeekProgress };
}
