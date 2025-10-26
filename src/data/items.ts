import { Item } from '@/lib/types'
import rawInventory from './shop_inventory.json'

type RawEntry =
  | string
  | {
      id?: string
      name?: string
      price?: number | string
      description?: string
      unit?: string
    }

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

function cleanName(name: string): string {
  // Remove trailing repeated category label seen in some datasets
  return name.replace(/\s+PLUMBING MATERIALS\s*$/i, '').trim()
}

function normalizeCategory(category: string): string {
  const c = category.trim()
  if (/^plumbing materials$/i.test(c)) return 'PLUMBING'
  return c
}

function normalizeInventory(inv: Record<string, RawEntry[]>): Item[] {
  const out: Item[] = []
  const seen = new Set<string>()
  for (const [rawCategory, arr] of Object.entries(inv)) {
    const category = normalizeCategory(rawCategory)
    for (const entry of arr) {
      if (typeof entry === 'string') {
        const name = cleanName(entry.trim())
        const id = `itm-${slugify(`${category}-${name}`)}`.slice(0, 40)
        // ensure unique id
        let finalId = id
        if (seen.has(finalId)) {
          finalId = `itm-${slugify(`${category}-${name}-${out.length}`)}`.slice(0, 40)
        }
        seen.add(finalId)
        out.push({ id: finalId, name, price: 0, unit: 'each', category })
      } else if (entry && (entry.name || entry.id)) {
        const name = cleanName((entry.name || entry.id || 'Unnamed').toString())
        const baseId = slugify(entry.id || `${category}-${name}`).slice(0, 40)
        let id = baseId || `itm-${Math.random().toString(36).slice(2, 10)}`
        // If a provided id collides, make it category-scoped
        if (seen.has(id)) {
          const scoped = slugify(`${category}-${entry.id || name}`).slice(0, 40)
          id = scoped
          if (seen.has(id)) {
            id = slugify(`${category}-${name}-${out.length}`).slice(0, 40)
          }
        }
        seen.add(id)
        const priceNum = typeof entry.price === 'string' ? parseFloat(entry.price) : entry.price
        out.push({
          id,
          name,
          description: entry.description,
          price: Number.isFinite(priceNum) ? (priceNum as number) : 0,
          unit: entry.unit || 'each',
          category,
        })
      }
    }
  }
  return out
}

const normalized = normalizeInventory(rawInventory as Record<string, RawEntry[]>)

// Export the items from JSON. If JSON has no entries, export an empty array.
export const items: Item[] = normalized
