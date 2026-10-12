import React from 'react'
import { motion } from 'framer-motion'
import { urlFor } from '../sanity/client'

export default function Hero({ hero, galleryItems }) {
  const slides = (galleryItems && galleryItems.length > 0)
    ? [...galleryItems, ...galleryItems]
    : []

  return (
    <section className="hero" id="top">
      {/* Background Animated Event Photos from Sanity */}
      {slides.length > 0 && (
        <div className="hero-track-wrap">
          <div className="hero-track">
            {slides.map((slide, i) => {
              const imgSrc = urlFor(slide.image)
              if (!imgSrc) return null
              return (
                <div key={i} className="hero-slide">
                  <img src={imgSrc} alt={slide.title || ''} loading="eager" />
                  {slide.category && <span className="slide-tag">{slide.category}</span>}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Frosted Acrylic Scrim */}
      <div className="hero-scrim" aria-hidden="true"></div>

      <div className="wrap">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {hero?.badge && (
            <div className="hero-badge glass">
              <span className="pulse"></span>
              <span>{hero.badge}</span>
            </div>
          )}

          <h1>
            <span>{hero?.titleLine1 || 'Four'} </span>
            {hero?.titleAccent && <span className="accent">{hero.titleAccent} </span>}
            <span>{hero?.titleLine2 || 'of Computing.'}</span>
          </h1>

          {hero?.subtitle && <p className="hero-sub">{hero.subtitle}</p>}

          <div className="hero-actions">
            {hero?.primaryCtaText && (
              <a href={hero?.primaryCtaLink || '#story'} className="btn btn-primary">
                <span className="dot"></span> {hero.primaryCtaText}
              </a>
            )}
            {hero?.secondaryCtaText && (
              <a href={hero?.secondaryCtaLink || '#events'} className="btn btn-ghost">
                {hero.secondaryCtaText}
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
