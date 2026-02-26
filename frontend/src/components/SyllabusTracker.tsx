import { useState } from 'react';
import { useSyllabusProgress, getCompletionCategory } from '../hooks/useSyllabusProgress';
import { useSoundEffects } from '../hooks/useSoundEffects';
import { ncertSubjects } from '../data/ncertData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, BookOpen, Trophy } from 'lucide-react';

export default function SyllabusTracker() {
  const { toggleChapter, getSubjectCompletion, getOverallCompletion, isChapterCompleted } = useSyllabusProgress();
  const { playSuccess } = useSoundEffects();
  const [openSubjects, setOpenSubjects] = useState<Set<string>>(new Set());

  const overallPct = getOverallCompletion();
  const overallCategory = getCompletionCategory(overallPct);

  const toggleSubject = (name: string) => {
    setOpenSubjects(prev => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const handleToggleChapter = (subject: string, chapter: string) => {
    const wasCompleted = isChapterCompleted(subject, chapter);
    toggleChapter(subject, chapter);
    if (!wasCompleted) playSuccess();
  };

  const getProgressBarColor = (pct: number): string => {
    if (pct >= 100) return 'oklch(0.75 0.17 55)';
    if (pct >= 90) return 'oklch(0.6 0.18 145)';
    if (pct >= 80) return 'oklch(0.65 0.16 155)';
    if (pct >= 70) return 'oklch(0.72 0.18 120)';
    if (pct >= 60) return 'oklch(0.7 0.18 55)';
    if (pct >= 50) return 'oklch(0.65 0.2 30)';
    return 'oklch(0.55 0.15 260)';
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4 animate-fade-in">
      <h2 className="font-heading font-bold text-2xl text-foreground">📚 Syllabus Tracker</h2>

      {/* Overall Progress Card */}
      <Card className="premium-card">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5" style={{ color: 'oklch(0.65 0.17 55)' }} />
              <span className="font-heading font-semibold text-foreground">Overall Progress</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-semibold px-2 py-0.5 rounded-full ${overallCategory.bg} ${overallCategory.color}`}>
                {overallCategory.label}
              </span>
              <span className="font-heading font-bold text-xl" style={{ color: 'oklch(0.65 0.17 55)' }}>
                {overallPct}%
              </span>
            </div>
          </div>
          <Progress value={overallPct} className="h-3" />
          <div className="flex gap-1.5 mt-3 flex-wrap">
            {[50, 60, 70, 80, 90, 100].map(threshold => (
              <Badge
                key={threshold}
                variant={overallPct >= threshold ? 'default' : 'outline'}
                className="text-xs"
                style={overallPct >= threshold ? { background: getProgressBarColor(threshold) } : {}}
              >
                {threshold}%
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Subject Cards */}
      <div className="space-y-3">
        {ncertSubjects.map(subject => {
          const pct = getSubjectCompletion(subject.name);
          const category = getCompletionCategory(pct);
          const isOpen = openSubjects.has(subject.name);
          const completedCount = subject.chapters.filter(ch => isChapterCompleted(subject.name, ch)).length;

          return (
            <Card key={subject.name} className="premium-card overflow-hidden">
              <Collapsible open={isOpen} onOpenChange={() => toggleSubject(subject.name)}>
                <CollapsibleTrigger className="w-full">
                  <CardHeader className="pb-3 hover:bg-accent/10 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{subject.icon}</span>
                      <div className="flex-1 min-w-0 text-left">
                        <div className="flex items-center gap-2 flex-wrap">
                          <CardTitle className="text-base font-heading">{subject.name}</CardTitle>
                          <Badge variant="outline" className="text-xs">Class {subject.class}</Badge>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${category.bg} ${category.color}`}>
                            {pct}%
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <Progress value={pct} className="flex-1 h-1.5" />
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {completedCount}/{subject.chapters.length}
                          </span>
                        </div>
                      </div>
                      {isOpen
                        ? <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        : <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      }
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0 pb-4">
                    <div className="border-t border-border pt-3 space-y-2">
                      {subject.chapters.map(chapter => {
                        const done = isChapterCompleted(subject.name, chapter);
                        return (
                          <div
                            key={chapter}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/10 transition-colors cursor-pointer"
                            onClick={() => handleToggleChapter(subject.name, chapter)}
                          >
                            <Checkbox
                              checked={done}
                              onCheckedChange={() => handleToggleChapter(subject.name, chapter)}
                              className="flex-shrink-0"
                            />
                            <span className={`text-sm flex-1 ${done ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                              {chapter}
                            </span>
                            {done && <span className="text-xs text-green-500">✓</span>}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          );
        })}
      </div>

      <Card className="premium-card bg-muted/30">
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground text-center">
            💡 <strong>Tip:</strong> Click on any subject to expand its chapters. Check off chapters as you complete them.
            Your progress is saved automatically!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
