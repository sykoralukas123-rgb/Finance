import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { useReflexionStore } from '@/store/reflexionStore';
import { ThemedText } from '@/components/ui/ThemedText';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function MorgenRoutineModal() {
  const C = useColors();
  const { todayMorgen, saveMorgenRoutine } = useReflexionStore();

  const [intention, setIntention] = useState(todayMorgen?.intention ?? '');
  const [p1, setP1] = useState(todayMorgen?.priority1 ?? '');
  const [p2, setP2] = useState(todayMorgen?.priority2 ?? '');
  const [p3, setP3] = useState(todayMorgen?.priority3 ?? '');

  const handleSave = () => {
    saveMorgenRoutine({ intention, priority1: p1, priority2: p2, priority3: p3 });
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
          <ThemedText variant="heading" style={{ marginBottom: 6 }}>🌅 Morgen-Routine</ThemedText>
          <ThemedText variant="secondary" style={{ marginBottom: 24 }}>
            Starte fokussiert in den Tag.
          </ThemedText>

          <Input
            label="Meine Intention für heute"
            value={intention}
            onChangeText={setIntention}
            placeholder="z. B. Ich bleibe fokussiert und gehe meine Aufgaben ruhig an."
            multiline
            numberOfLines={3}
            style={{ minHeight: 75, textAlignVertical: 'top' }}
            containerStyle={{ marginBottom: 20 }}
          />

          <ThemedText style={{ fontWeight: '600', marginBottom: 12 }}>Meine 3 Prioritäten</ThemedText>

          {[
            { label: 'Priorität 1', value: p1, set: setP1, placeholder: 'Das Wichtigste heute…' },
            { label: 'Priorität 2', value: p2, set: setP2, placeholder: 'Zweite Priorität…' },
            { label: 'Priorität 3', value: p3, set: setP3, placeholder: 'Dritte Priorität…' },
          ].map((item, i) => (
            <Input
              key={i}
              label={item.label}
              value={item.value}
              onChangeText={item.set}
              placeholder={item.placeholder}
              containerStyle={{ marginBottom: 12 }}
            />
          ))}

          <Button label="Speichern ✅" onPress={handleSave} fullWidth size="lg" style={{ marginTop: 16 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
