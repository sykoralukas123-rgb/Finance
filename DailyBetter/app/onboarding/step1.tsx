import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { useAppStore } from '@/store/appStore';
import { ThemedText } from '@/components/ui/ThemedText';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function Step1() {
  const C = useColors();
  const setName = useAppStore((s) => s.setName);
  const [name, setNameLocal] = useState('');
  const [identity, setIdentity] = useState('');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24 }}>
          <View style={{ flex: 1 }}>
            <View style={{ marginBottom: 40, marginTop: 20 }}>
              <ThemedText
                variant="label"
                style={{ color: C.primary, marginBottom: 8 }}
              >
                SCHRITT 1 VON 3
              </ThemedText>
              <ThemedText variant="title" style={{ marginBottom: 12 }}>
                Wer willst du{'\n'}werden? 🌱
              </ThemedText>
              <ThemedText variant="secondary">
                Gewohnheiten formen deine Identität. Lass uns damit beginnen, wer du sein möchtest.
              </ThemedText>
            </View>

            <Input
              label="Dein Name"
              value={name}
              onChangeText={setNameLocal}
              placeholder="z. B. Lukas"
              containerStyle={{ marginBottom: 20 }}
            />

            <Input
              label={'Deine Kern-Identität'}
              value={identity}
              onChangeText={setIdentity}
              placeholder="Ich bin jemand, der täglich an sich arbeitet und diszipliniert lebt."
              multiline
              numberOfLines={3}
              style={{ minHeight: 80, textAlignVertical: 'top' }}
              containerStyle={{ marginBottom: 8 }}
            />
            <ThemedText variant="muted" style={{ marginBottom: 32 }}>
              Nach James Clear: Du wirst zu dem, was du regelmäßig tust.
            </ThemedText>
          </View>

          <Button
            label="Weiter →"
            onPress={() => {
              if (name.trim()) setName(name.trim());
              router.push('/onboarding/step2');
            }}
            fullWidth
            size="lg"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
