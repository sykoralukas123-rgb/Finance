import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/colors';
import { useAppStore } from '@/store/appStore';

export function useColors() {
  const systemScheme = useColorScheme();
  const theme = useAppStore((s) => s.theme);
  const scheme = theme === 'dark' ? 'dark' : theme === 'light' ? 'light' : (systemScheme ?? 'dark');
  return Colors[scheme];
}
