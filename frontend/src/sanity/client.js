import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { allContentQuery } from './queries'

const getSanityConfig = () => {
  const customProjectId = localStorage.getItem('csk_sanity_project_id')
  const customDataset = localStorage.getItem('csk_sanity_dataset')

  return {
    projectId: customProjectId || import.meta.env.VITE_SANITY_PROJECT_ID || 'kvtr8mms',
    dataset: customDataset || import.meta.env.VITE_SANITY_DATASET || 'production',
    apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01',
    useCdn: import.meta.env.VITE_SANITY_USE_CDN === 'true',
  }
}

export const sanityConfig = getSanityConfig()
export const sanityClient = createClient(sanityConfig)

const builder = imageUrlBuilder(sanityClient)

/**
 * Resolves a Sanity image object to a CDN image URL
 */
export function urlFor(source) {
  if (!source) return ''
  if (typeof source === 'string') return source
  if (source.asset) {
    try {
      return builder.image(source).auto('format').fit('max').url()
    } catch {
      return ''
    }
  }
  return ''
}

const emptyData = {
  settings: {},
  hero: {},
  storyChapters: [],
  pillars: [],
  stats: [],
  events: [],
  teamMembers: [],
  galleryItems: [],
}

/**
 * Fetches site content directly from Sanity Content Lake.
 */
export async function fetchSanityContent() {
  const config = getSanityConfig()

  try {
    const client = createClient(config)
    const result = await client.fetch(allContentQuery)

    return {
      data: {
        settings: result?.settings || {},
        hero: result?.hero || {},
        storyChapters: result?.storyChapters || [],
        pillars: result?.pillars || [],
        stats: result?.stats || [],
        events: result?.events || [],
        teamMembers: result?.teamMembers || [],
        galleryItems: result?.galleryItems || [],
      },
      isLive: true,
      projectId: config.projectId,
      dataset: config.dataset,
      message: `Live data fetched directly from Sanity (${config.projectId}/${config.dataset})`,
    }
  } catch (err) {
    console.error('Failed to fetch from Sanity:', err.message)
    return {
      data: emptyData,
      isLive: false,
      projectId: config.projectId,
      dataset: config.dataset,
      error: err.message,
      message: `Sanity query failed: ${err.message}`,
    }
  }
}
