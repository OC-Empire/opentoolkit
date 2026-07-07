import { useMemo, useState } from 'react'
import Link from 'next/link'
import FuturisticShell from '../../components/FuturisticShell'
import {
  getRelationshipDensityScore,
  getToolBySlug,
  getToolRelationships,
  relationshipAnchors,
} from '../../lib/opentoolkit'

export default function GraphPage() {
  const [slug, setSlug] = useState(relationshipAnchors[0] || '')

  const tool = getToolBySlug(slug)
  const relationships = useMemo(() => (tool ? getToolRelationships(tool) : []), [tool])
  const groupedRelationships = useMemo(() => {
    const map = new Map<string, typeof relationships>()
    relationships.forEach((relationship) => {
      map.set(relationship.relation, [...(map.get(relationship.relation) || []), relationship])
    })
    return Array.from(map.entries())
  }, [relationships])
  const topologyStats = useMemo(
    () =>
      groupedRelationships.map(([relation, items]) => ({
        relation,
        count: items.length,
      })),
    [groupedRelationships]
  )
  const density = tool ? getRelationshipDensityScore(tool) : null

  return (
    <FuturisticShell title="Graph" eyebrow="Relationship map">
      <section className="f-hero f-card rise-in" style={{ padding: '28px' }}>
        <p style={{ margin: 0, color: 'var(--text-soft)', fontSize: '1.08rem', lineHeight: 1.8, maxWidth: '860px' }}>
          This is where OpenToolkit starts acting like a graph instead of a glossy shelf. Pick an anchor tool and see
          the alternatives, complements, migration allies, and ownership signals around it.
        </p>
      </section>

      <section className="rise-in" style={{ marginTop: '22px' }}>
        <div className="f-panel f-card" style={{ padding: '22px' }}>
          <div className="f-kicker">Choose an anchor</div>
          <select value={slug} onChange={(event) => setSlug(event.target.value)} className="f-select" style={{ marginTop: '12px', maxWidth: '420px' }}>
            {relationshipAnchors.map((anchor) => {
              const item = getToolBySlug(anchor)
              return (
                <option key={anchor} value={anchor}>
                  {item?.name || anchor}
                </option>
              )
            })}
          </select>
        </div>
      </section>

      {tool && (
        <>
          <section className="rise-in" style={{ marginTop: '22px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '0.95fr 1.05fr', gap: '18px' }}>
              <div className="f-panel f-card" style={{ padding: '22px' }}>
                <div className="f-kicker">Anchor dossier</div>
                <h2 style={{ margin: '10px 0 0', fontSize: '2rem' }}>{tool.name}</h2>
                <p style={{ margin: '12px 0 0', color: 'var(--text-soft)', lineHeight: 1.75 }}>{tool.description}</p>
                <div style={{ marginTop: '16px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <span className="f-chip f-chip-red">{tool.category}</span>
                  <span className="f-chip">{tool.score}/100</span>
                  <Link href={`/tools/${tool.slug}/`} className="f-button f-button-ghost">
                    Open full dossier
                  </Link>
                </div>
              </div>

              <div className="f-panel f-card" style={{ padding: '22px' }}>
                <div className="f-kicker">Relationship legend</div>
                <div style={{ display: 'grid', gap: '10px', marginTop: '12px' }}>
                  {[
                    ['Alternative', 'Same-lane option with different tradeoffs.'],
                    ['Complement', 'Works beside the anchor and strengthens the stack.'],
                    ['Stack anchor', 'Appears in the same deliberate stack recipe.'],
                    ['Migration ally', 'Shows up in replacement flows together.'],
                    ['Hosted calm', 'Fits a lower-maintenance privacy posture.'],
                    ['Ownership push', 'Strengthens control and self-host logic.'],
                  ].map(([title, body]) => (
                    <div key={title} className="f-card" style={{ padding: '12px 14px', background: 'rgba(255,255,255,0.03)' }}>
                      <div style={{ fontWeight: 800 }}>{title}</div>
                      <div style={{ marginTop: '5px', color: 'var(--text-soft)', lineHeight: 1.6 }}>{body}</div>
                    </div>
                  ))}
                </div>
                {density && (
                  <>
                    <div className="f-kicker" style={{ marginTop: '16px' }}>Edge density</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '10px', marginTop: '12px' }}>
                      <div className="f-card" style={{ padding: '12px 14px', background: 'rgba(255,255,255,0.03)' }}>
                        <div style={{ fontWeight: 800 }}>{density.connections}</div>
                        <div style={{ marginTop: '4px', color: 'var(--text-soft)' }}>Connections</div>
                      </div>
                      <div className="f-card" style={{ padding: '12px 14px', background: 'rgba(255,255,255,0.03)' }}>
                        <div style={{ fontWeight: 800 }}>{density.lanes}</div>
                        <div style={{ marginTop: '4px', color: 'var(--text-soft)' }}>Lanes</div>
                      </div>
                      <div className="f-card" style={{ padding: '12px 14px', background: 'rgba(255,255,255,0.03)' }}>
                        <div style={{ fontWeight: 800 }}>{density.density}</div>
                        <div style={{ marginTop: '4px', color: 'var(--text-soft)' }}>Density score</div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </section>

          <section className="rise-in" style={{ marginTop: '22px' }}>
            <div className="f-panel f-card" style={{ padding: '22px', marginBottom: '18px' }}>
              <div className="f-kicker">Constellation preview</div>
              <div style={{ position: 'relative', marginTop: '14px', minHeight: '420px', overflow: 'hidden' }}>
                <svg
                  viewBox="0 0 900 420"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.8 }}
                >
                  {groupedRelationships.map(([relation], index) => {
                    const angle = (index / Math.max(groupedRelationships.length, 1)) * Math.PI * 2
                    const x = 450 + Math.cos(angle) * 260
                    const y = 210 + Math.sin(angle) * 145

                    return (
                      <g key={relation}>
                        <line x1="450" y1="210" x2={x} y2={y} stroke="rgba(83,199,255,0.38)" strokeWidth="2" />
                        <circle cx={x} cy={y} r="7" fill="rgba(255,72,105,0.92)" />
                      </g>
                    )
                  })}
                  <circle cx="450" cy="210" r="16" fill="rgba(83,199,255,0.95)" />
                </svg>

                <div
                  className="f-card"
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    minWidth: '220px',
                    padding: '24px',
                    textAlign: 'center',
                    background: 'linear-gradient(160deg, rgba(255, 49, 95, 0.18), rgba(53, 194, 255, 0.16), rgba(255,255,255,0.03))',
                  }}
                >
                  <div className="f-kicker">Anchor node</div>
                  <div style={{ fontSize: '1.7rem', fontWeight: 800, marginTop: '10px' }}>{tool.name}</div>
                  <div style={{ marginTop: '8px', color: 'var(--text-soft)' }}>{relationships.length} live connections</div>
                </div>

                {groupedRelationships.map(([relation], index) => {
                  const angle = (index / Math.max(groupedRelationships.length, 1)) * Math.PI * 2
                  const x = 50 + Math.cos(angle) * 29
                  const y = 50 + Math.sin(angle) * 34

                  return (
                    <div
                      key={relation}
                      className="f-card"
                      style={{
                        position: 'absolute',
                        left: `${x}%`,
                        top: `${y}%`,
                        padding: '12px 14px',
                        background: 'rgba(255,255,255,0.03)',
                        transform: 'translate(-50%, -50%)',
                        minWidth: '150px',
                        textAlign: 'center',
                      }}
                    >
                      <div style={{ fontWeight: 800 }}>{relation}</div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="f-panel f-card" style={{ padding: '22px', marginBottom: '18px' }}>
              <div className="f-kicker">Topology stats</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', marginTop: '12px' }}>
                {topologyStats.map((item) => (
                  <div key={item.relation} className="f-card" style={{ padding: '14px', background: 'rgba(255,255,255,0.03)' }}>
                    <div style={{ fontWeight: 800 }}>{item.relation}</div>
                    <div style={{ marginTop: '6px', fontSize: '1.5rem', fontWeight: 800 }}>{item.count}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gap: '18px' }}>
              {groupedRelationships.map(([relation, items]) => (
                <div key={relation} className="f-panel f-card" style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'center' }}>
                    <div className="f-kicker">{relation} lane</div>
                    <div className="f-chip">{items.length}</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '14px', marginTop: '14px' }}>
                    {items.map((relationship) => {
                      const related = getToolBySlug(relationship.toolSlug)
                      if (!related) return null

                      return (
                        <Link
                          key={`${relationship.relation}-${related.slug}`}
                          href={`/tools/${related.slug}/`}
                          className="f-card"
                          style={{ padding: '18px', textDecoration: 'none', color: 'var(--text-main)', background: 'rgba(255,255,255,0.03)' }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'center' }}>
                            <div style={{ fontWeight: 800 }}>{related.name}</div>
                            <div className="f-chip f-chip-blue">{relationship.relation}</div>
                          </div>
                          <div style={{ marginTop: '8px', color: 'var(--text-soft)', lineHeight: 1.65 }}>{relationship.reason}</div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </FuturisticShell>
  )
}
