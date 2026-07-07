import Link from 'next/link'
import FuturisticShell from '../../components/FuturisticShell'
import { formatStars, getToolsBySlugs, getWhyItWins, rankingLanes } from '../../lib/opentoolkit'

export default function RankingsPage() {
  return (
    <FuturisticShell title="Rankings" eyebrow="Signal ladders">
      <section className="f-hero f-card rise-in" style={{ padding: '28px' }}>
        <p style={{ margin: 0, color: 'var(--text-soft)', fontSize: '1.08rem', lineHeight: 1.8, maxWidth: '860px' }}>
          Rankings are where the brand earns attention. They should feel like a sharp editorial opinion backed by
          a coherent worldview, not a random leaderboard.
        </p>
      </section>

      <div style={{ display: 'grid', gap: '18px', marginTop: '22px' }}>
        {rankingLanes.map((lane, index) => {
          const tools = getToolsBySlugs(lane.toolSlugs)

          return (
            <section
              key={lane.slug}
              className="f-panel f-card rise-in"
              style={{ padding: '22px', animationDelay: `${0.08 + index * 0.04}s` }}
            >
              <div style={{ maxWidth: '760px' }}>
                <div className="f-chip f-chip-red">{lane.title}</div>
                <p style={{ margin: '14px 0 0', color: 'var(--text-soft)', lineHeight: 1.7 }}>{lane.description}</p>
                <div style={{ marginTop: '12px' }}>
                  <Link href={`/rankings/${lane.slug}/`} className="f-button f-button-ghost">
                    Open ranking dossier
                  </Link>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginTop: '18px' }}>
                {tools.map((tool, toolIndex) => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}/`}
                    className="f-card"
                    style={{
                      padding: '18px',
                      background: toolIndex === 0
                        ? 'linear-gradient(160deg, rgba(255, 49, 95, 0.18), rgba(53, 194, 255, 0.14), rgba(10, 16, 30, 0.92))'
                        : 'rgba(255,255,255,0.03)',
                      textDecoration: 'none',
                      color: 'var(--text-main)',
                      display: 'block',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'center' }}>
                      <div style={{ fontWeight: 800, fontSize: '1.06rem' }}>
                        #{toolIndex + 1} {tool.name}
                      </div>
                      <div className={toolIndex === 0 ? 'f-chip f-chip-red' : 'f-chip'}>{tool.score}</div>
                    </div>
                    <div style={{ marginTop: '8px', color: 'var(--ice-blue)', fontWeight: 700 }}>{getWhyItWins(tool)}</div>
                    <p style={{ margin: '10px 0', color: 'var(--text-soft)', lineHeight: 1.6 }}>{tool.description}</p>
                    <div style={{ color: 'var(--text-dim)', fontSize: '0.92rem' }}>{formatStars(tool.stars)} stars</div>
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
