import React, { useMemo } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { useHabitStore } from '@/store/habitStore';
import { useReflexionStore } from '@/store/reflexionStore';
import { ThemedText } from '@/components/ui/ThemedText';
import { Card } from '@/components/ui/Card';
import { HeatmapChart } from '@/components/charts/HeatmapChart';
import { MoodLineChart } from '@/components/charts/MoodLineChart';
import { HeatmapDay } from '@/types';
import { lastNDays, weekdayIndex } from '@/utils/dates';
import { WEEKDAY_FULL } from '@/constants/icons';

export default function Insights() {
  const C = useColors();
  const { habits, completions } = useHabitStore();
  const { reflexionen } = useReflexionStore();

  // Heatmap: last 90 days
  const heatmapDays: HeatmapDay[] = useMemo(() => {
    const days = lastNDays(90).reverse();
    return days.map((date) => {
      const total = habits.filter((h) => {
        if (h.frequency === 'daily') return true;
        if (h.frequency === 'weekly') return weekdayIndex(date) === 0;
        if (h.frequency === 'custom' && h.customDays) return h.customDays.includes(weekdayIndex(date));
        return false;
      }).length;
      const count = completions.filter((c) => c.date === date).length;
      return { date, count, total };
    });
  }, [habits, completions]);

  // Mood last 30 days
  const moodData = useMemo(() => {
    const days = lastNDays(30);
    return reflexionen
      .filter((r) => days.includes(r.date))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [reflexionen]);

  const avgMood = moodData.length > 0
    ? (moodData.reduce((s, r) => s + r.mood, 0) / moodData.length).toFixed(1)
    : '–';

  // Best day of week
  const byWeekday = useMemo(() => {
    const counts = [0, 0, 0, 0, 0, 0, 0];
    const totals = [0, 0, 0, 0, 0, 0, 0];
    completions.forEach((c) => {
      const wd = weekdayIndex(c.date);
      counts[wd]++;
    });
    lastNDays(90).forEach((d) => {
      const wd = weekdayIndex(d);
      totals[wd]++;
    });
    return counts.map((c, i) => ({
      day: WEEKDAY_FULL[i],
      short: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'][i],
      rate: totals[i] > 0 ? Math.round((c / (totals[i] * Math.max(habits.length, 1))) * 100) : 0,
    }));
  }, [completions, habits]);

  const bestDay = byWeekday.reduce((best, d) => (d.rate > best.rate ? d : best), byWeekday[0]);

  // Streak stats
  const allStats = useHabitStore.getState().getWithStats();
  const totalCompletions = completions.length;
  const longestEver = allStats.reduce((m, h) => Math.max(m, h.longestStreak), 0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        <ThemedText variant="title" style={{ marginBottom: 20 }}>Insights</ThemedText>

        {/* Summary stats */}
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20 }}>
          <Card style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 22 }}>📈</Text>
            <ThemedText style={{ fontWeight: '700', fontSize: 18 }}>{totalCompletions}</ThemedText>
            <ThemedText variant="muted" style={{ textAlign: 'center' }}>Completions</ThemedText>
          </Card>
          <Card style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 22 }}>🔥</Text>
            <ThemedText style={{ fontWeight: '700', fontSize: 18 }}>{longestEver}</ThemedText>
            <ThemedText variant="muted" style={{ textAlign: 'center' }}>Längster Streak</ThemedText>
          </Card>
          <Card style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 22 }}>😊</Text>
            <ThemedText style={{ fontWeight: '700', fontSize: 18 }}>{avgMood}</ThemedText>
            <ThemedText variant="muted" style={{ textAlign: 'center' }}>Ø Stimmung</ThemedText>
          </Card>
        </View>

        {/* Heatmap */}
        <Card style={{ marginBottom: 20 }}>
          <ThemedText style={{ fontWeight: '600', marginBottom: 12 }}>🗓 Konsistenz (90 Tage)</ThemedText>
          {habits.length === 0 ? (
            <ThemedText variant="muted" style={{ textAlign: 'center' }}>Noch keine Daten.</ThemedText>
          ) : (
            <HeatmapChart days={heatmapDays} />
          )}
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 6, marginTop: 8, alignItems: 'center' }}>
            <ThemedText variant="muted">weniger</ThemedText>
            {[0, 0.3, 0.6, 1].map((v, i) => (
              <View
                key={i}
                style={{
                  width: 10, height: 10, borderRadius: 2,
                  backgroundColor: v === 0 ? C.border : v < 0.4 ? C.primaryDim : v < 0.7 ? C.primary + 'aa' : C.primary,
                }}
              />
            ))}
            <ThemedText variant="muted">mehr</ThemedText>
          </View>
        </Card>

        {/* Mood chart */}
        <Card style={{ marginBottom: 20 }}>
          <ThemedText style={{ fontWeight: '600', marginBottom: 12 }}>😊 Stimmung (30 Tage)</ThemedText>
          {moodData.length < 2 ? (
            <ThemedText variant="muted" style={{ textAlign: 'center' }}>
              Fülle täglich deine Abend-Reflexion aus, um den Trend zu sehen.
            </ThemedText>
          ) : (
            <MoodLineChart reflexionen={moodData} />
          )}
        </Card>

        {/* Best day of week */}
        <Card>
          <ThemedText style={{ fontWeight: '600', marginBottom: 12 }}>
            📅 Stärkster Wochentag
          </ThemedText>
          {totalCompletions === 0 ? (
            <ThemedText variant="muted" style={{ textAlign: 'center' }}>Noch keine Completions.</ThemedText>
          ) : (
            <>
              <View style={{ flexDirection: 'row', gap: 6, alignItems: 'flex-end', marginBottom: 12 }}>
                {byWeekday.map((d) => {
                  const h = Math.max(4, (d.rate / 100) * 60);
                  const isBest = d.day === bestDay.day;
                  return (
                    <View key={d.day} style={{ flex: 1, alignItems: 'center', gap: 4 }}>
                      <View
                        style={{
                          width: '100%', height: h, borderRadius: 6,
                          backgroundColor: isBest ? C.primary : C.primaryDim,
                        }}
                      />
                      <Text style={{ color: isBest ? C.primary : C.textMuted, fontSize: 11, fontWeight: isBest ? '700' : '400' }}>
                        {d.short}
                      </Text>
                    </View>
                  );
                })}
              </View>
              <ThemedText variant="secondary">
                Du bist am stärksten am <Text style={{ color: C.primary, fontWeight: '600' }}>{bestDay.day}</Text> ({bestDay.rate}% Erfolgsquote).
              </ThemedText>
            </>
          )}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
