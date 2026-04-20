# OpenToolkit Tool Expansion Plan

## 🎯 Goal
Expand the **OpenToolkit Seed Database** from **~50 tools** to **500+ tools**, covering **10+ categories** with **global depth and variety**.

**Status**: Global-Ready | Multi-Source | Automated Curation

---

## 📚 Categories & Targets
| Category          | Current | Target | Global Sources                                                                 |
|-------------------|---------|--------|--------------------------------------------------------------------------------|
| **Privacy**       | 8       | 60     | FMHY, PrivacyTools.io, Awesome Privacy, r/Privacy, Prism-Break, That One Privacy Site |
| **AI/ML**         | 7       | 70     | Awesome ML, LocalLLaMA, HuggingFace, Papers With Code, r/MachineLearning      |
| **Development**   | 5       | 80     | Awesome Lists (dev), GitHub Trending, r/programming, Dev.to, Hacker News      |
| **Productivity**  | 5       | 60     | FMHY, Awesome Productivity, r/productivity, AlternativeTo, Product Hunt        |
| **Security**      | 3       | 50     | Awesome Security, CTF Tools, r/netsec, Security Today, SANS Tools             |
| **Creative**      | 6       | 40     | Awesome Design, r/Design, OpenSourceDesign, LibreGraphics, Blender Community |
| **Gaming**        | 5       | 40     | Awesome Emulation, r/emulation, RetroArch, Dolphin, RPCS3 communities         |
| **Learning**      | 4       | 40     | Awesome Education, r/edtech, OpenEdX, Moodle, OSSU (Open Source Society)        |
| **Communication** | 2       | 30     | Awesome Chat, Matrix, XMPP, Fediverse, Session, SimpleX communities         |
| **System**        | 2       | 30     | Awesome Selfhosted, r/selfhosted, r/homelab, LinuxServer.io                 |
| **Total**         | **47**  | **500**|                                                                                |

---

