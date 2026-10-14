export const fmtNum = (v: number, digits = 1) =>
  Number.isFinite(v) ? v.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits }) : '–'

export const fmtPct = (v: number, digits = 0) => (Number.isFinite(v) ? `${(v * 100).toFixed(digits)}%` : '–')

export const fmtDate = (iso: string | null | undefined) =>
  iso ? new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '–'

export const fmtDateTime = (iso: string | null | undefined) =>
  iso
    ? new Date(iso).toLocaleString('en-GB', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short',
      })
    : '–'

export const fmtShortDate = (iso: string) =>
  new Date(iso + (iso.length === 10 ? 'T00:00:00' : '')).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })

interface MetricInfo {
  label: string
  isRate: boolean
  description: string
}

const METRICS: Record<string, MetricInfo> = {
  step1_hit_rate: {
    label: 'Step-1 hit rate',
    isRate: true,
    description: 'Share of the top 10 stacks that reached streak step 1. Predicted = mean model probability.',
  },
  avg_stack_score: {
    label: 'Avg stack score',
    isRate: false,
    description: 'Mean score of the top 10 stacks. Predicted = mean projected score.',
  },
}

// Known metrics first, in the order above; unknown ones after, alphabetically.
export function compareMetrics(a: string, b: string) {
  const keys = Object.keys(METRICS)
  const ia = keys.indexOf(a) === -1 ? keys.length : keys.indexOf(a)
  const ib = keys.indexOf(b) === -1 ? keys.length : keys.indexOf(b)
  return ia - ib || a.localeCompare(b)
}

// Unknown metric names from the pipeline still render: rates are detected by the "_rate" suffix.
export function metricInfo(name: string): MetricInfo {
  return (
    METRICS[name] ?? {
      label: name.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase()),
      isRate: name.endsWith('_rate'),
      description: '',
    }
  )
}

export const fmtMetric = (name: string, v: number) => (metricInfo(name).isRate ? fmtPct(v, 1) : fmtNum(v, 1))

export function fmtMetricDiff(name: string, diff: number) {
  const sign = diff > 0 ? '+' : diff < 0 ? '−' : '±'
  const abs = Math.abs(diff)
  return metricInfo(name).isRate ? `${sign}${(abs * 100).toFixed(1)} pts` : `${sign}${fmtNum(abs, 1)}`
}

export const POSITION_SHORT: Record<string, string> = {
  Goalkeeper: 'GK',
  Defender: 'DEF',
  Midfielder: 'MID',
  Forward: 'FWD',
}
export const posShort = (p: string) => POSITION_SHORT[p] ?? p.slice(0, 3).toUpperCase()
export const POSITION_ORDER = ['Goalkeeper', 'Defender', 'Midfielder', 'Forward']
