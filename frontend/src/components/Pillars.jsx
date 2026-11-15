import React from 'react'
import { motion } from 'framer-motion'
import { Terminal, Zap, Users, TrendingUp, Globe } from 'lucide-react'

const ICON_MAP = {
  code: Terminal,
  zap: Zap,
  users: Users,
  growth: TrendingUp,
  globe: Globe,
}

export default function Pillars({ pillars }) {
  if (!pillars || pillars.length === 0) return null

  return (
    <section className="section" id="work">
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow">What we do</span>
          <h2 className="h-sec" style={{ marginTop: '0.8rem' }}>
            Built for every <em>stage</em><br />of the journey.
          </h2>
          <p className="lead" style={{ marginTop: '1rem' }}>
            Whether you are writing your first line of code at eighteen or leading an engineering org at forty — there is a room here with your name on it.
          </p>
        </motion.div>

        <div className="pillars-grid">
          {pillars.map((pillar, idx) => {
            const IconComponent = ICON_MAP[pillar.icon] || Terminal

            let cardClass = 'pillar-card glass glass-col'
            if (pillar.variant === 'dark') cardClass = 'pillar-card dark'
            if (pillar.variant === 'amber') cardClass = 'pillar-card amber'

            return (
              <motion.div
                key={pillar._id || pillar.tag}
                className={cardClass}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
              >
                <div className="p-ico">
                  <IconComponent size={24} />
                </div>
                <div>
                  <div className="p-tag">{pillar.tag}</div>
                  <h3 className="p-title">{pillar.title}</h3>
                  <p>{pillar.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
