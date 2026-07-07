import toolkit from '../data/tools.json'

export type Tool = {
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

export type StackRecipe = {
  slug: string
  name: string
  promise: string
  outcome: string
  audience: string
  difficulty: 'Easy' | 'Moderate' | 'Advanced'
  steps: string[]
  toolNames: string[]
}

export type CompareGuide = {
  slug: string
  title: string
  summary: string
  question: string
  lens: string
  winnerFor: string
  tradeoff: string
  toolSlugs: [string, string]
}

export type MigrationGuide = {
  slug: string
  title: string
  from: string
  toward: string
  promise: string
  painLevel: 'Low' | 'Medium' | 'High'
  whyNow: string
  replacements: string[]
  steps: string[]
}

export type Collection = {
  slug: string
  title: string
  description: string
  angle: string
  thesis: string
  tags: string[]
  toolNames: string[]
}

export type RankingLane = {
  slug: string
  title: string
  description: string
  toolSlugs: string[]
}

export type RadarEntry = {
  slug: string
  title: string
  status: 'Rising' | 'Watchlist' | 'Stable' | 'Hot'
  whyItMatters: string
  toolNames: string[]
}

export const allTools = toolkit.tools as Tool[]

export const stackRecipes: StackRecipe[] = [
  {
    slug: 'privacy-starter-stack',
    name: 'Privacy Starter Stack',
    promise: 'Replace surveillance-heavy defaults with a cleaner daily setup.',
    outcome: 'A sane base layer for browsing, messaging, passwords, and search hygiene.',
    audience: 'People trying to get out of default Big Tech habits without becoming a sysadmin.',
    difficulty: 'Easy',
    steps: [
      'Harden browsing and ad and tracker blocking first.',
      'Move passwords into an audited manager.',
      'Shift private messaging to an encrypted default.',
      'Add network-level privacy only after the basics are in place.',
    ],
    toolNames: ['uBlock Origin', 'Firefox', 'Bitwarden', 'Signal', 'NextDNS'],
  },
  {
    slug: 'local-ai-builder-stack',
    name: 'Local AI Builder Stack',
    promise: 'Build, test, and think with local-first tooling.',
    outcome: 'A working environment for coding, note-making, and running models without handing everything to APIs.',
    audience: 'Builders who want speed, privacy, and experimentation without cloud dependence.',
    difficulty: 'Moderate',
    steps: [
      'Set up your editor and note system first.',
      'Run local models for iteration and drafting.',
      'Keep project context and artifacts in a durable knowledge tool.',
      'Add sync or collaboration only where it actually helps.',
    ],
    toolNames: ['VS Code', 'Ollama', 'Obsidian', 'Joplin', 'Nextcloud'],
  },
  {
    slug: 'self-host-core-stack',
    name: 'Self-Host Core Stack',
    promise: 'Own the base services most people rent from the cloud.',
    outcome: 'Storage, media, automation, and network control under your own roof.',
    audience: 'People moving from privacy-curious into real operational control.',
    difficulty: 'Advanced',
    steps: [
      'Start with file sync and backup so the payoff is immediate.',
      'Add DNS and network filtering for broad impact.',
      'Layer in media and home control after the core is stable.',
      'Document the stack so it can be rebuilt cleanly.',
    ],
    toolNames: ['Nextcloud', 'Pi-hole', 'Immich', 'Home Assistant', 'Vaultwarden'],
  },
  {
    slug: 'android-freedom-stack',
    name: 'Android Freedom Stack',
    promise: 'Build a more sovereign Android setup without the Play Store as the center of gravity.',
    outcome: 'A practical mobile stack for app discovery, updates, privacy, and secure communication.',
    audience: 'Android users who want more control without turning the phone into a hobby project.',
    difficulty: 'Moderate',
    steps: [
      'Replace app discovery and updates first.',
      'Swap in secure communication and password management.',
      'Add privacy tooling at the network and system layer.',
      'Keep the setup maintainable and avoid exotic hacks unless the payoff is clear.',
    ],
    toolNames: ['F-Droid', 'Obtainium', 'Signal', 'Bitwarden', 'AdAway'],
  },
  {
    slug: 'hosted-privacy-calm-stack',
    name: 'Hosted Privacy Calm Stack',
    promise: 'Get most of the privacy upside without inheriting a weekend job as an infrastructure operator.',
    outcome: 'Mail, VPN, photos, and passwords with lower surveillance and lower maintenance.',
    audience: 'People who want better defaults but do not want to self-host right now.',
    difficulty: 'Easy',
    steps: [
      'Start with communication and passwords so daily trust improves first.',
      'Add VPN and private photo storage only after the account layer is settled.',
      'Keep the stack boring enough that you actually stick with it.',
      'Revisit self-hosting only if your needs become more complex later.',
    ],
    toolNames: ['Tuta', 'Mullvad VPN', 'Ente', 'Bitwarden', 'Firefox'],
  },
  {
    slug: 'creator-media-stack',
    name: 'Creator Media Stack',
    promise: 'Build a serious open creator workflow around capture, editing, and publishing.',
    outcome: 'A cleaner media pipeline for streaming, editing, asset prep, and long-term ownership.',
    audience: 'Creators who want capable tools without getting trapped in expensive creative suites.',
    difficulty: 'Moderate',
    steps: [
      'Secure capture and live output first.',
      'Build editing and transcoding around durable open formats.',
      'Separate archive, media library, and publishing paths.',
      'Only add complexity that helps output quality or reuse.',
    ],
    toolNames: ['OBS Studio', 'FFmpeg', 'Blender', 'Krita', 'Jellyfin'],
  },
  {
    slug: 'knowledge-vault-stack',
    name: 'Knowledge Vault Stack',
    promise: 'Turn notes, documents, links, and files into a coherent personal knowledge system.',
    outcome: 'A durable second-brain stack with clear ownership and less fragmentation.',
    audience: 'Researchers, writers, and operators who think in notes, files, and evolving context.',
    difficulty: 'Moderate',
    steps: [
      'Pick the main thinking surface first.',
      'Add document archive and file sync as support layers.',
      'Keep capture light and retrieval dependable.',
      'Avoid duplicating the same knowledge across too many apps.',
    ],
    toolNames: ['Obsidian', 'Joplin', 'Paperless-ngx', 'Nextcloud', 'Linkding'],
  },
]

export const compareGuides: CompareGuide[] = [
  {
    slug: 'firefox-vs-brave',
    title: 'Firefox vs Brave',
    summary: 'Two strong privacy browsers with very different philosophies.',
    question: 'Do you want an open web platform standard-bearer or a batteries-included privacy default?',
    lens: 'Browser choice sets the tone for your entire stack.',
    winnerFor: 'Firefox wins for ecosystem independence. Brave wins for out-of-the-box hardening.',
    tradeoff: 'Firefox asks you to shape it. Brave gives you defaults but carries more product opinion.',
    toolSlugs: ['firefox', 'brave-browser'],
  },
  {
    slug: 'bitwarden-vs-keepassxc',
    title: 'Bitwarden vs KeePassXC',
    summary: 'One optimizes sync and daily ease. The other optimizes file-level control.',
    question: 'Do you want a cloud-synced password system or a vault you fully manage yourself?',
    lens: 'Password tooling is where convenience and sovereignty collide hardest.',
    winnerFor: 'Bitwarden wins for teams and daily convenience. KeePassXC wins for offline control.',
    tradeoff: 'Bitwarden lowers friction. KeePassXC lowers dependency.',
    toolSlugs: ['bitwarden', 'keepassxc'],
  },
  {
    slug: 'nextcloud-vs-proton-drive',
    title: 'Nextcloud vs Ente',
    summary: 'Self-hosted control versus privacy-first hosted simplicity.',
    question: 'Do you want total extensibility or a cleaner managed privacy product?',
    lens: 'Storage tools reveal how far someone is willing to go for control.',
    winnerFor: 'Nextcloud wins for sovereignty and extensibility. Ente wins for cleaner hosted privacy and lower operational load.',
    tradeoff: 'Nextcloud demands competence. Ente trades some control for calm.',
    toolSlugs: ['nextcloud', 'ente'],
  },
  {
    slug: 'mullvad-vs-proton-vpn',
    title: 'Mullvad VPN vs Proton VPN',
    summary: 'Both are serious privacy VPNs, but they express trust in different ways.',
    question: 'Do you want the most identity-minimizing model or a broader privacy suite with more convenience?',
    lens: 'A VPN is not just a feature list. It is a trust relationship and an operational philosophy.',
    winnerFor: 'Mullvad wins for minimal identity dependence. Proton VPN wins for ecosystem fit and broader mainstream usability.',
    tradeoff: 'Mullvad is purer. Proton is broader.',
    toolSlugs: ['mullvad-vpn', 'proton-vpn'],
  },
  {
    slug: 'obsidian-vs-joplin',
    title: 'Obsidian vs Joplin',
    summary: 'Two strong note systems with different strengths in flexibility, polish, and ideology.',
    question: 'Do you want a highly expressive local vault or a more straightforward open note system?',
    lens: 'Knowledge tools become part of how a person thinks, not just where text is stored.',
    winnerFor: 'Obsidian wins for expressive knowledge workflows. Joplin wins for cleaner open-source note pragmatism.',
    tradeoff: 'Obsidian offers more possibility. Joplin offers more simplicity of governance.',
    toolSlugs: ['obsidian', 'joplin'],
  },
  {
    slug: 'signal-vs-simplex-chat',
    title: 'Signal vs SimpleX Chat',
    summary: 'Secure messaging defaults versus more radical metadata minimization.',
    question: 'Do you want the most broadly usable secure messenger or are you optimizing harder for identity and metadata resistance?',
    lens: 'Messaging choices reveal what tradeoffs someone is willing to make between safety and adoption.',
    winnerFor: 'Signal wins for practical secure default adoption. SimpleX wins for users pushing harder against metadata exposure.',
    tradeoff: 'Signal is easier to bring others into. SimpleX is more ideologically sharp.',
    toolSlugs: ['signal', 'simplex-chat'],
  },
  {
    slug: 'immich-vs-ente',
    title: 'Immich vs Ente',
    summary: 'Self-hosted photo control versus hosted privacy calm.',
    question: 'Do you want your photos under your own roof or in a privacy-first hosted product?',
    lens: 'Photo storage is one of the clearest tests of convenience versus ownership.',
    winnerFor: 'Immich wins for control and extensibility. Ente wins for lower operational burden and cleaner onboarding.',
    tradeoff: 'Immich gives you the keys. Ente gives you less work.',
    toolSlugs: ['immich', 'ente'],
  },
]

export const migrationGuides: MigrationGuide[] = [
  {
    slug: 'leave-google-workspace',
    title: 'Leave Google Workspace',
    from: 'Google Workspace',
    toward: 'A calmer stack you can actually trust',
    promise: 'Replace search, mail, storage, docs, and passwords without detonating your daily workflow.',
    painLevel: 'High',
    whyNow: 'This is the classic sovereignty migration. It is painful because Google is convenient everywhere.',
    replacements: ['Firefox', 'Bitwarden', 'Nextcloud', 'Cryptomator', 'Joplin'],
    steps: [
      'Move passwords first so account switching stops being chaotic.',
      'Shift files and notes into tools with clear export paths.',
      'Move collaboration surfaces only after your private base layer is stable.',
      'Accept a staged migration instead of expecting a one-week clean break.',
    ],
  },
  {
    slug: 'leave-chrome-defaults',
    title: 'Leave Chrome Defaults',
    from: 'Chrome and ad-tech defaults',
    toward: 'A browser layer that works for you instead of against you',
    promise: 'Swap the browser, blocker, search behavior, and password flow with minimal daily friction.',
    painLevel: 'Low',
    whyNow: 'This is the easiest high-impact move most people can make in a single afternoon.',
    replacements: ['Firefox', 'uBlock Origin', 'Bitwarden', 'NextDNS'],
    steps: [
      'Install the new browser and blocker together.',
      'Import or reconnect passwords immediately.',
      'Set privacy defaults before daily use rewires back to old habits.',
      'Keep one fallback profile during the transition and then remove it.',
    ],
  },
  {
    slug: 'leave-rented-cloud-storage',
    title: 'Leave Rented Cloud Storage',
    from: 'Default cloud drive dependence',
    toward: 'Storage with clearer ownership and backup logic',
    promise: 'Move from convenience-only file storage toward something with trust, portability, and resilience.',
    painLevel: 'Medium',
    whyNow: 'Storage becomes the backbone for notes, media, collaboration, and backups.',
    replacements: ['Nextcloud', 'Cryptomator', 'Immich', 'Syncthing'],
    steps: [
      'Decide whether you want hosted privacy or full self-hosting.',
      'Separate cold archive, daily sync, and media before moving everything.',
      'Verify backup and restore behavior before trusting the new system.',
      'Only then point your habits and devices at the new home.',
    ],
  },
  {
    slug: 'leave-default-password-chaos',
    title: 'Leave Default Password Chaos',
    from: 'Browser-stored passwords and scattered notes',
    toward: 'A cleaner identity and credential layer',
    promise: 'Move passwords, secure notes, and recovery habits into a system that survives device changes and account churn.',
    painLevel: 'Low',
    whyNow: 'This is one of the most leveraged upgrades in the whole stack because everything else depends on identity control.',
    replacements: ['Bitwarden', 'KeePassXC', 'Firefox'],
    steps: [
      'Choose whether you want synced convenience or offline control first.',
      'Import existing credentials before changing daily habits.',
      'Audit weak, duplicate, and legacy credentials while moving.',
      'Stabilize recovery methods before you forget how the old system worked.',
    ],
  },
  {
    slug: 'leave-closed-notes-fragmentation',
    title: 'Leave Closed Notes Fragmentation',
    from: 'Scattered note silos and export-hostile productivity tools',
    toward: 'A knowledge system you can keep for years',
    promise: 'Replace trapped notes and disconnected docs with a vault-like thinking environment.',
    painLevel: 'Medium',
    whyNow: 'People discover too late that their thought system is stuck inside a product they do not control.',
    replacements: ['Obsidian', 'Joplin', 'Nextcloud', 'Paperless-ngx'],
    steps: [
      'Pick a canonical note home before importing everything.',
      'Move the highest-value notes first, not the oldest.',
      'Separate archive, active thinking, and reference material.',
      'Keep export and sync paths visible so the new system stays portable.',
    ],
  },
  {
    slug: 'leave-streaming-rentals',
    title: 'Leave Streaming Rentals',
    from: 'Media lives in platforms you do not control',
    toward: 'A media layer with real ownership and portability',
    promise: 'Move toward a stack where your library, playback, and archive strategy belong to you.',
    painLevel: 'Medium',
    whyNow: 'Media platforms keep training people to rent access instead of owning continuity.',
    replacements: ['Jellyfin', 'Navidrome', 'Immich'],
    steps: [
      'Decide whether your real goal is video, music, or photo continuity first.',
      'Build the library and metadata layer before polishing the playback layer.',
      'Keep formats and backup habits open from the beginning.',
      'Only mirror the convenience features that actually matter to your use case.',
    ],
  },
]

export const collections: Collection[] = [
  {
    slug: 'buzz-worthy-stacks',
    title: 'Stacks People Actually Share',
    description: 'Tight, visual, opinionated bundles that work as social proof and starting points.',
    angle: 'These are the bundles that travel well because they solve a recognizable problem fast.',
    thesis: 'The fastest way to make software feel exciting is not more tools, but clearer bundles that solve a visible life problem.',
    tags: ['editorial', 'shareable', 'starter kits'],
    toolNames: ['uBlock Origin', 'Firefox', 'Bitwarden', 'Signal', 'NextDNS'],
  },
  {
    slug: 'sovereign-builder-kit',
    title: 'The Sovereign Builder Kit',
    description: 'The strongest picks for people who build, host, write, and think in public.',
    angle: 'This is the stack language for serious operators who want leverage without dependence.',
    thesis: 'The builder audience does not need generic productivity advice. It needs a stack with power, control, and low dependency drag.',
    tags: ['builders', 'self-hosted', 'local ai'],
    toolNames: ['Ollama', 'VS Code', 'Obsidian', 'Nextcloud', 'Docker'],
  },
  {
    slug: 'anti-default-internet',
    title: 'The Anti-Default Internet',
    description: 'Tools for escaping surveillance-heavy defaults without becoming a martyr.',
    angle: 'The goal is to replace bad defaults with tools that are sane enough to keep using.',
    thesis: 'A privacy project fails when it feels like punishment. The right collection makes better defaults feel calmer, not harder.',
    tags: ['privacy', 'migration', 'identity'],
    toolNames: ['Firefox', 'uBlock Origin', 'Bitwarden', 'Mullvad VPN', 'Tuta'],
  },
  {
    slug: 'quietly-powerful-daily-tools',
    title: 'Quietly Powerful Daily Tools',
    description: 'Tools that make everyday computing calmer, safer, and more durable without asking for ideological purity.',
    angle: 'These are not necessarily the flashiest tools. They are the ones people quietly end up relying on.',
    thesis: 'A strong product brand needs not only radical stacks but also believable daily picks people can adopt without life disruption.',
    tags: ['daily use', 'practical', 'replacements'],
    toolNames: ['Bitwarden', 'Thunderbird', 'Joplin', 'Ente', 'Firefox'],
  },
  {
    slug: 'creator-sovereignty-kit',
    title: 'Creator Sovereignty Kit',
    description: 'An open stack for people who publish, stream, edit, and want their work to outlive platform whims.',
    angle: 'The creator problem is not just tooling quality. It is continuity, formats, archive, and ownership.',
    thesis: 'Creators feel platform dependence earlier than most users, so they are a natural audience for a more sovereign software story.',
    tags: ['creative', 'media', 'ownership'],
    toolNames: ['OBS Studio', 'FFmpeg', 'Blender', 'Krita', 'Jellyfin'],
  },
  {
    slug: 'knowledge-systems-that-last',
    title: 'Knowledge Systems That Last',
    description: 'A collection for notes, documents, references, and thought systems that need to survive tools and trends.',
    angle: 'People do not only want note-taking apps. They want a durable relationship with their own thinking.',
    thesis: 'A long-term knowledge stack should treat notes, files, and retrieval as one system, not isolated choices.',
    tags: ['knowledge', 'research', 'vault'],
    toolNames: ['Obsidian', 'Joplin', 'Paperless-ngx', 'Nextcloud', 'Linkding'],
  },
]

export const rankingLanes: RankingLane[] = [
  {
    slug: 'privacy-commanders',
    title: 'Privacy Commanders',
    description: 'The strongest picks when privacy is the center of gravity, not a side checkbox.',
    toolSlugs: ['ublock-origin', 'firefox', 'mullvad-vpn', 'signal', 'nextdns'],
  },
  {
    slug: 'builder-core',
    title: 'Builder Core',
    description: 'What a modern builder stack looks like when you care about speed, ownership, and depth.',
    toolSlugs: ['ollama', 'docker', 'vscode', 'git', 'nextcloud'],
  },
  {
    slug: 'daily-replacements',
    title: 'Daily Replacements',
    description: 'The tools most likely to improve someone’s digital life without a full ideological conversion.',
    toolSlugs: ['bitwarden', 'joplin', 'ente', 'f-droid', 'thunderbird'],
  },
  {
    slug: 'knowledge-command',
    title: 'Knowledge Command',
    description: 'The best current picks for people turning their notes, files, and references into an actual operating layer.',
    toolSlugs: ['obsidian', 'joplin', 'paperless-ngx', 'nextcloud', 'linkding'],
  },
  {
    slug: 'creator-open-stack',
    title: 'Creator Open Stack',
    description: 'The strongest open creative tools for capture, editing, and media ownership.',
    toolSlugs: ['obs-studio', 'ffmpeg', 'blender', 'krita', 'jellyfin'],
  },
  {
    slug: 'hosted-privacy-calm',
    title: 'Hosted Privacy Calm',
    description: 'The best tools for people who want a calmer privacy stack without immediately becoming self-hosters.',
    toolSlugs: ['mullvad-vpn', 'tuta', 'ente', 'bitwarden', 'firefox'],
  },
]

export const radarEntries: RadarEntry[] = [
  {
    slug: 'local-ai-is-now-normal',
    title: 'Local AI is moving from niche to default curiosity',
    status: 'Hot',
    whyItMatters: 'The moment local AI becomes easy enough, it stops being an ideology and starts being a mainstream product expectation.',
    toolNames: ['Ollama', 'Open WebUI', 'VS Code'],
  },
  {
    slug: 'vault-style-personal-systems',
    title: 'Personal knowledge tools are becoming operating systems',
    status: 'Rising',
    whyItMatters: 'Notes, memory, files, and workflow are collapsing into one layer, and the winning tools are the ones that respect user ownership.',
    toolNames: ['Obsidian', 'Joplin', 'Nextcloud'],
  },
  {
    slug: 'hosted-privacy-without-diy-fatigue',
    title: 'Hosted privacy products are winning people who will never self-host',
    status: 'Stable',
    whyItMatters: 'A lot of people want less surveillance, not more infrastructure. Products that reduce both exposure and operational burden matter.',
    toolNames: ['Tuta', 'Mullvad VPN', 'Ente'],
  },
  {
    slug: 'android-sovereignty-paths',
    title: 'Android freedom is still a gateway into the whole stack',
    status: 'Watchlist',
    whyItMatters: 'Once users see app stores and defaults as optional, they become much more open to changing the rest of their digital life.',
    toolNames: ['F-Droid', 'Obtainium', 'AdAway'],
  },
  {
    slug: 'knowledge-vaults-becoming-primary',
    title: 'Knowledge vaults are becoming the real home screen for serious thinkers',
    status: 'Hot',
    whyItMatters: 'The more people centralize notes, documents, bookmarks, and AI context into one owned layer, the less replaceable that layer becomes.',
    toolNames: ['Obsidian', 'Joplin', 'Paperless-ngx'],
  },
  {
    slug: 'creator-tools-with-ownership',
    title: 'Creators are rediscovering ownership-first media pipelines',
    status: 'Rising',
    whyItMatters: 'Open creative tools become much more attractive when paired with archive, distribution, and playback systems users control.',
    toolNames: ['OBS Studio', 'FFmpeg', 'Blender'],
  },
  {
    slug: 'hosted-privacy-calm-is-growing',
    title: 'Hosted privacy calm is becoming a serious market wedge',
    status: 'Watchlist',
    whyItMatters: 'There is a growing audience that wants better defaults, not more infrastructure, and that demand shapes which tools can break out.',
    toolNames: ['Tuta', 'Ente', 'Proton Mail'],
  },
]

export const productPillars = [
  {
    title: 'Discover',
    body: 'Search by mission, operating system, trust posture, and migration intent instead of drowning in a flat catalog.',
  },
  {
    title: 'Compare',
    body: 'Put real tradeoffs in front of people so they can choose with confidence instead of reading ten scattered blog posts.',
  },
  {
    title: 'Migrate',
    body: 'Turn good intentions into stepwise exits from bad defaults with replacement logic and pain-level clarity.',
  },
  {
    title: 'Compose',
    body: 'Build outcome-driven stacks that feel like a coherent digital life, not a random handful of apps.',
  },
]

export const navigationItems = [
  { href: '/', label: 'Home' },
  { href: '/stacks/', label: 'Stacks' },
  { href: '/compare/', label: 'Compare' },
  { href: '/migrations/', label: 'Migrations' },
  { href: '/collections/', label: 'Collections' },
  { href: '/rankings/', label: 'Rankings' },
  { href: '/radar/', label: 'Radar' },
  { href: '/shortlist/', label: 'Shortlist' },
]

export function getToolBySlug(slug: string) {
  return allTools.find((tool) => tool.slug === slug)
}

export function getToolsByNames(names: string[]) {
  const byName = new Map(allTools.map((tool) => [tool.name, tool]))
  return names.map((name) => byName.get(name)).filter(Boolean) as Tool[]
}

export function getToolsBySlugs(slugs: string[]) {
  const bySlug = new Map(allTools.map((tool) => [tool.slug, tool]))
  return slugs.map((slug) => bySlug.get(slug)).filter(Boolean) as Tool[]
}

export function getRecipeBySlug(slug: string) {
  return stackRecipes.find((recipe) => recipe.slug === slug)
}

export function getCollectionBySlug(slug: string) {
  return collections.find((collection) => collection.slug === slug)
}

export function getRankingLaneBySlug(slug: string) {
  return rankingLanes.find((lane) => lane.slug === slug)
}

export function getCompareBySlug(slug: string) {
  return compareGuides.find((guide) => guide.slug === slug)
}

export function getMigrationBySlug(slug: string) {
  return migrationGuides.find((guide) => guide.slug === slug)
}

export function formatStars(stars: number) {
  if (stars >= 1000) {
    return `${(stars / 1000).toFixed(stars >= 10000 ? 0 : 1)}k`
  }

  return `${stars}`
}

export function labelPlatform(platform: string) {
  return platform === 'self-hosted' ? 'Self-hosted' : platform.charAt(0).toUpperCase() + platform.slice(1)
}

export function getWhyItWins(tool: Tool) {
  if (tool.score >= 97) return 'Elite pick'
  if (tool.platforms.includes('self-hosted')) return 'Own the stack'
  if (tool.category === 'Privacy') return 'Hardens your defaults'
  if (tool.category === 'Development') return 'Fast builder tool'
  if (tool.category === 'AI') return 'Run intelligence locally'
  if (tool.category === 'System') return 'Replaces a cloud dependency'
  return 'Strong open-source option'
}

export function getAlternatives(tool: Tool, limit = 4) {
  return allTools
    .filter((candidate) => candidate.slug !== tool.slug && candidate.category === tool.category)
    .sort((left, right) => {
      if (right.score !== left.score) return right.score - left.score
      return right.stars - left.stars
    })
    .slice(0, limit)
}

export function getComplements(tool: Tool, limit = 4) {
  return allTools
    .filter((candidate) => {
      if (candidate.slug === tool.slug) return false

      const sharedPlatforms = candidate.platforms.filter((platform) => tool.platforms.includes(platform)).length
      const sharedCategories = candidate.categories.filter((category) => tool.categories.includes(category)).length

      return sharedPlatforms > 0 && sharedCategories > 0 && candidate.category !== tool.category
    })
    .sort((left, right) => {
      const leftShared =
        left.platforms.filter((platform) => tool.platforms.includes(platform)).length +
        left.categories.filter((category) => tool.categories.includes(category)).length
      const rightShared =
        right.platforms.filter((platform) => tool.platforms.includes(platform)).length +
        right.categories.filter((category) => tool.categories.includes(category)).length

      if (rightShared !== leftShared) return rightShared - leftShared
      return right.score - left.score
    })
    .slice(0, limit)
}

export function getRecipesForTool(tool: Tool) {
  return stackRecipes.filter((recipe) => recipe.toolNames.includes(tool.name))
}

export function getSpotlights(limit = 4) {
  return [...allTools]
    .sort((left, right) => {
      if (right.score !== left.score) return right.score - left.score
      return right.stars - left.stars
    })
    .slice(0, limit)
}
