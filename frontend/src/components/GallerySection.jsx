import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { urlFor } from '../sanity/client'

export default function GallerySection({ items }) {
  if (!items || items.length === 0) return null

  const [activeCategory, setActiveCategory] = useState('All')
  const categories = ['All', ...new Set(items.map((item) => item.category).filter(Boolean))]

  const filteredItems =
    activeCategory === 'All'
      ? items
      : items.filter((item) => item.category === activeCategory)

  return (
    <section className="section" id="gallery" style={{ paddingTop: '2rem' }}>
      <div className="wrap">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
          <div>
            <span className="eyebrow">Moments in frame</span>
            <h2 className="h-sec" style={{ marginTop: '0.8rem' }}>
              Every story, <em>together</em>.
            </h2>
          </div>

          {categories.length > 2 && (
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '0.45rem 1rem',
                    borderRadius: '999px',
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    border: '1px solid var(--line)',
                    background: activeCategory === cat ? 'var(--amber)' : 'var(--card)',
                    color: activeCategory === cat ? '#1a1611' : 'var(--ink-soft)',
                    transition: 'all 0.2s',
                    cursor: 'pointer',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        <motion.div layout className="gallery-grid">
          <AnimatePresence>
            {filteredItems.map((item) => {
              const src = urlFor(item.image)
              if (!src) return null

              return (
                <motion.div
                  key={item._id || item.title}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="gallery-card"
                >
                  <img src={src} alt={item.title || ''} loading="lazy" />
                  {item.title && (
                    <div className="gallery-cap">
                      <span>{item.title}</span>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
