# PriceList PWA

A simple Next.js PWA to list item prices, search/select items, and generate a quotation or invoice. Works offline using a service worker.

## Features
- Item catalog with search
- Select quantities and see a live subtotal
- Quotation and Invoice pages with print/save-to-PDF
- PWA: installable, offline support (static assets and pages)

## Tech
- Next.js (App Router) + TypeScript
- Tailwind CSS
- Zustand for state
- next-pwa for service worker

## Development
1. Install dependencies
2. Run the dev server at http://localhost:3000

```powershell
npm install
npm run dev
```

## Build
```powershell
npm run build
npm start
```

## Testing (Vitest)
```powershell
npm test
```

## Notes
- Icons in `public/icons` are placeholders; replace `icon-192.png` and `icon-512.png` with your real PNGs for proper PWA install banners.
- Use the Quotation/Invoice page “Print / Save PDF” button to export.