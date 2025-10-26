import React from 'react'
import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'
import ClientBoot from '@/components/ClientBoot'

export const metadata: Metadata = {
  title: 'PriceList',
  description: 'Browse items, build quotes, and generate invoices',
  manifest: '/manifest.json',
}

export const viewport = {
  themeColor: '#2563eb',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        {/* client bootstrap for SW/chunk error handling */}
        <ClientBoot />
        <header className="no-print sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
            <Link href="/" className="text-xl font-semibold text-brand">PriceList</Link>
            <nav className="flex gap-4 text-sm">
              <Link href="/" className="hover:text-brand">Items</Link>
              <Link href="/quotation" className="hover:text-brand">Quotation</Link>
              <Link href="/invoice" className="hover:text-brand">Invoice</Link>
            </nav>
          </div>
        </header>
        <main className="print-area mx-auto max-w-6xl p-4">{children}</main>
      </body>
    </html>
  )
}
