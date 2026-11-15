import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { urlFor } from '../sanity/client'

export default function StoryLegacy({ chapters }) {
  const [activeIndex, setActiveIndex] = useState(0)

  const items = chapters?.length ? chapters : []
  const activeChapter = items[activeIndex] ?? items[0]

  const nextChapter = () => {
    setActiveIndex((prev) => (prev + 1) % items.length)
  }

  const prevChapter = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  if (!items.length) return null

  const imageSrc = urlFor(activeChapter?.image)

  return (
    <section className="section" id="story">
      <div className="wrap">
        <motion.div
          style={{ marginBottom: '3rem' }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow">Our legacy</span>
          <h2 className="h-sec" style={{ marginTop: '0.8rem' }}>
            Four decades of <em>people</em>,<br />code and community.
          </h2>
        </motion.div>

        <div className="story-grid">
          
          <motion.div
            className="story-visual"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="story-badge-step">
              0{activeChapter.step ?? activeIndex + 1} / 0{items.length}
            </span>
            <AnimatePresence mode="wait">
              <motion.img
                key={activeIndex}
                src={imageSrc}
                alt={activeChapter.imageAlt ?? activeChapter.titlePrefix ?? 'Story milestone'}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
          </motion.div>

          <div className="story-controls">
            
            <div className="story-nav-dots">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  className={`story-dot ${idx === activeIndex ? 'active' : ''}`}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Go to story chapter ${idx + 1}`}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                className="story-card-active"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                <h3>
                  {activeChapter.titlePrefix}{' '}
                  {activeChapter.titleAccent && (
                    <em className="script">{activeChapter.titleAccent}</em>
                  )}{' '}
                  {activeChapter.titleSuffix}
                </h3>
                <p>{activeChapter.description}</p>
              </motion.div>
            </AnimatePresence>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <motion.button
                className="btn btn-ghost"
                onClick={prevChapter}
                style={{ padding: '0.65rem 1rem' }}
                aria-label="Previous story milestone"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                <ChevronLeft size={18} /> Prev
              </motion.button>
              <motion.button
                className="btn btn-ghost"
                onClick={nextChapter}
                style={{ padding: '0.65rem 1rem' }}
                aria-label="Next story milestone"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                Next <ChevronRight size={18} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
