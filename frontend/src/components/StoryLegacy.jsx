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
        <div style={{ marginBottom: '3rem' }}>
          <span className="eyebrow">Our legacy</span>
          <h2 className="h-sec" style={{ marginTop: '0.8rem' }}>
            Four decades of <em>people</em>,<br />code and community.
          </h2>
        </div>

        <div className="story-grid">
          {/* Visual Frame */}
          <div className="story-visual">
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
          </div>

          {/* Story Details & Controls */}
          <div className="story-controls">
            {/* Step Selector Dots */}
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

            {/* Active Chapter Content */}
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

            {/* Next / Prev Controls */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                className="btn btn-ghost"
                onClick={prevChapter}
                style={{ padding: '0.65rem 1rem' }}
                aria-label="Previous story milestone"
              >
                <ChevronLeft size={18} /> Prev
              </button>
              <button
                className="btn btn-ghost"
                onClick={nextChapter}
                style={{ padding: '0.65rem 1rem' }}
                aria-label="Next story milestone"
              >
                Next <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
