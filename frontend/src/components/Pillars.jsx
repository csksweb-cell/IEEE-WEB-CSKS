import React from 'react'
import { Terminal, Zap, Users, TrendingUp, Globe } from 'lucide-react'

const ICON_MAP = {
  code: Terminal,
  zap: Zap,
  users: Users,
  growth: TrendingUp,
  globe: Globe,
}

export default function Pillars({ pillars }) {
  const items = pillars?.length ? pillars : []

  return (
    <section className="section" id="work">
      <div className="wrap">
        <div>
          <span className="eyebrow">What we do</span>
          <h2 className="h-sec" style={{ marginTop: '0.8rem' }}>
            Built for every <em>stage</em><br />of the journey.
          </h2>
          <p className="lead" style={{ marginTop: '1rem' }}>
            Whether you are writing your first line of code at eighteen or leading an engineering org at forty — there is a room here with your name on it.
          </p>
        </div>

        <div className="pillars-grid">
          {items.map((pillar) => {
            const IconComponent = ICON_MAP[pillar.icon] || Terminal

            let cardClass = 'pillar-card glass glass-col'
            if (pillar.variant === 'dark') cardClass = 'pillar-card dark'
            if (pillar.variant === 'amber') cardClass = 'pillar-card amber'

            return (
              <div key={pillar._id || pillar.tag} className={cardClass}>
                <div className="p-ico">
                  <IconComponent size={24} />
                </div>
                <div>
                  <div className="p-tag">{pillar.tag}</div>
                  <h3 className="p-title">{pillar.title}</h3>
                  <p>{pillar.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
