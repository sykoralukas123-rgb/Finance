import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withSequence } from 'react-native-reanimated';
import { HabitWithStats } from '@/types';
import { useColors } from '@/hooks/useColors';
import { ThemedText } from '@/components/ui/ThemedText';

interface Props {
  habit: HabitWithStats;
  onToggle: () => void;
  onPress?: () => void;
}

export function HabitCard({ habit, onToggle, onPress }: Props) {
  const C = useColors();
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleToggle = () => {
    scale.value = withSequence(withSpring(0.93), withSpring(1));
    onToggle();
  };

  return (
    <Animated.View style={[animStyle, { marginBottom: 10 }]}>
      <TouchableOpacity
        onPress={onPress ?? handleToggle}
        onLongPress={handleToggle}
        activeOpacity={0.85}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: habit.completedToday ? habit.color + '22' : C.bgCard,
          borderRadius: 16,
          padding: 14,
          borderWidth: 1,
          borderColor: habit.completedToday ? habit.color + '55' : C.border,
          gap: 14,
        }}
      >
        {/* Icon */}
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: 14,
            backgroundColor: habit.color + '33',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons name={habit.icon as any} size={24} color={habit.color} />
        </View>

        {/* Info */}
        <View style={{ flex: 1 }}>
          <ThemedText variant="body" style={{ fontWeight: '600' }}>{habit.name}</ThemedText>
          {habit.identity ? (
            <ThemedText variant="muted" numberOfLines={1}>{habit.identity}</ThemedText>
          ) : null}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 }}>
            {habit.currentStreak > 0 && (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                <Text style={{ fontSize: 12 }}>🔥</Text>
                <ThemedText variant="muted" style={{ fontSize: 12 }}>{habit.currentStreak}d</ThemedText>
              </View>
            )}
          </View>
        </View>

        {/* Checkbox */}
        <TouchableOpacity
          onPress={handleToggle}
          style={{
            width: 32,
            height: 32,
            borderRadius: 10,
            backgroundColor: habit.completedToday ? habit.color : 'transparent',
            borderWidth: 2,
            borderColor: habit.completedToday ? habit.color : C.border,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {habit.completedToday && <Ionicons name="checkmark" size={18} color="#fff" />}
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
}
