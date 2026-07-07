import { useEffect, useMemo, useState } from 'react'
import Fuse from 'fuse.js'
import Link from 'next/link'
import FuturisticShell from '../components/FuturisticShell'
import {
  allTools,
  collections,
  compareGuides,
  formatStars,
  getSpotlights,
  getWhyItWins,
  intelligenceLedger,
  labelPlatform,
  migrationGuides,
  migrationJourneys,
  missionProfiles,
  productPillars,
  replacementScenarios,
  scenarioPresets,
  stackRecipes,
  Tool,
} from '../lib/opentoolkit'

const categories = ['All', ...Array.from(new Set(allTools.map((tool) => tool.category)))]
const platforms = ['All', 'web', 'windows', 'macos', 'linux', 'android', 'ios', 'self-hosted']

const entryPaths = [
  {
    title: 'Build a privacy stack',
    body: 'Start with the fastest path out of ad-tech defaults.',
    href: '/stacks/',
  },
  {
    title: 'Compose your stack',
    body: 'Choose a mission profile and let the platform shape the loadout.',
    href: '/compose/',
  },
  {
    title: 'Ask what replaces this',
    body: 'Move from incumbent tools to real alternatives with friction honesty.',
    href: '/replace/',
  },
  {
    title: 'Compare two serious options',
    body: 'See tradeoffs without ten tabs of fragmented research.',
    href: '/compare/',
  },
  {
    title: 'Inspect the relationship graph',
    body: 'See how anchor tools connect across alternatives, complements, and migration logic.',
    href: '/graph/',
  },
  {
    title: 'Plan a migration',
    body: 'Replace bad defaults in stages instead of chaos.',
    href: '/migrations/',
  },
  {
    title: 'Save a serious shortlist',
    body: 'Turn wandering into a decision trail you can return to.',
    href: '/shortlist/',
  },
  {
    title: 'Track what is rising',
    body: 'See the tools and patterns that are gaining strategic weight.',
    href: '/radar/',
  },
]

function SpotlightCard({ tool, index }: { tool: Tool; index: number }) {
  const dominant = index === 0

  return (
    <Link
      href={`/tools/${tool.slug}/`}
      className="f-panel f-card"
      style={{
        padding: '20px',
        textDecoration: 'none',
        color: 'var(--text-main)',
        background: dominant
          ? 'linear-gradient(160deg, rgba(255, 49, 95, 0.18), rgba(53, 194, 255, 0.14), rgba(10, 16, 30, 0.92))'
          : undefined,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'center' }}>
        <div style={{ fontWeight: 800, fontSize: '1.06rem' }}>{tool.name}</div>
        <div className={dominant ? 'f-chip f-chip-red' : 'f-chip'}>{tool.score}/100</div>
      </div>
      <div style={{ marginTop: '10px', color: 'var(--ice-blue)', fontWeight: 700 }}>{getWhyItWins(tool)}</div>
      <p style={{ margin: '12px 0', color: 'var(--text-soft)', lineHeight: 1.65 }}>{tool.description}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {tool.platforms.slice(0, 4).map((platform) => (
          <span key={platform} className="f-chip">
            {labelPlatform(platform)}
          </span>
        ))}
      </div>
      <div style={{ marginTop: '14px', color: 'var(--text-dim)', fontSize: '0.92rem' }}>
        {formatStars(tool.stars)} stars · {tool.license}
      </div>
    </Link>
  )
}

