import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import FuturisticShell from '../../components/FuturisticShell'
import { allTools, compareGuides, getRecipesForTool, getWhyItWins } from '../../lib/opentoolkit'

const STORAGE_KEY = 'opentoolkit-shortlist'
const NOTES_KEY = 'opentoolkit-shortlist-notes'

function readShortlist() {
  if (typeof window === 'undefined') return []

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === 'string') : []
  } catch {
    return []
  }
}

function writeShortlist(items: string[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

function readNotes() {
  if (typeof window === 'undefined') return ''
  return window.localStorage.getItem(NOTES_KEY) || ''
}

function writeNotes(value: string) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(NOTES_KEY, value)
}

export default function ShortlistPage() {
  const [slugs, setSlugs] = useState<string[]>([])
  const [notes, setNotes] = useState('')

  useEffect(() => {
    setSlugs(readShortlist())
    setNotes(readNotes())
  }, [])

  const tools = useMemo(() => {
    const bySlug = new Map(allTools.map((tool) => [tool.slug, tool]))
    return slugs.map((slug) => bySlug.get(slug)).filter(Boolean)
  }, [slugs])

  const suggestedCompares = compareGuides.filter((guide) => guide.toolSlugs.some((slug) => slugs.includes(slug)))
  const categoryMix = Array.from(
    tools.reduce((map, tool) => map.set(tool.category, (map.get(tool.category) || 0) + 1), new Map<string, number>())
  )

  function remove(slug: string) {
    const next = slugs.filter((item) => item !== slug)
    writeShortlist(next)
    setSlugs(next)
  }

  function clearAll() {
    writeShortlist([])
    setSlugs([])
  }

  function updateNotes(value: string) {
    setNotes(value)
    writeNotes(value)
  }

  return (
    <FuturisticShell title="Shortlist" eyebrow="Command center">
      <section className="f-hero f-card rise-in" style={{ padding: '28px' }}>
        <p style={{ margin: 0, color: 'var(--text-soft)', fontSize: '1.08rem', lineHeight: 1.8, maxWidth: '860px' }}>
          This is where OpenToolkit starts behaving like a real decision tool. Save candidates, see related stacks,
          and move from browsing into deliberate selection.
        </p>
      </section>

      <div className="rise-in" style={{ marginTop: '22px', display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
        <div className="f-chip f-chip-blue">{tools.length} saved tools</div>
        {tools.length > 0 && (
          <button type="button" onClick={clearAll} className="f-button f-button-ghost">
            Clear shortlist
          </button>
        )}
      </div>

      {tools.length === 0 ? (
        <section className="f-panel f-card rise-in" style={{ padding: '24px', marginTop: '18px' }}>
          <h2 style={{ margin: 0, fontSize: '1.5rem' }}>Nothing saved yet</h2>
          <p style={{ margin: '12px 0 0', color: 'var(--text-soft)', lineHeight: 1.7 }}>
            Save tools from dossiers and compare cards, then come back here to shape them into a real stack.
          </p>
        </section>
      ) : (
        <>
          <section className="rise-in" style={{ marginTop: '18px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
              {tools.map((tool) => (
                <div key={tool.slug} className="f-panel f-card" style={{ padding: '18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'center' }}>
                    <div style={{ fontWeight: 800 }}>{tool.name}</div>
                    <div className="f-chip">{tool.score}</div>
                  </div>
                  <div style={{ marginTop: '8px', color: 'var(--ice-blue)', fontWeight: 700 }}>{getWhyItWins(tool)}</div>
                  <p style={{ margin: '10px 0', color: 'var(--text-soft)', lineHeight: 1.6 }}>{tool.description}</p>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <Link href={`/tools/${tool.slug}/`} className="f-button f-button-ghost">
                      Open dossier
                    </Link>
                    <button type="button" onClick={() => remove(tool.slug)} className="f-button f-button-ghost">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rise-in" style={{ marginTop: '22px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '18px' }}>
              <div className="f-panel f-card" style={{ padding: '22px' }}>
                <div className="f-kicker">Compare next</div>
                <div style={{ display: 'grid', gap: '12px', marginTop: '12px' }}>
                  {suggestedCompares.length > 0 ? (
                    suggestedCompares.map((guide) => (
                      <Link
                        key={guide.slug}
                        href={`/compare/#${guide.slug}`}
                        style={{ textDecoration: 'none', color: 'var(--text-main)' }}
                      >
                        <div className="f-card" style={{ padding: '14px', background: 'rgba(255,255,255,0.03)' }}>
                          <div style={{ fontWeight: 800 }}>{guide.title}</div>
                          <div style={{ marginTop: '6px', color: 'var(--text-soft)', lineHeight: 1.6 }}>{guide.question}</div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div style={{ color: 'var(--text-soft)', lineHeight: 1.7 }}>
                      Save a few more tools from the same decision area and compare prompts will appear here.
                    </div>
                  )}
                </div>
              </div>

              <div className="f-panel f-card" style={{ padding: '22px' }}>
                <div className="f-kicker">Stack fit</div>
                <div style={{ display: 'grid', gap: '10px', marginTop: '12px' }}>
                  {tools.flatMap((tool) => getRecipesForTool(tool)).slice(0, 4).map((recipe) => (
                    <Link
                      key={`${recipe.slug}`}
                      href={`/stacks/${recipe.slug}/`}
                      style={{ textDecoration: 'none', color: 'var(--text-main)' }}
                    >
                      <div className="f-card" style={{ padding: '14px', background: 'rgba(255,255,255,0.03)' }}>
                        <div style={{ fontWeight: 800 }}>{recipe.name}</div>
                        <div style={{ marginTop: '6px', color: 'var(--text-soft)', lineHeight: 1.6 }}>{recipe.promise}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="rise-in" style={{ marginTop: '22px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: '18px' }}>
              <div className="f-panel f-card" style={{ padding: '22px' }}>
                <div className="f-kicker">Signal mix</div>
                <div style={{ display: 'grid', gap: '10px', marginTop: '12px' }}>
                  {categoryMix.map(([category, count]) => (
                    <div key={category} className="f-card" style={{ padding: '12px 14px', background: 'rgba(255,255,255,0.03)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                        <span style={{ fontWeight: 800 }}>{category}</span>
                        <span className="f-chip">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="f-panel f-card" style={{ padding: '22px' }}>
                <div className="f-kicker">Working notes</div>
                <textarea
                  value={notes}
                  onChange={(event) => updateNotes(event.target.value)}
                  placeholder="Why are these tools here? Which ones are front-runners? What still feels uncertain?"
                  className="f-input"
                  style={{ minHeight: '220px', marginTop: '12px', resize: 'vertical' }}
                />
              </div>
            </div>
          </section>
        </>
      )}
    </FuturisticShell>
  )
}
