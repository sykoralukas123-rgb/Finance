import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { initDb } from '@/db/client';
import { seedDemoData } from '@/db/seed';
import { useAppStore } from '@/store/appStore';
import { useHabitStore } from '@/store/habitStore';
import { useGoalStore } from '@/store/goalStore';
import { useReflexionStore } from '@/store/reflexionStore';

function useHydrate() {
  const hydrateApp = useAppStore((s) => s.hydrate);
  const hydrateHabits = useHabitStore((s) => s.hydrate);
  const hydrateGoals = useGoalStore((s) => s.hydrate);
  const hydrateReflexion = useReflexionStore((s) => s.hydrate);

  useEffect(() => {
    (async () => {
      await initDb();
      seedDemoData();
      hydrateApp();
      hydrateHabits();
      hydrateGoals();
      hydrateReflexion();
    })();
  }, []);
}

export default function RootLayout() {
  useHydrate();
  const theme = useAppStore((s) => s.theme);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="onboarding" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="modals" options={{ presentation: 'modal' }} />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
