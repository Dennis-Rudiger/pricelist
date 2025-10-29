"use client"
import { Item } from '@/lib/types'
import { formatMoney } from '@/lib/money'
import { useCart } from '@/lib/store'

export default function ItemRow({ item }: { item: Item }) {
  const { quantities, setQuantity, increment, decrement } = useCart()
  const qty = quantities[item.id] || 0
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm transition hover:shadow-md sm:grid sm:grid-cols-6 sm:items-center sm:gap-3">
      <div className="sm:col-span-3">
        <div className="flex items-center gap-2">
          <div className="font-medium text-gray-900">{item.name}</div>
          {item.category && (
            <span className="hidden rounded-full bg-brand/10 px-2 py-0.5 text-xs text-brand sm:inline-block">
              {item.category}
            </span>
          )}
        </div>
        {item.description && <div className="mt-0.5 text-xs text-gray-500">{item.description}</div>}
        <div className="mt-2 text-sm font-medium text-gray-800 sm:hidden">{formatMoney(item.price)}</div>
      </div>
      <div className="hidden text-sm font-medium text-gray-800 sm:block sm:text-right">{formatMoney(item.price)}</div>
      <div className="mt-2 flex items-center justify-between sm:mt-0 sm:justify-center">
        <div className="flex items-center gap-2">
          <button
            className="grid h-10 w-10 place-content-center rounded-full border border-gray-300 text-base text-gray-700 transition hover:bg-gray-100 active:scale-95 disabled:opacity-40 md:h-8 md:w-8 md:text-sm"
            aria-label="Decrease quantity"
            onClick={() => decrement(item.id)}
            disabled={qty <= 0}
          >
            −
          </button>
          <input
            type="number"
            min={0}
            className="w-20 rounded-md border border-gray-300 px-2 py-2 text-center text-base outline-none ring-brand/30 focus:ring md:w-16 md:py-1 md:text-sm"
            value={qty}
            onChange={(e) => setQuantity(item.id, Number(e.target.value))}
            aria-label="Quantity"
          />
          <button
            className="grid h-10 w-10 place-content-center rounded-full bg-brand text-base font-semibold text-white shadow transition hover:bg-brand-dark active:scale-95 md:h-8 md:w-8 md:text-sm"
            aria-label="Increase quantity"
            onClick={() => increment(item.id)}
          >
            +
          </button>
        </div>
        <div className="ml-3 text-right text-sm font-semibold text-gray-900 sm:hidden">{formatMoney(qty * item.price)}</div>
      </div>
      <div className="hidden text-right text-sm font-semibold text-gray-900 sm:block">{formatMoney(qty * item.price)}</div>
    </div>
  )
}
