import React, { useState } from 'react';
import {
  View, ScrollView, TouchableOpacity, Alert, Text,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { useHabitStore } from '@/store/habitStore';
import { useAppStore } from '@/store/appStore';
import { ThemedText } from '@/components/ui/ThemedText';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { HabitCard } from '@/components/habits/HabitCard';
import { useHaptics } from '@/hooks/useHaptics';
import { xpProgressPercent, xpInCurrentLevel, levelTitle, XP_PER_LEVEL } from '@/utils/xp';
import { ProgressBar } from '@/components/ui/ProgressBar';

export default function Habits() {
  const C = useColors();
  const haptics = useHaptics();
  const [editingId, setEditingId] = useState<string | null>(null);

  const { getWithStats, toggleToday, removeHabit } = useHabitStore();
  const { level, totalXp, addXp } = useAppStore();

  const habits = getWithStats();

  const handleToggle = (habitId: string) => {
    const { wasCompleted, xpEarned } = toggleToday(habitId);
    if (wasCompleted) {
      haptics.success();
      addXp(xpEarned);
    } else {
      haptics.light();
    }
  };

  const handleLongPress = (habitId: string, name: string) => {
    Alert.alert(name, 'Was möchtest du tun?', [
      { text: 'Bearbeiten', onPress: () => router.push({ pathname: '/modals/habit-form', params: { id: habitId } }) },
      {
        text: 'Archivieren', style: 'destructive',
        onPress: () => { removeHabit(habitId); haptics.medium(); },
      },
      { text: 'Abbrechen', style: 'cancel' },
    ]);
  };

  const totalStreak = habits.reduce((sum, h) => sum + h.currentStreak, 0);
  const completedToday = habits.filter((h) => h.completedToday).length;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        {/* Header */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <ThemedText variant="title">Habits</ThemedText>
          <TouchableOpacity
            onPress={() => router.push('/modals/habit-form')}
            style={{ backgroundColor: C.primary, borderRadius: 12, padding: 8 }}
          >
            <Ionicons name="add" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Level Card */}
        <Card style={{ marginBottom: 16 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
            <View>
              <ThemedText style={{ fontWeight: '700', fontSize: 18 }}>Level {level}</ThemedText>
              <ThemedText variant="muted">{levelTitle(level)}</ThemedText>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <ThemedText variant="secondary">{xpInCurrentLevel(totalXp)} / {XP_PER_LEVEL} XP</ThemedText>
              <ThemedText variant="muted">{habits.reduce((s, h) => s + h.totalCompletions, 0)} Completions</ThemedText>
            </View>
          </View>
          <ProgressBar percent={xpProgressPercent(totalXp)} color={C.xpBar} height={8} />
        </Card>

        {/* Stats row */}
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20 }}>
          <Card style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 24 }}>🔥</Text>
            <ThemedText style={{ fontWeight: '700', fontSize: 20 }}>{totalStreak}</ThemedText>
            <ThemedText variant="muted">Gesamt-Streak</ThemedText>
          </Card>
          <Card style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 24 }}>✅</Text>
            <ThemedText style={{ fontWeight: '700', fontSize: 20 }}>{completedToday}</ThemedText>
            <ThemedText variant="muted">Heute erledigt</ThemedText>
          </Card>
          <Card style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 24 }}>📊</Text>
            <ThemedText style={{ fontWeight: '700', fontSize: 20 }}>{habits.length}</ThemedText>
            <ThemedText variant="muted">Aktive Habits</ThemedText>
          </Card>
        </View>

        {/* Habit list */}
        {habits.length === 0 ? (
          <Card>
            <ThemedText variant="secondary" style={{ textAlign: 'center', marginBottom: 12 }}>
              Deine Gewohnheitsreise beginnt hier.{'\n'}Lege deinen ersten Habit an! 🌱
            </ThemedText>
            <Button
              label="Ersten Habit anlegen"
              onPress={() => router.push('/modals/habit-form')}
              fullWidth
            />
          </Card>
        ) : (
          habits.map((h) => (
            <HabitCard
              key={h.id}
              habit={h}
              onToggle={() => handleToggle(h.id)}
              onPress={() => handleLongPress(h.id, h.name)}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
