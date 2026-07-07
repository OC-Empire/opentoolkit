import Link from 'next/link'
import FuturisticShell from '../../components/FuturisticShell'
import { getToolsByNames, radarEntries } from '../../lib/opentoolkit'

export default function RadarPage() {
  return (
    <FuturisticShell title="Radar" eyebrow="What deserves attention">
      <section className="f-hero f-card rise-in" style={{ padding: '28px' }}>
        <p style={{ margin: 0, color: 'var(--text-soft)', fontSize: '1.08rem', lineHeight: 1.8, maxWidth: '860px' }}>
          Radar is where OpenToolkit starts feeling alive. It is the running signal layer for what is rising,
          stabilizing, or becoming strategically important in the software landscape.
        </p>
      </section>

      <div style={{ display: 'grid', gap: '18px', marginTop: '22px' }}>
        {radarEntries.map((entry, index) => {
          const tools = getToolsByNames(entry.toolNames)

          return (
            <section
              key={entry.slug}
              className="f-panel f-card rise-in"
              style={{ padding: '22px', animationDelay: `${0.08 + index * 0.04}s` }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ maxWidth: '760px' }}>
                  <div className="f-chip f-chip-red">{entry.status}</div>
                  <h2 style={{ margin: '14px 0 10px', fontSize: '2rem' }}>{entry.title}</h2>
                  <p style={{ margin: 0, color: 'var(--text-soft)', lineHeight: 1.8 }}>{entry.whyItMatters}</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginTop: '18px' }}>
                {tools.map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}/`}
                    className="f-card"
                    style={{
                      padding: '16px',
                      background: 'rgba(255,255,255,0.03)',
                      textDecoration: 'none',
                      color: 'var(--text-main)',
                      display: 'block',
                    }}
                  >
                    <div style={{ fontWeight: 800 }}>{tool.name}</div>
                    <div style={{ marginTop: '6px', color: 'var(--text-soft)', lineHeight: 1.55 }}>{tool.description}</div>
                  </Link>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </FuturisticShell>
  )
}
