import React from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { useColors } from '@/hooks/useColors';

interface Props {
  percent: number; // 0–100
  color?: string;
  height?: number;
  style?: StyleProp<ViewStyle>;
}

export function ProgressBar({ percent, color, height = 6, style }: Props) {
  const C = useColors();
  const fill = Math.min(100, Math.max(0, percent));
  return (
    <View
      style={[
        { height, borderRadius: height / 2, backgroundColor: C.border, overflow: 'hidden' },
        style,
      ]}
    >
      <View
        style={{
          width: `${fill}%`,
          height: '100%',
          borderRadius: height / 2,
          backgroundColor: color ?? C.primary,
        }}
      />
    </View>
  );
}
