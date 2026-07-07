import Link from 'next/link'
import FuturisticShell from '../../components/FuturisticShell'
import { getToolsByNames, migrationGuides } from '../../lib/opentoolkit'

export default function MigrationsPage() {
  return (
    <FuturisticShell title="Migrations" eyebrow="Replace bad defaults">
      <section className="f-hero f-card rise-in" style={{ padding: '28px' }}>
        <p style={{ margin: 0, color: 'var(--text-soft)', fontSize: '1.08rem', lineHeight: 1.8, maxWidth: '860px' }}>
          Migration is where this site becomes more than inspiration. People need replacement logic, pain-level honesty,
          and a path that respects how sticky defaults really are.
        </p>
      </section>

      <div style={{ display: 'grid', gap: '18px', marginTop: '22px' }}>
        {migrationGuides.map((guide, index) => {
          const tools = getToolsByNames(guide.replacements)

          return (
            <section
              key={guide.slug}
              id={guide.slug}
              className="f-panel f-card rise-in"
              style={{ padding: '22px', animationDelay: `${0.08 + index * 0.04}s` }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ maxWidth: '760px' }}>
                  <div className="f-chip f-chip-red">{guide.from}</div>
                  <h2 style={{ margin: '14px 0 10px', fontSize: '2rem' }}>{guide.title}</h2>
                  <p style={{ margin: 0, color: 'var(--text-soft)', lineHeight: 1.8 }}>{guide.promise}</p>
                </div>
                <div className="f-card" style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', minWidth: '240px' }}>
                  <div className="f-kicker">Pain level</div>
                  <div style={{ marginTop: '8px', fontSize: '1.6rem', fontWeight: 800 }}>{guide.painLevel}</div>
                  <div style={{ marginTop: '8px', color: 'var(--text-soft)', lineHeight: 1.6 }}>{guide.toward}</div>
                </div>
              </div>

              <div style={{ marginTop: '18px', color: 'var(--text-soft)', lineHeight: 1.7 }}>
                <strong style={{ color: 'var(--text-main)' }}>Why now:</strong> {guide.whyNow}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '18px', marginTop: '18px' }}>
                <div className="f-card" style={{ padding: '18px', background: 'rgba(255,255,255,0.03)' }}>
                  <div className="f-kicker">Transition logic</div>
                  <ol style={{ margin: '12px 0 0', paddingLeft: '18px', color: 'var(--text-soft)', lineHeight: 1.85 }}>
                    {guide.steps.map((step) => (
                      <li key={step} style={{ marginBottom: '8px' }}>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="f-card" style={{ padding: '18px', background: 'rgba(255,255,255,0.03)' }}>
                  <div className="f-kicker">Replacement set</div>
                  <div style={{ display: 'grid', gap: '10px', marginTop: '12px' }}>
                    {tools.map((tool) => (
                      <Link
                        key={tool.slug}
                        href={`/tools/${tool.slug}/`}
                        style={{ textDecoration: 'none', color: 'var(--text-main)' }}
                      >
                        <div className="f-card" style={{ padding: '14px', background: 'rgba(255,255,255,0.03)' }}>
                          <div style={{ fontWeight: 800 }}>{tool.name}</div>
                          <div style={{ marginTop: '6px', color: 'var(--text-soft)', lineHeight: 1.55 }}>{tool.description}</div>
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
    </FuturisticShell>
  )
}
