import Link from 'next/link'
import FuturisticShell from '../../components/FuturisticShell'
import { manifestoPillars } from '../../lib/opentoolkit'

export default function AboutPage() {
  return (
    <FuturisticShell title="About" eyebrow="Manifesto">
      <section className="f-hero f-card rise-in" style={{ padding: '28px' }}>
        <div className="f-chip f-chip-red">OpenToolkit manifesto</div>
        <h1 style={{ margin: '16px 0 0', fontSize: 'clamp(2.6rem, 6vw, 5rem)', lineHeight: 0.98 }}>
          Software choice is not a shopping problem.
        </h1>
        <p style={{ margin: '18px 0 0', color: 'var(--text-soft)', fontSize: '1.08rem', lineHeight: 1.8, maxWidth: '900px' }}>
          It is a life-design problem. OpenToolkit exists to help people replace default dependence with intentional
          stacks, clearer tradeoffs, and software that they can actually live with for years.
        </p>
      </section>

      <div style={{ display: 'grid', gap: '18px', marginTop: '22px' }}>
        {[
          ['What it is', 'OpenToolkit is a software stack platform for discovery, comparison, migration, composition, and editorial judgment.'],
          ['What it is not', 'It is not a neutral app store, not a random top-tools list, and not a worship-service for self-hosting regardless of user reality.'],
          ['Core belief', 'People deserve better defaults, but better does not always mean harder. Calm, durable, and owned software paths matter.'],
          ['Aesthetic direction', 'The futuristic shell is not decoration alone. It is meant to make the platform feel like a command center for digital self-determination.'],
        ].map(([title, body]) => (
          <section key={title} className="f-panel f-card rise-in" style={{ padding: '22px' }}>
            <div className="f-kicker">{title}</div>
            <div style={{ marginTop: '10px', color: 'var(--text-soft)', lineHeight: 1.8 }}>{body}</div>
          </section>
        ))}
      </div>

      <section className="f-panel f-card rise-in" style={{ padding: '22px', marginTop: '22px' }}>
        <div className="f-kicker">Operating pillars</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '14px', marginTop: '12px' }}>
          {manifestoPillars.map((pillar) => (
            <div key={pillar.title} className="f-card" style={{ padding: '16px', background: 'rgba(255,255,255,0.03)' }}>
              <div style={{ fontWeight: 800 }}>{pillar.title}</div>
              <div style={{ marginTop: '8px', color: 'var(--text-soft)', lineHeight: 1.7 }}>{pillar.body}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="f-panel f-card rise-in" style={{ padding: '22px', marginTop: '22px' }}>
        <div className="f-kicker">Brutal honesty</div>
        <div style={{ display: 'grid', gap: '10px', marginTop: '12px' }}>
          {[
            'Most people do not need the most extreme sovereignty stack. They need one that survives ordinary weeks.',
            'Some beloved tools are polished traps. Great UX does not erase long-term dependency.',
            'A platform that cannot explain its tradeoffs clearly does not deserve trust.',
          ].map((line) => (
            <div key={line} className="f-card" style={{ padding: '14px', background: 'rgba(255,255,255,0.03)', color: 'var(--text-soft)', lineHeight: 1.75 }}>
              {line}
            </div>
          ))}
        </div>
      </section>

      <section className="f-panel f-card rise-in" style={{ padding: '22px', marginTop: '22px' }}>
        <div className="f-kicker">Next entry points</div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '12px' }}>
          <Link href="/reports/" className="f-button f-button-ghost">
            Read stack reports
          </Link>
          <Link href="/methodology/" className="f-button f-button-ghost">
            How we judge
          </Link>
          <Link href="/ecosystem/" className="f-button f-button-ghost">
            How this grows
          </Link>
          <Link href="/compose/" className="f-button">
            Compose a stack
          </Link>
        </div>
      </section>
    </FuturisticShell>
  )
}
