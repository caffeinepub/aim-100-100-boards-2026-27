import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { usePomodoro } from '../hooks/usePomodoro';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { Play, Pause, RotateCcw, SkipForward, Settings } from 'lucide-react';

export default function PomodoroTimer() {
  const { playAlarm } = useSoundEffects();
  const {
    mode, sessionCount, isRunning, remaining, progress,
    focusDuration, breakDuration, longBreakDuration,
    start, pause, reset, skip, setDurations, formatTime
  } = usePomodoro(playAlarm);

  const [showSettings, setShowSettings] = useState(false);
  const [focusMin, setFocusMin] = useState(String(focusDuration / 60));
  const [breakMin, setBreakMin] = useState(String(breakDuration / 60));
  const [longBreakMin, setLongBreakMin] = useState(String(longBreakDuration / 60));

  const handleSaveSettings = () => {
    const f = Math.max(1, parseInt(focusMin) || 25);
    const b = Math.max(1, parseInt(breakMin) || 5);
    const lb = Math.max(1, parseInt(longBreakMin) || 15);
    setDurations(f * 60, b * 60, lb * 60);
    setShowSettings(false);
  };

  const modeColors = {
    focus: 'oklch(0.65 0.17 55)',
    break: 'oklch(0.6 0.15 160)',
    longBreak: 'oklch(0.55 0.14 200)',
  };

  const modeLabels = {
    focus: '🎯 Focus Time',
    break: '☕ Short Break',
    longBreak: '🌿 Long Break',
  };

  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="max-w-lg mx-auto space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="font-heading font-bold text-2xl text-foreground">🍅 Study Timer</h2>
        <Button variant="ghost" size="icon" onClick={() => setShowSettings(!showSettings)}>
          <Settings className="w-5 h-5" />
        </Button>
      </div>

      {showSettings && (
        <Card className="premium-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-heading">⚙️ Timer Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label className="text-xs mb-1 block">Focus (min)</Label>
                <Input type="number" min="1" max="60" value={focusMin} onChange={e => setFocusMin(e.target.value)} />
              </div>
              <div>
                <Label className="text-xs mb-1 block">Break (min)</Label>
                <Input type="number" min="1" max="30" value={breakMin} onChange={e => setBreakMin(e.target.value)} />
              </div>
              <div>
                <Label className="text-xs mb-1 block">Long Break (min)</Label>
                <Input type="number" min="1" max="60" value={longBreakMin} onChange={e => setLongBreakMin(e.target.value)} />
              </div>
            </div>
            <Button onClick={handleSaveSettings} className="w-full" style={{ background: 'oklch(0.65 0.17 55)' }}>
              Save Settings
            </Button>
          </CardContent>
        </Card>
      )}

      <Card className="premium-card">
        <CardContent className="p-8 flex flex-col items-center gap-6">
          {/* Mode Badge */}
          <Badge className="text-sm px-4 py-1" style={{ background: modeColors[mode] }}>
            {modeLabels[mode]}
          </Badge>

          {/* Circular Progress */}
          <div className="relative w-56 h-56">
            <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
              <circle cx="100" cy="100" r="90" fill="none" stroke="oklch(var(--border))" strokeWidth="8" />
              <circle
                cx="100" cy="100" r="90" fill="none"
                stroke={modeColors[mode]}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                style={{ transition: 'stroke-dashoffset 0.5s ease' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="font-mono text-4xl font-bold text-foreground">{formatTime(remaining)}</p>
              <p className="text-muted-foreground text-sm mt-1">
                Session {Math.floor(sessionCount / 1) + (mode === 'focus' ? 1 : 0)}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-3">
            <Button
              onClick={isRunning ? pause : start}
              size="lg"
              className="px-8"
              style={{ background: modeColors[mode] }}
            >
              {isRunning ? <><Pause className="w-5 h-5 mr-2" />Pause</> : <><Play className="w-5 h-5 mr-2" />Start</>}
            </Button>
            <Button variant="outline" size="lg" onClick={reset}>
              <RotateCcw className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" onClick={skip}>
              <SkipForward className="w-5 h-5" />
            </Button>
          </div>

          {/* Session dots */}
          <div className="flex gap-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full transition-all duration-300"
                style={{ background: i < (sessionCount % 4) ? modeColors.focus : 'oklch(var(--border))' }}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Total sessions completed: <strong>{sessionCount}</strong>
          </p>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="premium-card">
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">
            💡 <strong>Pomodoro Tip:</strong> After every 4 focus sessions, take a 15-minute long break.
            Stay hydrated and avoid your phone during focus time!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
