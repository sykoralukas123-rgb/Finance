import { Stack } from 'expo-router';
import { useColors } from '@/hooks/useColors';

export default function ModalLayout() {
  const C = useColors();
  return (
    <Stack
      screenOptions={{
        presentation: 'modal',
        headerStyle: { backgroundColor: C.bgCard },
        headerTintColor: C.text,
        headerShadowVisible: false,
      }}
    />
  );
}
