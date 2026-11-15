import React from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'

export default function CommunityCta({ settings }) {
  if (!settings) return null

  const handleConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#F5A623', '#FFC15A', '#D07E0C', '#FFFFFF'],
    })
  }

  return (
    <section className="section" id="community" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <motion.div
          className="community-banner"
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow" style={{ color: 'var(--amber-deep)' }}>
            Your seat is waiting
          </span>
          <h2>
            Come build the<br />next <em>decade</em>.
          </h2>
          <p>
            Students, professionals, tinkerers and veterans — IEEE CSKC is where the state's computing story keeps getting written. Add your chapter.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {settings.membershipUrl && (
              <motion.a
                href={settings.membershipUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
                onClick={handleConfetti}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                Become a member
              </motion.a>
            )}
            <motion.a
              href="#events"
              className="btn btn-ghost"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
            >
              Attend an event
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