export default function Home() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [platform, setPlatform] = useState('All')
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [fuse, setFuse] = useState<Fuse<Tool> | null>(null)

  useEffect(() => {
    setFuse(
      new Fuse(allTools, {
        keys: ['name', 'description', 'category', 'categories', 'platforms', 'license'],
        threshold: 0.28,
        ignoreLocation: true,
      })
    )
  }, [])

  const results = useMemo(() => {
    const base = search && fuse ? fuse.search(search).map((entry) => entry.item) : allTools

    const filtered = base.filter((tool) => {
      if (category !== 'All' && tool.category !== category) return false
      if (platform !== 'All' && !tool.platforms.includes(platform)) return false
      if (verifiedOnly && !tool.verified) return false
      return true
    })

    return filtered.sort((left, right) => {
      if (right.score !== left.score) return right.score - left.score
      return right.stars - left.stars
    })
  }, [category, fuse, platform, search, verifiedOnly])

  const visibleTools = results.slice(0, 12)
  const spotlightTools = getSpotlights(4)
  const verifiedCount = allTools.filter((tool) => tool.verified).length
  const migrationCount = migrationGuides.length
  const flagshipJourney = migrationJourneys[0]

  return (
    <FuturisticShell>
      <section className="f-hero f-card rise-in" style={{ padding: '30px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: '24px',
            alignItems: 'end',
          }}
        >
          <div>
            <div className="f-chip f-chip-red">Sovereign software command center</div>
            <h1 className="f-title" style={{ marginTop: '18px', fontSize: 'clamp(2.8rem, 7vw, 6rem)' }}>
              <span className="f-gradient">Design your digital life.</span>
              <br />
              <span>Do not settle for defaults.</span>
            </h1>
            <p style={{ margin: '18px 0 0', color: 'var(--text-soft)', fontSize: '1.08rem', lineHeight: 1.8, maxWidth: '760px' }}>
              OpenToolkit should feel less like a directory and more like a high-signal operating layer for choosing,
              comparing, replacing, and composing the software stack you actually want to live with.
            </p>

            <div style={{ marginTop: '22px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/compose/" className="f-button">
                Compose a stack
              </Link>
              <Link href="/compare/" className="f-button">
                Enter compare mode
              </Link>
              <Link href="/replace/" className="f-button f-button-ghost">
                Open replacement engine
              </Link>
              <Link href="/graph/" className="f-button f-button-ghost">
                Inspect the graph
              </Link>
              <Link href="/shortlist/" className="f-button f-button-ghost">
                Open shortlist
              </Link>
            </div>
          </div>

          <div
            className="f-panel f-card"
            style={{
              padding: '20px',
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: '14px',
            }}
          >
              {[
                { value: `${allTools.length}+`, label: 'Curated tools' },
                { value: `${verifiedCount}`, label: 'Verified picks' },
                { value: `${stackRecipes.length}`, label: 'Flagship stacks' },
                { value: `${migrationCount + migrationJourneys.length}`, label: 'Migration routes' },
              ].map((stat) => (
                <div key={stat.label} className="f-card" style={{ padding: '16px', background: 'rgba(255,255,255,0.03)' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{stat.value}</div>
                <div style={{ marginTop: '6px', color: 'var(--text-soft)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rise-in" style={{ marginTop: '22px', animationDelay: '0.1s' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: '18px' }}>
          <div className="f-panel f-card" style={{ padding: '22px' }}>
            <div className="f-kicker">Flagship journey</div>
            <h2 style={{ margin: '10px 0 0', fontSize: '2rem' }}>{flagshipJourney.title}</h2>
            <p style={{ margin: '12px 0 0', color: 'var(--text-soft)', lineHeight: 1.75 }}>{flagshipJourney.subtitle}</p>
            <div style={{ marginTop: '18px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <Link href={`/migrations/${flagshipJourney.slug}/`} className="f-button">
                Enter the journey
              </Link>
              <Link href="/migrations/" className="f-button f-button-ghost">
                All migration routes
              </Link>
            </div>
          </div>

          <div className="f-panel f-card" style={{ padding: '22px' }}>
            <div className="f-kicker">Mission profiles</div>
            <div style={{ display: 'grid', gap: '10px', marginTop: '12px' }}>
              {missionProfiles.slice(0, 4).map((profile) => (
                <Link key={profile.slug} href="/compose/" style={{ textDecoration: 'none', color: 'var(--text-main)' }}>
                  <div className="f-card" style={{ padding: '14px', background: 'rgba(255,255,255,0.03)' }}>
                    <div style={{ fontWeight: 800 }}>{profile.name}</div>
                    <div style={{ marginTop: '6px', color: 'var(--text-soft)', lineHeight: 1.6 }}>{profile.description}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rise-in" style={{ marginTop: '22px', animationDelay: '0.08s' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
          {entryPaths.map((path) => (
            <Link
              key={path.href}
              href={path.href}
              className="f-panel f-card"
              style={{ padding: '18px', textDecoration: 'none', color: 'var(--text-main)' }}
            >
              <div className="f-kicker">Fast path</div>
              <div style={{ marginTop: '10px', fontWeight: 800, fontSize: '1.08rem' }}>{path.title}</div>
              <div style={{ marginTop: '8px', color: 'var(--text-soft)', lineHeight: 1.6 }}>{path.body}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="rise-in" style={{ marginTop: '22px', animationDelay: '0.1s' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: '18px' }}>
          <div className="f-panel f-card" style={{ padding: '22px' }}>
            <div className="f-kicker">Mission control</div>
            <div style={{ display: 'grid', gap: '10px', marginTop: '12px' }}>
              {scenarioPresets.map((preset) => (
                <Link
                  key={preset.slug}
                  href="/compare/"
                  className="f-card"
                  style={{ padding: '14px', background: 'rgba(255,255,255,0.03)', textDecoration: 'none', color: 'var(--text-main)' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'center' }}>
                    <div style={{ fontWeight: 800 }}>{preset.name}</div>
                    <div className="f-chip">{preset.compareGuideSlugs.length} compares</div>
                  </div>
                  <div style={{ marginTop: '6px', color: 'var(--text-soft)', lineHeight: 1.6 }}>{preset.description}</div>
                </Link>
              ))}
            </div>
          </div>

          <div className="f-panel f-card" style={{ padding: '22px' }}>
            <div className="f-kicker">Signal ledger</div>
            <div style={{ display: 'grid', gap: '10px', marginTop: '12px' }}>
              {intelligenceLedger.slice(0, 3).map((entry) => (
                <Link
                  key={entry.slug}
                  href="/radar/"
                  className="f-card"
                  style={{ padding: '14px', background: 'rgba(255,255,255,0.03)', textDecoration: 'none', color: 'var(--text-main)' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'center' }}>
                    <div style={{ fontWeight: 800 }}>{entry.title}</div>
                    <div className="f-chip f-chip-red">{entry.status}</div>
                  </div>
                  <div style={{ marginTop: '6px', color: 'var(--text-soft)', lineHeight: 1.6 }}>{entry.summary}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rise-in f-panel f-card" style={{ marginTop: '22px', padding: '22px', animationDelay: '0.12s' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap', marginBottom: '16px' }}>
          <div>
            <div className="f-kicker">Discovery core</div>
            <h2 style={{ margin: '8px 0 0', fontSize: '2rem' }}>Search by mission, not just by app name</h2>
          </div>
          <div style={{ maxWidth: '520px', color: 'var(--text-soft)', lineHeight: 1.7 }}>
            The catalog is still useful, but now it sits inside a bigger product: stack-building, comparison, and migration.
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
          <input
            type="text"
            placeholder="Search tools, missions, platforms, or licenses..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
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
                {item === 'All' ? item : labelPlatform(item)}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginTop: '14px', display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => setVerifiedOnly((current) => !current)}
            className={verifiedOnly ? 'f-chip f-chip-blue' : 'f-chip'}
            style={{ cursor: 'pointer' }}
          >
            {verifiedOnly ? 'Verified only: ON' : 'Verified only'}
          </button>
          <div style={{ color: 'var(--text-soft)', marginLeft: 'auto' }}>
            Showing {visibleTools.length} of {results.length} matching tools
          </div>
        </div>

        <div style={{ marginTop: '18px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
          {visibleTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}/`}
              className="f-card"
              style={{
                display: 'block',
                textDecoration: 'none',
                color: 'var(--text-main)',
                background: 'rgba(255,255,255,0.03)',
                padding: '18px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                <div style={{ fontWeight: 800 }}>{tool.name}</div>
                <div className="f-chip">{tool.score}</div>
              </div>
              <div style={{ marginTop: '8px', color: 'var(--ice-blue)', fontWeight: 700 }}>{getWhyItWins(tool)}</div>
              <p style={{ margin: '10px 0', color: 'var(--text-soft)', lineHeight: 1.6 }}>{tool.description}</p>
              <div style={{ color: 'var(--text-dim)', fontSize: '0.92rem' }}>{tool.category}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="rise-in" style={{ marginTop: '22px', animationDelay: '0.18s' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
          <div className="f-panel f-card" style={{ padding: '22px' }}>
            <div className="f-kicker">Replacement engine</div>
            <div style={{ display: 'grid', gap: '10px', marginTop: '12px' }}>
              {replacementScenarios.slice(0, 3).map((scenario) => (
                <Link key={scenario.slug} href="/replace/" style={{ textDecoration: 'none', color: 'var(--text-main)' }}>
                  <div className="f-card" style={{ padding: '14px', background: 'rgba(255,255,255,0.03)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                      <span style={{ fontWeight: 800 }}>{scenario.incumbent}</span>
                      <span className="f-chip">{scenario.friction}</span>
                    </div>
                    <div style={{ marginTop: '6px', color: 'var(--text-soft)', lineHeight: 1.6 }}>{scenario.problem}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="f-panel f-card" style={{ padding: '22px' }}>
            <div className="f-kicker">Product pillars</div>
            <div style={{ display: 'grid', gap: '10px', marginTop: '12px' }}>
              {productPillars.map((pillar) => (
                <div key={pillar.title} className="f-card" style={{ padding: '14px', background: 'rgba(255,255,255,0.03)' }}>
                  <div style={{ fontWeight: 800 }}>{pillar.title}</div>
                  <div style={{ marginTop: '6px', color: 'var(--text-soft)', lineHeight: 1.6 }}>{pillar.body}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rise-in" style={{ marginTop: '28px', animationDelay: '0.16s' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap', marginBottom: '18px' }}>
          <div>
            <div className="f-kicker">Signal board</div>
            <h2 style={{ margin: '8px 0 0', fontSize: '2rem' }}>Top picks that deserve attention now</h2>
          </div>
          <div style={{ maxWidth: '500px', color: 'var(--text-soft)', lineHeight: 1.7 }}>
            This is where OpenToolkit stops being neutral and starts being useful.
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
          {spotlightTools.map((tool, index) => (
            <SpotlightCard key={tool.slug} tool={tool} index={index} />
          ))}
        </div>
      </section>

      <section className="rise-in" style={{ marginTop: '28px', animationDelay: '0.2s' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          <div className="f-panel f-card" style={{ padding: '22px' }}>
            <div className="f-kicker">Compare layer</div>
            <h2 style={{ margin: '8px 0 10px', fontSize: '1.7rem' }}>Decision surfaces that make people share the site</h2>
            <div style={{ display: 'grid', gap: '12px' }}>
              {compareGuides.map((guide) => (
                <Link key={guide.slug} href={`/compare/#${guide.slug}`} style={{ textDecoration: 'none', color: 'var(--text-main)' }}>
                  <div className="f-card" style={{ padding: '14px', background: 'rgba(255,255,255,0.03)' }}>
                    <div style={{ fontWeight: 800 }}>{guide.title}</div>
                    <div style={{ marginTop: '6px', color: 'var(--text-soft)', lineHeight: 1.6 }}>{guide.summary}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="f-panel f-card" style={{ padding: '22px' }}>
            <div className="f-kicker">Migration layer</div>
            <h2 style={{ margin: '8px 0 10px', fontSize: '1.7rem' }}>Replacement guides for escaping sticky defaults</h2>
            <div style={{ display: 'grid', gap: '12px' }}>
              {migrationGuides.map((guide) => (
                <Link key={guide.slug} href={`/migrations/#${guide.slug}`} style={{ textDecoration: 'none', color: 'var(--text-main)' }}>
                  <div className="f-card" style={{ padding: '14px', background: 'rgba(255,255,255,0.03)' }}>
                    <div style={{ fontWeight: 800 }}>{guide.title}</div>
                    <div style={{ marginTop: '6px', color: 'var(--text-soft)', lineHeight: 1.6 }}>{guide.promise}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rise-in" style={{ marginTop: '28px', animationDelay: '0.22s' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap', marginBottom: '18px' }}>
          <div>
            <div className="f-kicker">Stack library</div>
            <h2 style={{ margin: '8px 0 0', fontSize: '2rem' }}>Outcome bundles for different kinds of people</h2>
          </div>
          <Link href="/stacks/" className="f-button f-button-ghost">
            View all stacks
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
          {stackRecipes.slice(0, 4).map((stack) => (
            <Link
              key={stack.slug}
              href={`/stacks/${stack.slug}/`}
              className="f-panel f-card"
              style={{ padding: '18px', textDecoration: 'none', color: 'var(--text-main)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
                <div style={{ fontWeight: 800 }}>{stack.name}</div>
                <div className="f-chip">{stack.difficulty}</div>
              </div>
              <p style={{ margin: '10px 0', color: 'var(--text-soft)', lineHeight: 1.6 }}>{stack.promise}</p>
              <div style={{ color: 'var(--text-dim)', fontSize: '0.92rem' }}>{stack.toolNames.length} tools</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="rise-in" style={{ marginTop: '28px', animationDelay: '0.24s' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
          {productPillars.map((pillar) => (
            <div key={pillar.title} className="f-panel f-card" style={{ padding: '20px' }}>
              <div className="f-kicker">{pillar.title}</div>
              <p style={{ margin: '10px 0 0', color: 'var(--text-soft)', lineHeight: 1.7 }}>{pillar.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rise-in" style={{ marginTop: '28px', animationDelay: '0.28s' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap', marginBottom: '18px' }}>
          <div>
            <div className="f-kicker">Editorial futures</div>
            <h2 style={{ margin: '8px 0 0', fontSize: '2rem' }}>Collections that can generate real buzz</h2>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
          {collections.map((collection) => (
            <div key={collection.slug} className="f-panel f-card" style={{ padding: '20px' }}>
              <div style={{ fontWeight: 800, fontSize: '1.06rem' }}>{collection.title}</div>
              <p style={{ margin: '10px 0', color: 'var(--text-soft)', lineHeight: 1.6 }}>{collection.description}</p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {collection.tags.map((tag) => (
                  <span key={tag} className="f-chip">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '16px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link href="/collections/" className="f-button">
            Browse collections
          </Link>
          <Link href="/rankings/" className="f-button f-button-ghost">
            View rankings
          </Link>
          <Link href="/radar/" className="f-button f-button-ghost">
            Open radar
          </Link>
        </div>
      </section>
    </FuturisticShell>
  )
}
