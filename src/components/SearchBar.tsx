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
    <input
      className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none ring-brand/30 focus:ring"
      placeholder={placeholder}
      value={q}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setQ(e.target.value)}
    />
  )
}
