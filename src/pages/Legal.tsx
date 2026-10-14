import { PageHeader } from '../components/ui'

function Placeholder({ title, sections }: { title: string; sections: string[] }) {
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title={title} />
      <div className="space-y-8">
        {sections.map((s) => (
          <section key={s}>
            <h2 className="mb-2 font-display text-xl font-semibold text-zinc-100">{s}</h2>
            <p className="text-sm text-zinc-500">[To be added]</p>
          </section>
        ))}
      </div>
    </div>
  )
}

export function Imprint() {
  return (
    <Placeholder
      title="Imprint"
      sections={['Service provider', 'Contact', 'Responsible for content', 'VAT ID', 'Dispute resolution', 'Liability for content and links']}
    />
  )
}

export function Privacy() {
  return (
    <Placeholder
      title="Privacy Policy"
      sections={[
        'Controller',
        'Data we process',
        'Account and login (Supabase)',
        'Hosting (Vercel)',
        'Fonts (Google Fonts)',
        'Cookies and local storage',
        'Retention',
        'Your rights',
        'Contact',
      ]}
    />
  )
}
