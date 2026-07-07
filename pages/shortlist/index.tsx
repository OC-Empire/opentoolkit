import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import FuturisticShell from '../../components/FuturisticShell'
import {
  allTools,
  compareGuides,
  defaultScenarioSnapshots,
  getMissionProfileBySlug,
  getRecipesForTool,
  getWhyItWins,
  missionProfiles,
  scenarioPresets,
  ScenarioSnapshot,
  scoreToolForWeights,
  scoreToolForMission,
} from '../../lib/opentoolkit'

const STORAGE_KEY = 'opentoolkit-shortlist'
const NOTES_KEY = 'opentoolkit-shortlist-notes'
const SCENARIO_KEY = 'opentoolkit-shortlist-scenario'
const SNAPSHOTS_KEY = 'opentoolkit-shortlist-snapshots'

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

function readScenario() {
  if (typeof window === 'undefined') return scenarioPresets[0]?.slug || ''
  return window.localStorage.getItem(SCENARIO_KEY) || scenarioPresets[0]?.slug || ''
}

function writeScenario(value: string) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(SCENARIO_KEY, value)
}

function readSnapshots() {
  if (typeof window === 'undefined') return defaultScenarioSnapshots

  try {
    const raw = window.localStorage.getItem(SNAPSHOTS_KEY)
    const parsed = raw ? JSON.parse(raw) : defaultScenarioSnapshots
    return Array.isArray(parsed) ? parsed : defaultScenarioSnapshots
  } catch {
    return defaultScenarioSnapshots
  }
}

