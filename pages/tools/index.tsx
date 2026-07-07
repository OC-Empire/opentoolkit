import { useMemo, useState } from 'react'
import Link from 'next/link'
import FuturisticShell from '../../components/FuturisticShell'
import { allTools, formatStars, getWhyItWins, labelPlatform } from '../../lib/opentoolkit'

const categories = ['All', ...Array.from(new Set(allTools.map((tool) => tool.category)))]
const platforms = ['All', 'web', 'windows', 'macos', 'linux', 'android', 'ios', 'self-hosted']

export default function ToolsIndexPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [platform, setPlatform] = useState('All')
  const [verifiedOnly, setVerifiedOnly] = useState(false)

  const visibleTools = useMemo(() => {
    return [...allTools]
      .filter((tool) => {
        const haystack = `${tool.name} ${tool.description} ${tool.category} ${tool.categories.join(' ')} ${tool.platforms.join(' ')}`
        if (search && !haystack.toLowerCase().includes(search.toLowerCase())) return false
        if (category !== 'All' && tool.category !== category) return false
        if (platform !== 'All' && !tool.platforms.includes(platform)) return false
        if (verifiedOnly && !tool.verified) return false
        return true
      })
      .sort((left, right) => {
        if (right.score !== left.score) return right.score - left.score
        return right.stars - left.stars
      })
  }, [category, platform, search, verifiedOnly])

  return (
    <FuturisticShell title="Tools" eyebrow="Intelligence library">
      <section className="f-hero f-card rise-in" style={{ padding: '28px' }}>
        <p style={{ margin: 0, color: 'var(--text-soft)', fontSize: '1.08rem', lineHeight: 1.8, maxWidth: '860px' }}>
          A real tools surface should feel like a judgment library, not a junk drawer. Use this when you already know
          you want to inspect specific picks, categories, and platform lanes directly.
        </p>
      </section>

      <section className="f-panel f-card rise-in" style={{ padding: '22px', marginTop: '22px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr auto', gap: '12px' }}>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search tools, categories, platforms..."
            className="f-input"
          />
          <select value={category} onChange={(event) => setCategory(event.target.value)} className="f-select">
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select value={platform} onChange={(event) => setPlatform(event.target.value)} className="f-select">
            {platforms.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <button type="button" onClick={() => setVerifiedOnly((value) => !value)} className={verifiedOnly ? 'f-button' : 'f-button f-button-ghost'}>
            Verified only
          </button>
        </div>
      </section>

      <section className="rise-in" style={{ marginTop: '22px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
          {visibleTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}/`}
              className="f-panel f-card"
              style={{ padding: '18px', textDecoration: 'none', color: 'var(--text-main)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'center' }}>
                <div style={{ fontWeight: 800, fontSize: '1.04rem' }}>{tool.name}</div>
                <div className={tool.verified ? 'f-chip f-chip-blue' : 'f-chip'}>{tool.score}</div>
              </div>
              <div style={{ marginTop: '8px', color: 'var(--ice-blue)', fontWeight: 700 }}>{getWhyItWins(tool)}</div>
              <div style={{ marginTop: '8px', color: 'var(--text-soft)', lineHeight: 1.6 }}>{tool.description}</div>
              <div style={{ marginTop: '10px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span className="f-chip f-chip-red">{tool.category}</span>
                {tool.platforms.slice(0, 3).map((item) => (
                  <span key={item} className="f-chip">
                    {labelPlatform(item)}
                  </span>
                ))}
              </div>
              <div style={{ marginTop: '12px', color: 'var(--text-dim)', fontSize: '0.92rem' }}>
                {formatStars(tool.stars)} stars · {tool.license}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </FuturisticShell>
  )
}
