import React from 'react';
import { TextInput, View, Text, ViewStyle, StyleProp, TextInputProps } from 'react-native';
import { useColors } from '@/hooks/useColors';

interface Props extends TextInputProps {
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

export function Input({ label, containerStyle, style, ...props }: Props) {
  const C = useColors();
  return (
    <View style={containerStyle}>
      {label && (
        <Text style={{ color: C.textSecondary, fontSize: 13, fontWeight: '500', marginBottom: 6 }}>
          {label}
        </Text>
      )}
      <TextInput
        placeholderTextColor={C.textMuted}
        style={[
          {
            backgroundColor: C.bgElevated,
            borderRadius: 12,
            paddingHorizontal: 14,
            paddingVertical: 12,
            color: C.text,
            fontSize: 15,
            borderWidth: 1,
            borderColor: C.border,
          },
          style,
        ]}
        {...props}
      />
    </View>
  );
}
