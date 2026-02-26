import { useState, useCallback } from 'react';

export interface TestReminder {
  id: string;
  subject: string;
  testDate: string;
  notes?: string;
}

export function useTestReminders() {
  const [reminders, setReminders] = useState<TestReminder[]>(() => {
    const stored = localStorage.getItem('aim100-reminders');
    if (stored) {
      try { return JSON.parse(stored); }
      catch { /* ignore */ }
    }
    return [];
  });

  const save = (data: TestReminder[]) => {
    localStorage.setItem('aim100-reminders', JSON.stringify(data));
    setReminders(data);
  };

  const addReminder = useCallback((subject: string, testDate: string, notes?: string) => {
    const newReminder: TestReminder = { id: Date.now().toString(), subject, testDate, notes };
    setReminders(prev => {
      const updated = [...prev, newReminder].sort((a, b) => new Date(a.testDate).getTime() - new Date(b.testDate).getTime());
      localStorage.setItem('aim100-reminders', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const updateReminder = useCallback((id: string, updates: Partial<TestReminder>) => {
    setReminders(prev => {
      const updated = prev.map(r => r.id === id ? { ...r, ...updates } : r)
        .sort((a, b) => new Date(a.testDate).getTime() - new Date(b.testDate).getTime());
      localStorage.setItem('aim100-reminders', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const deleteReminder = useCallback((id: string) => {
    setReminders(prev => {
      const updated = prev.filter(r => r.id !== id);
      localStorage.setItem('aim100-reminders', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const getTestsDueSoon = useCallback((): TestReminder[] => {
    const now = new Date();
    const threeDaysLater = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
    return reminders.filter(r => {
      const testDate = new Date(r.testDate);
      return testDate >= now && testDate <= threeDaysLater;
    });
  }, [reminders]);

  return { reminders, addReminder, updateReminder, deleteReminder, getTestsDueSoon };
}
