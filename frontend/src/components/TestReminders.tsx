import { useState } from 'react';
import { useTestReminders } from '../hooks/useTestReminders';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Plus, Trash2, AlertTriangle } from 'lucide-react';
import { ncertSubjects } from '../data/ncertData';

export default function TestReminders() {
  const { reminders, addReminder, deleteReminder, getTestsDueSoon } = useTestReminders();
  const [subject, setSubject] = useState('');
  const [testDate, setTestDate] = useState('');
  const [notes, setNotes] = useState('');
  const [showForm, setShowForm] = useState(false);

  const dueSoon = getTestsDueSoon();

  const handleAdd = () => {
    if (!subject || !testDate) return;
    addReminder(subject, testDate, notes || undefined);
    setSubject('');
    setTestDate('');
    setNotes('');
    setShowForm(false);
  };

  const getDaysUntil = (dateStr: string) => {
    const diff = new Date(dateStr).getTime() - Date.now();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const getUrgencyColor = (dateStr: string) => {
    const days = getDaysUntil(dateStr);
    if (days <= 0) return 'bg-red-500';
    if (days <= 3) return 'bg-orange-500';
    if (days <= 7) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getUrgencyLabel = (dateStr: string) => {
    const days = getDaysUntil(dateStr);
    if (days <= 0) return '🔴 TODAY';
    if (days === 1) return '🟠 Tomorrow';
    if (days <= 3) return `🟠 ${days} days`;
    if (days <= 7) return `🟡 ${days} days`;
    return `🟢 ${days} days`;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="font-heading font-bold text-2xl text-foreground">📅 Test Reminders</h2>
        <Button
          size="sm"
          onClick={() => setShowForm(!showForm)}
          style={{ background: 'oklch(0.65 0.17 55)' }}
        >
          <Plus className="w-4 h-4 mr-1" /> Add Test
        </Button>
      </div>

      {dueSoon.length > 0 && (
        <Alert className="border-orange-500/50 bg-orange-500/10">
          <AlertTriangle className="w-4 h-4 text-orange-500" />
          <AlertDescription className="text-orange-700 dark:text-orange-400">
            <strong>⚠️ Tests due soon:</strong>{' '}
            {dueSoon
              .map(t => `${t.subject} (${getDaysUntil(t.testDate) <= 0 ? 'TODAY' : `${getDaysUntil(t.testDate)} day(s)`})`)
              .join(', ')}
          </AlertDescription>
        </Alert>
      )}

      {showForm && (
        <Card className="premium-card border-primary/30">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-heading">📝 Schedule a Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-xs mb-1 block">Subject *</Label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject..." />
                </SelectTrigger>
                <SelectContent>
                  {ncertSubjects.map(s => (
                    <SelectItem key={s.name} value={s.name}>
                      {s.icon} {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs mb-1 block">Test Date *</Label>
              <Input
                type="date"
                value={testDate}
                onChange={e => setTestDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <Label className="text-xs mb-1 block">Notes (optional)</Label>
              <Input
                placeholder="Chapters to cover, syllabus..."
                value={notes}
                onChange={e => setNotes(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleAdd}
                className="flex-1"
                style={{ background: 'oklch(0.65 0.17 55)' }}
                disabled={!subject || !testDate}
              >
                Schedule Test
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {reminders.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No tests scheduled yet.</p>
            <p className="text-sm mt-1">Add your monthly test dates to stay on track!</p>
          </div>
        )}
        {reminders.map(reminder => (
          <Card key={reminder.id} className="premium-card">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full flex-shrink-0 ${getUrgencyColor(reminder.testDate)}`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-heading font-semibold text-foreground">{reminder.subject}</p>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                    {getUrgencyLabel(reminder.testDate)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">
                  📅 {new Date(reminder.testDate).toLocaleDateString('en-IN', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                {reminder.notes && (
                  <p className="text-xs text-muted-foreground mt-1 italic">📝 {reminder.notes}</p>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-destructive flex-shrink-0"
                onClick={() => deleteReminder(reminder.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {reminders.length > 0 && (
        <Card className="premium-card bg-muted/30">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground text-center">
              💡 <strong>Tip:</strong> Schedule monthly tests for each subject to stay consistent.
              Tests due within 3 days will show an alert on your dashboard!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
