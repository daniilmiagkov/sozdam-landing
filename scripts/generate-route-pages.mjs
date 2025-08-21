// scripts/generate-route-pages.mjs
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const distDir = path.resolve(__dirname, '..', 'dist')
const indexPath = path.join(distDir, 'index.html')

const routes = [
  '',
  'relevance',
  'architecture',
  'dataset',
  'team',
  'demo'
]

if (!fs.existsSync(indexPath)) {
  console.error('Error: dist/index.html not found. Run build first.')
  process.exit(1)
}

const content = fs.readFileSync(indexPath, 'utf8')

for (const route of routes) {
  if (!route) continue
  const dir = path.join(distDir, route)
  fs.mkdirSync(dir, { recursive: true })
  const target = path.join(dir, 'index.html')
  fs.writeFileSync(target, content, 'utf8')
  console.log('Wrote', target)
}

console.log('All done.')
