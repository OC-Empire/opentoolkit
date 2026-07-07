import type { ReactNode } from 'react'
import Link from 'next/link'
import FuturisticShell from '../../components/FuturisticShell'
import {
  allTools,
  formatStars,
  getAlternatives,
  getComplements,
  getRecipesForTool,
  getToolBySlug,
  getWhyItWins,
  labelPlatform,
} from '../../lib/opentoolkit'

type ToolPageProps = {
  slug: string
}

export function getStaticPaths() {
  return {
    paths: allTools.map((tool) => ({ params: { slug: tool.slug } })),
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

function SectionCard(props: { title: string; children: ReactNode }) {
  return (
    <section className="f-panel f-card"
      style={{
        padding: '22px',
      }}
    >
      <h2 style={{ margin: '0 0 14px', fontSize: '1.35rem', color: 'var(--text-main)' }}>{props.title}</h2>
      {props.children}
    </section>
  )
}

export default function ToolPage({ slug }: ToolPageProps) {
  const tool = getToolBySlug(slug)

  if (!tool) return null

  const alternatives = getAlternatives(tool)
  const complements = getComplements(tool)
  const recipes = getRecipesForTool(tool)

  return (
    <FuturisticShell
      title={tool.name}
      eyebrow={`${tool.category} dossier`}
      backHref="/"
      backLabel="← Back to OpenToolkit"
    >
        <div
          className="rise-in"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            marginBottom: '18px',
          }}
        >
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {recipes.map((recipe) => (
              <Link
                key={recipe.slug}
                href={`/stacks/${recipe.slug}/`}
                className="f-chip f-chip-blue"
                style={{ textDecoration: 'none' }}
              >
                In {recipe.name}
              </Link>
            ))}
          </div>
        </div>

        <section
          className="f-hero f-card rise-in"
          style={{
            padding: '28px',
            animationDelay: '0.06s',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'start',
              gap: '18px',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ maxWidth: '760px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  gap: '8px',
                  flexWrap: 'wrap',
                  marginBottom: '14px',
                }}
              >
                <span
                  style={{
                    textDecoration: 'none',
                  }}
                  className="f-chip f-chip-red"
                >
                  {tool.category}
                </span>
                {tool.verified && (
                  <span
                    className="f-chip f-chip-blue"
                  >
                    Verified
                  </span>
                )}
                <span
                  className="f-chip"
                >
                  {getWhyItWins(tool)}
                </span>
              </div>

              <p style={{ margin: 0, color: 'var(--text-soft)', fontSize: '1.08rem', lineHeight: 1.75 }}>
                {tool.description}
              </p>
            </div>

            <div
              className="f-panel f-card"
              style={{
                minWidth: '220px',
                padding: '18px',
                color: 'var(--text-main)',
              }}
            >
              <div style={{ fontSize: '2.4rem', fontWeight: 800 }}>{tool.score}</div>
              <div style={{ opacity: 0.76, marginBottom: '12px', color: 'var(--text-soft)' }}>OpenToolkit score</div>
              <div style={{ lineHeight: 1.8, color: 'var(--text-soft)' }}>
                <div>{formatStars(tool.stars)} stars</div>
                <div>{tool.license}</div>
                <div>{tool.sourceType}</div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '18px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {tool.platforms.map((platform) => (
              <span
                key={platform}
                className="f-chip"
                style={{
                  fontSize: '0.82rem',
                }}
              >
                {labelPlatform(platform)}
              </span>
            ))}
          </div>

          <div style={{ marginTop: '22px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a
              href={tool.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="f-button"
            >
              Open source
            </a>
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(`${tool.name} review`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="f-button f-button-ghost"
            >
              Research this tool
            </a>
          </div>
        </section>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '18px',
            marginTop: '22px',
          }}
        >
          <SectionCard title="Why It Matters">
            <p style={{ margin: 0, color: 'var(--text-soft)', lineHeight: 1.8 }}>
              {tool.name} earns a place here because it helps push a user away from default rented software and
              toward a more durable, inspectable stack. The point of OpenToolkit is not feature parity theater.
              It is stack quality, control, and long-term leverage.
            </p>
          </SectionCard>

          <SectionCard title="Best For">
            <div style={{ color: 'var(--text-soft)', lineHeight: 1.8 }}>
              <div>Users prioritizing: {tool.category.toLowerCase()}</div>
              <div>Platforms covered: {tool.platforms.map(labelPlatform).join(', ')}</div>
              <div>Recommendation class: {getWhyItWins(tool)}</div>
            </div>
          </SectionCard>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '18px',
            marginTop: '22px',
          }}
        >
          <SectionCard title="Alternatives">
            <div style={{ display: 'grid', gap: '10px' }}>
              {alternatives.map((alternative) => (
                <Link
                  key={alternative.slug}
                  href={`/tools/${alternative.slug}/`}
                  className="f-card"
                  style={{
                    padding: '14px',
                    background: 'rgba(255,255,255,0.03)',
                    textDecoration: 'none',
                    color: 'var(--text-main)',
                    display: 'block',
                  }}
                >
                  <div style={{ fontWeight: 800 }}>{alternative.name}</div>
                  <div style={{ marginTop: '6px', color: 'var(--text-soft)', lineHeight: 1.6 }}>{alternative.description}</div>
                </Link>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Complements">
            <div style={{ display: 'grid', gap: '10px' }}>
              {complements.map((complement) => (
                <Link
                  key={complement.slug}
                  href={`/tools/${complement.slug}/`}
                  className="f-card"
                  style={{
                    padding: '14px',
                    background: 'rgba(255,255,255,0.03)',
                    textDecoration: 'none',
                    color: 'var(--text-main)',
                    display: 'block',
                  }}
                >
                  <div style={{ fontWeight: 800 }}>{complement.name}</div>
                  <div style={{ marginTop: '6px', color: 'var(--text-soft)', lineHeight: 1.6 }}>{complement.description}</div>
                </Link>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Used In Stacks">
            <div style={{ display: 'grid', gap: '10px' }}>
              {recipes.length ? (
                recipes.map((recipe) => (
                  <Link
                    key={recipe.slug}
                    href={`/stacks/${recipe.slug}/`}
                    className="f-card"
                    style={{
                      padding: '14px',
                      background: 'rgba(255,255,255,0.03)',
                      textDecoration: 'none',
                      color: 'var(--text-main)',
                      display: 'block',
                    }}
                  >
                    <div style={{ fontWeight: 800 }}>{recipe.name}</div>
                    <div style={{ marginTop: '6px', color: 'var(--text-soft)', lineHeight: 1.6 }}>{recipe.promise}</div>
                  </Link>
                ))
              ) : (
                <div style={{ color: 'var(--text-soft)', lineHeight: 1.7 }}>
                  Not attached to a stack recipe yet. That is exactly the kind of editorial layer OpenToolkit
                  should keep adding.
                </div>
              )}
            </div>
          </SectionCard>
        </div>
    </FuturisticShell>
  )
}
