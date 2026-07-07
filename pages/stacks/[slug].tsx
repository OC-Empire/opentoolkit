import Link from 'next/link'
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
        <div style={{ marginBottom: '18px' }}>
          <Link href="/" style={{ color: '#9a3412', textDecoration: 'none', fontWeight: 800 }}>
            ← Back to OpenToolkit
          </Link>
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
              display: 'inline-flex',
              padding: '8px 12px',
              borderRadius: '999px',
              background: '#111827',
              color: '#fff7ed',
              fontWeight: 800,
              fontSize: '0.82rem',
              marginBottom: '16px',
            }}
          >
            Stack recipe
          </div>
          <h1 style={{ margin: '0 0 12px', fontSize: 'clamp(2.5rem, 6vw, 4.8rem)', lineHeight: 0.96 }}>
            {recipe.name}
          </h1>
          <p style={{ margin: 0, fontSize: '1.08rem', color: '#4b5563', lineHeight: 1.75 }}>{recipe.promise}</p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '14px',
              marginTop: '22px',
            }}
          >
            <div
              style={{
                padding: '18px',
                borderRadius: '22px',
                background: 'rgba(255,255,255,0.72)',
                border: '1px solid rgba(120, 53, 15, 0.12)',
              }}
            >
              <div style={{ fontWeight: 800, color: '#111827' }}>Outcome</div>
              <div style={{ marginTop: '8px', color: '#6b7280', lineHeight: 1.65 }}>{recipe.outcome}</div>
            </div>
            <div
              style={{
                padding: '18px',
                borderRadius: '22px',
                background: 'rgba(255,255,255,0.72)',
                border: '1px solid rgba(120, 53, 15, 0.12)',
              }}
            >
              <div style={{ fontWeight: 800, color: '#111827' }}>Built For</div>
              <div style={{ marginTop: '8px', color: '#6b7280', lineHeight: 1.65 }}>{recipe.audience}</div>
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
            style={{
              padding: '22px',
              borderRadius: '24px',
              background: 'rgba(255, 252, 245, 0.94)',
              border: '1px solid rgba(120, 53, 15, 0.12)',
              boxShadow: '0 16px 44px rgba(84, 54, 9, 0.08)',
            }}
          >
            <h2 style={{ margin: '0 0 14px', fontSize: '1.35rem', color: '#111827' }}>Setup Logic</h2>
            <ol style={{ margin: 0, paddingLeft: '18px', color: '#4b5563', lineHeight: 1.8 }}>
              {recipe.steps.map((step) => (
                <li key={step} style={{ marginBottom: '8px' }}>
                  {step}
                </li>
              ))}
            </ol>
          </section>

          <section
            style={{
              padding: '22px',
              borderRadius: '24px',
              background: 'rgba(255, 252, 245, 0.94)',
              border: '1px solid rgba(120, 53, 15, 0.12)',
              boxShadow: '0 16px 44px rgba(84, 54, 9, 0.08)',
            }}
          >
            <h2 style={{ margin: '0 0 14px', fontSize: '1.35rem', color: '#111827' }}>Tools In This Stack</h2>
            <div style={{ display: 'grid', gap: '12px' }}>
              {tools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}/`}
                  style={{
                    padding: '16px',
                    borderRadius: '18px',
                    background: '#fffaf0',
                    border: '1px solid rgba(120, 53, 15, 0.08)',
                    textDecoration: 'none',
                    color: '#111827',
                  }}
                >
                  <div style={{ fontWeight: 800 }}>{tool.name}</div>
                  <div style={{ marginTop: '6px', color: '#6b7280', lineHeight: 1.6 }}>{tool.description}</div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
