# OpenToolkit Page Map and Content Model (2026-07)

## Page Map

### Live in this batch

- `/`
  - manifesto
  - discovery search
  - signal board
  - compare previews
  - migration previews
  - editorial collection previews

- `/tools/[slug]`
  - dossier page for a single tool

- `/stacks/[slug]`
  - stack recipe page

- `/compare`
  - head-to-head decision guides

- `/migrations`
  - replacement journey guides

### Planned next

- `/collections`
- `/rankings`
- `/radar`
- `/shortlist`

## Core Content Types

### Tool

Fields:
- `slug`
- `name`
- `description`
- `sourceUrl`
- `sourceType`
- `verified`
- `license`
- `stars`
- `category`
- `categories[]`
- `platforms[]`
- `score`

### StackRecipe

Fields:
- `slug`
- `name`
- `promise`
- `outcome`
- `audience`
- `difficulty`
- `steps[]`
- `toolNames[]`

### CompareGuide

Fields:
- `slug`
- `title`
- `summary`
- `question`
- `lens`
- `winnerFor`
- `tradeoff`
- `toolSlugs[2]`

### MigrationGuide

Fields:
- `slug`
- `title`
- `from`
- `toward`
- `promise`
- `painLevel`
- `whyNow`
- `replacements[]`
- `steps[]`

### Collection

Fields:
- `slug`
- `title`
- `description`
- `tags[]`

## Navigation Model

Primary navigation:

1. Home
2. Compare
3. Migrations
4. Stacks

This is intentional.
It prioritizes decisions and transitions over passive browsing.

## Editorial Logic

The site should increasingly answer these questions:

1. What should I use?
2. What should I replace?
3. What goes together?
4. What is the safer or more powerful path?
5. What do experienced people choose?
