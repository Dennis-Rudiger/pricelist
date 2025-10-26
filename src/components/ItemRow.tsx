"use client"
import { Item } from '@/lib/types'
import { formatMoney } from '@/lib/money'
import { useCart } from '@/lib/store'

export default function ItemRow({ item }: { item: Item }) {
  const { quantities, setQuantity, increment, decrement } = useCart()
  const qty = quantities[item.id] || 0
  return (
    <div className="grid grid-cols-2 items-center gap-3 rounded-md border bg-white p-3 shadow-sm sm:grid-cols-6">
      <div className="col-span-2 sm:col-span-3">
        <div className="flex items-center gap-2">
          <div className="font-medium">{item.name}</div>
          {item.category && (
            <span className="hidden rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 sm:inline-block">
              {item.category}
            </span>
          )}
        </div>
        {item.description && <div className="text-xs text-gray-500">{item.description}</div>}
      </div>
      <div className="text-sm sm:text-right">{formatMoney(item.price)}</div>
      <div className="flex items-center justify-start gap-2 sm:justify-center">
        <button
          className="rounded border px-2 py-1 text-sm disabled:opacity-40 hover:bg-gray-50"
          aria-label="Decrease quantity"
          onClick={() => decrement(item.id)}
          disabled={qty <= 0}
        >
          −
        </button>
        <input
          type="number"
          min={0}
          className="w-16 rounded border px-2 py-1 text-center text-sm"
          value={qty}
          onChange={(e) => setQuantity(item.id, Number(e.target.value))}
        />
        <button
          className="rounded border px-2 py-1 text-sm hover:bg-gray-50"
          aria-label="Increase quantity"
          onClick={() => increment(item.id)}
        >
          +
        </button>
      </div>
      <div className="text-right text-sm font-semibold">{formatMoney(qty * item.price)}</div>
    </div>
  )
}
