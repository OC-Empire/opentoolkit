import type { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import FuturisticShell from '../../components/FuturisticShell'
import {
  getMissionProfileBySlug,
  getScenarioPresetBySlug,
  getStackReportBySlug,
  getToolsBySlugs,
  stackReports,
} from '../../lib/opentoolkit'

type Props = {
  slug: string
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: stackReports.map((report) => ({ params: { slug: report.slug } })),
  fallback: false,
})

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => ({
  props: { slug: String(params?.slug || '') },
})

export default function StackReportDossier({ slug }: Props) {
  const report = getStackReportBySlug(slug)

  if (!report) return null

  const profile = getMissionProfileBySlug(report.profileSlug)
  const preset = getScenarioPresetBySlug(report.presetSlug)
  const tools = getToolsBySlugs(report.toolSlugs)

  return (
    <FuturisticShell title={report.title} eyebrow="Stack report dossier" backHref="/reports/" backLabel="Back to reports">
      <section className="f-hero f-card rise-in" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <span className="f-chip f-chip-red">{report.audience}</span>
          {profile && <span className="f-chip">{profile.name}</span>}
          {preset && <span className="f-chip f-chip-blue">{preset.name}</span>}
        </div>
        <h1 style={{ margin: '18px 0 0', fontSize: 'clamp(2.6rem, 6vw, 5rem)', lineHeight: 0.98 }}>{report.title}</h1>
        <p style={{ margin: '18px 0 0', color: 'var(--text-soft)', fontSize: '1.08rem', lineHeight: 1.8, maxWidth: '920px' }}>
          {report.subtitle}
        </p>
      </section>

      <section className="rise-in" style={{ marginTop: '22px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '18px' }}>
          <div className="f-panel f-card" style={{ padding: '22px' }}>
            <div className="f-kicker">Thesis</div>
            <div style={{ marginTop: '10px', color: 'var(--text-soft)', lineHeight: 1.8 }}>{report.thesis}</div>
          </div>
          <div className="f-panel f-card" style={{ padding: '22px' }}>
            <div className="f-kicker">Loadout</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
              {tools.map((tool) => (
                <Link key={tool.slug} href={`/tools/${tool.slug}/`} className="f-chip" style={{ textDecoration: 'none' }}>
                  {tool.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rise-in" style={{ marginTop: '22px' }}>
        <div className="f-panel f-card" style={{ padding: '22px' }}>
          <div className="f-kicker">Verdict</div>
          <div style={{ display: 'grid', gap: '10px', marginTop: '12px' }}>
            {report.verdict.map((line) => (
              <div key={line} className="f-card" style={{ padding: '14px', background: 'rgba(255,255,255,0.03)', color: 'var(--text-soft)', lineHeight: 1.7 }}>
                {line}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rise-in" style={{ marginTop: '22px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
          <div className="f-panel f-card" style={{ padding: '22px' }}>
            <div className="f-kicker">Risks</div>
            <div style={{ display: 'grid', gap: '10px', marginTop: '12px' }}>
              {report.risks.map((risk) => (
                <div key={risk} className="f-card" style={{ padding: '14px', background: 'rgba(255,255,255,0.03)', color: 'var(--text-soft)', lineHeight: 1.7 }}>
                  {risk}
                </div>
              ))}
            </div>
          </div>
          <div className="f-panel f-card" style={{ padding: '22px' }}>
            <div className="f-kicker">Next moves</div>
            <div style={{ display: 'grid', gap: '10px', marginTop: '12px' }}>
              {report.nextMoves.map((move) => (
                <div key={move} className="f-card" style={{ padding: '14px', background: 'rgba(255,255,255,0.03)', color: 'var(--text-soft)', lineHeight: 1.7 }}>
                  {move}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </FuturisticShell>
  )
}
