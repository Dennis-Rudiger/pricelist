"use client"
import React from 'react'
import SearchBar from '@/components/SearchBar'
import ItemRow from '@/components/ItemRow'
import CartSummary from '@/components/CartSummary'
import CategoryFilter from '@/components/CategoryFilter'
import { items } from '@/data/items'

export default function Page() {
  const [query, setQuery] = React.useState('')
  const [category, setCategory] = React.useState('All')

  const categories = React.useMemo(() => {
    return Array.from(new Set(items.map((i) => i.category).filter(Boolean))) as string[]
  }, [])

  const filtered = React.useMemo(() => {
    const q = query.toLowerCase()
    return items
      .filter((i) => (category === 'All' ? true : i.category === category))
      .filter(
        (i) => i.name.toLowerCase().includes(q) || i.description?.toLowerCase().includes(q)
      )
  }, [query, category])

  return (
    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
      <div className="md:col-span-2 lg:col-span-3">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-64 flex-1"><SearchBar onChange={setQuery} /></div>
          <CategoryFilter categories={categories} value={category} onChange={setCategory} />
        </div>
        <div className="mb-2 text-sm text-gray-600">
          {filtered.length} items {category !== 'All' && <span className="text-gray-400">in {category}</span>}
        </div>
        <div className="space-y-2">
          {filtered.length === 0 ? (
            <div className="rounded-md border bg-white p-6 text-center text-sm text-gray-500">
              No items found.
            </div>
          ) : (
            filtered.map((it) => <ItemRow key={it.id} item={it} />)
          )}
        </div>
      </div>
      <div className="md:col-span-1">
        <CartSummary />
      </div>
    </div>
  )
}
