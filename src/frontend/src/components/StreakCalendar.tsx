import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface StreakCalendarProps {
  activeDates: string[];
}

export default function StreakCalendar({ activeDates }: StreakCalendarProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = today.toDateString();

  // Build last 30 days array, oldest first
  const days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (29 - i));
    return d;
  });

  const formatLabel = (d: Date) => {
    return d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      weekday: "short",
    });
  };

  return (
    <TooltipProvider delayDuration={100}>
      <div className="mt-3">
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2 font-medium">
          Last 30 Days
        </p>
        <div className="grid grid-cols-[repeat(30,minmax(0,1fr))] gap-[3px]">
          {days.map((d) => {
            const dStr = d.toDateString();
            const isActive = activeDates.includes(dStr);
            const isToday = dStr === todayStr;

            return (
              <Tooltip key={dStr}>
                <TooltipTrigger asChild>
                  <div
                    className={[
                      "aspect-square rounded-sm cursor-default transition-all duration-200",
                      isActive
                        ? "bg-orange-500 shadow-[0_0_4px_rgba(249,115,22,0.6)]"
                        : "bg-muted/40 border border-border/30",
                      isToday && !isActive
                        ? "ring-1 ring-orange-400 ring-offset-1 ring-offset-background"
                        : "",
                      isToday && isActive
                        ? "ring-1 ring-white ring-offset-1 ring-offset-orange-500"
                        : "",
                    ].join(" ")}
                    aria-label={`${formatLabel(d)}${isActive ? " – studied" : ""}`}
                  />
                </TooltipTrigger>
                <TooltipContent side="top" className="text-xs px-2 py-1">
                  <span className="font-medium">{formatLabel(d)}</span>
                  {isActive && <span className="ml-1 text-orange-400">🔥</span>}
                  {isToday && !isActive && (
                    <span className="ml-1 text-muted-foreground">(today)</span>
                  )}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
}
