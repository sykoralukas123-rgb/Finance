import React from 'react';
import { Text, TextStyle, StyleProp } from 'react-native';
import { useColors } from '@/hooks/useColors';

interface Props {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  variant?: 'title' | 'heading' | 'body' | 'secondary' | 'muted' | 'label';
  numberOfLines?: number;
}

export function ThemedText({ children, style, variant = 'body', numberOfLines }: Props) {
  const C = useColors();

  const base: TextStyle = { color: C.text };
  const variants: Record<string, TextStyle> = {
    title: { fontSize: 28, fontWeight: '700', color: C.text },
    heading: { fontSize: 20, fontWeight: '600', color: C.text },
    body: { fontSize: 15, fontWeight: '400', color: C.text },
    secondary: { fontSize: 14, fontWeight: '400', color: C.textSecondary },
    muted: { fontSize: 13, fontWeight: '400', color: C.textMuted },
    label: { fontSize: 12, fontWeight: '500', color: C.textSecondary, letterSpacing: 0.5 },
  };

  return (
    <Text style={[base, variants[variant], style]} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
}
