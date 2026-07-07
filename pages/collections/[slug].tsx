import Link from 'next/link'
import FuturisticShell from '../../components/FuturisticShell'
import { collections, getCollectionBySlug, getToolsByNames, getWhyItWins } from '../../lib/opentoolkit'

type CollectionPageProps = {
  slug: string
}

export function getStaticPaths() {
  return {
    paths: collections.map((collection) => ({ params: { slug: collection.slug } })),
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

export default function CollectionPage({ slug }: CollectionPageProps) {
  const collection = getCollectionBySlug(slug)

  if (!collection) return null

  const tools = getToolsByNames(collection.toolNames)

  return (
    <FuturisticShell title={collection.title} eyebrow="Collection dossier" backHref="/collections/" backLabel="← Back to collections">
      <section className="f-hero f-card rise-in" style={{ padding: '28px' }}>
        <p style={{ margin: 0, color: 'var(--text-soft)', fontSize: '1.08rem', lineHeight: 1.8 }}>{collection.description}</p>
        <div style={{ marginTop: '14px', color: 'var(--ice-blue)', fontWeight: 700, lineHeight: 1.7 }}>{collection.angle}</div>
        <div style={{ marginTop: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {collection.tags.map((tag) => (
            <span key={tag} className="f-chip f-chip-red">
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section className="rise-in" style={{ marginTop: '22px', animationDelay: '0.08s' }}>
        <div className="f-panel f-card" style={{ padding: '22px' }}>
          <div className="f-kicker">Editorial thesis</div>
          <p style={{ margin: '12px 0 0', color: 'var(--text-soft)', lineHeight: 1.8, maxWidth: '880px' }}>
            {collection.thesis}
          </p>
        </div>
      </section>

      <section className="rise-in" style={{ marginTop: '22px', animationDelay: '0.12s' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}/`}
              className="f-panel f-card"
              style={{ padding: '18px', textDecoration: 'none', color: 'var(--text-main)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                <div style={{ fontWeight: 800 }}>{tool.name}</div>
                <div className="f-chip">{tool.score}</div>
              </div>
              <div style={{ marginTop: '8px', color: 'var(--ice-blue)', fontWeight: 700 }}>{getWhyItWins(tool)}</div>
              <p style={{ margin: '10px 0 0', color: 'var(--text-soft)', lineHeight: 1.6 }}>{tool.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </FuturisticShell>
  )
}
