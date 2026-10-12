import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { allContentQuery } from './queries'
import { fallbackData } from './fallbackData'

// Read env variables (or allow runtime override stored in localStorage)
const getSanityConfig = () => {
  const customProjectId = localStorage.getItem('csk_sanity_project_id')
  const customDataset = localStorage.getItem('csk_sanity_dataset')

  return {
    projectId: customProjectId || import.meta.env.VITE_SANITY_PROJECT_ID || 'ieeecskc',
    dataset: customDataset || import.meta.env.VITE_SANITY_DATASET || 'production',
    apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01',
    useCdn: import.meta.env.VITE_SANITY_USE_CDN !== 'false',
  }
}

export const sanityConfig = getSanityConfig()

export const sanityClient = createClient(sanityConfig)

const builder = imageUrlBuilder(sanityClient)

/**
 * Resolves a Sanity image object or fallback string to a valid image URL
 */
export function urlFor(source) {
  if (!source) return ''
  // If it's already a string URL/path (fallback or external)
  if (typeof source === 'string') return source
  // If it's a Sanity image object with an asset reference
  if (source.asset) {
    try {
      return builder.image(source).auto('format').fit('max').url()
    } catch {
      return ''
    }
  }
  return ''
}

/**
 * Fetches all site content from Sanity Content Lake.
 * Returns { data, isLive, projectId, dataset, error }
 */
export async function fetchSanityContent() {
  const config = getSanityConfig()

  // If using placeholder project id and not connected to live sanity
  if (!config.projectId || config.projectId === 'ieeecskc' || config.projectId === 'your_project_id') {
    return {
      data: fallbackData,
      isLive: false,
      projectId: config.projectId,
      dataset: config.dataset,
      message: 'Running in preview mode with full seed data. Connect your Sanity project ID to pull live updates!',
    }
  }

  try {
    const freshClient = createClient(config)
    const result = await freshClient.fetch(allContentQuery)

    // Merge result with fallback in case certain documents aren't created yet in Studio
    const mergedData = {
      settings: result.settings || fallbackData.settings,
      hero: result.hero || fallbackData.hero,
      storyChapters: result.storyChapters?.length ? result.storyChapters : fallbackData.storyChapters,
      pillars: result.pillars?.length ? result.pillars : fallbackData.pillars,
      stats: result.stats?.length ? result.stats : fallbackData.stats,
      events: result.events?.length ? result.events : fallbackData.events,
      teamMembers: result.teamMembers?.length ? result.teamMembers : fallbackData.teamMembers,
      galleryItems: result.galleryItems?.length ? result.galleryItems : fallbackData.galleryItems,
    }

    return {
      data: mergedData,
      isLive: true,
      projectId: config.projectId,
      dataset: config.dataset,
      message: `Live data fetched from Sanity Content Lake (${config.projectId}/${config.dataset})`,
    }
  } catch (err) {
    console.warn('Sanity query failed, falling back to local dataset:', err.message)
    return {
      data: fallbackData,
      isLive: false,
      projectId: config.projectId,
      dataset: config.dataset,
      error: err.message,
      message: `Sanity query error: ${err.message}. Showing local seed data.`,
    }
  }
}
