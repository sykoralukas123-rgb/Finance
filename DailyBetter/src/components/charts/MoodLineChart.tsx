import React from 'react';
import { View, Dimensions } from 'react-native';
import Svg, { Polyline, Circle, Line, Text as SvgText } from 'react-native-svg';
import { useColors } from '@/hooks/useColors';
import { Reflexion } from '@/types';

interface Props {
  reflexionen: Reflexion[]; // last 30 days sorted oldest→newest
}

export function MoodLineChart({ reflexionen }: Props) {
  const C = useColors();
  const W = Dimensions.get('window').width - 64;
  const H = 100;
  const PAD = 12;

  if (reflexionen.length < 2) {
    return (
      <View style={{ height: H, alignItems: 'center', justifyContent: 'center' }}>
        <SvgText fill={C.textMuted} fontSize="12">Zu wenig Daten</SvgText>
      </View>
    );
  }

  const points = reflexionen.map((r, i) => ({
    x: PAD + (i / (reflexionen.length - 1)) * (W - PAD * 2),
    y: H - PAD - ((r.mood - 1) / 4) * (H - PAD * 2),
    mood: r.mood,
  }));

  const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <Svg width={W} height={H}>
      {/* Grid lines */}
      {[1, 2, 3, 4, 5].map((v) => {
        const y = H - PAD - ((v - 1) / 4) * (H - PAD * 2);
        return (
          <Line key={v} x1={PAD} y1={y} x2={W - PAD} y2={y} stroke={C.border} strokeWidth={1} />
        );
      })}
      {/* Line */}
      <Polyline
        points={polylinePoints}
        fill="none"
        stroke={C.primary}
        strokeWidth={2.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Dots */}
      {points.map((p, i) => (
        <Circle key={i} cx={p.x} cy={p.y} r={4} fill={C.primary} />
      ))}
    </Svg>
  );
}
