import Link from 'next/link'
import FuturisticShell from '../../components/FuturisticShell'
import { collections, getToolsByNames, getWhyItWins } from '../../lib/opentoolkit'

export default function CollectionsPage() {
  return (
    <FuturisticShell title="Collections" eyebrow="Editorial layer">
      <section className="f-hero f-card rise-in" style={{ padding: '28px' }}>
        <p style={{ margin: 0, color: 'var(--text-soft)', fontSize: '1.08rem', lineHeight: 1.8, maxWidth: '860px' }}>
          Collections are how OpenToolkit starts making noise. They turn the catalog into narratives people can skim,
          share, and argue with.
        </p>
      </section>

      <div style={{ display: 'grid', gap: '18px', marginTop: '22px' }}>
        {collections.map((collection, index) => {
          const tools = getToolsByNames(collection.toolNames)

          return (
            <section
              key={collection.slug}
              className="f-panel f-card rise-in"
              style={{ padding: '22px', animationDelay: `${0.08 + index * 0.04}s` }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ maxWidth: '760px' }}>
                  <div className="f-chip f-chip-red">{collection.title}</div>
                  <p style={{ margin: '14px 0 10px', color: 'var(--text-soft)', lineHeight: 1.75 }}>{collection.description}</p>
                  <div style={{ color: 'var(--ice-blue)', fontWeight: 700, lineHeight: 1.7 }}>{collection.angle}</div>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignContent: 'start' }}>
                  {collection.tags.map((tag) => (
                    <span key={tag} className="f-chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: '16px' }}>
                <Link href={`/collections/${collection.slug}/`} className="f-button f-button-ghost">
                  Open collection dossier
                </Link>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginTop: '18px' }}>
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
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                      <div style={{ fontWeight: 800 }}>{tool.name}</div>
                      <div className="f-chip">{tool.score}</div>
                    </div>
                    <div style={{ marginTop: '8px', color: 'var(--ice-blue)', fontWeight: 700 }}>{getWhyItWins(tool)}</div>
                    <p style={{ margin: '10px 0 0', color: 'var(--text-soft)', lineHeight: 1.55 }}>{tool.description}</p>
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
