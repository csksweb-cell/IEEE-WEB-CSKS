/**
 * Seed script to push initial IEEE Computer Society Kerala Chapter records to Sanity Content Lake
 * Usage:
 *   SANITY_TOKEN="your-write-token" node scripts/seed.js
 */
import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const seedDataPath = path.join(__dirname, '../seedData.json')
const rawData = fs.readFileSync(seedDataPath, 'utf8')
const data = JSON.parse(rawData)

const projectId = process.env.SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID || 'ieeecskc'
const dataset = process.env.SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production'
const token = process.env.SANITY_TOKEN || process.env.SANITY_AUTH_TOKEN

if (!token) {
  console.log('⚠️  No SANITY_TOKEN found in environment variables.')
  console.log('To seed directly to live Sanity Content Lake, provide your Sanity Editor or Admin Token:')
  console.log('   SANITY_TOKEN=your_token node scripts/seed.js')
  console.log(`Targeting Project: ${projectId}, Dataset: ${dataset}`)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

async function seed() {
  if (!token) {
    console.log('\n✅ Validation check passed: seedData.json is well-formed with:')
    console.log(`- Site Settings`)
    console.log(`- Hero section`)
    console.log(`- ${data.storyChapters.length} Story Chapters`)
    console.log(`- ${data.pillars.length} Pillars`)
    console.log(`- ${data.stats.length} Stats`)
    console.log(`- ${data.events.length} Upcoming Events`)
    console.log(`- ${data.teamMembers.length} Team Members`)
    console.log('\nOnce you have your Sanity token, run with SANITY_TOKEN=sk... to publish to Sanity Cloud.')
    return
  }

  console.log(`🚀 Seeding documents to Sanity (${projectId}/${dataset})...`)

  const transaction = client.transaction()

  // 1. Site Settings
  transaction.createOrReplace(data.siteSettings)

  // 2. Hero
  transaction.createOrReplace(data.hero)

  // 3. Story Chapters
  data.storyChapters.forEach((chapter) => transaction.createOrReplace(chapter))

  // 4. Pillars
  data.pillars.forEach((pillar) => transaction.createOrReplace(pillar))

  // 5. Stats
  data.stats.forEach((stat) => transaction.createOrReplace(stat))

  // 6. Events
  data.events.forEach((event) => transaction.createOrReplace(event))

  // 7. Team Members
  data.teamMembers.forEach((member) => transaction.createOrReplace(member))

  try {
    const result = await transaction.commit()
    console.log(`✨ Successfully seeded all IEEE CS Kerala Chapter documents to Sanity! Transaction ID: ${result.transactionId}`)
  } catch (err) {
    console.error('❌ Failed to seed Sanity dataset:', err.message)
  }
}

seed()
