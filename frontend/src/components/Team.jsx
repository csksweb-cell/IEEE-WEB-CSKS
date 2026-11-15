import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
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
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow">Leadership</span>
          <h2 className="h-sec" style={{ marginTop: '0.8rem' }}>
            Office Bearers <em className="script">’26</em>
          </h2>
          <p className="lead" style={{ marginTop: '1rem' }}>
            The volunteers steering IEEE Computer Society Kerala Chapter this year — across the professional execom, student leadership, and graduate student activities.
          </p>
        </motion.div>

        {Object.entries(CATEGORY_TITLES).map(([catKey, title]) => {
          const list = grouped[catKey] || []
          const isOpen = openGroups[catKey]

          return (
            <motion.div
              key={catKey}
              className="team-group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                className="team-grouphead"
                onClick={() => toggleGroup(catKey)}
                aria-expanded={isOpen}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <h3>{title}</h3>
                  <span className="team-count">{list.length}</span>
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ChevronDown size={20} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key={`team-content-${catKey}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="team-grid" style={{ paddingTop: '1.2rem' }}>
                      {list.map((person, pIdx) => {
                        const photoUrl = urlFor(person.photo)

                        return (
                          <motion.article
                            key={person._id || person.name}
                            className="person-card"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25, delay: pIdx * 0.02 }}
                            whileHover={{ y: -3 }}
                          >
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
                          </motion.article>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
