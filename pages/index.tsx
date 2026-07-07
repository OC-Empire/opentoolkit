import { useEffect, useState } from 'react'
import Fuse from 'fuse.js'
import Link from 'next/link'
import tools from '../data/tools.json'

type Tool = {
  id: string
  slug: string
  name: string
  description: string
  sourceUrl: string
  sourceType: string
  verified: boolean
  license: string
  stars: number
  category: string
  categories: string[]
  platforms: string[]
  score: number
}

const allTools = tools.tools as Tool[]
const categories = ['All', ...Array.from(new Set(allTools.map((tool) => tool.category)))]
const platforms = ['All', 'web', 'windows', 'macos', 'linux', 'android', 'ios', 'self-hosted']

const quickModes = [
  {
    id: 'privacy',
    label: 'Privacy Stack',
    category: 'Privacy',
    platform: 'All',
    description: 'Browsers, VPNs, blockers, encryption, and identity hardening.',
  },
  {
    id: 'builders',
    label: 'Builder Mode',
    category: 'Development',
    platform: 'All',
    description: 'Editors, local AI, terminals, and tools for shipping faster.',
  },
  {
    id: 'mobile',
    label: 'Android Freedom',
    category: 'All',
    platform: 'android',
    description: 'FOSS app stores, privacy tools, and mobile-first essentials.',
  },
  {
    id: 'selfhost',
    label: 'Self-Host Core',
    category: 'System',
    platform: 'self-hosted',
    description: 'Storage, backups, automation, and infrastructure you control.',
  },
]

const stackRecipes = [
  {
    name: 'Privacy Starter Stack',
    tools: ['uBlock Origin', 'Firefox', 'Bitwarden', 'Signal', 'NextDNS'],
    promise: 'Replace default Big Tech habits with a cleaner daily stack.',
  },
  {
    name: 'Local AI Builder Stack',
    tools: ['Ollama', 'VS Code', 'Obsidian', 'Joplin', 'Nextcloud'],
    promise: 'Build, think, and run intelligence without shipping your data away.',
  },
  {
    name: 'Self-Host Core Stack',
    tools: ['Nextcloud', 'Pi-hole', 'Immich', 'Home Assistant', 'Vaultwarden'],
    promise: 'Own your files, home, photos, and network edge from one philosophy.',
  },
]

const productLoops = [
  {
    title: 'Discover',
    body: 'Search by problem, not just brand name. Use quick modes, platform filters, and verified curation to find sharp candidates fast.',
  },
  {
    title: 'Decide',
    body: 'Every tool should explain why it wins, what it replaces, and who it is really for. The directory needs judgment, not neutrality theater.',
  },
  {
    title: 'Build',
    body: 'Turn picks into stack recipes, deployment guides, and “replace this with that” playbooks so OpenToolkit becomes operational.',
  },
  {
    title: 'Contribute',
    body: 'Community submissions, automated metadata refresh, and review workflows keep the catalog alive without turning it into a junkyard.',
  },
]

function formatStars(stars: number) {
  if (stars >= 1000) {
    return `${(stars / 1000).toFixed(stars >= 10000 ? 0 : 1)}k`
  }

  return `${stars}`
}

function labelPlatform(platform: string) {
  return platform === 'self-hosted' ? 'Self-hosted' : platform.charAt(0).toUpperCase() + platform.slice(1)
}

function getWhyItWins(tool: Tool) {
  if (tool.score >= 97) return 'Elite pick'
  if (tool.platforms.includes('self-hosted')) return 'Own the stack'
  if (tool.category === 'Privacy') return 'Hardens your defaults'
  if (tool.category === 'Development') return 'Fast builder tool'
  if (tool.category === 'AI') return 'Run intelligence locally'
  if (tool.category === 'System') return 'Replaces a cloud dependency'
  return 'Strong open-source option'
}

function getSpotlights(items: Tool[]) {
  return [...items]
    .sort((left, right) => {
      if (right.score !== left.score) return right.score - left.score
      return right.stars - left.stars
    })
    .slice(0, 4)
}

