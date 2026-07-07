import Link from 'next/link'
import FuturisticShell from '../../components/FuturisticShell'

export default function MethodologyPage() {
  return (
    <FuturisticShell title="Methodology" eyebrow="How OpenToolkit judges">
      <section className="f-hero f-card rise-in" style={{ padding: '28px' }}>
        <p style={{ margin: 0, color: 'var(--text-soft)', fontSize: '1.08rem', lineHeight: 1.8, maxWidth: '860px' }}>
          OpenToolkit should never feel like a random vibe-catalog. This page explains the judgment grammar behind
          the platform: why certain tools rise, how stacks are composed, and what trust actually means here.
        </p>
      </section>

      <div style={{ display: 'grid', gap: '18px', marginTop: '22px' }}>
        {[
          ['Scoring logic', 'Scores are not popularity alone. They blend practical trust, product fit, longevity, platform range, and whether the tool strengthens a sovereign stack.'],
          ['Editorial bias', 'OpenToolkit is intentionally opinionated toward ownership, privacy, portability, and durable workflows. It is not a neutral app store.'],
          ['Migration lens', 'Replacement routes prioritize realistic exits. A calmer path that sticks is often stronger than an ideologically pure path that collapses.'],
          ['Stack fit', 'A tool can be excellent in isolation and still be weak in stack logic. OpenToolkit values tools that combine well with others in coherent operating layers.'],
          ['Hosted vs self-host', 'The platform does not worship self-hosting blindly. Hosted privacy calm is treated as a valid lane when it lowers surveillance without creating ops fatigue.'],
          ['Freshness layer', 'Radar and the weekly intelligence ledger exist so the product can respond to market movement instead of pretending the software landscape is static.'],
        ].map(([title, body]) => (
          <section key={title} className="f-panel f-card rise-in" style={{ padding: '22px' }}>
            <div className="f-kicker">{title}</div>
            <div style={{ marginTop: '10px', color: 'var(--text-soft)', lineHeight: 1.8 }}>{body}</div>
          </section>
        ))}
      </div>

      <section className="f-panel f-card rise-in" style={{ padding: '22px', marginTop: '22px' }}>
        <div className="f-kicker">Judgment rubric</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginTop: '12px' }}>
          {[
            ['Trust', 'Does this tool reduce dependency or quietly deepen it?'],
            ['Continuity', 'Can a person keep their work, archive, and habits across years?'],
            ['Fit', 'Does it strengthen a stack or just win in isolation?'],
            ['Retention', 'Will real people still use it after the first migration burst?'],
          ].map(([title, body]) => (
            <div key={title} className="f-card" style={{ padding: '16px', background: 'rgba(255,255,255,0.03)' }}>
              <div style={{ fontWeight: 800 }}>{title}</div>
              <div style={{ marginTop: '8px', color: 'var(--text-soft)', lineHeight: 1.7 }}>{body}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="f-panel f-card rise-in" style={{ padding: '22px', marginTop: '22px' }}>
        <div className="f-kicker">Where that logic goes</div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '12px' }}>
          <Link href="/reports/" className="f-button">
            Read verdict dossiers
          </Link>
          <Link href="/replace/" className="f-button f-button-ghost">
            Open replacement engine
          </Link>
          <Link href="/radar/" className="f-button f-button-ghost">
            Watch the signal layer
          </Link>
        </div>
      </section>
    </FuturisticShell>
  )
}
