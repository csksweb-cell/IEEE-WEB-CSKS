import React, { useState } from 'react'
import { X, Database, CheckCircle2, AlertCircle, RefreshCw, ExternalLink } from 'lucide-react'

export default function SanityModal({ isOpen, onClose, sanityMeta, onUpdateConfig }) {
  if (!isOpen) return null

  const [inputProjectId, setInputProjectId] = useState(
    sanityMeta.projectId === 'ieeecskc' ? '' : sanityMeta.projectId
  )
  const [inputDataset, setInputDataset] = useState(sanityMeta.dataset || 'production')

  const handleSave = (e) => {
    e.preventDefault()
    onUpdateConfig(inputProjectId, inputDataset)
    onClose()
  }

  const handleReset = () => {
    setInputProjectId('')
    setInputDataset('production')
    onUpdateConfig('', 'production')
  }

  return (
    <div className="sanity-modal-backdrop" onClick={onClose}>
      <div className="sanity-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="sanity-modal-head">
          <h3>
            <Database size={22} color="var(--amber-deep)" />
            Sanity Content Lake Connection
          </h3>
          <button onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div
          style={{
            padding: '1rem',
            borderRadius: '12px',
            background: sanityMeta.isLive
              ? 'rgba(16, 185, 129, 0.12)'
              : 'rgba(245, 166, 35, 0.12)',
            border: `1px solid ${
              sanityMeta.isLive ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 166, 35, 0.3)'
            }`,
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem',
          }}
        >
          {sanityMeta.isLive ? (
            <CheckCircle2 size={20} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
          ) : (
            <AlertCircle size={20} color="var(--amber-deep)" style={{ flexShrink: 0, marginTop: '2px' }} />
          )}
          <div style={{ fontSize: '0.88rem' }}>
            <strong>
              {sanityMeta.isLive ? 'Connected to Live Sanity' : 'Preview Mode (Local Dataset)'}
            </strong>
            <p style={{ marginTop: '0.25rem', color: 'var(--ink-soft)' }}>
              {sanityMeta.message ||
                'The website architecture is completely headless: no data is stored in the React app, it is requested via GROQ queries.'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSave}>
          <div className="input-group">
            <label>Sanity Project ID</label>
            <input
              type="text"
              placeholder="e.g. abc123xy (leave blank for local seed)"
              value={inputProjectId}
              onChange={(e) => setInputProjectId(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Dataset</label>
            <input
              type="text"
              placeholder="production"
              value={inputDataset}
              onChange={(e) => setInputDataset(e.target.value)}
            />
          </div>

          <div
            style={{
              display: 'flex',
              gap: '0.75rem',
              justifyContent: 'flex-end',
              marginTop: '1.5rem',
            }}
          >
            <button
              type="button"
              className="btn btn-ghost"
              style={{ fontSize: '0.85rem', padding: '0.65rem 1.2rem' }}
              onClick={handleReset}
            >
              Reset to Default
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ fontSize: '0.85rem', padding: '0.65rem 1.4rem' }}
            >
              Connect & Refresh
            </button>
          </div>
        </form>

        <div
          style={{
            marginTop: '1.5rem',
            paddingTop: '1.2rem',
            borderTop: '1px solid var(--line)',
            fontSize: '0.82rem',
            color: 'var(--ink-faint)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>Sanity Studio located at <code>IEEE-WEB-CSKS/sanity-studio/</code></span>
          <a
            href="https://www.sanity.io/docs"
            target="_blank"
            rel="noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: 'var(--amber-deep)' }}
          >
            Sanity Docs <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </div>
  )
}