## 🔍 Sourcing Strategy
### A. FMHY (Freemedia Heck Yeah)
- **Why**: The gold standard for open-source tools. Covers **every category** with depth.
- **How**:
  - Scrape **FMHY’s GitHub** ([https://github.com/fmhy/FMHY](https://github.com/fmhy/FMHY)) for tools.
  - Focus on **underrated gems** (e.g., tools with <1k stars but high utility).
  - **Avoid**: Paywalled software, proprietary tools, or anything with trackers.

### B. GitHub Awesome Lists
- **Why**: Curated lists for **AI, Development, Privacy, Gaming**.
- **How**:
  - Search GitHub for `awesome-<category>` (e.g., `awesome-privacy`, `awesome-ai`).
  - Example: [https://github.com/pluja/awesome-privacy](https://github.com/pluja/awesome-privacy).

### C. Reddit & Forums
- **Why**: Community-driven discoveries (e.g., r/Privacy, r/selfhosted).
- **How**:
  - Scrape **top posts** from relevant subreddits (last 6 months).
  - Example: [https://www.reddit.com/r/privacy/top/?t=year](https://www.reddit.com/r/privacy/top/?t=year).

### D. Privacy & Security Blogs
- **Why**: Deep dives into **anti-censorship, VPNs, encryption**.
- **How**:
  - Parse **PrivacyTools.io**, **Techlore**, **Restore Privacy**.
  - Example: [https://www.privacytools.io/](https://www.privacytools.io/).

### E. Global Discovery Networks
- **AlternativeTo**: Find open-source alternatives to popular software
- **Product Hunt**: Daily discoveries, filter by open-source
- **Hacker News**: "Show HN" posts, monthly "Who is hiring" threads
- **Dev.to / Hashnode**: Developer tool roundups
- **YouTube**: Tech review channels (Mental Outlaw, DistroTube, etc.)

---

## 🛠️ Tool Criteria
1. **Open-Source**: MIT, GPL, AGPL, Apache, or similar.
2. **Active Development**: Updated in the last **12 months**.
3. **No Trackers**: No telemetry, no ads, no paywalls.
4. **Cross-Platform**: Windows, macOS, Linux, Android, iOS, Browser, or Self-hosted
5. **Global Reach**: Works worldwide without region restrictions (VPN/proxy tools are exception)

---

## ⚡ Expansion Roadmap: 47 → 500 Tools

### Phase 1: Foundation (47 → 100 tools) - Week 1
- **Multi-Source Scrape**: FMHY + 5 Awesome Lists simultaneously
- **Validation Pipeline**: Auto-check licenses, activity, quality scores
- **Deduplication**: Merge overlaps, keep highest quality entries

### Phase 2: Scale (100 → 250 tools) - Week 2-3
- **Global Expansion**: Source from 10+ countries, 5+ languages
- **Category Deep-Dive**: Fill gaps in underrepresented categories
- **Community Submissions**: Open GitHub Issue Forms, validate 50+ submissions

### Phase 3: Comprehensive (250 → 500 tools) - Week 4-6
- **Niche Discovery**: Specialized tools (CLI, self-hosted, developer utilities)
- **Quality Threshold**: Maintain 60+ score average, manual review for <70 scores
- **Global Balance**: Ensure representation from all continents, major languages

### Phase 4: Maintenance (500+ tools) - Ongoing
- **Weekly Scrapes**: Auto-discover new tools from awesome lists
- **Monthly Audits**: Remove dead projects, update scores, refresh metadata
- **Quarterly Reviews**: Community voting for featured tools, category rebalancing

---

## 📋 Example Tools to Add
### Privacy & Sovereignty
| Tool               | Description                                  | Source                                      | License    |
|--------------------|----------------------------------------------|---------------------------------------------|------------|
| **Session**        | Encrypted messenger (no phone number).       | [https://github.com/oxen-io](https://github.com/oxen-io) | GPL-3.0    |
| **Cryptomator**    | Client-side encryption for cloud storage.    | [https://github.com/cryptomator](https://github.com/cryptomator) | MIT        |
| **OnionShare**     | Securely share files via Tor.                | [https://github.com/onionshare](https://github.com/onionshare) | GPL-3.0    |
| **Psiphon**        | Anti-censorship tool.                        | [https://github.com/Psiphon-Inc](https://github.com/Psiphon-Inc) | GPL-3.0    |
| **Lantern**        | Peer-to-peer internet circumvention.         | [https://github.com/getlantern](https://github.com/getlantern) | Apache-2.0 |

### AI Agents
| Tool               | Description                                  | Source                                      | License    |
|--------------------|----------------------------------------------|---------------------------------------------|------------|
| **AutoGPT**        | Autonomous AI agent.                         | [https://github.com/Significant-Gravitas](https://github.com/Significant-Gravitas) | MIT        |
| **BabyAGI**        | Task-driven autonomous agent.                | [https://github.com/yoheinakajima](https://github.com/yoheinakajima) | MIT        |
| **LangChain**      | Framework for building AI apps.              | [https://github.com/langchain-ai](https://github.com/langchain-ai) | MIT        |
| **GPT4All**        | Run LLMs locally.                            | [https://github.com/nomic-ai](https://github.com/nomic-ai) | MIT        |

### Development
| Tool               | Description                                  | Source                                      | License    |
|--------------------|----------------------------------------------|---------------------------------------------|------------|
| **Neovim**         | Hyperextensible Vim-based editor.            | [https://github.com/neovim](https://github.com/neovim) | Apache-2.0 |
| **Lapce**          | Rust-based code editor.                      | [https://github.com/lapce](https://github.com/lapce) | Apache-2.0 |
| **Zed**            | High-performance code editor.                | [https://github.com/zed-industries](https://github.com/zed-industries) | AGPL-3.0   |
| **RustDesk**       | Remote desktop (self-hostable).              | [https://github.com/rustdesk](https://github.com/rustdesk) | AGPL-3.0   |

### Gaming & Creative
| Tool               | Description                                  | Source                                      | License    |
|--------------------|----------------------------------------------|---------------------------------------------|------------|
| **RetroArch**      | Frontend for emulators.                      | [https://github.com/libretro](https://github.com/libretro) | GPL-3.0    |
| **Dolphin**        | GameCube/Wii emulator.                       | [https://github.com/dolphin-emu](https://github.com/dolphin-emu) | GPL-2.0    |
| **Krita**          | Digital painting app.                        | [https://github.com/KDE](https://github.com/KDE) | GPL-3.0    |
| **Blender**        | 3D modeling and animation.                   | [https://github.com/blender](https://github.com/blender) | GPL-3.0    |

---

## 🔄 Automation Plan
1. **GitHub Actions**: Weekly scrape of **FMHY, Awesome Lists, Reddit** for new tools.
2. **OpenClaw Agent**: Use **Sultan** (research scout) to validate tools (check license, activity, etc.).
3. **GitHub Issue Form**: Community submissions auto-checked by **Nana Patekar** (validator).
4. **Vercel Edge Functions**: Auto-update `tools.json` on new submissions.

---

## 🔗 Related Notes
- [[OpenToolkit-Seed-Database]] (Current tools).
- [[GitHub-Integration]] (Automation setup).
- [[Website-Wireframes]] (UI/UX design).
- [[Why-OpenToolkit]] (Mission alignment).