import { Habit, HabitCompletion } from '@/types';
import { parseDate, todayStr, addDays, dateStr, weekdayIndex } from './dates';

export function isScheduledOn(habit: Habit, dateString: string): boolean {
  if (habit.frequency === 'daily') return true;
  if (habit.frequency === 'weekly') {
    // Scheduled on Mondays (weekday 0)
    return weekdayIndex(dateString) === 0;
  }
  if (habit.frequency === 'custom' && habit.customDays) {
    return habit.customDays.includes(weekdayIndex(dateString));
  }
  return true;
}

export function calculateStreaks(
  habit: Habit,
  completions: HabitCompletion[]
): { current: number; longest: number } {
  const completedDates = new Set(completions.map((c) => c.date));
  const today = todayStr();

  let current = 0;
  let longest = 0;
  let streak = 0;
  let cursor = new Date();

  // Walk backwards from today
  for (let i = 0; i < 365; i++) {
    const d = dateStr(addDays(cursor, -i));
    if (!isScheduledOn(habit, d)) continue;
    if (completedDates.has(d)) {
      streak++;
      if (i === 0 || i > 0) {
        // still building
      }
    } else {
      if (i === 0) {
        // not done today — streak might still be alive from yesterday
        continue;
      }
      break;
    }
  }
  current = streak;

  // Calculate longest streak
  let runningStreak = 0;
  const sortedDates = [...completedDates].sort();
  for (let i = 0; i < sortedDates.length; i++) {
    if (i === 0) {
      runningStreak = 1;
    } else {
      const prev = parseDate(sortedDates[i - 1]);
      const curr = parseDate(sortedDates[i]);
      const diffDays = Math.round((curr.getTime() - prev.getTime()) / 86400000);
      if (diffDays === 1) {
        runningStreak++;
      } else {
        runningStreak = 1;
      }
    }
    if (runningStreak > longest) longest = runningStreak;
  }

  return { current, longest };
}

// Recalculate current streak properly: consecutive scheduled days completed
export function currentStreak(habit: Habit, completions: HabitCompletion[]): number {
  const completedDates = new Set(completions.map((c) => c.date));
  let streak = 0;
  let i = 0;

  while (true) {
    const d = dateStr(addDays(new Date(), -i));
    if (!isScheduledOn(habit, d)) {
      i++;
      if (i > 365) break;
      continue;
    }
    if (completedDates.has(d)) {
      streak++;
      i++;
    } else if (i === 0) {
      // Didn't complete today yet — look at yesterday
      i++;
    } else {
      break;
    }
    if (i > 365) break;
  }
  return streak;
}
