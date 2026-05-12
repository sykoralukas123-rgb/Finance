import React, { useState } from 'react';
import {
  View, ScrollView, TouchableOpacity, Switch, Text, Alert,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { useAppStore } from '@/store/appStore';
import { useHabitStore } from '@/store/habitStore';
import { ThemedText } from '@/components/ui/ThemedText';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { xpProgressPercent, xpInCurrentLevel, levelTitle, XP_PER_LEVEL } from '@/utils/xp';
import { isSunday } from '@/utils/dates';

export default function Profil() {
  const C = useColors();
  const { name, level, totalXp, theme, morningTime, eveningTime, setName, setTheme, setMorningTime, setEveningTime } = useAppStore();
  const { habits, completions } = useHabitStore();
  const [editName, setEditName] = useState(name);
  const [editingName, setEditingName] = useState(false);

  const totalDays = new Set(completions.map((c) => c.date)).size;
  const totalCompletions = completions.length;

  const SettingRow = ({ icon, label, children }: { icon: string; label: string; children: React.ReactNode }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: C.border }}>
      <Ionicons name={icon as any} size={20} color={C.textSecondary} style={{ marginRight: 12 }} />
      <ThemedText style={{ flex: 1 }}>{label}</ThemedText>
      {children}
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        <ThemedText variant="title" style={{ marginBottom: 20 }}>Profil</ThemedText>

        {/* Profile card */}
        <Card style={{ marginBottom: 20, alignItems: 'center' }}>
          <View style={{
            width: 72, height: 72, borderRadius: 36,
            backgroundColor: C.primary + '33',
            alignItems: 'center', justifyContent: 'center', marginBottom: 12,
          }}>
            <Text style={{ fontSize: 36 }}>🧑‍💼</Text>
          </View>

          {editingName ? (
            <View style={{ width: '100%', gap: 8 }}>
              <Input
                value={editName}
                onChangeText={setEditName}
                placeholder="Dein Name"
                style={{ textAlign: 'center' }}
              />
              <Button
                label="Speichern"
                onPress={() => {
                  setName(editName.trim());
                  setEditingName(false);
                }}
                size="sm"
              />
            </View>
          ) : (
            <TouchableOpacity onPress={() => setEditingName(true)}>
              <ThemedText variant="heading" style={{ marginBottom: 4, textAlign: 'center' }}>
                {name || 'Dein Name'}
              </ThemedText>
              <ThemedText variant="muted" style={{ textAlign: 'center' }}>Tippe zum Bearbeiten ✏️</ThemedText>
            </TouchableOpacity>
          )}

          <View style={{ width: '100%', marginTop: 16 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
              <ThemedText style={{ fontWeight: '600' }}>Level {level} – {levelTitle(level)}</ThemedText>
              <ThemedText variant="muted">{xpInCurrentLevel(totalXp)}/{XP_PER_LEVEL} XP</ThemedText>
            </View>
            <ProgressBar percent={xpProgressPercent(totalXp)} height={8} />
          </View>
        </Card>

        {/* Stats */}
        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20 }}>
          <Card style={{ flex: 1, alignItems: 'center' }}>
            <ThemedText style={{ fontWeight: '700', fontSize: 22 }}>{habits.length}</ThemedText>
            <ThemedText variant="muted">Habits</ThemedText>
          </Card>
          <Card style={{ flex: 1, alignItems: 'center' }}>
            <ThemedText style={{ fontWeight: '700', fontSize: 22 }}>{totalCompletions}</ThemedText>
            <ThemedText variant="muted">Completions</ThemedText>
          </Card>
          <Card style={{ flex: 1, alignItems: 'center' }}>
            <ThemedText style={{ fontWeight: '700', fontSize: 22 }}>{totalDays}</ThemedText>
            <ThemedText variant="muted">Aktive Tage</ThemedText>
          </Card>
        </View>

        {/* Settings */}
        <Card style={{ marginBottom: 16 }}>
          <ThemedText style={{ fontWeight: '600', marginBottom: 4 }}>Einstellungen</ThemedText>

          <SettingRow icon="moon-outline" label="Dark Mode">
            <Switch
              value={theme === 'dark'}
              onValueChange={(v) => setTheme(v ? 'dark' : 'light')}
              trackColor={{ false: C.border, true: C.primary }}
              thumbColor="#fff"
            />
          </SettingRow>

          <SettingRow icon="sunny-outline" label="Morgen-Erinnerung">
            <ThemedText variant="secondary">{morningTime}</ThemedText>
          </SettingRow>

          <SettingRow icon="moon-outline" label="Abend-Erinnerung">
            <ThemedText variant="secondary">{eveningTime}</ThemedText>
          </SettingRow>
        </Card>

        {/* Wochenreview */}
        {isSunday() && (
          <Button
            label="📊 Wochenreview starten"
            onPress={() => router.push('/modals/wochenreview')}
            variant="secondary"
            fullWidth
            style={{ marginBottom: 16 }}
          />
        )}

        <Button
          label="📊 Wochenreview"
          onPress={() => router.push('/modals/wochenreview')}
          variant="ghost"
          fullWidth
        />
      </ScrollView>
    </SafeAreaView>
  );
}
