import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, ViewStyle, StyleProp } from 'react-native';
import { useColors } from '@/hooks/useColors';

interface Props {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  fullWidth?: boolean;
}

export function Button({ label, onPress, variant = 'primary', size = 'md', loading, disabled, style, fullWidth }: Props) {
  const C = useColors();

  const padV = size === 'sm' ? 8 : size === 'lg' ? 18 : 13;
  const padH = size === 'sm' ? 14 : size === 'lg' ? 28 : 20;
  const fontSize = size === 'sm' ? 13 : size === 'lg' ? 17 : 15;
  const radius = size === 'sm' ? 10 : 14;

  const bgMap = {
    primary: C.primary,
    secondary: C.bgElevated,
    ghost: 'transparent',
    danger: C.danger,
  };
  const colorMap = {
    primary: '#ffffff',
    secondary: C.text,
    ghost: C.primary,
    danger: '#ffffff',
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.75}
      style={[
        {
          backgroundColor: bgMap[variant],
          borderRadius: radius,
          paddingVertical: padV,
          paddingHorizontal: padH,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: disabled ? 0.5 : 1,
          ...(fullWidth && { width: '100%' }),
          ...(variant === 'ghost' && { borderWidth: 1, borderColor: C.primary }),
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={colorMap[variant]} size="small" />
      ) : (
        <Text style={{ color: colorMap[variant], fontSize, fontWeight: '600' }}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}
