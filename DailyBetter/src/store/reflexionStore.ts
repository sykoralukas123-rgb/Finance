import { create } from 'zustand';
import { Reflexion, MorgenRoutine, LebensbereichRating } from '@/types';
import {
  getAllReflexionen, upsertReflexion, getReflexionByDate,
  getMorgenRoutineByDate, upsertMorgenRoutine,
  getLebensbereichRatingByMonth, upsertLebensbereichRating,
} from '@/db/queries/reflexionen';
import { todayStr, monthStr } from '@/utils/dates';
import { v4 as uuid } from 'uuid';

interface ReflexionState {
  reflexionen: Reflexion[];
  todayMorgen: MorgenRoutine | null;
  todayReflexion: Reflexion | null;
  currentRating: LebensbereichRating | null;
  hydrated: boolean;
  hydrate: () => void;
  saveMorgenRoutine: (data: Omit<MorgenRoutine, 'id' | 'date' | 'createdAt'>) => void;
  saveReflexion: (data: Omit<Reflexion, 'id' | 'date' | 'createdAt'>) => void;
  saveRating: (data: Omit<LebensbereichRating, 'id' | 'month'>) => void;
}

export const useReflexionStore = create<ReflexionState>((set) => ({
  reflexionen: [],
  todayMorgen: null,
  todayReflexion: null,
  currentRating: null,
  hydrated: false,

  hydrate: () => {
    const today = todayStr();
    const month = monthStr();
    const reflexionen = getAllReflexionen();
    const todayMorgen = getMorgenRoutineByDate(today);
    const todayReflexion = getReflexionByDate(today);
    const currentRating = getLebensbereichRatingByMonth(month);
    set({ reflexionen, todayMorgen, todayReflexion, currentRating, hydrated: true });
  },

  saveMorgenRoutine: (data) => {
    const today = todayStr();
    const m: MorgenRoutine = { id: uuid(), date: today, createdAt: Date.now(), ...data };
    upsertMorgenRoutine(m);
    set({ todayMorgen: m });
  },

  saveReflexion: (data) => {
    const today = todayStr();
    const r: Reflexion = { id: uuid(), date: today, createdAt: Date.now(), ...data };
    upsertReflexion(r);
    set((s) => ({
      todayReflexion: r,
      reflexionen: [r, ...s.reflexionen.filter((x) => x.date !== today)],
    }));
  },

  saveRating: (data) => {
    const month = monthStr();
    const lr: LebensbereichRating = { id: uuid(), month, ...data };
    upsertLebensbereichRating(lr);
    set({ currentRating: lr });
  },
}));
