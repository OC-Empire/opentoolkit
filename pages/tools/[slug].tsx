import type { ReactNode } from 'react'
import Link from 'next/link'
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
    <section
      style={{
        padding: '22px',
        borderRadius: '24px',
        background: 'rgba(255, 252, 245, 0.94)',
        border: '1px solid rgba(120, 53, 15, 0.12)',
        boxShadow: '0 16px 44px rgba(84, 54, 9, 0.08)',
      }}
    >
      <h2 style={{ margin: '0 0 14px', fontSize: '1.35rem', color: '#111827' }}>{props.title}</h2>
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
    <div
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top left, rgba(255, 153, 0, 0.24), transparent 28%), radial-gradient(circle at top right, rgba(37, 99, 235, 0.2), transparent 24%), linear-gradient(180deg, #fbf7ef 0%, #f1ebdd 44%, #efe6d5 100%)',
        color: '#1f2937',
        fontFamily: '"Space Grotesk", "Segoe UI", "Helvetica Neue", sans-serif',
      }}
    >
      <div style={{ maxWidth: '1180px', margin: '0 auto', padding: '28px 18px 80px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            marginBottom: '18px',
          }}
        >
          <Link href="/" style={{ color: '#9a3412', textDecoration: 'none', fontWeight: 800 }}>
            ← Back to OpenToolkit
          </Link>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {recipes.map((recipe) => (
              <Link
                key={recipe.slug}
                href={`/stacks/${recipe.slug}/`}
                style={{
                  padding: '8px 12px',
                  borderRadius: '999px',
                  background: '#fff7ed',
                  color: '#9a3412',
                  textDecoration: 'none',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                }}
              >
                In {recipe.name}
              </Link>
            ))}
          </div>
        </div>

        <section
          style={{
            padding: '28px',
            borderRadius: '30px',
            background: 'rgba(255, 252, 245, 0.88)',
            border: '1px solid rgba(120, 53, 15, 0.12)',
            boxShadow: '0 22px 70px rgba(84, 54, 9, 0.12)',
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
                    padding: '7px 11px',
                    borderRadius: '999px',
                    background: '#111827',
                    color: '#fff7ed',
                    fontSize: '0.8rem',
                    fontWeight: 800,
                  }}
                >
                  {tool.category}
                </span>
                {tool.verified && (
                  <span
                    style={{
                      padding: '7px 11px',
                      borderRadius: '999px',
                      background: '#dcfce7',
                      color: '#166534',
                      fontSize: '0.8rem',
                      fontWeight: 800,
                    }}
                  >
                    Verified
                  </span>
                )}
                <span
                  style={{
                    padding: '7px 11px',
                    borderRadius: '999px',
                    background: '#ffedd5',
                    color: '#9a3412',
                    fontSize: '0.8rem',
                    fontWeight: 800,
                  }}
                >
                  {getWhyItWins(tool)}
                </span>
              </div>

              <h1 style={{ margin: '0 0 12px', fontSize: 'clamp(2.5rem, 6vw, 4.8rem)', lineHeight: 0.96 }}>
                {tool.name}
              </h1>
              <p style={{ margin: 0, color: '#4b5563', fontSize: '1.08rem', lineHeight: 1.75 }}>
                {tool.description}
              </p>
            </div>

            <div
              style={{
                minWidth: '220px',
                padding: '18px',
                borderRadius: '24px',
                background: '#111827',
                color: '#fff7ed',
              }}
            >
              <div style={{ fontSize: '2.4rem', fontWeight: 800 }}>{tool.score}</div>
              <div style={{ opacity: 0.76, marginBottom: '12px' }}>OpenToolkit score</div>
              <div style={{ lineHeight: 1.8 }}>
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
                style={{
                  padding: '8px 12px',
                  borderRadius: '999px',
                  background: '#fff7ed',
                  color: '#6b7280',
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
              style={{
                padding: '13px 18px',
                borderRadius: '16px',
                background: '#111827',
                color: '#fff7ed',
                textDecoration: 'none',
                fontWeight: 800,
              }}
            >
              Open source
            </a>
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(`${tool.name} review`)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '13px 18px',
                borderRadius: '16px',
                background: '#fff7ed',
                color: '#9a3412',
                textDecoration: 'none',
                fontWeight: 800,
              }}
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
            <p style={{ margin: 0, color: '#4b5563', lineHeight: 1.8 }}>
              {tool.name} earns a place here because it helps push a user away from default rented software and
              toward a more durable, inspectable stack. The point of OpenToolkit is not feature parity theater.
              It is stack quality, control, and long-term leverage.
            </p>
          </SectionCard>

          <SectionCard title="Best For">
            <div style={{ color: '#4b5563', lineHeight: 1.8 }}>
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
                  style={{
                    padding: '14px',
                    borderRadius: '18px',
                    background: '#fffaf0',
                    border: '1px solid rgba(120, 53, 15, 0.08)',
                    textDecoration: 'none',
                    color: '#111827',
                  }}
                >
                  <div style={{ fontWeight: 800 }}>{alternative.name}</div>
                  <div style={{ marginTop: '6px', color: '#6b7280', lineHeight: 1.6 }}>{alternative.description}</div>
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
                  style={{
                    padding: '14px',
                    borderRadius: '18px',
                    background: '#fffaf0',
                    border: '1px solid rgba(120, 53, 15, 0.08)',
                    textDecoration: 'none',
                    color: '#111827',
                  }}
                >
                  <div style={{ fontWeight: 800 }}>{complement.name}</div>
                  <div style={{ marginTop: '6px', color: '#6b7280', lineHeight: 1.6 }}>{complement.description}</div>
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
                    style={{
                      padding: '14px',
                      borderRadius: '18px',
                      background: '#fffaf0',
                      border: '1px solid rgba(120, 53, 15, 0.08)',
                      textDecoration: 'none',
                      color: '#111827',
                    }}
                  >
                    <div style={{ fontWeight: 800 }}>{recipe.name}</div>
                    <div style={{ marginTop: '6px', color: '#6b7280', lineHeight: 1.6 }}>{recipe.promise}</div>
                  </Link>
                ))
              ) : (
                <div style={{ color: '#6b7280', lineHeight: 1.7 }}>
                  Not attached to a stack recipe yet. That is exactly the kind of editorial layer OpenToolkit
                  should keep adding.
                </div>
              )}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  )
}
