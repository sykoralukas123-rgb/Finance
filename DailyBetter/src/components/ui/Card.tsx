import React from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';
import { useColors } from '@/hooks/useColors';

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  elevated?: boolean;
}

export function Card({ children, style, elevated }: Props) {
  const C = useColors();
  return (
    <View
      style={[
        {
          backgroundColor: elevated ? C.bgElevated : C.bgCard,
          borderRadius: 16,
          padding: 16,
          borderWidth: 1,
          borderColor: C.border,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
