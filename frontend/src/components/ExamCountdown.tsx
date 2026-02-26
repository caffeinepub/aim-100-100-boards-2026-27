import { useState } from 'react';
import { useCountdown } from '../hooks/useCountdown';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Target, Edit2, Check, X } from 'lucide-react';

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center shadow-gold"
        style={{ background: 'linear-gradient(135deg, oklch(0.17 0.015 260), oklch(0.22 0.02 260))', border: '1px solid oklch(0.65 0.17 55 / 0.3)' }}
      >
        <span className="font-mono font-black text-3xl sm:text-4xl" style={{ color: 'oklch(0.75 0.17 55)' }}>
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="text-xs text-muted-foreground mt-2 font-medium uppercase tracking-wider">{label}</span>
    </div>
  );
}

const milestones = [
  { days: 365, label: '1 Year to Go', emoji: '🌱', tip: 'Build strong foundations. Master NCERT basics.' },
  { days: 180, label: '6 Months Left', emoji: '📚', tip: 'Complete first reading of all subjects.' },
  { days: 90, label: '90 Days Sprint', emoji: '🚀', tip: 'Start intensive revision and mock tests.' },
  { days: 60, label: '60 Days Push', emoji: '💪', tip: 'Focus on weak areas and previous year papers.' },
  { days: 30, label: '1 Month Final', emoji: '⚡', tip: 'Daily mock tests and formula revision.' },
  { days: 14, label: '2 Weeks Crunch', emoji: '🔥', tip: 'Only revision — no new topics.' },
  { days: 7, label: 'Final Week', emoji: '🎯', tip: 'Light revision, stay calm, sleep well.' },
  { days: 1, label: 'Tomorrow!', emoji: '🌟', tip: 'Rest, prepare stationery, believe in yourself.' },
];

export default function ExamCountdown() {
  const { countdown, examDate, setExamDate, getMilestoneMessage } = useCountdown();
  const [editing, setEditing] = useState(false);
  const [tempDate, setTempDate] = useState(examDate);

  const handleSave = () => {
    if (tempDate) {
      setExamDate(tempDate);
      setEditing(false);
    }
  };

  const handleCancel = () => {
    setTempDate(examDate);
    setEditing(false);
  };

  const getActiveMilestone = () => {
    const days = countdown.days;
    for (const m of milestones) {
      if (days <= m.days) return m;
    }
    return null;
  };

  const activeMilestone = getActiveMilestone();

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="font-heading font-bold text-2xl text-foreground">🎯 Exam Countdown</h2>
        {!editing ? (
          <Button variant="outline" size="sm" onClick={() => { setTempDate(examDate); setEditing(true); }}>
            <Edit2 className="w-4 h-4 mr-1" /> Change Date
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button size="sm" onClick={handleSave} style={{ background: 'oklch(0.65 0.17 55)' }}>
              <Check className="w-4 h-4 mr-1" /> Save
            </Button>
            <Button variant="outline" size="sm" onClick={handleCancel}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {editing && (
        <Card className="premium-card border-primary/30">
          <CardContent className="p-4">
            <Label className="text-sm mb-2 block font-medium">Set Board Exam Date</Label>
            <Input
              type="date"
              value={tempDate}
              onChange={e => setTempDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
            <p className="text-xs text-muted-foreground mt-2">
              Default is set to March 1, 2027 (CBSE Board Exam target)
            </p>
          </CardContent>
        </Card>
      )}

      {/* Main Countdown */}
      <Card className="premium-card overflow-hidden">
        <div
          className="p-6 sm:p-8 text-center"
          style={{ background: 'linear-gradient(135deg, oklch(0.12 0.01 260), oklch(0.17 0.015 260))' }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Target className="w-5 h-5" style={{ color: 'oklch(0.75 0.17 55)' }} />
            <p className="text-white/70 text-sm font-medium">
              Board Exam: {new Date(examDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {countdown.total <= 0 ? (
            <div className="py-8">
              <p className="text-5xl mb-4">🎓</p>
              <p className="text-white font-heading font-bold text-2xl">Exam Day is Here!</p>
              <p className="text-white/70 mt-2">Give it your absolute best. You've got this!</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-center gap-3 sm:gap-6 my-6">
                <CountdownUnit value={countdown.days} label="Days" />
                <span className="text-3xl font-bold mb-6" style={{ color: 'oklch(0.65 0.17 55)' }}>:</span>
                <CountdownUnit value={countdown.hours} label="Hours" />
                <span className="text-3xl font-bold mb-6" style={{ color: 'oklch(0.65 0.17 55)' }}>:</span>
                <CountdownUnit value={countdown.minutes} label="Minutes" />
                <span className="text-3xl font-bold mb-6" style={{ color: 'oklch(0.65 0.17 55)' }}>:</span>
                <CountdownUnit value={countdown.seconds} label="Seconds" />
              </div>
              <p className="text-white/80 text-base font-medium italic">{getMilestoneMessage()}</p>
            </>
          )}
        </div>
      </Card>

      {/* Active Milestone */}
      {activeMilestone && (
        <Card className="premium-card border-primary/30">
          <CardContent className="p-4 flex items-center gap-4">
            <span className="text-4xl">{activeMilestone.emoji}</span>
            <div>
              <p className="font-heading font-bold text-foreground">{activeMilestone.label}</p>
              <p className="text-sm text-muted-foreground mt-0.5">💡 {activeMilestone.tip}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Milestones Timeline */}
      <Card className="premium-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-heading">📍 Study Milestones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {milestones.map(m => {
              const isPast = countdown.days > m.days;
              const isCurrent = activeMilestone?.days === m.days;
              return (
                <div
                  key={m.days}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                    isCurrent
                      ? 'border border-primary/40 bg-primary/5'
                      : isPast
                      ? 'opacity-40'
                      : 'opacity-80'
                  }`}
                >
                  <span className="text-xl">{m.emoji}</span>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${isCurrent ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {m.label}
                    </p>
                    <p className="text-xs text-muted-foreground">{m.tip}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{m.days}d</span>
                  {isPast && <span className="text-green-500 text-xs">✓</span>}
                  {isCurrent && <span className="text-xs font-bold" style={{ color: 'oklch(0.65 0.17 55)' }}>NOW</span>}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
