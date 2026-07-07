import Link from 'next/link'
import FuturisticShell from '../../components/FuturisticShell'
import {
  getMissionProfileBySlug,
  getScenarioPresetBySlug,
  getToolsBySlugs,
  stackReports,
} from '../../lib/opentoolkit'

export default function ReportsPage() {
  return (
    <FuturisticShell title="Reports" eyebrow="Public stack verdicts">
      <section className="f-hero f-card rise-in" style={{ padding: '28px' }}>
        <p style={{ margin: 0, color: 'var(--text-soft)', fontSize: '1.08rem', lineHeight: 1.8, maxWidth: '860px' }}>
          Reports are the shareable public judgment layer. They turn scattered stack opinions into reusable verdicts
          with audience fit, risks, and next moves.
        </p>
        <div style={{ marginTop: '16px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <span className="f-chip f-chip-red">{stackReports.length} public dossiers</span>
          <Link href="/shortlist/" className="f-button f-button-ghost">
            Build a private board
          </Link>
          <Link href="/methodology/" className="f-button f-button-ghost">
            Inspect the scoring worldview
          </Link>
        </div>
      </section>

      <div style={{ display: 'grid', gap: '18px', marginTop: '22px' }}>
        {stackReports.map((report, index) => {
          const profile = getMissionProfileBySlug(report.profileSlug)
          const preset = getScenarioPresetBySlug(report.presetSlug)
          const tools = getToolsBySlugs(report.toolSlugs)

          return (
            <section
              key={report.slug}
              className="f-panel f-card rise-in"
              style={{ padding: '22px', animationDelay: `${0.08 + index * 0.04}s` }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ maxWidth: '780px' }}>
                  <div className="f-chip f-chip-red">{report.audience}</div>
                  <h2 style={{ margin: '14px 0 10px', fontSize: '2rem' }}>{report.title}</h2>
                  <p style={{ margin: 0, color: 'var(--text-soft)', lineHeight: 1.8 }}>{report.subtitle}</p>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignContent: 'start' }}>
                  {profile && <span className="f-chip">{profile.name}</span>}
                  {preset && <span className="f-chip f-chip-blue">{preset.name}</span>}
                </div>
              </div>

              <div style={{ marginTop: '16px' }}>
                <Link href={`/reports/${report.slug}/`} className="f-button">
                  Open report dossier
                </Link>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '16px', marginTop: '18px' }}>
                <div className="f-card" style={{ padding: '16px', background: 'rgba(255,255,255,0.03)' }}>
                  <div className="f-kicker">Editorial thesis</div>
                  <div style={{ marginTop: '10px', color: 'var(--text-soft)', lineHeight: 1.7 }}>{report.thesis}</div>
                </div>
                <div className="f-card" style={{ padding: '16px', background: 'rgba(255,255,255,0.03)' }}>
                  <div className="f-kicker">Included tools</div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '10px' }}>
                    {tools.map((tool) => (
                      <Link key={tool.slug} href={`/tools/${tool.slug}/`} className="f-chip" style={{ textDecoration: 'none' }}>
                        {tool.name}
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
