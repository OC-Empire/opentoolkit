import Link from 'next/link'
import FuturisticShell from '../../components/FuturisticShell'
import { getReplacementScenarioBySlug, getToolsByNames, replacementScenarios } from '../../lib/opentoolkit'

type ReplaceScenarioProps = {
  slug: string
}

export function getStaticPaths() {
  return {
    paths: replacementScenarios.map((scenario) => ({ params: { slug: scenario.slug } })),
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

export default function ReplaceScenarioPage({ slug }: ReplaceScenarioProps) {
  const scenario = getReplacementScenarioBySlug(slug)
  if (!scenario) return null

  const tools = getToolsByNames(scenario.replacements)

  return (
    <FuturisticShell title={scenario.title} eyebrow="Replacement dossier" backHref="/replace/" backLabel="← Back to replace">
      <section className="f-hero f-card rise-in" style={{ padding: '28px' }}>
        <div className="f-chip f-chip-red">{scenario.incumbent}</div>
        <h1 style={{ margin: '16px 0 0', fontSize: 'clamp(2.4rem, 6vw, 4.8rem)', lineHeight: 0.98 }}>{scenario.title}</h1>
        <p style={{ margin: '16px 0 0', color: 'var(--text-soft)', fontSize: '1.08rem', lineHeight: 1.8, maxWidth: '860px' }}>
          {scenario.problem}
        </p>
      </section>

      <section className="rise-in" style={{ marginTop: '22px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: '18px' }}>
          <div className="f-panel f-card" style={{ padding: '22px' }}>
            <div className="f-kicker">Transition pressure</div>
            <div style={{ marginTop: '10px', color: 'var(--text-soft)', lineHeight: 1.75 }}>{scenario.bestFor}</div>
            <div style={{ marginTop: '14px' }} className="f-chip f-chip-blue">
              Friction: {scenario.friction}
            </div>
            <div className="f-kicker" style={{ marginTop: '16px' }}>Pain map</div>
            <div style={{ display: 'grid', gap: '10px', marginTop: '12px' }}>
              {[
                ['Identity drag', scenario.incumbent.includes('Gmail') || scenario.incumbent.includes('Google') ? 'High' : 'Medium'],
                ['Workflow retraining', scenario.friction === 'High' ? 'High' : 'Medium'],
                ['Social inertia', scenario.incumbent.includes('WhatsApp') ? 'High' : 'Low'],
                ['Archive risk', scenario.incumbent.includes('Photos') || scenario.incumbent.includes('Drive') || scenario.incumbent.includes('Spotify') ? 'High' : 'Medium'],
              ].map(([label, value]) => (
                <div key={label} className="f-card" style={{ padding: '12px 14px', background: 'rgba(255,255,255,0.03)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                    <span style={{ fontWeight: 800 }}>{label}</span>
                    <span className="f-chip">{value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="f-panel f-card" style={{ padding: '22px' }}>
            <div className="f-kicker">Action path</div>
            <ol style={{ margin: '12px 0 0', paddingLeft: '18px', color: 'var(--text-soft)', lineHeight: 1.85 }}>
              {scenario.steps.map((step) => (
                <li key={step} style={{ marginBottom: '8px' }}>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="rise-in" style={{ marginTop: '22px' }}>
        <div className="f-panel f-card" style={{ padding: '22px' }}>
          <div className="f-kicker">Replacement stack</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '14px', marginTop: '14px' }}>
            {tools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}/`}
                className="f-card"
                style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', textDecoration: 'none', color: 'var(--text-main)' }}
              >
                <div style={{ fontWeight: 800 }}>{tool.name}</div>
                <div style={{ marginTop: '8px', color: 'var(--text-soft)', lineHeight: 1.6 }}>{tool.description}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </FuturisticShell>
  )
}
