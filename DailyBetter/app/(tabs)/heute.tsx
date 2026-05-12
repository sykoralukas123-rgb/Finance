import React, { useState } from 'react';
import {
  View, ScrollView, TouchableOpacity, Text, RefreshControl,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { useHabitStore } from '@/store/habitStore';
import { useReflexionStore } from '@/store/reflexionStore';
import { useAppStore } from '@/store/appStore';
import { ThemedText } from '@/components/ui/ThemedText';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { HabitCard } from '@/components/habits/HabitCard';
import { useHaptics } from '@/hooks/useHaptics';
import { formatDayDe, todayStr } from '@/utils/dates';
import { xpProgressPercent, xpInCurrentLevel, XP_PER_LEVEL } from '@/utils/xp';

export default function Heute() {
  const C = useColors();
  const haptics = useHaptics();
  const [refreshing, setRefreshing] = useState(false);

  const { getTodayHabits, toggleToday, hydrated } = useHabitStore();
  const { todayMorgen, todayReflexion } = useReflexionStore();
  const { name, level, totalXp, addXp } = useAppStore();

  const todayHabits = getTodayHabits();
  const completed = todayHabits.filter((h) => h.completedToday).length;
  const total = todayHabits.length;
  const progressPct = total > 0 ? Math.round((completed / total) * 100) : 0;

  const today = todayStr();
  const dayLabel = formatDayDe(today);

  const handleToggle = async (habitId: string) => {
    const { wasCompleted, xpEarned } = toggleToday(habitId);
    if (wasCompleted) {
      haptics.success();
      addXp(xpEarned);
    } else {
      haptics.light();
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    useHabitStore.getState().hydrate();
    useReflexionStore.getState().hydrate();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={C.primary} />}
      >
        {/* Header */}
        <View style={{ marginBottom: 24 }}>
          <ThemedText variant="muted" style={{ marginBottom: 4 }}>{dayLabel}</ThemedText>
          <ThemedText variant="title">
            {name ? `Hey ${name} 👋` : 'Guten Tag 👋'}
          </ThemedText>
        </View>

        {/* XP Bar */}
        <Card style={{ marginBottom: 16 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
            <ThemedText variant="secondary">Level {level}</ThemedText>
            <ThemedText variant="muted">{xpInCurrentLevel(totalXp)} / {XP_PER_LEVEL} XP</ThemedText>
          </View>
          <ProgressBar percent={xpProgressPercent(totalXp)} color={C.xpBar} height={8} />
        </Card>

        {/* Tagesfortschritt */}
        <Card style={{ marginBottom: 16 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <ThemedText style={{ fontWeight: '600' }}>Heute: {completed}/{total}</ThemedText>
            <ThemedText variant="secondary" style={{ color: C.accent }}>{progressPct}%</ThemedText>
          </View>
          <ProgressBar percent={progressPct} color={C.accent} height={10} />
        </Card>

        {/* Morgen-Routine */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <ThemedText style={{ fontWeight: '600' }}>🌅 Morgen-Routine</ThemedText>
          <TouchableOpacity onPress={() => router.push('/modals/morgen-routine')}>
            <ThemedText variant="secondary" style={{ color: C.primary }}>
              {todayMorgen ? 'Bearbeiten' : 'Starten'}
            </ThemedText>
          </TouchableOpacity>
        </View>

        {todayMorgen ? (
          <Card style={{ marginBottom: 20 }}>
            {todayMorgen.intention ? (
              <View style={{ marginBottom: 10 }}>
                <ThemedText variant="muted">Intention</ThemedText>
                <ThemedText style={{ marginTop: 2 }}>{todayMorgen.intention}</ThemedText>
              </View>
            ) : null}
            {[todayMorgen.priority1, todayMorgen.priority2, todayMorgen.priority3]
              .filter(Boolean)
              .map((p, i) => (
                <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6 }}>
                  <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: C.primary }} />
                  <ThemedText variant="secondary">{p}</ThemedText>
                </View>
              ))}
          </Card>
        ) : (
          <Card style={{ marginBottom: 20 }}>
            <ThemedText variant="secondary" style={{ textAlign: 'center' }}>
              Noch keine Morgen-Routine — starte motiviert in den Tag! ☀️
            </ThemedText>
          </Card>
        )}

        {/* Heutige Habits */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <ThemedText style={{ fontWeight: '600' }}>Heutige Habits</ThemedText>
          <TouchableOpacity onPress={() => router.push('/modals/habit-form')}>
            <Ionicons name="add-circle-outline" size={24} color={C.primary} />
          </TouchableOpacity>
        </View>

        {todayHabits.length === 0 ? (
          <Card>
            <ThemedText variant="secondary" style={{ textAlign: 'center' }}>
              Noch keine Habits für heute.{'\n'}Füge deine erste Gewohnheit hinzu! 🚀
            </ThemedText>
            <Button
              label="Habit anlegen"
              onPress={() => router.push('/modals/habit-form')}
              style={{ marginTop: 12 }}
              fullWidth
            />
          </Card>
        ) : (
          todayHabits.map((h) => (
            <HabitCard
              key={h.id}
              habit={h}
              onToggle={() => handleToggle(h.id)}
            />
          ))
        )}

        {/* Abend-Reflexion */}
        <View style={{ marginTop: 24 }}>
          <ThemedText style={{ fontWeight: '600', marginBottom: 10 }}>🌙 Abend-Reflexion</ThemedText>
          {todayReflexion ? (
            <Card>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <Text style={{ fontSize: 24 }}>
                  {['😞', '😕', '😐', '🙂', '😄'][todayReflexion.mood - 1]}
                </Text>
                <ThemedText variant="secondary">Stimmung: {todayReflexion.mood}/5</ThemedText>
              </View>
              {todayReflexion.wentWell ? (
                <ThemedText variant="secondary" numberOfLines={2}>{todayReflexion.wentWell}</ThemedText>
              ) : null}
              <TouchableOpacity onPress={() => router.push('/modals/abend-reflexion')}>
                <ThemedText style={{ color: C.primary, marginTop: 8 }}>Bearbeiten</ThemedText>
              </TouchableOpacity>
            </Card>
          ) : (
            <Button
              label="Reflexion starten"
              onPress={() => router.push('/modals/abend-reflexion')}
              variant="secondary"
              fullWidth
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
