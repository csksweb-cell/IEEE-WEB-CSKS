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
        <motion.div
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <span className="eyebrow">Moments in frame</span>
            <h2 className="h-sec" style={{ marginTop: '0.8rem' }}>
              Every story, <em>together</em>.
            </h2>
          </div>

          {categories.length > 2 && (
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: '0.45rem 1rem',
                    borderRadius: '999px',
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    border: '1px solid var(--line)',
                    background: activeCategory === cat ? 'var(--amber)' : 'var(--card)',
                    color: activeCategory === cat ? '#1a1611' : 'var(--ink-soft)',
                    transition: 'background 0.25s, color 0.25s, border-color 0.25s',
                    cursor: 'pointer',
                  }}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>

        <motion.div layout className="gallery-grid">
          <AnimatePresence>
            {filteredItems.map((item) => {
              const src = urlFor(item.image)
              if (!src) return null

              return (
                <motion.div
                  key={item._id || item.title}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6 }}
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
