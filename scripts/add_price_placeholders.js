// Adds a blank price field to every product in src/data/shop_inventory.json
// Usage: node scripts/add_price_placeholders.js
const fs = require('fs')
const path = require('path')

const filePath = path.resolve(__dirname, '..', 'src', 'data', 'shop_inventory.json')

function main() {
  const raw = fs.readFileSync(filePath, 'utf8')
  const data = JSON.parse(raw)
  if (!data || !Array.isArray(data.categories)) {
    console.error('Invalid schema: expected { categories: [...] }')
    process.exit(1)
  }
  let updated = 0
  for (const cat of data.categories) {
    if (!cat || !Array.isArray(cat.products)) continue
    for (const p of cat.products) {
      if (p && !('price' in p)) {
        p.price = ''
        updated++
      }
    }
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8')
  console.log(`Updated ${updated} products with blank price.`)
}

main()
