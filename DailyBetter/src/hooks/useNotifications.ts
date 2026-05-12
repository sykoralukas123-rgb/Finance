import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowList: true,
  }),
});

export async function requestNotificationPermission(): Promise<boolean> {
  if (Platform.OS === 'web') return false;
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function scheduleDailyNotification(
  id: string,
  title: string,
  body: string,
  hour: number,
  minute: number
): Promise<void> {
  await Notifications.cancelScheduledNotificationAsync(id).catch(() => {});
  await Notifications.scheduleNotificationAsync({
    identifier: id,
    content: { title, body },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute,
    },
  });
}

export async function setupNotifications(morningTime: string, eveningTime: string): Promise<void> {
  const granted = await requestNotificationPermission();
  if (!granted) return;

  const [mH, mM] = morningTime.split(':').map(Number);
  const [eH, eM] = eveningTime.split(':').map(Number);

  await scheduleDailyNotification(
    'morning',
    '🌅 Guten Morgen!',
    'Starte deinen Tag mit deinen Gewohnheiten.',
    mH, mM
  );

  await scheduleDailyNotification(
    'evening',
    '🌙 Zeit zur Reflexion',
    'Wie war dein Tag? Mach deine Abend-Reflexion.',
    eH, eM
  );
}
