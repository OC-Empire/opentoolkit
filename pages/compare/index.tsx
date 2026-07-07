import { useMemo, useState } from 'react'
import Link from 'next/link'
import FuturisticShell from '../../components/FuturisticShell'
import ShortlistButton from '../../components/ShortlistButton'
import {
  allTools,
  compareGuides,
  formatStars,
  getToolBySlug,
  getToolsBySlugs,
  getWhyItWins,
  labelPlatform,
  missionProfiles,
  replacementScenarios,
  scenarioPresets,
  scoreToolForWeights,
} from '../../lib/opentoolkit'

export default function ComparePage() {
  const [presetSlug, setPresetSlug] = useState(scenarioPresets[0]?.slug || '')
  const [leftSlug, setLeftSlug] = useState(compareGuides[0]?.toolSlugs[0] || '')
  const [rightSlug, setRightSlug] = useState(compareGuides[0]?.toolSlugs[1] || '')
  const [matrixSlugs, setMatrixSlugs] = useState<string[]>(['firefox', 'brave-browser', 'signal', 'simplex-chat'])
  const activePreset = scenarioPresets.find((preset) => preset.slug === presetSlug) || scenarioPresets[0]
  const activeGuides = useMemo(
    () => compareGuides.filter((guide) => activePreset.compareGuideSlugs.includes(guide.slug)),
    [activePreset]
  )
  const matrixRows = useMemo(() => {
    return activeGuides.map((guide) => {
      const tools = getToolsBySlugs(guide.toolSlugs)
      const scored = tools
        .map((tool) => ({
          tool,
          weighted: scoreToolForWeights(tool, activePreset.weights),
        }))
        .sort((left, right) => right.weighted - left.weighted)

      return {
        guide,
        scored,
      }
    })
  }, [activeGuides, activePreset])
  const selectableTools = useMemo(
    () =>
      [...allTools]
        .sort((left, right) => {
          if (right.score !== left.score) return right.score - left.score
          return right.stars - left.stars
        })
        .slice(0, 60),
    []
  )
  const leftTool = getToolBySlug(leftSlug)
  const rightTool = getToolBySlug(rightSlug)
  const customPair = leftTool && rightTool ? [leftTool, rightTool] : []
  const customScores = customPair
    .map((tool) => ({
      tool,
      weighted: scoreToolForWeights(tool, activePreset.weights),
    }))
    .sort((left, right) => right.weighted - left.weighted)
  const matrixTools = matrixSlugs
    .map((slug) => getToolBySlug(slug))
    .filter(Boolean)
    .map((tool) => ({
      tool,
      weighted: scoreToolForWeights(tool, activePreset.weights),
    }))
    .sort((left, right) => right.weighted - left.weighted)

  function updateMatrixSlot(index: number, value: string) {
    const next = [...matrixSlugs]
    next[index] = value
    setMatrixSlugs(next)
  }

  return (
    <FuturisticShell title="Compare" eyebrow="Decision engine">
      <section className="f-hero f-card rise-in" style={{ padding: '28px' }}>
        <p style={{ margin: 0, color: 'var(--text-soft)', fontSize: '1.08rem', lineHeight: 1.8, maxWidth: '840px' }}>
          Great product buzz comes from helping people choose cleanly. This surface turns OpenToolkit into a place
          where tradeoffs are legible, opinionated, and shareable.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px', marginTop: '18px' }}>
          <div className="f-card" style={{ padding: '18px', background: 'rgba(255,255,255,0.03)' }}>
            <div className="f-kicker">Decision modes</div>
            <select value={presetSlug} onChange={(event) => setPresetSlug(event.target.value)} className="f-select" style={{ marginTop: '12px' }}>
              {scenarioPresets.map((preset) => (
                <option key={preset.slug} value={preset.slug}>
                  {preset.name}
                </option>
              ))}
            </select>
            <div style={{ marginTop: '10px', color: 'var(--text-soft)', lineHeight: 1.7 }}>{activePreset.description}</div>
          </div>

          <div className="f-card" style={{ padding: '18px', background: 'rgba(255,255,255,0.03)' }}>
            <div className="f-kicker">Replacement pressure</div>
            <div style={{ marginTop: '10px', color: 'var(--text-soft)', lineHeight: 1.7 }}>
              The strongest compares happen where people are already feeling incumbent pain. That is why replacement
              scenarios and compare guides should reinforce each other.
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '16px' }}>
          {missionProfiles.map((profile) => (
            <span key={profile.slug} className="f-chip">
              {profile.name}
            </span>
          ))}
        </div>
      </section>

      <section className="rise-in" style={{ marginTop: '22px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
          {replacementScenarios.slice(0, 4).map((scenario) => (
            <Link
              key={scenario.slug}
              href="/replace/"
              className="f-panel f-card"
              style={{ padding: '18px', textDecoration: 'none', color: 'var(--text-main)' }}
            >
              <div className="f-kicker">Pressure zone</div>
              <div style={{ marginTop: '10px', fontWeight: 800 }}>{scenario.incumbent}</div>
              <div style={{ marginTop: '8px', color: 'var(--text-soft)', lineHeight: 1.6 }}>{scenario.problem}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="rise-in" style={{ marginTop: '22px' }}>
        <div className="f-panel f-card" style={{ padding: '22px' }}>
          <div className="f-kicker">Scenario focus</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: '10px', marginTop: '12px' }}>
            {Object.entries(activePreset.weights).map(([key, value]) => (
              <div key={key} className="f-card" style={{ padding: '12px 14px', background: 'rgba(255,255,255,0.03)' }}>
                <div style={{ fontWeight: 800, textTransform: 'capitalize' }}>{key}</div>
                <div style={{ marginTop: '5px', color: 'var(--text-soft)' }}>{value}/5</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rise-in" style={{ marginTop: '22px' }}>
        <div className="f-panel f-card" style={{ padding: '22px' }}>
          <div className="f-kicker">Weighted verdict matrix</div>
          <div style={{ display: 'grid', gap: '12px', marginTop: '12px' }}>
            {matrixRows.map(({ guide, scored }) => (
              <div key={guide.slug} className="f-card" style={{ padding: '14px', background: 'rgba(255,255,255,0.03)' }}>
                <div style={{ fontWeight: 800 }}>{guide.title}</div>
                <div style={{ marginTop: '8px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  {scored.map(({ tool, weighted }) => (
                    <div key={tool.slug} className="f-card" style={{ padding: '12px 14px', background: 'rgba(255,255,255,0.03)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                        <span style={{ fontWeight: 800 }}>{tool.name}</span>
                        <span className="f-chip f-chip-blue">{weighted}</span>
                      </div>
                      <div style={{ marginTop: '5px', color: 'var(--text-soft)', lineHeight: 1.6 }}>{getWhyItWins(tool)}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rise-in" style={{ marginTop: '22px' }}>
        <div className="f-panel f-card" style={{ padding: '22px' }}>
          <div className="f-kicker">Custom matrix duel</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginTop: '12px' }}>
            <select value={leftSlug} onChange={(event) => setLeftSlug(event.target.value)} className="f-select">
              {selectableTools.map((tool) => (
                <option key={tool.slug} value={tool.slug}>
                  {tool.name}
                </option>
              ))}
            </select>
            <select value={rightSlug} onChange={(event) => setRightSlug(event.target.value)} className="f-select">
              {selectableTools.map((tool) => (
                <option key={tool.slug} value={tool.slug}>
                  {tool.name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '14px', marginTop: '16px' }}>
            {customScores.map(({ tool, weighted }) => (
              <div key={tool.slug} className="f-card" style={{ padding: '16px', background: 'rgba(255,255,255,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'center' }}>
                  <div style={{ fontWeight: 800 }}>{tool.name}</div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <span className="f-chip">{tool.score}</span>
                    <span className="f-chip f-chip-blue">{weighted}</span>
                  </div>
                </div>
                <div style={{ marginTop: '8px', color: 'var(--ice-blue)', fontWeight: 700 }}>{getWhyItWins(tool)}</div>
                <div style={{ marginTop: '8px', color: 'var(--text-soft)', lineHeight: 1.65 }}>{tool.description}</div>
                <div style={{ marginTop: '10px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {tool.platforms.slice(0, 3).map((platform) => (
                    <span key={platform} className="f-chip">
                      {labelPlatform(platform)}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rise-in" style={{ marginTop: '22px' }}>
        <div className="f-panel f-card" style={{ padding: '22px' }}>
          <div className="f-kicker">Multi-tool matrix</div>
          <div style={{ color: 'var(--text-soft)', lineHeight: 1.7, marginTop: '10px' }}>
            Use this when the decision is not binary. Stack reality usually involves a small field of credible candidates, not one duel.
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '12px', marginTop: '14px' }}>
            {matrixSlugs.map((slug, index) => (
              <select
                key={`${slug}-${index}`}
                value={slug}
                onChange={(event) => updateMatrixSlot(index, event.target.value)}
                className="f-select"
              >
                {selectableTools.map((tool) => (
                  <option key={tool.slug} value={tool.slug}>
                    {tool.name}
                  </option>
                ))}
              </select>
            ))}
          </div>

          <div style={{ display: 'grid', gap: '10px', marginTop: '16px' }}>
            {matrixTools.map(({ tool, weighted }, index) => (
              <div key={tool.slug} className="f-card" style={{ padding: '14px', background: 'rgba(255,255,255,0.03)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '80px 1.4fr 0.8fr 0.8fr 1.8fr', gap: '12px', alignItems: 'center' }}>
                  <div style={{ fontWeight: 800, color: 'var(--ice-blue)' }}>#{index + 1}</div>
                  <div style={{ fontWeight: 800 }}>{tool.name}</div>
                  <div className="f-chip">{tool.score}/100</div>
                  <div className="f-chip f-chip-blue">{weighted}</div>
                  <div style={{ color: 'var(--text-soft)', lineHeight: 1.6 }}>{getWhyItWins(tool)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ display: 'grid', gap: '18px', marginTop: '22px' }}>
        {activeGuides.map((guide, index) => {
          const tools = getToolsBySlugs(guide.toolSlugs)
          const scoredTools = tools
            .map((tool) => ({ tool, scenarioScore: scoreToolForWeights(tool, activePreset.weights) }))
            .sort((left, right) => right.scenarioScore - left.scenarioScore)

          return (
            <section
              key={guide.slug}
              id={guide.slug}
              className="f-panel f-card rise-in"
              style={{ padding: '22px', animationDelay: `${0.08 + index * 0.04}s` }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ maxWidth: '720px' }}>
                  <div className="f-chip f-chip-red">{guide.title}</div>
                  <h2 style={{ margin: '14px 0 10px', fontSize: '2rem' }}>{guide.question}</h2>
                  <p style={{ margin: 0, color: 'var(--text-soft)', lineHeight: 1.8 }}>{guide.summary}</p>
                </div>
                <div className="f-card" style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', maxWidth: '320px' }}>
                  <div className="f-kicker">Verdict</div>
                  <div style={{ marginTop: '8px', fontWeight: 800, color: 'var(--ice-blue)' }}>{guide.winnerFor}</div>
                  <div style={{ marginTop: '10px', color: 'var(--text-soft)', lineHeight: 1.7 }}>{guide.tradeoff}</div>
                </div>
              </div>

              <div style={{ marginTop: '18px', color: 'var(--text-soft)', lineHeight: 1.7 }}>
                <strong style={{ color: 'var(--text-main)' }}>Decision lens:</strong> {guide.lens}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '18px' }}>
                {scoredTools.map(({ tool, scenarioScore }) => (
                  <div key={tool.slug} className="f-card" style={{ padding: '18px', background: 'rgba(255,255,255,0.03)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'center' }}>
                      <div style={{ fontWeight: 800, fontSize: '1.06rem' }}>{tool.name}</div>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <div className="f-chip">{tool.score}/100</div>
                        <div className="f-chip f-chip-blue">{scenarioScore}</div>
                      </div>
                    </div>
                    <div style={{ marginTop: '8px', color: 'var(--ice-blue)', fontWeight: 700 }}>{getWhyItWins(tool)}</div>
                    <p style={{ margin: '12px 0', color: 'var(--text-soft)', lineHeight: 1.65 }}>{tool.description}</p>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {tool.platforms.slice(0, 4).map((platform) => (
                        <span key={platform} className="f-chip">
                          {labelPlatform(platform)}
                        </span>
                      ))}
                    </div>
                    <div style={{ marginTop: '12px', color: 'var(--text-dim)', fontSize: '0.92rem' }}>
                      {formatStars(tool.stars)} stars · {tool.license}
                    </div>
                    <div style={{ marginTop: '14px' }}>
                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        <Link href={`/tools/${tool.slug}/`} className="f-button f-button-ghost">
                          Open dossier
                        </Link>
                        <ShortlistButton slug={tool.slug} label="Save for later" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </FuturisticShell>
  )
}
