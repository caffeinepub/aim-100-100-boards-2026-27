import { useState, useEffect, useCallback } from 'react';

export interface Alarm {
  id: string;
  time: string;
  label: string;
  enabled: boolean;
  triggered: boolean;
}

export function useAlarms(onAlarmTrigger?: () => void) {
  const [alarms, setAlarms] = useState<Alarm[]>(() => {
    const stored = localStorage.getItem('aim100-alarms');
    if (stored) {
      try { return JSON.parse(stored); }
      catch { /* ignore */ }
    }
    return [];
  });

  const save = (data: Alarm[]) => {
    localStorage.setItem('aim100-alarms', JSON.stringify(data));
    setAlarms(data);
  };

  const addAlarm = useCallback((time: string, label: string) => {
    const newAlarm: Alarm = { id: Date.now().toString(), time, label, enabled: true, triggered: false };
    setAlarms(prev => {
      const updated = [...prev, newAlarm];
      localStorage.setItem('aim100-alarms', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const removeAlarm = useCallback((id: string) => {
    setAlarms(prev => {
      const updated = prev.filter(a => a.id !== id);
      localStorage.setItem('aim100-alarms', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const toggleAlarm = useCallback((id: string) => {
    setAlarms(prev => {
      const updated = prev.map(a => a.id === id ? { ...a, enabled: !a.enabled } : a);
      localStorage.setItem('aim100-alarms', JSON.stringify(updated));
      return updated;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      setAlarms(prev => {
        let changed = false;
        const updated = prev.map(alarm => {
          if (alarm.enabled && alarm.time === currentTime && !alarm.triggered && now.getSeconds() === 0) {
            changed = true;
            onAlarmTrigger?.();
            return { ...alarm, triggered: true };
          }
          if (alarm.triggered && alarm.time !== currentTime) {
            changed = true;
            return { ...alarm, triggered: false };
          }
          return alarm;
        });
        if (changed) {
          localStorage.setItem('aim100-alarms', JSON.stringify(updated));
          return updated;
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [onAlarmTrigger]);

  return { alarms, addAlarm, removeAlarm, toggleAlarm };
}
