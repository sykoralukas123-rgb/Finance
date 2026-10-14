import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { StepProb } from '../lib/types'
import { fmtMetric } from '../lib/format'

// Validated for CVD separation and lightness on the zinc-900 surface.
const SERIES = { actual: '#d97706', predicted: '#0284c7' }
const AXIS = { stroke: '#3f3f46', tick: { fill: '#a1a1aa', fontSize: 11, fontFamily: 'JetBrains Mono' } }
const TOOLTIP_STYLE = {
  contentStyle: {
    background: '#09090b',
    border: '1px solid #3f3f46',
    borderRadius: 6,
    fontFamily: 'JetBrains Mono',
    fontSize: 12,
  },
  labelStyle: { color: '#e4e4e7' },
  itemStyle: { color: '#d4d4d8' },
}

export function StepProbChart({ steps }: { steps: StepProb[] }) {
  const data = steps.map((s) => ({ name: `${s.threshold}`, prob: s.prob, step: s.step }))
  return (
    <div className="h-28 w-full" aria-label="Probability per streak step">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 16, right: 0, bottom: 0, left: 0 }} barCategoryGap={4}>
          <XAxis dataKey="name" {...AXIS} tickLine={false} axisLine={{ stroke: '#3f3f46' }} interval={0} />
          <YAxis hide domain={[0, 1]} />
          <Tooltip
            {...TOOLTIP_STYLE}
            cursor={{ fill: 'rgba(255,255,255,0.04)' }}
            formatter={(v) => [`${(Number(v) * 100).toFixed(1)}%`, 'Probability']}
            labelFormatter={(l, p) => `Step ${p?.[0]?.payload?.step ?? ''} · ${l} pts`}
          />
          <Bar dataKey="prob" fill={SERIES.actual} radius={[4, 4, 0, 0]} isAnimationActive={false}>
            <LabelList
              dataKey="prob"
              position="top"
              formatter={(v) => `${Math.round(Number(v) * 100)}`}
              style={{ fill: '#a1a1aa', fontSize: 10, fontFamily: 'JetBrains Mono' }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export interface SeriesPoint {
  label: string
  predicted: number
  actual: number
}

export function PredictedActualChart({ data, metric }: { data: SeriesPoint[]; metric: string }) {
  const fmt = (v: unknown) => fmtMetric(metric, Number(v))
  return (
    <div className="h-64 w-full md:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
          <CartesianGrid stroke="#27272a" vertical={false} />
          <XAxis dataKey="label" {...AXIS} tickLine={false} />
          <YAxis {...AXIS} tickLine={false} axisLine={false} width={52} domain={['auto', 'auto']} tickFormatter={fmt} />
          <Tooltip {...TOOLTIP_STYLE} cursor={{ stroke: '#52525b' }} formatter={(v, name) => [fmt(v), name]} />
          <Legend
            verticalAlign="top"
            align="right"
            height={28}
            iconType="plainline"
            wrapperStyle={{ fontFamily: 'JetBrains Mono', fontSize: 11, color: '#a1a1aa' }}
          />
          <Line
            type="linear"
            dataKey="predicted"
            name="Predicted"
            stroke={SERIES.predicted}
            strokeWidth={2}
            strokeDasharray="5 4"
            dot={{ r: 4, fill: SERIES.predicted, stroke: '#18181b', strokeWidth: 2 }}
            activeDot={{ r: 5 }}
            isAnimationActive={false}
          />
          <Line
            type="linear"
            dataKey="actual"
            name="Actual"
            stroke={SERIES.actual}
            strokeWidth={2}
            dot={{ r: 4, fill: SERIES.actual, stroke: '#18181b', strokeWidth: 2 }}
            activeDot={{ r: 5 }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
