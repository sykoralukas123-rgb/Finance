import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

export function getDb(): SQLite.SQLiteDatabase {
  if (!db) {
    db = SQLite.openDatabaseSync('dailybetter.db');
  }
  return db;
}

export async function initDb(): Promise<void> {
  const database = getDb();

  await database.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS habits (
      id          TEXT PRIMARY KEY,
      name        TEXT NOT NULL,
      icon        TEXT NOT NULL DEFAULT 'star-outline',
      identity    TEXT DEFAULT '',
      stack_after TEXT DEFAULT NULL,
      frequency   TEXT NOT NULL DEFAULT 'daily',
      custom_days TEXT DEFAULT NULL,
      color       TEXT DEFAULT '#6366f1',
      created_at  INTEGER NOT NULL,
      archived    INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS habit_completions (
      id         TEXT PRIMARY KEY,
      habit_id   TEXT NOT NULL REFERENCES habits(id) ON DELETE CASCADE,
      date       TEXT NOT NULL,
      xp_earned  INTEGER DEFAULT 10,
      UNIQUE(habit_id, date)
    );

    CREATE TABLE IF NOT EXISTS goals (
      id          TEXT PRIMARY KEY,
      title       TEXT NOT NULL,
      description TEXT DEFAULT '',
      area        TEXT DEFAULT NULL,
      horizon     TEXT NOT NULL DEFAULT '3months',
      target_date TEXT DEFAULT NULL,
      created_at  INTEGER NOT NULL,
      completed   INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS goal_habits (
      goal_id  TEXT REFERENCES goals(id) ON DELETE CASCADE,
      habit_id TEXT REFERENCES habits(id) ON DELETE CASCADE,
      PRIMARY KEY (goal_id, habit_id)
    );

    CREATE TABLE IF NOT EXISTS reflexionen (
      id          TEXT PRIMARY KEY,
      date        TEXT NOT NULL UNIQUE,
      mood        INTEGER DEFAULT 3,
      went_well   TEXT DEFAULT '',
      learned     TEXT DEFAULT '',
      created_at  INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS morgen_routinen (
      id          TEXT PRIMARY KEY,
      date        TEXT NOT NULL UNIQUE,
      intention   TEXT DEFAULT '',
      priority_1  TEXT DEFAULT '',
      priority_2  TEXT DEFAULT '',
      priority_3  TEXT DEFAULT '',
      created_at  INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS lebensbereich_ratings (
      id            TEXT PRIMARY KEY,
      month         TEXT NOT NULL UNIQUE,
      finanzen      INTEGER DEFAULT 5,
      studium       INTEGER DEFAULT 5,
      gesundheit    INTEGER DEFAULT 5,
      beruf         INTEGER DEFAULT 5,
      persoenlich   INTEGER DEFAULT 5
    );

    CREATE TABLE IF NOT EXISTS settings (
      key   TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
  `);
}
