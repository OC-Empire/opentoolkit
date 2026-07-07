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

export type ReplacementScenario = {
  slug: string
  title: string
  incumbent: string
  friction: 'Low' | 'Medium' | 'High'
  problem: string
  bestFor: string
  replacements: string[]
  steps: string[]
}

export type MissionProfile = {
  slug: string
  name: string
  description: string
  priorities: {
    privacy: number
    control: number
    ease: number
    power: number
    creativity: number
  }
  toolNames: string[]
}

export type MigrationJourney = {
  slug: string
  title: string
  subtitle: string
  stakes: string
  outcome: string
  phases: Array<{
    name: string
    objective: string
    toolNames: string[]
    steps: string[]
  }>
  warnings: string[]
}

export type ToolRelationship = {
  toolSlug: string
  relation: 'Alternative' | 'Complement' | 'Stack anchor' | 'Migration ally' | 'Hosted calm' | 'Ownership push'
  reason: string
}

export type ScenarioPreset = {
  slug: string
  name: string
  description: string
  weights: {
    privacy: number
    control: number
    ease: number
    power: number
    creativity: number
  }
  compareGuideSlugs: string[]
}

export type ChangeSignal = {
  slug: string
  label: string
  summary: string
  intensity: 'Low' | 'Medium' | 'High'
  affectedToolNames: string[]
}

export type ScenarioSnapshot = {
  slug: string
  title: string
  profileSlug: string
  presetSlug: string
  toolSlugs: string[]
  notes: string
}

