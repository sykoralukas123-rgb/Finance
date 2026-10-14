import { ButtonLink, PageHeader } from '../components/ui'

export function NotFound() {
  return (
    <div>
      <PageHeader title="Page not found" kicker="404">
        The page you requested does not exist.
      </PageHeader>
      <ButtonLink to="/">Back to home</ButtonLink>
    </div>
  )
}
