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
    <div className="flex flex-wrap items-center gap-2">
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
  )
}
