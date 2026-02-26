import { useState, useCallback } from 'react';
import { ncertSubjects } from '../data/ncertData';

interface ChapterProgress {
  completed: boolean;
}

interface SubjectProgress {
  [chapter: string]: ChapterProgress;
}

interface AllProgress {
  [subject: string]: SubjectProgress;
}

export function getCompletionCategory(pct: number): { label: string; color: string; bg: string } {
  if (pct >= 100) return { label: '100% — Perfect!', color: 'text-yellow-600', bg: 'bg-yellow-100 dark:bg-yellow-900/30' };
  if (pct >= 90) return { label: '90%+ — Excellent', color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/30' };
  if (pct >= 80) return { label: '80%+ — Great', color: 'text-emerald-600', bg: 'bg-emerald-100 dark:bg-emerald-900/30' };
  if (pct >= 70) return { label: '70%+ — Good', color: 'text-lime-600', bg: 'bg-lime-100 dark:bg-lime-900/30' };
  if (pct >= 60) return { label: '60%+ — Fair', color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/30' };
  if (pct >= 50) return { label: '50%+ — Started', color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/30' };
  return { label: 'Below 50%', color: 'text-muted-foreground', bg: 'bg-muted' };
}

export function useSyllabusProgress() {
  const [progress, setProgress] = useState<AllProgress>(() => {
    const stored = localStorage.getItem('aim100-syllabus');
    if (stored) {
      try { return JSON.parse(stored); }
      catch { /* ignore */ }
    }
    return {};
  });

  const save = (data: AllProgress) => {
    localStorage.setItem('aim100-syllabus', JSON.stringify(data));
    setProgress(data);
  };

  const toggleChapter = useCallback((subject: string, chapter: string) => {
    setProgress(prev => {
      const updated = {
        ...prev,
        [subject]: {
          ...(prev[subject] || {}),
          [chapter]: { completed: !(prev[subject]?.[chapter]?.completed) }
        }
      };
      localStorage.setItem('aim100-syllabus', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const getSubjectCompletion = useCallback((subject: string): number => {
    const subjectData = ncertSubjects.find(s => s.name === subject);
    if (!subjectData) return 0;
    const total = subjectData.chapters.length;
    if (total === 0) return 0;
    const completed = subjectData.chapters.filter(ch => progress[subject]?.[ch]?.completed).length;
    return Math.round((completed / total) * 100);
  }, [progress]);

  const getOverallCompletion = useCallback((): number => {
    let total = 0, completed = 0;
    ncertSubjects.forEach(subject => {
      total += subject.chapters.length;
      completed += subject.chapters.filter(ch => progress[subject.name]?.[ch]?.completed).length;
    });
    return total === 0 ? 0 : Math.round((completed / total) * 100);
  }, [progress]);

  const isChapterCompleted = useCallback((subject: string, chapter: string): boolean => {
    return !!progress[subject]?.[chapter]?.completed;
  }, [progress]);

  return { progress, toggleChapter, getSubjectCompletion, getOverallCompletion, isChapterCompleted };
}
