import React, { useState } from 'react';
import {
  View, ScrollView, TouchableOpacity, Text, KeyboardAvoidingView, Platform,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { useReflexionStore } from '@/store/reflexionStore';
import { ThemedText } from '@/components/ui/ThemedText';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { MOOD_EMOJIS, MOOD_LABELS } from '@/constants/icons';

export default function AbendReflexion() {
  const C = useColors();
  const { todayReflexion, saveReflexion } = useReflexionStore();

  const [mood, setMood] = useState(todayReflexion?.mood ?? 3);
  const [wentWell, setWentWell] = useState(todayReflexion?.wentWell ?? '');
  const [learned, setLearned] = useState(todayReflexion?.learned ?? '');

  const handleSave = () => {
    saveReflexion({ mood, wentWell, learned });
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
          <ThemedText variant="heading" style={{ marginBottom: 6 }}>🌙 Abend-Reflexion</ThemedText>
          <ThemedText variant="secondary" style={{ marginBottom: 24 }}>
            Nimm dir 2 Minuten für deinen Tag.
          </ThemedText>

          {/* Stimmung */}
          <ThemedText style={{ fontWeight: '600', marginBottom: 12 }}>Wie war dein Tag?</ThemedText>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 }}>
            {[1, 2, 3, 4, 5].map((v) => (
              <TouchableOpacity
                key={v}
                onPress={() => setMood(v)}
                style={{
                  alignItems: 'center', gap: 4,
                  opacity: mood === v ? 1 : 0.4,
                  transform: [{ scale: mood === v ? 1.15 : 1 }],
                }}
              >
                <Text style={{ fontSize: 36 }}>{MOOD_EMOJIS[v - 1]}</Text>
                <Text style={{ color: C.textMuted, fontSize: 11 }}>{v}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Input
            label="Was lief gut heute?"
            value={wentWell}
            onChangeText={setWentWell}
            placeholder="z. B. Ich habe meine Lerneinheit durchgehalten…"
            multiline
            numberOfLines={4}
            style={{ minHeight: 90, textAlignVertical: 'top' }}
            containerStyle={{ marginBottom: 16 }}
          />

          <Input
            label="Was lernst du daraus?"
            value={learned}
            onChangeText={setLearned}
            placeholder="z. B. Früher anfangen gibt mir mehr Energie…"
            multiline
            numberOfLines={4}
            style={{ minHeight: 90, textAlignVertical: 'top' }}
            containerStyle={{ marginBottom: 28 }}
          />

          <Button label="Reflexion speichern ✅" onPress={handleSave} fullWidth size="lg" />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
