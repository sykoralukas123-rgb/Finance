import { getDb } from '../client';
import { Habit, HabitCompletion } from '@/types';

function rowToHabit(row: any): Habit {
  return {
    id: row.id,
    name: row.name,
    icon: row.icon,
    identity: row.identity ?? '',
    stackAfterId: row.stack_after ?? null,
    frequency: row.frequency,
    customDays: row.custom_days ? JSON.parse(row.custom_days) : null,
    color: row.color ?? '#6366f1',
    createdAt: row.created_at,
    archived: row.archived === 1,
  };
}

export function getAllHabits(): Habit[] {
  const db = getDb();
  const rows = db.getAllSync('SELECT * FROM habits WHERE archived = 0 ORDER BY created_at ASC');
  return rows.map(rowToHabit);
}

export function getHabitById(id: string): Habit | null {
  const db = getDb();
  const row = db.getFirstSync('SELECT * FROM habits WHERE id = ?', [id]);
  return row ? rowToHabit(row) : null;
}

export function insertHabit(habit: Habit): void {
  const db = getDb();
  db.runSync(
    `INSERT OR REPLACE INTO habits (id, name, icon, identity, stack_after, frequency, custom_days, color, created_at, archived)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      habit.id, habit.name, habit.icon, habit.identity,
      habit.stackAfterId, habit.frequency,
      habit.customDays ? JSON.stringify(habit.customDays) : null,
      habit.color, habit.createdAt, habit.archived ? 1 : 0,
    ]
  );
}

export function updateHabit(habit: Habit): void {
  insertHabit(habit);
}

export function archiveHabit(id: string): void {
  const db = getDb();
  db.runSync('UPDATE habits SET archived = 1 WHERE id = ?', [id]);
}

export function deleteHabit(id: string): void {
  const db = getDb();
  db.runSync('DELETE FROM habits WHERE id = ?', [id]);
}

// Completions
export function getCompletionsForHabit(habitId: string): HabitCompletion[] {
  const db = getDb();
  const rows = db.getAllSync(
    'SELECT * FROM habit_completions WHERE habit_id = ? ORDER BY date DESC',
    [habitId]
  );
  return rows.map((r: any) => ({
    id: r.id, habitId: r.habit_id, date: r.date, xpEarned: r.xp_earned,
  }));
}

export function getCompletionsByDate(date: string): HabitCompletion[] {
  const db = getDb();
  const rows = db.getAllSync(
    'SELECT * FROM habit_completions WHERE date = ?',
    [date]
  );
  return rows.map((r: any) => ({
    id: r.id, habitId: r.habit_id, date: r.date, xpEarned: r.xp_earned,
  }));
}

export function getAllCompletions(): HabitCompletion[] {
  const db = getDb();
  const rows = db.getAllSync('SELECT * FROM habit_completions ORDER BY date DESC');
  return rows.map((r: any) => ({
    id: r.id, habitId: r.habit_id, date: r.date, xpEarned: r.xp_earned,
  }));
}

export function insertCompletion(completion: HabitCompletion): void {
  const db = getDb();
  db.runSync(
    'INSERT OR IGNORE INTO habit_completions (id, habit_id, date, xp_earned) VALUES (?, ?, ?, ?)',
    [completion.id, completion.habitId, completion.date, completion.xpEarned]
  );
}

export function deleteCompletion(habitId: string, date: string): void {
  const db = getDb();
  db.runSync('DELETE FROM habit_completions WHERE habit_id = ? AND date = ?', [habitId, date]);
}

export function isCompletedOn(habitId: string, date: string): boolean {
  const db = getDb();
  const row = db.getFirstSync(
    'SELECT 1 FROM habit_completions WHERE habit_id = ? AND date = ?',
    [habitId, date]
  );
  return !!row;
}
