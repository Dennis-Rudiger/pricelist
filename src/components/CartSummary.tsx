"use client"
import { useMemo } from 'react'
import { useCart } from '@/lib/store'
import { formatMoney } from '@/lib/money'

export default function CartSummary() {
  const getSelected = useCart((s) => s.getSelected)
  const getSubtotal = useCart((s) => s.getSubtotal)
  const clear = useCart((s) => s.clear)

  const selected = useMemo(() => getSelected(), [getSelected])
  const subtotal = useMemo(() => getSubtotal(), [getSubtotal])

  return (
    <aside className="sticky top-20 rounded-xl border border-brand/10 bg-white p-4 shadow-sm">
      <h3 className="mb-2 text-lg font-semibold text-gray-900">Selection</h3>
      {selected.length === 0 ? (
        <p className="text-sm text-gray-500">No items selected yet.</p>
      ) : (
        <div className="space-y-2">
          <ul className="space-y-1 text-sm">
            {selected.map(({ item, quantity }) => (
              <li key={item.id} className="flex items-center justify-between">
                <span>
                  {item.name} x {quantity}
                </span>
                <span className="font-medium">{formatMoney(item.price * quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex items-center justify-between border-t pt-2 text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold">{formatMoney(subtotal)}</span>
          </div>
          <div className="mt-3 flex gap-2">
            <a href="/quotation" className="flex-1 rounded-md bg-gradient-to-r from-brand to-brand-dark px-3 py-2 text-center text-white shadow hover:opacity-95">Quotation</a>
            <a href="/invoice" className="flex-1 rounded-md border border-brand text-center text-brand hover:bg-brand/5">Invoice</a>
          </div>
          <button onClick={clear} className="mt-2 w-full rounded-md border border-red-300 px-3 py-2 text-sm text-red-600 hover:bg-red-50">Clear</button>
        </div>
      )}
    </aside>
  )
}
