"use client"
import { useState, useEffect, type ChangeEvent } from 'react'

type Props = {
  placeholder?: string
  onChange: (query: string) => void
}

export default function SearchBar({ placeholder = 'Search items...', onChange }: Props) {
  const [q, setQ] = useState('')
  useEffect(() => {
    const t = setTimeout(() => onChange(q.trim()), 150)
    return () => clearTimeout(t)
  }, [q, onChange])
  return (
    <div className="relative">
      <input
        type="search"
        inputMode="search"
        autoComplete="off"
        className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-9 py-3 text-base outline-none ring-brand/30 focus:ring md:text-sm md:py-2"
        placeholder={placeholder}
        value={q}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setQ(e.target.value)}
        aria-label="Search"
      />
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden>
        🔎
      </span>
      {q && (
        <button
          type="button"
          onClick={() => setQ('')}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-500 hover:bg-gray-100"
        >
          ✕
        </button>
      )}
    </div>
  )
}
