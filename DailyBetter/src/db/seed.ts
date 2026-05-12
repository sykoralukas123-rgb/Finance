import { getDb } from './client';
import { getSetting, setSetting } from './queries/settings';
import { addDays, dateStr, todayStr } from '@/utils/dates';
import { v4 as uuid } from 'uuid';

export function seedDemoData(): void {
  if (getSetting('seeded') === 'true') return;

  const db = getDb();
  const today = todayStr();

  // Demo habits
  const habits = [
    { id: uuid(), name: 'Lesen', icon: 'book-outline', identity: 'Ich bin jemand, der täglich liest und sich weiterentwickelt.', color: '#6366f1', frequency: 'daily' },
    { id: uuid(), name: 'Sport', icon: 'fitness-outline', identity: 'Ich bin jemand, der seinen Körper täglich fordert.', color: '#10b981', frequency: 'daily' },
    { id: uuid(), name: 'Steuer-Lerneinheit', icon: 'calculator-outline', identity: 'Ich bin jemand, der konsequent auf sein Examen hinarbeitet.', color: '#f59e0b', frequency: 'daily' },
  ];

  for (const h of habits) {
    db.runSync(
      `INSERT OR IGNORE INTO habits (id, name, icon, identity, stack_after, frequency, custom_days, color, created_at, archived)
       VALUES (?, ?, ?, ?, NULL, ?, NULL, ?, ?, 0)`,
      [h.id, h.name, h.icon, h.identity, h.frequency, h.color, Date.now() - 30 * 86400000]
    );

    // Completions for last 21 days with some gaps
    for (let i = 1; i <= 21; i++) {
      if (Math.random() > 0.25) {
        const d = dateStr(addDays(new Date(), -i));
        db.runSync(
          `INSERT OR IGNORE INTO habit_completions (id, habit_id, date, xp_earned) VALUES (?, ?, ?, 10)`,
          [uuid(), h.id, d, 10]
        );
      }
    }
  }

  // Demo goals
  const goals = [
    {
      id: uuid(), title: 'StB-Zwischenprüfung bestehen', description: 'Alle relevanten Klausuren mit mindestens 60 Punkten bestehen.',
      area: 'studium', horizon: '3months',
    },
    {
      id: uuid(), title: '5 kg Muskelmasse aufbauen', description: 'Konsequentes Training und ausreichend Protein.',
      area: 'gesundheit', horizon: '3months',
    },
    {
      id: uuid(), title: 'Notfallfonds aufbauen', description: '3 Monatsgehälter als Rücklage.',
      area: 'finanzen', horizon: '1year',
    },
  ];

  for (const g of goals) {
    db.runSync(
      `INSERT OR IGNORE INTO goals (id, title, description, area, horizon, target_date, created_at, completed)
       VALUES (?, ?, ?, ?, ?, NULL, ?, 0)`,
      [g.id, g.title, g.description, g.area, g.horizon, Date.now()]
    );
  }

  // Demo reflexion for yesterday
  const yesterday = dateStr(addDays(new Date(), -1));
  db.runSync(
    `INSERT OR IGNORE INTO reflexionen (id, date, mood, went_well, learned, created_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [uuid(), yesterday, 4, 'Lerneinheit komplett durchgezogen und Sport nicht ausgelassen.', 'Früh anfangen macht den Unterschied.', Date.now()]
  );

  // Demo lebensbereiche
  const month = today.slice(0, 7);
  db.runSync(
    `INSERT OR IGNORE INTO lebensbereich_ratings (id, month, finanzen, studium, gesundheit, beruf, persoenlich)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [uuid(), month, 6, 7, 7, 6, 8]
  );

  // Settings
  setSetting('name', 'Lukas');
  setSetting('morning_time', '07:30');
  setSetting('evening_time', '21:00');
  setSetting('theme', 'dark');
  setSetting('level', '1');
  setSetting('total_xp', '45');
  setSetting('seeded', 'true');
}
