import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Calendar, Flame, Target, Trophy, Zap } from "lucide-react";
import { useRef, useState } from "react";
import { useCountdown } from "../hooks/useCountdown";
import { useSoundEffects } from "../hooks/useSoundEffects";
import { useStudyStreak } from "../hooks/useStudyStreak";
import {
  getCompletionCategory,
  useSyllabusProgress,
} from "../hooks/useSyllabusProgress";
import { useTestReminders } from "../hooks/useTestReminders";
import StreakCalendar from "./StreakCalendar";

type Section =
  | "dashboard"
  | "clock"
  | "pomodoro"
  | "gallery"
  | "music"
  | "notifications"
  | "reminders"
  | "syllabus"
  | "countdown"
  | "achievements"
  | "ai-doubt"
  | "crash-course";

interface DashboardProps {
  onNavigate: (section: Section) => void;
}

// Confetti particle component
const CONFETTI_COLORS = [
  "#f59e0b",
  "#ef4444",
  "#22c55e",
  "#3b82f6",
  "#a855f7",
  "#ec4899",
  "#14b8a6",
  "#f97316",
];

function ConfettiOverlay({ show }: { show: boolean }) {
  const particles = useRef(
    Array.from({ length: 22 }, (_, i) => ({
      id: i,
      left: `${5 + Math.floor((i * 4.3) % 90)}%`,
      delay: `${(i * 0.11) % 0.9}s`,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      size: 8 + (i % 6),
      rotation: i * 17,
    })),
  );

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <style>{`
        @keyframes confetti-fall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
      {particles.current.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: p.left,
            top: "-10px",
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: p.id % 3 === 0 ? "50%" : "2px",
            animation: `confetti-fall 2.5s ease-in ${p.delay} forwards`,
            transform: `rotate(${p.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const {
    currentStreak,
    longestStreak,
    activeDates,
    lastActiveDate,
    tickToday,
  } = useStudyStreak();
  const { playCelebration } = useSoundEffects();
  const { getOverallCompletion } = useSyllabusProgress();
  const { countdown, getMilestoneMessage } = useCountdown();
  const { getTestsDueSoon } = useTestReminders();

  const [showConfetti, setShowConfetti] = useState(false);
  const [tickMessage, setTickMessage] = useState<string | null>(null);

  const alreadyTickedToday = lastActiveDate === new Date().toDateString();

  const handleTickToday = () => {
    const result = tickToday();
    if (result.success) {
      playCelebration();
      setShowConfetti(true);
      setTickMessage("🔥 Streak updated! Keep it up!");
      setTimeout(() => setShowConfetti(false), 2500);
      setTimeout(() => setTickMessage(null), 3500);
    } else if (result.alreadyTicked) {
      setTickMessage("Already checked in today!");
      setTimeout(() => setTickMessage(null), 2500);
    }
  };

  const overallPct = getOverallCompletion();
  const category = getCompletionCategory(overallPct);
  const dueSoon = getTestsDueSoon();

  const getBadge = () => {
    if (overallPct >= 95)
      return { label: "🐐 GOAT", color: "from-yellow-500 to-amber-400" };
    if (overallPct >= 90)
      return { label: "⭐ Pro", color: "from-purple-500 to-violet-400" };
    if (overallPct >= 80)
      return { label: "🛡️ Legend", color: "from-red-500 to-rose-400" };
    return null;
  };

  const badge = getBadge();

  const quickLinks: {
    id: Section;
    label: string;
    emoji: string;
    desc: string;
    color: string;
  }[] = [
    {
      id: "pomodoro",
      label: "Study Timer",
      emoji: "🍅",
      desc: "Pomodoro focus sessions",
      color: "from-red-500/20 to-orange-500/20",
    },
    {
      id: "syllabus",
      label: "Syllabus",
      emoji: "📚",
      desc: "Track chapter progress",
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
      id: "ai-doubt",
      label: "AI Solver",
      emoji: "🤖",
      desc: "Get instant answers",
      color: "from-purple-500/20 to-violet-500/20",
    },
    {
      id: "crash-course",
      label: "45-Day Plan",
      emoji: "⚡",
      desc: "Coming soon!",
      color: "from-yellow-500/20 to-amber-500/20",
    },
    {
      id: "clock",
      label: "Clock & Alarm",
      emoji: "⏰",
      desc: "Set study alarms",
      color: "from-green-500/20 to-emerald-500/20",
    },
    {
      id: "countdown",
      label: "Countdown",
      emoji: "🎯",
      desc: "Days to exam",
      color: "from-pink-500/20 to-rose-500/20",
    },
    {
      id: "achievements",
      label: "Badges",
      emoji: "🏆",
      desc: "Your achievements",
      color: "from-amber-500/20 to-yellow-500/20",
    },
    {
      id: "music",
      label: "Music",
      emoji: "🎵",
      desc: "Focus music",
      color: "from-indigo-500/20 to-blue-500/20",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <ConfettiOverlay show={showConfetti} />
      {/* Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden min-h-[200px] sm:min-h-[240px]">
        <img
          src="/assets/generated/hero-banner.dim_1400x500.png"
          alt="Study Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(10,10,20,0.85) 0%, rgba(10,10,20,0.5) 100%)",
          }}
        />
        <div className="relative z-10 p-6 sm:p-8 flex flex-col justify-end h-full min-h-[200px] sm:min-h-[240px]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-heading font-black text-white leading-tight">
                Aim <span className="gold-text">100/100</span>
              </h1>
              <p className="text-white/80 text-sm sm:text-base mt-1 font-body">
                Boards 2026–27 · Your journey to excellence
              </p>
              <p className="text-white/60 text-xs sm:text-sm mt-2 italic">
                {getMilestoneMessage()}
              </p>
            </div>
            {badge && (
              <div
                className={`flex-shrink-0 px-3 py-1.5 rounded-full bg-gradient-to-r ${badge.color} text-white text-sm font-bold shadow-lg`}
              >
                {badge.label}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Due Soon Alert */}
      {dueSoon.length > 0 && (
        <Alert className="border-yellow-500/50 bg-yellow-500/10">
          <Calendar className="w-4 h-4 text-yellow-600" />
          <AlertDescription className="text-yellow-700 dark:text-yellow-400">
            <strong>⚠️ Upcoming Tests:</strong>{" "}
            {dueSoon
              .map(
                (t) =>
                  `${t.subject} on ${new Date(t.testDate).toLocaleDateString()}`,
              )
              .join(", ")}
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-start">
        <Card className="premium-card col-span-2 sm:col-span-1">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-1">
              <Flame className="w-6 h-6 text-orange-500 streak-fire flex-shrink-0" />
              <div>
                <p className="text-2xl font-heading font-bold text-foreground leading-none">
                  {currentStreak}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Day Streak
                </p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-xs text-muted-foreground">Best</p>
                <p className="text-sm font-heading font-bold text-orange-500">
                  {longestStreak}
                </p>
              </div>
            </div>

            {/* Tick Today Button */}
            <div className="mt-3 mb-2">
              {alreadyTickedToday ? (
                <div
                  data-ocid="streak.success_state"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-sm font-semibold text-green-600 dark:text-green-400 bg-green-500/10 border border-green-500/20"
                >
                  <span>✓</span>
                  <span>Checked in today</span>
                </div>
              ) : (
                <button
                  type="button"
                  data-ocid="streak.tick_button"
                  onClick={handleTickToday}
                  className="w-full py-2 px-3 rounded-xl text-sm font-bold text-white transition-all duration-150 active:scale-95 hover:brightness-110"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.62 0.19 45), oklch(0.72 0.18 55))",
                    boxShadow: "0 2px 12px oklch(0.65 0.17 55 / 0.35)",
                  }}
                >
                  🔥 Tick Today
                </button>
              )}
              {tickMessage && (
                <p
                  className={`text-xs text-center mt-1.5 font-medium ${alreadyTickedToday || tickMessage.startsWith("Already") ? "text-muted-foreground" : "text-orange-500"}`}
                >
                  {tickMessage}
                </p>
              )}
            </div>

            <StreakCalendar activeDates={activeDates} />
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <BookOpen className="w-6 h-6 text-blue-500" />
            </div>
            <p className="text-2xl font-heading font-bold text-foreground">
              {overallPct}%
            </p>
            <p className="text-xs text-muted-foreground mt-1">Syllabus Done</p>
            <p className={`text-xs mt-1 font-medium ${category.color}`}>
              {category.label}
            </p>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Target
                className="w-6 h-6"
                style={{ color: "oklch(0.65 0.17 55)" }}
              />
            </div>
            <p className="text-2xl font-heading font-bold text-foreground">
              {countdown.days}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Days to Exam</p>
            <p className="text-xs text-muted-foreground">
              {countdown.hours}h {countdown.minutes}m left
            </p>
          </CardContent>
        </Card>

        <Card className="premium-card">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
            </div>
            <p className="text-2xl font-heading font-bold text-foreground">
              {overallPct >= 95
                ? "🐐"
                : overallPct >= 90
                  ? "⭐"
                  : overallPct >= 80
                    ? "🛡️"
                    : "—"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Badge</p>
            <p className="text-xs text-muted-foreground">
              {overallPct >= 95
                ? "GOAT"
                : overallPct >= 90
                  ? "Pro"
                  : overallPct >= 80
                    ? "Legend"
                    : `Need ${80 - overallPct}% more`}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Overall Progress */}
      <Card className="premium-card">
        <CardHeader className="pb-3">
          <CardTitle className="font-heading text-base flex items-center gap-2">
            <BookOpen
              className="w-4 h-4"
              style={{ color: "oklch(0.65 0.17 55)" }}
            />
            Overall Syllabus Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Progress value={overallPct} className="flex-1 h-3" />
            <span
              className="font-heading font-bold text-lg"
              style={{ color: "oklch(0.65 0.17 55)" }}
            >
              {overallPct}%
            </span>
          </div>
          <div className="flex gap-2 mt-3 flex-wrap">
            {[50, 60, 70, 80, 90, 100].map((threshold) => (
              <Badge
                key={threshold}
                variant={overallPct >= threshold ? "default" : "outline"}
                className="text-xs"
                style={
                  overallPct >= threshold
                    ? { background: "oklch(0.65 0.17 55)" }
                    : {}
                }
              >
                {threshold}%
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Access Grid */}
      <div>
        <h3 className="font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4" style={{ color: "oklch(0.65 0.17 55)" }} />
          Quick Access
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickLinks.map((link) => (
            <button
              type="button"
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`premium-card p-4 text-left hover:scale-105 transition-all duration-200 bg-gradient-to-br ${link.color} cursor-pointer`}
            >
              <span className="text-2xl block mb-2">{link.emoji}</span>
              <p className="font-heading font-semibold text-sm text-foreground">
                {link.label}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {link.desc}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
