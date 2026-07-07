import { useMemo, useState } from 'react'
import Link from 'next/link'
import FuturisticShell from '../../components/FuturisticShell'
import {
  allTools,
  getToolsByNames,
  missionProfiles,
  scoreToolForMission,
  stackRecipes,
} from '../../lib/opentoolkit'

const focusLabels = [
  { key: 'privacy', label: 'Privacy' },
  { key: 'control', label: 'Control' },
  { key: 'ease', label: 'Ease' },
  { key: 'power', label: 'Power' },
  { key: 'creativity', label: 'Creative' },
] as const

export default function ComposePage() {
  const [profileSlug, setProfileSlug] = useState(missionProfiles[0]?.slug || '')
  const profile = missionProfiles.find((item) => item.slug === profileSlug) || missionProfiles[0]

  const starterTools = useMemo(() => getToolsByNames(profile.toolNames), [profile])

  const rankedTools = useMemo(() => {
    return [...allTools]
      .map((tool) => ({
        tool,
        score: scoreToolForMission(tool, profile.priorities),
      }))
      .sort((left, right) => right.score - left.score)
      .slice(0, 8)
  }, [profile])

  const alignedStacks = useMemo(() => {
    return stackRecipes
      .map((recipe) => ({
        recipe,
        matches: recipe.toolNames.filter((name) => profile.toolNames.includes(name)).length,
      }))
      .filter((entry) => entry.matches > 0)
      .sort((left, right) => right.matches - left.matches)
      .slice(0, 4)
  }, [profile])

  return (
    <FuturisticShell title="Compose" eyebrow="Build a stack">
      <section className="f-hero f-card rise-in" style={{ padding: '28px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '18px', alignItems: 'end' }}>
          <div>
            <div className="f-chip f-chip-red">Stack composer</div>
            <h1 style={{ margin: '16px 0 0', fontSize: 'clamp(2.2rem, 6vw, 4.5rem)', lineHeight: 0.98 }}>
              Build a stack with an actual point of view.
            </h1>
            <p style={{ margin: '16px 0 0', color: 'var(--text-soft)', fontSize: '1.06rem', lineHeight: 1.8, maxWidth: '760px' }}>
              Composition is where OpenToolkit stops being a list and starts acting like a software operating layer.
              Pick the kind of life you want, then shape the stack around that gravity.
            </p>
          </div>

          <div className="f-panel f-card" style={{ padding: '18px' }}>
            <div className="f-kicker">Choose a mission profile</div>
            <div style={{ display: 'grid', gap: '10px', marginTop: '12px' }}>
              {missionProfiles.map((item) => (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => setProfileSlug(item.slug)}
                  className={item.slug === profile.slug ? 'f-button' : 'f-button f-button-ghost'}
                  style={{ justifyContent: 'flex-start' }}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rise-in" style={{ marginTop: '22px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: '18px' }}>
          <div className="f-panel f-card" style={{ padding: '22px' }}>
            <div className="f-kicker">Current profile</div>
            <h2 style={{ margin: '10px 0 0', fontSize: '1.7rem' }}>{profile.name}</h2>
            <p style={{ margin: '12px 0 0', color: 'var(--text-soft)', lineHeight: 1.75 }}>{profile.description}</p>

            <div style={{ display: 'grid', gap: '10px', marginTop: '18px' }}>
              {focusLabels.map((focus) => (
                <div key={focus.key} className="f-card" style={{ padding: '12px 14px', background: 'rgba(255,255,255,0.03)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                    <span style={{ fontWeight: 800 }}>{focus.label}</span>
                    <span className="f-chip">{profile.priorities[focus.key]}/5</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="f-panel f-card" style={{ padding: '22px' }}>
            <div className="f-kicker">Starter loadout</div>
            <div style={{ display: 'grid', gap: '12px', marginTop: '12px' }}>
              {starterTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}/`}
                  style={{ textDecoration: 'none', color: 'var(--text-main)' }}
                >
                  <div className="f-card" style={{ padding: '14px', background: 'rgba(255,255,255,0.03)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                      <span style={{ fontWeight: 800 }}>{tool.name}</span>
                      <span className="f-chip">{tool.score}</span>
                    </div>
                    <div style={{ marginTop: '6px', color: 'var(--text-soft)', lineHeight: 1.6 }}>{tool.description}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rise-in" style={{ marginTop: '22px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '18px' }}>
          <div className="f-panel f-card" style={{ padding: '22px' }}>
            <div className="f-kicker">Best next additions</div>
            <div style={{ display: 'grid', gap: '12px', marginTop: '12px' }}>
              {rankedTools.map(({ tool, score }) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}/`}
                  style={{ textDecoration: 'none', color: 'var(--text-main)' }}
                >
                  <div className="f-card" style={{ padding: '14px', background: 'rgba(255,255,255,0.03)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                      <span style={{ fontWeight: 800 }}>{tool.name}</span>
                      <span className="f-chip f-chip-blue">{score}</span>
                    </div>
                    <div style={{ marginTop: '6px', color: 'var(--text-soft)', lineHeight: 1.6 }}>{tool.description}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="f-panel f-card" style={{ padding: '22px' }}>
            <div className="f-kicker">Aligned stacks</div>
            <div style={{ display: 'grid', gap: '12px', marginTop: '12px' }}>
              {alignedStacks.map(({ recipe, matches }) => (
                <Link
                  key={recipe.slug}
                  href={`/stacks/${recipe.slug}/`}
                  style={{ textDecoration: 'none', color: 'var(--text-main)' }}
                >
                  <div className="f-card" style={{ padding: '14px', background: 'rgba(255,255,255,0.03)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                      <span style={{ fontWeight: 800 }}>{recipe.name}</span>
                      <span className="f-chip">{matches} matches</span>
                    </div>
                    <div style={{ marginTop: '6px', color: 'var(--text-soft)', lineHeight: 1.6 }}>{recipe.promise}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </FuturisticShell>
  )
}
