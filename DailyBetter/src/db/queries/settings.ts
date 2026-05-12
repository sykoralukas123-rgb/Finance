import { getDb } from '../client';
import { AppSettings } from '@/types';

export function getSetting(key: string): string | null {
  const db = getDb();
  const row = db.getFirstSync('SELECT value FROM settings WHERE key = ?', [key]) as any;
  return row?.value ?? null;
}

export function setSetting(key: string, value: string): void {
  const db = getDb();
  db.runSync(
    'INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value',
    [key, value]
  );
}

export function getSettings(): AppSettings {
  return {
    name: getSetting('name') ?? '',
    morningTime: getSetting('morning_time') ?? '07:30',
    eveningTime: getSetting('evening_time') ?? '21:00',
    onboardingDone: getSetting('onboarding_done') === 'true',
    theme: (getSetting('theme') as 'dark' | 'light') ?? 'dark',
    level: parseInt(getSetting('level') ?? '1', 10),
    totalXp: parseInt(getSetting('total_xp') ?? '0', 10),
  };
}

export function saveSettings(s: Partial<AppSettings>): void {
  if (s.name !== undefined) setSetting('name', s.name);
  if (s.morningTime !== undefined) setSetting('morning_time', s.morningTime);
  if (s.eveningTime !== undefined) setSetting('evening_time', s.eveningTime);
  if (s.onboardingDone !== undefined) setSetting('onboarding_done', String(s.onboardingDone));
  if (s.theme !== undefined) setSetting('theme', s.theme);
  if (s.level !== undefined) setSetting('level', String(s.level));
  if (s.totalXp !== undefined) setSetting('total_xp', String(s.totalXp));
}
