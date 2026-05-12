import React, { useMemo } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { useHabitStore } from '@/store/habitStore';
import { useReflexionStore } from '@/store/reflexionStore';
import { ThemedText } from '@/components/ui/ThemedText';
import { Card } from '@/components/ui/Card';
import { MoodLineChart } from '@/components/charts/MoodLineChart';
import { lastNDays, weekdayIndex } from '@/utils/dates';
import { MOOD_EMOJIS } from '@/constants/icons';

export default function WochenReview() {
  const C = useColors();
  const { habits, completions } = useHabitStore();
  const { reflexionen } = useReflexionStore();

  const last7 = useMemo(() => lastNDays(7), []);

  const weekCompletions = completions.filter((c) => last7.includes(c.date));
  const weekReflexionen = reflexionen
    .filter((r) => last7.includes(r.date))
    .sort((a, b) => a.date.localeCompare(b.date));

  const avgMood = weekReflexionen.length > 0
    ? weekReflexionen.reduce((s, r) => s + r.mood, 0) / weekReflexionen.length
    : null;

  const habitStats = habits.map((h) => {
    const scheduled = last7.filter((d) => {
      if (h.frequency === 'daily') return true;
      if (h.frequency === 'weekly') return weekdayIndex(d) === 0;
      if (h.frequency === 'custom' && h.customDays) return h.customDays.includes(weekdayIndex(d));
      return false;
    }).length;
    const done = weekCompletions.filter((c) => c.habitId === h.id).length;
    return { habit: h, done, scheduled, rate: scheduled > 0 ? Math.round((done / scheduled) * 100) : 0 };
  });

  const bestHabit = [...habitStats].sort((a, b) => b.rate - a.rate)[0];
  const worstHabit = [...habitStats].sort((a, b) => a.rate - b.rate)[0];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        <ThemedText variant="heading" style={{ marginBottom: 4 }}>📊 Wochenreview</ThemedText>
        <ThemedText variant="secondary" style={{ marginBottom: 24 }}>Die letzten 7 Tage im Überblick</ThemedText>

        {/* Summary */}
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20 }}>
          <Card style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 22 }}>✅</Text>
            <ThemedText style={{ fontWeight: '700', fontSize: 20 }}>{weekCompletions.length}</ThemedText>
            <ThemedText variant="muted">Completions</ThemedText>
          </Card>
          <Card style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 22 }}>{avgMood ? MOOD_EMOJIS[Math.round(avgMood) - 1] : '😐'}</Text>
            <ThemedText style={{ fontWeight: '700', fontSize: 20 }}>
              {avgMood ? avgMood.toFixed(1) : '–'}
            </ThemedText>
            <ThemedText variant="muted">Ø Stimmung</ThemedText>
          </Card>
          <Card style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 22 }}>📅</Text>
            <ThemedText style={{ fontWeight: '700', fontSize: 20 }}>{weekReflexionen.length}</ThemedText>
            <ThemedText variant="muted">Reflexionen</ThemedText>
          </Card>
        </View>

        {/* Habit breakdown */}
        <Card style={{ marginBottom: 20 }}>
          <ThemedText style={{ fontWeight: '600', marginBottom: 12 }}>Habit-Übersicht</ThemedText>
          {habitStats.length === 0 ? (
            <ThemedText variant="muted" style={{ textAlign: 'center' }}>Noch keine Habits angelegt.</ThemedText>
          ) : (
            habitStats.map(({ habit, done, scheduled, rate }) => (
              <View key={habit.id} style={{ marginBottom: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                  <ThemedText numberOfLines={1} style={{ flex: 1 }}>{habit.name}</ThemedText>
                  <ThemedText variant="secondary">{done}/{scheduled} ({rate}%)</ThemedText>
                </View>
                <View style={{ height: 6, borderRadius: 3, backgroundColor: C.border }}>
                  <View style={{
                    width: `${rate}%`, height: '100%', borderRadius: 3,
                    backgroundColor: rate >= 80 ? C.accent : rate >= 50 ? C.warn : C.danger,
                  }} />
                </View>
              </View>
            ))
          )}
        </Card>

        {/* Mood trend */}
        {weekReflexionen.length >= 2 && (
          <Card style={{ marginBottom: 20 }}>
            <ThemedText style={{ fontWeight: '600', marginBottom: 12 }}>Stimmungsverlauf</ThemedText>
            <MoodLineChart reflexionen={weekReflexionen} />
          </Card>
        )}

        {/* Insights */}
        {habitStats.length > 0 && (
          <Card style={{ marginBottom: 20 }}>
            <ThemedText style={{ fontWeight: '600', marginBottom: 12 }}>💡 Diese Woche</ThemedText>
            {bestHabit && (
              <View style={{ marginBottom: 8 }}>
                <Text style={{ fontSize: 13, color: C.accent }}>⭐ Stärkster Habit</Text>
                <ThemedText>{bestHabit.habit.name} – {bestHabit.rate}%</ThemedText>
              </View>
            )}
            {worstHabit && worstHabit.rate < 100 && (
              <View>
                <Text style={{ fontSize: 13, color: C.warn }}>🔧 Verbesserungspotenzial</Text>
                <ThemedText>{worstHabit.habit.name} – {worstHabit.rate}%</ThemedText>
              </View>
            )}
          </Card>
        )}

        <Card>
          <ThemedText style={{ fontWeight: '600', marginBottom: 8 }}>🤔 Wochenfragen</ThemedText>
          <ThemedText variant="secondary" style={{ marginBottom: 6 }}>
            Welche Gewohnheit möchtest du nächste Woche verstärken?
          </ThemedText>
          <ThemedText variant="secondary">
            Welche Gewohnheit funktioniert nicht und solltest du anpassen?
          </ThemedText>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
