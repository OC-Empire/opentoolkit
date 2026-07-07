import Link from 'next/link'
import FuturisticShell from '../../components/FuturisticShell'
import ShortlistButton from '../../components/ShortlistButton'
import { compareGuides, formatStars, getToolsBySlugs, getWhyItWins, labelPlatform } from '../../lib/opentoolkit'

export default function ComparePage() {
  return (
    <FuturisticShell title="Compare" eyebrow="Decision engine">
      <section className="f-hero f-card rise-in" style={{ padding: '28px' }}>
        <p style={{ margin: 0, color: 'var(--text-soft)', fontSize: '1.08rem', lineHeight: 1.8, maxWidth: '840px' }}>
          Great product buzz comes from helping people choose cleanly. This surface turns OpenToolkit into a place
          where tradeoffs are legible, opinionated, and shareable.
        </p>
      </section>

      <div style={{ display: 'grid', gap: '18px', marginTop: '22px' }}>
        {compareGuides.map((guide, index) => {
          const tools = getToolsBySlugs(guide.toolSlugs)

          return (
            <section
              key={guide.slug}
              id={guide.slug}
              className="f-panel f-card rise-in"
              style={{ padding: '22px', animationDelay: `${0.08 + index * 0.04}s` }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ maxWidth: '720px' }}>
                  <div className="f-chip f-chip-red">{guide.title}</div>
                  <h2 style={{ margin: '14px 0 10px', fontSize: '2rem' }}>{guide.question}</h2>
                  <p style={{ margin: 0, color: 'var(--text-soft)', lineHeight: 1.8 }}>{guide.summary}</p>
                </div>
                <div className="f-card" style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', maxWidth: '320px' }}>
                  <div className="f-kicker">Verdict</div>
                  <div style={{ marginTop: '8px', fontWeight: 800, color: 'var(--ice-blue)' }}>{guide.winnerFor}</div>
                  <div style={{ marginTop: '10px', color: 'var(--text-soft)', lineHeight: 1.7 }}>{guide.tradeoff}</div>
                </div>
              </div>

              <div style={{ marginTop: '18px', color: 'var(--text-soft)', lineHeight: 1.7 }}>
                <strong style={{ color: 'var(--text-main)' }}>Decision lens:</strong> {guide.lens}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '18px' }}>
                {tools.map((tool) => (
                  <div key={tool.slug} className="f-card" style={{ padding: '18px', background: 'rgba(255,255,255,0.03)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'center' }}>
                      <div style={{ fontWeight: 800, fontSize: '1.06rem' }}>{tool.name}</div>
                      <div className="f-chip">{tool.score}/100</div>
                    </div>
                    <div style={{ marginTop: '8px', color: 'var(--ice-blue)', fontWeight: 700 }}>{getWhyItWins(tool)}</div>
                    <p style={{ margin: '12px 0', color: 'var(--text-soft)', lineHeight: 1.65 }}>{tool.description}</p>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {tool.platforms.slice(0, 4).map((platform) => (
                        <span key={platform} className="f-chip">
                          {labelPlatform(platform)}
                        </span>
                      ))}
                    </div>
                    <div style={{ marginTop: '12px', color: 'var(--text-dim)', fontSize: '0.92rem' }}>
                      {formatStars(tool.stars)} stars · {tool.license}
                    </div>
                    <div style={{ marginTop: '14px' }}>
                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        <Link href={`/tools/${tool.slug}/`} className="f-button f-button-ghost">
                          Open dossier
                        </Link>
                        <ShortlistButton slug={tool.slug} label="Save for later" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </FuturisticShell>
  )
}