function writeSnapshots(value: ScenarioSnapshot[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(SNAPSHOTS_KEY, JSON.stringify(value))
}

export default function ShortlistPage() {
  const [slugs, setSlugs] = useState<string[]>([])
  const [notes, setNotes] = useState('')
  const [profileSlug, setProfileSlug] = useState(missionProfiles[0]?.slug || '')
  const [scenarioSlug, setScenarioSlug] = useState(scenarioPresets[0]?.slug || '')
  const [snapshots, setSnapshots] = useState<ScenarioSnapshot[]>(defaultScenarioSnapshots)

  useEffect(() => {
    setSlugs(readShortlist())
    setNotes(readNotes())
    setScenarioSlug(readScenario())
    setSnapshots(readSnapshots())
  }, [])

  const activeProfile = missionProfiles.find((item) => item.slug === profileSlug) || missionProfiles[0]
  const activeScenario = scenarioPresets.find((item) => item.slug === scenarioSlug) || scenarioPresets[0]

  const tools = useMemo(() => {
    const bySlug = new Map(allTools.map((tool) => [tool.slug, tool]))
    return slugs.map((slug) => bySlug.get(slug)).filter(Boolean)
  }, [slugs])

  const suggestedCompares = compareGuides.filter((guide) => guide.toolSlugs.some((slug) => slugs.includes(slug)))
  const categoryMix = Array.from(
    tools.reduce((map, tool) => map.set(tool.category, (map.get(tool.category) || 0) + 1), new Map<string, number>())
  )
  const rankedShortlist = [...tools]
    .map((tool) => ({
      ...tool,
      missionScore: scoreToolForMission(tool, activeProfile.priorities),
      scenarioScore: scoreToolForWeights(tool, activeScenario.weights),
    }))
    .sort((left, right) => right.scenarioScore - left.scenarioScore)

  const averageScore = tools.length > 0 ? Math.round(tools.reduce((sum, tool) => sum + tool.score, 0) / tools.length) : 0
  const verifiedCount = tools.filter((tool) => tool.verified).length
  const selfHostedCount = tools.filter((tool) => tool.platforms.includes('self-hosted')).length
  const verdictSummary = useMemo(() => {
    if (rankedShortlist.length === 0) return ''

    const top = rankedShortlist.slice(0, 3)
    const lines = [
      `OpenToolkit shortlist verdict`,
      `Scenario: ${activeScenario.name}`,
      `Mission profile: ${activeProfile.name}`,
      `Average score: ${averageScore}`,
      `Verified picks: ${verifiedCount}`,
      `Self-hosted tools: ${selfHostedCount}`,
      ``,
      `Top candidates:`,
      ...top.map(
        (tool, index) =>
          `${index + 1}. ${tool.name} | score ${tool.score} | mission ${tool.missionScore} | scenario ${tool.scenarioScore}`
      ),
      ``,
      `Notes: ${notes || 'No working notes yet.'}`,
    ]

    return lines.join('\n')
  }, [activeProfile.name, activeScenario.name, averageScore, notes, rankedShortlist, selfHostedCount, verifiedCount])
  const shareArtifact = useMemo(() => {
    if (rankedShortlist.length === 0) return ''

    const leaders = rankedShortlist.slice(0, 4).map((tool) => tool.name).join(' · ')
    const mix = categoryMix.map(([category, count]) => `${category}:${count}`).join(' | ')

    return [
      `${activeProfile.name} // ${activeScenario.name}`,
      `Leaders: ${leaders}`,
      `Health: avg ${averageScore} | verified ${verifiedCount} | self-hosted ${selfHostedCount}`,
      `Mix: ${mix || 'single-lane board'}`,
      `Notes: ${notes || 'No notes yet.'}`,
    ].join('\n')
  }, [activeProfile.name, activeScenario.name, averageScore, categoryMix, notes, rankedShortlist, selfHostedCount, verifiedCount])

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

  function updateScenario(value: string) {
    setScenarioSlug(value)
    writeScenario(value)
  }

  function saveSnapshot() {
    const title = `${activeProfile.name} / ${activeScenario.name}`
    const snapshot: ScenarioSnapshot = {
      slug: `${activeProfile.slug}-${activeScenario.slug}-${Date.now()}`,
      title,
      profileSlug: activeProfile.slug,
      presetSlug: activeScenario.slug,
      toolSlugs: slugs,
      notes,
    }
    const next = [snapshot, ...snapshots].slice(0, 8)
    setSnapshots(next)
    writeSnapshots(next)
  }

  function loadSnapshot(snapshot: ScenarioSnapshot) {
    setProfileSlug(snapshot.profileSlug)
    setScenarioSlug(snapshot.presetSlug)
    setNotes(snapshot.notes)
    setSlugs(snapshot.toolSlugs)
    writeShortlist(snapshot.toolSlugs)
    writeScenario(snapshot.presetSlug)
    writeNotes(snapshot.notes)
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
              {rankedShortlist.map((tool) => (
                <div key={tool.slug} className="f-panel f-card" style={{ padding: '18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'center' }}>
                    <div style={{ fontWeight: 800 }}>{tool.name}</div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <div className="f-chip">{tool.score}</div>
                      <div className="f-chip f-chip-blue">{tool.missionScore}</div>
                      <div className="f-chip f-chip-red">{tool.scenarioScore}</div>
                    </div>
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
                <div className="f-kicker">Decision lens</div>
                <select
                  value={profileSlug}
                  onChange={(event) => setProfileSlug(event.target.value)}
                  className="f-select"
                  style={{ marginTop: '12px' }}
                >
                  {missionProfiles.map((profile) => (
                    <option key={profile.slug} value={profile.slug}>
                      {profile.name}
                    </option>
                  ))}
                </select>
                <div style={{ marginTop: '12px', color: 'var(--text-soft)', lineHeight: 1.7 }}>{activeProfile.description}</div>
                <div className="f-kicker" style={{ marginTop: '16px' }}>Scenario memory</div>
                <select
                  value={scenarioSlug}
                  onChange={(event) => updateScenario(event.target.value)}
                  className="f-select"
                  style={{ marginTop: '12px' }}
                >
                  {scenarioPresets.map((scenario) => (
                    <option key={scenario.slug} value={scenario.slug}>
                      {scenario.name}
                    </option>
                  ))}
                </select>
                <div style={{ marginTop: '12px', color: 'var(--text-soft)', lineHeight: 1.7 }}>{activeScenario.description}</div>
                <div style={{ marginTop: '12px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <Link href="/compose/" className="f-button f-button-ghost">
                    Open compose
                  </Link>
                  <Link href="/graph/" className="f-button f-button-ghost">
                    Inspect graph
                  </Link>
                  <button type="button" onClick={saveSnapshot} className="f-button f-button-ghost">
                    Save scenario board
                  </button>
                </div>
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
                <div className="f-kicker">Shortlist health</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '10px', marginTop: '12px' }}>
                  <div className="f-card" style={{ padding: '12px 14px', background: 'rgba(255,255,255,0.03)' }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>{averageScore}</div>
                    <div style={{ color: 'var(--text-soft)', marginTop: '4px' }}>Average score</div>
                  </div>
                  <div className="f-card" style={{ padding: '12px 14px', background: 'rgba(255,255,255,0.03)' }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>{verifiedCount}</div>
                    <div style={{ color: 'var(--text-soft)', marginTop: '4px' }}>Verified picks</div>
                  </div>
                  <div className="f-card" style={{ padding: '12px 14px', background: 'rgba(255,255,255,0.03)' }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>{selfHostedCount}</div>
                    <div style={{ color: 'var(--text-soft)', marginTop: '4px' }}>Self-hosted tools</div>
                  </div>
                </div>

                <div className="f-kicker" style={{ marginTop: '18px' }}>Scenario weights</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: '10px', marginTop: '12px' }}>
                  {Object.entries(activeScenario.weights).map(([key, value]) => (
                    <div key={key} className="f-card" style={{ padding: '12px 14px', background: 'rgba(255,255,255,0.03)' }}>
                      <div style={{ fontWeight: 800, textTransform: 'capitalize' }}>{key}</div>
                      <div style={{ color: 'var(--text-soft)', marginTop: '4px' }}>{value}/5</div>
                    </div>
                  ))}
                </div>

                <div className="f-kicker" style={{ marginTop: '18px' }}>Signal mix</div>
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

                <div className="f-kicker" style={{ marginTop: '18px' }}>Saved boards</div>
                <div style={{ display: 'grid', gap: '10px', marginTop: '12px' }}>
                  {snapshots.map((snapshot) => {
                    const profile = getMissionProfileBySlug(snapshot.profileSlug)
                    const preset = scenarioPresets.find((item) => item.slug === snapshot.presetSlug)

                    return (
                      <button
                        key={snapshot.slug}
                        type="button"
                        onClick={() => loadSnapshot(snapshot)}
                        className="f-card"
                        style={{
                          padding: '12px 14px',
                          background: 'rgba(255,255,255,0.03)',
                          textAlign: 'left',
                          border: '1px solid rgba(255,255,255,0.08)',
                          cursor: 'pointer',
                        }}
                      >
                        <div style={{ fontWeight: 800 }}>{snapshot.title}</div>
                        <div style={{ color: 'var(--text-soft)', marginTop: '4px', lineHeight: 1.6 }}>
                          {profile?.name || snapshot.profileSlug} · {preset?.name || snapshot.presetSlug} · {snapshot.toolSlugs.length} tools
                        </div>
                      </button>
                    )
                  })}
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

                <div className="f-kicker" style={{ marginTop: '18px' }}>Exportable verdict</div>
                <textarea
                  value={verdictSummary}
                  readOnly
                  className="f-input"
                  style={{ minHeight: '220px', marginTop: '12px', resize: 'vertical' }}
                />

                <div className="f-kicker" style={{ marginTop: '18px' }}>Share artifact</div>
                <textarea
                  value={shareArtifact}
                  readOnly
                  className="f-input"
                  style={{ minHeight: '150px', marginTop: '12px', resize: 'vertical' }}
                />
              </div>
            </div>
          </section>
        </>
      )}
    </FuturisticShell>
  )
}
