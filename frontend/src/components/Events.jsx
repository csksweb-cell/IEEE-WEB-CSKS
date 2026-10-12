import React from 'react'
import { Calendar, MapPin } from 'lucide-react'
import { urlFor } from '../sanity/client'

export default function Events({ events }) {
  const items = events?.length ? events : []

  return (
    <section className="section" id="events" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
          <div>
            <span className="eyebrow">Upcoming</span>
            <h2 className="h-sec" style={{ marginTop: '0.8rem' }}>
              What's happening <em>next</em>.
            </h2>
          </div>
          <a href="#community" className="btn btn-ghost">
            View full calendar
          </a>
        </div>

        <div className="events-grid">
          {items.map((event, idx) => {
            const coverSrc = urlFor(event.coverImage) || `/assets/img/event-0${((idx + 2) % 8) + 1}.jpg`

            return (
              <article key={event._id || event.title} className="event-card">
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
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
