import Link from 'next/link'
import FuturisticShell from '../../components/FuturisticShell'
import { formatStars, getRankingLaneBySlug, getToolsBySlugs, getWhyItWins, rankingLanes } from '../../lib/opentoolkit'

type RankingPageProps = {
  slug: string
}

export function getStaticPaths() {
  return {
    paths: rankingLanes.map((lane) => ({ params: { slug: lane.slug } })),
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

export default function RankingLanePage({ slug }: RankingPageProps) {
  const lane = getRankingLaneBySlug(slug)
  if (!lane) return null

  const tools = getToolsBySlugs(lane.toolSlugs)

  return (
    <FuturisticShell title={lane.title} eyebrow="Ranking dossier" backHref="/rankings/" backLabel="← Back to rankings">
      <section className="f-hero f-card rise-in" style={{ padding: '28px' }}>
        <div className="f-chip f-chip-red">Ranking dossier</div>
        <h1 style={{ margin: '16px 0 0', fontSize: 'clamp(2.4rem, 6vw, 4.8rem)', lineHeight: 0.98 }}>{lane.title}</h1>
        <p style={{ margin: '16px 0 0', color: 'var(--text-soft)', fontSize: '1.08rem', lineHeight: 1.8, maxWidth: '860px' }}>
          {lane.description}
        </p>
      </section>

      <section className="rise-in" style={{ marginTop: '22px' }}>
        <div className="f-panel f-card" style={{ padding: '22px' }}>
          <div className="f-kicker">Editorial ladder</div>
          <div style={{ display: 'grid', gap: '12px', marginTop: '14px' }}>
            {tools.map((tool, index) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}/`}
                className="f-card"
                style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', textDecoration: 'none', color: 'var(--text-main)' }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '90px 1.1fr 0.8fr 2fr', gap: '12px', alignItems: 'center' }}>
                  <div style={{ fontWeight: 800, color: 'var(--ice-blue)' }}>#{index + 1}</div>
                  <div style={{ fontWeight: 800 }}>{tool.name}</div>
                  <div className={index === 0 ? 'f-chip f-chip-red' : 'f-chip'}>{tool.score}</div>
                  <div style={{ color: 'var(--text-soft)', lineHeight: 1.6 }}>{getWhyItWins(tool)}</div>
                </div>
                <div style={{ marginTop: '10px', color: 'var(--text-dim)', fontSize: '0.92rem' }}>{formatStars(tool.stars)} stars · {tool.license}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </FuturisticShell>
  )
}
