import { useEffect, useRef } from 'react';
import { useSyllabusProgress } from '../hooks/useSyllabusProgress';
import { useStudyStreak } from '../hooks/useStudyStreak';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, Flame, Star, Target } from 'lucide-react';

interface BadgeDef {
  id: string;
  name: string;
  emoji: string;
  description: string;
  threshold: number;
  image: string;
  gradient: string;
  unlockMessage: string;
}

const badges: BadgeDef[] = [
  {
    id: 'legend',
    name: 'Legend',
    emoji: '🛡️',
    description: 'Achieve 80%+ overall syllabus completion',
    threshold: 80,
    image: '/assets/generated/badge-legend.dim_256x256.png',
    gradient: 'from-red-600 to-rose-500',
    unlockMessage: 'You are a Legend! 80% syllabus done!',
  },
  {
    id: 'pro',
    name: 'Pro',
    emoji: '⭐',
    description: 'Achieve 90%+ overall syllabus completion',
    threshold: 90,
    image: '/assets/generated/badge-pro.dim_256x256.png',
    gradient: 'from-purple-600 to-violet-500',
    unlockMessage: 'You are a Pro! 90% syllabus done!',
  },
  {
    id: 'goat',
    name: 'GOAT',
    emoji: '🐐',
    description: 'Achieve 95%+ overall syllabus completion',
    threshold: 95,
    image: '/assets/generated/badge-goat.dim_256x256.png',
    gradient: 'from-yellow-500 to-amber-400',
    unlockMessage: 'You are the GOAT! 95%+ syllabus done!',
  },
];

const streakBadges = [
  { days: 7, name: '7-Day Streak', emoji: '🔥', desc: 'Study 7 days in a row' },
  { days: 14, name: '2-Week Warrior', emoji: '⚡', desc: 'Study 14 days in a row' },
  { days: 30, name: '30-Day Champion', emoji: '🏆', desc: 'Study 30 days in a row' },
  { days: 60, name: '60-Day Master', emoji: '💎', desc: 'Study 60 days in a row' },
  { days: 90, name: '90-Day Legend', emoji: '👑', desc: 'Complete the full 90-day sprint' },
];

export default function AchievementBadges() {
  const { getOverallCompletion } = useSyllabusProgress();
  const { currentStreak, longestStreak } = useStudyStreak();
  const { playFanfare } = useSoundEffects();
  const prevPctRef = useRef<number | null>(null);

  const overallPct = getOverallCompletion();

  useEffect(() => {
    if (prevPctRef.current === null) {
      prevPctRef.current = overallPct;
      return;
    }
    const prev = prevPctRef.current;
    for (const badge of badges) {
      if (prev < badge.threshold && overallPct >= badge.threshold) {
        playFanfare();
        break;
      }
    }
    prevPctRef.current = overallPct;
  }, [overallPct, playFanfare]);

  const earnedBadges = badges.filter(b => overallPct >= b.threshold);
  const nextBadge = badges.find(b => overallPct < b.threshold);

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <h2 className="font-heading font-bold text-2xl text-foreground">🏆 Achievements</h2>

      {/* Current Status */}
      <Card className="premium-card overflow-hidden">
        <div
          className="p-6"
          style={{ background: 'linear-gradient(135deg, oklch(0.12 0.01 260), oklch(0.17 0.015 260))' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/70 text-sm">Overall Progress</p>
              <p className="font-heading font-black text-4xl" style={{ color: 'oklch(0.75 0.17 55)' }}>
                {overallPct}%
              </p>
            </div>
            <div className="text-right">
              <p className="text-white/70 text-sm">Study Streak</p>
              <div className="flex items-center gap-1 justify-end">
                <Flame className="w-5 h-5 text-orange-400 streak-fire" />
                <p className="font-heading font-black text-4xl text-white">{currentStreak}</p>
              </div>
              <p className="text-white/50 text-xs">Best: {longestStreak} days</p>
            </div>
          </div>
          <Progress value={overallPct} className="h-2" />
          {nextBadge && (
            <p className="text-white/60 text-xs mt-2">
              {nextBadge.threshold - overallPct}% more to unlock {nextBadge.emoji} {nextBadge.name}
            </p>
          )}
        </div>
      </Card>

      {/* Syllabus Badges */}
      <div>
        <h3 className="font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
          <Star className="w-4 h-4" style={{ color: 'oklch(0.65 0.17 55)' }} />
          Syllabus Badges
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {badges.map(badge => {
            const earned = overallPct >= badge.threshold;
            return (
              <Card
                key={badge.id}
                className={`premium-card text-center overflow-hidden transition-all duration-300 ${
                  earned ? 'shadow-gold' : 'opacity-60 grayscale'
                }`}
              >
                <CardContent className="p-5">
                  <div className={`relative mx-auto w-20 h-20 mb-3 ${earned ? 'badge-animate' : ''}`}>
                    <img
                      src={badge.image}
                      alt={badge.name}
                      className="w-full h-full object-contain"
                      onError={e => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    {!earned && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/60 rounded-full">
                        <span className="text-3xl">🔒</span>
                      </div>
                    )}
                  </div>
                  <div className={`inline-block px-3 py-1 rounded-full text-white text-sm font-bold mb-2 bg-gradient-to-r ${badge.gradient}`}>
                    {badge.emoji} {badge.name}
                  </div>
                  <p className="text-xs text-muted-foreground">{badge.description}</p>
                  {earned && (
                    <p className="text-xs font-medium mt-2" style={{ color: 'oklch(0.65 0.17 55)' }}>
                      ✅ Unlocked!
                    </p>
                  )}
                  {!earned && (
                    <div className="mt-2">
                      <Progress value={(overallPct / badge.threshold) * 100} className="h-1" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {overallPct}/{badge.threshold}%
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Streak Badges */}
      <div>
        <h3 className="font-heading font-semibold text-foreground mb-3 flex items-center gap-2">
          <Flame className="w-4 h-4 text-orange-500" />
          Streak Badges
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {streakBadges.map(sb => {
            const earned = longestStreak >= sb.days;
            return (
              <Card
                key={sb.days}
                className={`premium-card text-center transition-all duration-300 ${earned ? '' : 'opacity-50 grayscale'}`}
              >
                <CardContent className="p-4">
                  <span className="text-3xl block mb-2">{sb.emoji}</span>
                  <p className="font-heading font-semibold text-sm text-foreground">{sb.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{sb.desc}</p>
                  {earned ? (
                    <p className="text-xs font-medium mt-2" style={{ color: 'oklch(0.65 0.17 55)' }}>✅ Earned!</p>
                  ) : (
                    <p className="text-xs text-muted-foreground mt-2">{sb.days - longestStreak} more days</p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Motivational */}
      <Card className="premium-card bg-muted/30">
        <CardContent className="p-4 text-center">
          <Target className="w-8 h-8 mx-auto mb-2" style={{ color: 'oklch(0.65 0.17 55)' }} />
          <p className="font-heading font-semibold text-foreground">Keep Going!</p>
          <p className="text-sm text-muted-foreground mt-1">
            {earnedBadges.length === 0
              ? 'Complete 80% of your syllabus to earn your first badge!'
              : earnedBadges.length === badges.length
              ? '🎉 You\'ve earned all badges! You are the GOAT!'
              : `You've earned ${earnedBadges.length}/${badges.length} badges. Keep pushing!`}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
