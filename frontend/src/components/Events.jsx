import React from 'react'
import { motion } from 'framer-motion'
import { urlFor } from '../sanity/client'

export default function Events({ events }) {
  if (!events || events.length === 0) return null

  return (
    <section className="section" id="events" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <motion.div
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <span className="eyebrow">Upcoming</span>
            <h2 className="h-sec" style={{ marginTop: '0.8rem' }}>
              What's happening <em>next</em>.
            </h2>
          </div>
          <motion.a
            href="#community"
            className="btn btn-ghost"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
          >
            View full calendar
          </motion.a>
        </motion.div>

        <div className="events-grid">
          {events.map((event, idx) => {
            const coverSrc = urlFor(event.coverImage)

            return (
              <motion.article
                key={event._id || event.title}
                className="event-card"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: idx * 0.09, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
              >
                <div className="event-thumb">
                  <img src={coverSrc} alt={event.title} loading="lazy" />
                  <span className="ev-pill">{event.category}</span>
                </div>
                <div className="event-body">
                  <div className="ev-date">{event.date}</div>
                  <h3 className="ev-title">{event.title}</h3>
                  {event.metaTags?.length > 0 && (
                    <div className="ev-meta">
                      {event.metaTags.map((tag, tIdx) => (
                        <span key={tIdx}>✦ {tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
