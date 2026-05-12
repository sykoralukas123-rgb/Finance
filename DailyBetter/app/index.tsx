import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useAppStore } from '@/store/appStore';

export default function Index() {
  const { onboardingDone, hydrated } = useAppStore();

  useEffect(() => {
    if (!hydrated) return;
    if (onboardingDone) {
      router.replace('/(tabs)/heute');
    } else {
      router.replace('/onboarding/step1');
    }
  }, [hydrated, onboardingDone]);

  return (
    <View style={{ flex: 1, backgroundColor: '#0f0f0f', alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator color="#6366f1" size="large" />
    </View>
  );
}
