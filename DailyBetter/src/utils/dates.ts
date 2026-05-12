export function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

export function dateStr(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function monthStr(date: Date = new Date()): string {
  return date.toISOString().slice(0, 7);
}

export function addDays(date: Date, n: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

export function parseDate(str: string): Date {
  return new Date(str + 'T00:00:00');
}

export function formatDe(str: string): string {
  const d = parseDate(str);
  return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export function formatDayDe(str: string): string {
  const d = parseDate(str);
  return d.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' });
}

// Returns YYYY-MM-DD for last N days (today first)
export function lastNDays(n: number): string[] {
  const days: string[] = [];
  for (let i = 0; i < n; i++) {
    days.push(dateStr(addDays(new Date(), -i)));
  }
  return days;
}

// JS weekday: 0=Su → remap to 0=Mo
export function weekdayIndex(dateStr: string): number {
  const d = parseDate(dateStr);
  return (d.getDay() + 6) % 7;
}

export function isSunday(): boolean {
  return new Date().getDay() === 0;
}

export function isToday(str: string): boolean {
  return str === todayStr();
}
