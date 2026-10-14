import { Link } from 'react-router-dom'
import { fetchArticles } from '../lib/api'
import { fmtDate } from '../lib/format'
import { useAsync } from '../lib/useAsync'
import { Badge, Card, Empty, ErrorNote, Loading, PageHeader } from '../components/ui'

export function Articles() {
  const { data, error, loading } = useAsync(fetchArticles, 'articles')
  return (
    <div>
      <PageHeader title="Articles" kicker="Research notes">
        Calibration reports, model changes and analysis. Pro articles show the excerpt to everyone.
      </PageHeader>
      {loading && <Loading />}
      {error && <ErrorNote error={error} />}
      {data && data.length === 0 && <Empty>No articles published yet.</Empty>}
      {data && (
        <ul className="space-y-3">
          {data.map((a) => (
            <li key={a.id}>
              <Link to={a.slug === 'methodology' ? '/methodology' : `/articles/${a.slug}`} className="block">
                <Card className="p-4 transition-colors hover:border-zinc-600 md:p-5">
                  <div className="mb-2 flex items-center gap-3">
                    <Badge tone={a.is_premium ? 'pro' : 'free'}>{a.is_premium ? 'Pro' : 'Free'}</Badge>
                    <span className="font-mono text-[11px] text-zinc-500">{fmtDate(a.published_at)}</span>
                  </div>
                  <h2 className="font-display text-xl font-semibold text-zinc-50">{a.title}</h2>
                  {a.excerpt && <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{a.excerpt}</p>}
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
