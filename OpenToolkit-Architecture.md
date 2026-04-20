# OpenToolkit Architecture v2.0 - Bulletproof Foundation
**Status**: Global Scale | 500+ Tools | Production-Ready

---

## 🏗️ Data Architecture

### Core Schema (Validated)
```typescript
interface Tool {
  id: string;                    // UUID v4, immutable
  slug: string;                  // URL-friendly name (unique)
  name: string;                  // Display name
  description: string;            // Max 280 chars (Twitter-style)
  longDescription?: string;      // Max 2000 chars
  
  // Source & Verification
  sourceUrl: string;             // Primary GitHub/GitLab URL
  sourceType: 'github' | 'gitlab' | 'sourcehut' | 'other';
  verified: boolean;             // Manual review passed
  verifiedAt?: string;           // ISO 8601 timestamp
  verifiedBy?: string;           // Agent or human reviewer
  
  // Metadata
  license: string;               // SPDX identifier
  licenses: string[];            // All detected licenses
  stars?: number;                // GitHub stars (cached)
  lastCommitAt?: string;         // ISO 8601, auto-updated
  createdAt: string;             // Tool birth date
  addedAt: string;               // When added to OpenToolkit
  
  // Categorization
  category: string;              // Primary category
  categories: string[];          // All applicable tags
  platforms: ('windows' | 'macos' | 'linux' | 'android' | 'ios' | 'web' | 'self-hosted')[];
  
  // Global Attributes
  languages: string[];           // Interface languages (ISO 639-1)
  regions: string[];             // Recommended regions (ISO 3166)
  isGlobal: boolean;             // Works worldwide without restrictions
  
  // Quality Metrics
  score: number;                 // 0-100 calculated score
  metrics: {
    activity: number;            // 0-25 (commit frequency)
    popularity: number;          // 0-25 (stars/forks)
    documentation: number;     // 0-25 (README quality)
    testCoverage?: number;       // 0-25 (if available)
  };
  
  // Media
  iconUrl?: string;              // 128x128 PNG/SVG
  screenshots?: string[];        // Max 5 URLs
  demoUrl?: string;             // Live demo/video
  
  // Relations
  alternatives?: string[];       // Tool slugs (competitors)
  complements?: string[];        // Tool slugs (works well with)
  parentTool?: string;           // Slug (if fork/variant)
  
  // Automation
  autoUpdate: boolean;          // Allow bot updates
  lastScrapedAt?: string;        // When metrics were last fetched
  scraperVersion: string;        // Version of scraper that added this
}
```

### Data Integrity Rules
1. **Primary Key**: `slug` (unique, immutable after creation)
2. **Deduplication**: `sourceUrl` must be unique (prevents same tool from multiple sources)
3. **Validation**: All tools pass Zod schema validation before persistence
4. **Versioning**: Full git history of `tools.json` (every change is tracked)
5. **Backup**: Daily export to `tools-backup-YYYY-MM-DD.json`

### Storage Strategy
```
/data
  ├── tools.json                 # Master database (500+ tools)
  ├── tools.schema.json          # JSON Schema for validation
  ├── tools-backup/              # Daily snapshots
  ├── pending/                   # Tools awaiting verification
  │   └── pending-tools.json
  └── archive/                   # Removed/deprecated tools
      └── archived-tools.json
```

---

## 🔍 Search & Scale Architecture

### For 500+ Tools: Search-First UI
- **No pagination**: Infinite scroll with virtualized list (react-window)
- **Instant search**: Fuse.js or Lunr.js with pre-built index
- **Faceted filtering**: Category, platform, license, language, score range
- **Performance budget**: 
  - Initial render: < 100ms
  - Search response: < 50ms
  - Image lazy load: Intersection Observer API

### Database Indexing
```json
{
  "indexes": {
    "byCategory": "tools grouped by primary category",
    "byPlatform": "tools grouped by supported platforms",
    "byLicense": "tools grouped by license type",
    "byScore": "tools sorted by quality score (desc)",
    "searchIndex": "Fuse.js optimized for name + description + tags"
  }
}
```

---

## 🤖 Automation Pipeline

### GitHub Issue Forms (Real Templates)
**Location**: `.github/ISSUE_TEMPLATE/add-tool.yml`
```yaml
name: Add Tool
description: Submit a new open-source tool to OpenToolkit
title: "[Tool] "
labels: ["tool-submission", "pending-review"]
body:
  - type: input
    id: name
    attributes:
      label: Tool Name
      placeholder: e.g., Signal
    validations:
      required: true
  
  - type: input
    id: sourceUrl
    attributes:
      label: Source URL (GitHub/GitLab)
      placeholder: https://github.com/...
    validations:
      required: true
      pattern: "^https://(github|gitlab).com/.*"
  
  - type: dropdown
    id: category
    attributes:
      label: Primary Category
      options:
        - Privacy
        - AI
        - Gaming
        - Creative
        - Learning
        - Productivity
        - Development
        - Security
        - Communication
        - System
    validations:
      required: true
  
  - type: textarea
    id: description
    attributes:
      label: Description (What does it do?)
      placeholder: Max 280 characters...
    validations:
      required: true
      maxLength: 280
  
  - type: checkboxes
    id: platforms
    attributes:
      label: Supported Platforms
      options:
        - label: Windows
        - label: macOS
        - label: Linux
        - label: Android
        - label: iOS
        - label: Web/Browser
        - label: Self-hosted
  
  - type: input
    id: license
    attributes:
      label: License (SPDX identifier)
      placeholder: MIT, GPL-3.0, AGPL-3.0, Apache-2.0
    validations:
      required: true
```

