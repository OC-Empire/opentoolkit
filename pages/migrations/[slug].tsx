import Link from 'next/link'
import FuturisticShell from '../../components/FuturisticShell'
import {
  getMigrationJourneyBySlug,
  getToolsByNames,
  migrationJourneys,
} from '../../lib/opentoolkit'

type JourneyPageProps = {
  slug: string
}

export function getStaticPaths() {
  return {
    paths: migrationJourneys.map((journey) => ({ params: { slug: journey.slug } })),
    fallback: false,
  }
}

export function getStaticProps({ params }: { params: { slug: string } }) {
  return {
    props: {
      slug: params.slug,
    },
  }
}

export default function MigrationJourneyPage({ slug }: JourneyPageProps) {
  const journey = getMigrationJourneyBySlug(slug)

  if (!journey) return null

  return (
    <FuturisticShell
      title={journey.title}
      eyebrow="Flagship migration"
      backHref="/migrations/"
      backLabel="← Back to migrations"
    >
      <section className="f-hero f-card rise-in" style={{ padding: '28px' }}>
        <div className="f-chip f-chip-red">Flagship journey</div>
        <h1 style={{ margin: '16px 0 0', fontSize: 'clamp(2.4rem, 6vw, 4.8rem)', lineHeight: 0.98 }}>{journey.title}</h1>
        <p style={{ margin: '16px 0 0', color: 'var(--text-soft)', fontSize: '1.08rem', lineHeight: 1.8, maxWidth: '860px' }}>
          {journey.subtitle}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '18px', marginTop: '20px' }}>
          <div className="f-card" style={{ padding: '18px', background: 'rgba(255,255,255,0.03)' }}>
            <div className="f-kicker">What is at stake</div>
            <div style={{ marginTop: '10px', color: 'var(--text-soft)', lineHeight: 1.75 }}>{journey.stakes}</div>
          </div>

          <div className="f-card" style={{ padding: '18px', background: 'rgba(255,255,255,0.03)' }}>
            <div className="f-kicker">Target outcome</div>
            <div style={{ marginTop: '10px', color: 'var(--text-soft)', lineHeight: 1.75 }}>{journey.outcome}</div>
          </div>
        </div>
      </section>

      <div style={{ display: 'grid', gap: '18px', marginTop: '22px' }}>
        {journey.phases.map((phase, index) => {
          const tools = getToolsByNames(phase.toolNames)

          return (
            <section
              key={phase.name}
              className="f-panel f-card rise-in"
              style={{ padding: '22px', animationDelay: `${0.08 + index * 0.04}s` }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ maxWidth: '760px' }}>
                  <div className="f-chip f-chip-blue">Phase {index + 1}</div>
                  <h2 style={{ margin: '14px 0 10px', fontSize: '2rem' }}>{phase.name}</h2>
                  <p style={{ margin: 0, color: 'var(--text-soft)', lineHeight: 1.75 }}>{phase.objective}</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginTop: '18px' }}>
                <div className="f-card" style={{ padding: '18px', background: 'rgba(255,255,255,0.03)' }}>
                  <div className="f-kicker">Phase actions</div>
                  <ol style={{ margin: '12px 0 0', paddingLeft: '18px', color: 'var(--text-soft)', lineHeight: 1.85 }}>
                    {phase.steps.map((step) => (
                      <li key={step} style={{ marginBottom: '8px' }}>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="f-card" style={{ padding: '18px', background: 'rgba(255,255,255,0.03)' }}>
                  <div className="f-kicker">Recommended tools</div>
                  <div style={{ display: 'grid', gap: '10px', marginTop: '12px' }}>
                    {tools.map((tool) => (
                      <Link key={tool.slug} href={`/tools/${tool.slug}/`} style={{ textDecoration: 'none', color: 'var(--text-main)' }}>
                        <div className="f-card" style={{ padding: '14px', background: 'rgba(255,255,255,0.03)' }}>
                          <div style={{ fontWeight: 800 }}>{tool.name}</div>
                          <div style={{ marginTop: '6px', color: 'var(--text-soft)', lineHeight: 1.6 }}>{tool.description}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )
        })}
      </div>

      <section className="f-panel f-card rise-in" style={{ padding: '22px', marginTop: '22px' }}>
        <div className="f-kicker">Warnings</div>
        <div style={{ display: 'grid', gap: '10px', marginTop: '12px' }}>
          {journey.warnings.map((warning) => (
            <div key={warning} className="f-card" style={{ padding: '14px', background: 'rgba(255,255,255,0.03)', color: 'var(--text-soft)', lineHeight: 1.7 }}>
              {warning}
            </div>
          ))}
        </div>
      </section>

      <section className="f-panel f-card rise-in" style={{ padding: '22px', marginTop: '22px' }}>
        <div className="f-kicker">Journey summary</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '12px', marginTop: '12px' }}>
          <div className="f-card" style={{ padding: '14px', background: 'rgba(255,255,255,0.03)' }}>
            <div style={{ fontWeight: 800, fontSize: '1.4rem' }}>{journey.phases.length}</div>
            <div style={{ marginTop: '4px', color: 'var(--text-soft)' }}>Phases</div>
          </div>
          <div className="f-card" style={{ padding: '14px', background: 'rgba(255,255,255,0.03)' }}>
            <div style={{ fontWeight: 800, fontSize: '1.4rem' }}>{journey.warnings.length}</div>
            <div style={{ marginTop: '4px', color: 'var(--text-soft)' }}>Warnings</div>
          </div>
          <div className="f-card" style={{ padding: '14px', background: 'rgba(255,255,255,0.03)' }}>
            <div style={{ fontWeight: 800, fontSize: '1.4rem' }}>
              {journey.phases.reduce((sum, phase) => sum + phase.toolNames.length, 0)}
            </div>
            <div style={{ marginTop: '4px', color: 'var(--text-soft)' }}>Tool slots</div>
          </div>
        </div>
      </section>
    </FuturisticShell>
  )
}
