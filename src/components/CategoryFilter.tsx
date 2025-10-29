"use client"
import React from 'react'

type Props = {
  categories: string[]
  value: string
  onChange: (cat: string) => void
}

export default function CategoryFilter({ categories, value, onChange }: Props) {
  const options = React.useMemo(() => ['All', ...categories.sort()], [categories])
  return (
    <div className="w-full">
      {/* Desktop: select */}
      <div className="hidden items-center gap-2 md:flex">
        <label className="text-sm text-gray-600" htmlFor="category-select">Category</label>
        <select
          id="category-select"
          className="rounded-md border border-brand/30 bg-white px-2 py-1 text-sm outline-none ring-brand/30 focus:ring"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      {/* Mobile: pill scroller */}
      <div className="-mx-2 mt-2 flex gap-2 overflow-x-auto px-2 pb-1 md:hidden" role="tablist" aria-label="Categories">
        {options.map((c) => {
          const active = value === c
          return (
            <button
              key={c}
              role="tab"
              aria-selected={active}
              onClick={() => onChange(c)}
              className={`shrink-0 rounded-full border px-3 py-2 text-sm ${active ? 'border-brand bg-brand/10 text-brand' : 'border-gray-200 bg-white text-gray-700'}`}
            >
              {c}
            </button>
          )
        })}
      </div>
    </div>
  )
}
