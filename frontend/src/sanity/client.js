import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { allContentQuery } from './queries'

export const getSanityConfig = () => {
  const customProjectId = typeof window !== 'undefined' ? localStorage.getItem('csk_sanity_project_id') : null
  const customDataset = typeof window !== 'undefined' ? localStorage.getItem('csk_sanity_dataset') : null

  // Ensure 'ieeecskc' or invalid placeholder doesn't block loading
  const effectiveProjectId = (customProjectId && customProjectId !== 'ieeecskc')
    ? customProjectId
    : (import.meta.env.VITE_SANITY_PROJECT_ID || 'kvtr8mms')

  const effectiveDataset = customDataset || import.meta.env.VITE_SANITY_DATASET || 'production'

  return {
    projectId: effectiveProjectId,
    dataset: effectiveDataset,
    apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01',
    useCdn: false, // Ensure fresh live content is returned directly
  }
}

export const getClient = () => createClient(getSanityConfig())
export const sanityClient = getClient()

/**
 * Resolves a Sanity image object or reference to a CDN image URL.
 */
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

/**
 * Fetches site content directly from Sanity Content Lake in strict mode.
 * Tries direct Sanity client first; if blocked by browser CORS, falls back to Vite dev proxy seamlessly.
 */
export async function fetchSanityContent() {
  const config = getSanityConfig()

  // 1. Try standard @sanity/client
  try {
    const client = getClient()
    const result = await client.fetch(allContentQuery)

    return {
      data: {
        settings:      result?.settings      ?? null,
        hero:          result?.hero          ?? null,
        storyChapters: result?.storyChapters ?? null,
        pillars:       result?.pillars       ?? null,
        stats:         result?.stats         ?? null,
        events:        result?.events        ?? null,
        teamMembers:   result?.teamMembers   ?? null,
        galleryItems:  result?.galleryItems  ?? null,
      },
      isLive:    true,
      projectId: config.projectId,
      dataset:   config.dataset,
      message:   `Live data fetched from Sanity (${config.projectId}/${config.dataset})`,
    }
  } catch (directErr) {
    console.warn('Direct Sanity client fetch failed (likely CORS). Trying Vite proxy fallback...', directErr.message)

    // 2. Try proxy through Vite dev server (/sanity-api)
    try {
      const proxyUrl = `/sanity-api/${config.apiVersion}/data/query/${config.dataset}?query=${encodeURIComponent(allContentQuery)}`
      const resp = await fetch(proxyUrl)
      if (!resp.ok) {
        throw new Error(`HTTP error ${resp.status}: ${resp.statusText}`)
      }
      const json = await resp.json()
      const result = json.result

      return {
        data: {
          settings:      result?.settings      ?? null,
          hero:          result?.hero          ?? null,
          storyChapters: result?.storyChapters ?? null,
          pillars:       result?.pillars       ?? null,
          stats:         result?.stats         ?? null,
          events:        result?.events        ?? null,
          teamMembers:   result?.teamMembers   ?? null,
          galleryItems:  result?.galleryItems  ?? null,
        },
        isLive:    true,
        projectId: config.projectId,
        dataset:   config.dataset,
        message:   `Live data fetched via dev proxy from Sanity (${config.projectId}/${config.dataset})`,
      }
    } catch (proxyErr) {
      console.error('Failed to fetch from Sanity via proxy:', proxyErr.message)
      return {
        data:      null,
        isLive:    false,
        projectId: config.projectId,
        dataset:   config.dataset,
        error:     directErr.message,
        message:   `Sanity query failed: ${directErr.message}`,
      }
    }
  }
}
