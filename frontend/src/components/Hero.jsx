import React from 'react'
import { motion } from 'framer-motion'
import { urlFor } from '../sanity/client'

export default function Hero({ hero, galleryItems }) {
  
  if (!hero && (!galleryItems || galleryItems.length === 0)) return null

  const slides = galleryItems && galleryItems.length > 0
    ? [...galleryItems, ...galleryItems]
    : []

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  }

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section className="hero" id="top">
      
      {slides.length > 0 && (
        <div className="hero-track-wrap">
          <div className="hero-track">
            {slides.map((slide, i) => {
              const imgSrc = urlFor(slide.image)
              if (!imgSrc) return null
              return (
                <div key={i} className="hero-slide">
                  <img src={imgSrc} alt={slide.title ?? ''} loading="eager" />
                  {slide.category && <span className="slide-tag">{slide.category}</span>}
                </div>
              )
            })}
          </div>
        </div>
      )}

      <div className="hero-scrim" aria-hidden="true"></div>

      <div className="wrap">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {hero?.badge && (
            <motion.div variants={childVariants} className="hero-badge glass">
              <span>{hero.badge}</span>
            </motion.div>
          )}

          {(hero?.titleLine1 || hero?.titleAccent || hero?.titleLine2) && (
            <motion.h1 variants={childVariants}>
              {hero.titleLine1 && <span>{hero.titleLine1} </span>}
              {hero.titleAccent && <span className="accent">{hero.titleAccent} </span>}
              {hero.titleLine2 && <span>{hero.titleLine2}</span>}
            </motion.h1>
          )}

          {hero?.subtitle && (
            <motion.p variants={childVariants} className="hero-sub">
              {hero.subtitle}
            </motion.p>
          )}

          {(hero?.primaryCtaText || hero?.secondaryCtaText) && (
            <motion.div variants={childVariants} className="hero-actions">
              {hero.primaryCtaText && hero.primaryCtaLink && (
                <motion.a
                  href={hero.primaryCtaLink}
                  className="btn btn-primary"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                >
                  {hero.primaryCtaText}
                </motion.a>
              )}
              {hero.secondaryCtaText && hero.secondaryCtaLink && (
                <motion.a
                  href={hero.secondaryCtaLink}
                  className="btn btn-ghost"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                >
                  {hero.secondaryCtaText}
                </motion.a>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
