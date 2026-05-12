export const XP_PER_HABIT = 10;
export const XP_PER_LEVEL = 100;

export function xpToLevel(totalXp: number): number {
  return Math.floor(totalXp / XP_PER_LEVEL) + 1;
}

export function xpInCurrentLevel(totalXp: number): number {
  return totalXp % XP_PER_LEVEL;
}

export function xpProgressPercent(totalXp: number): number {
  return (xpInCurrentLevel(totalXp) / XP_PER_LEVEL) * 100;
}

export function levelTitle(level: number): string {
  if (level < 3) return 'Neuling';
  if (level < 6) return 'Anfänger';
  if (level < 10) return 'Aufsteiger';
  if (level < 15) return 'Fortgeschrittener';
  if (level < 20) return 'Experte';
  if (level < 30) return 'Meister';
  return 'Legende';
}
