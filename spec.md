# Specification

## Summary
**Goal:** Build "Aim 100/100 Boards 2026–27", a premium EdTech study platform with a rich dark/light theme, comprehensive study tools, and full localStorage + Motoko backend persistence.

**Planned changes:**

### Shell & Theme
- App shell with title "Aim 100/100 Boards 2026–27", premium dark-mode-first palette (charcoal/slate backgrounds, gold/amber accents, white text)
- Modern card-style components with shadows, hover animations, and premium font pairing
- Dark/Light mode toggle accessible from all sections; preference saved in localStorage

### Authentication
- Login screen with username + password; first-use password setup flow
- Authenticated state persisted in localStorage; incorrect password shows error

### Clock Section
- Three tabs: Live digital/analog clock, Alarm (add/remove alarms with in-browser audio alert), Stopwatch (HH:MM:SS.ms with start, pause, lap, reset)

### Pomodoro Timer
- Configurable focus (25 min default) and break (5 min default) intervals; long break after 4 sessions
- Circular progress indicator, session counter, audio chime on transitions
- Date-based calculation to prevent drift with background tabs

### Image Gallery
- Two independent upload banks (Bank A and Bank B), each with 500 slots
- Images stored as base64 in localStorage; responsive grid display; slot usage counter; individual deletion

### Music Player
- Curated list of publicly available motivational songs and binaural beats (direct audio URLs or embed links)
- Play/pause, next, previous, volume controls; track name/type displayed
- Filter by "Motivational" and "Binaural Beats" tags

### NextTopper Updates Feed
- User-entered notification entries (title, description, optional link); newest-first feed
- Unread badge count on nav icon; mark-as-read clears badge; localStorage persistence

### Monthly Test Reminders
- Set monthly test date per NCERT subject; list/calendar view sorted by date
- In-app banner alert for tests due today or within 3 days; localStorage persistence

### Syllabus Tracker
- All major NCERT subjects for Classes 11 & 12 (Physics, Chemistry, Maths, Biology, English, etc.) with chapters
- Mark chapters complete; completion % per subject and overall
- Color-coded badge at 50/60/70/80/90/100% thresholds; localStorage persistence

### Exam Countdown
- User-set board exam target date (default 2027); live DD:HH:MM:SS countdown
- Motivational milestone messages based on days remaining; localStorage persistence

### Achievement Badges & Study Streak
- Legend badge at ≥80% overall completion, Pro at ≥90%, GOAT at ≥95%
- Animated badge reveal; study streak counter (increments daily, resets on missed day)
- Displayed prominently on dashboard; localStorage persistence

### AI Doubt Solver
- Chat-style interface with pre-seeded rule-based FAQ responses for NCERT subjects
- Fallback message when no match found; labeled as AI-assisted; chat history in localStorage

### 90-Day Crash Course Mode
- Structured 90-day study plan with day-by-day tasks per subject
- Checkbox task completion; weekly motivational quote; overall progress %; localStorage persistence

### Sound Effects
- Subtle click on button presses, success chime on chapter/task completion, alarm ring for clock/Pomodoro, fanfare on badge unlock

### Motoko Backend
- Single actor with stable variables for: hashed user credentials, syllabus progress, study streak, badges, Pomodoro session history, alarm settings, notifications, exam date, crash course progress, image metadata
- Query and update methods for all data types

**User-visible outcome:** Users get a fully-featured, premium-looking study platform with clocks, timers, galleries, music, notifications, syllabus tracking, countdown, achievements, an AI doubt solver, and a 90-day crash course — all with persistent data across sessions.
