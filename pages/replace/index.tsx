import Link from 'next/link'
import FuturisticShell from '../../components/FuturisticShell'
import { getToolsByNames, replacementScenarios } from '../../lib/opentoolkit'

function getPainMap(friction: 'Low' | 'Medium' | 'High') {
  if (friction === 'Low') return ['Fast initial move', 'Low social drag', 'Mostly habit-level change']
  if (friction === 'Medium') return ['Archive or workflow cleanup', 'Noticeable onboarding cost', 'Needs staged cutover']
  return ['Identity and recovery fallout', 'Social or team coordination cost', 'Demands a migration ledger']
}

export default function ReplacePage() {
  return (
    <FuturisticShell title="Replace" eyebrow="Replacement engine">
      <section className="f-hero f-card rise-in" style={{ padding: '28px' }}>
        <p style={{ margin: 0, color: 'var(--text-soft)', fontSize: '1.08rem', lineHeight: 1.8, maxWidth: '860px' }}>
          Replacement logic is the heartbeat of a real software-intelligence product. People should be able to say
          what they want to leave behind and immediately see a better route, the pain level, and the next sane move.
        </p>
      </section>

      <div style={{ display: 'grid', gap: '18px', marginTop: '22px' }}>
        {replacementScenarios.map((scenario, index) => {
          const tools = getToolsByNames(scenario.replacements)

          return (
            <section
              key={scenario.slug}
              className="f-panel f-card rise-in"
              style={{ padding: '22px', animationDelay: `${0.08 + index * 0.04}s` }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ maxWidth: '760px' }}>
                  <div className="f-chip f-chip-red">{scenario.incumbent}</div>
                  <h2 style={{ margin: '14px 0 10px', fontSize: '2rem' }}>{scenario.title}</h2>
                  <p style={{ margin: 0, color: 'var(--text-soft)', lineHeight: 1.8 }}>{scenario.problem}</p>
                </div>

                <div className="f-card" style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', minWidth: '260px' }}>
                  <div className="f-kicker">Best for</div>
                  <div style={{ marginTop: '8px', color: 'var(--text-soft)', lineHeight: 1.7 }}>{scenario.bestFor}</div>
                  <div style={{ marginTop: '12px' }} className="f-chip f-chip-blue">
                    Friction: {scenario.friction}
                  </div>
                  <div style={{ marginTop: '12px' }}>
                    <Link href={`/replace/${scenario.slug}/`} className="f-button f-button-ghost">
                      Open replacement dossier
                    </Link>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginTop: '18px' }}>
                <div className="f-card" style={{ padding: '18px', background: 'rgba(255,255,255,0.03)' }}>
                  <div className="f-kicker">Recommended replacements</div>
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

                <div className="f-card" style={{ padding: '18px', background: 'rgba(255,255,255,0.03)' }}>
                  <div className="f-kicker">Transition path</div>
                  <ol style={{ margin: '12px 0 0', paddingLeft: '18px', color: 'var(--text-soft)', lineHeight: 1.85 }}>
                    {scenario.steps.map((step) => (
                      <li key={step} style={{ marginBottom: '8px' }}>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginTop: '18px' }}>
                <div className="f-card" style={{ padding: '18px', background: 'rgba(255,255,255,0.03)' }}>
                  <div className="f-kicker">Incumbent pain map</div>
                  <div style={{ display: 'grid', gap: '8px', marginTop: '12px' }}>
                    {getPainMap(scenario.friction).map((line) => (
                      <div key={line} style={{ color: 'var(--text-soft)', lineHeight: 1.65 }}>
                        {line}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="f-card" style={{ padding: '18px', background: 'rgba(255,255,255,0.03)' }}>
                  <div className="f-kicker">Replacement posture</div>
                  <div style={{ marginTop: '10px', color: 'var(--text-soft)', lineHeight: 1.7 }}>
                    The right replacement is not the most ideological one. It is the route that reduces dependency
                    and still survives ordinary life after the migration adrenaline wears off.
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
