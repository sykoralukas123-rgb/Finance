import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { useAppStore } from '@/store/appStore';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

export default function TabLayout() {
  const C = useColors();

  const tabs: { name: string; title: string; icon: IoniconName; activeIcon: IoniconName }[] = [
    { name: 'heute', title: 'Heute', icon: 'today-outline', activeIcon: 'today' },
    { name: 'habits', title: 'Habits', icon: 'repeat-outline', activeIcon: 'repeat' },
    { name: 'ziele', title: 'Ziele', icon: 'flag-outline', activeIcon: 'flag' },
    { name: 'insights', title: 'Insights', icon: 'bar-chart-outline', activeIcon: 'bar-chart' },
    { name: 'profil', title: 'Profil', icon: 'person-outline', activeIcon: 'person' },
  ];

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: C.bgCard,
          borderTopColor: C.border,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: C.tabActive,
        tabBarInactiveTintColor: C.tabInactive,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '500' },
      }}
    >
      {tabs.map((t) => (
        <Tabs.Screen
          key={t.name}
          name={t.name}
          options={{
            title: t.title,
            tabBarIcon: ({ focused, color }) => (
              <Ionicons name={focused ? t.activeIcon : t.icon} size={22} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
