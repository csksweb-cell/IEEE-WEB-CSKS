import { useState, useEffect, useCallback } from 'react'
import { fetchSanityContent } from '../sanity/client'

/**
 * Strict Sanity-only data hook.
 * Initial state is null for every field — components must handle null explicitly.
 * No fallback objects or arrays are injected at any point.
 */
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
      setData(res.data)        // null on error, object with nulls on empty Sanity
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
