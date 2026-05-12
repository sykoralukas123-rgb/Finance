# DailyBetter 📈

Self-Development App für tägliche Gewohnheitsbildung und Reflexion.

## Setup

```bash
cd DailyBetter
npm install
npx expo start
```

Dann QR-Code mit **Expo Go** (iOS/Android) scannen.

## Tech Stack

| Tool | Zweck |
|---|---|
| Expo + React Native + TypeScript | Framework |
| Expo Router | Dateibasiertes Routing |
| Zustand | State Management (reaktiver Cache) |
| expo-sqlite | Lokale Datenbank (Source of Truth) |
| react-native-svg | Charts (Radar, Mood, Heatmap) |
| react-native-reanimated | Animationen (Habit-Toggle) |
| expo-haptics | Haptisches Feedback |
| expo-notifications | Push-Reminder |

## Struktur

```
app/
  _layout.tsx          # Root-Layout: DB-Init, Store-Hydration
  index.tsx            # Redirect → Onboarding oder Tabs
  onboarding/          # 3-Screen Onboarding Flow
  (tabs)/              # Heute · Habits · Ziele · Insights · Profil
  modals/              # Habit-Form, Abend-Reflexion, Wochenreview, ...
src/
  db/                  # SQLite Client + Queries + Seed-Daten
  store/               # Zustand Stores (appStore, habitStore, goalStore, reflexionStore)
  components/          # UI-Komponenten + Charts
  hooks/               # useColors, useHaptics, useNotifications
  utils/               # dates, streaks, xp
  types/               # TypeScript-Typen
  constants/           # colors, icons
```

## Demo-Modus

Beim ersten Start werden automatisch Seed-Daten geladen:
- 3 Demo-Habits (Lesen, Sport, Steuer-Lerneinheit) mit 21 Tagen Completion-History
- 3 Demo-Ziele (Studium, Gesundheit, Finanzen)
- Lebensbereiche-Rating für den aktuellen Monat
- Name "Lukas" voreingestellt

Seed wird nur einmalig ausgeführt (`seeded`-Flag in SQLite settings).

## Features ergänzen

### Neuer Screen
1. Datei in `app/(tabs)/` oder `app/modals/` anlegen
2. Bei Tabs: `_layout.tsx` um `<Tabs.Screen>` erweitern

### Neue DB-Tabelle
1. `src/db/client.ts` → SQL in `initDb()` ergänzen
2. `src/db/queries/` → neue Query-Datei
3. Passendem Zustand-Store hinzufügen

### Neuen Store
1. `src/store/meinStore.ts` anlegen (Zustand-Pattern wie bestehende Stores)
2. In `app/_layout.tsx` → `useHydrate()` ergänzen

### Notifications anpassen
`src/hooks/useNotifications.ts` → `setupNotifications()` – Zeitpunkte und Texte ändern.

## Datenbank-Schema

Alle Daten bleiben lokal auf dem Gerät. Kein Cloud-Sync, kein Login.

```
habits              – Habit-Definitionen
habit_completions   – Tägliche Completions (unique per habit+date)
goals               – Langfristige Ziele
goal_habits         – Verknüpfung Ziele ↔ Habits
reflexionen         – Abend-Reflexionen (unique per date)
morgen_routinen     – Morgen-Routine (unique per date)
lebensbereich_ratings – Monats-Selbstbewertung der 5 Lebensbereiche
settings            – Key-Value Store für alle App-Einstellungen
```
