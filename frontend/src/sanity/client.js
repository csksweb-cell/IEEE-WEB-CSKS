import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { allContentQuery } from './queries'

export const getSanityConfig = () => {
  const customProjectId = typeof window !== 'undefined' ? localStorage.getItem('csk_sanity_project_id') : null
  const customDataset = typeof window !== 'undefined' ? localStorage.getItem('csk_sanity_dataset') : null

  const effectiveProjectId = (customProjectId && customProjectId !== 'ieeecskc')
    ? customProjectId
    : (import.meta.env.VITE_SANITY_PROJECT_ID || 'kvtr8mms')

  const effectiveDataset = customDataset || import.meta.env.VITE_SANITY_DATASET || 'production'

  return {
    projectId: effectiveProjectId,
    dataset: effectiveDataset,
    apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01',
    useCdn: false, 
  }
}

export const getClient = () => createClient(getSanityConfig())
export const sanityClient = getClient()

export function urlFor(source) {
  if (!source) return null
  if (typeof source === 'string') return source
  if (source.asset) {
    try {
      const builder = imageUrlBuilder(getClient())
      return builder.image(source).auto('format').fit('max').url()
    } catch (e) {
      console.warn('Error generating image URL:', e)
      return null
    }
  }
  return null
}

export async function fetchSanityContent() {
  const config = getSanityConfig()

  try {
    const client = getClient()
    const result = await client.fetch(allContentQuery)

    return {
      data: {
        settings: result?.settings ?? null,
        hero: result?.hero ?? null,
        storyChapters: result?.storyChapters ?? null,
        pillars: result?.pillars ?? null,
        stats: result?.stats ?? null,
        events: result?.events ?? null,
        teamMembers: result?.teamMembers ?? null,
        galleryItems: result?.galleryItems ?? null,
      },
      isLive: true,
      projectId: config.projectId,
      dataset: config.dataset,
      message: `Live data fetched from Sanity (${config.projectId}/${config.dataset})`,
    }
  } catch (err) {
    console.error('Sanity content fetch failed:', err)

    return {
      data: null,
      isLive: false,
      projectId: config.projectId,
      dataset: config.dataset,
      error: err instanceof Error ? err.message : String(err),
      message: 'Failed to fetch content from Sanity.',
    }
  }
}
