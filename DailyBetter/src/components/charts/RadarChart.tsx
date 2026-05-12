import React from 'react';
import { View } from 'react-native';
import Svg, { Polygon, Circle, Text as SvgText, Line } from 'react-native-svg';
import { useColors } from '@/hooks/useColors';
import { AreaColors } from '@/constants/colors';
import { AREA_LABELS } from '@/constants/icons';

interface Props {
  values: Record<string, number>; // area → 1–10
  size?: number;
}

const AREAS = ['finanzen', 'studium', 'gesundheit', 'beruf', 'persoenlich'];

function polarToCartesian(cx: number, cy: number, r: number, angleRad: number) {
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  };
}

export function RadarChart({ values, size = 200 }: Props) {
  const C = useColors();
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size / 2 - 28;
  const n = AREAS.length;

  const angle = (i: number) => (2 * Math.PI * i) / n - Math.PI / 2;

  const dataPoints = AREAS.map((area, i) => {
    const val = (values[area] ?? 5) / 10;
    const r = val * maxR;
    const pt = polarToCartesian(cx, cy, r, angle(i));
    return `${pt.x},${pt.y}`;
  }).join(' ');

  const gridLevels = [0.25, 0.5, 0.75, 1.0];

  return (
    <Svg width={size} height={size}>
      {/* Grid rings */}
      {gridLevels.map((level) => {
        const pts = AREAS.map((_, i) => {
          const pt = polarToCartesian(cx, cy, level * maxR, angle(i));
          return `${pt.x},${pt.y}`;
        }).join(' ');
        return (
          <Polygon
            key={level}
            points={pts}
            fill="none"
            stroke={C.border}
            strokeWidth={1}
          />
        );
      })}
      {/* Axis lines */}
      {AREAS.map((_, i) => {
        const outer = polarToCartesian(cx, cy, maxR, angle(i));
        return (
          <Line key={i} x1={cx} y1={cy} x2={outer.x} y2={outer.y} stroke={C.border} strokeWidth={1} />
        );
      })}
      {/* Data polygon */}
      <Polygon
        points={dataPoints}
        fill={C.primary + '33'}
        stroke={C.primary}
        strokeWidth={2}
      />
      {/* Labels */}
      {AREAS.map((area, i) => {
        const r = maxR + 18;
        const pt = polarToCartesian(cx, cy, r, angle(i));
        return (
          <SvgText
            key={area}
            x={pt.x}
            y={pt.y}
            fill={AreaColors[area]}
            fontSize="10"
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            {AREA_LABELS[area]}
          </SvgText>
        );
      })}
    </Svg>
  );
}
