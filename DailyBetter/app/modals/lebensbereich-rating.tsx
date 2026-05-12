import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { useReflexionStore } from '@/store/reflexionStore';
import { ThemedText } from '@/components/ui/ThemedText';
import { Button } from '@/components/ui/Button';
import { AreaColors } from '@/constants/colors';
import { AREA_LABELS } from '@/constants/icons';
import { LifeArea } from '@/types';

const AREAS: LifeArea[] = ['finanzen', 'studium', 'gesundheit', 'beruf', 'persoenlich'];

export default function LebensbereichRatingModal() {
  const C = useColors();
  const { currentRating, saveRating } = useReflexionStore();

  const [values, setValues] = useState<Record<LifeArea, number>>({
    finanzen: currentRating?.finanzen ?? 5,
    studium: currentRating?.studium ?? 5,
    gesundheit: currentRating?.gesundheit ?? 5,
    beruf: currentRating?.beruf ?? 5,
    persoenlich: currentRating?.persoenlich ?? 5,
  });

  const handleSave = () => {
    saveRating(values);
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        <ThemedText variant="heading" style={{ marginBottom: 4 }}>Lebensbereiche bewerten</ThemedText>
        <ThemedText variant="secondary" style={{ marginBottom: 24 }}>Wie zufrieden bist du aktuell? (1–10)</ThemedText>

        {AREAS.map((area) => {
          const ac = AreaColors[area];
          const val = values[area];
          return (
            <View key={area} style={{ marginBottom: 20 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <ThemedText style={{ fontWeight: '600', color: ac }}>{AREA_LABELS[area]}</ThemedText>
                <ThemedText style={{ fontWeight: '700', color: ac }}>{val}/10</ThemedText>
              </View>
              <View style={{ flexDirection: 'row', gap: 4 }}>
                {Array.from({ length: 10 }, (_, i) => i + 1).map((v) => (
                  <TouchableOpacity
                    key={v}
                    onPress={() => setValues((prev) => ({ ...prev, [area]: v }))}
                    style={{
                      flex: 1, height: 32, borderRadius: 6,
                      backgroundColor: v <= val ? ac : C.bgElevated,
                      borderWidth: 1, borderColor: v <= val ? ac : C.border,
                      alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    {v === val && <Text style={{ color: '#fff', fontSize: 11, fontWeight: '700' }}>{v}</Text>}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          );
        })}

        <Button label="Speichern ✅" onPress={handleSave} fullWidth size="lg" style={{ marginTop: 8 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
