import { useState, useEffect } from 'react'
import tools from '../data/tools.json'
import Fuse from 'fuse.js'

export default function Home() {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState(tools.tools.slice(0, 50))
  const [fuse, setFuse] = useState<Fuse<any> | null>(null)

  useEffect(() => {
    const fuseInstance = new Fuse(tools.tools, {
      keys: ['name', 'description', 'category', 'categories'],
      threshold: 0.3
    })
    setFuse(fuseInstance)
  }, [])

  useEffect(() => {
    if (!fuse || !search) {
      setResults(tools.tools.slice(0, 50))
      return
    }
    const searchResults = fuse.search(search).map(r => r.item)
    setResults(searchResults.slice(0, 50))
  }, [search, fuse])

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0d1117 0%, #161b22 100%)',
      color: '#c9d1d9',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: '800',
            background: 'linear-gradient(90deg, #58a6ff, #a371f7)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '10px'
          }}>
            🔧 OpenToolkit
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#8b949e' }}>
            500 Open Source Tools for Developers, Privacy & Automation
          </p>
          <div style={{ 
            display: 'inline-flex', 
            gap: '20px', 
            marginTop: '20px',
            padding: '15px 30px',
            background: 'rgba(88, 166, 255, 0.1)',
            borderRadius: '12px',
            border: '1px solid rgba(88, 166, 255, 0.3)'
          }}>
            <div><strong>{tools.metadata.totalTools}</strong> Tools</div>
            <div><strong>{new Set(tools.tools.map(t => t.category)).size}</strong> Categories</div>
            <div><strong>{(tools.tools.reduce((a, t) => a + t.score, 0) / tools.tools.length).toFixed(1)}</strong> Avg Score</div>
          </div>
        </div>

        {/* Search */}
        <div style={{ marginBottom: '30px' }}>
          <input
            type="text"
            placeholder="Search 500+ tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '15px 25px',
              fontSize: '1.1rem',
              borderRadius: '12px',
              border: '2px solid #30363d',
              background: '#0d1117',
              color: '#c9d1d9',
              outline: 'none'
            }}
          />
        </div>

        {/* Tools Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '20px'
        }}>
          {results.map((tool: any) => (
            <div key={tool.id} style={{
              padding: '20px',
              background: 'rgba(22, 27, 34, 0.8)',
              borderRadius: '12px',
              border: '1px solid #30363d',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)'
            }} onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                <h3 style={{ margin: 0, color: '#58a6ff', fontSize: '1.2rem' }}>{tool.name}</h3>
                <span style={{ 
                  padding: '4px 10px', 
                  background: 'rgba(88, 166, 255, 0.2)', 
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  color: '#58a6ff'
                }}>{tool.score}/100</span>
              </div>
              <p style={{ margin: '0 0 15px 0', color: '#8b949e', fontSize: '0.95rem', lineHeight: '1.5' }}>
                {tool.description}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ 
                  padding: '4px 12px', 
                  background: 'rgba(163, 113, 247, 0.2)', 
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  color: '#a371f7'
                }}>{tool.category}</span>
                <a href={tool.sourceUrl} target="_blank" rel="noopener noreferrer" style={{
                  color: '#58a6ff',
                  textDecoration: 'none',
                  fontSize: '0.9rem'
                }}>View →</a>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: '60px', padding: '40px', color: '#8b949e' }}>
          <p>🚀 Built with full automation • 500 tools • Open Source</p>
          <p style={{ fontSize: '0.9rem' }}>
            <a href="https://github.com/OC-Empire/opentoolkit" style={{ color: '#58a6ff' }}>GitHub</a>
          </p>
        </div>
      </div>
    </div>
  )
}