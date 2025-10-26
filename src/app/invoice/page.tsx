"use client"
import { useMemo, useState } from 'react'
import { useCart } from '@/lib/store'
import { formatMoney } from '@/lib/money'

export default function InvoicePage() {
  const selected = useCart((s) => s.getSelected())
  const subtotal = useCart((s) => s.getSubtotal())
  const [company, setCompany] = useState('')
  const [customer, setCustomer] = useState('')
  const [taxRate, setTaxRate] = useState(0)
  const [invoiceNo, setInvoiceNo] = useState(() => `INV-${Date.now().toString().slice(-6)}`)

  const tax = useMemo(() => (subtotal * taxRate) / 100, [subtotal, taxRate])
  const total = useMemo(() => subtotal + tax, [subtotal, tax])

  return (
    <div className="space-y-4">
      <div className="no-print flex flex-wrap gap-3">
        <input
          className="min-w-64 flex-1 rounded border px-3 py-2 text-sm"
          placeholder="Your company name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <input
          className="min-w-64 flex-1 rounded border px-3 py-2 text-sm"
          placeholder="Bill to: Customer name"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        />
        <input
          className="w-40 rounded border px-3 py-2 text-sm"
          placeholder="Invoice No."
          value={invoiceNo}
          onChange={(e) => setInvoiceNo(e.target.value)}
        />
        <input
          type="number"
          className="w-28 rounded border px-3 py-2 text-sm"
          placeholder="Tax %"
          value={taxRate}
          onChange={(e) => setTaxRate(Number(e.target.value))}
        />
        <button className="rounded bg-brand px-3 py-2 text-white" onClick={() => window.print()}>
          Print / Save PDF
        </button>
      </div>

      <div className="rounded-md border bg-white p-4">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <div className="text-xl font-semibold">Invoice</div>
            <div className="text-sm text-gray-600">{new Date().toLocaleDateString()}</div>
          </div>
          <div className="text-right">
            <div className="font-medium">{invoiceNo}</div>
            {company && <div className="text-sm text-gray-600">{company}</div>}
            {customer && <div className="text-sm text-gray-600">Bill to: {customer}</div>}
          </div>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-gray-600">
              <th className="py-2">Item</th>
              <th className="py-2">Qty</th>
              <th className="py-2">Unit Price</th>
              <th className="py-2 text-right">Line Total</th>
            </tr>
          </thead>
          <tbody>
            {selected.length === 0 ? (
              <tr>
                <td className="py-3 text-gray-500" colSpan={4}>No items selected.</td>
              </tr>
            ) : (
              selected.map(({ item, quantity }) => (
                <tr key={item.id} className="border-b last:border-b-0">
                  <td className="py-2">
                    <div className="font-medium">{item.name}</div>
                    {item.description && <div className="text-xs text-gray-500">{item.description}</div>}
                  </td>
                  <td className="py-2">{quantity}</td>
                  <td className="py-2">{formatMoney(item.price)}</td>
                  <td className="py-2 text-right">{formatMoney(item.price * quantity)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="mt-4 ml-auto max-w-sm space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">{formatMoney(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax ({taxRate}%)</span>
            <span className="font-medium">{formatMoney(tax)}</span>
          </div>
          <div className="flex justify-between border-t pt-2 text-base">
            <span className="font-semibold">Total</span>
            <span className="font-semibold">{formatMoney(total)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
