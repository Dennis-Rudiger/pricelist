"use client"
import React from 'react'

function cleanupCachesAndSW() {
  try {
    if ('caches' in window) {
      caches.keys().then((keys) => keys.forEach((k) => caches.delete(k))).catch(() => {})
    }
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((regs) => {
        regs.forEach((r) => r.unregister())
      }).catch(() => {})
    }
  } catch {}
}

export default function ClientBoot() {
  React.useEffect(() => {
    // In dev, aggressively remove any stale SW that might be controlling from a prior prod build
    if (process.env.NODE_ENV === 'development') {
      cleanupCachesAndSW()
    }

    const onError = (ev: ErrorEvent) => {
      const msg = ev?.message || ''
      if (/ChunkLoadError|Loading chunk .* failed|Failed to fetch dynamically imported module|timeout/i.test(msg)) {
        cleanupCachesAndSW()
        // Delay slightly to allow unregister before reload
        setTimeout(() => window.location.reload(), 100)
      }
    }
    const onRejection = (ev: PromiseRejectionEvent) => {
      const msg = String(ev?.reason?.message || ev?.reason || '')
      if (/ChunkLoadError|Loading chunk .* failed|Failed to fetch dynamically imported module|timeout/i.test(msg)) {
        cleanupCachesAndSW()
        setTimeout(() => window.location.reload(), 100)
      }
    }

    window.addEventListener('error', onError)
    window.addEventListener('unhandledrejection', onRejection)
    return () => {
      window.removeEventListener('error', onError)
      window.removeEventListener('unhandledrejection', onRejection)
    }
  }, [])

  return null
}
