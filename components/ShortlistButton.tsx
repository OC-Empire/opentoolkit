import { useEffect, useState } from 'react'

const STORAGE_KEY = 'opentoolkit-shortlist'

function readShortlist() {
  if (typeof window === 'undefined') return []

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed.filter((item) => typeof item === 'string') : []
  } catch {
    return []
  }
}

function writeShortlist(items: string[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

type Props = {
  slug: string
  label?: string
}

export default function ShortlistButton({ slug, label = 'Add to shortlist' }: Props) {
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setSaved(readShortlist().includes(slug))
  }, [slug])

  function toggle() {
    const current = readShortlist()
    const next = current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]
    writeShortlist(next)
    setSaved(next.includes(slug))
  }

  return (
    <button onClick={toggle} className={saved ? 'f-button' : 'f-button f-button-ghost'} type="button">
      {saved ? 'Saved to shortlist' : label}
    </button>
  )
}
