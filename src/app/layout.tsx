import React from 'react'
import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'
import ClientBoot from '@/components/ClientBoot'
import InstallApp from '@/components/InstallApp'

export const metadata: Metadata = {
  title: 'PriceList',
  description: 'Browse items, build quotes, and generate invoices',
  manifest: '/manifest.json',
  themeColor: '#2563eb',
  icons: {
    // Use 192x192 for Apple touch icon if 180x180 is unavailable
    apple: '/icons/icon-192.png',
    icon: [
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  appleWebApp: {
    capable: true,
    title: 'PriceList',
    statusBarStyle: 'default',
  },
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
        <header className="no-print sticky top-0 z-10 border-b border-brand/10 bg-gradient-to-r from-brand to-brand-dark text-white shadow">
          <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
            <Link href="/" className="text-xl font-semibold text-white">PriceList</Link>
            <nav className="flex items-center gap-6 text-sm">
              <Link href="/" className="opacity-90 transition hover:opacity-100">Items</Link>
              <Link href="/quotation" className="opacity-90 transition hover:opacity-100">Quotation</Link>
              <Link href="/invoice" className="opacity-90 transition hover:opacity-100">Invoice</Link>
              <InstallApp />
            </nav>
          </div>
        </header>
        <main className="print-area mx-auto max-w-6xl p-4">{children}</main>
      </body>
    </html>
  )
}
