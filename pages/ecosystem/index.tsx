import Link from 'next/link'
import FuturisticShell from '../../components/FuturisticShell'

export default function EcosystemPage() {
  return (
    <FuturisticShell title="Ecosystem" eyebrow="How this becomes a thing">
      <section className="f-hero f-card rise-in" style={{ padding: '28px' }}>
        <p style={{ margin: 0, color: 'var(--text-soft)', fontSize: '1.08rem', lineHeight: 1.8, maxWidth: '860px' }}>
          A real platform needs more than pages. It needs contribution paths, editorial rituals, and recurring reasons
          for people to return. This is the OpenToolkit ecosystem layer.
        </p>
      </section>

      <section className="rise-in" style={{ marginTop: '22px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '14px' }}>
          {[
            ['Submission loop', 'New tool proposals, fresh candidates, and under-the-radar finds should feed a visible review process.'],
            ['Editorial drops', 'Collections, rankings, and migration packs should ship as periodic drops people can share.'],
            ['Signal reviews', 'Radar should graduate from observation into recurring review and reprioritization.'],
            ['Stack stories', 'Users should eventually be able to publish their own stack verdicts and migration outcomes.'],
          ].map(([title, body]) => (
            <div key={title} className="f-panel f-card" style={{ padding: '18px' }}>
              <div className="f-kicker">{title}</div>
              <div style={{ marginTop: '10px', color: 'var(--text-soft)', lineHeight: 1.7 }}>{body}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="f-panel f-card rise-in" style={{ padding: '22px', marginTop: '22px' }}>
        <div className="f-kicker">Current live loops</div>
        <div style={{ display: 'grid', gap: '12px', marginTop: '12px' }}>
          <Link href="/collections/" className="f-card" style={{ padding: '14px', background: 'rgba(255,255,255,0.03)', textDecoration: 'none', color: 'var(--text-main)' }}>
            Editorial collections
          </Link>
          <Link href="/rankings/" className="f-card" style={{ padding: '14px', background: 'rgba(255,255,255,0.03)', textDecoration: 'none', color: 'var(--text-main)' }}>
            Ranking ladders
          </Link>
          <Link href="/radar/" className="f-card" style={{ padding: '14px', background: 'rgba(255,255,255,0.03)', textDecoration: 'none', color: 'var(--text-main)' }}>
            Weekly intelligence radar
          </Link>
          <Link href="/shortlist/" className="f-card" style={{ padding: '14px', background: 'rgba(255,255,255,0.03)', textDecoration: 'none', color: 'var(--text-main)' }}>
            Decision memory via shortlist boards
          </Link>
        </div>
      </section>

      <section className="f-panel f-card rise-in" style={{ padding: '22px', marginTop: '22px' }}>
        <div className="f-kicker">What turns this into a real movement</div>
        <div style={{ display: 'grid', gap: '10px', marginTop: '12px' }}>
          {[
            'Weekly radar drops that feel like software intelligence briefings.',
            'More public reports that crystallize audience-specific stack choices.',
            'User-publishable stack stories once private shortlist boards become mature enough.',
          ].map((line) => (
            <div key={line} className="f-card" style={{ padding: '14px', background: 'rgba(255,255,255,0.03)', color: 'var(--text-soft)', lineHeight: 1.7 }}>
              {line}
            </div>
          ))}
        </div>
      </section>
    </FuturisticShell>
  )
}
