import { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useNotifications } from '../hooks/useNotifications';
import {
  Sun, Moon, LogOut, Menu, X, Home, Clock, Timer, Image, Music,
  Bell, BookOpen, Calendar, Trophy, MessageCircle, Zap, Target, ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Dashboard from './Dashboard';
import ClockSection from './ClockSection';
import PomodoroTimer from './PomodoroTimer';
import ImageGallery from './ImageGallery';
import MusicPlayer from './MusicPlayer';
import NotificationsFeed from './NotificationsFeed';
import TestReminders from './TestReminders';
import SyllabusTracker from './SyllabusTracker';
import ExamCountdown from './ExamCountdown';
import AchievementBadges from './AchievementBadges';
import AIDoubtSolver from './AIDoubtSolver';
import CrashCourseMode from './CrashCourseMode';

interface AuthHook {
  isAuthenticated: boolean;
  username: string | null;
  isFirstTime: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  setupPassword: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

interface MainLayoutProps {
  auth: AuthHook;
}

type Section =
  | 'dashboard' | 'clock' | 'pomodoro' | 'gallery' | 'music'
  | 'notifications' | 'reminders' | 'syllabus' | 'countdown'
  | 'achievements' | 'ai-doubt' | 'crash-course';

const navItems: { id: Section; label: string; icon: React.ReactNode; emoji: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <Home className="w-4 h-4" />, emoji: '🏠' },
  { id: 'clock', label: 'Clock & Alarm', icon: <Clock className="w-4 h-4" />, emoji: '⏰' },
  { id: 'pomodoro', label: 'Study Timer', icon: <Timer className="w-4 h-4" />, emoji: '🍅' },
  { id: 'syllabus', label: 'Syllabus Tracker', icon: <BookOpen className="w-4 h-4" />, emoji: '📚' },
  { id: 'crash-course', label: '90-Day Course', icon: <Zap className="w-4 h-4" />, emoji: '⚡' },
  { id: 'ai-doubt', label: 'AI Doubt Solver', icon: <MessageCircle className="w-4 h-4" />, emoji: '🤖' },
  { id: 'countdown', label: 'Exam Countdown', icon: <Target className="w-4 h-4" />, emoji: '🎯' },
  { id: 'achievements', label: 'Achievements', icon: <Trophy className="w-4 h-4" />, emoji: '🏆' },
  { id: 'reminders', label: 'Test Reminders', icon: <Calendar className="w-4 h-4" />, emoji: '📅' },
  { id: 'gallery', label: 'Image Gallery', icon: <Image className="w-4 h-4" />, emoji: '🖼️' },
  { id: 'music', label: 'Music Player', icon: <Music className="w-4 h-4" />, emoji: '🎵' },
  { id: 'notifications', label: 'NextTopper', icon: <Bell className="w-4 h-4" />, emoji: '🔔' },
];

export default function MainLayout({ auth }: MainLayoutProps) {
  const [activeSection, setActiveSection] = useState<Section>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { unreadCount } = useNotifications();

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard': return <Dashboard onNavigate={setActiveSection} />;
      case 'clock': return <ClockSection />;
      case 'pomodoro': return <PomodoroTimer />;
      case 'gallery': return <ImageGallery />;
      case 'music': return <MusicPlayer />;
      case 'notifications': return <NotificationsFeed />;
      case 'reminders': return <TestReminders />;
      case 'syllabus': return <SyllabusTracker />;
      case 'countdown': return <ExamCountdown />;
      case 'achievements': return <AchievementBadges />;
      case 'ai-doubt': return <AIDoubtSolver />;
      case 'crash-course': return <CrashCourseMode />;
      default: return <Dashboard onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-sidebar border-r border-sidebar-border z-50
        transform transition-transform duration-300 ease-in-out flex flex-col
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, oklch(0.65 0.17 55), oklch(0.78 0.15 65))' }}>
              <span className="text-white font-bold text-sm">100</span>
            </div>
            <div className="min-w-0">
              <p className="font-heading font-bold text-sidebar-foreground text-sm leading-tight">Aim 100/100</p>
              <p className="text-sidebar-foreground/60 text-xs">Boards 2026–27</p>
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1 scrollbar-thin">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveSection(item.id); setSidebarOpen(false); }}
              className={`nav-item w-full text-left ${activeSection === item.id ? 'active' : 'text-sidebar-foreground/70 hover:text-sidebar-foreground'}`}
            >
              <span className="text-base">{item.emoji}</span>
              <span className="flex-1 text-sm">{item.label}</span>
              {item.id === 'notifications' && unreadCount > 0 && (
                <Badge className="text-xs px-1.5 py-0 h-5 min-w-5 flex items-center justify-center"
                  style={{ background: 'oklch(0.65 0.17 55)' }}>
                  {unreadCount}
                </Badge>
              )}
              {activeSection === item.id && <ChevronRight className="w-3 h-3 opacity-60" />}
            </button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-sidebar-border space-y-2">
          <div className="flex items-center gap-2 px-3 py-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ background: 'linear-gradient(135deg, oklch(0.65 0.17 55), oklch(0.75 0.15 65))' }}>
              {auth.username?.charAt(0).toUpperCase() || 'U'}
            </div>
            <span className="text-sm font-medium text-sidebar-foreground flex-1 truncate">{auth.username}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={auth.logout}
            className="w-full justify-start text-sidebar-foreground/70 hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border px-4 py-3 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>

          <div className="flex-1 min-w-0">
            <h2 className="font-heading font-semibold text-foreground text-sm sm:text-base truncate">
              {navItems.find(n => n.id === activeSection)?.emoji}{' '}
              {navItems.find(n => n.id === activeSection)?.label}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setActiveSection('notifications')}
                className="relative"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white text-xs flex items-center justify-center"
                  style={{ background: 'oklch(0.65 0.17 55)' }}>
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              </Button>
            )}
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'dark'
                ? <Sun className="w-5 h-5 text-yellow-500" />
                : <Moon className="w-5 h-5" />}
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          {renderSection()}
        </main>

        {/* Footer */}
        <footer className="border-t border-border px-6 py-4 text-center text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Aim 100/100 Boards 2026–27 · Built with{' '}
            <span className="text-red-500">♥</span> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname || 'aim100-boards')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline"
              style={{ color: 'oklch(0.65 0.17 55)' }}
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
