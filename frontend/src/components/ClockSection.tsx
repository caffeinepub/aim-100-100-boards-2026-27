import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useAlarms } from '../hooks/useAlarms';
import { useStopwatch } from '../hooks/useStopwatch';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { Plus, Trash2, Flag, RotateCcw, Play, Pause } from 'lucide-react';

function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const hourDeg = (hours % 12) * 30 + minutes * 0.5;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const secondDeg = seconds * 6;

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Analog Clock */}
      <div className="relative w-48 h-48">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="95" fill="none" stroke="oklch(0.65 0.17 55)" strokeWidth="3" />
          <circle cx="100" cy="100" r="90" fill="oklch(var(--card))" />
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 - 90) * (Math.PI / 180);
            const x1 = 100 + 75 * Math.cos(angle);
            const y1 = 100 + 75 * Math.sin(angle);
            const x2 = 100 + 85 * Math.cos(angle);
            const y2 = 100 + 85 * Math.sin(angle);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="oklch(var(--foreground))" strokeWidth={i % 3 === 0 ? 3 : 1} />;
          })}
          {/* Hour hand */}
          <line x1="100" y1="100" x2={100 + 50 * Math.cos((hourDeg - 90) * Math.PI / 180)} y2={100 + 50 * Math.sin((hourDeg - 90) * Math.PI / 180)} stroke="oklch(var(--foreground))" strokeWidth="5" strokeLinecap="round" />
          {/* Minute hand */}
          <line x1="100" y1="100" x2={100 + 65 * Math.cos((minuteDeg - 90) * Math.PI / 180)} y2={100 + 65 * Math.sin((minuteDeg - 90) * Math.PI / 180)} stroke="oklch(var(--foreground))" strokeWidth="3" strokeLinecap="round" />
          {/* Second hand */}
          <line x1="100" y1="100" x2={100 + 70 * Math.cos((secondDeg - 90) * Math.PI / 180)} y2={100 + 70 * Math.sin((secondDeg - 90) * Math.PI / 180)} stroke="oklch(0.65 0.17 55)" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="100" cy="100" r="4" fill="oklch(0.65 0.17 55)" />
        </svg>
      </div>
      {/* Digital */}
      <div className="text-center">
        <p className="font-mono text-5xl font-bold text-foreground tracking-wider">
          {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </p>
        <p className="text-muted-foreground mt-2">
          {time.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>
    </div>
  );
}

function AlarmManager() {
  const { playAlarm } = useSoundEffects();
  const { alarms, addAlarm, removeAlarm, toggleAlarm } = useAlarms(playAlarm);
  const [newTime, setNewTime] = useState('');
  const [newLabel, setNewLabel] = useState('');

  const handleAdd = () => {
    if (!newTime) return;
    addAlarm(newTime, newLabel || 'Alarm');
    setNewTime('');
    setNewLabel('');
  };

  return (
    <div className="space-y-4">
      <Card className="premium-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-heading">Add New Alarm</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs mb-1 block">Time</Label>
              <Input type="time" value={newTime} onChange={e => setNewTime(e.target.value)} />
            </div>
            <div>
              <Label className="text-xs mb-1 block">Label</Label>
              <Input placeholder="Study alarm..." value={newLabel} onChange={e => setNewLabel(e.target.value)} />
            </div>
          </div>
          <Button onClick={handleAdd} className="w-full" style={{ background: 'oklch(0.65 0.17 55)' }}>
            <Plus className="w-4 h-4 mr-2" /> Add Alarm
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-2">
        {alarms.length === 0 && (
          <p className="text-center text-muted-foreground py-8">No alarms set. Add one above!</p>
        )}
        {alarms.map(alarm => (
          <Card key={alarm.id} className={`premium-card ${alarm.triggered ? 'border-yellow-500 animate-pulse' : ''}`}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="flex-1">
                <p className="font-mono text-2xl font-bold text-foreground">{alarm.time}</p>
                <p className="text-sm text-muted-foreground">{alarm.label}</p>
                {alarm.triggered && <Badge className="text-xs mt-1 bg-yellow-500">🔔 Ringing!</Badge>}
              </div>
              <Switch checked={alarm.enabled} onCheckedChange={() => toggleAlarm(alarm.id)} />
              <Button variant="ghost" size="icon" onClick={() => removeAlarm(alarm.id)} className="text-destructive hover:bg-destructive/10">
                <Trash2 className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function StopwatchTab() {
  const { isRunning, elapsed, laps, start, pause, reset, lap, formatTime } = useStopwatch();

  return (
    <div className="space-y-4">
      <Card className="premium-card">
        <CardContent className="p-6 text-center">
          <p className="font-mono text-5xl font-bold text-foreground tracking-wider mb-6">
            {formatTime(elapsed)}
          </p>
          <div className="flex justify-center gap-3">
            <Button
              onClick={isRunning ? pause : start}
              className="px-8"
              style={{ background: isRunning ? 'oklch(0.577 0.245 27.325)' : 'oklch(0.65 0.17 55)' }}
            >
              {isRunning ? <><Pause className="w-4 h-4 mr-2" />Pause</> : <><Play className="w-4 h-4 mr-2" />Start</>}
            </Button>
            {isRunning && (
              <Button variant="outline" onClick={lap}>
                <Flag className="w-4 h-4 mr-2" />Lap
              </Button>
            )}
            <Button variant="outline" onClick={reset}>
              <RotateCcw className="w-4 h-4 mr-2" />Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {laps.length > 0 && (
        <Card className="premium-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-heading">Laps</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border max-h-48 overflow-y-auto scrollbar-thin">
              {[...laps].reverse().map(l => (
                <div key={l.id} className="flex items-center justify-between px-4 py-2 text-sm">
                  <span className="text-muted-foreground">Lap {l.id}</span>
                  <span className="font-mono text-foreground">{formatTime(l.split)}</span>
                  <span className="font-mono text-muted-foreground">{formatTime(l.time)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function ClockSection() {
  return (
    <div className="max-w-2xl mx-auto space-y-4 animate-fade-in">
      <h2 className="font-heading font-bold text-2xl text-foreground">⏰ Clock & Alarm</h2>
      <Tabs defaultValue="clock">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="clock">🕐 Clock</TabsTrigger>
          <TabsTrigger value="alarm">⏰ Alarm</TabsTrigger>
          <TabsTrigger value="stopwatch">⏱️ Stopwatch</TabsTrigger>
        </TabsList>
        <TabsContent value="clock" className="mt-4">
          <Card className="premium-card">
            <CardContent className="p-6">
              <LiveClock />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="alarm" className="mt-4">
          <AlarmManager />
        </TabsContent>
        <TabsContent value="stopwatch" className="mt-4">
          <StopwatchTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
