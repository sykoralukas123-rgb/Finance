import React, { useState, useEffect } from 'react';
import {
  View, ScrollView, TouchableOpacity, Text, KeyboardAvoidingView, Platform,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { useHabitStore } from '@/store/habitStore';
import { ThemedText } from '@/components/ui/ThemedText';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { HabitColors } from '@/constants/colors';
import { HABIT_ICONS, WEEKDAY_LABELS } from '@/constants/icons';
import { Habit, HabitFrequency } from '@/types';

const FREQ_OPTIONS: { value: HabitFrequency; label: string }[] = [
  { value: 'daily', label: 'Täglich' },
  { value: 'weekly', label: 'Wöchentlich' },
  { value: 'custom', label: 'Benutzerdefiniert' },
];

export default function HabitForm() {
  const C = useColors();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { habits, addHabit, editHabit } = useHabitStore();

  const existing = id ? habits.find((h) => h.id === id) : null;

  const [name, setName] = useState(existing?.name ?? '');
  const [identity, setIdentity] = useState(existing?.identity ?? '');
  const [icon, setIcon] = useState(existing?.icon ?? 'star-outline');
  const [color, setColor] = useState(existing?.color ?? HabitColors[0]);
  const [frequency, setFrequency] = useState<HabitFrequency>(existing?.frequency ?? 'daily');
  const [customDays, setCustomDays] = useState<number[]>(existing?.customDays ?? []);
  const [stackAfterId, setStackAfterId] = useState<string | null>(existing?.stackAfterId ?? null);

  const toggleDay = (d: number) =>
    setCustomDays((prev) => prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]);

  const handleSave = () => {
    if (!name.trim()) return;
    const data = {
      name: name.trim(), identity, icon, color, frequency,
      customDays: frequency === 'custom' ? customDays : null,
      stackAfterId, archived: false,
    };
    if (existing) {
      editHabit({ ...existing, ...data });
    } else {
      addHabit(data);
    }
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
          <ThemedText variant="heading" style={{ marginBottom: 20 }}>
            {existing ? 'Habit bearbeiten' : 'Neuer Habit'}
          </ThemedText>

          <Input
            label="Name"
            value={name}
            onChangeText={setName}
            placeholder="z. B. Lesen"
            containerStyle={{ marginBottom: 16 }}
          />

          <Input
            label="Identität (optional)"
            value={identity}
            onChangeText={setIdentity}
            placeholder="Ich bin jemand, der…"
            multiline
            numberOfLines={2}
            style={{ minHeight: 60, textAlignVertical: 'top' }}
            containerStyle={{ marginBottom: 16 }}
          />

          {/* Habit Stacking */}
          <Card style={{ marginBottom: 16 }}>
            <ThemedText variant="secondary" style={{ marginBottom: 8 }}>Habit Stacking</ThemedText>
            <ThemedText variant="muted" style={{ marginBottom: 8 }}>Nach welchem Habit kommt dieser?</ThemedText>
            <TouchableOpacity
              onPress={() => setStackAfterId(null)}
              style={{
                paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, marginBottom: 4,
                backgroundColor: stackAfterId === null ? C.primary + '22' : C.bgElevated,
                borderWidth: 1, borderColor: stackAfterId === null ? C.primary : C.border,
              }}
            >
              <ThemedText variant="secondary">Kein Stacking</ThemedText>
            </TouchableOpacity>
            {habits.filter((h) => h.id !== id).map((h) => (
              <TouchableOpacity
                key={h.id}
                onPress={() => setStackAfterId(h.id)}
                style={{
                  paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, marginTop: 4,
                  backgroundColor: stackAfterId === h.id ? C.primary + '22' : C.bgElevated,
                  borderWidth: 1, borderColor: stackAfterId === h.id ? C.primary : C.border,
                }}
              >
                <ThemedText variant="secondary">Nach: {h.name}</ThemedText>
              </TouchableOpacity>
            ))}
          </Card>

          {/* Frequency */}
          <ThemedText variant="secondary" style={{ marginBottom: 8 }}>Häufigkeit</ThemedText>
          <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16 }}>
            {FREQ_OPTIONS.map((f) => (
              <TouchableOpacity
                key={f.value}
                onPress={() => setFrequency(f.value)}
                style={{
                  flex: 1, paddingVertical: 8, borderRadius: 10, alignItems: 'center',
                  backgroundColor: frequency === f.value ? C.primary : C.bgElevated,
                  borderWidth: 1, borderColor: frequency === f.value ? C.primary : C.border,
                }}
              >
                <Text style={{ color: frequency === f.value ? '#fff' : C.textSecondary, fontSize: 13, fontWeight: '500' }}>
                  {f.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {frequency === 'custom' && (
            <View style={{ flexDirection: 'row', gap: 6, marginBottom: 16 }}>
              {WEEKDAY_LABELS.map((label, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => toggleDay(i)}
                  style={{
                    flex: 1, paddingVertical: 8, borderRadius: 8, alignItems: 'center',
                    backgroundColor: customDays.includes(i) ? C.primary : C.bgElevated,
                    borderWidth: 1, borderColor: customDays.includes(i) ? C.primary : C.border,
                  }}
                >
                  <Text style={{ color: customDays.includes(i) ? '#fff' : C.textSecondary, fontSize: 11 }}>
                    {label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Icon picker */}
          <ThemedText variant="secondary" style={{ marginBottom: 8 }}>Icon</ThemedText>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            {HABIT_ICONS.map((ic) => (
              <TouchableOpacity
                key={ic.name}
                onPress={() => setIcon(ic.name)}
                style={{
                  width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center',
                  backgroundColor: icon === ic.name ? color + '33' : C.bgElevated,
                  borderWidth: 1.5, borderColor: icon === ic.name ? color : C.border,
                }}
              >
                <Ionicons name={ic.name as any} size={22} color={icon === ic.name ? color : C.textSecondary} />
              </TouchableOpacity>
            ))}
          </View>

          {/* Color picker */}
          <ThemedText variant="secondary" style={{ marginBottom: 8 }}>Farbe</ThemedText>
          <View style={{ flexDirection: 'row', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
            {HabitColors.map((c) => (
              <TouchableOpacity
                key={c}
                onPress={() => setColor(c)}
                style={{
                  width: 36, height: 36, borderRadius: 18,
                  backgroundColor: c,
                  borderWidth: color === c ? 3 : 0,
                  borderColor: '#fff',
                }}
              />
            ))}
          </View>

          <Button label={existing ? 'Änderungen speichern' : 'Habit anlegen'} onPress={handleSave} fullWidth size="lg" />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