export type IntelligenceLedgerEntry = {
  slug: string
  weekOf: string
  title: string
  status: 'Escalating' | 'Holding' | 'Monitoring'
  summary: string
  signals: string[]
  toolNames: string[]
  actions: string[]
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

export const replacementScenarios: ReplacementScenario[] = [
  {
    slug: 'replace-google-drive',
    title: 'Replace Google Drive',
    incumbent: 'Google Drive',
    friction: 'Medium',
    problem: 'Convenience is high, but ownership, encryption boundaries, and long-term control are weak.',
    bestFor: 'People who want calmer storage with cleaner ownership and a real migration path.',
    replacements: ['Nextcloud', 'Cryptomator', 'Syncthing', 'Ente'],
    steps: [
      'Separate daily sync, cold archive, and private files before moving anything.',
      'Pick hosted privacy or self-hosting deliberately instead of mixing both blindly.',
      'Encrypt the sensitive layer before you rebuild sharing habits.',
      'Test restore behavior before calling the migration complete.',
    ],
  },
  {
    slug: 'replace-gmail',
    title: 'Replace Gmail',
    incumbent: 'Gmail',
    friction: 'High',
    problem: 'Email is deeply wired into identity, recovery, and years of account sprawl.',
    bestFor: 'People ready to clean up digital identity and stop letting one vendor own the center of it.',
    replacements: ['Tuta', 'Thunderbird', 'Bitwarden'],
    steps: [
      'Move password and recovery hygiene first so the email switch does not turn chaotic.',
      'Create the new mailbox and forward selectively during the transition period.',
      'Update critical accounts in waves rather than trying to do everything in one sitting.',
      'Keep a migration ledger until the old address is no longer operationally central.',
    ],
  },
  {
    slug: 'replace-google-photos',
    title: 'Replace Google Photos',
    incumbent: 'Google Photos',
    friction: 'Medium',
    problem: 'Photo convenience is strong, but it quietly becomes your memory system and archive dependency.',
    bestFor: 'People who want their photos to become part of an owned archive instead of a rented habit.',
    replacements: ['Immich', 'Ente', 'Nextcloud'],
    steps: [
      'Decide whether your priority is ownership, lower maintenance, or both.',
      'Export the archive before optimizing the new browsing experience.',
      'Keep originals, metadata, and backup paths open from day one.',
      'Only then rebuild mobile upload convenience.',
    ],
  },
  {
    slug: 'replace-whatsapp',
    title: 'Replace WhatsApp Dependence',
    incumbent: 'WhatsApp',
    friction: 'High',
    problem: 'Messaging is social infrastructure, so the blocker is network adoption, not just features.',
    bestFor: 'People who want better defaults while being realistic about social inertia.',
    replacements: ['Signal', 'SimpleX Chat'],
    steps: [
      'Adopt the new messenger for your highest-trust contacts first.',
      'Create one or two visible migration clusters instead of persuading everyone individually.',
      'Keep WhatsApp as a bridge during transition instead of pretending it can vanish immediately.',
      'Move your inner circle first; everything else follows slower.',
    ],
  },
  {
    slug: 'replace-notion',
    title: 'Replace Notion Dependency',
    incumbent: 'Notion',
    friction: 'Medium',
    problem: 'Flexibility is high, but export confidence, offline durability, and long-term ownership are weaker than they look.',
    bestFor: 'People whose thinking system matters more than polished SaaS ergonomics.',
    replacements: ['Obsidian', 'Joplin', 'Nextcloud', 'Paperless-ngx'],
    steps: [
      'Define your canonical thinking surface before importing anything.',
      'Move active systems first, archive second.',
      'Keep markdown, files, and references portable.',
      'Treat templates and workflows as a second migration wave.',
    ],
  },
  {
    slug: 'replace-spotify-rental',
    title: 'Replace Spotify Rental Habits',
    incumbent: 'Spotify',
    friction: 'Medium',
    problem: 'You get convenience, but no real ownership or durable library logic.',
    bestFor: 'People who want a music layer that survives changing business models and subscriptions.',
    replacements: ['Navidrome', 'Jellyfin'],
    steps: [
      'Clarify whether your priority is library ownership, playback control, or discovery.',
      'Build the archive and metadata layer before obsessing over UI polish.',
      'Use open formats and maintain backups from the beginning.',
      'Treat streaming convenience as optional frosting, not the core asset.',
    ],
  },
]

export const missionProfiles: MissionProfile[] = [
  {
    slug: 'privacy-max',
    name: 'Privacy Max',
    description: 'For people who want to reduce surveillance gravity first and tolerate a bit more friction.',
    priorities: { privacy: 5, control: 4, ease: 2, power: 2, creativity: 1 },
    toolNames: ['Firefox', 'uBlock Origin', 'Bitwarden', 'Signal', 'Mullvad VPN'],
  },
  {
    slug: 'builder-sovereign',
    name: 'Builder Sovereign',
    description: 'For operators who want local leverage, ownership, and an extensible base layer.',
    priorities: { privacy: 3, control: 5, ease: 2, power: 5, creativity: 2 },
    toolNames: ['Ollama', 'Open WebUI', 'VS Code', 'Docker', 'Nextcloud'],
  },
  {
    slug: 'hosted-calm',
    name: 'Hosted Calm',
    description: 'For people who want better defaults without inheriting a weekend infrastructure job.',
    priorities: { privacy: 4, control: 2, ease: 5, power: 2, creativity: 1 },
    toolNames: ['Tuta', 'Ente', 'Bitwarden', 'Firefox', 'Proton VPN'],
  },
  {
    slug: 'creator-owned',
    name: 'Creator Owned',
    description: 'For people building a media and publishing workflow that they actually control.',
    priorities: { privacy: 2, control: 4, ease: 2, power: 4, creativity: 5 },
    toolNames: ['OBS Studio', 'FFmpeg', 'Blender', 'Krita', 'Jellyfin'],
  },
]

export const migrationJourneys: MigrationJourney[] = [
  {
    slug: 'escape-google',
    title: 'Escape Google',
    subtitle: 'A staged sovereignty migration for people who want out without detonating their daily life.',
    stakes: 'Google is not one product. It is the gravity well around identity, files, browsing, notes, photos, and habit.',
    outcome: 'A calmer stack where identity, files, notes, photos, and search behavior no longer depend on one company being benevolent forever.',
    phases: [
      {
        name: 'Identity Firewall',
        objective: 'Stabilize passwords, recovery flows, and browser behavior before moving your data.',
        toolNames: ['Bitwarden', 'Firefox', 'uBlock Origin'],
        steps: [
          'Move credentials into a real password layer first.',
          'Switch the browser and privacy defaults together so habits do not snap back.',
          'Map which Google account functions are truly critical versus merely familiar.',
        ],
      },
      {
        name: 'File and Note Extraction',
        objective: 'Create owned homes for files, notes, and sensitive documents.',
        toolNames: ['Nextcloud', 'Cryptomator', 'Joplin', 'Paperless-ngx'],
        steps: [
          'Separate file sync, document archive, and note-taking into explicit layers.',
          'Export high-value material first instead of brute-forcing the whole history.',
          'Keep encryption and restore behavior visible before trusting the new stack.',
        ],
      },
      {
        name: 'Memory and Media Exit',
        objective: 'Re-home photos and personal media into something you can actually keep.',
        toolNames: ['Immich', 'Ente', 'Jellyfin'],
        steps: [
          'Choose between full ownership and hosted privacy calm based on operational appetite.',
          'Preserve originals and metadata before tuning the browsing experience.',
          'Build backup discipline early so the new archive is real, not cosmetic.',
        ],
      },
      {
        name: 'Communication and Daily Flow',
        objective: 'Move the human-facing parts only after the private base layer is stable.',
        toolNames: ['Tuta', 'Signal', 'Thunderbird'],
        steps: [
          'Migrate high-trust communication circles first.',
          'Change recovery email and account anchors in waves.',
          'Accept hybrid operation temporarily instead of demanding ideological purity on day one.',
        ],
      },
    ],
    warnings: [
      'Trying to move everything in one weekend is how people fail and crawl back.',
      'Email and messaging migrations are social systems, not just software switches.',
      'Do not call it done until backups and restores are proven.',
    ],
  },
  {
    slug: 'de-google-android',
    title: 'De-Google Your Android',
    subtitle: 'A mobile sovereignty route that does not assume you want to become a full-time ROM hobbyist.',
    stakes: 'Mobile defaults are where app stores, trackers, messaging gravity, and everyday habit loops become hardest to challenge.',
    outcome: 'An Android setup with better app sourcing, safer communication, cleaner update logic, and less platform dependence.',
    phases: [
      {
        name: 'App Supply Reset',
        objective: 'Break the idea that the Play Store must remain the center of gravity.',
        toolNames: ['F-Droid', 'Obtainium'],
        steps: [
          'Set up alternative app sourcing before trying to change everything else.',
          'Separate essential apps from convenience apps so the migration stays realistic.',
          'Keep update paths simple enough to maintain over time.',
        ],
      },
      {
        name: 'Privacy and Messaging Core',
        objective: 'Rebuild the trust layer around communication and credential handling.',
        toolNames: ['Signal', 'Bitwarden', 'AdAway'],
        steps: [
          'Move secure messaging first for the people who matter most.',
          'Replace scattered credentials with a durable password layer.',
          'Add network-level blocking once the basics are stable.',
        ],
      },
      {
        name: 'Calm Daily Operation',
        objective: 'Turn the setup into something usable enough to keep.',
        toolNames: ['Firefox', 'NextDNS'],
        steps: [
          'Choose browser and DNS defaults that reduce surveillance drag every day.',
          'Avoid exotic tweaks unless they clearly outperform the maintenance burden.',
          'Aim for a phone that feels calmer, not more ideological.',
        ],
      },
    ],
    warnings: [
      'A phone migration fails when it becomes a hobby project instead of a daily tool.',
      'Do not replace ten behaviors at once if you want the new setup to stick.',
      'Social messaging gravity is stronger than software purity.',
    ],
  },
  {
    slug: 'creator-ownership-reset',
    title: 'Creator Ownership Reset',
    subtitle: 'A migration from platform-rented creative habits toward an owned media pipeline.',
    stakes: 'Creators get trapped not only by tools, but by formats, archives, publishing paths, and distribution dependencies.',
    outcome: 'A media workflow where capture, editing, archive, and playback live inside a stack you can keep.',
    phases: [
      {
        name: 'Capture Layer',
        objective: 'Own the raw material before obsessing over the glossy end state.',
        toolNames: ['OBS Studio', 'FFmpeg'],
        steps: [
          'Make open capture and conversion the first stable layer.',
          'Prefer durable formats over platform-specific convenience.',
          'Create archive discipline before scale makes it painful.',
        ],
      },
      {
        name: 'Editing and Asset Flow',
        objective: 'Replace expensive or trapped creative habits with open production tools.',
        toolNames: ['Blender', 'Krita'],
        steps: [
          'Move the parts of the pipeline where ownership matters most first.',
          'Treat editing tools as part of a system, not isolated hero apps.',
          'Preserve reusable assets and project structure from the start.',
        ],
      },
      {
        name: 'Library and Playback',
        objective: 'Keep your output accessible without renting continuity from other platforms.',
        toolNames: ['Jellyfin', 'Immich'],
        steps: [
          'Build the archive and library layer so the work remains yours after publishing.',
          'Use self-host or private-hosted logic based on your real operational appetite.',
          'Think in terms of continuity, not only distribution.',
        ],
      },
    ],
    warnings: [
      'Do not treat ownership as an abstract virtue; tie it to archive and reuse.',
      'A creator stack fails if formats and organization stay messy.',
      'Tool quality matters, but continuity matters more.',
    ],
  },
  {
    slug: 'privacy-calm-starter',
    title: 'Privacy Calm Starter',
    subtitle: 'A lower-drama migration for people who want better defaults without turning their weekend into an ops shift.',
    stakes: 'Many people bounce off privacy migrations because the first move feels like joining a religion instead of making calmer software choices.',
    outcome: 'A practical daily stack with safer browsing, stronger passwords, private messaging, and hosted privacy services that do not demand server ownership.',
    phases: [
      {
        name: 'Browser and Identity Reset',
        objective: 'Swap the everyday front door first so the rest of the transition has a safer base.',
        toolNames: ['Firefox', 'uBlock Origin', 'Bitwarden'],
        steps: [
          'Move the browser and blocker together so tracking habits do not follow you into the new stack.',
          'Get passwords under control before changing more account surfaces.',
          'Treat convenience as part of the migration plan instead of pretending friction does not matter.',
        ],
      },
      {
        name: 'Calm Communication Layer',
        objective: 'Adopt private communication and email without demanding an all-or-nothing break.',
        toolNames: ['Signal', 'Tuta', 'Thunderbird'],
        steps: [
          'Move the trusted circle first and let the wider network lag behind for a while.',
          'Use a calm hosted mail service instead of overcomplicating the move on day one.',
          'Keep a migration ledger so identity changes do not get lost.',
        ],
      },
      {
        name: 'Private Storage Without Servers',
        objective: 'Replace the most sensitive cloud habits with tools that reduce exposure and stay manageable.',
        toolNames: ['Ente', 'Mullvad VPN', 'Proton VPN'],
        steps: [
          'Use hosted privacy tools where they genuinely lower maintenance.',
          'Keep self-hosting out of scope unless the user actually wants it.',
          'Optimize for retention of the new habits, not ideological completionism.',
        ],
      },
    ],
    warnings: [
      'A calmer privacy route should still be deliberate, not vague.',
      'Do not overload this path with self-host complexity unless the user asks for it.',
      'The best privacy stack is the one a person keeps using six months later.',
    ],
  },
  {
    slug: 'build-local-ai-desk',
    title: 'Build Your Local AI Desk',
    subtitle: 'Turn local AI from a novelty into a serious owned workbench for thinking, coding, and experimentation.',
    stakes: 'Without surrounding tools, local AI becomes a demo. With the right environment, it becomes a daily operating layer.',
    outcome: 'A local AI setup where model runtime, interface, notes, and coding flow reinforce each other instead of living in separate silos.',
    phases: [
      {
        name: 'Runtime Core',
        objective: 'Install and stabilize the local model layer first.',
        toolNames: ['Ollama', 'Open WebUI'],
        steps: [
          'Start with one dependable runtime and one clean interaction layer.',
          'Choose models for actual tasks instead of chasing benchmark mythology.',
          'Treat hardware reality as part of the design, not an afterthought.',
        ],
      },
      {
        name: 'Builder Loop',
        objective: 'Attach local AI to the actual work surface where coding and drafting happen.',
        toolNames: ['VS Code', 'Git', 'Docker'],
        steps: [
          'Keep your editor, version control, and container story close to the model runtime.',
          'Make iteration cheap enough that local AI gets used for real work.',
          'Avoid magical complexity that makes the setup fragile.',
        ],
      },
      {
        name: 'Memory and Context',
        objective: 'Give the desk a durable knowledge layer so work compounds over time.',
        toolNames: ['Obsidian', 'Nextcloud', 'Joplin'],
        steps: [
          'Keep project notes and prompts in a system you own.',
          'Separate transient chats from reusable context.',
          'Make retrieval and sync boringly dependable.',
        ],
      },
    ],
    warnings: [
      'Do not confuse model quantity with capability.',
      'A local AI desk fails when context management stays sloppy.',
      'Keep the system light enough that it survives reboots, updates, and ordinary use.',
    ],
  },
]

export const relationshipAnchors = [
  'firefox',
  'bitwarden',
  'nextcloud',
  'ollama',
  'obsidian',
  'signal',
  'immich',
  'obs-studio',
]

export const scenarioPresets: ScenarioPreset[] = [
  {
    slug: 'privacy-without-madness',
    name: 'Privacy Without Madness',
    description: 'Bias toward safer defaults while avoiding a stack that becomes a lifestyle burden.',
    weights: { privacy: 5, control: 3, ease: 4, power: 1, creativity: 1 },
    compareGuideSlugs: ['firefox-vs-brave', 'mullvad-vs-proton-vpn', 'signal-vs-simplex-chat'],
  },
  {
    slug: 'operator-control',
    name: 'Operator Control',
    description: 'Favor ownership, self-host posture, and long-term leverage over convenience fluff.',
    weights: { privacy: 3, control: 5, ease: 1, power: 5, creativity: 1 },
    compareGuideSlugs: ['bitwarden-vs-keepassxc', 'nextcloud-vs-proton-drive', 'immich-vs-ente'],
  },
  {
    slug: 'calm-mainstream-exit',
    name: 'Calm Mainstream Exit',
    description: 'Make safer moves that a normal person can actually keep living with.',
    weights: { privacy: 4, control: 2, ease: 5, power: 1, creativity: 1 },
    compareGuideSlugs: ['firefox-vs-brave', 'obsidian-vs-joplin', 'mullvad-vs-proton-vpn'],
  },
  {
    slug: 'creator-stack-pressure',
    name: 'Creator Stack Pressure',
    description: 'Optimize for creative throughput, ownership, and an archive that survives platform mood swings.',
    weights: { privacy: 1, control: 4, ease: 2, power: 4, creativity: 5 },
    compareGuideSlugs: ['immich-vs-ente', 'obsidian-vs-joplin', 'nextcloud-vs-proton-drive'],
  },
]

export const defaultScenarioSnapshots: ScenarioSnapshot[] = [
  {
    slug: 'privacy-reset-board',
    title: 'Privacy Reset Board',
    profileSlug: 'privacy-max',
    presetSlug: 'privacy-without-madness',
    toolSlugs: ['firefox', 'ublock-origin', 'bitwarden', 'signal', 'mullvad-vpn'],
    notes: 'Good default board for people leaving browser and identity chaos first.',
  },
  {
    slug: 'builder-control-room',
    title: 'Builder Control Room',
    profileSlug: 'builder-sovereign',
    presetSlug: 'operator-control',
    toolSlugs: ['ollama', 'open-webui', 'vscode', 'docker', 'nextcloud'],
    notes: 'Optimized for leverage, local control, and extensibility over comfort.',
  },
]

export const changeSignals: ChangeSignal[] = [
  {
    slug: 'local-ai-front-door',
    label: 'Local AI front door is open',
    summary: 'Local AI is now easy enough to become a consumer expectation instead of a niche ritual.',
    intensity: 'High',
    affectedToolNames: ['Ollama', 'Open WebUI', 'VS Code'],
  },
  {
    slug: 'hosted-privacy-calm-rising',
    label: 'Hosted privacy calm is converting mainstream users',
    summary: 'Products that reduce surveillance without demanding sysadmin energy are gaining strategic value.',
    intensity: 'Medium',
    affectedToolNames: ['Tuta', 'Ente', 'Mullvad VPN'],
  },
  {
    slug: 'knowledge-vault-convergence',
    label: 'Knowledge vault convergence',
    summary: 'Notes, files, archive, and AI context are collapsing into a single personal operating layer.',
    intensity: 'High',
    affectedToolNames: ['Obsidian', 'Joplin', 'Paperless-ngx'],
  },
  {
    slug: 'creator-ownership-loop',
    label: 'Creators are rebuilding ownership loops',
    summary: 'Capture, edit, archive, and playback are being treated as one system again.',
    intensity: 'Medium',
    affectedToolNames: ['OBS Studio', 'FFmpeg', 'Jellyfin'],
  },
]

export const intelligenceLedger: IntelligenceLedgerEntry[] = [
  {
    slug: 'local-ai-surface-expansion',
    weekOf: '2026-07-07',
    title: 'Local AI surface expansion',
    status: 'Escalating',
    summary: 'Local AI is no longer only a model runtime conversation. The stack around it is becoming a full owned workbench story.',
    signals: [
      'Model runners are expected to coexist with web UIs, editors, and knowledge systems.',
      'People increasingly evaluate local AI through daily usefulness, not ideology alone.',
      'The winning tools reduce setup friction without killing operator control.',
    ],
    toolNames: ['Ollama', 'Open WebUI', 'VS Code', 'Obsidian'],
    actions: ['Strengthen local AI stack collections.', 'Keep compare pressure on hosted vs local tradeoffs.'],
  },
  {
    slug: 'hosted-privacy-calm-breakout',
    weekOf: '2026-07-07',
    title: 'Hosted privacy calm breakout',
    status: 'Holding',
    summary: 'There is a widening middle market for privacy tools that do not ask people to become infrastructure operators.',
    signals: [
      'Users want calmer alternatives to surveillance defaults without running servers.',
      'Trust plus low-maintenance onboarding is becoming its own competitive lane.',
      'This category matters because it welcomes non-maximalists into the ecosystem.',
    ],
    toolNames: ['Tuta', 'Ente', 'Mullvad VPN', 'Bitwarden'],
    actions: ['Keep hosted-calm stack and ranking surfaces visible.', 'Pair hosted tools with migration narratives, not just specs.'],
  },
  {
    slug: 'knowledge-vault-convergence-ledger',
    weekOf: '2026-07-07',
    title: 'Knowledge vault convergence',
    status: 'Monitoring',
    summary: 'Notes, memory, references, and personal archives are converging into one ownership-sensitive layer.',
    signals: [
      'People are treating vault-style tools as operating systems for thought.',
      'Durability and file portability matter more as AI gets embedded into personal workflows.',
      'The strongest tools let users keep the corpus while changing the interface later.',
    ],
    toolNames: ['Obsidian', 'Joplin', 'Paperless-ngx', 'Nextcloud'],
    actions: ['Push vault-oriented collections and stacks harder.', 'Keep compare pages centered on long-term portability.'],
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
  { href: '/compose/', label: 'Compose' },
  { href: '/replace/', label: 'Replace' },
  { href: '/compare/', label: 'Compare' },
  { href: '/graph/', label: 'Graph' },
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

export function getReplacementScenarioBySlug(slug: string) {
  return replacementScenarios.find((scenario) => scenario.slug === slug)
}

export function getMissionProfileBySlug(slug: string) {
  return missionProfiles.find((profile) => profile.slug === slug)
}

export function getMigrationJourneyBySlug(slug: string) {
  return migrationJourneys.find((journey) => journey.slug === slug)
}

export function getScenarioPresetBySlug(slug: string) {
  return scenarioPresets.find((preset) => preset.slug === slug)
}

export function getChangeSignalBySlug(slug: string) {
  return changeSignals.find((signal) => signal.slug === slug)
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

export function getToolRelationships(tool: Tool): ToolRelationship[] {
  const relationships: ToolRelationship[] = []

  getAlternatives(tool, 3).forEach((candidate) => {
    relationships.push({
      toolSlug: candidate.slug,
      relation: 'Alternative',
      reason: `${candidate.name} is a strong same-lane option if you want a different tradeoff inside ${tool.category.toLowerCase()}.`,
    })
  })

  getComplements(tool, 3).forEach((candidate) => {
    relationships.push({
      toolSlug: candidate.slug,
      relation: 'Complement',
      reason: `${candidate.name} strengthens the surrounding stack instead of replacing ${tool.name}.`,
    })
  })

  getRecipesForTool(tool).slice(0, 2).forEach((recipe) => {
    const anchorNames = recipe.toolNames.filter((name) => name !== tool.name).slice(0, 2)
    getToolsByNames(anchorNames).forEach((candidate) => {
      relationships.push({
        toolSlug: candidate.slug,
        relation: 'Stack anchor',
        reason: `${candidate.name} appears with ${tool.name} inside ${recipe.name}, so the pairing already has narrative and operational fit.`,
      })
    })
  })

  replacementScenarios
    .filter((scenario) => scenario.replacements.includes(tool.name))
    .slice(0, 2)
    .forEach((scenario) => {
      const allies = getToolsByNames(scenario.replacements.filter((name) => name !== tool.name)).slice(0, 1)
      allies.forEach((candidate) => {
        relationships.push({
          toolSlug: candidate.slug,
          relation: 'Migration ally',
          reason: `${candidate.name} tends to appear beside ${tool.name} when replacing ${scenario.incumbent}.`,
        })
      })
    })

  if (['Ente', 'Tuta', 'Proton VPN', 'Mullvad VPN'].includes(tool.name)) {
    const hostedCalmPeer = getToolsByNames(['Bitwarden', 'Firefox']).find((candidate) => candidate.slug !== tool.slug)
    if (hostedCalmPeer) {
      relationships.push({
        toolSlug: hostedCalmPeer.slug,
        relation: 'Hosted calm',
        reason: `${hostedCalmPeer.name} helps build a lower-maintenance privacy stack around ${tool.name}.`,
      })
    }
  }

  if (tool.platforms.includes('self-hosted')) {
    const ownershipPeer = getToolsByNames(['Nextcloud', 'Docker', 'Syncthing']).find((candidate) => candidate.slug !== tool.slug)
    if (ownershipPeer) {
      relationships.push({
        toolSlug: ownershipPeer.slug,
        relation: 'Ownership push',
        reason: `${ownershipPeer.name} reinforces the ownership and operational-control posture around ${tool.name}.`,
      })
    }
  }

  const deduped = new Map<string, ToolRelationship>()
  relationships.forEach((relationship) => {
    if (relationship.toolSlug === tool.slug) return
    const key = `${relationship.relation}:${relationship.toolSlug}`
    if (!deduped.has(key)) deduped.set(key, relationship)
  })

  return Array.from(deduped.values()).slice(0, 8)
}

export function getLedgerEntriesForToolNames(toolNames: string[]) {
  return intelligenceLedger.filter((entry) => entry.toolNames.some((name) => toolNames.includes(name)))
}

export function getRelationshipDensityScore(tool: Tool) {
  const relationships = getToolRelationships(tool)
  const laneCount = new Set(relationships.map((item) => item.relation)).size

  return {
    connections: relationships.length,
    lanes: laneCount,
    density: Math.min(100, tool.score + laneCount * 3 + relationships.length * 2),
  }
}

export function scoreToolForMission(
  tool: Tool,
  priorities: MissionProfile['priorities']
) {
  let score = tool.score

  if (priorities.privacy > 0) {
    if (tool.category === 'Privacy') score += priorities.privacy * 4
    if (tool.name === 'Signal' || tool.name === 'Bitwarden' || tool.name === 'Firefox') score += priorities.privacy * 2
  }

  if (priorities.control > 0) {
    if (tool.platforms.includes('self-hosted')) score += priorities.control * 4
    if (tool.name === 'Nextcloud' || tool.name === 'Docker' || tool.name === 'KeePassXC') score += priorities.control * 2
  }

  if (priorities.ease > 0) {
    if (tool.verified) score += priorities.ease * 2
    if (!tool.platforms.includes('self-hosted')) score += priorities.ease * 2
  }

  if (priorities.power > 0) {
    if (tool.category === 'Development' || tool.category === 'AI' || tool.category === 'System') score += priorities.power * 3
    if (tool.name === 'Ollama' || tool.name === 'VS Code' || tool.name === 'Docker') score += priorities.power * 2
  }

  if (priorities.creativity > 0) {
    if (tool.category === 'Creative') score += priorities.creativity * 4
    if (tool.name === 'OBS Studio' || tool.name === 'FFmpeg' || tool.name === 'Jellyfin') score += priorities.creativity * 2
  }

  return score
}

export function scoreToolForWeights(
  tool: Tool,
  weights: ScenarioPreset['weights']
) {
  return scoreToolForMission(tool, weights)
}

export function scoreToolMatrix(tool: Tool, missionSlug: string, presetSlug: string) {
  const profile = getMissionProfileBySlug(missionSlug) || missionProfiles[0]
  const preset = getScenarioPresetBySlug(presetSlug) || scenarioPresets[0]
  const mission = scoreToolForMission(tool, profile.priorities)
  const scenario = scoreToolForWeights(tool, preset.weights)

  return {
    mission,
    scenario,
    blended: Math.round((mission + scenario + tool.score) / 3),
  }
}
