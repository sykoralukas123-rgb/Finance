import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { useHabitStore } from '@/store/habitStore';
import { ThemedText } from '@/components/ui/ThemedText';
import { Button } from '@/components/ui/Button';
import { HabitColors } from '@/constants/colors';

const STARTER_HABITS = [
  { name: 'Lesen', icon: 'book-outline', identity: 'Ich bin jemand, der täglich liest und lernt.', color: HabitColors[0] },
  { name: 'Sport', icon: 'fitness-outline', identity: 'Ich bin jemand, der seinen Körper pflegt.', color: HabitColors[7] },
  { name: 'Meditation', icon: 'leaf-outline', identity: 'Ich bin jemand, der seinen Geist trainiert.', color: HabitColors[1] },
  { name: 'Journaling', icon: 'pencil-outline', identity: 'Ich bin jemand, der reflektiert und wächst.', color: HabitColors[3] },
  { name: 'Wasser trinken', icon: 'water-outline', identity: 'Ich bin jemand, der auf seine Gesundheit achtet.', color: HabitColors[6] },
  { name: 'Studium', icon: 'calculator-outline', identity: 'Ich bin jemand, der konsequent für seine Ziele lernt.', color: HabitColors[8] },
];

export default function Step2() {
  const C = useColors();
  const addHabit = useHabitStore((s) => s.addHabit);
  const [selected, setSelected] = useState<number[]>([]);

  const toggle = (i: number) => {
    setSelected((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : prev.length < 3 ? [...prev, i] : prev
    );
  };

  const handleNext = () => {
    for (const i of selected) {
      const h = STARTER_HABITS[i];
      addHabit({ ...h, stackAfterId: null, frequency: 'daily', customDays: null, archived: false });
    }
    router.push('/onboarding/step3');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24 }}>
        <View style={{ marginBottom: 32, marginTop: 20 }}>
          <ThemedText variant="label" style={{ color: C.primary, marginBottom: 8 }}>
            SCHRITT 2 VON 3
          </ThemedText>
          <ThemedText variant="title" style={{ marginBottom: 12 }}>
            Wähle 1–3{'\n'}Start-Gewohnheiten ✅
          </ThemedText>
          <ThemedText variant="secondary">
            Fang klein an. Du kannst jederzeit mehr hinzufügen.
          </ThemedText>
        </View>

        <View style={{ gap: 10, marginBottom: 32 }}>
          {STARTER_HABITS.map((h, i) => {
            const sel = selected.includes(i);
            return (
              <TouchableOpacity
                key={i}
                onPress={() => toggle(i)}
                activeOpacity={0.8}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: sel ? h.color + '22' : C.bgCard,
                  borderRadius: 16,
                  padding: 14,
                  borderWidth: 1,
                  borderColor: sel ? h.color : C.border,
                  gap: 12,
                }}
              >
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    backgroundColor: h.color + '33',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Ionicons name={h.icon as any} size={22} color={h.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <ThemedText style={{ fontWeight: '600' }}>{h.name}</ThemedText>
                  <ThemedText variant="muted" numberOfLines={1}>{h.identity}</ThemedText>
                </View>
                {sel && <Ionicons name="checkmark-circle" size={22} color={h.color} />}
              </TouchableOpacity>
            );
          })}
        </View>

        <Button
          label={selected.length === 0 ? 'Überspringen →' : `${selected.length} Habit${selected.length > 1 ? 's' : ''} starten →`}
          onPress={handleNext}
          fullWidth
          size="lg"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
