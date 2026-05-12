import React, { useState } from 'react';
import {
  View, ScrollView, TouchableOpacity, Text, Alert,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { useGoalStore } from '@/store/goalStore';
import { useHabitStore } from '@/store/habitStore';
import { useReflexionStore } from '@/store/reflexionStore';
import { ThemedText } from '@/components/ui/ThemedText';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { RadarChart } from '@/components/charts/RadarChart';
import { AreaColors } from '@/constants/colors';
import { AREA_LABELS } from '@/constants/icons';
import { Goal, LifeArea } from '@/types';

const AREAS: LifeArea[] = ['finanzen', 'studium', 'gesundheit', 'beruf', 'persoenlich'];
const HORIZON_LABELS: Record<string, string> = {
  '3months': '3 Monate',
  '1year': '1 Jahr',
};

export default function Ziele() {
  const C = useColors();
  const { goals, completeGoal, removeGoal, goalProgress } = useGoalStore();
  const { completions } = useHabitStore();
  const { currentRating } = useReflexionStore();
  const [tab, setTab] = useState<'3months' | '1year'>('3months');

  const filtered = goals.filter((g) => g.horizon === tab && !g.completed);
  const completed = goals.filter((g) => g.completed);

  const radarValues = AREAS.reduce<Record<string, number>>((acc, a) => {
    acc[a] = currentRating?.[a] ?? 5;
    return acc;
  }, {});

  const handleGoalAction = (g: Goal) => {
    Alert.alert(g.title, '', [
      { text: 'Bearbeiten', onPress: () => router.push({ pathname: '/modals/ziel-form', params: { id: g.id } }) },
      { text: 'Als erledigt markieren', onPress: () => completeGoal(g.id, true) },
      { text: 'Löschen', style: 'destructive', onPress: () => removeGoal(g.id) },
      { text: 'Abbrechen', style: 'cancel' },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        {/* Header */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <ThemedText variant="title">Ziele</ThemedText>
          <TouchableOpacity
            onPress={() => router.push('/modals/ziel-form')}
            style={{ backgroundColor: C.primary, borderRadius: 12, padding: 8 }}
          >
            <Ionicons name="add" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Radar chart */}
        <Card style={{ marginBottom: 20, alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 16 }}>
            <ThemedText style={{ fontWeight: '600' }}>Lebensbereiche</ThemedText>
            <TouchableOpacity onPress={() => router.push('/modals/lebensbereich-rating')}>
              <ThemedText style={{ color: C.primary }}>Bewerten</ThemedText>
            </TouchableOpacity>
          </View>
          <RadarChart values={radarValues} size={200} />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12, justifyContent: 'center' }}>
            {AREAS.map((a) => (
              <View key={a} style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: AreaColors[a] }} />
                <ThemedText variant="muted">{AREA_LABELS[a]}: {currentRating?.[a] ?? 5}</ThemedText>
              </View>
            ))}
          </View>
        </Card>

        {/* Tabs */}
        <View style={{ flexDirection: 'row', backgroundColor: C.bgCard, borderRadius: 12, padding: 4, marginBottom: 16 }}>
          {(['3months', '1year'] as const).map((h) => (
            <TouchableOpacity
              key={h}
              onPress={() => setTab(h)}
              style={{
                flex: 1, paddingVertical: 8, borderRadius: 10,
                backgroundColor: tab === h ? C.primary : 'transparent',
                alignItems: 'center',
              }}
            >
              <Text style={{ color: tab === h ? '#fff' : C.textSecondary, fontWeight: '500' }}>
                {HORIZON_LABELS[h]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Goal list */}
        {filtered.length === 0 ? (
          <Card style={{ marginBottom: 16 }}>
            <ThemedText variant="secondary" style={{ textAlign: 'center', marginBottom: 12 }}>
              Noch kein {HORIZON_LABELS[tab]}-Ziel.{'\n'}Setze dir eine klare Richtung! 🎯
            </ThemedText>
            <Button
              label="Ziel anlegen"
              onPress={() => router.push('/modals/ziel-form')}
              fullWidth
            />
          </Card>
        ) : (
          filtered.map((g) => {
            const progress = goalProgress(g.id, completions);
            const areaColor = g.area ? AreaColors[g.area] : C.primary;
            return (
              <TouchableOpacity key={g.id} onPress={() => handleGoalAction(g)} activeOpacity={0.85}>
                <Card style={{ marginBottom: 12 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
                    <ThemedText style={{ fontWeight: '600', flex: 1 }} numberOfLines={1}>{g.title}</ThemedText>
                    {g.area && (
                      <View style={{ backgroundColor: areaColor + '22', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2 }}>
                        <Text style={{ color: areaColor, fontSize: 12 }}>{AREA_LABELS[g.area]}</Text>
                      </View>
                    )}
                  </View>
                  {g.description ? <ThemedText variant="muted" numberOfLines={2} style={{ marginBottom: 8 }}>{g.description}</ThemedText> : null}
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                    <ThemedText variant="muted">Fortschritt</ThemedText>
                    <ThemedText variant="muted">{progress}%</ThemedText>
                  </View>
                  <ProgressBar percent={progress} color={areaColor} height={6} />
                  {g.linkedHabitIds.length > 0 && (
                    <ThemedText variant="muted" style={{ marginTop: 6 }}>
                      {g.linkedHabitIds.length} verknüpfte{g.linkedHabitIds.length > 1 ? ' Habits' : ' Habit'}
                    </ThemedText>
                  )}
                </Card>
              </TouchableOpacity>
            );
          })
        )}

        {/* Completed */}
        {completed.length > 0 && (
          <>
            <ThemedText variant="secondary" style={{ marginTop: 8, marginBottom: 10 }}>✅ Abgeschlossen</ThemedText>
            {completed.map((g) => (
              <Card key={g.id} style={{ marginBottom: 10, opacity: 0.6 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Ionicons name="checkmark-circle" size={18} color={C.accent} />
                  <ThemedText style={{ flex: 1 }} numberOfLines={1}>{g.title}</ThemedText>
                  <TouchableOpacity onPress={() => completeGoal(g.id, false)}>
                    <ThemedText style={{ color: C.primary, fontSize: 13 }}>Wiederholen</ThemedText>
                  </TouchableOpacity>
                </View>
              </Card>
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
