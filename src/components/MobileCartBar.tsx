"use client"
import { useMemo } from 'react'
import { useCart } from '@/lib/store'
import { formatMoney } from '@/lib/money'

export default function MobileCartBar() {
  const getSelected = useCart((s) => s.getSelected)
  const getSubtotal = useCart((s) => s.getSubtotal)
  const selected = useMemo(() => getSelected(), [getSelected])
  const subtotal = useMemo(() => getSubtotal(), [getSubtotal])

  if (selected.length === 0) return null

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-brand/20 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 md:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      role="region"
      aria-label="Cart summary"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-xs text-gray-500">Subtotal</span>
          <span className="text-base font-semibold text-gray-900">{formatMoney(subtotal)}</span>
        </div>
        <div className="flex shrink-0 gap-2">
          <a
            href="/quotation"
            className="rounded-md bg-gradient-to-r from-brand to-brand-dark px-3 py-2 text-sm font-medium text-white shadow active:scale-95"
          >
            Quotation
          </a>
          <a
            href="/invoice"
            className="rounded-md border border-brand px-3 py-2 text-sm font-medium text-brand active:scale-95"
          >
            Invoice
          </a>
        </div>
      </div>
    </div>
  )
}
