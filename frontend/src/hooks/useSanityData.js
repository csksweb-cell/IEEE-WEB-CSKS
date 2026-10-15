import { useState, useEffect, useCallback } from 'react'
import { fetchSanityContent, getClient } from '../sanity/client'

export function useSanityData() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isLive, setIsLive] = useState(false)
  const [projectId, setProjectId] = useState('kvtr8mms')
  const [dataset, setDataset] = useState('production')
  const [message, setMessage] = useState('')
  const [error, setError] = useState(null)

  const reloadData = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetchSanityContent()
      setData(res.data)        
      setIsLive(res.isLive)
      setProjectId(res.projectId)
      setDataset(res.dataset)
      setMessage(res.message)
      setError(res.error ?? null)
    } catch (err) {
      setError(err.message)
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    reloadData()

    let subscription = null
    try {
      const client = getClient()
      if (client && typeof client.listen === 'function') {
        subscription = client
          .listen('*[!(_id in path("_.**"))]', {}, { visibility: 'query' })
          .subscribe({
            next: () => {
              reloadData()
            },
            error: (err) => {
              console.warn('Sanity live listener warning:', err)
            }
          })
      }
    } catch (err) {
      console.warn('Could not initialize Sanity live listener:', err)
    }

    return () => {
      if (subscription && typeof subscription.unsubscribe === 'function') {
        subscription.unsubscribe()
      }
    }
  }, [reloadData])

  const updateConfig = (newProjectId, newDataset) => {
    if (newProjectId) localStorage.setItem('csk_sanity_project_id', newProjectId.trim())
    else localStorage.removeItem('csk_sanity_project_id')

    if (newDataset) localStorage.setItem('csk_sanity_dataset', newDataset.trim())
    else localStorage.removeItem('csk_sanity_dataset')

    reloadData()
  }

  return {
    data,
    loading,
    isLive,
    projectId,
    dataset,
    message,
    error,
    reloadData,
    updateConfig,
  }
}
