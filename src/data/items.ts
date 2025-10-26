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
  // Canonicalize known noisy category variants
  if (/plumbing/i.test(c)) return 'PLUMBING'
  if (/electricals/i.test(c)) return 'ELECTRICALS'
  if (/general\s*hard/i.test(c)) return 'GENERAL HARDWARE'
  if (/iron\s*sheets/i.test(c)) return 'IRON SHEETS & PLATES'
  if (/jua\s*kali/i.test(c)) return 'JUA KALI PRODUCTS'
  if (/locks?\s*&\s*access/i.test(c)) return 'LOCKS & ACCESSORIES'
  if (/mortar\s*and\s*adh/i.test(c)) return 'MORTAR AND ADHESIVES'
  if (/^nails/i.test(c)) return 'NAILS'
  if (/paint\s*access/i.test(c)) return 'PAINT ACCESSORIES'
  if (/^paints?/i.test(c)) return 'PAINTS'
  if (/^steel/i.test(c)) return 'STEEL'
  if (/tiles?\s*&\s*access/i.test(c)) return 'TILES & ACCESSORIES'
  if (/timber\s*products/i.test(c)) return 'TIMBER PRODUCTS'
  if (/tools?\s*&\s*machin/i.test(c)) return 'TOOLS & MACHINERY'
  if (/welding\s*materials/i.test(c)) return 'WELDING MATERIALS'
  if (/wire\s*products/i.test(c)) return 'WIRE PRODUCTS'
  if (/glues?\s*&\s*sealants/i.test(c)) return 'GLUES & SEALANTS'
  if (/glassware/i.test(c)) return 'GLASSWARE'
  return c.toUpperCase()
}

type NewProduct = {
  item_code?: unknown
  item_description?: unknown
  item_Service?: unknown
  item_Services?: unknown
  price?: number | string
  unit?: unknown
  description?: unknown
}

type NewCategory = {
  category_name?: unknown
  products?: NewProduct[]
}

type NewSchema = {
  categories?: NewCategory[]
}

function toLegacyInventory(invAny: unknown): Record<string, RawEntry[]> {
  // Support two schemas:
  // 1) Legacy: { [category: string]: RawEntry[] }
  // 2) New: { categories: [{ category_name, products: [{ item_code, item_description, ... }] }] }
  const maybeNew = invAny as NewSchema
  if (maybeNew && Array.isArray(maybeNew.categories)) {
    const out: Record<string, RawEntry[]> = {}
    for (const cat of maybeNew.categories ?? []) {
      const rawCat = (cat?.category_name ?? 'UNCATEGORIZED') as string
      const catName = normalizeCategory(String(rawCat))
      const products = Array.isArray(cat?.products) ? cat.products : []
      const arr: RawEntry[] = products.map((p) => {
        const id = String(p?.item_code ?? '').trim()
        const name = String(p?.item_description ?? p?.item_Service ?? p?.item_Services ?? '').trim()
        const price = p?.price
        const unit = (p?.unit as string | undefined) ?? undefined
        const description = (p?.description as string | undefined) ?? undefined
        return { id, name, price, unit, description }
      })
      if (!out[catName]) out[catName] = []
      out[catName].push(...arr)
    }
    return out
  }
  if (invAny && typeof invAny === 'object' && !Array.isArray(invAny)) {
    return invAny as Record<string, RawEntry[]>
  }
  return {}
}

function normalizeInventory(inv: Record<string, RawEntry[]>): Item[] {
  const out: Item[] = []
  const seen = new Set<string>()
  for (const [rawCategory, arr] of Object.entries(inv)) {
    const category = normalizeCategory(rawCategory)
    for (const entry of arr) {
      if (typeof entry === 'string') {
        const name = cleanName(entry.trim())
        const id = `itm-${slugify(`${category}-${name}`)}`.slice(0, 80)
        // ensure unique id
        let finalId = id
        if (seen.has(finalId)) {
          finalId = `itm-${slugify(`${category}-${name}-${out.length}`)}`.slice(0, 80)
        }
        seen.add(finalId)
        out.push({ id: finalId, name, price: 0, unit: 'each', category })
      } else if (entry && (entry.name || entry.id)) {
        const name = cleanName((entry.name || entry.id || 'Unnamed').toString())
        // Prefer provided id verbatim (trimmed) when available for human readability
        const providedId = (entry.id ?? '').toString().trim()
        let id = providedId || `itm-${slugify(`${category}-${name}`)}`.slice(0, 80)
        // If a provided id collides, make it category-scoped
        if (seen.has(id)) {
          const scoped = `${normalizeCategory(category)}-${providedId || slugify(name)}`.slice(0, 80)
          id = scoped || id
          if (seen.has(id)) {
            id = `itm-${slugify(`${category}-${name}-${out.length}`)}`.slice(0, 80)
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

const legacy = toLegacyInventory(rawInventory)
const normalized = normalizeInventory(legacy)

// Export the items from JSON. If JSON has no entries, export an empty array.
export const items: Item[] = normalized
