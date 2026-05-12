import { getDb } from '../client';
import { Reflexion, MorgenRoutine, LebensbereichRating } from '@/types';

// Reflexionen
export function getAllReflexionen(): Reflexion[] {
  const db = getDb();
  const rows = db.getAllSync('SELECT * FROM reflexionen ORDER BY date DESC');
  return rows.map((r: any) => ({
    id: r.id, date: r.date, mood: r.mood,
    wentWell: r.went_well ?? '', learned: r.learned ?? '',
    createdAt: r.created_at,
  }));
}

export function getReflexionByDate(date: string): Reflexion | null {
  const db = getDb();
  const r = db.getFirstSync('SELECT * FROM reflexionen WHERE date = ?', [date]) as any;
  if (!r) return null;
  return { id: r.id, date: r.date, mood: r.mood, wentWell: r.went_well ?? '', learned: r.learned ?? '', createdAt: r.created_at };
}

export function upsertReflexion(r: Reflexion): void {
  const db = getDb();
  db.runSync(
    `INSERT INTO reflexionen (id, date, mood, went_well, learned, created_at)
     VALUES (?, ?, ?, ?, ?, ?)
     ON CONFLICT(date) DO UPDATE SET mood=excluded.mood, went_well=excluded.went_well, learned=excluded.learned`,
    [r.id, r.date, r.mood, r.wentWell, r.learned, r.createdAt]
  );
}

// Morgen-Routinen
export function getMorgenRoutineByDate(date: string): MorgenRoutine | null {
  const db = getDb();
  const r = db.getFirstSync('SELECT * FROM morgen_routinen WHERE date = ?', [date]) as any;
  if (!r) return null;
  return {
    id: r.id, date: r.date, intention: r.intention ?? '',
    priority1: r.priority_1 ?? '', priority2: r.priority_2 ?? '', priority3: r.priority_3 ?? '',
    createdAt: r.created_at,
  };
}

export function upsertMorgenRoutine(m: MorgenRoutine): void {
  const db = getDb();
  db.runSync(
    `INSERT INTO morgen_routinen (id, date, intention, priority_1, priority_2, priority_3, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(date) DO UPDATE SET intention=excluded.intention, priority_1=excluded.priority_1, priority_2=excluded.priority_2, priority_3=excluded.priority_3`,
    [m.id, m.date, m.intention, m.priority1, m.priority2, m.priority3, m.createdAt]
  );
}

// Lebensbereiche
export function getLebensbereichRatingByMonth(month: string): LebensbereichRating | null {
  const db = getDb();
  const r = db.getFirstSync('SELECT * FROM lebensbereich_ratings WHERE month = ?', [month]) as any;
  if (!r) return null;
  return { id: r.id, month: r.month, finanzen: r.finanzen, studium: r.studium, gesundheit: r.gesundheit, beruf: r.beruf, persoenlich: r.persoenlich };
}

export function upsertLebensbereichRating(lr: LebensbereichRating): void {
  const db = getDb();
  db.runSync(
    `INSERT INTO lebensbereich_ratings (id, month, finanzen, studium, gesundheit, beruf, persoenlich)
     VALUES (?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(month) DO UPDATE SET finanzen=excluded.finanzen, studium=excluded.studium, gesundheit=excluded.gesundheit, beruf=excluded.beruf, persoenlich=excluded.persoenlich`,
    [lr.id, lr.month, lr.finanzen, lr.studium, lr.gesundheit, lr.beruf, lr.persoenlich]
  );
}
