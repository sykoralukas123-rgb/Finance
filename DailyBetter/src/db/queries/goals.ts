import { getDb } from '../client';
import { Goal } from '@/types';

function rowToGoal(row: any, linkedIds: string[]): Goal {
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? '',
    area: row.area ?? null,
    horizon: row.horizon,
    targetDate: row.target_date ?? null,
    createdAt: row.created_at,
    completed: row.completed === 1,
    linkedHabitIds: linkedIds,
  };
}

export function getAllGoals(): Goal[] {
  const db = getDb();
  const rows = db.getAllSync('SELECT * FROM goals ORDER BY created_at ASC');
  return rows.map((r: any) => {
    const links = db.getAllSync('SELECT habit_id FROM goal_habits WHERE goal_id = ?', [r.id]) as any[];
    return rowToGoal(r, links.map((l) => l.habit_id));
  });
}

export function insertGoal(goal: Goal): void {
  const db = getDb();
  db.runSync(
    `INSERT OR REPLACE INTO goals (id, title, description, area, horizon, target_date, created_at, completed)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [goal.id, goal.title, goal.description, goal.area, goal.horizon,
     goal.targetDate, goal.createdAt, goal.completed ? 1 : 0]
  );
  db.runSync('DELETE FROM goal_habits WHERE goal_id = ?', [goal.id]);
  for (const hid of goal.linkedHabitIds) {
    db.runSync('INSERT OR IGNORE INTO goal_habits (goal_id, habit_id) VALUES (?, ?)', [goal.id, hid]);
  }
}

export function updateGoal(goal: Goal): void {
  insertGoal(goal);
}

export function deleteGoal(id: string): void {
  const db = getDb();
  db.runSync('DELETE FROM goals WHERE id = ?', [id]);
}

export function markGoalComplete(id: string, completed: boolean): void {
  const db = getDb();
  db.runSync('UPDATE goals SET completed = ? WHERE id = ?', [completed ? 1 : 0, id]);
}
