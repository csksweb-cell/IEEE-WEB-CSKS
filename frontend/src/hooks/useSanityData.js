import { useState, useEffect, useCallback } from 'react'
import { fetchSanityContent } from '../sanity/client'
import { fallbackData } from '../sanity/fallbackData'

export function useSanityData() {
  const [data, setData] = useState(fallbackData)
  const [loading, setLoading] = useState(true)
  const [isLive, setIsLive] = useState(false)
  const [projectId, setProjectId] = useState('ieeecskc')
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
      setError(res.error || null)
    } catch (err) {
      setError(err.message)
      setData(fallbackData)
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
