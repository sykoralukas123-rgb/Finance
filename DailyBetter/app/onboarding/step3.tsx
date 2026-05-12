import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, Platform } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import { useAppStore } from '@/store/appStore';
import { ThemedText } from '@/components/ui/ThemedText';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { setupNotifications } from '@/hooks/useNotifications';

const TIME_OPTIONS = ['06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00'];
const EVENING_OPTIONS = ['19:00', '20:00', '21:00', '21:30', '22:00', '22:30', '23:00'];

export default function Step3() {
  const C = useColors();
  const { setMorningTime, setEveningTime, setOnboardingDone, morningTime, eveningTime } = useAppStore();
  const [morning, setMorning] = useState(morningTime);
  const [evening, setEvening] = useState(eveningTime);

  const handleDone = async () => {
    setMorningTime(morning);
    setEveningTime(evening);
    setOnboardingDone();
    if (Platform.OS !== 'web') {
      await setupNotifications(morning, evening);
    }
    router.replace('/(tabs)/heute');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: C.bg }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24 }}>
        <View style={{ marginBottom: 32, marginTop: 20 }}>
          <ThemedText variant="label" style={{ color: C.primary, marginBottom: 8 }}>
            SCHRITT 3 VON 3
          </ThemedText>
          <ThemedText variant="title" style={{ marginBottom: 12 }}>
            Dein Tages-Rhythmus{'\n'}⏰
          </ThemedText>
          <ThemedText variant="secondary">
            Wann sollen wir dich erinnern? Du kannst das später ändern.
          </ThemedText>
        </View>

        <Card style={{ marginBottom: 24 }}>
          <ThemedText style={{ fontWeight: '600', marginBottom: 12 }}>🌅 Morgen-Erinnerung</ThemedText>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {TIME_OPTIONS.map((t) => (
              <TouchableOpacity
                key={t}
                onPress={() => setMorning(t)}
                style={{
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                  borderRadius: 10,
                  backgroundColor: morning === t ? C.primary : C.bgElevated,
                  borderWidth: 1,
                  borderColor: morning === t ? C.primary : C.border,
                }}
              >
                <Text style={{ color: morning === t ? '#fff' : C.textSecondary, fontWeight: '500' }}>
                  {t}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        <Card style={{ marginBottom: 40 }}>
          <ThemedText style={{ fontWeight: '600', marginBottom: 12 }}>🌙 Abend-Reflexion</ThemedText>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {EVENING_OPTIONS.map((t) => (
              <TouchableOpacity
                key={t}
                onPress={() => setEvening(t)}
                style={{
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                  borderRadius: 10,
                  backgroundColor: evening === t ? C.primary : C.bgElevated,
                  borderWidth: 1,
                  borderColor: evening === t ? C.primary : C.border,
                }}
              >
                <Text style={{ color: evening === t ? '#fff' : C.textSecondary, fontWeight: '500' }}>
                  {t}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        <Button label="Los geht's! 🚀" onPress={handleDone} fullWidth size="lg" />
      </ScrollView>
    </SafeAreaView>
  );
}
