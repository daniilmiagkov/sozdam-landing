// scripts/generate-route-pages.js
// Usage: run after build (dist must exist)
// node ./scripts/generate-route-pages.js

const fs = require('node:fs')
const path = require('node:path')
const process = require('node:process')

const distDir = path.resolve(__dirname, '..', 'dist')
const indexPath = path.join(distDir, 'index.html')

// перечисли тут все статические маршруты (без ведущего слеша)
// '' означает корень (index.html)
const routes = [
  '', // root (index.html)
  'relevance',
  'architecture',
  'dataset',
  'team',
  'demo',
]

if (!fs.existsSync(indexPath)) {
  console.error('Error: dist/index.html not found. Run build first.')
  process.exit(1)
}

const content = fs.readFileSync(indexPath, 'utf8')

// Для каждого маршрута создаём папку <dist>/<route>/index.html
routes.forEach((route) => {
  // route '' -> dist/ (we already have index.html)
  if (!route)
    return
  const dir = path.join(distDir, route)
  fs.mkdirSync(dir, { recursive: true })
  const target = path.join(dir, 'index.html')
  fs.writeFileSync(target, content, 'utf8')
  console.log('Wrote', path.relative(process.cwd(), target))
})

console.log('All done.')
