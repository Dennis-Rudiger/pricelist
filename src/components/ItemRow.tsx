"use client"
import { Item } from '@/lib/types'
import { formatMoney } from '@/lib/money'
import { useCart } from '@/lib/store'

export default function ItemRow({ item }: { item: Item }) {
  const { quantities, setQuantity, increment, decrement } = useCart()
  const qty = quantities[item.id] || 0
  return (
    <div className="grid grid-cols-2 items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition hover:shadow-md sm:grid-cols-6">
      <div className="col-span-2 sm:col-span-3">
        <div className="flex items-center gap-2">
          <div className="font-medium text-gray-900">{item.name}</div>
          {item.category && (
            <span className="hidden rounded-full bg-brand/10 px-2 py-0.5 text-xs text-brand sm:inline-block">
              {item.category}
            </span>
          )}
        </div>
        {item.description && <div className="text-xs text-gray-500">{item.description}</div>}
      </div>
      <div className="text-sm font-medium text-gray-800 sm:text-right">{formatMoney(item.price)}</div>
      <div className="flex items-center justify-start gap-2 sm:justify-center">
        <button
          className="grid h-8 w-8 place-content-center rounded-full border border-gray-300 text-sm text-gray-700 transition hover:bg-gray-100 active:scale-95 disabled:opacity-40"
          aria-label="Decrease quantity"
          onClick={() => decrement(item.id)}
          disabled={qty <= 0}
        >
          −
        </button>
        <input
          type="number"
          min={0}
          className="w-16 rounded-md border border-gray-300 px-2 py-1 text-center text-sm outline-none ring-brand/30 focus:ring"
          value={qty}
          onChange={(e) => setQuantity(item.id, Number(e.target.value))}
        />
        <button
          className="grid h-8 w-8 place-content-center rounded-full bg-brand text-sm font-semibold text-white shadow transition hover:bg-brand-dark active:scale-95"
          aria-label="Increase quantity"
          onClick={() => increment(item.id)}
        >
          +
        </button>
      </div>
      <div className="text-right text-sm font-semibold text-gray-900">{formatMoney(qty * item.price)}</div>
    </div>
  )
}
