import Link from 'next/link'
import FuturisticShell from '../../components/FuturisticShell'
import { stackRecipes } from '../../lib/opentoolkit'

export default function StacksIndexPage() {
  return (
    <FuturisticShell title="Stacks" eyebrow="Outcome bundles">
      <section className="f-hero f-card rise-in" style={{ padding: '28px' }}>
        <p style={{ margin: 0, color: 'var(--text-soft)', fontSize: '1.08rem', lineHeight: 1.8, maxWidth: '860px' }}>
          Stacks are where OpenToolkit becomes practical. Instead of picking tools in isolation, you start with a goal,
          a posture, and a system that makes sense as a whole.
        </p>
      </section>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginTop: '22px' }}>
        {stackRecipes.map((stack, index) => (
          <Link
            key={stack.slug}
            href={`/stacks/${stack.slug}/`}
            className="f-panel f-card rise-in"
            style={{
              padding: '20px',
              textDecoration: 'none',
              color: 'var(--text-main)',
              animationDelay: `${0.08 + index * 0.04}s`,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'center' }}>
              <div className="f-chip f-chip-red">{stack.difficulty}</div>
              <div className="f-chip">{stack.toolNames.length} tools</div>
            </div>
            <h2 style={{ margin: '14px 0 10px', fontSize: '1.4rem' }}>{stack.name}</h2>
            <p style={{ margin: 0, color: 'var(--text-soft)', lineHeight: 1.65 }}>{stack.promise}</p>
            <div style={{ marginTop: '12px', color: 'var(--ice-blue)', fontWeight: 700, lineHeight: 1.6 }}>{stack.outcome}</div>
            <div style={{ marginTop: '14px', color: 'var(--text-dim)', fontSize: '0.92rem' }}>{stack.audience}</div>
          </Link>
        ))}
      </div>
    </FuturisticShell>
  )
}
