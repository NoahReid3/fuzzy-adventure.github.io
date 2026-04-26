import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const qRaw = readFileSync(join(__dirname, 'qraw.txt'), 'utf8')
const questions = qRaw
  .split('\n')
  .map((l) => l.trim())
  .filter((l) => l.length > 0)
  .map((l) => l.replace(/\s*\(\d+\)\s*$/, ''))

const aRaw = readFileSync(join(__dirname, 'answers-merged.txt'), 'utf8')
const answers = aRaw
  .split('\n')
  .map((l) => l.trim())
  .filter((l) => l.length > 0)

if (questions.length !== answers.length) {
  console.error(`Mismatch: ${questions.length} questions vs ${answers.length} answers`)
  process.exit(1)
}

const facts = questions.map((question, i) => ({
  question,
  answer: answers[i] || '—',
}))

const out = join(__dirname, '../src/data/igcseGeographyFacts.json')
writeFileSync(out, JSON.stringify(facts) + '\n', 'utf8')
console.log(`Wrote ${facts.length} items to`, out)
