import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Zap } from "lucide-react";

export default function CrashCourseMode() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] animate-fade-in px-4">
      <Card className="premium-card w-full max-w-md overflow-hidden">
        {/* Gradient top section */}
        <div
          className="p-8 text-center"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.12 0.015 260), oklch(0.18 0.02 265))",
          }}
        >
          {/* Glowing icon */}
          <div className="flex items-center justify-center mb-6">
            <div
              className="relative w-20 h-20 rounded-2xl flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.55 0.18 45), oklch(0.68 0.18 58))",
                boxShadow:
                  "0 0 40px oklch(0.65 0.17 55 / 0.6), 0 0 80px oklch(0.65 0.17 55 / 0.3)",
              }}
            >
              <Zap className="w-10 h-10 text-white" fill="white" />
              {/* Pulsing ring */}
              <span
                className="absolute inset-0 rounded-2xl animate-ping opacity-20"
                style={{
                  background: "oklch(0.65 0.17 55)",
                }}
              />
            </div>
          </div>

          <h2 className="font-heading font-black text-3xl text-white mb-2 tracking-tight">
            45-Day Crash Course
          </h2>

          <div className="flex justify-center mb-4">
            <Badge
              className="text-sm font-bold px-4 py-1 animate-pulse"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.55 0.18 45), oklch(0.68 0.18 58))",
                color: "white",
                border: "none",
              }}
            >
              ⚡ Coming Soon
            </Badge>
          </div>

          <p className="text-white/70 text-sm leading-relaxed max-w-xs mx-auto">
            An intense, focused 45-day plan designed to help you score{" "}
            <span
              className="font-bold"
              style={{ color: "oklch(0.78 0.17 55)" }}
            >
              100/100
            </span>{" "}
            in your Board exams. Stay tuned!
          </p>
        </div>

        <CardContent className="p-6 text-center space-y-4">
          {/* Feature preview pills */}
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              "📅 Daily Plans",
              "📚 Chapter-wise",
              "✅ Task Tracking",
              "🏆 Milestones",
              "📊 Progress",
            ].map((feat) => (
              <span
                key={feat}
                className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground font-medium"
              >
                {feat}
              </span>
            ))}
          </div>

          <p className="text-xs text-muted-foreground">
            We're crafting the perfect 45-day roadmap for you.
          </p>

          {/* Placeholder notify button */}
          <button
            type="button"
            disabled
            className="w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-muted-foreground cursor-not-allowed opacity-50 border border-border bg-muted/30"
          >
            🔔 Notify Me When Ready
          </button>

          <p className="text-xs text-muted-foreground/60 italic">
            Check back soon — great things take time!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