export default function Home() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [platform, setPlatform] = useState('All')
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [fuse, setFuse] = useState<Fuse<Tool> | null>(null)
  const [results, setResults] = useState<Tool[]>(allTools.slice(0, 24))

  useEffect(() => {
    setFuse(
      new Fuse(allTools, {
        keys: ['name', 'description', 'category', 'categories', 'platforms', 'license'],
        threshold: 0.28,
        ignoreLocation: true,
      })
    )
  }, [])

  useEffect(() => {
    const baseResults = search && fuse ? fuse.search(search).map((entry) => entry.item) : allTools

    const filtered = baseResults.filter((tool) => {
      if (category !== 'All' && tool.category !== category) return false
      if (platform !== 'All' && !tool.platforms.includes(platform)) return false
      if (verifiedOnly && !tool.verified) return false
      return true
    })

    filtered.sort((left, right) => {
      if (right.score !== left.score) return right.score - left.score
      return right.stars - left.stars
    })

    setResults(filtered)
  }, [category, fuse, platform, search, verifiedOnly])

  const verifiedCount = allTools.filter((tool) => tool.verified).length
  const selfHostedCount = allTools.filter((tool) => tool.platforms.includes('self-hosted')).length
  const mobileReadyCount = allTools.filter(
    (tool) => tool.platforms.includes('android') || tool.platforms.includes('ios')
  ).length
  const spotlightTools = getSpotlights(results.length ? results : allTools)
  const visibleTools = results.slice(0, 24)

  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top left, rgba(255, 153, 0, 0.24), transparent 28%), radial-gradient(circle at top right, rgba(37, 99, 235, 0.2), transparent 24%), linear-gradient(180deg, #fbf7ef 0%, #f1ebdd 44%, #efe6d5 100%)',
        color: '#1f2937',
        fontFamily: '"Space Grotesk", "Segoe UI", "Helvetica Neue", sans-serif',
      }}
    >
      <style jsx>{`
        @keyframes riseIn {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .rise-in {
          animation: riseIn 0.55s ease-out both;
        }
      `}</style>

      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '28px 18px 80px' }}>
        <section
          className="rise-in"
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '32px',
            padding: '28px',
            background: 'rgba(255, 252, 245, 0.82)',
            border: '1px solid rgba(120, 53, 15, 0.12)',
            boxShadow: '0 22px 70px rgba(84, 54, 9, 0.12)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(135deg, rgba(251, 191, 36, 0.12), transparent 35%), linear-gradient(220deg, rgba(37, 99, 235, 0.12), transparent 45%)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              position: 'relative',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
              gap: '24px',
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 14px',
                  borderRadius: '999px',
                  background: '#1f2937',
                  color: '#fff8eb',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                <span>OpenToolkit</span>
                <span style={{ opacity: 0.72 }}>Privacy-first arsenal</span>
              </div>

              <h1
                style={{
                  margin: '18px 0 14px',
                  fontSize: 'clamp(2.6rem, 6vw, 5.6rem)',
                  lineHeight: 0.95,
                  letterSpacing: '-0.05em',
                  color: '#111827',
                }}
              >
                Stop hunting.
                <br />
                Start building your stack.
              </h1>

              <p
                style={{
                  margin: 0,
                  maxWidth: '620px',
                  fontSize: '1.08rem',
                  lineHeight: 1.7,
                  color: '#4b5563',
                }}
              >
                OpenToolkit should feel like a mission-control surface for open-source software, not a long
                list. The goal: help people discover the right tool fast, understand why it matters, and move
                with conviction.
              </p>
            </div>

            <div
              style={{
                alignSelf: 'end',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gap: '14px',
              }}
            >
              {[
                { value: tools.metadata.totalTools, label: 'Tools indexed' },
                { value: `${verifiedCount}`, label: 'Verified entries' },
                { value: `${selfHostedCount}`, label: 'Self-hostable picks' },
                { value: `${mobileReadyCount}`, label: 'Mobile-ready tools' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    padding: '18px',
                    borderRadius: '22px',
                    background: 'rgba(255,255,255,0.72)',
                    border: '1px solid rgba(120, 53, 15, 0.12)',
                  }}
                >
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#111827' }}>{stat.value}</div>
                  <div style={{ marginTop: '6px', color: '#6b7280', fontSize: '0.92rem' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rise-in" style={{ marginTop: '22px', animationDelay: '0.08s' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '14px',
            }}
          >
            {quickModes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => {
                  setCategory(mode.category)
                  setPlatform(mode.platform)
                  setSearch('')
                }}
                style={{
                  textAlign: 'left',
                  padding: '18px 18px 20px',
                  borderRadius: '24px',
                  border: '1px solid rgba(120, 53, 15, 0.12)',
                  background: 'rgba(255, 252, 245, 0.88)',
                  cursor: 'pointer',
                  boxShadow: '0 10px 30px rgba(84, 54, 9, 0.06)',
                }}
              >
                <div style={{ fontWeight: 800, color: '#111827', fontSize: '1.02rem' }}>{mode.label}</div>
                <div style={{ marginTop: '8px', color: '#6b7280', lineHeight: 1.55, fontSize: '0.94rem' }}>
                  {mode.description}
                </div>
              </button>
            ))}
          </div>
        </section>

        <section
          className="rise-in"
          style={{
            marginTop: '22px',
            animationDelay: '0.14s',
            padding: '20px',
            borderRadius: '28px',
            background: 'rgba(255, 252, 245, 0.9)',
            border: '1px solid rgba(120, 53, 15, 0.12)',
            boxShadow: '0 16px 44px rgba(84, 54, 9, 0.08)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '12px',
            }}
          >
            <input
              type="text"
              placeholder="Search by tool, problem, category, platform, or license..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              style={{
                width: '100%',
                padding: '16px 18px',
                borderRadius: '18px',
                border: '1px solid rgba(120, 53, 15, 0.18)',
                background: '#fffdf8',
                color: '#111827',
                fontSize: '1rem',
                outline: 'none',
              }}
            />

            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              style={{
                width: '100%',
                padding: '16px 18px',
                borderRadius: '18px',
                border: '1px solid rgba(120, 53, 15, 0.18)',
                background: '#fffdf8',
                color: '#111827',
                fontSize: '1rem',
              }}
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              value={platform}
              onChange={(event) => setPlatform(event.target.value)}
              style={{
                width: '100%',
                padding: '16px 18px',
                borderRadius: '18px',
                border: '1px solid rgba(120, 53, 15, 0.18)',
                background: '#fffdf8',
                color: '#111827',
                fontSize: '1rem',
              }}
            >
              {platforms.map((item) => (
                <option key={item} value={item}>
                  {item === 'All' ? item : labelPlatform(item)}
                </option>
              ))}
            </select>
          </div>

          <div
            style={{
              marginTop: '16px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              alignItems: 'center',
            }}
          >
            <button
              onClick={() => setVerifiedOnly((current) => !current)}
              style={{
                padding: '10px 14px',
                borderRadius: '999px',
                border: verifiedOnly ? '1px solid #1d4ed8' : '1px solid rgba(120, 53, 15, 0.16)',
                background: verifiedOnly ? '#dbeafe' : '#fffaf0',
                color: verifiedOnly ? '#1d4ed8' : '#6b7280',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              {verifiedOnly ? 'Verified only: ON' : 'Verified only'}
            </button>

            <button
              onClick={() => {
                setSearch('')
                setCategory('All')
                setPlatform('All')
                setVerifiedOnly(false)
              }}
              style={{
                padding: '10px 14px',
                borderRadius: '999px',
                border: '1px solid rgba(120, 53, 15, 0.16)',
                background: '#fffaf0',
                color: '#6b7280',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Reset
            </button>

            <div style={{ marginLeft: 'auto', color: '#6b7280', fontSize: '0.96rem' }}>
              Showing <strong style={{ color: '#111827' }}>{Math.min(visibleTools.length, results.length)}</strong>{' '}
              of <strong style={{ color: '#111827' }}>{results.length}</strong> matching tools
            </div>
          </div>
        </section>

        <section className="rise-in" style={{ marginTop: '28px', animationDelay: '0.2s' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'end',
              gap: '12px',
              marginBottom: '18px',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '0.82rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#9a3412',
                  fontWeight: 800,
                }}
              >
                Signal board
              </div>
              <h2 style={{ margin: '6px 0 0', fontSize: '2rem', color: '#111827' }}>Top picks right now</h2>
            </div>
            <div style={{ maxWidth: '520px', color: '#6b7280', lineHeight: 1.6 }}>
              This should be the site’s opinionated layer: not just what exists, but what deserves attention for
              people trying to build a private, capable software stack.
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '14px',
            }}
          >
            {spotlightTools.map((tool, index) => (
              <div
                key={tool.id}
                style={{
                  padding: '18px',
                  borderRadius: '24px',
                  background: index === 0 ? '#111827' : 'rgba(255, 252, 245, 0.9)',
                  color: index === 0 ? '#fff7ed' : '#111827',
                  border: index === 0 ? 'none' : '1px solid rgba(120, 53, 15, 0.12)',
                  boxShadow: '0 16px 38px rgba(84, 54, 9, 0.08)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: '1.12rem' }}>{tool.name}</div>
                  <div
                    style={{
                      borderRadius: '999px',
                      padding: '6px 10px',
                      background: index === 0 ? 'rgba(255,255,255,0.12)' : '#ffedd5',
                      color: index === 0 ? '#fde68a' : '#9a3412',
                      fontWeight: 800,
                      fontSize: '0.82rem',
                    }}
                  >
                    {tool.score}/100
                  </div>
                </div>
                <div style={{ marginTop: '8px', opacity: index === 0 ? 0.82 : 1 }}>{getWhyItWins(tool)}</div>
                <p
                  style={{
                    margin: '14px 0',
                    lineHeight: 1.65,
                    color: index === 0 ? 'rgba(255,247,237,0.78)' : '#6b7280',
                  }}
                >
                  {tool.description}
                </p>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                  }}
                >
                  {tool.platforms.slice(0, 4).map((item) => (
                    <span
                      key={item}
                      style={{
                        borderRadius: '999px',
                        padding: '6px 10px',
                        background: index === 0 ? 'rgba(255,255,255,0.09)' : '#fff7ed',
                        fontSize: '0.8rem',
                      }}
                    >
                      {labelPlatform(item)}
                    </span>
                  ))}
                </div>
                <div style={{ marginTop: '14px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <Link
                    href={`/tools/${tool.slug}/`}
                    style={{
                      padding: '10px 12px',
                      borderRadius: '14px',
                      background: index === 0 ? 'rgba(255,255,255,0.12)' : '#111827',
                      color: index === 0 ? '#fff7ed' : '#fff7ed',
                      textDecoration: 'none',
                      fontWeight: 800,
                    }}
                  >
                    View dossier
                  </Link>
                  <a
                    href={tool.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '10px 12px',
                      borderRadius: '14px',
                      background: index === 0 ? 'rgba(255,255,255,0.08)' : '#fff7ed',
                      color: index === 0 ? '#fde68a' : '#9a3412',
                      textDecoration: 'none',
                      fontWeight: 800,
                    }}
                  >
                    Source
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rise-in" style={{ marginTop: '28px', animationDelay: '0.26s' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '14px',
              marginBottom: '24px',
            }}
          >
            {stackRecipes.map((recipe) => (
              <Link
                key={recipe.name}
                href={`/stacks/${recipe.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}/`}
                style={{
                  display: 'block',
                  padding: '20px',
                  borderRadius: '24px',
                  background: 'linear-gradient(180deg, rgba(255,252,245,0.94), rgba(255,247,237,0.9))',
                  border: '1px solid rgba(120, 53, 15, 0.12)',
                  boxShadow: '0 16px 44px rgba(84, 54, 9, 0.06)',
                  textDecoration: 'none',
                }}
              >
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#111827' }}>{recipe.name}</div>
                <p style={{ margin: '10px 0 14px', color: '#6b7280', lineHeight: 1.65 }}>{recipe.promise}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {recipe.tools.map((tool) => (
                    <span
                      key={tool}
                      style={{
                        padding: '7px 10px',
                        borderRadius: '999px',
                        background: '#111827',
                        color: '#fff7ed',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'end',
              gap: '12px',
              marginBottom: '18px',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '0.82rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#9a3412',
                  fontWeight: 800,
                }}
              >
                The arsenal
              </div>
              <h2 style={{ margin: '6px 0 0', fontSize: '2rem', color: '#111827' }}>Discover the right tool</h2>
            </div>
            <div style={{ maxWidth: '520px', color: '#6b7280', lineHeight: 1.6 }}>
              Cards need to do more than link out. They should communicate trust, fit, platform coverage, and
              why a tool earns a place in the stack.
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '16px',
            }}
          >
            {visibleTools.length ? (
              visibleTools.map((tool) => (
                <article
                  key={tool.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                    padding: '20px',
                    borderRadius: '24px',
                    background: 'rgba(255, 252, 245, 0.92)',
                    border: '1px solid rgba(120, 53, 15, 0.12)',
                    boxShadow: '0 16px 44px rgba(84, 54, 9, 0.08)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'start',
                      gap: '12px',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <h3 style={{ margin: 0, fontSize: '1.18rem', color: '#111827' }}>{tool.name}</h3>
                        {tool.verified && (
                          <span
                            style={{
                              padding: '5px 9px',
                              borderRadius: '999px',
                              background: '#dcfce7',
                              color: '#166534',
                              fontSize: '0.75rem',
                              fontWeight: 800,
                              textTransform: 'uppercase',
                              letterSpacing: '0.03em',
                            }}
                          >
                            Verified
                          </span>
                        )}
                      </div>
                      <div style={{ marginTop: '7px', color: '#9a3412', fontWeight: 700 }}>
                        {getWhyItWins(tool)}
                      </div>
                    </div>
                    <div
                      style={{
                        minWidth: '70px',
                        textAlign: 'center',
                        borderRadius: '18px',
                        padding: '10px 8px',
                        background: '#111827',
                        color: '#fff7ed',
                      }}
                    >
                      <div style={{ fontSize: '1.15rem', fontWeight: 800 }}>{tool.score}</div>
                      <div style={{ fontSize: '0.72rem', opacity: 0.78 }}>score</div>
                    </div>
                  </div>

                  <p style={{ margin: 0, color: '#4b5563', lineHeight: 1.65 }}>{tool.description}</p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    <span
                      style={{
                        borderRadius: '999px',
                        padding: '7px 10px',
                        background: '#ffedd5',
                        color: '#9a3412',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                      }}
                    >
                      {tool.category}
                    </span>
                    <span
                      style={{
                        borderRadius: '999px',
                        padding: '7px 10px',
                        background: '#e0f2fe',
                        color: '#075985',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                      }}
                    >
                      {tool.license}
                    </span>
                    <span
                      style={{
                        borderRadius: '999px',
                        padding: '7px 10px',
                        background: '#ede9fe',
                        color: '#5b21b6',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                      }}
                    >
                      {formatStars(tool.stars)} stars
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {tool.platforms.slice(0, 5).map((item) => (
                      <span
                        key={item}
                        style={{
                          borderRadius: '999px',
                          padding: '6px 10px',
                          background: '#fff7ed',
                          color: '#6b7280',
                          fontSize: '0.78rem',
                        }}
                      >
                        {labelPlatform(item)}
                      </span>
                    ))}
                  </div>

                  <div style={{ marginTop: 'auto', display: 'flex', gap: '10px' }}>
                    <Link
                      href={`/tools/${tool.slug}/`}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '16px',
                        background: '#fff7ed',
                        color: '#9a3412',
                        textDecoration: 'none',
                        fontWeight: 800,
                      }}
                    >
                      Dossier
                    </Link>
                    <a
                      href={tool.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        flex: 1,
                        textAlign: 'center',
                        padding: '12px 14px',
                        borderRadius: '16px',
                        background: '#111827',
                        color: '#fff7ed',
                        textDecoration: 'none',
                        fontWeight: 800,
                      }}
                    >
                      Open source
                    </a>
                    <a
                      href={`https://www.google.com/search?q=${encodeURIComponent(`${tool.name} review`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: '12px 14px',
                        borderRadius: '16px',
                        border: '1px solid rgba(120, 53, 15, 0.16)',
                        color: '#6b7280',
                        textDecoration: 'none',
                        fontWeight: 700,
                      }}
                    >
                      Research
                    </a>
                  </div>
                </article>
              ))
            ) : (
              <div
                style={{
                  gridColumn: '1 / -1',
                  padding: '28px',
                  borderRadius: '24px',
                  background: 'rgba(255, 252, 245, 0.92)',
                  border: '1px solid rgba(120, 53, 15, 0.12)',
                  color: '#6b7280',
                  lineHeight: 1.7,
                }}
              >
                No tools match that combination yet. Try resetting filters or searching for a broader problem space.
              </div>
            )}
          </div>
        </section>

        <section className="rise-in" style={{ marginTop: '28px', animationDelay: '0.29s' }}>
          <div
            style={{
              padding: '24px',
              borderRadius: '28px',
              background: 'rgba(255, 252, 245, 0.92)',
              border: '1px solid rgba(120, 53, 15, 0.12)',
              boxShadow: '0 16px 44px rgba(84, 54, 9, 0.08)',
            }}
          >
            <div
              style={{
                fontSize: '0.82rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#9a3412',
                fontWeight: 800,
              }}
            >
              Make it a thing
            </div>
            <h2 style={{ margin: '8px 0 10px', fontSize: '2rem', color: '#111827' }}>
              OpenToolkit needs a product flywheel
            </h2>
            <p style={{ margin: '0 0 18px', color: '#6b7280', lineHeight: 1.75, maxWidth: '820px' }}>
              A memorable project here is not “500 tools online”. It is a repeatable system for discovering,
              curating, packaging, and recommending open-source stacks with taste.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '14px',
              }}
            >
              {productLoops.map((loop) => (
                <div
                  key={loop.title}
                  style={{
                    padding: '18px',
                    borderRadius: '22px',
                    background: '#fffaf0',
                    border: '1px solid rgba(120, 53, 15, 0.1)',
                  }}
                >
                  <div style={{ fontWeight: 800, color: '#111827', fontSize: '1rem' }}>{loop.title}</div>
                  <div style={{ marginTop: '8px', color: '#6b7280', lineHeight: 1.65, fontSize: '0.94rem' }}>
                    {loop.body}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer
          className="rise-in"
          style={{
            marginTop: '34px',
            animationDelay: '0.32s',
            padding: '28px',
            borderRadius: '28px',
            background: '#111827',
            color: '#fff7ed',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '18px',
          }}
        >
          <div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>OpenToolkit</div>
            <p style={{ margin: '10px 0 0', lineHeight: 1.7, color: 'rgba(255,247,237,0.76)' }}>
              The next version should become the place people go to assemble a sovereign software stack, not
              just browse a catalog.
            </p>
          </div>
          <div>
            <div style={{ fontWeight: 800, marginBottom: '10px' }}>High-value next moves</div>
            <div style={{ color: 'rgba(255,247,237,0.76)', lineHeight: 1.8 }}>
              Add compare + shortlist logic for tools.
              <br />
              Add submission + review workflows.
              <br />
              Add editorial guides and regional collections.
            </div>
          </div>
          <div>
            <a
              href="https://github.com/OC-Empire/opentoolkit"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#fbbf24', textDecoration: 'none', fontWeight: 800 }}
            >
              View GitHub
            </a>
          </div>
        </footer>
      </div>
    </div>
  )
}
