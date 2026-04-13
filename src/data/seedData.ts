import type { Transaction, SavingsGoal } from '../types';

const now = new Date();
const y = now.getFullYear();
const m = now.getMonth() + 1;

const dateThisMonth = (day: number) =>
  `${y}-${String(m).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

const datePrevMonth = (day: number) => {
  const prev = new Date(y, m - 2, 1);
  return `${prev.getFullYear()}-${String(prev.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};

const date2MonthsAgo = (day: number) => {
  const prev = new Date(y, m - 3, 1);
  return `${prev.getFullYear()}-${String(prev.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};

export const SEED_TRANSACTIONS: Omit<Transaction, 'id' | 'createdAt'>[] = [
  // This month
  { type: 'einnahme', amount: 2800, categoryId: 'gehalt', date: dateThisMonth(1), note: 'Gehalt April' },
  { type: 'ausgabe', amount: 850, categoryId: 'wohnen', date: dateThisMonth(2), note: 'Miete' },
  { type: 'ausgabe', amount: 120, categoryId: 'lebensmittel', date: dateThisMonth(4), note: 'Edeka' },
  { type: 'ausgabe', amount: 45, categoryId: 'restaurant', date: dateThisMonth(5), note: 'Pizzeria' },
  { type: 'ausgabe', amount: 89, categoryId: 'transport', date: dateThisMonth(6), note: 'Monatsticket' },
  { type: 'ausgabe', amount: 38, categoryId: 'lebensmittel', date: dateThisMonth(8), note: 'Aldi' },
  { type: 'ausgabe', amount: 65, categoryId: 'freizeit', date: dateThisMonth(9), note: 'Kino & Bowling' },
  { type: 'ausgabe', amount: 22, categoryId: 'restaurant', date: dateThisMonth(10), note: 'Café' },
  { type: 'ausgabe', amount: 149, categoryId: 'kleidung', date: dateThisMonth(11), note: 'Zara Online' },
  { type: 'ausgabe', amount: 35, categoryId: 'gesundheit', date: dateThisMonth(12), note: 'Apotheke' },
  { type: 'einnahme', amount: 200, categoryId: 'nebeneinkommen', date: dateThisMonth(13), note: 'Freelance' },

  // Previous month
  { type: 'einnahme', amount: 2800, categoryId: 'gehalt', date: datePrevMonth(1), note: 'Gehalt' },
  { type: 'ausgabe', amount: 850, categoryId: 'wohnen', date: datePrevMonth(2), note: 'Miete' },
  { type: 'ausgabe', amount: 200, categoryId: 'lebensmittel', date: datePrevMonth(5), note: 'Wocheneinkauf' },
  { type: 'ausgabe', amount: 75, categoryId: 'restaurant', date: datePrevMonth(8), note: 'Restaurantbesuch' },
  { type: 'ausgabe', amount: 89, categoryId: 'transport', date: datePrevMonth(3), note: 'Monatsticket' },
  { type: 'ausgabe', amount: 120, categoryId: 'freizeit', date: datePrevMonth(14), note: 'Konzert' },
  { type: 'ausgabe', amount: 55, categoryId: 'versicherung', date: datePrevMonth(15), note: 'KFZ-Versicherung' },
  { type: 'ausgabe', amount: 280, categoryId: 'elektronik', date: datePrevMonth(20), note: 'Kopfhörer' },
  { type: 'ausgabe', amount: 30, categoryId: 'bildung', date: datePrevMonth(22), note: 'Udemy Kurs' },

  // 2 months ago
  { type: 'einnahme', amount: 2800, categoryId: 'gehalt', date: date2MonthsAgo(1), note: 'Gehalt' },
  { type: 'ausgabe', amount: 850, categoryId: 'wohnen', date: date2MonthsAgo(2), note: 'Miete' },
  { type: 'ausgabe', amount: 180, categoryId: 'lebensmittel', date: date2MonthsAgo(6), note: 'Einkauf' },
  { type: 'ausgabe', amount: 90, categoryId: 'transport', date: date2MonthsAgo(3), note: 'Monatsticket' },
  { type: 'ausgabe', amount: 60, categoryId: 'freizeit', date: date2MonthsAgo(10), note: 'Fitnessstudio' },
  { type: 'ausgabe', amount: 40, categoryId: 'restaurant', date: date2MonthsAgo(16), note: 'Mittagessen' },
  { type: 'einnahme', amount: 150, categoryId: 'nebeneinkommen', date: date2MonthsAgo(20), note: 'Verkauf' },
];

export const SEED_GOALS: Omit<SavingsGoal, 'id' | 'createdAt'>[] = [
  {
    name: 'Urlaub Italien',
    targetAmount: 1500,
    currentAmount: 400,
    targetDate: `${y}-08-01`,
    color: '#f59e0b',
  },
  {
    name: 'Notgroschen',
    targetAmount: 5000,
    currentAmount: 1200,
    targetDate: null,
    color: '#3b82f6',
  },
  {
    name: 'Neues Fahrrad',
    targetAmount: 800,
    currentAmount: 250,
    targetDate: `${y}-06-15`,
    color: '#10b981',
  },
];

export const SEED_BUDGETS = [
  { categoryId: 'lebensmittel', limitAmount: 300 },
  { categoryId: 'restaurant', limitAmount: 100 },
  { categoryId: 'freizeit', limitAmount: 150 },
  { categoryId: 'kleidung', limitAmount: 100 },
  { categoryId: 'transport', limitAmount: 100 },
];
