import Link from 'next/link'
import FuturisticShell from '../../components/FuturisticShell'
import { changeSignals, getToolsByNames, intelligenceLedger, radarEntries } from '../../lib/opentoolkit'

export default function RadarPage() {
  return (
    <FuturisticShell title="Radar" eyebrow="What deserves attention">
      <section className="f-hero f-card rise-in" style={{ padding: '28px' }}>
        <p style={{ margin: 0, color: 'var(--text-soft)', fontSize: '1.08rem', lineHeight: 1.8, maxWidth: '860px' }}>
          Radar is where OpenToolkit starts feeling alive. It is the running signal layer for what is rising,
          stabilizing, or becoming strategically important in the software landscape.
        </p>
      </section>

      <section className="rise-in" style={{ marginTop: '22px' }}>
        <div className="f-panel f-card" style={{ padding: '22px' }}>
          <div className="f-kicker">What changed this week</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '14px', marginTop: '12px' }}>
            {changeSignals.map((signal) => {
              const tools = getToolsByNames(signal.affectedToolNames)

              return (
                <div key={signal.slug} className="f-card" style={{ padding: '16px', background: 'rgba(255,255,255,0.03)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'center' }}>
                    <div style={{ fontWeight: 800 }}>{signal.label}</div>
                    <div className="f-chip f-chip-blue">{signal.intensity}</div>
                  </div>
                  <div style={{ marginTop: '8px', color: 'var(--text-soft)', lineHeight: 1.65 }}>{signal.summary}</div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
                    {tools.map((tool) => (
                      <Link
                        key={tool.slug}
                        href={`/tools/${tool.slug}/`}
                        className="f-chip"
                        style={{ textDecoration: 'none' }}
                      >
                        {tool.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="rise-in" style={{ marginTop: '22px' }}>
        <div className="f-panel f-card" style={{ padding: '22px' }}>
          <div className="f-kicker">Weekly intelligence ledger</div>
          <div style={{ display: 'grid', gap: '14px', marginTop: '12px' }}>
            {intelligenceLedger.map((entry) => {
              const tools = getToolsByNames(entry.toolNames)

              return (
                <div key={entry.slug} className="f-card" style={{ padding: '18px', background: 'rgba(255,255,255,0.03)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <div>
                      <div className="f-kicker">{entry.weekOf}</div>
                      <div style={{ fontWeight: 800, fontSize: '1.12rem', marginTop: '8px' }}>{entry.title}</div>
                    </div>
                    <div className="f-chip f-chip-red">{entry.status}</div>
                  </div>
                  <div style={{ marginTop: '10px', color: 'var(--text-soft)', lineHeight: 1.7 }}>{entry.summary}</div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '14px' }}>
                    <div className="f-card" style={{ padding: '14px', background: 'rgba(255,255,255,0.03)' }}>
                      <div className="f-kicker">Signals</div>
                      <div style={{ display: 'grid', gap: '8px', marginTop: '10px' }}>
                        {entry.signals.map((signal) => (
                          <div key={signal} style={{ color: 'var(--text-soft)', lineHeight: 1.6 }}>
                            {signal}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="f-card" style={{ padding: '14px', background: 'rgba(255,255,255,0.03)' }}>
                      <div className="f-kicker">Actions</div>
                      <div style={{ display: 'grid', gap: '8px', marginTop: '10px' }}>
                        {entry.actions.map((action) => (
                          <div key={action} style={{ color: 'var(--text-soft)', lineHeight: 1.6 }}>
                            {action}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="f-card" style={{ padding: '14px', background: 'rgba(255,255,255,0.03)', marginTop: '12px' }}>
                    <div className="f-kicker">Command read</div>
                    <div style={{ display: 'grid', gap: '8px', marginTop: '10px' }}>
                      {entry.actions.slice(0, 2).map((action) => (
                        <div key={action} style={{ color: 'var(--text-soft)', lineHeight: 1.6 }}>
                          {action}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
                    {tools.map((tool) => (
                      <Link key={tool.slug} href={`/tools/${tool.slug}/`} className="f-chip" style={{ textDecoration: 'none' }}>
                        {tool.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
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
