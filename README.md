# 🔧 OpenToolkit

**500 Open Source Tools for Developers, Privacy & Automation**

[![Tools](https://img.shields.io/badge/Tools-500-blue)](https://opentoolkit.vercel.app)
[![Score](https://img.shields.io/badge/Avg%20Score-88.8%2F100-green)](https://opentoolkit.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)

🚀 **Live Demo**: [https://opentoolkit.vercel.app](https://opentoolkit.vercel.app)

---

## ✨ Features

- 🔍 **Fuse.js Search** - Instant fuzzy search across 500+ tools
- 📊 **10 Categories** - Development, Security, AI, Privacy, System & more
- ⭐ **Quality Scoring** - Each tool rated 0-100 based on popularity, activity, docs
- 🌐 **Open Source** - Fully transparent, community-driven
- ⚡ **Fast** - Static site with edge deployment

---

## 📊 Stats

| Category | Tools | % |
|----------|-------|---|
| Development | 256 | 51.2% |
| System | 59 | 11.8% |
| Security | 57 | 11.4% |
| AI | 51 | 10.2% |
| Privacy | 35 | 7.0% |
| Productivity | 14 | 2.8% |
| Communication | 10 | 2.0% |
| Creative | 9 | 1.8% |
| Gaming | 5 | 1.0% |
| Learning | 4 | 0.8% |

**Average Score**: 88.8/100

---

## 🛠️ Top Tools

- **uBlock Origin** (98/100) - Privacy
- **Git** (98/100) - Development
- **Signal** (97/100) - Communication
- **Blender** (97/100) - Creative
- **Bitwarden** (96/100) - Security
- **Ollama** (96/100) - AI
- **Kubernetes** (96/100) - Development

---

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/OC-Empire/opentoolkit.git
cd opentoolkit

# Open index.html in browser
open index.html
```

---

## 📝 Data Format

Tools are stored in `data/tools.json` with the following schema:

```json
{
  "id": "tool-001",
  "slug": "signal",
  "name": "Signal",
  "description": "Encrypted messaging app",
  "sourceUrl": "https://github.com/signalapp",
  "sourceType": "github",
  "verified": true,
  "license": "AGPL-3.0",
  "stars": 12000,
  "category": "Communication",
  "categories": ["Communication", "Privacy"],
  "platforms": ["android", "ios", "desktop"],
  "score": 97
}
```

---

## 🤝 Contributing

1. Fork the repository
2. Add your tool to `data/tools.json`
3. Submit a PR

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file

---

Built with ❤️ and full automation