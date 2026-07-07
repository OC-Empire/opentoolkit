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
  steps: string[]
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
    steps: [
      'Harden browsing and ad/tracker blocking first.',
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
    audience: 'People moving from “privacy curious” into “I want real control”.',
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
    steps: [
      'Replace app discovery and updates first.',
      'Swap in secure communication and password management.',
      'Add privacy tooling at the network and system layer.',
      'Keep the setup maintainable; avoid exotic hacks unless the payoff is clear.',
    ],
    toolNames: ['F-Droid', 'Obtainium', 'Signal', 'Bitwarden', 'AdAway'],
  },
]

export function getToolBySlug(slug: string) {
  return allTools.find((tool) => tool.slug === slug)
}

export function getToolsByNames(names: string[]) {
  const byName = new Map(allTools.map((tool) => [tool.name, tool]))
  return names.map((name) => byName.get(name)).filter(Boolean) as Tool[]
}

export function getRecipeBySlug(slug: string) {
  return stackRecipes.find((recipe) => recipe.slug === slug)
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
