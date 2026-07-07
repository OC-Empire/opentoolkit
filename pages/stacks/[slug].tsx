import Link from 'next/link'
import FuturisticShell from '../../components/FuturisticShell'
import { getRecipeBySlug, getToolsByNames, stackRecipes } from '../../lib/opentoolkit'

type StackPageProps = {
  slug: string
}

export function getStaticPaths() {
  return {
    paths: stackRecipes.map((recipe) => ({ params: { slug: recipe.slug } })),
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

export default function StackPage({ slug }: StackPageProps) {
  const recipe = getRecipeBySlug(slug)

  if (!recipe) return null

  const tools = getToolsByNames(recipe.toolNames)

  return (
    <FuturisticShell
      title={recipe.name}
      eyebrow="Stack recipe"
      backHref="/"
      backLabel="← Back to OpenToolkit"
    >
        <section
          className="f-hero f-card rise-in"
          style={{
            padding: '28px',
            animationDelay: '0.06s',
          }}
        >
          <div
            className="f-chip f-chip-red"
            style={{ marginBottom: '16px' }}
          >
            Stack recipe
          </div>
          <p style={{ margin: 0, fontSize: '1.08rem', color: 'var(--text-soft)', lineHeight: 1.75 }}>{recipe.promise}</p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '14px',
              marginTop: '22px',
            }}
          >
            <div
              className="f-panel f-card"
              style={{
                padding: '18px',
              }}
            >
              <div style={{ fontWeight: 800, color: 'var(--text-main)' }}>Outcome</div>
              <div style={{ marginTop: '8px', color: 'var(--text-soft)', lineHeight: 1.65 }}>{recipe.outcome}</div>
            </div>
            <div
              className="f-panel f-card"
              style={{
                padding: '18px',
              }}
            >
              <div style={{ fontWeight: 800, color: 'var(--text-main)' }}>Built For</div>
              <div style={{ marginTop: '8px', color: 'var(--text-soft)', lineHeight: 1.65 }}>{recipe.audience}</div>
            </div>
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
          <section
            className="f-panel f-card rise-in"
            style={{
              padding: '22px',
              animationDelay: '0.1s',
            }}
          >
            <h2 style={{ margin: '0 0 14px', fontSize: '1.35rem', color: 'var(--text-main)' }}>Setup Logic</h2>
            <ol style={{ margin: 0, paddingLeft: '18px', color: 'var(--text-soft)', lineHeight: 1.8 }}>
              {recipe.steps.map((step) => (
                <li key={step} style={{ marginBottom: '8px' }}>
                  {step}
                </li>
              ))}
            </ol>
          </section>

          <section
            className="f-panel f-card rise-in"
            style={{
              padding: '22px',
              animationDelay: '0.14s',
            }}
          >
            <h2 style={{ margin: '0 0 14px', fontSize: '1.35rem', color: 'var(--text-main)' }}>Tools In This Stack</h2>
            <div style={{ display: 'grid', gap: '12px' }}>
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
                  <div style={{ fontWeight: 800 }}>{tool.name}</div>
                  <div style={{ marginTop: '6px', color: 'var(--text-soft)', lineHeight: 1.6 }}>{tool.description}</div>
                </Link>
              ))}
            </div>
          </section>
        </div>
    </FuturisticShell>
  )
}
