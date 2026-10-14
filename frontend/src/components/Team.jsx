import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { urlFor } from '../sanity/client'

const CATEGORY_TITLES = {
  execom: 'Professional Execom',
  student: 'Student Leadership Team',
  gsac: 'Graduate Student Activities Committee',
}

const stripHonorific = (name = '') => name.replace(/^(dr|prof|mr|ms|mrs)\.?\s+/i, '').trim()

const getInitials = (name = '') => {
  const words = stripHonorific(name).split(/\s+/)
  return ((words[0]?.[0] || '') + (words.length > 1 ? words[words.length - 1][0] : '')).toUpperCase()
}

export default function Team({ members }) {
  if (!members || members.length === 0) return null

  const [openGroups, setOpenGroups] = useState({
    execom: true,
    student: false,
    gsac: false,
  })

  const toggleGroup = (cat) => {
    setOpenGroups((prev) => ({ ...prev, [cat]: !prev[cat] }))
  }

  const grouped = {
    execom: [],
    student: [],
    gsac: [],
  }

  ;(members || []).forEach((m) => {
    if (grouped[m.category]) {
      grouped[m.category].push(m)
    } else {
      grouped.execom.push(m)
    }
  })

  return (
    <section className="section" id="team" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div>
          <span className="eyebrow">Leadership</span>
          <h2 className="h-sec" style={{ marginTop: '0.8rem' }}>
            Office Bearers <em className="script">’26</em>
          </h2>
          <p className="lead" style={{ marginTop: '1rem' }}>
            The volunteers steering IEEE Computer Society Kerala Chapter this year — across the professional execom, student leadership, and graduate student activities.
          </p>
        </div>

        {Object.entries(CATEGORY_TITLES).map(([catKey, title]) => {
          const list = grouped[catKey] || []
          const isOpen = openGroups[catKey]

          return (
            <div key={catKey} className="team-group">
              <button
                className="team-grouphead"
                onClick={() => toggleGroup(catKey)}
                aria-expanded={isOpen}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <h3>{title}</h3>
                  <span className="team-count">{list.length}</span>
                </div>
                <div>{isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</div>
              </button>

              {isOpen && (
                <div className="team-grid">
                  {list.map((person) => {
                    const photoUrl = urlFor(person.photo)

                    return (
                      <article key={person._id || person.name} className="person-card">
                        <div className="person-avatar">
                          <span>{getInitials(person.name)}</span>
                          <img
                            src={photoUrl}
                            alt={person.name}
                            loading="lazy"
                            onError={(e) => {
                              
                              e.currentTarget.style.display = 'none'
                            }}
                          />
                        </div>
                        <div className="person-info">
                          <span className="p-name">{person.name}</span>
                          <span className="p-role">{person.role}</span>
                          {person.organization && (
                            <span className="p-org">{person.organization}</span>
                          )}
                        </div>
                      </article>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
