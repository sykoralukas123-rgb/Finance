import React, { useState } from 'react';
import {
  View, ScrollView, TouchableOpacity, Text, KeyboardAvoidingView, Platform,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { useGoalStore } from '@/store/goalStore';
import { useHabitStore } from '@/store/habitStore';
import { ThemedText } from '@/components/ui/ThemedText';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { AreaColors } from '@/constants/colors';
import { AREA_LABELS } from '@/constants/icons';
import { GoalHorizon, LifeArea } from '@/types';

const AREAS: LifeArea[] = ['finanzen', 'studium', 'gesundheit', 'beruf', 'persoenlich'];
const HORIZONS: { value: GoalHorizon; label: string }[] = [
  { value: '3months', label: '3 Monate' },
  { value: '1year', label: '1 Jahr' },
];

export default function ZielForm() {
  const C = useColors();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { goals, addGoal, editGoal } = useGoalStore();
  const { habits } = useHabitStore();

  const existing = id ? goals.find((g) => g.id === id) : null;

  const [title, setTitle] = useState(existing?.title ?? '');
  const [description, setDescription] = useState(existing?.description ?? '');
  const [area, setArea] = useState<LifeArea | null>(existing?.area ?? null);
  const [horizon, setHorizon] = useState<GoalHorizon>(existing?.horizon ?? '3months');
  const [linkedHabitIds, setLinkedHabitIds] = useState<string[]>(existing?.linkedHabitIds ?? []);

  const toggleHabit = (hid: string) =>
    setLinkedHabitIds((prev) => prev.includes(hid) ? prev.filter((x) => x !== hid) : [...prev, hid]);

  const handleSave = () => {
    if (!title.trim()) return;
    const data = { title: title.trim(), description, area, horizon, targetDate: null, completed: false, linkedHabitIds };
    if (existing) {
      editGoal({ ...existing, ...data });
    } else {
      addGoal(data);
    }
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
          <ThemedText variant="heading" style={{ marginBottom: 20 }}>
            {existing ? 'Ziel bearbeiten' : 'Neues Ziel'}
          </ThemedText>

          <Input
            label="Ziel-Titel"
            value={title}
            onChangeText={setTitle}
            placeholder="z. B. StB-Examen bestehen"
            containerStyle={{ marginBottom: 16 }}
          />

          <Input
            label="Beschreibung (optional)"
            value={description}
            onChangeText={setDescription}
            placeholder="Was genau willst du erreichen?"
            multiline
            numberOfLines={3}
            style={{ minHeight: 70, textAlignVertical: 'top' }}
            containerStyle={{ marginBottom: 16 }}
          />

          {/* Horizon */}
          <ThemedText variant="secondary" style={{ marginBottom: 8 }}>Zeithorizont</ThemedText>
          <View style={{ flexDirection: 'row', gap: 10, marginBottom: 16 }}>
            {HORIZONS.map((h) => (
              <TouchableOpacity
                key={h.value}
                onPress={() => setHorizon(h.value)}
                style={{
                  flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: 'center',
                  backgroundColor: horizon === h.value ? C.primary : C.bgElevated,
                  borderWidth: 1, borderColor: horizon === h.value ? C.primary : C.border,
                }}
              >
                <Text style={{ color: horizon === h.value ? '#fff' : C.textSecondary, fontWeight: '500' }}>
                  {h.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Area */}
          <ThemedText variant="secondary" style={{ marginBottom: 8 }}>Lebensbereich (optional)</ThemedText>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            {AREAS.map((a) => {
              const sel = area === a;
              return (
                <TouchableOpacity
                  key={a}
                  onPress={() => setArea(sel ? null : a)}
                  style={{
                    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10,
                    backgroundColor: sel ? AreaColors[a] + '33' : C.bgElevated,
                    borderWidth: 1, borderColor: sel ? AreaColors[a] : C.border,
                  }}
                >
                  <Text style={{ color: sel ? AreaColors[a] : C.textSecondary, fontWeight: '500' }}>
                    {AREA_LABELS[a]}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Linked habits */}
          {habits.length > 0 && (
            <>
              <ThemedText variant="secondary" style={{ marginBottom: 8 }}>Verknüpfte Habits</ThemedText>
              <View style={{ gap: 6, marginBottom: 24 }}>
                {habits.map((h) => {
                  const sel = linkedHabitIds.includes(h.id);
                  return (
                    <TouchableOpacity
                      key={h.id}
                      onPress={() => toggleHabit(h.id)}
                      style={{
                        flexDirection: 'row', alignItems: 'center', gap: 10,
                        padding: 12, borderRadius: 12,
                        backgroundColor: sel ? h.color + '22' : C.bgElevated,
                        borderWidth: 1, borderColor: sel ? h.color : C.border,
                      }}
                    >
                      <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: h.color }} />
                      <ThemedText style={{ flex: 1 }}>{h.name}</ThemedText>
                      {sel && <Text style={{ color: h.color }}>✓</Text>}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </>
          )}

          <Button label={existing ? 'Ziel aktualisieren' : 'Ziel anlegen 🎯'} onPress={handleSave} fullWidth size="lg" />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
