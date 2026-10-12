import React from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Sparkles } from 'lucide-react'

const SLIDES = [
  { img: '/assets/img/event-01.jpg', tag: 'Community' },
  { img: '/assets/img/event-02.jpg', tag: 'On Stage' },
  { img: '/assets/img/event-03.jpg', tag: 'DataOps' },
  { img: '/assets/img/event-04.jpg', tag: 'Systems Lab' },
  { img: '/assets/img/event-05.jpg', tag: 'Annual Meet' },
  { img: '/assets/img/event-06.jpg', tag: 'Retreat' },
  { img: '/assets/img/event-07.jpg', tag: 'Leaders Panel' },
  { img: '/assets/img/event-08.jpg', tag: 'Awards' },
]

export default function Hero({ hero }) {
  // Duplicate slides for continuous seamless infinite marquee loop
  const marqueeSlides = [...SLIDES, ...SLIDES]

  return (
    <section className="hero" id="top">
      {/* Background Animated Event Photos */}
      <div className="hero-track-wrap">
        <div className="hero-track">
          {marqueeSlides.map((slide, i) => (
            <div key={i} className="hero-slide">
              <img src={slide.img} alt="" loading="eager" />
              <span className="slide-tag">{slide.tag}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Frosted Acrylic Scrim */}
      <div className="hero-scrim" aria-hidden="true"></div>

      <div className="wrap">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="hero-badge glass">
            <span className="pulse"></span>
            <span>{hero?.badge || 'Belong where technology thrives'}</span>
          </div>

          <h1>
            <span>{hero?.titleLine1 || 'Four'} </span>
            <span className="accent">{hero?.titleAccent || 'decades'} </span>
            <span>{hero?.titleLine2 || 'of Computing.'}</span>
          </h1>

          <p className="hero-sub">
            {hero?.subtitle ||
              'The people, chapters and student branches that turned Kerala into a computing community — one workshop, hackathon and friendship at a time.'}
          </p>

          <div className="hero-actions">
            <a href={hero?.primaryCtaLink || '#story'} className="btn btn-primary">
              <span className="dot"></span> {hero?.primaryCtaText || 'Explore the legacy'}
            </a>
            <a href={hero?.secondaryCtaLink || '#events'} className="btn btn-ghost">
              {hero?.secondaryCtaText || "See what's happening"}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
