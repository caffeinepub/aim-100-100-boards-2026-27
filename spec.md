# Aim 100/100 Boards 2026–27

## Current State
- Dashboard shows a streak card with current streak, longest streak, and a 30-day activity grid (StreakCalendar).
- Streak is auto-recorded via `recordActivity()` called on app load when user is authenticated — no manual tick.
- `useStudyStreak` hook stores streak data in localStorage; `recordActivity` adds today only once per day.
- CrashCourseMode component shows a "90-Day Crash Course" section with week/day task accordion.
- Dashboard quick-links card shows "90-Day Plan" pointing to `crash-course` section.

## Requested Changes (Diff)

### Add
- **Daily Streak Tick Button** in the streak card on Dashboard: a prominent "Tick" / check-in button that the user manually taps to mark today's study day.
- **One-tick-per-day enforcement**: once ticked today, the button shows as "Already checked in today!" and is disabled for the rest of the day.
- **Celebration effect on tick**: play a celebratory fanfare sound + show a confetti/burst animation overlay when the user ticks.
- **45-Day Crash Course "Coming Soon"** section replacing the current 90-Day Crash Course — display a stylish "Coming Soon" banner/card instead of the full course content.

### Modify
- `useStudyStreak`: expose a `tickToday()` function that records activity only once per day and returns whether it was a new tick (for triggering celebration).
- `StreakCalendar`: still shows the 30-day grid (no change needed).
- `Dashboard`: streak card gets a "Tick Today" button below the streak counter; shows disabled state if already ticked today.
- `Dashboard` quick-links: update "90-Day Plan" label/desc to reflect "45-Day Crash Course" coming soon.
- `CrashCourseMode`: replace content with a "45-Day Crash Course — Coming Soon" placeholder UI.
- `MainLayout` nav: update crash course label to "45-Day Plan".

### Remove
- Auto-recording streak on every app load (`recordActivity()` call in App.tsx useEffect). The streak should now only advance when the user manually ticks.

## Implementation Plan
1. Update `useStudyStreak` hook — add `tickToday()` that checks if already ticked today; returns `{ alreadyTicked, streakIncreased }`.
2. Update `useSoundEffects` — add `playCelebration()` with an upbeat multi-note fanfare.
3. Update `Dashboard` — add tick button in streak card, trigger celebration (sound + CSS confetti animation) on first tick of the day, disable button after tick.
4. Update `App.tsx` — remove `recordActivity()` from useEffect so streak only advances via manual tick.
5. Replace `CrashCourseMode` component with "45-Day Crash Course — Coming Soon" UI.
6. Update Dashboard quick-links label for crash-course entry.
