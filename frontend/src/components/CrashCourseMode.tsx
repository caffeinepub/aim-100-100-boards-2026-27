import { useState } from 'react';
import { useCrashCourse } from '../hooks/useCrashCourse';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { crashCoursePlan } from '../data/crashCoursePlan';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Zap, Trophy, Calendar, Quote } from 'lucide-react';

const subjectColors: Record<string, string> = {
  Physics: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  Chemistry: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  Mathematics: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  Biology: 'bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-400',
  English: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  All: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
};

export default function CrashCourseMode() {
  const { toggleTask, isTaskCompleted, getOverallProgress, getWeekProgress } = useCrashCourse();
  const { playSuccess } = useSoundEffects();
  const [expandedWeek, setExpandedWeek] = useState<string>('week-0');

  const overallProgress = getOverallProgress();

  const handleToggleTask = (wi: number, di: number, ti: number) => {
    const wasCompleted = isTaskCompleted(wi, di, ti);
    toggleTask(wi, di, ti);
    if (!wasCompleted) playSuccess();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <h2 className="font-heading font-bold text-2xl text-foreground">⚡ 90-Day Crash Course</h2>
        <Badge style={{ background: 'oklch(0.65 0.17 55)' }}>
          {overallProgress}% done
        </Badge>
      </div>

      {/* Overall Progress */}
      <Card className="premium-card overflow-hidden">
        <div
          className="p-5"
          style={{ background: 'linear-gradient(135deg, oklch(0.12 0.01 260), oklch(0.17 0.015 260))' }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5" style={{ color: 'oklch(0.75 0.17 55)' }} />
              <span className="text-white font-heading font-semibold">Overall Progress</span>
            </div>
            <span className="font-heading font-black text-2xl" style={{ color: 'oklch(0.75 0.17 55)' }}>
              {overallProgress}%
            </span>
          </div>
          <Progress value={overallProgress} className="h-3" />
          <p className="text-white/60 text-xs mt-2">
            {crashCoursePlan.length * 7} days · {crashCoursePlan.reduce((acc, w) => acc + w.days.reduce((a, d) => a + d.tasks.length, 0), 0)} total tasks
          </p>
        </div>
      </Card>

      {/* Week Accordion */}
      <Accordion
        type="single"
        collapsible
        value={expandedWeek}
        onValueChange={v => setExpandedWeek(v || '')}
        className="space-y-3"
      >
        {crashCoursePlan.map((week, wi) => {
          const weekPct = getWeekProgress(wi);
          return (
            <AccordionItem
              key={wi}
              value={`week-${wi}`}
              className="premium-card border border-border rounded-2xl overflow-hidden"
            >
              <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-accent/10 transition-colors">
                <div className="flex items-center gap-3 w-full text-left">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ background: weekPct === 100 ? 'oklch(0.6 0.18 145)' : 'linear-gradient(135deg, oklch(0.55 0.17 45), oklch(0.65 0.17 55))' }}
                  >
                    {weekPct === 100 ? '✓' : `W${week.weekNumber}`}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-heading font-semibold text-foreground text-sm">
                        Week {week.weekNumber}: {week.theme}
                      </span>
                      <Badge variant="outline" className="text-xs">{weekPct}%</Badge>
                    </div>
                    <Progress value={weekPct} className="h-1 mt-1.5 max-w-48" />
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="px-5 pb-5 space-y-4">
                  {/* Weekly Quote */}
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-muted/50">
                    <Quote className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'oklch(0.65 0.17 55)' }} />
                    <p className="text-sm text-muted-foreground italic">{week.quote}</p>
                  </div>

                  {/* Days */}
                  <div className="space-y-3">
                    {week.days.map((day, di) => {
                      const dayCompleted = day.tasks.every((_, ti) => isTaskCompleted(wi, di, ti));
                      const dayPct = Math.round(
                        (day.tasks.filter((_, ti) => isTaskCompleted(wi, di, ti)).length / day.tasks.length) * 100
                      );

                      return (
                        <Card key={di} className={`border ${dayCompleted ? 'border-green-500/30 bg-green-500/5' : 'border-border'}`}>
                          <CardHeader className="pb-2 pt-3 px-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                                <span className="font-heading font-semibold text-sm text-foreground">
                                  Day {day.dayNumber}: {day.title}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground">{dayPct}%</span>
                                {dayCompleted && <span className="text-green-500 text-xs font-bold">✓ Done</span>}
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="px-4 pb-3 space-y-2">
                            {day.tasks.map((task, ti) => {
                              const done = isTaskCompleted(wi, di, ti);
                              return (
                                <div
                                  key={ti}
                                  className="flex items-start gap-3 cursor-pointer group"
                                  onClick={() => handleToggleTask(wi, di, ti)}
                                >
                                  <Checkbox
                                    checked={done}
                                    onCheckedChange={() => handleToggleTask(wi, di, ti)}
                                    className="mt-0.5 flex-shrink-0"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <span className={`text-sm ${done ? 'line-through text-muted-foreground' : 'text-foreground group-hover:text-foreground/80'}`}>
                                      {task.task}
                                    </span>
                                    <span className={`ml-2 text-xs px-1.5 py-0.5 rounded ${subjectColors[task.subject] || subjectColors['All']}`}>
                                      {task.subject}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      <Card className="premium-card bg-muted/30">
        <CardContent className="p-4 text-center">
          <Zap className="w-6 h-6 mx-auto mb-2" style={{ color: 'oklch(0.65 0.17 55)' }} />
          <p className="text-sm text-muted-foreground">
            <strong>90-Day Crash Course</strong> — Complete all tasks to master your board exam syllabus.
            Check off tasks as you complete them. Your progress is saved automatically!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