### GitHub Actions Workflow
**Location**: `.github/workflows/process-submissions.yml`
```yaml
name: Process Tool Submissions
on:
  issues:
    types: [opened, labeled]
  schedule:
    - cron: '0 */6 * * *'  # Every 6 hours
  workflow_dispatch:

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm install zod fuse.js
      
      - name: Validate pending tools
        run: node scripts/validate-tools.js
      
      - name: Scrape metadata
        run: node scripts/scrape-metadata.js
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Update database
        run: node scripts/update-database.js
      
      - name: Commit changes
        uses: stefanzweifel/git-auto-commit-action@v5
        with:
          commit_message: "chore: update tools database [automated]"
          file_pattern: 'data/tools.json'
```

### Validation Agents (OpenClaw)
1. **Sultan** (Research Scout): Finds tools from awesome lists
2. **Nana Patekar** (Validator): Checks license, activity, quality
3. **Bernard Shaw** (Describer): Writes compelling descriptions
4. **Raj** (Tech Reviewer): Verifies platforms, builds, tests

---

## 🌍 Global Architecture

### Internationalization (i18n)
```typescript
interface LocalizedContent {
  en: { name: string; description: string; };
  es?: { name: string; description: string; };
  fr?: { name: string; description: string; };
  ar?: { name: string; description: string; };
  // ... 20+ languages
}
```

### RTL Support
- All UI components support RTL (right-to-left) layouts
- Arabic, Hebrew, Persian tool names render correctly
- CSS logical properties: `margin-inline-start` instead of `margin-left`

### Regional Compliance
- **GDPR**: No tracking without consent
- **Global CDN**: Vercel Edge Network (not region-locked)
- **Accessibility**: WCAG 2.1 AA compliance

---

## 📊 Quality Rubric (0-100 Score)

| Metric | Weight | Criteria |
|--------|--------|----------|
| **Activity** | 25% | Last commit < 3 months = 25pts, < 6mo = 15pts, < 12mo = 5pts, >12mo = 0pts |
| **Popularity** | 25% | Stars: >10k=25pts, >1k=20pts, >100=10pts, <100=5pts |
| **Documentation** | 25% | Has README=5pts, has CONTRIBUTING=5pts, has LICENSE=5pts, has screenshots=5pts, has docs site=5pts |
| **Code Quality** | 25% | Has tests=10pts, CI/CD=5pts, security policy=5pts, dependency updates=5pts |

**Minimum Score for Inclusion**: 60/100
**Featured Tools**: 85/100+

---

## 🔐 Security & Trust

### Verification Levels
1. **Level 1 (Auto)**: Schema validation + automated checks
2. **Level 2 (Bot)**: OpenClaw agent review (license, activity)
3. **Level 3 (Human)**: Manual review for featured tools
4. **Level 4 (Audited)**: Security audit for cryptography tools

### Red Flags (Auto-Reject)
- No license file
- Last commit > 2 years ago
- Binary-only releases (no source)
- Known malware/adware
- Proprietary dependencies required

---

## 🚀 Deployment Architecture

### Vercel Configuration
```json
{
  "functions": {
    "api/search.ts": {
      "maxDuration": 5
    },
    "api/submit.ts": {
      "maxDuration": 10
    }
  },
  "crons": [
    {
      "path": "/api/scrape",
      "schedule": "0 4 * * *"
    }
  ]
}
```

### Environment Variables
```bash
# Required
GITHUB_TOKEN=ghp_xxx
DATABASE_URL=https://raw.githubusercontent.com/OC-Empire/opentoolkit/main/data/tools.json

# Optional
ALGOLIA_APP_ID=xxx
ALGOLIA_API_KEY=xxx
SENTRY_DSN=xxx
```

---

## 📈 Success Metrics

### Technical
- [ ] Database: 500+ verified tools
- [ ] Performance: <100ms search, <2s initial load
- [ ] Uptime: 99.9% (Vercel SLA)
- [ ] Coverage: 50+ categories, all major platforms

### Community
- [ ] Submissions: 50+ community contributions/month
- [ ] Quality: Average tool score >70/100
- [ ] Global: Tools from 30+ countries
- [ ] Retention: 70%+ returning visitors

---

## 🔗 Related
- [[OpenToolkit Index]]
- [[UI-UX-Magic-v2]] (Updated for scale)
- [[Tool-Expansion-Plan-v2]] (500 tool roadmap)
- [[GitHub-Integration]]
- [[Vercel-Project]]
