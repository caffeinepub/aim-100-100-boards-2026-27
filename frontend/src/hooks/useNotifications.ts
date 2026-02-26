import { useState, useCallback } from 'react';

export interface Notification {
  id: string;
  title: string;
  description: string;
  link?: string;
  timestamp: number;
  isRead: boolean;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const stored = localStorage.getItem('aim100-notifications');
    if (stored) {
      try { return JSON.parse(stored); }
      catch { /* ignore */ }
    }
    return [
      {
        id: '1',
        title: '🎯 New Video: How to Score 100 in Maths',
        description: 'NextTopper just uploaded a comprehensive guide on scoring full marks in Class 12 Maths.',
        link: 'https://youtube.com',
        timestamp: Date.now() - 3600000,
        isRead: false,
      },
      {
        id: '2',
        title: '📚 Physics Numericals Masterclass',
        description: 'Complete walkthrough of all important numericals for Board exams.',
        link: 'https://youtube.com',
        timestamp: Date.now() - 86400000,
        isRead: false,
      },
    ];
  });

  const save = (data: Notification[]) => {
    localStorage.setItem('aim100-notifications', JSON.stringify(data));
    setNotifications(data);
  };

  const addNotification = useCallback((title: string, description: string, link?: string) => {
    const newNotif: Notification = {
      id: Date.now().toString(),
      title,
      description,
      link,
      timestamp: Date.now(),
      isRead: false,
    };
    setNotifications(prev => {
      const updated = [newNotif, ...prev];
      localStorage.setItem('aim100-notifications', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => {
      const updated = prev.map(n => n.id === id ? { ...n, isRead: true } : n);
      localStorage.setItem('aim100-notifications', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => {
      const updated = prev.map(n => ({ ...n, isRead: true }));
      localStorage.setItem('aim100-notifications', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const deleteNotification = useCallback((id: string) => {
    setNotifications(prev => {
      const updated = prev.filter(n => n.id !== id);
      localStorage.setItem('aim100-notifications', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return { notifications, unreadCount, addNotification, markAsRead, markAllAsRead, deleteNotification };
}
