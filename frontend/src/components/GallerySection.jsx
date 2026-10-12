import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { urlFor } from '../sanity/client'

export default function GallerySection({ items }) {
  const [activeCategory, setActiveCategory] = useState('All')

  const galleryList = items?.length
    ? items
    : [
        { _id: '1', title: 'DataOps Workshop', category: 'Workshop', image: '/assets/img/event-03.jpg' },
        { _id: '2', title: 'Systems Lab', category: 'Lab', image: '/assets/img/event-04.jpg' },
        { _id: '3', title: 'Leaders Panel', category: 'Panel', image: '/assets/img/event-07.jpg' },
        { _id: '4', title: 'Community Night', category: 'Community', image: '/assets/img/event-01.jpg' },
        { _id: '5', title: 'Awards Evening', category: 'Meetup', image: '/assets/img/event-08.jpg' },
        { _id: '6', title: 'Annual Meetup', category: 'Meetup', image: '/assets/img/event-05.jpg' },
        { _id: '7', title: 'Chapter Retreat', category: 'Retreat', image: '/assets/img/event-06.jpg' },
        { _id: '8', title: 'On Stage', category: 'On Stage', image: '/assets/img/event-02.jpg' },
      ]

  const categories = ['All', ...new Set(galleryList.map((item) => item.category).filter(Boolean))]

  const filteredItems =
    activeCategory === 'All'
      ? galleryList
      : galleryList.filter((item) => item.category === activeCategory)

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

          {/* Filter Pills */}
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
        </div>

        {/* Grid */}
        <motion.div layout className="gallery-grid">
          <AnimatePresence>
            {filteredItems.map((item) => {
              const src = urlFor(item.image) || '/assets/img/event-01.jpg'
              return (
                <motion.div
                  key={item._id || item.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="gallery-card"
                >
                  <img src={src} alt={item.title} loading="lazy" />
                  <div className="gallery-cap">
                    <span>{item.title}</span>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
