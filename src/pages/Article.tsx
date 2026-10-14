import { Link, useParams } from 'react-router-dom'
import { Lock } from 'lucide-react'
import { useAuth, useViewerKey } from '../context/AuthContext'
import { fetchArticle } from '../lib/api'
import { fmtDate } from '../lib/format'
import { useAsync } from '../lib/useAsync'
import { Markdown } from '../components/Markdown'
import { Badge, ButtonLink, Card, Empty, ErrorNote, Loading } from '../components/ui'

export function ArticleView({ slug, showMeta = true }: { slug: string; showMeta?: boolean }) {
  const { session } = useAuth()
  const viewerKey = useViewerKey()
  const { data, error, loading } = useAsync(() => fetchArticle(slug), viewerKey && `${slug}:${viewerKey}`)

  if (loading) return <Loading />
  if (error) return <ErrorNote error={error} />
  if (!data?.meta) return <Empty>Article not found.</Empty>

  const { meta, body } = data
  const locked = body === null && meta.is_premium

  return (
    <article className="mx-auto max-w-3xl">
      {showMeta && (
        <div className="mb-3 flex items-center gap-3">
          <Badge tone={meta.is_premium ? 'pro' : 'free'}>{meta.is_premium ? 'Pro' : 'Free'}</Badge>
          <span className="font-mono text-[11px] text-zinc-500">{fmtDate(meta.published_at)}</span>
        </div>
      )}
      <h1 className="font-display text-3xl font-semibold leading-tight tracking-tight text-zinc-50 md:text-4xl">
        {meta.title}
      </h1>
      {meta.excerpt && <p className="mt-4 text-lg leading-relaxed text-zinc-400">{meta.excerpt}</p>}

      <div className="mt-6 border-t border-zinc-800 pt-2">
        {locked ? (
          <Card className="mt-6 flex flex-col items-center gap-3 p-8 text-center">
            <Lock className="h-5 w-5 text-amber-400" />
            <h2 className="font-display text-xl font-semibold text-zinc-50">This article is for Pro members</h2>
            <p className="max-w-sm text-sm text-zinc-400">
              Pro includes every article, all stacks and the full projection tables for all live competitions.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <ButtonLink to="/pricing">See Pro plan</ButtonLink>
              {!session && (
                <ButtonLink to="/account" variant="secondary">
                  Log in
                </ButtonLink>
              )}
            </div>
          </Card>
        ) : (
          <Markdown>{body ?? ''}</Markdown>
        )}
      </div>
    </article>
  )
}

export function Article() {
  const { slug = '' } = useParams()
  return (
    <div>
      <Link to="/articles" className="mb-6 inline-block font-mono text-xs text-zinc-500 hover:text-amber-400">
        ← All articles
      </Link>
      <ArticleView slug={slug} />
    </div>
  )
}

export function Methodology() {
  return <ArticleView slug="methodology" showMeta={false} />
}
