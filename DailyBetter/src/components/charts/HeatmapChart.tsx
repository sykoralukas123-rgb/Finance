import React from 'react';
import { View, Text } from 'react-native';
import { useColors } from '@/hooks/useColors';
import { HeatmapDay } from '@/types';

interface Props {
  days: HeatmapDay[]; // 90 days, sorted oldest→newest
}

export function HeatmapChart({ days }: Props) {
  const C = useColors();
  const CELL = 11;
  const GAP = 2;

  const getColor = (d: HeatmapDay) => {
    if (d.total === 0) return C.border;
    const ratio = d.count / d.total;
    if (ratio === 0) return C.border;
    if (ratio < 0.4) return C.primaryDim;
    if (ratio < 0.7) return C.primary + 'aa';
    return C.primary;
  };

  // Group into columns of 7
  const cols: HeatmapDay[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    cols.push(days.slice(i, i + 7));
  }

  return (
    <View style={{ flexDirection: 'row', gap: GAP }}>
      {cols.map((col, ci) => (
        <View key={ci} style={{ gap: GAP }}>
          {col.map((day, ri) => (
            <View
              key={ri}
              style={{
                width: CELL,
                height: CELL,
                borderRadius: 2,
                backgroundColor: getColor(day),
              }}
            />
          ))}
        </View>
      ))}
    </View>
  );
}
